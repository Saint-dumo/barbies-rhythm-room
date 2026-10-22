import Stripe from 'stripe'
import { Resend } from 'resend'

export const config = {
  api: {
    bodyParser: false,
  },
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const resend = new Resend(process.env.RESEND_API_KEY)

const EVENT = {
  name: "Barbie's Rhythm Room",
  date: 'Saturday, October 24, 2026',
  time: '7:00 PM – 10:00 PM',
  address: '1377 The Queensway, Etobicoke, Toronto, ON',
  logo: 'https://www.barbiesrhythmroom.ca/barbiesroomlogo.png',
  instagram: 'https://www.instagram.com/barbie_rhythm_room/',
  tiktok: 'https://tr.ee/A5o8yfpraq',
  maps: 'https://www.google.com/maps/search/?api=1&query=1377+The+Queensway%2C+Etobicoke%2C+Toronto%2C+ON',
}

async function getRawBody(req) {
  const chunks = []

  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
  }

  return Buffer.concat(chunks)
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[character])
}

function formatAmount(session) {
  const amount = ((session.amount_total || 0) / 100).toFixed(2)
  const currency = (session.currency || 'cad').toUpperCase()

  return `${currency} $${amount}`
}

async function sendEmail({ to, subject, html }) {
  const result = await resend.emails.send({
    from: process.env.BOOKING_FROM_EMAIL,
    to,
    subject,
    html,
  })

  if (result.error) {
    throw new Error(result.error.message || 'Resend email failed')
  }
}

function emailHeader(title) {
  return `
    <div style="background:#171217;padding:28px 20px;text-align:center">
      <img
        src="${EVENT.logo}"
        alt="Barbie's Rhythm Room"
        width="180"
        style="display:block;width:180px;max-width:100%;height:auto;margin:0 auto 12px"
      >
      <p style="margin:0;color:#f5a0c5;font-size:11px;letter-spacing:3px">
        DANCE · MOVE · BE YOU
      </p>
      <h1 style="margin:20px 0 0;color:#ffffff;font-size:23px">${title}</h1>
    </div>
  `
}

function emailFooter() {
  return `
    <div style="background:#171217;padding:24px 18px;text-align:center">
      <p style="margin:0 0 14px;color:#ffffff;font-size:13px">
        Stay connected with us
      </p>
      <p style="margin:0 0 16px">
        <a href="${EVENT.instagram}" style="color:#f5a0c5;text-decoration:none;font-weight:bold">
          Instagram
        </a>
        <span style="color:#777;margin:0 12px">|</span>
        <a href="${EVENT.tiktok}" style="color:#f5a0c5;text-decoration:none;font-weight:bold">
          TikTok
        </a>
      </p>
      <a href="https://www.barbiesrhythmroom.ca" style="color:#ffffff;text-decoration:none;font-size:12px">
        www.barbiesrhythmroom.ca
      </a>
      <p style="margin:14px 0 0;color:#b7aab3;font-size:11px">
        Barbie's Rhythm Room © 2026
      </p>
    </div>
  `
}

function eventDetailsHtml() {
  return `
    <div style="background:#fff3f8;border:1px solid #f7d5e5;border-radius:14px;padding:20px">
      <h2 style="margin:0 0 16px;font-size:18px;color:#c52f76">
        Your event details
      </h2>
      <p style="margin:10px 0;font-size:14px">
        <strong>Event:</strong> ${EVENT.name}
      </p>
      <p style="margin:10px 0;font-size:14px">
        <strong>Date:</strong> ${EVENT.date}
      </p>
      <p style="margin:10px 0;font-size:14px">
        <strong>Time:</strong> ${EVENT.time}
      </p>
      <p style="margin:10px 0;font-size:14px;line-height:1.7">
        <strong>Venue:</strong><br>
        <a href="${EVENT.maps}" style="color:#c52f76;text-decoration:underline">
          ${EVENT.address}
        </a>
      </p>
    </div>
  `
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).send('Method not allowed')
  }

  const signature = req.headers['stripe-signature']

  if (!signature) {
    return res.status(400).send('Missing Stripe signature')
  }

  const requiredVariables = [
    'STRIPE_SECRET_KEY',
    'STRIPE_WEBHOOK_SECRET',
    'RESEND_API_KEY',
    'BOOKING_FROM_EMAIL',
    'BOOKING_NOTIFICATION_EMAIL',
  ]

  const missingVariables = requiredVariables.filter(
    (name) => !process.env[name]
  )

  if (missingVariables.length > 0) {
    console.error('Missing webhook environment variables:', missingVariables)
    return res.status(500).send('Webhook configuration incomplete')
  }

  let event

  try {
    const rawBody = await getRawBody(req)

    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (error) {
    console.error('Stripe signature verification failed:', error.message)
    return res.status(400).send('Invalid Stripe signature')
  }

  const supportedEvents = [
    'checkout.session.completed',
    'checkout.session.async_payment_succeeded',
    'checkout.session.async_payment_failed',
    'checkout.session.expired',
  ]

  if (!supportedEvents.includes(event.type)) {
    return res.status(200).json({ received: true, ignored: true })
  }

  const session = event.data.object
  const customerEmail = session.customer_details?.email
  const customerName = session.customer_details?.name || 'there'

  const safeName = escapeHtml(customerName)
  const safeEmail = escapeHtml(customerEmail || 'Not provided')
  const safeSessionId = escapeHtml(session.id)
  const amount = escapeHtml(formatAmount(session))

  console.log('Received Stripe checkout event:', event.type, session.id)

  try {
    if (
      event.type === 'checkout.session.completed' ||
      event.type === 'checkout.session.async_payment_succeeded'
    ) {
      if (session.payment_status !== 'paid') {
        return res.status(200).json({
          received: true,
          paid: false,
          emailsSent: false,
        })
      }

      if (!customerEmail) {
        console.error('Paid checkout has no customer email:', session.id)
        return res.status(200).json({
          received: true,
          paid: true,
          emailsSent: false,
          reason: 'Customer email missing',
        })
      }

      const customerHtml = `
        <div style="margin:0;padding:30px 12px;background:#f8f4f6;font-family:Arial,Helvetica,sans-serif;color:#21151c">
          <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:18px;overflow:hidden;border:1px solid #f0dce6">
            ${emailHeader('BOOKING CONFIRMED')}

            <div style="padding:30px 24px">
              <h2 style="margin:0 0 14px;font-size:26px;line-height:1.3">
                You're in the room, ${safeName}!
              </h2>
              <p style="margin:0 0 24px;color:#665761;font-size:15px;line-height:1.8">
                Your payment was successful, and your booking is confirmed.
                Get ready to move, feel the rhythm and have a great time!
              </p>

              ${eventDetailsHtml()}

              <div style="margin-top:20px;background:#ffffff;border:1px solid #eadfe5;border-radius:12px;padding:18px">
                <h3 style="margin:0 0 12px;color:#c52f76">Payment details</h3>
                <p style="margin:8px 0;font-size:14px">
                  <strong>Amount paid:</strong> ${amount}
                </p>
                <p style="margin:8px 0;font-size:14px;overflow-wrap:anywhere">
                  <strong>Payment reference:</strong><br>${safeSessionId}
                </p>
              </div>

              <p style="margin:24px 0 10px;font-size:14px;line-height:1.8;color:#665761">
                Please keep this email as proof of your booking. We can't wait
                to see you on the dance floor!
              </p>
              <p style="margin:18px 0 0;font-size:14px;font-weight:bold">
                With love,<br>Barbie's Rhythm Room
              </p>
            </div>

            ${emailFooter()}
          </div>
        </div>
      `

      const hostHtml = `
        <div style="margin:0;padding:24px 12px;background:#f8f4f6;font-family:Arial,Helvetica,sans-serif;color:#21151c">
          <div style="max-width:600px;margin:auto;background:#ffffff;border:1px solid #f0dce6;border-radius:14px;overflow:hidden">
            ${emailHeader('NEW PAID BOOKING')}

            <div style="padding:24px">
              <p><strong>Customer:</strong> ${safeName}</p>
              <p><strong>Customer email:</strong> ${safeEmail}</p>
              <p><strong>Amount paid:</strong> ${amount}</p>
              <p style="overflow-wrap:anywhere">
                <strong>Stripe session:</strong> ${safeSessionId}
              </p>

              <div style="margin-top:22px">
                ${eventDetailsHtml()}
              </div>

              <p style="margin-top:24px;font-size:12px;color:#766773">
                Automated booking notification from Barbie's Rhythm Room.
              </p>
            </div>

            ${emailFooter()}
          </div>
        </div>
      `

      await sendEmail({
        to: customerEmail,
        subject: "You're booked! — Barbie's Rhythm Room",
        html: customerHtml,
      })

      await sendEmail({
        to: process.env.BOOKING_NOTIFICATION_EMAIL,
        subject: "New paid booking — Barbie's Rhythm Room",
        html: hostHtml,
      })

      return res.status(200).json({
        received: true,
        paid: true,
        emailsSent: true,
      })
    }

    if (event.type === 'checkout.session.async_payment_failed') {
      const failureHtml = `
        <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:24px auto;background:#ffffff;border:1px solid #f0dce6;border-radius:14px;overflow:hidden;color:#21151c">
          ${emailHeader('PAYMENT NOT COMPLETED')}
          <div style="padding:26px">
            <p>Hi ${safeName},</p>
            <p>We couldn't confirm payment for your Barbie's Rhythm Room booking.</p>
            <p>Your booking is not confirmed. If you still wish to attend, please return to the booking page and try again.</p>
            <p>If you believe you were charged, contact the event team before trying to pay again.</p>
          </div>
          ${emailFooter()}
        </div>
      `

      if (customerEmail) {
        await sendEmail({
          to: customerEmail,
          subject: "Payment not completed — Barbie's Rhythm Room",
          html: failureHtml,
        })
      }

      await sendEmail({
        to: process.env.BOOKING_NOTIFICATION_EMAIL,
        subject: "Payment failed — Barbie's Rhythm Room",
        html: `
          <div style="font-family:Arial,sans-serif;line-height:1.7">
            <h2>Delayed checkout payment failed</h2>
            <p><strong>Customer:</strong> ${safeName}</p>
            <p><strong>Email:</strong> ${safeEmail}</p>
            <p><strong>Checkout session:</strong> ${safeSessionId}</p>
            <p>No booking confirmation was sent.</p>
          </div>
        `,
      })

      return res.status(200).json({
        received: true,
        paymentFailed: true,
      })
    }

    if (event.type === 'checkout.session.expired') {
      if (customerEmail) {
        await sendEmail({
          to: customerEmail,
          subject: "Your checkout expired — Barbie's Rhythm Room",
          html: `
            <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:24px auto;background:#ffffff;border:1px solid #f0dce6;border-radius:14px;overflow:hidden;color:#21151c">
              ${emailHeader('YOUR CHECKOUT EXPIRED')}
              <div style="padding:26px;line-height:1.8">
                <p>Hi ${safeName},</p>
                <p>Your Barbie's Rhythm Room checkout expired before it was completed.</p>
                <p>This does not confirm a payment or booking. If you still wish to attend, please return to the booking page and start a new checkout.</p>
                <p>If you believe you already paid, contact the event team before paying again.</p>
              </div>
              ${emailFooter()}
            </div>
          `,
        })
      }

      await sendEmail({
        to: process.env.BOOKING_NOTIFICATION_EMAIL,
        subject: "Checkout expired — Barbie's Rhythm Room",
        html: `
          <div style="font-family:Arial,sans-serif;line-height:1.7">
            <h2>A checkout session expired</h2>
            <p><strong>Customer:</strong> ${safeName}</p>
            <p><strong>Customer email:</strong> ${safeEmail}</p>
            <p><strong>Checkout session:</strong> ${safeSessionId}</p>
            <p>No booking confirmation was sent for this event.</p>
          </div>
        `,
      })

      return res.status(200).json({
        received: true,
        checkoutExpired: true,
      })
    }
  } catch (error) {
    console.error('Stripe webhook processing failed:', error.message)
    return res.status(500).send('Webhook processing failed')
  }

  return res.status(200).json({ received: true })
}
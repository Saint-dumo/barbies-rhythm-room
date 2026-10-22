import Stripe from 'stripe'
import { Resend } from 'resend'

export const config = {
  api: {
    bodyParser: false,
  },
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const resend = new Resend(process.env.RESEND_API_KEY)

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
    // Payment succeeded: send the customer confirmation and host notification.
    if (
      event.type === 'checkout.session.completed' ||
      event.type === 'checkout.session.async_payment_succeeded'
    ) {
      if (session.payment_status !== 'paid') {
        console.log('Checkout completed but payment is not paid:', session.id)
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
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;color:#171717;line-height:1.6">
          <h1 style="color:#e65391">You're in the room, ${safeName}!</h1>
          <p>Your payment was successful, and your booking for Barbie's Rhythm Room is confirmed.</p>
          <div style="background:#fff3f8;padding:20px;border-radius:12px">
            <p><strong>Event:</strong> Barbie's Rhythm Room</p>
            <p><strong>Date:</strong> October 24, 2026</p>
            <p><strong>Time:</strong> 4:00 PM</p>
            <p><strong>Payment:</strong> ${amount}</p>
            <p><strong>Payment reference:</strong> ${safeSessionId}</p>
          </div>
          <p>Please keep this email as proof of your booking.</p>
          <p>We look forward to dancing with you!</p>
          <p>— Barbie's Rhythm Room</p>
        </div>
      `

      const hostHtml = `
        <div style="font-family:Arial,sans-serif;line-height:1.6">
          <h2>New paid booking received</h2>
          <p><strong>Customer:</strong> ${safeName}</p>
          <p><strong>Customer email:</strong> ${safeEmail}</p>
          <p><strong>Amount paid:</strong> ${amount}</p>
          <p><strong>Stripe session:</strong> ${safeSessionId}</p>
          <p><strong>Event:</strong> Barbie's Rhythm Room — October 24, 2026, at 4:00 PM</p>
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

    // Delayed payment failed: notify the customer and host if possible.
    if (event.type === 'checkout.session.async_payment_failed') {
      const customerHtml = `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;line-height:1.6;color:#171717">
          <h1>Payment not completed</h1>
          <p>Hi ${safeName}, we couldn't confirm payment for your Barbie's Rhythm Room booking.</p>
          <p>Your booking is not confirmed. Please return to the booking page and try again if you still wish to attend.</p>
          <p>If you believe this is a mistake, please contact the event team.</p>
          <p>— Barbie's Rhythm Room</p>
        </div>
      `

      await sendEmail({
        to: customerEmail || process.env.BOOKING_NOTIFICATION_EMAIL,
        subject: "Payment not completed — Barbie's Rhythm Room",
        html: customerHtml,
      })

      if (customerEmail) {
        await sendEmail({
          to: process.env.BOOKING_NOTIFICATION_EMAIL,
          subject: "Payment failed — Barbie's Rhythm Room",
          html: `
            <div style="font-family:Arial,sans-serif;line-height:1.6">
              <h2>A checkout payment failed</h2>
              <p><strong>Customer:</strong> ${safeName}</p>
              <p><strong>Email:</strong> ${safeEmail}</p>
              <p><strong>Checkout session:</strong> ${safeSessionId}</p>
              <p>No booking confirmation was sent.</p>
            </div>
          `,
        })
      }

      return res.status(200).json({
        received: true,
        paymentFailed: true,
        emailsSent: true,
      })
    }

    // Expired checkout: notify the customer if their email is available.
    if (event.type === 'checkout.session.expired') {
      if (customerEmail) {
        await sendEmail({
          to: customerEmail,
          subject: "Your checkout expired — Barbie's Rhythm Room",
          html: `
            <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;line-height:1.6;color:#171717">
              <h1>Your checkout has expired</h1>
              <p>Hi ${safeName}, your Barbie's Rhythm Room checkout expired before it was completed.</p>
              <p>This does not confirm a payment or booking. If you still wish to attend, please return to the booking page and start a new checkout.</p>
              <p>If you already paid, please contact the event team before paying again.</p>
              <p>— Barbie's Rhythm Room</p>
            </div>
          `,
        })
      }

      await sendEmail({
        to: process.env.BOOKING_NOTIFICATION_EMAIL,
        subject: "Checkout expired — Barbie's Rhythm Room",
        html: `
          <div style="font-family:Arial,sans-serif;line-height:1.6">
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
        emailsSent: true,
      })
    }
  } catch (error) {
    console.error('Stripe webhook processing failed:', error.message)
    return res.status(500).send('Webhook processing failed')
  }

  return res.status(200).json({ received: true })
}

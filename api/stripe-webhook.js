import Stripe from 'stripe'
import { Resend } from 'resend'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const resend = new Resend(process.env.RESEND_API_KEY)

export const config = {
  api: {
    bodyParser: false,
  },
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

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).send('Method not allowed')
  }

  const signature = req.headers['stripe-signature']

  if (!signature) {
    return res.status(400).send('Missing Stripe signature')
  }

  if (
    !process.env.STRIPE_SECRET_KEY ||
    !process.env.STRIPE_WEBHOOK_SECRET ||
    !process.env.RESEND_API_KEY ||
    !process.env.BOOKING_FROM_EMAIL ||
    !process.env.BOOKING_NOTIFICATION_EMAIL
  ) {
    console.error('A required webhook environment variable is missing')
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

  if (
    event.type !== 'checkout.session.completed' &&
    event.type !== 'checkout.session.async_payment_succeeded'
  ) {
    return res.status(200).json({ received: true })
  }

  const session = event.data.object

  if (session.payment_status !== 'paid') {
    return res.status(200).json({ received: true, paid: false })
  }

  const customerEmail = session.customer_details?.email
  const customerName = session.customer_details?.name || 'there'

  if (!customerEmail) {
    console.error('Paid checkout has no customer email:', session.id)
    return res.status(500).send('Customer email missing')
  }

  const amountPaid = ((session.amount_total || 0) / 100).toFixed(2)
  const currency = (session.currency || 'cad').toUpperCase()
  const safeName = escapeHtml(customerName)
  const safeEmail = escapeHtml(customerEmail)
  const safeSessionId = escapeHtml(session.id)

  const customerEmailHtml = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;color:#171717;line-height:1.6">
      <h1 style="color:#e65391">You're in the room, ${safeName}!</h1>
      <p>Your payment was successful, and your booking for Barbie's Rhythm Room is confirmed.</p>
      <div style="background:#fff3f8;padding:20px;border-radius:12px">
        <p><strong>Event:</strong> Barbie's Rhythm Room</p>
        <p><strong>Date:</strong> October 24, 2026</p>
        <p><strong>Payment:</strong> ${currency} $${amountPaid}</p>
        <p><strong>Payment reference:</strong> ${safeSessionId}</p>
      </div>
      <p>Please keep this email as proof of your booking.</p>
      <p>We look forward to dancing with you!</p>
      <p>— Barbie's Rhythm Room</p>
    </div>
  `

  const notificationHtml = `
    <div style="font-family:Arial,sans-serif;line-height:1.6">
      <h2>New paid booking received</h2>
      <p><strong>Customer:</strong> ${safeName}</p>
      <p><strong>Customer email:</strong> ${safeEmail}</p>
      <p><strong>Amount paid:</strong> ${currency} $${amountPaid}</p>
      <p><strong>Stripe session:</strong> ${safeSessionId}</p>
      <p><strong>Event:</strong> Barbie's Rhythm Room — October 24, 2026</p>
    </div>
  `

  try {
    const customerResult = await resend.emails.send({
      from: process.env.BOOKING_FROM_EMAIL,
      to: customerEmail,
      subject: "You're booked! — Barbie's Rhythm Room",
      html: customerEmailHtml,
    })

    if (customerResult.error) {
      console.error('Customer email failed:', customerResult.error)
      return res.status(500).send('Customer email failed')
    }

    const notificationResult = await resend.emails.send({
      from: process.env.BOOKING_FROM_EMAIL,
      to: process.env.BOOKING_NOTIFICATION_EMAIL,
      subject: "New paid booking — Barbie's Rhythm Room",
      html: notificationHtml,
    })

    if (notificationResult.error) {
      console.error('Booking notification failed:', notificationResult.error)
      return res.status(500).send('Booking notification failed')
    }

    return res.status(200).json({ received: true, emailsSent: true })
  } catch (error) {
    console.error('Booking email delivery failed:', error)
    return res.status(500).send('Email delivery failed')
  }
}

import { useState } from 'react'
import '../styles/Booking.css'

function Booking() {
  const [ticketType, setTicketType] = useState('adult')
  const [quantity, setQuantity] = useState(1)

  const ticketPrices = {
    child: 15,
    adult: 25,
  }

  const ticketLabels = {
    child: 'Ages 5–14',
    adult: 'Ages 15+',
  }

  const paymentLinks = {
    child: 'https://buy.stripe.com/test_bJe8wQ82PcsG8l09QQ2Fa00',
    adult: 'https://buy.stripe.com/test_aFa28serd64i0Syd322Fa01',
  }

  const total = ticketPrices[ticketType] * quantity

  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1))
  }

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const paymentLink = paymentLinks[ticketType]

    window.location.href = paymentLink
  }

  return (
    <section className="booking">

      <div className="booking-header">
        <span className="section-label">BOOK YOUR SPOT</span>

        <h2>
          GET IN
          <br />
          THE
          <br />
          <em>ROOM.</em>
        </h2>

        <p>
          Choose your ticket, select how many spots you need,
          and continue to secure your place at Barbie's Rhythm Room.
        </p>
      </div>

      <form className="booking-form" onSubmit={handleSubmit}>

        <div className="booking-section">
          <span className="booking-step">01</span>

          <div className="booking-section-content">
            <h3>Choose your ticket</h3>

            <div className="ticket-options">

              <button
                type="button"
                className={`ticket-option ${
                  ticketType === 'child' ? 'ticket-option-active' : ''
                }`}
                onClick={() => setTicketType('child')}
              >
                <span>Ages 5–14</span>
                <strong>$15</strong>
              </button>

              <button
                type="button"
                className={`ticket-option ${
                  ticketType === 'adult' ? 'ticket-option-active' : ''
                }`}
                onClick={() => setTicketType('adult')}
              >
                <span>Ages 15+</span>
                <strong>$25</strong>
              </button>

            </div>
          </div>
        </div>

        <div className="booking-section">
          <span className="booking-step">02</span>

          <div className="booking-section-content">
            <h3>How many spots?</h3>

            <div className="quantity-control">
              <button
                type="button"
                onClick={decreaseQuantity}
                aria-label="Decrease quantity"
              >
                −
              </button>

              <strong>{quantity}</strong>

              <button
                type="button"
                onClick={increaseQuantity}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className="booking-section">
          <span className="booking-step">03</span>

          <div className="booking-section-content">
            <h3>Your total</h3>

            <div className="booking-summary">
              <div>
                <span>
                  {ticketLabels[ticketType]} × {quantity}
                </span>

                <strong>October 22, 2026</strong>
              </div>

              <div>
                <span>TOTAL</span>
                <strong>CA${total}</strong>
              </div>
            </div>

            <button
              type="submit"
              className="booking-submit"
            >
              Continue to Payment
            </button>
          </div>
        </div>

      </form>
    </section>
  )
}

export default Booking
import { useEffect, useState } from 'react'
import '../styles/Event.css'

function Event() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const targetDate = new Date('2026-10-24T19:00:00')

    const updateCountdown = () => {
      const now = new Date()
      const difference = targetDate - now

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        })

        return
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (difference / (1000 * 60 * 60)) % 24
        ),
        minutes: Math.floor(
          (difference / (1000 * 60)) % 60
        ),
        seconds: Math.floor(
          (difference / 1000) % 60
        ),
      })
    }

    updateCountdown()

    const timer = setInterval(updateCountdown, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="event" id="event">
      <div className="event-header">
        <span className="section-label">NEXT SESSION</span>

        <h2>
          YOUR RHYTHM
          <br />
          <em>STARTS HERE.</em>
        </h2>
      </div>

      <div className="event-main">
        <div className="event-date">
          <span>OCTOBER</span>

          <strong>24</strong>

          <span>2026</span>
        </div>

        <div className="event-details">
          <div className="event-detail">
            <span>TIME</span>
            <strong>7:00 PM</strong>
          </div>

          <div className="event-detail">
            <span>LOCATION</span>
            <strong>CANADA</strong>
          </div>

          <div className="event-detail">
            <span>DURATION</span>
            <strong>2 HOURS</strong>
          </div>

          <div className="event-detail">
            <span>INSTRUCTOR</span>
            <strong>AFRICAN BARBIE</strong>
          </div>
        </div>

        <div className="event-pricing">
          <div className="event-price">
            <span>AGES 5–14</span>
            <strong>$15</strong>
          </div>

          <div className="event-price">
            <span>AGES 15+</span>
            <strong>$25</strong>
          </div>
        </div>
      </div>

      <div className="event-countdown">
        <span className="countdown-label">
          COUNTING DOWN TO THE ROOM
        </span>

        <div className="countdown-grid">
          <div className="countdown-item">
            <strong>{String(timeLeft.days).padStart(2, '0')}</strong>
            <span>DAYS</span>
          </div>

          <div className="countdown-item">
            <strong>{String(timeLeft.hours).padStart(2, '0')}</strong>
            <span>HOURS</span>
          </div>

          <div className="countdown-item">
            <strong>
              {String(timeLeft.minutes).padStart(2, '0')}
            </strong>
            <span>MINUTES</span>
          </div>

          <div className="countdown-item">
            <strong>
              {String(timeLeft.seconds).padStart(2, '0')}
            </strong>
            <span>SECONDS</span>
          </div>
        </div>
      </div>

      <div className="event-bottom">
        <p>
          Come ready to move, learn and have a good time.
          <br />
          Everyone is welcome in the room.
        </p>

        <a href="/booking" className="event-book-button">
          Book Your Spot
        </a>
      </div>
    </section>
  )
}

export default Event
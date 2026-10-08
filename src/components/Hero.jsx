import '../styles/Hero.css'
import heroVideo from '../assets/hero-favour.mp4'

function Hero() {
  return (
    <section className="hero">

      <div className="hero-media">
        <video
          className="hero-video"
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
        <div className="hero-overlay"></div>
      </div>

      <div className="hero-content">

        <span className="hero-eyebrow">
          AFROBEATS&nbsp; • &nbsp;AMAPIANO&nbsp; • &nbsp;ENERGY
        </span>

        <div className="hero-title">
          <span>MOVE TO</span>
          <span>YOUR</span>
          <em>RHYTHM.</em>
        </div>

        <p className="hero-description">
          A space to move, connect and find your rhythm.
        </p>

        <a href="/booking" className="hero-button">
          Book Your Spot
        </a>

      </div>

      <div className="hero-event">
        <span>OCT 24, 2026</span>
        <span>7:00 PM</span>
        <span>CANADA</span>
      </div>

    </section>
  )
}

export default Hero
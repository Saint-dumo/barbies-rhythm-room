import '../styles/Hero.css'
import heroVideo from '../assets/videos/african-barbie-dance.mp4'

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
        />
      </div>

      <div className="hero-content">
        <div className="hero-title">
          <span>MOVE TO</span>
          <span>YOUR</span>
          <em>RHYTHM.</em>
        </div>

        <a href="#booking" className="hero-button">
          Book Your Spot
        </a>
      </div>
    </section>
  )
}

export default Hero
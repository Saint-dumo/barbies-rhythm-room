import Navbar from '../components/Navbar'
import '../styles/GalleryPage.css'

import favourMain from '../assets/hero-favour.mp4'
import favourVideo02 from '../assets/favourdance1.mp4'
import favourVideo03 from '../assets/favourdance2.mp4'
import favourVideo04 from '../assets/favourdance3.mp4'

import dance01 from '../assets/barbie-dance-01.jpg'
import dance02 from '../assets/barbie-dance-02.jpg'
import dance03 from '../assets/barbie-dance-03.jpg'

function GalleryPage() {
  return (
    <>
      <Navbar />

      <main className="gallery-page">

        {/* HERO */}

        <section className="gallery-page-hero">

          <div className="gallery-page-heading">
            <span className="section-label">THE GALLERY</span>

            <h1>
              THE ROOM,
              <br />
              <em>IN MOTION.</em>
            </h1>

            <p>
              Movement, rhythm and energy from
              Barbie's Rhythm Room.
            </p>
          </div>

        </section>


        {/* FAVOUR IN MOTION */}

        <section className="favour-motion">

          <div className="gallery-section-heading">
            <div>
              <span className="section-label">MEET FAVOUR</span>

              <h2>
                FAVOUR
                <br />
                <em>IN MOTION.</em>
              </h2>
            </div>
          </div>


          <div className="favour-feature">

            <div className="favour-feature-video">
              <video
                src={favourMain}
                autoPlay
                muted
                loop
                playsInline
                controls
                preload="metadata"
              />
            </div>

          </div>


          <div className="favour-video-grid">

            <div className="motion-video">
              <video
                src={favourVideo02}
                muted
                loop
                playsInline
                controls
                preload="metadata"
              />
            </div>

            <div className="motion-video">
              <video
                src={favourVideo03}
                muted
                loop
                playsInline
                controls
                preload="metadata"
              />
            </div>

            <div className="motion-video">
              <video
                src={favourVideo04}
                muted
                loop
                playsInline
                controls
                preload="metadata"
              />
            </div>

          </div>

        </section>


        {/* THE ROOM */}

        <section className="gallery-room">

          <div className="gallery-section-heading">
            <div>
              <span className="section-label">THE ROOM</span>

              <h2>
                FEEL THE
                <br />
                <em>ENERGY.</em>
              </h2>
            </div>
          </div>


          <div className="gallery-photo-grid">

            <div className="gallery-photo gallery-photo-large">
              <img
                src={dance01}
                alt="Dance movement"
              />
            </div>

            <div className="gallery-photo">
              <img
                src={dance02}
                alt="Dance class"
              />
            </div>

            <div className="gallery-photo">
              <img
                src={dance03}
                alt="Dance energy"
              />
            </div>

          </div>

        </section>


        {/* CTA */}

        <section className="gallery-page-cta">

          <span className="section-label">
            READY TO MOVE?
          </span>

          <h2>
            GET IN THE
            <br />
            <em>ROOM.</em>
          </h2>

          <a href="/booking" className="gallery-cta-button">
            Book Your Spot
          </a>

        </section>

      </main>
    </>
  )
}

export default GalleryPage
import '../styles/Gallery.css'

import instructorImage from '../assets/african-barbie.jpg'
import dance01 from '../assets/barbie-dance-01.jpg'
import dance02 from '../assets/barbie-dance-02.jpg'
import dance03 from '../assets/barbie-dance-03.jpg'

function Gallery() {
  return (
    <section className="gallery" id="gallery">
      <div className="gallery-header">
        <div>
          <span className="section-label">INSIDE THE ROOM</span>

          <h2>
            FEEL THE
            <br />
            <em>ENERGY.</em>
          </h2>
        </div>

        <p>
          Movement.
          <br />
          Expression.
          <br />
          Community.
        </p>
      </div>

      <div className="gallery-grid">
        <div className="gallery-item gallery-item-large">
          <img
            src={instructorImage}
            alt="African Barbie"
          />
        </div>

        <div className="gallery-item gallery-item-top">
          <img
            src={dance01}
            alt="Dance class"
          />
        </div>

        <div className="gallery-item gallery-item-side">
          <img
            src={dance02}
            alt="Dance movement"
          />
        </div>

        <div className="gallery-item gallery-item-bottom">
          <img
            src={dance03}
            alt="Dance class energy"
          />
        </div>
      </div>
    </section>
  )
}

export default Gallery
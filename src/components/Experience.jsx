import '../styles/Experience.css'

import dance01 from '../assets/barbie-dance-01.jpg'
import dance02 from '../assets/barbie-dance-02.jpg'
import dance03 from '../assets/barbie-dance-03.jpg'

function Experience() {
  return (
    <section className="experience" id="experience">
      <div className="experience-heading">
        <span className="section-label">THE EXPERIENCE</span>

        <h2>
          GOOD MUSIC.
          <br />
          REAL MOVES.
          <br />
          <em>GREAT PEOPLE.</em>
        </h2>
      </div>

      <div className="experience-content">
        <div className="experience-copy">
          <p>
            Barbie's Rhythm Room is more than a dance class.
            It's a space to move, express yourself and be part
            of a vibrant community.
          </p>

          <p>
            Whether you're here to learn, connect or simply
            have fun, there's a place for you in the room.
          </p>

          <a href="#about" className="experience-link">
            Discover the room
          </a>
        </div>

        <div className="experience-visual">
          <div className="experience-collage">
            <div className="collage-panel collage-panel-one">
              <img src={dance01} alt="Dance movement" />
            </div>

            <div className="collage-panel collage-panel-two">
              <img src={dance02} alt="Dance class" />
            </div>

            <div className="collage-panel collage-panel-three">
              <img src={dance03} alt="Dance energy" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience
import '../styles/Experience.css'

import dance01 from '../assets/barbie-dance-01.jpg'
import dance02 from '../assets/barbie-dance-02.jpg'
import dance03 from '../assets/barbie-dance-03.jpg'

function Experience() {
  return (
    <section className="experience" id="about">

      <div className="experience-heading">
        <span className="section-label">ABOUT THE ROOM</span>

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
            Barbie's Rhythm Room is a dance space created for
            movement, expression and connection.
          </p>

          <p>
            Built around the energy of Afrobeats, Amapiano and
            high-energy movement, the room is a place where
            people can come together, learn new moves and
            feel confident expressing themselves.
          </p>

          <p>
            Whether you're stepping into a dance class for the
            first time or you're already comfortable on the
            dance floor, there's room for you here.
          </p>

        </div>

        <div className="experience-visual">

          <div className="experience-collage">

            <div className="collage-panel collage-panel-one">
              <img
                src={dance01}
                alt="Dance class"
              />
            </div>

            <div className="collage-panel collage-panel-two">
              <img
                src={dance02}
                alt="Dance movement"
              />
            </div>

            <div className="collage-panel collage-panel-three">
              <img
                src={dance03}
                alt="Dance class energy"
              />
            </div>

          </div>

        </div>

      </div>

    </section>
  )
}

export default Experience
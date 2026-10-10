import '../styles/Instructor.css'

import africanBarbieImage from '../assets/african-barbie.jpg'
import favourImage from '../assets/favour.jpg'
import donFlexxImage from '../assets/don-flexx.jpg'

function Instructor() {
  return (
    <section className="instructor">

      <div className="instructor-heading">
        <span className="section-label">MEET THE PEOPLE</span>

        <h2>
          THE PEOPLE
          <br />
          BEHIND THE
          <br />
          <em>ROOM.</em>
        </h2>
      </div>

      <div className="instructor-grid">

        {/* AFRICAN BARBIE */}

        <article className="instructor-card">

          <div className="instructor-image">
            <img
              src={africanBarbieImage}
              alt="African Barbie"
            />
          </div>

          <div className="instructor-content">

            <h3>AFRICAN BARBIE</h3>

            <span className="instructor-styles">
              HOST • CREATIVE DIRECTOR
            </span>

            <p>
              The host and face behind Barbie's Rhythm Room.
              African Barbie brings the energy, personality
              and community that make the room what it is.
            </p>

          </div>

        </article>

        {/* FAVOUR */}

        <article className="instructor-card">

          <div className="instructor-image">
            <img
              src={favourImage}
              alt="Favour, dance instructor"
            />
          </div>

          <div className="instructor-content">

            <h3>FAVOUR</h3>

            <span className="instructor-styles">
              DANCER • CHOREOGRAPHER 
            </span>

            <p>
              Favour leads the class, bringing movement,
              rhythm and energy into the room while creating
              an environment where everyone can learn,
              connect and express themselves.
            </p>

            <a href="/gallery" className="instructor-link">
              See Favour in Motion
            </a>

          </div>

        </article>

        {/* DON FLEXX — SPECIAL GUEST */}

        <article className="instructor-card">

          <div className="instructor-image">
            <img
              src={donFlexxImage}
              alt="Don Flexx, special guest choreographer"
            />
          </div>

          <div className="instructor-content">

            <h3>DON FLEXX</h3>

            <span className="instructor-styles">
              SPECIAL GUEST • CHOREOGRAPHER • DANCER
            </span>

            <p>
              An award-winning choreographer and dancer known
              for his work in music videos and live performances.
              Don Flexx brings his artistry, experience and
              passion for movement to the room.
            </p>

            <a href="/gallery" className="instructor-link">
              Don Flexx in Motion
            </a>

          </div>

        </article>

      </div>

    </section>
  )
}

export default Instructor
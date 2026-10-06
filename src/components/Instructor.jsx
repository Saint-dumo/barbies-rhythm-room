import '../styles/Instructor.css'
import africanBarbieImage from '../assets/african-barbie.jpg'
import favourImage from '../assets/favour.jpg'

function Instructor() {
  return (
    <section className="instructor" id="about">
      <div className="instructor-person">
        <div className="instructor-image">
          <div className="instructor-placeholder">
            <img
              src={africanBarbieImage}
              alt="African Barbie"
            />
          </div>
        </div>

        <div className="instructor-content">
          <span className="section-label">MEET THE HOST</span>

          <h2>
            AFRICAN
            <br />
            <em>BARBIE.</em>
          </h2>

          <p className="instructor-intro">
            The host and face behind Barbie's Rhythm Room.
          </p>

          <p>
            African Barbie brings the energy, community and
            personality that make the room what it is.
          </p>

          <a href="/contact" className="instructor-link">
            Meet the Host
          </a>
        </div>
      </div>

      <div className="instructor-person">
        <div className="instructor-image">
          <div className="instructor-placeholder">
            <img
              src={favourImage}
              alt="Favour, dance instructor"
            />
          </div>
        </div>

        <div className="instructor-content">
          <span className="section-label">MEET THE INSTRUCTOR</span>

          <h2>
            <em>FAVOUR.</em>
          </h2>

          <p className="instructor-intro">
            Bringing movement, rhythm and energy into the room.
          </p>

          <p>
            Favour leads the class and creates an environment
            where everyone can move, learn and express themselves.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Instructor
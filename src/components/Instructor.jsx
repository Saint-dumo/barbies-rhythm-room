import '../styles/Instructor.css'
import instructorImage from '../assets/african-barbie.jpg'

function Instructor() {
  return (
    <section className="instructor" id="about">
      <div className="instructor-image">
        <div className="instructor-placeholder">
            <img
            src={instructorImage}
            alt="African Barbie"
            />
        </div>

        <span className="instructor-number">02</span>
        </div>

      <div className="instructor-content">
        <span className="section-label">MEET THE INSTRUCTOR</span>

        <h2>
          AFRICAN
          <br />
          <em>BARBIE.</em>
        </h2>

        <p className="instructor-intro">
          Dance, culture and confidence come together in
          every class.
        </p>

        <p>
          African Barbie creates a welcoming space where
          dancers can move, learn, express themselves and
          connect through music and movement.
        </p>

        <div className="instructor-details">
          <div>
            <strong>01</strong>
            <span>
              ALL LEVELS
              <br />
              WELCOME
            </span>
          </div>

          <div>
            <strong>02</strong>
            <span>
              FUN &
              <br />
              INCLUSIVE
            </span>
          </div>

          <div>
            <strong>03</strong>
            <span>
              CULTURE &
              <br />
              CONFIDENCE
            </span>
          </div>
        </div>

        <a href="#booking" className="instructor-link">
          Meet African Barbie
        </a>
      </div>
    </section>
  )
}

export default Instructor
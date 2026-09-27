import '../styles/DanceStyles.css'

import dance01 from '../assets/barbie-dance-01.jpg'
import dance02 from '../assets/barbie-dance-02.jpg'
import dance03 from '../assets/barbie-dance-03.jpg'

function DanceStyles() {
  const styles = [
    {
      name: 'Afrobeats',
      number: '01',
      image: dance01,
    },
    {
      name: 'Amapiano',
      number: '02',
      image: dance02,
    },
    {
      name: 'Energy',
      number: '03',
      image: dance03,
    },
  ]

  return (
    <section className="dance-styles" id="styles">
      <div className="dance-styles-header">
        <div>
          <span className="section-label">THE ROOM</span>

          <h2>
            FIND YOUR
            <br />
            <em>RHYTHM.</em>
          </h2>
        </div>

        <p>
          Three styles.
          <br />
          One room.
          <br />
          Endless energy.
        </p>
      </div>

      <div className="styles-grid">
        {styles.map((style) => (
          <article className="style-card" key={style.name}>
            <img
              src={style.image}
              alt={style.name}
            />

            <div className="style-overlay"></div>

            <span className="style-number">
              {style.number}
            </span>

            <h3>{style.name}</h3>
          </article>
        ))}
      </div>
    </section>
  )
}

export default DanceStyles
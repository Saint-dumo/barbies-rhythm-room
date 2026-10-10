import '../styles/Footer.css'
import logo from '../assets/barbiesroomlogo.png'

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" className="icon-fill" />
    </svg>
  )
}

function SnapchatIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3.2c-3.1 0-5.1 2.2-5.1 5.3v2.1c0 .8-.4 1.2-1.1 1.6-.5.3-1.1.4-1.8.6-.3.1-.5.3-.5.6 0 .7 1.2 1 2.1 1.2.4.1.7.2.8.6.2.7.8 1.1 1.5 1.2.7.1 1.2.1 1.7.5.5.4 1.1 1.1 2.4 1.1s1.9-.7 2.4-1.1c.5-.4 1-.4 1.7-.5.7-.1 1.3-.5 1.5-1.2.1-.4.4-.5.8-.6.9-.2 2.1-.5 2.1-1.2 0-.3-.2-.5-.5-.6-.7-.2-1.3-.3-1.8-.6-.7-.4-1.1-.8-1.1-1.6V8.5c0-3.1-2-5.3-5.1-5.3z" />
    </svg>
  )
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14.2 3h3.1c.2 1.7 1.1 3.2 2.7 4.1v3.1c-1.5-.1-2.8-.6-4-1.4v6.3c0 3.4-2.3 5.9-5.8 5.9-3.1 0-5.4-2.2-5.4-5.2 0-3.2 2.5-5.5 5.7-5.5.4 0 .8 0 1.2.1v3.1c-.4-.1-.7-.2-1.1-.2-1.4 0-2.5.9-2.5 2.3 0 1.2.9 2.2 2.2 2.2 1.6 0 2.7-1.1 2.7-3.1V3z" />
    </svg>
  )
}

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-top">
        <a href="/" className="footer-brand">
          <img
            src={logo}
            alt="Barbie's Rhythm Room"
          />
        </a>

        <p>
          MOVE.
          <br />
          EXPRESS.
          <br />
          CONNECT.
        </p>
      </div>

      <div className="footer-main">

        <div className="footer-heading">
          <span>READY TO MOVE?</span>

          <h2>
            SEE YOU
            <br />
            <em>IN THE ROOM.</em>
          </h2>
        </div>

        <div className="footer-socials">

          <span className="footer-social-label">
            FOLLOW THE RHYTHM
          </span>

          <a
            href="https://www.instagram.com/barbie_rhythm_room?rpxt=aDM3c3Znem10OWpz"
            className="social-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramIcon />
            <span>Instagram</span>
          </a>

          <a
            href="https://www.snapchat.com/@africanbarbie_j?sender_web_id=4bf1a279-ad12-445e-b5db-100a857d52dc&device_type=android&is_copy_url=true"
            className="social-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SnapchatIcon />
            <span>Snapchat</span>
          </a>

          <a
            href="https://tr.ee/A5o8yfpraq"
            className="social-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TikTokIcon />
            <span>TikTok</span>
          </a>

        </div>
      </div>

      <div className="footer-bottom">

        <span>
          © 2026 BARBIE'S RHYTHM ROOM
        </span>

        <div className="footer-links">
          <a href="/#about">About</a>
          <a href="/gallery">Gallery</a>
          <a href="/#faq">FAQ</a>
        </div>

        <a href="#top" className="footer-top-link">
          BACK TO TOP ↑
        </a>

      </div>

    </footer>
  )
}

export default Footer
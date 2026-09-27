import '../styles/Navbar.css'

function Navbar() {
  return (
    <header className="navbar">
      <a href="/" className="navbar-logo">
        <span>BARBIE'S</span>
        <small>RHYTHM ROOM</small>
      </a>

      <nav className="navbar-links">
        <a href="#experience">Experience</a>
        <a href="#about">About</a>
        <a href="#faq">FAQ</a>
      </nav>

      <div className="navbar-actions">
        <a href="#booking" className="navbar-book">
          Book Now
        </a>

        <button className="menu-button" aria-label="Open menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  )
}

export default Navbar
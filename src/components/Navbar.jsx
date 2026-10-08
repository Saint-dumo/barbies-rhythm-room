import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import logo from '../assets/barbiesroomlogo.png'
import '../styles/Navbar.css'

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const location = useLocation()
  const isBookingPage = location.pathname === '/booking'

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80)
    }

    handleScroll()

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const lightNavbar = scrolled || isBookingPage

  const closeMenu = () => {
    setMenuOpen(false)
  }

  return (
    <header
      className={`navbar ${
        lightNavbar ? 'navbar-scrolled' : ''
      } ${menuOpen ? 'navbar-menu-open' : ''}`}
    >

      <a href="/" className="navbar-logo" onClick={closeMenu}>
        <img src={logo} alt="Barbie's Rhythm Room" />
      </a>

      {/* DESKTOP NAV */}

      <nav className="navbar-links">

        <a href="/#about">
          ABOUT
        </a>

        <a href="/#gallery">
          GALLERY
        </a>

        <a href="/#faq">
          FAQ
        </a>

        <a href="/booking" className="navbar-book">
          BOOK NOW
        </a>

      </nav>

      {/* MOBILE MENU BUTTON */}

      <button
        className={`menu-button ${menuOpen ? 'menu-button-open' : ''}`}
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* MOBILE MENU */}

      <div className={`mobile-menu ${menuOpen ? 'mobile-menu-open' : ''}`}>

        <nav className="mobile-menu-links">

          <a href="/#about" onClick={closeMenu}>
            ABOUT
          </a>

          <a href="/#gallery" onClick={closeMenu}>
            GALLERY
          </a>

          <a href="/#faq" onClick={closeMenu}>
            FAQ
          </a>

          <a
            href="/booking"
            className="mobile-menu-book"
            onClick={closeMenu}
          >
            BOOK NOW
          </a>

        </nav>

        <div className="mobile-menu-footer">
          <span>AFROBEATS</span>
          <span>AMAPIANO</span>
          <span>ENERGY</span>
        </div>

      </div>

    </header>
  )
}

export default Navbar
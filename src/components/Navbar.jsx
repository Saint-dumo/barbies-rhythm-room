import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import '../styles/Navbar.css'

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  const isBookingPage = location.pathname === '/booking'

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80)
    }

    handleScroll()

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const lightNavbar = scrolled || isBookingPage

  return (
    <header className={`navbar ${lightNavbar ? 'navbar-scrolled' : ''}`}>
      <a href="/" className="navbar-logo">
        <span>BARBIE'S</span>
        <small>RHYTHM ROOM</small>
      </a>

      <nav className="navbar-links">
        <a href="/#experience">EXPERIENCE</a>
        <a href="/#about">ABOUT</a>
        <a href="/#faq">FAQ</a>

        <a href="/booking" className="navbar-book">
          BOOK NOW
        </a>
      </nav>

      <button className="menu-button" aria-label="Open menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </header>
  )
}

export default Navbar
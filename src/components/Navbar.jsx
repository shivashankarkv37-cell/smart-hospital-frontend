import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const primaryLinks = [
  { to: '/', label: 'Home' },
  { to: '/doctors', label: 'Doctors' },
  { to: '/departments', label: 'Departments' },
]

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <header className="site-header">
      <div className="container navbar">
        <Link className="brand" to="/" aria-label="CareBridge Hospital home" onClick={closeMenu}>
          <span className="brand-mark" aria-hidden="true">+</span>
          <span>CareBridge<span className="brand-subtitle">HOSPITAL</span></span>
        </Link>

        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((isOpen) => !isOpen)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav
          className={`navigation${menuOpen ? ' navigation-open' : ''}`}
          id="primary-navigation"
          aria-label="Main navigation"
        >
          <div className="navigation-links">
            {primaryLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) => `nav-link${isActive ? ' nav-link-active' : ''}`}
                onClick={closeMenu}
              >
                {label}
              </NavLink>
            ))}
          </div>
          <div className="navigation-actions">
            <NavLink className="nav-link nav-login" to="/login" onClick={closeMenu}>
              Log in
            </NavLink>
            <NavLink className="button button-small" to="/register" onClick={closeMenu}>
              Create account
            </NavLink>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Navbar

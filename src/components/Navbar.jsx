import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

const SEASONS_ITEMS = ['Mo Dé, Mo Set', 'Christmas 2026']

const linkStyle = {
  fontFamily: "'Nunito Sans', system-ui, sans-serif",
  fontSize: '12px',
  fontWeight: 500,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: '#FFFFFF',
  cursor: 'pointer',
  userSelect: 'none',
  whiteSpace: 'nowrap',
  textDecoration: 'none',
}

export default function Navbar() {
  const [menuOpen, setMenuOpen]               = useState(false)
  const [seasonsDropdown, setSeasonsDropdown] = useState(false)
  const [seasonsOpen, setSeasonsOpen]         = useState(false)

  const navigate  = useNavigate()
  const location  = useLocation()

  const handleBookNow = () => {
    setMenuOpen(false)
    if (location.pathname === '/') {
      document.getElementById('book-now')?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/', { state: { scrollToForm: true } })
    }
  }

  return (
    <>
      {/* ── Fixed nav bar ── */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: 'transparent' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '28px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* Logo → home */}
          <Link to="/" style={{ display: 'block', lineHeight: 0 }}>
            <img
              src="/jec-logo.png"
              alt="Jet Exclusive Concierge"
              style={{ height: '78px', width: 'auto', display: 'block', objectFit: 'contain' }}
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden sm:flex items-center" style={{ gap: '48px' }}>

            {/* Seasons dropdown */}
            <div
              style={{ position: 'relative' }}
              onMouseEnter={() => setSeasonsDropdown(true)}
              onMouseLeave={() => setSeasonsDropdown(false)}
            >
              <span style={linkStyle}>Seasons</span>

              {seasonsDropdown && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  backgroundColor: 'rgba(10, 10, 15, 0.95)',
                  minWidth: '200px',
                  zIndex: 200,
                  paddingTop: '20px',
                }}>
                  {SEASONS_ITEMS.map((item) => (
                    <div
                      key={item}
                      style={{
                        fontFamily: "'Nunito Sans', system-ui, sans-serif",
                        fontSize: '11px',
                        fontWeight: 400,
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color: '#FFFFFF',
                        padding: '14px 20px',
                        cursor: 'pointer',
                        userSelect: 'none',
                        borderBottom: '1px solid rgba(255,255,255,0.06)',
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Protocol */}
            <Link to="/protocol" style={linkStyle}>Protocol</Link>

            {/* Book Now — scroll to form */}
            <button onClick={handleBookNow} style={{ ...linkStyle, background: 'none', border: 'none', padding: 0 }}>
              Book Now
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="flex sm:hidden flex-col items-center"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            style={{ background: 'none', border: 'none', padding: '8px', cursor: 'pointer', gap: '6px' }}
          >
            <span style={{ display: 'block', width: '24px', height: '1.5px', backgroundColor: '#FFFFFF' }} />
            <span style={{ display: 'block', width: '24px', height: '1.5px', backgroundColor: '#FFFFFF' }} />
            <span style={{ display: 'block', width: '24px', height: '1.5px', backgroundColor: '#FFFFFF' }} />
          </button>
        </div>
      </nav>

      {/* ── Mobile full-screen overlay ── */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 99,
            backgroundColor: 'rgba(10, 10, 15, 0.95)',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', gap: '40px', paddingTop: '95px',
          }}
          onClick={(e) => { if (e.target === e.currentTarget) setMenuOpen(false) }}
        >
          {/* Seasons collapsible */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            <span
              onClick={() => setSeasonsOpen(!seasonsOpen)}
              style={{ ...linkStyle, fontSize: '13px', letterSpacing: '0.22em' }}
            >
              Seasons {seasonsOpen ? '−' : '+'}
            </span>
            {seasonsOpen && SEASONS_ITEMS.map((item) => (
              <span
                key={item}
                onClick={() => setMenuOpen(false)}
                style={{ ...linkStyle, fontSize: '11px', letterSpacing: '0.14em', color: '#a0a0b0' }}
              >
                {item}
              </span>
            ))}
          </div>

          {/* Protocol */}
          <Link
            to="/protocol"
            onClick={() => setMenuOpen(false)}
            style={{ ...linkStyle, fontSize: '13px', letterSpacing: '0.22em' }}
          >
            Protocol
          </Link>

          {/* Book Now */}
          <button
            onClick={handleBookNow}
            style={{ ...linkStyle, fontSize: '13px', letterSpacing: '0.22em', background: 'none', border: 'none', padding: 0 }}
          >
            Book Now
          </button>
        </div>
      )}
    </>
  )
}

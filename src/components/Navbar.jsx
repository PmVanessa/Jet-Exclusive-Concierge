import { useState } from 'react'

const NAV_LINKS = ['Protocol', 'The Standard', 'Your Arrival']

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      {/* ── Fixed nav bar ── */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: 'transparent',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '28px 48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo — always visible including on mobile */}
          <img
            src="/jec-logo.png"
            alt="Jet Exclusive Concierge"
            style={{
              height: '78px',
              width: 'auto',
              display: 'block',
              objectFit: 'contain',
            }}
          />

          {/* Desktop links */}
          <div
            className="hidden sm:flex items-center"
            style={{
              gap: '48px',
            }}
          >
            {NAV_LINKS.map((label) => (
              <span
                key={label}
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '12px',
                  fontWeight: 400,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: '#FFFFFF',
                  cursor: 'pointer',
                  userSelect: 'none',
                }}
              >
                {label}
              </span>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="flex sm:hidden flex-col items-center"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            style={{
              background: 'none',
              border: 'none',
              padding: '8px',
              cursor: 'pointer',
              gap: '6px',
            }}
          >
            <span style={{ display: 'block', width: '24px', height: '1.5px', backgroundColor: '#FFFFFF' }} />
            <span style={{ display: 'block', width: '24px', height: '1.5px', backgroundColor: '#FFFFFF' }} />
            <span style={{ display: 'block', width: '24px', height: '1.5px', backgroundColor: '#FFFFFF' }} />
          </button>
        </div>
      </nav>

      {/* ── Mobile full-screen overlay (sits below nav so logo + hamburger stay visible) ── */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99,
            backgroundColor: 'rgba(10, 10, 15, 0.95)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '52px',
          }}
          onClick={() => setMenuOpen(false)}
        >
          {NAV_LINKS.map((label) => (
            <span
              key={label}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '13px',
                fontWeight: 400,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#FFFFFF',
                cursor: 'pointer',
                userSelect: 'none',
              }}
            >
              {label}
            </span>
          ))}
        </div>
      )}

    </>
  )
}

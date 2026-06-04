import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

const SOCIAL_LINKS = [
  {
    label: 'Instagram',
    href: 'https://instagram.com/jetexclusiveconcierge',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter">
        <rect x="2" y="2" width="20" height="20" />
        <circle cx="12" cy="12" r="5" />
        <rect x="16.5" y="5" width="2" height="2" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/2348055535532',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.858L.057 23.428a.75.75 0 00.916.916l5.57-1.475A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.71 9.71 0 01-4.964-1.365l-.356-.211-3.685.976.976-3.685-.211-.356A9.71 9.71 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: 'https://tiktok.com/@jetexclusiveconcierge',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.75a8.18 8.18 0 004.78 1.52V6.82a4.85 4.85 0 01-1.01-.13z" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://facebook.com/jetexclusiveconcierge',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
  },
  {
    label: 'Twitter / X',
    href: 'https://x.com/jetexclusiveltd',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.631L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/company/jetexclusiveconcierge',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
]

const SEASONS_ITEMS = [
  { label: 'Mo Dé, Mo Set',   to: '/modemoset'     },
  { label: 'Christmas 2026',  to: '/christmas-2026' },
]

const NAV_LINKS = [
  { label: 'Seasons',  dropdown: true  },
  { label: 'Protocol', to: '/protocol' },
  { label: 'Pricing',  pricing: true   },
  { label: 'Book Now', to: null        }, // scrolls to form — handled by parent
]

const micro = {
  fontFamily: "'Nunito Sans', system-ui, sans-serif",
  fontSize: '12px',
  fontWeight: 500,
  color: '#a0a0b0',
  letterSpacing: '0.5px',
  lineHeight: 2,
}

export default function Footer() {
  const navigate = useNavigate()
  const location = useLocation()
  const [seasonsOpen, setSeasonsOpen] = useState(false)

  const handleBookNow = () => {
    if (location.pathname === '/') {
      document.getElementById('book-now')?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/', { state: { scrollToForm: true } })
    }
  }

  const handlePricing = () => {
    if (location.pathname === '/') {
      document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/', { state: { scrollToPricing: true } })
    }
  }

  return (
    <footer
      style={{
        backgroundColor: '#0a0a0f',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        position: 'relative',
        zIndex: 2,
      }}
    >
      {/* ── Main strip ── */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 clamp(16px, 2.5vw, 24px)',
        }}
      >
        {/* Desktop: single row | Mobile: stacked */}
        <div
          className="
            flex flex-col sm:flex-row
            items-start sm:items-center
            gap-5 sm:gap-0
            sm:justify-between
            py-6 sm:py-0
          "
          style={{ minHeight: '80px', paddingTop: '20px' }}
        >
          {/* Logo */}
          <div style={{ flexShrink: 0 }}>
            <Link to="/">
              <img
                src="/jec-logo.png"
                alt="Jet Exclusive Concierge"
                style={{ height: '78px', width: 'auto', display: 'block', objectFit: 'contain' }}
              />
            </Link>
          </div>

          {/* Tagline */}
          <p
            style={{
              ...micro,
              maxWidth: '180px',
              flexShrink: 0,
              marginLeft: 'clamp(12px, 2vw, 28px)',
            }}
            className="hidden sm:block"
          >
            Airport protocol and executive mobility across Nigeria
          </p>

          {/* Centre — contact */}
          <div
            style={{ flexShrink: 0, marginLeft: 'auto', marginRight: 'auto', textAlign: 'center' }}
            className="sm:block"
          >
            <a
              href="mailto:jetexclusiveltd@gmail.com"
              style={{ ...micro, display: 'block', textDecoration: 'none' }}
            >
              jetexclusiveltd@gmail.com
            </a>
            <a
              href="tel:+2348055535532"
              style={{ ...micro, display: 'block', textDecoration: 'none' }}
            >
              +234 805 553 5532
            </a>
            <span style={{ ...micro, display: 'block' }}>Nigeria.</span>
          </div>

          {/* Nav links — horizontal */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              flexShrink: 0,
              marginLeft: 'clamp(12px, 2vw, 28px)',
            }}
            className="hidden sm:flex"
          >
            {NAV_LINKS.map(({ label, to, dropdown }) => {
              const sharedStyle = {
                fontFamily: "'Nunito Sans', system-ui, sans-serif",
                fontSize: '12px',
                fontWeight: 500,
                color: '#FFFFFF',
                letterSpacing: '0.5px',
                whiteSpace: 'nowrap',
                textDecoration: 'none',
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
              }
              if (dropdown) {
                return (
                  <div
                    key={label}
                    style={{ position: 'relative' }}
                    onMouseEnter={() => setSeasonsOpen(true)}
                    onMouseLeave={() => setSeasonsOpen(false)}
                  >
                    <span style={{ ...sharedStyle, cursor: 'default' }}>{label}</span>
                    {seasonsOpen && (
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '100%',
                          left: 0,
                          paddingBottom: '8px',
                          zIndex: 100,
                        }}
                      >
                        <div
                          style={{
                            backgroundColor: 'rgba(10, 10, 15, 0.95)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            padding: '8px 0',
                            minWidth: '160px',
                          }}
                        >
                          {SEASONS_ITEMS.map(({ label: itemLabel, to: itemTo }) => (
                            <Link
                              key={itemLabel}
                              to={itemTo}
                              onClick={() => setSeasonsOpen(false)}
                              style={{
                                display: 'block',
                                padding: '8px 16px',
                                fontFamily: "'Nunito Sans', system-ui, sans-serif",
                                fontSize: '12px',
                                fontWeight: 500,
                                color: '#FFFFFF',
                                letterSpacing: '0.5px',
                                textDecoration: 'none',
                                whiteSpace: 'nowrap',
                              }}
                            >
                              {itemLabel}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )
              }
              if (label === 'Book Now') {
                return <button key={label} onClick={handleBookNow} style={sharedStyle}>{label}</button>
              }
              if (label === 'Pricing') {
                return <button key={label} onClick={handlePricing} style={sharedStyle}>{label}</button>
              }
              if (to) {
                return <Link key={label} to={to} style={sharedStyle}>{label}</Link>
              }
              return <span key={label} style={{ ...sharedStyle, cursor: 'default' }}>{label}</span>
            })}
          </div>

          {/* Social icons */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              flexShrink: 0,
              marginLeft: 'clamp(12px, 2vw, 28px)',
            }}
          >
            {SOCIAL_LINKS.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                style={{ color: '#a0a0b0', display: 'block', lineHeight: 0 }}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Copyright ── */}
      <div
        style={{
          borderTop: '1px solid rgba(255,255,255,0.04)',
          textAlign: 'center',
          padding: '10px 24px',
        }}
      >
        <span
          style={{
            fontFamily: "'Nunito Sans', system-ui, sans-serif",
            fontSize: '10px',
            fontWeight: 400,
            color: '#a0a0b0',
            letterSpacing: '0.06em',
          }}
        >
          © 2026 Jet Exclusive Concierge. All rights reserved.
        </span>
      </div>
    </footer>
  )
}

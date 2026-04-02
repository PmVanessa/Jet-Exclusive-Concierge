import { Link } from 'react-router-dom'

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

const NAV_LINKS = [
  { label: 'Protocol',     to: '/protocol' },
  { label: 'Your Arrival', to: '/contact'  },
]

const micro = {
  fontFamily: 'Inter, system-ui, sans-serif',
  fontSize: '11px',
  fontWeight: 400,
  color: '#a0a0b0',
  letterSpacing: '0.04em',
  lineHeight: 1.6,
}

export default function Footer() {
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
            <img
              src="/jec-logo.png"
              alt="Jet Exclusive Concierge"
              style={{ height: '78px', width: 'auto', display: 'block', objectFit: 'contain' }}
            />
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
              href="mailto:hello@jetexclusiveconcierge.com"
              style={{ ...micro, display: 'block', textDecoration: 'none' }}
            >
              hello@jetexclusiveconcierge.com
            </a>
            <span style={{ ...micro, display: 'block' }}>Lagos. Abuja.</span>
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
            {NAV_LINKS.map(({ label, to }) => (
              <Link
                key={label}
                to={to}
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '11px',
                  fontWeight: 400,
                  color: '#FFFFFF',
                  letterSpacing: '0.06em',
                  whiteSpace: 'nowrap',
                  textDecoration: 'none',
                }}
              >
                {label}
              </Link>
            ))}
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
            fontFamily: 'Inter, system-ui, sans-serif',
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

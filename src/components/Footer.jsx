import { Link } from 'react-router-dom'
import {
  FaInstagram,
  FaTiktok,
  FaFacebook,
  FaXTwitter,
  FaLinkedinIn,
} from 'react-icons/fa6'

const navLinks = [
  { label: 'Protocol', to: '/protocol' },
  { label: 'The Standard', to: '/standard' },
  { label: 'Your Arrival', to: '/contact' },
]

const socialLinks = [
  {
    Icon: FaInstagram,
    href: 'https://www.instagram.com/jetexclusiveconcierge',
    label: 'Instagram',
  },
  {
    Icon: FaTiktok,
    href: 'https://www.tiktok.com/@jetexclusiveconcierge',
    label: 'TikTok',
  },
  {
    Icon: FaFacebook,
    href: 'https://www.facebook.com/jetexclusiveconcierge',
    label: 'Facebook',
  },
  {
    Icon: FaXTwitter,
    href: 'https://x.com/jetexclusiveltd',
    label: 'X / Twitter',
  },
  {
    Icon: FaLinkedinIn,
    href: 'https://www.linkedin.com/company/jetexclusiveconcierge',
    label: 'LinkedIn',
  },
]

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#0a0a0f',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '64px 32px 48px',
        }}
      >
        {/* Three columns */}
        <div
          className="footer-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '48px',
            alignItems: 'start',
            marginBottom: '48px',
          }}
        >
          {/* Left — Brand */}
          <div>
            <Link
              to="/"
              style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontStyle: 'italic',
                fontWeight: 400,
                fontSize: '32px',
                color: '#FFFFFF',
                textDecoration: 'none',
                letterSpacing: '0.1em',
                display: 'block',
                marginBottom: '8px',
              }}
            >
              JEC
            </Link>
            <p
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '12px',
                color: '#a0a0b0',
                letterSpacing: '0.05em',
              }}
            >
              Jet Exclusive Concierge
            </p>
          </div>

          {/* Centre — Nav links */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '12px',
                  color: '#a0a0b0',
                  textDecoration: 'none',
                  letterSpacing: '0.08em',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#FFFFFF' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#a0a0b0' }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right — Social icons */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '20px',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            {socialLinks.map(({ Icon, href, label }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                style={{
                  color: '#a0a0b0',
                  transition: 'color 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#FFFFFF' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#a0a0b0' }}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom line */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.06)',
            paddingTop: '24px',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: '11px',
              color: '#a0a0b0',
              letterSpacing: '0.06em',
            }}
          >
            © 2025 Jet Exclusive Concierge. All rights reserved.
          </p>
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 767px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
          .footer-grid > div:last-child {
            justify-content: flex-start !important;
          }
        }
      `}</style>
    </footer>
  )
}

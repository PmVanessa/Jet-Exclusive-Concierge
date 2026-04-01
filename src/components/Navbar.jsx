import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollPosition } from '../hooks/useScrollPosition'

const navLinks = [
  { label: 'Protocol', to: '/protocol' },
  { label: 'The Standard', to: '/standard' },
  { label: 'Your Arrival', to: '/contact' },
]

export default function Navbar() {
  const scrollY = useScrollPosition()
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const scrolled = scrollY > 80

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  // Prevent body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          transition: 'background-color 0.4s ease, backdrop-filter 0.4s ease',
          backgroundColor: scrolled ? 'rgba(10, 10, 15, 0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 32px',
            height: '72px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <Link
            to="/"
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: '28px',
              color: '#FFFFFF',
              letterSpacing: '0.12em',
              textDecoration: 'none',
              lineHeight: 1,
            }}
          >
            JEC
          </Link>

          {/* Desktop nav */}
          <div
            className="desktop-nav"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '40px',
            }}
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                style={({ isActive }) => ({
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '13px',
                  fontWeight: 400,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: isActive ? '#FFFFFF' : '#a0a0b0',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                })}
                onMouseEnter={(e) => { e.target.style.color = '#FFFFFF' }}
                onMouseLeave={(e) => {
                  // Check if still active
                  if (!e.target.classList.contains('active')) {
                    e.target.style.color = '#a0a0b0'
                  }
                }}
              >
                {link.label}
              </NavLink>
            ))}

            {/* CTA Button */}
            <Link
              to="/contact"
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#FFFFFF',
                backgroundColor: '#F02232',
                textDecoration: 'none',
                padding: '12px 24px',
                display: 'inline-block',
                transition: 'background-color 0.2s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#c71b27' }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#F02232' }}
            >
              Your Arrival
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              padding: '8px',
              cursor: 'pointer',
              flexDirection: 'column',
              gap: '5px',
              alignItems: 'flex-end',
            }}
            className="mobile-hamburger"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                display: 'block',
                width: '24px',
                height: '1px',
                backgroundColor: '#FFFFFF',
                transformOrigin: 'center',
              }}
            />
            <motion.span
              animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
              style={{
                display: 'block',
                width: '18px',
                height: '1px',
                backgroundColor: '#FFFFFF',
              }}
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                display: 'block',
                width: '24px',
                height: '1px',
                backgroundColor: '#FFFFFF',
                transformOrigin: 'center',
              }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 999,
              backgroundColor: '#0a0a0f',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '48px',
            }}
          >
            {/* Close area click */}
            <div
              style={{ position: 'absolute', inset: 0 }}
              onClick={() => setMenuOpen(false)}
            />

            {/* Links */}
            {navLinks.map((link, i) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.4 }}
                style={{ position: 'relative', zIndex: 1 }}
              >
                <Link
                  to={link.to}
                  style={{
                    fontFamily: '"Cormorant Garamond", Georgia, serif',
                    fontStyle: 'italic',
                    fontWeight: 300,
                    fontSize: '48px',
                    color: '#FFFFFF',
                    textDecoration: 'none',
                    letterSpacing: '0.02em',
                    display: 'block',
                    textAlign: 'center',
                  }}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.4 }}
              style={{ position: 'relative', zIndex: 1 }}
            >
              <Link
                to="/contact"
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '11px',
                  fontWeight: 500,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#FFFFFF',
                  backgroundColor: '#F02232',
                  textDecoration: 'none',
                  padding: '14px 32px',
                  display: 'inline-block',
                }}
              >
                Your Arrival
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Responsive styles via style tag */}
      <style>{`
        @media (max-width: 767px) {
          .desktop-nav { display: none !important; }
          .mobile-hamburger { display: flex !important; }
        }
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .mobile-hamburger { display: none !important; }
        }
      `}</style>
    </>
  )
}

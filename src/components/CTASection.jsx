import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function CTASection({ hasVideo = true }) {
  return (
    <section
      style={{
        position: 'relative',
        zIndex: hasVideo ? 10 : 2,
        overflow: 'hidden',
      }}
    >
      {/* Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(10, 10, 15, 0.85)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '140px 32px',
          textAlign: 'center',
        }}
        className="cta-section-inner"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h2
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontWeight: 300,
              fontSize: '56px',
              color: '#FFFFFF',
              lineHeight: 1.05,
              marginBottom: '20px',
              letterSpacing: '-0.01em',
            }}
            className="cta-headline"
          >
            Your May trip starts here.
          </h2>

          <p
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: '15px',
              color: '#a0a0b0',
              letterSpacing: '0.02em',
              marginBottom: '48px',
            }}
          >
            Book early. Arrive with everything already set.
          </p>

          <Link
            to="/contact"
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: '12px',
              fontWeight: 500,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#FFFFFF',
              backgroundColor: '#F02232',
              textDecoration: 'none',
              padding: '18px 48px',
              display: 'inline-block',
              transition: 'background-color 0.2s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#c71b27' }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#F02232' }}
          >
            Enquire Now
          </Link>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .cta-section-inner { padding: 80px 24px !important; }
          .cta-headline { font-size: 36px !important; }
        }
      `}</style>
    </section>
  )
}

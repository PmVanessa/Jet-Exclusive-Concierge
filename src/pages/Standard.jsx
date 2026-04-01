import { motion } from 'framer-motion'
import CTASection from '../components/CTASection'
import Footer from '../components/Footer'

const textSections = [
  'Jet Exclusive Concierge is a protocol and concierge service built for travellers who expect precision. We operate across Lagos and Abuja, coordinating airport arrivals, city movement, and event-day logistics for clients who do not compromise on how they arrive.',
  'Every booking is handled personally. We do not use call centres or automated systems. When you reach out, you speak to someone who knows MMIA and the city well enough to anticipate what you need before you ask.',
  'We work best with clients who plan ahead. Not because we cannot move quickly, but because the quality of what we deliver is highest when we have time to do it properly.',
]

const trustSignals = [
  'Every booking handled personally.',
  'Operating at MMIA Lagos and NAIA Abuja.',
  'Precision at every transition.',
]

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
}

export default function Standard() {
  return (
    <div
      className="page-transition grain-static"
      style={{ backgroundColor: '#0a0a0f', minHeight: '100vh' }}
    >
      {/* ── Hero ── */}
      <section
        style={{
          position: 'relative',
          zIndex: 2,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '140px 32px',
        }}
        className="section-pad"
      >
        <div style={{ maxWidth: '720px', width: '100%' }}>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontWeight: 300,
              fontSize: '72px',
              color: '#FFFFFF',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              marginBottom: '80px',
            }}
            className="standard-h1"
          >
            We handle the details so you never have to think about them.
          </motion.h1>

          {/* Three editorial text sections */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
            {textSections.map((text, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 + i * 0.15 }}
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '17px',
                  color: '#a0a0b0',
                  lineHeight: 1.9,
                  letterSpacing: '0.01em',
                }}
              >
                {text}
              </motion.p>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust signals ── */}
      <section
        style={{
          position: 'relative',
          zIndex: 2,
          padding: '120px 32px',
          backgroundColor: 'rgba(46,18,97,0.12)',
        }}
        className="trust-section"
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: '60px',
            }}
            className="trust-grid"
          >
            {trustSignals.map((signal) => (
              <motion.div key={signal} variants={itemVariants}>
                {/* Red top line */}
                <div
                  style={{
                    width: '32px',
                    height: '2px',
                    backgroundColor: '#F02232',
                    marginBottom: '28px',
                  }}
                />
                <p
                  style={{
                    fontFamily: '"Cormorant Garamond", Georgia, serif',
                    fontStyle: 'italic',
                    fontWeight: 400,
                    fontSize: '28px',
                    color: '#FFFFFF',
                    lineHeight: 1.3,
                    letterSpacing: '-0.01em',
                  }}
                  className="trust-signal-text"
                >
                  {signal}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA — no video on this page */}
      <CTASection hasVideo={false} />
      <Footer />

      <style>{`
        @media (max-width: 767px) {
          .standard-h1 { font-size: 40px !important; margin-bottom: 48px !important; }
          .section-pad { padding: 100px 24px !important; }
          .trust-section { padding: 80px 24px !important; }
          .trust-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .trust-signal-text { font-size: 24px !important; }
        }
      `}</style>
    </div>
  )
}

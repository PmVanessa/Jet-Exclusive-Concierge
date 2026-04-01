import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ScrollIndicator from '../components/ScrollIndicator'
import CTASection from '../components/CTASection'
import Footer from '../components/Footer'

// Pexels direct video: luxury car arriving at night
const VIDEO_SRC = 'https://videos.pexels.com/video-files/8344926/8344926-hd_1920_1080_25fps.mp4'

const pillars = [
  {
    numeral: 'I',
    title: 'Airport Protocol',
    body: 'From the gate to your destination, handled.',
  },
  {
    numeral: 'II',
    title: 'City Movement',
    body: 'Executive transfers across Lagos and Abuja, on your terms.',
  },
  {
    numeral: 'III',
    title: 'Event Coordination',
    body: 'Ojude Oba. Salah. Every occasion where how you arrive matters.',
  },
]

// Hero uses 0.2s stagger per spec; pillars use 0.15s (separate variants below)
const heroContainerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.20 },
  },
}

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
}

export default function Home() {
  return (
    <div className="page-transition">
      {/* ── Fixed Video Background ── */}
      <div className="video-bg">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
      </div>

      {/* ══════════════════════════════════════════════
          Section 1 — Hero
      ══════════════════════════════════════════════ */}
      <section
        style={{
          position: 'relative',
          zIndex: 10,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {/* 50% dark overlay */}
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(10,10,15,0.50)', pointerEvents: 'none' }} />

        {/* Content */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            textAlign: 'center',
            padding: '0 24px',
            maxWidth: '900px',
          }}
        >
          <motion.div
            variants={heroContainerVariants}
            initial="hidden"
            animate="show"
          >
            {/* Headline */}
            <motion.h1 variants={itemVariants} className="hero-headline">
              <span style={{ display: 'block' }}>You arrive.</span>
              <span style={{ display: 'block' }}>Everything else is already handled.</span>
            </motion.h1>

            {/* Subline */}
            <motion.p variants={itemVariants} className="hero-subline">
              Airport protocol and concierge coordination in Lagos and Abuja.
            </motion.p>

            {/* CTA */}
            <motion.div variants={itemVariants}>
              <Link
                to="/contact"
                className="btn-primary"
              >
                Plan Your Arrival
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <ScrollIndicator />
      </section>

      {/* ══════════════════════════════════════════════
          Section 2 — Positioning Statement
      ══════════════════════════════════════════════ */}
      <section
        style={{
          position: 'relative',
          zIndex: 10,
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(10,10,15,0.75)', pointerEvents: 'none' }} />

        <div
          style={{
            position: 'relative',
            zIndex: 1,
            textAlign: 'center',
            padding: '160px 32px',
            maxWidth: '900px',
            margin: '0 auto',
          }}
          className="section-pad"
        >
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="positioning-text"
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: '52px',
              color: '#FFFFFF',
              lineHeight: 1.2,
              letterSpacing: '-0.01em',
            }}
          >
            JEC exists for one reason. So that by the time you land, nothing is left to chance.
          </motion.p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          Section 3 — Three Service Pillars
      ══════════════════════════════════════════════ */}
      <section
        style={{
          position: 'relative',
          zIndex: 10,
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(10,10,15,0.80)', pointerEvents: 'none' }} />

        <div
          style={{
            position: 'relative',
            zIndex: 1,
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '140px 32px',
          }}
          className="section-pad"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="pillars-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: '60px',
            }}
          >
            {pillars.map((pillar) => (
              <motion.div
                key={pillar.numeral}
                variants={itemVariants}
              >
                <p
                  style={{
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontSize: '11px',
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase',
                    color: '#a0a0b0',
                    marginBottom: '20px',
                  }}
                >
                  {pillar.numeral}
                </p>
                <h3
                  style={{
                    fontFamily: '"Cormorant Garamond", Georgia, serif',
                    fontWeight: 400,
                    fontSize: '36px',
                    color: '#FFFFFF',
                    marginBottom: '16px',
                    lineHeight: 1.1,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {pillar.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontSize: '15px',
                    color: '#a0a0b0',
                    lineHeight: 1.6,
                    marginBottom: '32px',
                  }}
                >
                  {pillar.body}
                </p>
                <div
                  style={{
                    width: '100%',
                    height: '1px',
                    backgroundColor: 'rgba(160,160,176,0.20)',
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          Section 4 — The Arrival Moment (split)
      ══════════════════════════════════════════════ */}
      <section
        style={{
          position: 'relative',
          zIndex: 10,
          overflow: 'hidden',
          minHeight: '600px',
        }}
      >
        {/* Full section overlay — only on left half via gradient */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, rgba(46,18,97,0.70) 0%, rgba(46,18,97,0.70) 55%, rgba(10,10,15,0.30) 55%, rgba(10,10,15,0.30) 100%)',
            pointerEvents: 'none',
          }}
          className="arrival-overlay"
        />

        <div
          style={{
            position: 'relative',
            zIndex: 1,
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '140px 32px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '80px',
            alignItems: 'center',
          }}
          className="arrival-grid section-pad"
        >
          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h2
              style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontWeight: 400,
                fontSize: '48px',
                color: '#FFFFFF',
                lineHeight: 1.1,
                marginBottom: '28px',
                letterSpacing: '-0.01em',
              }}
              className="arrival-headline"
            >
              This is what sorted looks like.
            </h2>
            <p
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '16px',
                color: '#a0a0b0',
                lineHeight: 1.8,
                maxWidth: '480px',
              }}
              className="arrival-body"
            >
              No searching for your name. No negotiating with strangers. No wondering if the car will show. Just someone who already knows where you are going and has made sure everything is ready before you land.
            </p>
          </motion.div>

          {/* Right — transparent (video breathes through) */}
          <div style={{ minHeight: '300px' }} />
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          Section 5 — Lagos Context
      ══════════════════════════════════════════════ */}
      <section
        style={{
          position: 'relative',
          zIndex: 10,
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(10,10,15,0.65)', pointerEvents: 'none' }} />

        <div
          style={{
            position: 'relative',
            zIndex: 1,
            textAlign: 'center',
            padding: '120px 32px',
            maxWidth: '1200px',
            margin: '0 auto',
          }}
          className="section-pad"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <p
              style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontStyle: 'italic',
                fontWeight: 300,
                fontSize: '40px',
                color: '#FFFFFF',
                marginBottom: '20px',
                lineHeight: 1.2,
              }}
              className="lagos-text"
            >
              Based in Lagos. Ready in Abuja.
            </p>
            <p
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '13px',
                color: '#a0a0b0',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
              }}
            >
              MMIA Lagos — NAIA Abuja
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          Section 6 — CTA
      ══════════════════════════════════════════════ */}
      <CTASection hasVideo={true} />

      {/* Footer */}
      <Footer />

      {/* ── Responsive styles ── */}
      <style>{`
        .hero-headline {
          font-family: "Cormorant Garamond", Georgia, serif;
          font-weight: 300;
          font-size: 96px;
          color: #FFFFFF;
          line-height: 1.05;
          letter-spacing: -0.02em;
          margin-bottom: 28px;
        }
        .hero-subline {
          font-family: Inter, system-ui, sans-serif;
          font-size: 16px;
          color: #a0a0b0;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          margin-bottom: 48px;
        }
        .btn-primary {
          font-family: Inter, system-ui, sans-serif;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #FFFFFF;
          background-color: #F02232;
          text-decoration: none;
          padding: 18px 48px;
          display: inline-block;
          transition: background-color 0.2s ease;
        }
        .btn-primary:hover { background-color: #c71b27; }

        @media (max-width: 767px) {
          .hero-headline { font-size: 56px !important; margin-bottom: 20px !important; }
          .hero-subline { font-size: 13px !important; }
          .section-pad { padding: 80px 24px !important; }
          .positioning-text { font-size: 32px !important; }
          .pillars-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .arrival-grid { grid-template-columns: 1fr !important; gap: 0 !important; }
          .arrival-overlay {
            background: rgba(46,18,97,0.70) !important;
          }
          .arrival-headline { font-size: 36px !important; }
          .arrival-body { max-width: 100% !important; }
          .lagos-text { font-size: 28px !important; }
        }
      `}</style>
    </div>
  )
}

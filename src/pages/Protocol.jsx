import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import CTASection from '../components/CTASection'
import Footer from '../components/Footer'

// Night driving video — verified Pexels CDN filename
const VIDEO_SRC = 'https://videos.pexels.com/video-files/27700575/12208316_1080_1920_30fps.mp4'

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
}

const services = [
  {
    numeral: 'I',
    title: 'Airport Protocol',
    overlayColor: 'rgba(46,18,97,0.70)',
    description:
      'We meet you at the gate. We handle immigration and baggage. We coordinate your transfer to the city. From the moment your aircraft doors open to the moment you reach your destination, every transition is managed.',
    included: [
      'Fast track immigration assistance',
      'Meet and greet at the gate',
      'Baggage handling and collection',
      'Transfer to your destination',
    ],
    forWhom:
      'For travellers flying into MMIA Lagos or NAIA Abuja who expect the arrival to be handled.',
  },
  {
    numeral: 'II',
    title: 'City Movement',
    overlayColor: 'rgba(10,10,15,0.78)',
    description:
      'Verified drivers. Clean executive vehicles. No surprises on price, route, or timing. Whether you are moving once or multiple times across the city, every transfer is confirmed and coordinated in advance.',
    included: [
      'Executive sedan or SUV transfers',
      'Verified and vetted drivers',
      'City-wide coverage across Lagos and Abuja',
      'Advance booking with confirmed pricing',
    ],
    forWhom: 'For clients who need reliable, professional city transport throughout their stay.',
  },
  {
    numeral: 'III',
    title: 'Event Coordination',
    overlayColor: 'rgba(46,18,97,0.70)',
    description:
      'Ojude Oba. Salah. Major events where how you arrive and move is part of the experience. We coordinate your transport, your accommodation, and your arrival timing so that the event starts the moment you leave the house.',
    included: [
      'Event-day transfer coordination',
      'Accommodation sourcing',
      'Multi-stop itinerary management',
      'Departure coordination',
    ],
    forWhom:
      'For those attending Ojude Oba, Salah, or any occasion where showing up correctly matters.',
  },
]

export default function Protocol() {
  return (
    <div className="page-transition">
      {/* Fixed video */}
      <div className="video-bg">
        <video autoPlay muted loop playsInline preload="auto" aria-hidden="true">
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
      </div>

      {/* ── Hero ── */}
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
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(10,10,15,0.70)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 24px' }}>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontWeight: 300,
              fontSize: '80px',
              color: '#FFFFFF',
              lineHeight: 1.0,
              letterSpacing: '-0.02em',
              marginBottom: '20px',
            }}
            className="protocol-hero-h1"
          >
            Protocol
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: '15px',
              color: '#a0a0b0',
              letterSpacing: '0.06em',
            }}
          >
            Every detail coordinated. Nothing left to chance.
          </motion.p>
        </div>
      </section>

      {/* ── Three service sections ── */}
      {services.map((service, i) => (
        <section
          key={service.numeral}
          style={{
            position: 'relative',
            zIndex: 10,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: service.overlayColor,
              pointerEvents: 'none',
            }}
          />

          {/* Decorative Roman numeral */}
          <div
            style={{
              position: 'absolute',
              top: '40px',
              right: '40px',
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontWeight: 300,
              fontSize: '200px',
              color: 'rgba(160,160,176,0.12)',
              lineHeight: 1,
              pointerEvents: 'none',
              userSelect: 'none',
              zIndex: 0,
            }}
            className="decor-numeral"
          >
            {service.numeral}
          </div>

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
              variants={itemVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              style={{ maxWidth: '680px' }}
            >
              {/* Numeral label */}
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
                {service.numeral}
              </p>

              {/* Title */}
              <h2
                style={{
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  fontWeight: 400,
                  fontSize: '56px',
                  color: '#FFFFFF',
                  lineHeight: 1.05,
                  marginBottom: '28px',
                  letterSpacing: '-0.01em',
                }}
                className="service-title"
              >
                {service.title}
              </h2>

              {/* Description */}
              <p
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '16px',
                  color: '#a0a0b0',
                  lineHeight: 1.8,
                  marginBottom: '40px',
                }}
              >
                {service.description}
              </p>

              {/* Included */}
              <div style={{ marginBottom: '32px' }}>
                <p
                  style={{
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontSize: '11px',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: '#FFFFFF',
                    marginBottom: '16px',
                  }}
                >
                  What is included
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {service.included.map((item) => (
                    <li
                      key={item}
                      style={{
                        fontFamily: 'Inter, system-ui, sans-serif',
                        fontSize: '14px',
                        color: '#FFFFFF',
                        padding: '10px 0',
                        borderBottom: '1px solid rgba(255,255,255,0.08)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                      }}
                    >
                      <span
                        style={{
                          display: 'inline-block',
                          width: '4px',
                          height: '4px',
                          backgroundColor: '#a0a0b0',
                          flexShrink: 0,
                        }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* For whom */}
              <p
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '14px',
                  color: '#a0a0b0',
                  fontStyle: 'italic',
                  marginBottom: '32px',
                  lineHeight: 1.7,
                }}
              >
                {service.forWhom}
              </p>

              {/* Enquire link */}
              <Link
                to="/contact"
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '13px',
                  color: '#F02232',
                  textDecoration: 'none',
                  letterSpacing: '0.04em',
                  transition: 'opacity 0.2s ease',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.7' }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
              >
                Enquire about this service →
              </Link>
            </motion.div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <CTASection hasVideo={true} />
      <Footer />

      <style>{`
        @media (max-width: 767px) {
          .protocol-hero-h1 { font-size: 56px !important; }
          .section-pad { padding: 80px 24px !important; }
          .service-title { font-size: 36px !important; }
          .decor-numeral { font-size: 100px !important; top: 16px !important; right: 16px !important; }
        }
      `}</style>
    </div>
  )
}

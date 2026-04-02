import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import PageMeta from '../components/PageMeta'

const SHADOW = '0 2px 20px rgba(0,0,0,0.8), 0 0 40px rgba(0,0,0,0.5)'

// ── Date-gated tiers ──────────────────────────────────────────
const APR_17 = new Date('2026-04-17T00:00:00')
const MAY_08 = new Date('2026-05-08T00:00:00')
const MAY_21 = new Date('2026-05-21T00:00:00') // end of May 20

function getTierStatus(id) {
  const now = new Date()
  if (id === 'mode-early') return now < APR_17 ? 'active' : 'greyed'
  if (id === 'mo-wa')      return now < APR_17 ? 'hidden' : now < MAY_08 ? 'active' : 'greyed'
  if (id === 'late-window') return now < MAY_08 ? 'hidden' : now < MAY_21 ? 'active' : 'greyed'
  return 'greyed'
}

const TIERS = [
  {
    id: 'mode-early',
    name: 'Mo Dé Early',
    dates: 'April 3 to April 17',
    discount: '15% off qualifying bundles',
    description: 'First access to the best options. Priority driver allocation, stable pricing, and maximum flexibility.',
    cta: 'Book Mo Dé Early',
  },
  {
    id: 'mo-wa',
    name: 'Mo Wà',
    dates: 'April 18 to May 7',
    discount: '10% off qualifying bundles',
    description: 'Still in time, still well-covered. Availability is strong but narrowing. Planning is still controlled but less flexible.',
    cta: 'Book Mo Wà',
  },
  {
    id: 'late-window',
    name: 'Late Window',
    dates: 'May 8 to May 20',
    discount: '5% off',
    description: 'Still available. Options are more limited but we will make it work.',
    cta: 'Book Late Window',
  },
]

const BUNDLES = [
  {
    id: 'airport-protocol',
    name: 'Airport Protocol Bundle',
    includes: 'Fast track immigration, baggage assistance, and airport transfer',
  },
  {
    id: 'airport-city',
    name: 'Airport + City Bundle',
    includes: 'Airport handling and in-city rides',
  },
  {
    id: 'full-concierge',
    name: 'Full Concierge Package',
    includes: 'Full coordination for the Eid or Ojude Oba period',
  },
  {
    id: 'event-day',
    name: 'Event Day Package',
    includes: 'Event-day city transfers and pre-arranged accommodation sourcing for Ojude Oba attendees',
  },
]

const AUDIENCES = [
  {
    id: 'flying-in-done-before',
    heading: 'You Already Know',
    body: 'The queues, the heat, the chaos. You are tired of it. This time, let us handle all of it.',
  },
  {
    id: 'flying-in-first-time',
    heading: 'Land Like You Belong Here',
    body: 'Coming back for Eid or Ojude Oba? We meet you at the aircraft door. From that moment, everything is handled.',
  },
  {
    id: 'already-in-nigeria',
    heading: 'If You Are Going, Go Right',
    body: 'Sallah weekend or Ojude Oba is not the time to be sorting logistics. We coordinate your movement so you just show up.',
  },
]

const sectionBase = {
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
}

const innerWrap = {
  width: '100%',
  maxWidth: '680px',
  margin: '0 auto',
  padding: 'clamp(80px, 12vh, 140px) clamp(16px, 2.5vw, 24px)',
  textAlign: 'center',
}

export default function MoDeMoSet() {
  const [videoError, setVideoError] = useState(false)
  const navigate = useNavigate()

  const handlePlanArrival = () => {
    navigate('/', { state: { scrollToForm: true } })
  }

  return (
    <>
      <PageMeta
        title="Mo Dé, Mo Set | Eid & Ojude Oba Travel Packages 2026 | Jet Exclusive Concierge"
        description="Flying into Nigeria for Eid or Ojude Oba? Book airport fast track, transfers, and concierge services before the May rush."
      />
      {/* ── Fixed video ── */}
      {!videoError ? (
        <video
          style={{
            position: 'fixed', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', zIndex: 0,
            pointerEvents: 'none',
          }}
          autoPlay loop muted playsInline
          poster="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQI12NgAAIABQAABjE+ibYAAAAASUVORK5CYII="
          onError={() => setVideoError(true)}
        >
          <source src="/jec-modemoset-video.mp4" type="video/mp4" />
        </video>
      ) : (
        <div className="video-fallback-grain" />
      )}

      {/* ── Fixed overlay ── */}
      <div
        style={{
          position: 'fixed', inset: 0, zIndex: 1,
          backgroundColor: 'rgba(10,10,15,0.6)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Scrollable content ── */}
      <div style={{ position: 'relative', zIndex: 2 }}>

        {/* ── HERO ── */}
        <section style={{ ...sectionBase, minHeight: '100vh' }}>
          <div style={{ ...innerWrap, maxWidth: '1200px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontWeight: 900,
                fontSize: 'clamp(2.8rem, 8vw, 6.5rem)',
                color: '#FFFFFF',
                lineHeight: 1.05,
                letterSpacing: '-0.01em',
                marginBottom: '2rem',
                textShadow: SHADOW,
                textAlign: 'center',
                whiteSpace: 'nowrap',
              }}
            >
              Mo Dé, Mo Set
            </h1>

            <p
              style={{
                fontFamily: "'Nunito Sans', system-ui, sans-serif",
                fontWeight: 500,
                fontSize: '18px',
                color: '#FFFFFF',
                lineHeight: 2.2,
                letterSpacing: '0.5px',
                marginBottom: '1rem',
                textShadow: SHADOW,
                textAlign: 'center',
              }}
            >
              Avoid the May Rush. Travel Smart.
            </p>

            <p
              style={{
                fontFamily: "'Nunito Sans', system-ui, sans-serif",
                fontWeight: 500,
                fontSize: '13px',
                color: '#a0a0b0',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                textShadow: SHADOW,
                textAlign: 'center',
              }}
            >
              #MoDeMoSet
            </p>
          </div>
        </section>

        {/* ── WHO IS THIS FOR ── */}
        <section
          style={{
            position: 'relative',
            padding: 'clamp(80px, 12vh, 140px) clamp(16px, 2.5vw, 24px)',
          }}
        >
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

            <h2
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontWeight: 900,
                fontSize: 'clamp(1.8rem, 4vw, 3.5rem)',
                color: '#FFFFFF',
                lineHeight: 1.15,
                marginBottom: 'clamp(48px, 8vh, 80px)',
                textShadow: SHADOW,
                textAlign: 'center',
              }}
            >
              Who Is This For
            </h2>

            <div className="audience-grid">
              {AUDIENCES.map((card) => (
                <div
                  key={card.id}
                  style={{
                    backgroundColor: 'rgba(10,10,15,0.80)',
                    padding: 'clamp(32px, 5vh, 48px) clamp(24px, 3vw, 40px)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                  }}
                >
                  <h3
                    style={{
                      fontFamily: '"Playfair Display", Georgia, serif',
                      fontWeight: 900,
                      fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
                      color: '#FFFFFF',
                      lineHeight: 1.15,
                      margin: 0,
                      textShadow: SHADOW,
                    }}
                  >
                    {card.heading}
                  </h3>

                  <p
                    style={{
                      fontFamily: "'Nunito Sans', system-ui, sans-serif",
                      fontWeight: 500,
                      fontSize: '18px',
                      color: '#FFFFFF',
                      lineHeight: 2.2,
                      letterSpacing: '0.5px',
                      margin: 0,
                      flexGrow: 1,
                      textShadow: SHADOW,
                    }}
                  >
                    {card.body}
                  </p>

                  <button
                    onClick={() =>
                      document.getElementById('bundles-section')?.scrollIntoView({ behavior: 'smooth' })
                    }
                    style={{
                      backgroundColor: '#F02232',
                      color: '#FFFFFF',
                      fontFamily: "'Nunito Sans', system-ui, sans-serif",
                      fontWeight: 600,
                      fontSize: '12px',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      padding: '18px 32px',
                      border: 'none',
                      cursor: 'pointer',
                      alignSelf: 'flex-start',
                    }}
                  >
                    Select a Bundle
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BOOKING TIERS ── */}
        <section
          style={{
            position: 'relative',
            padding: 'clamp(80px, 12vh, 140px) clamp(16px, 2.5vw, 24px)',
          }}
        >
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

            {/* Section heading */}
            <h2
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontWeight: 900,
                fontSize: 'clamp(1.8rem, 4vw, 3.5rem)',
                color: '#FFFFFF',
                lineHeight: 1.15,
                marginBottom: 'clamp(48px, 8vh, 80px)',
                textShadow: SHADOW,
                textAlign: 'center',
              }}
            >
              Book Your Window
            </h2>

            {/* Tier grid */}
            <div className="tiers-grid">
              {TIERS.map((tier) => {
                const status = getTierStatus(tier.id)
                if (status === 'hidden') return null

                const isGreyed = status === 'greyed'
                const textCol  = isGreyed ? '#555566' : '#FFFFFF'
                const mutedCol = isGreyed ? '#3a3a4a' : '#a0a0b0'

                return (
                  <div
                    key={tier.id}
                    style={{
                      border: `1px solid ${isGreyed ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.15)'}`,
                      padding: 'clamp(32px, 5vh, 48px) clamp(24px, 3vw, 40px)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '16px',
                      opacity: isGreyed ? 0.45 : 1,
                    }}
                  >
                    {/* Tier name */}
                    <h3
                      style={{
                        fontFamily: '"Playfair Display", Georgia, serif',
                        fontWeight: 900,
                        fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
                        color: textCol,
                        lineHeight: 1.1,
                        margin: 0,
                        textShadow: isGreyed ? 'none' : SHADOW,
                      }}
                    >
                      {tier.name}
                    </h3>

                    {/* Dates */}
                    <p
                      style={{
                        fontFamily: "'Nunito Sans', system-ui, sans-serif",
                        fontWeight: 600,
                        fontSize: '12px',
                        color: mutedCol,
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        margin: 0,
                        textShadow: 'none',
                      }}
                    >
                      {tier.dates}
                    </p>

                    {/* Discount */}
                    <p
                      style={{
                        fontFamily: "'Nunito Sans', system-ui, sans-serif",
                        fontWeight: 700,
                        fontSize: '18px',
                        color: isGreyed ? '#3a3a4a' : '#F02232',
                        margin: 0,
                        textShadow: 'none',
                      }}
                    >
                      {tier.discount}
                    </p>

                    {/* Description */}
                    <p
                      style={{
                        fontFamily: "'Nunito Sans', system-ui, sans-serif",
                        fontWeight: 500,
                        fontSize: '18px',
                        color: textCol,
                        lineHeight: 2.2,
                        letterSpacing: '0.5px',
                        margin: '8px 0 24px',
                        flexGrow: 1,
                        textShadow: isGreyed ? 'none' : SHADOW,
                      }}
                    >
                      {tier.description}
                    </p>

                    {/* CTA button */}
                    <button
                      disabled={isGreyed}
                      onClick={isGreyed ? undefined : () => navigate('/', { state: { scrollToForm: true } })}
                      style={{
                        backgroundColor: isGreyed ? '#1e1e2a' : '#F02232',
                        color: isGreyed ? '#3a3a4a' : '#FFFFFF',
                        fontFamily: "'Nunito Sans', system-ui, sans-serif",
                        fontWeight: 600,
                        fontSize: '12px',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        padding: '18px 32px',
                        border: 'none',
                        cursor: isGreyed ? 'not-allowed' : 'pointer',
                        alignSelf: 'flex-start',
                        pointerEvents: isGreyed ? 'none' : 'auto',
                      }}
                    >
                      {isGreyed ? 'Window Closed' : tier.cta}
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── BUNDLES ── */}
        <section
          id="bundles-section"
          style={{
            position: 'relative',
            padding: 'clamp(80px, 12vh, 140px) clamp(16px, 2.5vw, 24px)',
          }}
        >
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

            {/* Section heading */}
            <h2
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontWeight: 900,
                fontSize: 'clamp(1.8rem, 4vw, 3.5rem)',
                color: '#FFFFFF',
                lineHeight: 1.15,
                marginBottom: 'clamp(48px, 8vh, 80px)',
                textShadow: SHADOW,
                textAlign: 'center',
              }}
            >
              What You Can Bundle
            </h2>

            {/* Bundles grid */}
            <div className="bundles-grid">
              {BUNDLES.map((bundle) => (
                <div
                  key={bundle.id}
                  style={{
                    border: '1px solid rgba(255,255,255,0.12)',
                    padding: 'clamp(32px, 5vh, 48px) clamp(24px, 3vw, 40px)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                  }}
                >
                  {/* Bundle name */}
                  <h3
                    style={{
                      fontFamily: '"Playfair Display", Georgia, serif',
                      fontWeight: 900,
                      fontSize: 'clamp(1.3rem, 2vw, 1.8rem)',
                      color: '#FFFFFF',
                      lineHeight: 1.15,
                      margin: 0,
                      textShadow: SHADOW,
                    }}
                  >
                    {bundle.name}
                  </h3>

                  {/* Includes */}
                  <p
                    style={{
                      fontFamily: "'Nunito Sans', system-ui, sans-serif",
                      fontWeight: 500,
                      fontSize: '18px',
                      color: '#FFFFFF',
                      lineHeight: 2.2,
                      letterSpacing: '0.5px',
                      margin: '8px 0',
                      flexGrow: 1,
                      textShadow: SHADOW,
                    }}
                  >
                    {bundle.includes}
                  </p>

                  {/* CTA */}
                  <button
                    onClick={() => navigate('/', { state: { scrollToForm: true } })}
                    style={{
                      backgroundColor: '#F02232',
                      color: '#FFFFFF',
                      fontFamily: "'Nunito Sans', system-ui, sans-serif",
                      fontWeight: 600,
                      fontSize: '12px',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      padding: '18px 32px',
                      border: 'none',
                      cursor: 'pointer',
                      alignSelf: 'flex-start',
                      marginTop: '8px',
                    }}
                  >
                    Get Your Quote
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Responsive grid styles ── */}
        <style>{`
          .audience-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .tiers-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .bundles-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 24px;
          }
          @media (min-width: 768px) {
            .audience-grid {
              grid-template-columns: 1fr 1fr 1fr;
              gap: 32px;
            }
            .tiers-grid {
              grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
              gap: 32px;
            }
            .bundles-grid {
              grid-template-columns: 1fr 1fr;
              gap: 32px;
            }
          }
        `}</style>

        <Footer />
      </div>
    </>
  )
}

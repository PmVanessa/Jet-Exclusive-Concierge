import { useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

const SERVICES = [
  {
    name: 'Fast Track Immigration',
    description:
      'One of our protocol officers meets you right at the aircraft door and walks you through a priority lane so you clear immigration in minutes instead of standing in that line with everybody else.',
  },
  {
    name: 'Baggage Assistance',
    description:
      'You do not touch your bags at all. Someone from our team collects everything from the belt and loads it into your vehicle while you are already on your way out.',
  },
  {
    name: 'Airport Transfers',
    description:
      'We have a car waiting for you before you even step outside the terminal, engine running, AC on, and your driver already knows where you are going.',
  },
  {
    name: 'Lounge Access',
    description:
      'Instead of sitting on those metal chairs with everyone else, you wait for your flight in a proper lounge with refreshments and space to actually breathe.',
  },
  {
    name: 'In-City Rides',
    description:
      'If you need to move around while you are in Nigeria, we handle that too. Comfortable rides, wherever you need to go, whenever you need to go there.',
  },
  {
    name: 'Multilingual Guides',
    description:
      'We pair you with a personal guide who speaks your language and actually knows the city, so whether you are at the airport or out in town you always have someone with you who knows what they are doing.',
  },
  {
    name: 'Tailored VIP Services',
    description:
      'If there is something you need that we have not listed here, just tell us. We will build a package around exactly what your trip requires.',
  },
]

export default function Protocol() {
  const [videoError, setVideoError] = useState(false)

  return (
    <>
      {/* ── Fixed background video ── */}
      {!videoError ? (
        <video
          style={{
            position: 'fixed',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
            pointerEvents: 'none',
          }}
          autoPlay
          loop
          muted
          playsInline
          poster="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQI12NgAAIABQAABjE+ibYAAAAASUVORK5CYII="
          onError={() => setVideoError(true)}
        >
          <source src="/jec-protocol-video.mp4" type="video/mp4" />
        </video>
      ) : (
        <div className="video-fallback-grain" style={{ position: 'fixed', inset: 0, zIndex: 0 }} />
      )}

      {/* ── Dark overlay ── */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1,
          backgroundColor: 'rgba(10, 10, 15, 0.72)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Scrollable content ── */}
      <div style={{ position: 'relative', zIndex: 2 }}>

        {/* ── Hero ── */}
        <section
          style={{
            minHeight: '60vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            maxWidth: '1200px',
            margin: '0 auto',
            padding: 'clamp(120px, 18vh, 200px) clamp(16px, 2.5vw, 24px) clamp(48px, 8vh, 80px)',
          }}
        >
          <h1
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontWeight: 400,
              fontSize: 'clamp(4rem, 10vw, 9rem)',
              color: '#FFFFFF',
              lineHeight: 0.95,
              letterSpacing: '-0.02em',
              marginBottom: 'clamp(20px, 3vh, 32px)',
            }}
          >
            Protocol
          </h1>
          <p
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: 'clamp(0.9rem, 1.4vw, 1rem)',
              fontWeight: 400,
              color: '#a0a0b0',
              lineHeight: 1.75,
              maxWidth: '680px',
              margin: 0,
            }}
          >
            Everything between the aircraft door and your front door, handled.
          </p>
        </section>

        {/* ── Services ── */}
        <section
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: 'clamp(48px, 8vh, 80px) clamp(16px, 2.5vw, 24px) clamp(80px, 14vh, 140px)',
          }}
        >
          {/* Divider */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', marginBottom: 'clamp(48px, 8vh, 80px)' }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(40px, 6vh, 64px)' }}>
            {SERVICES.map((service, i) => (
              <div
                key={service.name}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr',
                  gap: '12px',
                  paddingBottom: 'clamp(40px, 6vh, 64px)',
                  borderBottom: i < SERVICES.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                }}
                className="service-row"
              >
                <h2
                  style={{
                    fontFamily: '"Cormorant Garamond", Georgia, serif',
                    fontWeight: 400,
                    fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)',
                    color: '#FFFFFF',
                    lineHeight: 1.1,
                    margin: 0,
                  }}
                >
                  {service.name}
                </h2>
                <p
                  style={{
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontSize: 'clamp(0.88rem, 1.3vw, 0.95rem)',
                    fontWeight: 400,
                    color: '#a0a0b0',
                    lineHeight: 1.8,
                    maxWidth: '680px',
                    margin: 0,
                  }}
                >
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: 'clamp(64px, 12vh, 120px) clamp(16px, 2.5vw, 24px) clamp(80px, 14vh, 140px)',
            textAlign: 'center',
          }}
        >
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', marginBottom: 'clamp(48px, 8vh, 80px)' }} />
          <h2
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontWeight: 400,
              fontSize: 'clamp(2.4rem, 6vw, 5.5rem)',
              color: '#FFFFFF',
              lineHeight: 1.05,
              letterSpacing: '-0.01em',
              marginBottom: 'clamp(28px, 5vh, 48px)',
            }}
          >
            Ready to arrive differently?
          </h2>
          <Link
            to="/contact"
            style={{
              display: 'inline-block',
              backgroundColor: '#F02232',
              color: '#FFFFFF',
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: '12px',
              fontWeight: 500,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              padding: '18px 52px',
              textDecoration: 'none',
            }}
          >
            Plan Your Arrival
          </Link>
        </section>

        <Footer />
      </div>

      <style>{`
        @media (min-width: 768px) {
          .service-row {
            grid-template-columns: 1fr 1fr !important;
            align-items: start;
            gap: 32px !important;
          }
        }
      `}</style>
    </>
  )
}

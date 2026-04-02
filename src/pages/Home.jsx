import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Footer from '../components/Footer'
import EnquiryForm from '../components/EnquiryForm'
import PageMeta from '../components/PageMeta'

// ── Overlay definitions per section ──────────────────────────
const OVERLAYS = [
  { r: 10, g: 10, b: 15, opacity: 0.5  }, // section 1 — readable
  { r: 10, g: 10, b: 15, opacity: 0.25 }, // section 2 — light, text pops
  { r: 10, g: 10, b: 15, opacity: 0.85 }, // form — darkest
]

function lerp(a, b, t) { return a + (b - a) * t }

// ── Section 1: Rotating text ──────────────────────────────────
const ROTATING_LINES = [
  'You survived the flight. Now survive the airport.',
  '14 hours in the air. 2 hours to leave the building.',
  'First class seat. Economy arrival.',
  'You paid for business class and still dragged your own bag.',
]

function RotatingText() {
  const [index, setIndex]     = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    let holdTimer, fadeTimer
    holdTimer = setTimeout(() => {
      setVisible(false)
      fadeTimer = setTimeout(() => {
        setIndex(i => (i + 1) % ROTATING_LINES.length)
        setVisible(true)
      }, 600)
    }, 2500)
    return () => { clearTimeout(holdTimer); clearTimeout(fadeTimer) }
  }, [index])

  return (
    <div style={{ textAlign: 'center', padding: '0 clamp(24px, 5vw, 48px)' }}>
      <span
        style={{
          display: 'block',
          maxWidth: '820px',
          margin: '0 auto',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.6s ease',
          fontFamily: '"Playfair Display", Georgia, serif',
          fontSize: 'clamp(1.8rem, 4vw, 3.5rem)',
          fontWeight: 900,
          color: '#FFFFFF',
          lineHeight: 1.25,
          letterSpacing: '0.5px',
          textShadow: '0 2px 20px rgba(0,0,0,0.8), 0 0 40px rgba(0,0,0,0.5)',
        }}
      >
        {ROTATING_LINES[index]}
      </span>
    </div>
  )
}

// ── Shared layout helpers ─────────────────────────────────────
const sectionBase = {
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

const innerWrap = {
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto',
  padding: 'clamp(80px, 12vh, 140px) clamp(16px, 2.5vw, 24px)',
}

export default function Home() {
  const [overlay, setOverlay]       = useState(OVERLAYS[0])
  const [videoError, setVideoError] = useState(false)
  const location                    = useLocation()

  // Scroll to form when arriving from another page via "Book Now"
  useEffect(() => {
    if (location.state?.scrollToForm) {
      const el = document.getElementById('book-now')
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 120)
    }
  }, [location.state])

  useEffect(() => {
    const handleScroll = () => {
      const scrollY    = window.scrollY
      const docHeight  = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight <= 0) return
      const progress      = Math.min(scrollY / docHeight, 1)
      const sectionFloat  = progress * (OVERLAYS.length - 1)
      const idx           = Math.min(Math.floor(sectionFloat), OVERLAYS.length - 2)
      const t             = sectionFloat - idx
      const a = OVERLAYS[idx], b = OVERLAYS[idx + 1]
      setOverlay({ r: lerp(a.r, b.r, t), g: lerp(a.g, b.g, t), b: lerp(a.b, b.b, t), opacity: lerp(a.opacity, b.opacity, t) })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const bgColor = `rgba(${Math.round(overlay.r)}, ${Math.round(overlay.g)}, ${Math.round(overlay.b)}, ${overlay.opacity.toFixed(3)})`

  return (
    <>
      <PageMeta
        title="Jet Exclusive Concierge | VIP Airport Service & Fast Track in Lagos and Abuja"
        description="Skip the airport queues. Fast track immigration, private transfers, and personal concierge across Lagos and Abuja. From the aircraft door to your front door."
      />
      {/* Fixed video */}
      {!videoError ? (
        <video
          className="video-hero"
          style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0, pointerEvents: 'none' }}
          autoPlay loop muted playsInline
          poster="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQI12NgAAIABQAABjE+ibYAAAAASUVORK5CYII="
          onError={() => setVideoError(true)}
        >
          <source src="/jec-hero-video.mp4" type="video/mp4" />
        </video>
      ) : (
        <div className="video-fallback-grain" />
      )}

      {/* Scroll-driven overlay */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none', backgroundColor: bgColor }} />

      {/* ── Content sections ── */}
      <div style={{ position: 'relative', zIndex: 2 }}>

        {/* ── SECTION 1: THE PROBLEM ── */}
        <section style={sectionBase}>
          <RotatingText />
        </section>

        {/* ── SECTION 2: THE ANSWER ── */}
        <section style={sectionBase}>
          <div style={{ ...innerWrap, textAlign: 'center' }}>
            <h2
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: 'clamp(1.8rem, 4vw, 3.5rem)',
                fontWeight: 900,
                color: '#FFFFFF',
                lineHeight: 1.15,
                letterSpacing: '-0.01em',
                marginBottom: '2rem',
                textShadow: '0 2px 20px rgba(0,0,0,0.8), 0 0 40px rgba(0,0,0,0.5)',
              }}
            >
              We end that story.
            </h2>
            <p
              style={{
                fontFamily: "'Nunito Sans', system-ui, sans-serif",
                fontSize: '18px',
                fontWeight: 500,
                color: '#FFFFFF',
                lineHeight: 2.2,
                letterSpacing: '0.5px',
                maxWidth: '860px',
                margin: '0 auto',
                textShadow: '0 2px 20px rgba(0,0,0,0.8), 0 0 40px rgba(0,0,0,0.5)',
              }}
            >
              From the aircraft door to the back seat of your car. Airport protocol, ground movement, and personal concierge across Lagos and Abuja. You arrive, we handle everything else.
            </p>
          </div>
        </section>

        <div id="book-now"><EnquiryForm /></div>
        <Footer />
      </div>
    </>
  )
}

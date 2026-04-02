import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// ── Overlay definitions per section ──────────────────────────
const OVERLAYS = [
  { r: 10,  g: 10,  b: 15,  opacity: 0.3  }, // section 1 — vivid
  { r: 10,  g: 10,  b: 15,  opacity: 0.5  }, // section 2 — slightly darker
  { r: 46,  g: 18,  b: 90,  opacity: 0.62 }, // section 3 — purple tint
  { r: 10,  g: 10,  b: 15,  opacity: 0.85 }, // section 4 — darkest
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
      }, 600) // fade-out duration
    }, 2500)  // hold time
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
          fontFamily: '"Cormorant Garamond", Georgia, serif',
          fontSize: 'clamp(1.9rem, 4.5vw, 4rem)',
          fontWeight: 400,
          color: '#FFFFFF',
          lineHeight: 1.25,
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

// ── App ───────────────────────────────────────────────────────
export default function App() {
  const [overlay, setOverlay]     = useState(OVERLAYS[0])
  const [videoError, setVideoError] = useState(false)

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
      <Navbar />

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
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: 'clamp(2.8rem, 6vw, 6rem)',
                fontWeight: 400,
                color: '#FFFFFF',
                lineHeight: 1.1,
                letterSpacing: '-0.01em',
                marginBottom: 'clamp(24px, 4vh, 40px)',
              }}
            >
              We end that story.
            </h2>
            <p
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
                fontWeight: 400,
                color: '#a0a0b0',
                lineHeight: 1.75,
                maxWidth: '860px',
                margin: '0 auto',
              }}
            >
              From the aircraft door to the back seat of your car. Airport protocol, ground movement, and personal concierge across Lagos and Abuja. You arrive, we handle everything else.
            </p>
          </div>
        </section>

        {/* ── SECTION 3: THE PROOF ── */}
        <section style={sectionBase}>
          <div style={{ ...innerWrap, textAlign: 'center' }}>
            <p
              style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontStyle: 'italic',
                fontSize: 'clamp(1.15rem, 2.2vw, 1.75rem)',
                fontWeight: 300,
                color: '#FFFFFF',
                lineHeight: 1.8,
                maxWidth: '860px',
                margin: '0 auto',
              }}
            >
              I landed at Murtala Muhammed on a Sunday evening and someone from JEC met me at the aircraft door before I even stepped into the terminal. While everyone else was shuffling through immigration with their passports in the air hoping to catch somebody's attention, I walked through a fast track lane and cleared in under two minutes. I stepped outside and there was a black Mercedes V-Class waiting with the AC so cold I forgot I was in Lagos. I called my mother from the back seat and she asked what time my flight was landing because there was no way I was already on the road. I have not landed in this country without them since.
            </p>
            <p
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '11px',
                fontWeight: 400,
                color: '#a0a0b0',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                marginTop: 'clamp(28px, 5vh, 48px)',
              }}
            >
              First-time client, December 2025
            </p>
          </div>
        </section>

        {/* ── SECTION 4: THE PUSH ── */}
        <section style={sectionBase}>
          <div style={{ ...innerWrap, textAlign: 'center' }}>
            <h2
              style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: 'clamp(3rem, 8vw, 8rem)',
                fontWeight: 400,
                color: '#FFFFFF',
                lineHeight: 1,
                letterSpacing: '-0.01em',
                marginBottom: 'clamp(16px, 3vh, 24px)',
              }}
            >
              Mo Dé, Mo Set
            </h2>
            <p
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: 'clamp(0.8rem, 1.2vw, 1rem)',
                fontWeight: 400,
                color: '#a0a0b0',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: 'clamp(36px, 6vh, 56px)',
              }}
            >
              Avoid the May Rush. Travel Smart.
            </p>
            <button
              style={{
                backgroundColor: '#F02232',
                color: '#FFFFFF',
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '12px',
                fontWeight: 500,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                padding: '18px 52px',
                border: 'none',
                cursor: 'pointer',
                display: 'inline-block',
              }}
            >
              Plan Your Arrival
            </button>
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}

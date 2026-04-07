import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import Footer from '../components/Footer'
import EnquiryForm from '../components/EnquiryForm'
import PageMeta from '../components/PageMeta'

const SHADOW = '0 2px 20px rgba(0,0,0,0.8), 0 0 40px rgba(0,0,0,0.5)'

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
      <span style={{
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
        textShadow: SHADOW,
      }}>
        {ROTATING_LINES[index]}
      </span>
    </div>
  )
}

// ── Section 2: Massive scrolling text ────────────────────────
function HorizontalSection() {
  const wrapperRef = useRef(null)
  const textRef    = useRef(null)

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  })

  // Custom transform: measures actual text width so the slide is exact
  const x = useTransform(scrollYProgress, (progress) => {
    const vw = window.innerWidth / 100
    const textWidth = textRef.current ? textRef.current.scrollWidth : vw * 800
    // Start: text begins at 70vw (partially visible on right)
    // End: last characters just leaving the left edge
    const startPx = vw * 70
    const endPx   = -(textWidth - vw * 5)
    return startPx + (endPx - startPx) * progress
  })

  return (
    <div ref={wrapperRef} style={{ height: '300vh', position: 'relative' }}>
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: 'rgba(46, 18, 97, 0.1)',
        display: 'flex',
        alignItems: 'center',
      }}>
        <motion.div style={{ x, display: 'inline-block', whiteSpace: 'nowrap' }}>
          <span
            ref={textRef}
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: '15vw',
              fontWeight: 900,
              color: '#FFFFFF',
              lineHeight: 1,
              whiteSpace: 'nowrap',
              textShadow: SHADOW,
              display: 'inline',
            }}
          >
            We end that story. From the aircraft door to your front door and everything in between.
          </span>
        </motion.div>
      </div>
    </div>
  )
}

// ── Home page ─────────────────────────────────────────────────
export default function Home() {
  const [videoError, setVideoError] = useState(false)
  const location                    = useLocation()

  useEffect(() => {
    if (location.state?.scrollToForm) {
      const el = document.getElementById('book-now')
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 120)
    }
  }, [location.state])

  return (
    <>
      <PageMeta
        title="Jet Exclusive Concierge | VIP Airport Service & Fast Track in Lagos and Abuja"
        description="Skip the airport queues. Fast track immigration, private transfers, and personal concierge across Lagos and Abuja. From the aircraft door to your front door."
      />

      {/* Fixed video — Layer 0 */}
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

      {/* Base dark overlay for Section 1 readability */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none', backgroundColor: 'rgba(10, 10, 15, 0.5)' }} />

      {/* ── Content ── */}
      <div style={{ position: 'relative', zIndex: 2 }}>

        {/* ── SECTION 1: Rotating problem statements — no changes ── */}
        <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <RotatingText />
        </section>

        {/* ── SECTION 2: Horizontal scroll ── */}
        <HorizontalSection />

        {/* ── SECTION 3: Enquiry form ── */}
        <div
          id="book-now"
          style={{ backgroundColor: 'rgba(46, 18, 97, 0.2)' }}
        >
          <EnquiryForm />
        </div>

        <Footer />
      </div>
    </>
  )
}

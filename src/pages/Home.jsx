import { useEffect, useLayoutEffect, useRef, useState } from 'react'
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
const SCROLL_TEXT = "First class doesn't stop at the gate."

function HorizontalSection() {
  const wrapperRef = useRef(null)
  const measureRef = useRef(null)
  const [textW, setTextW] = useState(0)
  const [vw,    setVw]    = useState(typeof window !== 'undefined' ? window.innerWidth : 1440)

  useLayoutEffect(() => {
    function measure() {
      if (!measureRef.current) return
      setTextW(measureRef.current.offsetWidth)
      setVw(window.innerWidth)
    }
    ;(document.fonts?.ready ?? Promise.resolve()).then(measure)
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const startX    = vw * 0.7
  const endX      = -(textW - vw * 0.05)
  const totalMove = Math.max(startX - endX, 1)
  // 1.1× multiplier — tight enough to feel energetic, slow enough to read
  const wrapperH  = `${totalMove * 1.1 + vw}px`

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  })

  const x = useTransform(scrollYProgress, [0, 1], [startX, endX])

  // Entire section fades in on entry and out on exit — eliminates the hard-clip line
  const sectionOpacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.93, 1],
    [0,    1,    1,  0]
  )

  // Purple tint: blooms in as you enter the section
  const bgOpacity = useTransform(scrollYProgress, [0, 0.08], [0, 1])

  const textStyle = {
    fontFamily: '"Playfair Display", Georgia, serif',
    fontSize:   '15vw',
    fontWeight: 900,
    lineHeight: 1,
    whiteSpace: 'nowrap',
    textShadow: SHADOW,
    wordSpacing: '0.18em',
  }

  return (
    <>
      {/* Off-screen clone for text width measurement */}
      <div
        ref={measureRef}
        aria-hidden="true"
        style={{ ...textStyle, position: 'fixed', top: '-300vh', left: 0, opacity: 0, pointerEvents: 'none' }}
      >
        {SCROLL_TEXT}
      </div>

      <div ref={wrapperRef} style={{ height: textW ? wrapperH : '600vh', position: 'relative' }}>
        <motion.div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center', opacity: sectionOpacity }}>

          {/* Purple background — fades in, matching problem→solution colour shift */}
          <motion.div style={{
            position: 'absolute', inset: 0,
            backgroundColor: 'rgba(46, 18, 97, 0.18)',
            opacity: bgOpacity,
            pointerEvents: 'none',
          }} />

          {/* Top vignette — blends seamlessly from Section 1's dark */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0,
            height: '28%',
            background: 'linear-gradient(to bottom, rgba(10,10,15,0.75) 0%, transparent 100%)',
            pointerEvents: 'none',
            zIndex: 2,
          }} />

          {/* Bottom vignette — dissolves into the form's deep purple */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            height: '28%',
            background: 'linear-gradient(to top, rgba(16,6,42,0.92) 0%, transparent 100%)',
            pointerEvents: 'none',
            zIndex: 2,
          }} />

          {/* Scrolling text */}
          <motion.div style={{
            x,
            willChange: 'transform',
            display:    'inline-block',
            whiteSpace: 'nowrap',
            position:   'relative',
            zIndex:     1,
          }}>
            <span style={{ ...textStyle, color: '#FFFFFF', display: 'inline' }}>
              {SCROLL_TEXT}
            </span>
          </motion.div>

        </motion.div>
      </div>
    </>
  )
}

// ── Home page ─────────────────────────────────────────────────
export default function Home() {
  const [videoError, setVideoError] = useState(false)
  const location                    = useLocation()

  const intent = location.state?.intent

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
          poster="/jec-hero-poster.jpg"
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

        {/* ── SECTION 1: Rotating problem statements ── */}
        <section style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <RotatingText />
        </section>

        {/* ── SECTION 2: Horizontal scroll ── */}
        <HorizontalSection />

        {/* ── SECTION 3: Enquiry form — reveals smoothly from below ── */}
        <motion.div
          id="book-now"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.04 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{ backgroundColor: 'rgba(46, 18, 97, 0.30)' }}
        >
          <EnquiryForm intent={intent} />
        </motion.div>

        <Footer />
      </div>
    </>
  )
}

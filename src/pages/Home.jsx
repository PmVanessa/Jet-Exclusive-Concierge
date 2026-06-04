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
    void (document.fonts?.ready ?? Promise.resolve()).then(measure)
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

// ── Section 3: Pricing ───────────────────────────────────────
const VEHICLES = [
  {
    name: 'Toyota Prado',
    tag: 'The Reliable Choice',
    withinCity: '₦190,000',
    intercity: '₦270,000',
  },
  {
    name: 'Lexus GX460',
    tag: 'The Premium Choice',
    withinCity: '₦220,000',
    intercity: '₦330,000',
    featured: true,
  },
]

function PricingSection() {
  return (
    <section id="pricing" style={{
      background: 'linear-gradient(to bottom, rgba(16,6,42,0) 0%, rgba(16,6,42,0.4) 25%, rgba(46,18,97,0.15) 100%)',
      marginTop: 'clamp(-60px, -8vw, -100px)',
      paddingTop: 'clamp(120px, 18vw, 200px)',
      paddingBottom: 'clamp(80px, 12vw, 140px)',
      paddingLeft: 'clamp(24px, 6vw, 80px)',
      paddingRight: 'clamp(24px, 6vw, 80px)',
      textAlign: 'center',
      position: 'relative',
      zIndex: 2,
      overflow: 'hidden',
    }}>
      {/* Ambient glow blob */}
      <div style={{
        position: 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '60vw',
        height: '60vw',
        maxWidth: '700px',
        maxHeight: '700px',
        background: 'radial-gradient(ellipse, rgba(100, 40, 220, 0.18) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Heading */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
        style={{
          fontFamily: '"Playfair Display", Georgia, serif',
          fontSize: 'clamp(0.65rem, 1.1vw, 0.8rem)',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: 'rgba(180,150,255,0.7)',
          marginBottom: '20px',
          position: 'relative',
        }}
      >
        Starting From
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.2 }}
        style={{
          fontFamily: '"Playfair Display", Georgia, serif',
          fontSize: 'clamp(2.2rem, 5vw, 4rem)',
          fontWeight: 900,
          color: '#FFFFFF',
          lineHeight: 1.1,
          marginBottom: '20px',
          textShadow: SHADOW,
          position: 'relative',
        }}
      >
        Every journey, tailored.
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3 }}
        style={{
          color: 'rgba(255,255,255,0.4)',
          fontSize: 'clamp(0.85rem, 1.4vw, 1rem)',
          maxWidth: '440px',
          margin: '0 auto 72px',
          lineHeight: 1.8,
          fontFamily: '"Playfair Display", Georgia, serif',
          fontStyle: 'italic',
          position: 'relative',
        }}
      >
        Pricing varies by route, duration, and requirements.
        Here's a starting point.
      </motion.p>

      {/* Cards */}
      <div style={{
        display: 'flex',
        gap: 'clamp(20px, 3vw, 40px)',
        justifyContent: 'center',
        flexWrap: 'wrap',
        maxWidth: '860px',
        margin: '0 auto 72px',
        position: 'relative',
      }}>
        {VEHICLES.map((v, i) => (
          <motion.div
            key={v.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.3 + i * 0.18, ease: [0.16, 1, 0.3, 1] }}
            style={{
              flex: '1 1 300px',
              maxWidth: '400px',
              position: 'relative',
              textAlign: 'left',
            }}
          >
            {/* Gradient border wrapper */}
            <div style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '4px',
              padding: '1px',
              background: v.featured
                ? 'linear-gradient(145deg, rgba(160,100,255,0.8) 0%, rgba(80,30,160,0.3) 50%, rgba(160,100,255,0.4) 100%)'
                : 'linear-gradient(145deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%)',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
              pointerEvents: 'none',
            }} />

            {/* Card inner */}
            <div style={{
              borderRadius: '4px',
              padding: 'clamp(32px, 4.5vw, 52px) clamp(28px, 4vw, 44px)',
              background: v.featured
                ? 'linear-gradient(145deg, rgba(80,25,170,0.45) 0%, rgba(40,10,90,0.55) 100%)'
                : 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
              position: 'relative',
              overflow: 'hidden',
            }}>

              {/* Inner glow for featured */}
              {v.featured && (
                <div style={{
                  position: 'absolute',
                  top: '-40%',
                  right: '-20%',
                  width: '60%',
                  height: '60%',
                  background: 'radial-gradient(ellipse, rgba(140,70,255,0.2) 0%, transparent 70%)',
                  pointerEvents: 'none',
                }} />
              )}

              {/* Popular badge */}
              {v.featured && (
                <div style={{
                  display: 'inline-block',
                  background: 'linear-gradient(90deg, #7c3aed, #a855f7)',
                  color: '#fff',
                  fontSize: '0.6rem',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  padding: '5px 14px',
                  fontFamily: '"Playfair Display", Georgia, serif',
                  marginBottom: '24px',
                }}>
                  Popular
                </div>
              )}

              {/* Tag */}
              <p style={{
                color: v.featured ? 'rgba(200,170,255,0.65)' : 'rgba(255,255,255,0.35)',
                fontSize: '0.68rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                marginBottom: '6px',
                fontFamily: '"Playfair Display", Georgia, serif',
              }}>
                {v.tag}
              </p>

              {/* Vehicle name */}
              <h3 style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: 'clamp(1.3rem, 2.4vw, 1.7rem)',
                fontWeight: 900,
                color: '#FFFFFF',
                marginBottom: '36px',
                textShadow: '0 2px 12px rgba(0,0,0,0.4)',
              }}>
                {v.name}
              </h3>

              {/* Within City */}
              <div style={{ marginBottom: '28px' }}>
                <p style={{
                  color: 'rgba(255,255,255,0.35)',
                  fontSize: '0.68rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  marginBottom: '10px',
                  fontFamily: '"Playfair Display", Georgia, serif',
                }}>
                  Within City
                </p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                  <span style={{
                    fontFamily: '"Playfair Display", Georgia, serif',
                    fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
                    fontWeight: 900,
                    color: '#FFFFFF',
                    lineHeight: 1,
                    textShadow: SHADOW,
                  }}>
                    {v.withinCity}
                  </span>
                  <span style={{
                    fontSize: '0.75rem',
                    color: 'rgba(255,255,255,0.35)',
                    fontFamily: '"Playfair Display", Georgia, serif',
                    fontStyle: 'italic',
                  }}>
                    / day
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div style={{
                height: '1px',
                background: v.featured
                  ? 'linear-gradient(90deg, transparent, rgba(160,100,255,0.4), transparent)'
                  : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
                marginBottom: '28px',
              }} />

              {/* Intercity */}
              <div>
                <p style={{
                  color: 'rgba(255,255,255,0.35)',
                  fontSize: '0.68rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  marginBottom: '10px',
                  fontFamily: '"Playfair Display", Georgia, serif',
                }}>
                  Intercity Transfer
                </p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                  <span style={{
                    fontFamily: '"Playfair Display", Georgia, serif',
                    fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
                    fontWeight: 900,
                    color: '#FFFFFF',
                    lineHeight: 1,
                    textShadow: SHADOW,
                  }}>
                    {v.intercity}
                  </span>
                  <span style={{
                    fontSize: '0.75rem',
                    color: 'rgba(255,255,255,0.35)',
                    fontFamily: '"Playfair Display", Georgia, serif',
                    fontStyle: 'italic',
                  }}>
                    one-way
                  </span>
                </div>
              </div>

            </div>
          </motion.div>
        ))}
      </div>

      {/* Disclaimer + CTA */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.65 }}
        style={{
          color: 'rgba(255,255,255,0.25)',
          fontSize: '0.78rem',
          fontFamily: '"Playfair Display", Georgia, serif',
          fontStyle: 'italic',
          marginBottom: '36px',
          position: 'relative',
        }}
      >
        All rates are indicative. Final pricing depends on your specific requirements.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.75 }}
      >
        <button
          className="nav-cta"
          onClick={() => document.getElementById('book-now')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Enquire for a custom quote
        </button>
      </motion.div>
    </section>
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
    if (location.state?.scrollToPricing) {
      const el = document.getElementById('pricing')
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

        {/* ── SECTION 3: Pricing ── */}
        <PricingSection />

        {/* ── SECTION 4: Enquiry form — reveals smoothly from below ── */}
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

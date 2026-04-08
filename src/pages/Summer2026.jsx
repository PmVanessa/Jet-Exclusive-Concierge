import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import PageMeta from '../components/PageMeta'

const SHADOW = '0 2px 20px rgba(0,0,0,0.8), 0 0 40px rgba(0,0,0,0.5)'
const TARGET  = new Date('2026-06-21T00:00:00')

function getTimeLeft() {
  const diff = TARGET - new Date()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days:    Math.floor(diff / 86400000),
    hours:   Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000)  / 60000),
    seconds: Math.floor((diff % 60000)    / 1000),
  }
}

function CountdownUnit({ value, label }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '80px' }}>
      <span style={{
        fontFamily: '"Playfair Display", Georgia, serif',
        fontWeight: 900,
        fontSize: 'clamp(2.8rem, 7vw, 5rem)',
        color: '#FFFFFF',
        lineHeight: 1,
        textShadow: SHADOW,
        letterSpacing: '-0.02em',
      }}>
        {String(value).padStart(2, '0')}
      </span>
      <span style={{
        fontFamily: "'Nunito Sans', system-ui, sans-serif",
        fontSize: '10px', fontWeight: 600,
        letterSpacing: '0.22em', textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.5)',
        marginTop: '10px',
      }}>
        {label}
      </span>
    </div>
  )
}

function Divider() {
  return (
    <span style={{
      fontFamily: '"Playfair Display", Georgia, serif',
      fontSize: 'clamp(2rem, 5vw, 3.5rem)',
      color: 'rgba(255,255,255,0.25)',
      lineHeight: 1,
      alignSelf: 'flex-start',
      paddingTop: '0.1em',
    }}>:</span>
  )
}

export default function Summer2026() {
  const [videoFailed, setVideoFailed] = useState(false)
  const [time, setTime]               = useState(getTimeLeft)
  const navigate                       = useNavigate()

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <>
      <PageMeta
        title="Summer 2026 | Jet Exclusive Concierge"
        description="Executive mobility for the summer season. Coming June 2026."
      />

      {!videoFailed && (
        <video autoPlay muted loop playsInline onError={() => setVideoFailed(true)}
          style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
        >
          <source src="/jec-summer-video.mp4" type="video/mp4" />
        </video>
      )}

      <div style={{
        position: 'fixed', inset: 0,
        backgroundColor: videoFailed ? '#0a0a0f' : 'rgba(10,10,15,0.62)',
        zIndex: 1,
      }} />

      <div style={{
        position: 'relative', zIndex: 2,
        minHeight: '100vh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '120px 24px 80px',
      }}>

        {/* Title */}
        <h1 style={{
          fontFamily: '"Playfair Display", Georgia, serif',
          fontWeight: 900,
          fontSize: 'clamp(2.4rem, 7vw, 5rem)',
          color: '#FFFFFF',
          lineHeight: 1.05,
          textShadow: SHADOW,
          marginBottom: '20px',
        }}>
          Summer 2026
        </h1>

        {/* Subline */}
        <p style={{
          fontFamily: "'Nunito Sans', system-ui, sans-serif",
          fontSize: '16px', fontWeight: 500,
          letterSpacing: '0.08em',
          color: 'rgba(255,255,255,0.6)',
          marginBottom: '72px',
          textShadow: SHADOW,
        }}>
          Coming June 2026
        </p>

        {/* Countdown */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'clamp(16px, 3vw, 32px)' }}>
          <CountdownUnit value={time.days}    label="Days"    />
          <Divider />
          <CountdownUnit value={time.hours}   label="Hours"   />
          <Divider />
          <CountdownUnit value={time.minutes} label="Minutes" />
          <Divider />
          <CountdownUnit value={time.seconds} label="Seconds" />
        </div>

        {/* CTA */}
        <button
          onClick={() => navigate('/', { state: { scrollToForm: true, intent: 'summer' } })}
          style={{
            marginTop: '60px',
            backgroundColor: '#F02232',
            color: '#FFFFFF',
            fontFamily: "'Nunito Sans', system-ui, sans-serif",
            fontSize: '12px',
            fontWeight: 500,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            padding: '18px 52px',
            border: 'none',
            cursor: 'pointer',
            borderRadius: 0,
          }}
        >
          Get Early Access
        </button>

      </div>

      <div style={{ position: 'relative', zIndex: 2 }}>
        <Footer />
      </div>
    </>
  )
}

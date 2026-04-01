import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'

const SECTIONS = ['Section One', 'Section Two', 'Section Three', 'Section Four']

// Each overlay: RGB values + opacity pinned to each section
const OVERLAYS = [
  { r: 10,  g: 10,  b: 15,  opacity: 0.3  }, // section 1 — vivid, mostly transparent
  { r: 10,  g: 10,  b: 15,  opacity: 0.5  }, // section 2 — slightly darker
  { r: 46,  g: 18,  b: 90,  opacity: 0.62 }, // section 3 — dark with purple tint
  { r: 10,  g: 10,  b: 15,  opacity: 0.85 }, // section 4 — darkest
]

function lerp(a, b, t) {
  return a + (b - a) * t
}

export default function App() {
  const [overlay, setOverlay] = useState(OVERLAYS[0])
  const [videoError, setVideoError] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight <= 0) return

      const progress = Math.min(scrollY / docHeight, 1) // 0 → 1
      const sectionFloat = progress * (SECTIONS.length - 1)
      const idx = Math.min(Math.floor(sectionFloat), SECTIONS.length - 2)
      const t = sectionFloat - idx

      const a = OVERLAYS[idx]
      const b = OVERLAYS[idx + 1]

      setOverlay({
        r: lerp(a.r, b.r, t),
        g: lerp(a.g, b.g, t),
        b: lerp(a.b, b.b, t),
        opacity: lerp(a.opacity, b.opacity, t),
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const bgColor = `rgba(${Math.round(overlay.r)}, ${Math.round(overlay.g)}, ${Math.round(overlay.b)}, ${overlay.opacity.toFixed(3)})`

  return (
    <>
      <Navbar />

      {/* Fixed video layer */}
      {!videoError ? (
        <video className="video-hero"
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
          poster=""
          onError={() => setVideoError(true)}
        >
          <source src="/jec-hero-video.mp4" type="video/mp4" />
        </video>
      ) : (
        /* Fallback: CSS gradient + grain when video fails to load */
        <div className="video-fallback-grain" />
      )}

      {/* Scroll-driven overlay */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          backgroundColor: bgColor,
        }}
      />

      {/* Scrollable sections */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        {SECTIONS.map((label) => (
          <section
            key={label}
            style={{
              height: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                color: '#FFFFFF',
                fontSize: 'clamp(2.5rem, 7vw, 6.5rem)',
                fontWeight: 300,
                letterSpacing: '0.12em',
                userSelect: 'none',
                textTransform: 'uppercase',
              }}
            >
              {label}
            </span>
          </section>
        ))}
      </div>
    </>
  )
}

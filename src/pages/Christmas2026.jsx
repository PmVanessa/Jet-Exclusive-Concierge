import { useState } from 'react'
import Footer from '../components/Footer'

const SHADOW = '0 2px 20px rgba(0,0,0,0.8), 0 0 40px rgba(0,0,0,0.5)'

export default function Christmas2026() {
  const [videoFailed, setVideoFailed] = useState(false)

  return (
    <>
      {/* Fixed video world */}
      {!videoFailed && (
        <video
          key="christmas-video"
          autoPlay
          muted
          loop
          playsInline
          onError={() => setVideoFailed(true)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
          }}
        >
          <source src="/jec-christmas-video.mp4" type="video/mp4" />
        </video>
      )}

      {/* Dark overlay */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: videoFailed
            ? '#0a0a0f'
            : 'rgba(10, 10, 15, 0.6)',
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '0 24px',
        }}
      >
        <h1
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontWeight: 900,
            fontSize: 'clamp(2rem, 6vw, 4rem)',
            color: '#FFFFFF',
            lineHeight: 1.1,
            marginBottom: '1.5rem',
            textShadow: SHADOW,
          }}
        >
          Christmas 2026
        </h1>
        <p
          style={{
            fontFamily: "'Nunito Sans', system-ui, sans-serif",
            fontWeight: 500,
            fontSize: '16px',
            color: '#FFFFFF',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            textShadow: SHADOW,
          }}
        >
          Coming Soon
        </p>
      </div>

      {/* Footer sits in normal flow above fixed layers */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <Footer />
      </div>
    </>
  )
}

import { useEffect, useRef, useState } from 'react'

// Lerp helper
function lerp(a, b, t) {
  return a + (b - a) * t
}

export default function JetCursor() {
  const cursorRef = useRef(null)
  const rafRef = useRef(null)

  // Raw mouse target
  const target = useRef({ x: -100, y: -100 })
  // Lerped current position
  const current = useRef({ x: -100, y: -100 })
  // Previous position for angle calculation
  const prev = useRef({ x: -100, y: -100 })
  // Current angle, lerped
  const angle = useRef(0)
  // Target scale
  const scale = useRef(1)
  const currentScale = useRef(1)

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Detect touch/mobile — hide cursor
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (!mq.matches) {
      setIsMobile(true)
      return
    }

    const onMove = (e) => {
      target.current.x = e.clientX
      target.current.y = e.clientY
    }

    const onHoverIn = (e) => {
      const el = e.target
      if (
        el.tagName === 'A' ||
        el.tagName === 'BUTTON' ||
        el.closest('a') ||
        el.closest('button') ||
        el.tagName === 'INPUT' ||
        el.tagName === 'SELECT' ||
        el.tagName === 'TEXTAREA' ||
        el.tagName === 'LABEL'
      ) {
        scale.current = 1.35
      }
    }

    const onHoverOut = () => {
      scale.current = 1
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onHoverIn)
    document.addEventListener('mouseout', onHoverOut)

    const tick = () => {
      const el = cursorRef.current
      if (!el) {
        rafRef.current = requestAnimationFrame(tick)
        return
      }

      // Lerp position
      current.current.x = lerp(current.current.x, target.current.x, 0.14)
      current.current.y = lerp(current.current.y, target.current.y, 0.14)

      // Calculate movement delta for rotation
      const dx = current.current.x - prev.current.x
      const dy = current.current.y - prev.current.y
      const dist = Math.sqrt(dx * dx + dy * dy)

      // Only update angle when actually moving
      if (dist > 0.5) {
        const targetAngle = Math.atan2(dy, dx) * (180 / Math.PI)
        angle.current = lerp(angle.current, targetAngle, 0.1)
      }

      // Lerp scale
      currentScale.current = lerp(currentScale.current, scale.current, 0.12)

      prev.current.x = current.current.x
      prev.current.y = current.current.y

      el.style.transform = `translate(${current.current.x}px, ${current.current.y}px) translate(-50%, -50%) rotate(${angle.current}deg) scale(${currentScale.current})`

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onHoverIn)
      document.removeEventListener('mouseout', onHoverOut)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  if (isMobile) return null

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '32px',
        height: '32px',
        zIndex: 99999,
        pointerEvents: 'none',
        willChange: 'transform',
        transformOrigin: 'center center',
      }}
    >
      {/* Minimal jet silhouette SVG — points right by default */}
      <svg
        viewBox="0 0 48 24"
        width="48"
        height="24"
        fill="white"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block', filter: 'drop-shadow(0 0 4px rgba(240,34,50,0.4))' }}
      >
        {/* Fuselage */}
        <path d="M 0 11 L 38 11 L 48 12 L 38 13 L 0 13 Z" />
        {/* Main wing */}
        <path d="M 14 12 L 28 3 L 30 5 L 18 12 L 30 19 L 28 21 Z" />
        {/* Tail fin vertical */}
        <path d="M 4 12 L 10 6 L 11 7 L 6 12 L 11 17 L 10 18 Z" />
        {/* Tail fin horizontal */}
        <path d="M 2 12 L 8 8 L 9 9 L 4 12 L 9 15 L 8 16 Z" opacity="0.7" />
        {/* Nose cone */}
        <path d="M 38 11 L 48 12 L 38 13 Z" opacity="0.8" />
        {/* Engine nacelle */}
        <ellipse cx="22" cy="12" rx="3" ry="1.5" fill="rgba(255,255,255,0.5)" />
      </svg>
    </div>
  )
}

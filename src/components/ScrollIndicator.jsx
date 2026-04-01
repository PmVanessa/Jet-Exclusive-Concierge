import { motion } from 'framer-motion'

export default function ScrollIndicator() {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        zIndex: 20,
      }}
    >
      {/* Outer track line */}
      <div
        style={{
          width: '1px',
          height: '60px',
          backgroundColor: 'rgba(255,255,255,0.15)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Animated fill */}
        <motion.div
          animate={{ y: ['-100%', '200%'] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
            repeatType: 'loop',
          }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '40%',
            backgroundColor: 'rgba(255,255,255,0.7)',
          }}
        />
      </div>
      <span
        style={{
          fontFamily: 'Inter, system-ui, sans-serif',
          fontSize: '9px',
          letterSpacing: '0.2em',
          color: 'rgba(255,255,255,0.4)',
          textTransform: 'uppercase',
        }}
      >
        Scroll
      </span>
    </div>
  )
}

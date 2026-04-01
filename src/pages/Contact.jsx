import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import Footer from '../components/Footer'

// Replace with your actual Formspree form ID
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/FORMSPREE_ENDPOINT'

// Lagos sunset skyline video
const VIDEO_SRC = 'https://videos.pexels.com/video-files/28920104/28920104-hd_1920_1080_25fps.mp4'

const SERVICES = [
  'Airport Protocol',
  'City Transfers',
  'Event Coordination',
  'Accommodation Sourcing',
  'Other',
]

const fieldStyle = {
  width: '100%',
  backgroundColor: 'rgba(10,10,15,0.80)',
  border: '1px solid rgba(255,255,255,0.15)',
  color: '#FFFFFF',
  fontFamily: 'Inter, system-ui, sans-serif',
  fontSize: '14px',
  padding: '14px 16px',
  outline: 'none',
  transition: 'border-color 0.2s ease',
  appearance: 'none',
  WebkitAppearance: 'none',
}

const labelStyle = {
  display: 'block',
  fontFamily: 'Inter, system-ui, sans-serif',
  fontSize: '11px',
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: '#a0a0b0',
  marginBottom: '8px',
}

const errorStyle = {
  fontFamily: 'Inter, system-ui, sans-serif',
  fontSize: '12px',
  color: '#F02232',
  marginTop: '6px',
  display: 'block',
}

function FieldWrapper({ label, error, children }) {
  return (
    <div style={{ marginBottom: '24px' }}>
      <label style={labelStyle}>{label}</label>
      {children}
      {error && <span style={errorStyle}>{error.message}</span>}
    </div>
  )
}

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    setSubmitting(true)
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setSubmitted(true)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  const onFocus = (e) => { e.target.style.borderColor = 'rgba(255,255,255,0.8)' }
  const onBlur = (e) => { e.target.style.borderColor = 'rgba(255,255,255,0.15)' }

  return (
    <div className="page-transition">
      {/* Fixed video */}
      <div className="video-bg">
        <video autoPlay muted loop playsInline preload="auto" aria-hidden="true">
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
      </div>

      {/* ── Top hero section ── */}
      <section
        style={{
          position: 'relative',
          zIndex: 10,
          padding: '200px 32px 120px',
          textAlign: 'center',
          overflow: 'hidden',
        }}
        className="contact-hero"
      >
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(10,10,15,0.75)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontWeight: 300,
              fontSize: '64px',
              color: '#FFFFFF',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              marginBottom: '16px',
            }}
            className="contact-h1"
          >
            Tell us about your trip.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: '15px',
              color: '#a0a0b0',
              letterSpacing: '0.04em',
            }}
          >
            Fill in the form and we will come back to you within 24 hours.
          </motion.p>
        </div>
      </section>

      {/* ── Form section ── */}
      <section
        style={{
          position: 'relative',
          zIndex: 10,
          padding: '0 32px 120px',
          overflow: 'hidden',
        }}
        className="form-section-pad"
      >
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(10,10,15,0.75)', pointerEvents: 'none' }} />

        <div
          style={{
            position: 'relative',
            zIndex: 1,
            maxWidth: '1200px',
            margin: '0 auto',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
            style={{
              display: 'grid',
              gridTemplateColumns: '3fr 2fr',
              gap: '0',
              border: '1px solid rgba(255,255,255,0.08)',
              backgroundColor: 'rgba(10,10,15,0.95)',
            }}
            className="form-grid"
          >
            {/* ── Left: Form ── */}
            <div style={{ padding: '56px' }} className="form-col-pad">
              {submitted ? (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '400px',
                    textAlign: 'center',
                    gap: '20px',
                  }}
                >
                  <p
                    style={{
                      fontFamily: '"Cormorant Garamond", Georgia, serif',
                      fontStyle: 'italic',
                      fontWeight: 400,
                      fontSize: '36px',
                      color: '#FFFFFF',
                      lineHeight: 1.3,
                    }}
                    className="success-text"
                  >
                    We have received your enquiry and will be in touch within 24 hours.
                  </p>
                  <p
                    style={{
                      fontFamily: 'Inter, system-ui, sans-serif',
                      fontSize: '14px',
                      color: '#a0a0b0',
                      letterSpacing: '0.08em',
                    }}
                  >
                    Mo Dé, Mo Set.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  {/* Full name */}
                  <FieldWrapper label="Full name" error={errors.fullName}>
                    <input
                      type="text"
                      style={fieldStyle}
                      onFocus={onFocus}
                      onBlur={onBlur}
                      {...register('fullName', { required: 'Please enter your full name.' })}
                    />
                  </FieldWrapper>

                  {/* Phone */}
                  <FieldWrapper label="Phone number" error={errors.phone}>
                    <input
                      type="tel"
                      style={fieldStyle}
                      placeholder="+44 7700 900000"
                      onFocus={onFocus}
                      onBlur={onBlur}
                      {...register('phone', { required: 'Please enter your phone number.' })}
                    />
                  </FieldWrapper>

                  {/* Email */}
                  <FieldWrapper label="Email address" error={errors.email}>
                    <input
                      type="email"
                      style={fieldStyle}
                      onFocus={onFocus}
                      onBlur={onBlur}
                      {...register('email', {
                        required: 'Please enter your email address.',
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: 'Please enter a valid email address.',
                        },
                      })}
                    />
                  </FieldWrapper>

                  {/* Two-column date + city row */}
                  <div
                    style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}
                    className="two-col"
                  >
                    <FieldWrapper label="Arriving in" error={errors.city}>
                      <select
                        style={{ ...fieldStyle, color: '#FFFFFF' }}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        {...register('city', { required: 'Please select a city.' })}
                      >
                        <option value="" style={{ backgroundColor: '#0a0a0f' }}>Select city</option>
                        <option value="Lagos" style={{ backgroundColor: '#0a0a0f' }}>Lagos</option>
                        <option value="Abuja" style={{ backgroundColor: '#0a0a0f' }}>Abuja</option>
                        <option value="Both" style={{ backgroundColor: '#0a0a0f' }}>Both</option>
                      </select>
                    </FieldWrapper>

                    <FieldWrapper label="Arrival date" error={errors.arrivalDate}>
                      <input
                        type="date"
                        style={{ ...fieldStyle, colorScheme: 'dark' }}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        {...register('arrivalDate', { required: 'Please enter your arrival date.' })}
                      />
                    </FieldWrapper>
                  </div>

                  <FieldWrapper label="Departure date" error={errors.departureDate}>
                    <input
                      type="date"
                      style={{ ...fieldStyle, colorScheme: 'dark' }}
                      onFocus={onFocus}
                      onBlur={onBlur}
                      {...register('departureDate', { required: 'Please enter your departure date.' })}
                    />
                  </FieldWrapper>

                  {/* Services checkboxes */}
                  <div style={{ marginBottom: '24px' }}>
                    <label style={labelStyle}>Services needed</label>
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '12px 24px',
                      }}
                      className="checkbox-grid"
                    >
                      {SERVICES.map((svc) => (
                        <label
                          key={svc}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            fontFamily: 'Inter, system-ui, sans-serif',
                            fontSize: '14px',
                            color: '#a0a0b0',
                            cursor: 'pointer',
                          }}
                        >
                          <input
                            type="checkbox"
                            className="checkbox-custom"
                            value={svc}
                            {...register('services')}
                          />
                          {svc}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* How did you hear */}
                  <FieldWrapper label="How did you hear about us">
                    <select
                      style={{ ...fieldStyle, color: '#FFFFFF' }}
                      onFocus={onFocus}
                      onBlur={onBlur}
                      {...register('source')}
                    >
                      <option value="" style={{ backgroundColor: '#0a0a0f' }}>Select an option</option>
                      <option value="Instagram" style={{ backgroundColor: '#0a0a0f' }}>Instagram</option>
                      <option value="TikTok" style={{ backgroundColor: '#0a0a0f' }}>TikTok</option>
                      <option value="Facebook" style={{ backgroundColor: '#0a0a0f' }}>Facebook</option>
                      <option value="Referred by someone" style={{ backgroundColor: '#0a0a0f' }}>Referred by someone</option>
                      <option value="Other" style={{ backgroundColor: '#0a0a0f' }}>Other</option>
                    </select>
                  </FieldWrapper>

                  {/* Notes */}
                  <FieldWrapper label="Additional notes">
                    <textarea
                      rows={4}
                      style={fieldStyle}
                      placeholder="Anything else that would help us prepare for your arrival."
                      onFocus={onFocus}
                      onBlur={onBlur}
                      {...register('notes')}
                    />
                  </FieldWrapper>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={submitting}
                    style={{
                      width: '100%',
                      backgroundColor: submitting ? '#8a1320' : '#F02232',
                      color: '#FFFFFF',
                      fontFamily: 'Inter, system-ui, sans-serif',
                      fontSize: '12px',
                      fontWeight: 500,
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      padding: '18px',
                      border: 'none',
                      cursor: submitting ? 'wait' : 'pointer',
                      transition: 'background-color 0.2s ease',
                    }}
                    onMouseEnter={(e) => { if (!submitting) e.currentTarget.style.backgroundColor = '#c71b27' }}
                    onMouseLeave={(e) => { if (!submitting) e.currentTarget.style.backgroundColor = '#F02232' }}
                  >
                    {submitting ? 'Sending…' : 'Send Enquiry'}
                  </button>
                </form>
              )}
            </div>

            {/* ── Right: Info panel ── */}
            <div
              style={{
                padding: '56px 48px',
                borderLeft: '1px solid rgba(255,255,255,0.08)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
              }}
              className="info-col"
            >
              <h3
                style={{
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  fontWeight: 400,
                  fontSize: '28px',
                  color: '#FFFFFF',
                  marginBottom: '40px',
                  lineHeight: 1.2,
                }}
              >
                What happens next
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                {[
                  'We review your enquiry within 24 hours.',
                  'We send you a tailored bundle recommendation with pricing starting from ₦150,000.',
                  'You confirm and we handle everything from there.',
                ].map((step, i) => (
                  <div key={i} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                    {/* White line + muted number */}
                    <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                      <div style={{ width: '1px', height: '24px', backgroundColor: 'rgba(255,255,255,0.25)' }} />
                      <span
                        style={{
                          fontFamily: 'Inter, system-ui, sans-serif',
                          fontSize: '11px',
                          color: '#a0a0b0',
                          letterSpacing: '0.1em',
                        }}
                      >
                        0{i + 1}
                      </span>
                    </div>
                    <p
                      style={{
                        fontFamily: 'Inter, system-ui, sans-serif',
                        fontSize: '14px',
                        color: '#a0a0b0',
                        lineHeight: 1.7,
                        paddingTop: '4px',
                      }}
                    >
                      {step}
                    </p>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div style={{ margin: '48px 0', height: '1px', backgroundColor: 'rgba(255,255,255,0.08)' }} />

              <p
                style={{
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  fontStyle: 'italic',
                  fontSize: '20px',
                  color: 'rgba(255,255,255,0.4)',
                  lineHeight: 1.5,
                }}
              >
                "No searching for your name. No negotiating with strangers."
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />

      <style>{`
        @media (max-width: 767px) {
          .contact-hero { padding: 140px 24px 80px !important; }
          .contact-h1 { font-size: 40px !important; }
          .form-section-pad { padding: 0 16px 80px !important; }
          .form-grid { grid-template-columns: 1fr !important; }
          .form-col-pad { padding: 32px 24px !important; }
          .info-col {
            border-left: none !important;
            border-top: 1px solid rgba(255,255,255,0.08) !important;
            padding: 32px 24px !important;
          }
          .two-col { grid-template-columns: 1fr !important; gap: 0 !important; }
          .checkbox-grid { grid-template-columns: 1fr !important; }
          .success-text { font-size: 26px !important; }
        }
      `}</style>
    </div>
  )
}

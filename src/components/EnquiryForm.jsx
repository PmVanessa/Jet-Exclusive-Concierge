import { useState } from 'react'
import { useForm } from 'react-hook-form'

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mojpnyvo'

const SERVICES = [
  'Fast Track Immigration',
  'Baggage Assistance',
  'Airport Transfers',
  'Lounge Access',
  'In-City Rides',
  'Multilingual Guides',
  'Tailored VIP Services',
  'Other',
]

const HOW_OPTIONS = [
  'Instagram',
  'TikTok',
  'Facebook',
  'Twitter/X',
  'LinkedIn',
  'Google Search',
  'A friend',
]

const NIGERIAN_STATES = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa',
  'Benue', 'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo',
  'Ekiti', 'Enugu', 'FCT Abuja', 'Gombe', 'Imo', 'Jigawa',
  'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara',
  'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun',
  'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara',
]

// ── Shared style tokens ──
const inputBase = {
  width: '100%',
  backgroundColor: '#0a0a0f',
  color: '#FFFFFF',
  border: '1px solid rgba(160, 160, 176, 0.35)',
  fontFamily: "'Nunito Sans', system-ui, sans-serif",
  fontSize: '18px',
  fontWeight: 500,
  padding: '14px 16px',
  outline: 'none',
  boxSizing: 'border-box',
  borderRadius: 0,
  appearance: 'none',
  WebkitAppearance: 'none',
}

const labelStyle = {
  display: 'block',
  fontFamily: "'Nunito Sans', system-ui, sans-serif",
  fontSize: '14px',
  fontWeight: 600,
  letterSpacing: '1px',
  textTransform: 'uppercase',
  color: '#a0a0b0',
  marginBottom: '10px',
}

const errorStyle = {
  fontFamily: "'Nunito Sans', system-ui, sans-serif",
  fontSize: '12px',
  color: '#F02232',
  marginTop: '6px',
  display: 'block',
}

const fieldWrap = { marginBottom: '2rem' }

export default function EnquiryForm() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(false)
  const [selectedServices, setSelectedServices] = useState([])

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const howHeard = watch('howHeard')
  const otherSelected = selectedServices.includes('Other')

  const toggleService = (service) => {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    )
  }

  const onSubmit = async (data) => {
    setSubmitting(true)
    setSubmitError(false)
    try {
      const payload = {
        'Full Name':       data.fullName,
        'Email':           data.email,
        'Phone Number':    data.phone,
        'Location':        data.location || '',
        'Arrival Date':    data.arrivalDate || '',
        'Departure Date':  data.departureDate || '',
        'Services Needed': selectedServices.join(', '),
        'Other Service':   data.otherService || '',
        'How They Heard':  data.howHeard || '',
        "Friend's Name":   data.friendName || '',
      }
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })
      if (res.ok) {
        setSubmitted(true)
      } else {
        setSubmitError(true)
      }
    } catch {
      setSubmitError(true)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section
      style={{
        // Transparent so the fixed video shows through — overlay handled by Home.jsx scroll mechanic
        backgroundColor: 'transparent',
        position: 'relative',
        zIndex: 2,
        padding: 'clamp(80px, 14vh, 140px) clamp(16px, 2.5vw, 24px)',
      }}
    >
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>

        {submitted ? (
          /* ── Success state ── */
          <div style={{ textAlign: 'center', padding: 'clamp(80px, 14vh, 140px) 0' }}>
            <h2
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontWeight: 900,
                fontSize: 'clamp(1.8rem, 4vw, 3.5rem)',
                color: '#FFFFFF',
                lineHeight: 1.05,
                marginBottom: '2rem',
              }}
            >
              Your Arrival Starts Here
            </h2>
            <p
              style={{
                fontFamily: "'Nunito Sans', system-ui, sans-serif",
                fontSize: '18px',
                fontWeight: 500,
                color: '#FFFFFF',
                lineHeight: 1.8,
                maxWidth: '560px',
                margin: '0 auto',
              }}
            >
              We have got it. Expect a call or message from us within the next 2 hours. However you want to move, we are going to make it feel effortless.
            </p>
          </div>
        ) : (
          <>
            {/* ── Heading ── */}
            <h2
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontWeight: 900,
                fontSize: 'clamp(1.8rem, 4vw, 3.5rem)',
                color: '#FFFFFF',
                lineHeight: 1.05,
                marginBottom: '2rem',
              }}
            >
              Your Arrival Starts Here
            </h2>
            <p
              style={{
                fontFamily: "'Nunito Sans', system-ui, sans-serif",
                fontSize: '18px',
                fontWeight: 500,
                color: '#FFFFFF',
                lineHeight: 2.2,
                letterSpacing: '0.5px',
                marginBottom: 'clamp(40px, 6vh, 60px)',
                textShadow: '0 2px 20px rgba(0,0,0,0.8), 0 0 40px rgba(0,0,0,0.5)',
              }}
            >
              Tell us what you need and we will take it from here.
            </p>

            {/* ── Form ── */}
            <form onSubmit={handleSubmit(onSubmit)} noValidate>

              {/* Full name */}
              <div style={fieldWrap}>
                <label style={labelStyle}>Full Name *</label>
                <input
                  type="text"
                  style={{ ...inputBase, borderColor: errors.fullName ? '#F02232' : 'rgba(160,160,176,0.35)' }}
                  {...register('fullName', { required: 'Full name is required' })}
                />
                {errors.fullName && <span style={errorStyle}>{errors.fullName.message}</span>}
              </div>

              {/* Email */}
              <div style={fieldWrap}>
                <label style={labelStyle}>Email *</label>
                <input
                  type="email"
                  style={{ ...inputBase, borderColor: errors.email ? '#F02232' : 'rgba(160,160,176,0.35)' }}
                  {...register('email', {
                    required: 'Email is required',
                    pattern: { value: /\S+@\S+\.\S+/, message: 'Enter a valid email address' },
                  })}
                />
                {errors.email && <span style={errorStyle}>{errors.email.message}</span>}
              </div>

              {/* Phone */}
              <div style={fieldWrap}>
                <label style={labelStyle}>Phone Number *</label>
                <input
                  type="tel"
                  style={{ ...inputBase, borderColor: errors.phone ? '#F02232' : 'rgba(160,160,176,0.35)' }}
                  {...register('phone', { required: 'Phone number is required' })}
                />
                {errors.phone && <span style={errorStyle}>{errors.phone.message}</span>}
              </div>

              {/* Where do you need us — all 36 states + FCT */}
              <div style={fieldWrap}>
                <label style={labelStyle}>Where Do You Need Us</label>
                <div style={{ position: 'relative' }}>
                  <select
                    style={{ ...inputBase, cursor: 'pointer', paddingRight: '36px' }}
                    defaultValue=""
                    {...register('location')}
                  >
                    <option value="" disabled>Select state</option>
                    {NIGERIAN_STATES.map((state) => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                  <span style={{
                    position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)',
                    color: '#a0a0b0', pointerEvents: 'none', fontSize: '10px',
                  }}>▾</span>
                </div>
              </div>

              {/* Dates row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
                <div>
                  <label style={labelStyle}>Arrival Date</label>
                  <input
                    type="date"
                    style={{ ...inputBase, colorScheme: 'dark' }}
                    {...register('arrivalDate')}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Departure Date</label>
                  <input
                    type="date"
                    style={{ ...inputBase, colorScheme: 'dark' }}
                    {...register('departureDate')}
                  />
                </div>
              </div>

              {/* Services needed — with Other + conditional input */}
              <div style={fieldWrap}>
                <label style={labelStyle}>Services Needed</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '4px' }}>
                  {SERVICES.map((service) => {
                    const checked = selectedServices.includes(service)
                    return (
                      <div key={service}>
                        <label
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            cursor: 'pointer',
                            fontFamily: "'Nunito Sans', system-ui, sans-serif",
                            fontSize: '16px',
                            fontWeight: 500,
                            letterSpacing: '0.5px',
                            color: '#FFFFFF',
                            userSelect: 'none',
                          }}
                        >
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: '16px',
                              height: '16px',
                              border: `1px solid ${checked ? '#F02232' : 'rgba(160,160,176,0.35)'}`,
                              backgroundColor: checked ? '#F02232' : 'transparent',
                              flexShrink: 0,
                            }}
                            onClick={() => toggleService(service)}
                          >
                            {checked && (
                              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                <path d="M1 4L3.5 6.5L9 1" stroke="#fff" strokeWidth="1.5" strokeLinecap="square"/>
                              </svg>
                            )}
                          </span>
                          <span onClick={() => toggleService(service)}>{service}</span>
                        </label>

                        {/* Conditional: Other text input */}
                        {service === 'Other' && otherSelected && (
                          <div style={{ marginTop: '12px', paddingLeft: '28px' }}>
                            <input
                              type="text"
                              placeholder="Please describe what you need"
                              style={{ ...inputBase, fontSize: '13px' }}
                              {...register('otherService')}
                            />
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* How did you hear */}
              <div style={fieldWrap}>
                <label style={labelStyle}>How Did You Hear About Us</label>
                <div style={{ position: 'relative' }}>
                  <select
                    style={{ ...inputBase, cursor: 'pointer', paddingRight: '36px' }}
                    defaultValue=""
                    {...register('howHeard')}
                  >
                    <option value="" disabled>Select an option</option>
                    {HOW_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  <span style={{
                    position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)',
                    color: '#a0a0b0', pointerEvents: 'none', fontSize: '10px',
                  }}>▾</span>
                </div>

                {/* Conditional: friend name */}
                {howHeard === 'A friend' && (
                  <div style={{ marginTop: '16px' }}>
                    <label style={labelStyle}>What Is Your Friend's Name</label>
                    <input
                      type="text"
                      style={inputBase}
                      {...register('friendName')}
                    />
                  </div>
                )}
              </div>

              {/* Submission error */}
              {submitError && (
                <p style={{
                  fontFamily: "'Nunito Sans', system-ui, sans-serif",
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#F02232',
                  marginBottom: '1.5rem',
                  letterSpacing: '0.3px',
                }}>
                  Something went wrong. Please check your connection and try again.
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                style={{
                  backgroundColor: submitting ? '#a0a0b0' : '#F02232',
                  color: '#FFFFFF',
                  fontFamily: "'Nunito Sans', system-ui, sans-serif",
                  fontSize: '12px',
                  fontWeight: 500,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  padding: '18px 52px',
                  border: 'none',
                  cursor: submitting ? 'not-allowed' : 'pointer',
                  display: 'inline-block',
                  borderRadius: 0,
                }}
              >
                {submitting ? 'Sending...' : 'Send Enquiry'}
              </button>

            </form>
          </>
        )}
      </div>
    </section>
  )
}

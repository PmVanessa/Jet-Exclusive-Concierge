import { useState } from 'react'
import { useForm } from 'react-hook-form'

// ── Replace with your real Formspree ID when ready ──
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID'

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
  fontFamily: 'Inter, system-ui, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  padding: '14px 16px',
  outline: 'none',
  boxSizing: 'border-box',
  borderRadius: 0,
  appearance: 'none',
  WebkitAppearance: 'none',
}

const labelStyle = {
  display: 'block',
  fontFamily: 'Inter, system-ui, sans-serif',
  fontSize: '11px',
  fontWeight: 400,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: '#a0a0b0',
  marginBottom: '8px',
}

const errorStyle = {
  fontFamily: 'Inter, system-ui, sans-serif',
  fontSize: '11px',
  color: '#F02232',
  marginTop: '6px',
  display: 'block',
}

const fieldWrap = { marginBottom: '28px' }

export default function EnquiryForm() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
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
    try {
      const payload = { ...data, services: selectedServices }
      await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })
      setSubmitted(true)
    } catch {
      setSubmitted(true)
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
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <h2
              style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontWeight: 400,
                fontSize: 'clamp(2.4rem, 6vw, 4.5rem)',
                color: '#FFFFFF',
                lineHeight: 1.05,
                marginBottom: '28px',
              }}
            >
              Your Arrival Starts Here
            </h2>
            <p
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: 'clamp(0.9rem, 1.4vw, 1rem)',
                fontWeight: 400,
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
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontWeight: 400,
                fontSize: 'clamp(2.4rem, 6vw, 4.5rem)',
                color: '#FFFFFF',
                lineHeight: 1.05,
                marginBottom: '16px',
              }}
            >
              Your Arrival Starts Here
            </h2>
            <p
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: 'clamp(0.88rem, 1.3vw, 0.95rem)',
                color: '#a0a0b0',
                lineHeight: 1.75,
                marginBottom: 'clamp(40px, 6vh, 60px)',
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
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '28px' }}>
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
                            fontFamily: 'Inter, system-ui, sans-serif',
                            fontSize: '14px',
                            color: checked ? '#FFFFFF' : '#a0a0b0',
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

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                style={{
                  backgroundColor: submitting ? '#a0a0b0' : '#F02232',
                  color: '#FFFFFF',
                  fontFamily: 'Inter, system-ui, sans-serif',
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

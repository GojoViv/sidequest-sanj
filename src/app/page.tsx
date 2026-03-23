'use client'

import { useState, useEffect, useRef } from 'react'
import { X, Instagram, ArrowRight } from 'lucide-react'

// ─── PALETTE ──────────────────────────────────────────────────────────────
const C = {
  bg:         '#F3EDE3',
  surface:    '#EDE6D8',
  border:     '#D4C8B4',
  text:       '#1A1814',
  muted:      '#8A7A68',
  faint:      '#B0A090',
  bronze:     '#9A7B4F',
  bronzeLight:'#B8956A',
  dark:       '#1C1710',
  darkMid:    '#2E2618',
  white:      '#FAF7F2',
}

// ─── ITINERARY ────────────────────────────────────────────────────────────
const days = [
  { day: 1, date: 'May 9',  theme: 'Adventure Begins',       sub: 'Private transfers to Ubud · Luxury villa check-in · Balinese welcome dinner',         img: '/riceterraces.jpeg' },
  { day: 2, date: 'May 10', theme: 'Experience the Culture', sub: 'Tirta Empul temple at dawn · ATV jungle ride (add-on) · Jungle Club sundowner',        img: '/atv.jpeg' },
  { day: 3, date: 'May 11', theme: 'Hike + Hot Springs',     sub: 'Mount Batur sunrise trek · Volcanic hot springs · Return to Ubud',                      img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=75' },
  { day: 4, date: 'May 12', theme: 'School Immersion Day',   sub: 'Green School Bali visit · Field experience with students · Free day to explore Ubud',   img: '/waterfall3.jpeg' },
  { day: 5, date: 'May 13', theme: 'Meet the Mantas',        sub: 'Fast boat to Nusa Penida · Manta ray snorkeling · Coastal cliffs · Check-in Canggu',    img: '/nusapenida.jpeg' },
  { day: 6, date: 'May 14', theme: 'Surf + Beach Club',      sub: 'Surf lesson at dawn · Free time to explore Canggu/Seminyak · Luna Beach Club afternoon', img: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800&q=75' },
  { day: 7, date: 'May 15', theme: 'Startup Immersion Day',  sub: 'Embedded with a local Bali startup · Founders session · Finns Beach Club evening',      img: '/finns2.jpeg' },
  { day: 8, date: 'May 16', theme: 'The Closing Act',        sub: 'Free morning to explore · Closing night at Savaya',                                      img: '/sendoff.jpeg' },
  { day: 9, date: 'May 17', theme: 'Until Next Time',        sub: 'Breakfast included · Airport transfers · Until next time',                              img: '/waterfall2.jpeg' },
]

const included = [
  'Luxury villa and hotel accommodation',
  'Daily breakfast',
  'Airport & all intercity transfers',
  'Balinese welcome dinner',
  'Jungle Club, Luna & Finns Beach Club access',
  'Mount Batur sunrise hike & hot springs',
  'Tirta Empul temple visit',
  'Green School Bali immersion',
  'Fast boat to Nusa Penida',
  'Manta ray snorkeling',
  'Local startup immersion session',
  'Savaya closing night entry',
  'On-ground coordination throughout',
  'On-call concierge throughout the trip',
]

const notIncluded = [
  'International flights',
  'Visa fees (if applicable)',
  'Lunches and dinners (unless specified)',
  'Personal expenses',
  'Travel insurance',
  'Alcohol and additional activities not listed',
]

// ─── HOOKS ────────────────────────────────────────────────────────────────
function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('visible'); obs.disconnect() } },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

function Fade({ children, delay = 0, style = {} }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  const ref = useFadeIn()
  return (
    <div ref={ref} className="fade-in" style={{ transitionDelay: `${delay}ms`, ...style }}>
      {children}
    </div>
  )
}

// ─── EMAIL FORM ───────────────────────────────────────────────────────────
function SignupForm({ dark = false, onDone }: { dark?: boolean; onDone?: () => void }) {
  const [batch, setBatch] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [commitment, setCommitment] = useState('')
  const [excited, setExcited] = useState('')
  const [state, setState] = useState<'idle' | 'loading' | 'done'>('idle')

  const inputStyle: React.CSSProperties = {
    padding: '13px 16px',
    borderRadius: '6px',
    border: `1px solid ${dark ? 'rgba(255,255,255,0.15)' : C.border}`,
    background: dark ? 'rgba(255,255,255,0.07)' : C.white,
    color: dark ? C.white : C.text,
    fontSize: '14px',
    outline: 'none',
    width: '100%',
    fontFamily: 'inherit',
    backdropFilter: dark ? 'blur(4px)' : undefined,
    WebkitBackdropFilter: dark ? 'blur(4px)' : undefined,
  }

  const radioLabelStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '13px',
    color: dark ? 'rgba(243,237,227,0.75)' : C.muted,
    cursor: 'pointer',
    padding: '8px 12px',
    borderRadius: '6px',
    border: `1px solid ${dark ? 'rgba(255,255,255,0.12)' : C.border}`,
    flex: 1,
    transition: 'border-color 0.15s',
  }

  const labelStyle: React.CSSProperties = {
    fontSize: '11px',
    letterSpacing: '0.15em',
    color: dark ? 'rgba(154,123,79,0.9)' : C.bronze,
    marginBottom: '8px',
    fontWeight: 500,
    display: 'block',
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!batch || !commitment) return
    setState('loading')
    await new Promise(r => setTimeout(r, 900))
    try {
      await fetch('/api/reserve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, batch_preference: batch, commitment, excited, trip: 'Bali May 2026', source: 'info-session' }),
      })
    } catch { /* silent */ }
    setState('done')
    onDone?.()
  }

  if (state === 'done') {
    return (
      <div style={{ textAlign: 'center', padding: '12px 0' }}>
        <div style={{ fontSize: '22px', marginBottom: '8px' }}>✦</div>
        <p style={{ color: dark ? C.white : C.text, fontSize: '16px', fontFamily: 'Georgia, serif' }}>
          You&apos;re on the list.
        </p>
        <p style={{ color: dark ? 'rgba(243,237,227,0.55)' : C.muted, fontSize: '13px', marginTop: '6px' }}>
          Watch your inbox for details.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>

      {/* Top note */}
      <div style={{
        padding: '10px 14px',
        borderRadius: '6px',
        background: dark ? 'rgba(154,123,79,0.15)' : 'rgba(154,123,79,0.08)',
        border: `1px solid ${dark ? 'rgba(154,123,79,0.3)' : 'rgba(154,123,79,0.25)'}`,
        fontSize: '12px',
        color: dark ? 'rgba(184,149,106,0.9)' : C.bronze,
        lineHeight: 1.5,
      }}>
        Limited early bird spots. Payment links will be shared after sign-up.
      </div>

      {/* 1. Basic Details */}
      <input
        type="text" required value={name} onChange={e => setName(e.target.value)}
        placeholder="Full name" style={inputStyle}
      />
      <input
        type="email" required value={email} onChange={e => setEmail(e.target.value)}
        placeholder="Email address" style={inputStyle}
      />
      <input
        type="tel" required value={phone} onChange={e => setPhone(e.target.value)}
        placeholder="Phone number (WhatsApp preferred)" style={inputStyle}
      />

      {/* 2. Batch Selection */}
      <div>
        <span style={labelStyle}>SELECT YOUR PREFERRED BATCH</span>
        <div className="batch-radios" style={{ display: 'flex', gap: '8px' }}>
          {['May 9 – 17', 'May 17 – 25'].map(opt => (
            <label
              key={opt}
              style={{
                ...radioLabelStyle,
                borderColor: batch === opt ? C.bronze : dark ? 'rgba(255,255,255,0.12)' : C.border,
                color: batch === opt ? (dark ? C.white : C.text) : (dark ? 'rgba(243,237,227,0.6)' : C.muted),
              }}
            >
              <input
                type="radio" name="batch" value={opt} required
                checked={batch === opt} onChange={() => setBatch(opt)}
                style={{ accentColor: C.bronze, width: '14px', height: '14px', cursor: 'pointer' }}
              />
              {opt}
            </label>
          ))}
        </div>
      </div>

      {/* 3. Commitment Signal */}
      <div>
        <span style={labelStyle}>ARE YOU PLANNING TO SECURE YOUR SPOT IF SELECTED?</span>
        <div className="batch-radios" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {['Yes', 'Need more information'].map(opt => (
            <label
              key={opt}
              style={{
                ...radioLabelStyle,
                borderColor: commitment === opt ? C.bronze : dark ? 'rgba(255,255,255,0.12)' : C.border,
                color: commitment === opt ? (dark ? C.white : C.text) : (dark ? 'rgba(243,237,227,0.6)' : C.muted),
                flex: 'none',
              }}
            >
              <input
                type="radio" name="commitment" value={opt} required
                checked={commitment === opt} onChange={() => setCommitment(opt)}
                style={{ accentColor: C.bronze, width: '14px', height: '14px', cursor: 'pointer' }}
              />
              {opt}
            </label>
          ))}
        </div>
      </div>

      {/* 4. Experience Intent */}
      <div>
        <span style={labelStyle}>WHAT ARE YOU MOST EXCITED TO EXPERIENCE IN BALI?</span>
        <textarea
          value={excited} onChange={e => setExcited(e.target.value)}
          placeholder="Tell us what excites you most..."
          rows={3}
          style={{
            ...inputStyle,
            resize: 'none',
            lineHeight: 1.6,
          }}
        />
      </div>

      <button
        type="submit" disabled={state === 'loading'}
        style={{
          padding: '13px 20px',
          borderRadius: '6px',
          background: C.bronze,
          color: C.white,
          fontWeight: 500,
          fontSize: '14px',
          border: 'none',
          cursor: state === 'loading' ? 'wait' : 'pointer',
          letterSpacing: '0.04em',
          transition: 'background 0.2s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          opacity: state === 'loading' ? 0.7 : 1,
        }}
      >
        {state === 'loading' ? '...' : <><span>Reserve my spot</span><ArrowRight size={14} /></>}
      </button>
    </form>
  )
}

// ─── MODAL ────────────────────────────────────────────────────────────────
function Modal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    const fn = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [onClose])

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'rgba(0,0,0,0.55)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '16px',
        opacity: open ? 1 : 0,
        pointerEvents: open ? 'all' : 'none',
        transition: 'opacity 0.25s ease',
        overflowY: 'auto',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: C.dark,
          borderRadius: '14px',
          padding: 'clamp(28px, 5vw, 44px) clamp(20px, 5vw, 36px)',
          width: '100%',
          maxWidth: '420px',
          position: 'relative',
          transform: open ? 'scale(1)' : 'scale(0.96)',
          transition: 'transform 0.25s ease',
          boxShadow: '0 32px 80px rgba(0,0,0,0.5)',
          border: `1px solid rgba(255,255,255,0.07)`,
          boxSizing: 'border-box',
        }}
      >
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', cursor: 'pointer' }}
        >
          <X size={16} />
        </button>
        <p style={{ fontSize: '10px', letterSpacing: '0.2em', color: C.bronze, marginBottom: '12px', fontWeight: 500 }}>
          EARLY BIRD · MARCH 22
        </p>
        <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '26px', color: C.white, fontWeight: 400, marginBottom: '6px', lineHeight: 1.2 }}>
          Info Session
        </h3>
        <p style={{ fontSize: '13px', color: 'rgba(243,237,227,0.5)', marginBottom: '28px' }}>
          Bali · May 2026
        </p>
        <SignupForm dark onDone={onClose} />
      </div>
    </div>
  )
}

// ─── PAGE ─────────────────────────────────────────────────────────────────
export default function Page() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} />

      <main style={{ background: C.bg }}>

        {/* ── HERO ─────────────────────────────────────────────── */}
        <section
          className="hero-bg"
          style={{
            minHeight: '100svh',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{
            position: 'absolute', inset: 0, zIndex: 0,
            backgroundImage: 'url(https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=1600&q=80)',
            backgroundSize: 'cover', backgroundPosition: 'center 30%',
            filter: 'brightness(0.52) contrast(0.95) saturate(0.7)',
          }} />

          {/* Nav — no logo */}
          <nav style={{
            position: 'relative', zIndex: 10,
            padding: '28px 40px',
            display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
          }}>
            <button
              onClick={() => setModalOpen(true)}
              style={{
                padding: '9px 20px', borderRadius: '100px',
                border: '1px solid rgba(255,255,255,0.25)',
                background: 'rgba(255,255,255,0.07)',
                color: 'rgba(243,237,227,0.85)',
                fontSize: '13px', cursor: 'pointer',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                letterSpacing: '0.03em',
                transition: 'background 0.2s, border-color 0.2s',
              }}
            >
              Info session →
            </button>
          </nav>

          {/* Hero content */}
          <div style={{
            position: 'relative', zIndex: 10,
            flex: 1,
            display: 'flex', flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: 'clamp(32px, 6vw, 80px)',
            paddingBottom: 'clamp(48px, 8vw, 96px)',
          }}>
            <p style={{ fontSize: '11px', letterSpacing: '0.22em', color: 'rgba(154,123,79,0.9)', marginBottom: '20px', fontWeight: 500 }}>
              BALI · MAY 2026
            </p>
            <h1 style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(48px, 8.5vw, 112px)',
              color: C.white,
              fontWeight: 400,
              lineHeight: 0.95,
              letterSpacing: '-0.02em',
              marginBottom: '28px',
              maxWidth: '14ch',
            }}>
              The Side Quest
            </h1>
            <p style={{
              fontSize: 'clamp(14px, 1.6vw, 17px)',
              color: 'rgba(243,237,227,0.55)',
              maxWidth: '46ch',
              lineHeight: 1.65,
              marginBottom: '40px',
              fontWeight: 300,
            }}>
              We are an immersion travel company that organizes curated trips to emerging markets, bringing together adventure, culture, and global learning. First stop, Bali.
            </p>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
              <button
                onClick={() => setModalOpen(true)}
                style={{
                  padding: '14px 28px', borderRadius: '6px',
                  background: C.bronze, color: C.dark,
                  fontWeight: 500, fontSize: '14px', border: 'none', cursor: 'pointer',
                  letterSpacing: '0.04em', transition: 'background 0.2s',
                }}
              >
                Get early access
              </button>
              <a href="#itinerary" style={{
                padding: '14px 20px',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '6px',
                color: C.dark,
                fontSize: '14px',
                textDecoration: 'none',
                letterSpacing: '0.03em',
                background: 'rgba(243,237,227,0.7)',
              }}>
                View itinerary
              </a>
            </div>

            <p style={{ fontSize: '12px', color: 'rgba(154,123,79,0.6)', marginTop: '20px', letterSpacing: '0.05em' }}>
              Early bird opens March 22
            </p>
          </div>
        </section>

        {/* ── INFO SESSION BANNER ──────────────────────────────── */}
        <section style={{
          background: C.bronze,
          padding: 'clamp(20px, 3vw, 28px) clamp(24px, 6vw, 80px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
        }}>
          <div>
            <p style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(16px, 2.5vw, 20px)', color: C.dark }}>
              Info session opens March 22 · 3 PM
            </p>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            style={{
              padding: '11px 24px', borderRadius: '6px',
              background: C.dark, color: C.white,
              fontWeight: 500, fontSize: '13px', border: 'none', cursor: 'pointer',
              letterSpacing: '0.04em', whiteSpace: 'nowrap',
            }}
          >
            Sign up now
          </button>
        </section>

        {/* ── ITINERARY ────────────────────────────────────────── */}
        <section id="itinerary" style={{ padding: 'clamp(64px, 10vw, 120px) clamp(24px, 6vw, 80px)' }}>
          <Fade>
            <p style={{ fontSize: '11px', letterSpacing: '0.2em', color: C.bronze, marginBottom: '12px' }}>THE TRIP</p>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 400, marginBottom: '4px', lineHeight: 1.1 }}>
              Nine days.
            </h2>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 400, color: C.muted, marginBottom: '64px', lineHeight: 1.1 }}>
              Each one counts.
            </h2>
          </Fade>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {days.map((d, i) => (
              <Fade key={d.day} delay={i * 40}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'clamp(40px, 6vw, 72px) 1fr clamp(100px, 18vw, 220px)',
                  gap: '0 clamp(16px, 3vw, 40px)',
                  padding: 'clamp(20px, 3vw, 32px) 0',
                  borderBottom: `1px solid ${C.border}`,
                  alignItems: 'center',
                }}>
                  <div>
                    <div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(11px, 1.5vw, 13px)', color: C.bronze, letterSpacing: '0.06em' }}>
                      {String(d.day).padStart(2, '0')}
                    </div>
                    <div style={{ fontSize: '11px', color: C.faint, marginTop: '2px' }}>{d.date}</div>
                  </div>
                  <div>
                    <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(17px, 2.5vw, 24px)', fontWeight: 400, color: C.text, marginBottom: '6px' }}>
                      {d.theme}
                    </h3>
                    <p style={{ fontSize: 'clamp(12px, 1.3vw, 14px)', color: C.muted, lineHeight: 1.6 }}>
                      {d.sub}
                    </p>
                  </div>
                  <div style={{ aspectRatio: '3/2', borderRadius: '8px', overflow: 'hidden', background: C.surface }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={d.img} alt={d.theme} className="vsco-img"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} loading="lazy" />
                  </div>
                </div>
              </Fade>
            ))}
          </div>
        </section>

        {/* ── ADD-ON ACTIVITIES ────────────────────────────────── */}
        <section style={{ padding: 'clamp(64px, 10vw, 120px) clamp(24px, 6vw, 80px)', background: C.surface }}>
          <Fade>
            <p style={{ fontSize: '11px', letterSpacing: '0.2em', color: C.bronze, marginBottom: '12px' }}>OPTIONAL</p>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 400, marginBottom: '48px', lineHeight: 1.1 }}>
              Add-on activities
            </h2>
          </Fade>
          <Fade delay={100}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1px', background: C.border }}>
              {['ATV jungle ride', 'Spa and wellness experiences', 'Private surf coaching', 'Additional beach club access', 'Cultural workshops', 'Private excursions'].map((item, i) => (
                <div key={i} style={{ background: C.bg, padding: '28px 24px' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: C.bronze, marginBottom: '16px' }} />
                  <p style={{ fontSize: '15px', color: C.text, fontWeight: 400, lineHeight: 1.5 }}>{item}</p>
                </div>
              ))}
            </div>
          </Fade>
        </section>

        {/* ── WHAT'S INCLUDED / NOT INCLUDED ───────────────────── */}
        <section style={{ background: C.dark, padding: 'clamp(64px, 10vw, 120px) clamp(24px, 6vw, 80px)' }}>
          <Fade>
            <h2 style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(28px, 4vw, 48px)',
              color: C.white,
              fontWeight: 400,
              marginBottom: '10px',
              lineHeight: 1.15,
            }}>
              What&apos;s included
            </h2>
            <p style={{ fontSize: '13px', color: 'rgba(243,237,227,0.35)', marginBottom: '56px', letterSpacing: '0.02em' }}>
              Clear, upfront, no surprises.
            </p>
          </Fade>

          <Fade delay={100}>
            <div className="included-grid" style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1px 1fr',
              gap: '0 clamp(32px, 5vw, 64px)',
            }}>
              {/* Left — included */}
              <div>
                <p style={{ fontSize: '10px', letterSpacing: '0.2em', color: C.bronze, marginBottom: '24px', fontWeight: 500 }}>INCLUDED</p>
                {included.map((item, i) => (
                  <div key={i} style={{
                    padding: '14px 0',
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                    fontSize: '14px',
                    color: 'rgba(243,237,227,0.65)',
                    lineHeight: 1.5,
                  }}>
                    {item}
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="included-divider" style={{ background: 'rgba(255,255,255,0.07)', alignSelf: 'stretch' }} />

              {/* Right — not included */}
              <div>
                <p style={{ fontSize: '10px', letterSpacing: '0.2em', color: 'rgba(243,237,227,0.25)', marginBottom: '24px', fontWeight: 500 }}>NOT INCLUDED</p>
                {notIncluded.map((item, i) => (
                  <div key={i} style={{
                    padding: '14px 0',
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                    fontSize: '14px',
                    color: 'rgba(243,237,227,0.35)',
                    lineHeight: 1.5,
                  }}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </Fade>
        </section>

        {/* ── IMPACT LINE ──────────────────────────────────────── */}
        <section style={{ padding: 'clamp(80px, 12vw, 140px) clamp(24px, 6vw, 80px)', background: C.bg }}>
          <Fade>
            <p style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(22px, 3.5vw, 40px)',
              color: C.text,
              maxWidth: '22ch',
              fontWeight: 400,
              lineHeight: 1.45,
            }}>
              Every trip is curated to bring you closer to the place, the people, and the experience.
            </p>
            <div style={{ width: '40px', height: '1px', background: C.bronze, marginTop: '32px' }} />
          </Fade>
        </section>

        {/* ── PHOTO GALLERY ────────────────────────────────────── */}
        <section style={{ padding: 'clamp(64px, 10vw, 120px) clamp(24px, 6vw, 80px) 0', background: C.bg }}>
          <Fade>
            <p style={{ fontSize: '11px', letterSpacing: '0.2em', color: C.bronze, marginBottom: '12px' }}>THE EXPERIENCE</p>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 400, marginBottom: 'clamp(40px, 6vw, 72px)', lineHeight: 1.1 }}>
              A glimpse of the experience
            </h2>
          </Fade>
          <Fade delay={100}>
            <div style={{
              columns: '3 220px',
              gap: '8px',
              paddingBottom: 'clamp(64px, 10vw, 120px)',
            }}>
              {[
                { src: '/manta.jpeg', alt: 'Manta ray snorkeling' },
                { src: '/finns2.jpeg', alt: 'Finns Beach Club' },
                { src: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&q=75', alt: 'Tirta Empul temple' },
                { src: '/riceterraces.jpeg', alt: 'Bali rice terraces' },
                { src: '/atv.jpeg', alt: 'ATV jungle ride' },
                { src: 'https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=800&q=75', alt: 'Balinese food' },
                { src: '/sendoff.jpeg', alt: 'Savaya beach club' },
                { src: '/waterfall.jpeg', alt: 'Bali nature' },
                { src: '/nusapenida.jpeg', alt: 'Nusa Penida cliffs' },
                { src: '/finns.jpeg', alt: 'Beach club' },
                { src: 'https://images.unsplash.com/photo-1566041510639-8d95a2490bfb?w=800&q=75', alt: 'Bali villa' },
                { src: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800&q=75', alt: 'Surf scene' },
              ].map((img, i) => (
                <div key={i} style={{ breakInside: 'avoid', marginBottom: '8px', borderRadius: '6px', overflow: 'hidden' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.src} alt={img.alt} loading="lazy"
                    style={{ width: '100%', display: 'block', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          </Fade>
        </section>

        {/* ── BOTTOM CTA ───────────────────────────────────────── */}
        <section className="bottom-cta" style={{
          background: C.dark,
          padding: 'clamp(64px, 12vw, 140px) clamp(24px, 6vw, 80px)',
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: 'clamp(32px, 6vw, 80px)',
          alignItems: 'end',
        }}>
          <Fade>
            <p style={{ fontSize: '11px', letterSpacing: '0.2em', color: C.bronze, marginBottom: '16px' }}>BALI · MAY 2026</p>
            <h2 style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(36px, 6vw, 72px)',
              color: C.white,
              fontWeight: 400,
              lineHeight: 1.05,
              marginBottom: '16px',
            }}>
              Bali.<br />May 2026.
            </h2>
            <p style={{ fontSize: '14px', color: 'rgba(243,237,227,0.4)', letterSpacing: '0.06em' }}>
              May 2026 · Indonesia
            </p>
          </Fade>

          <Fade delay={150} style={{ minWidth: '280px', maxWidth: '380px' }}>
            <SignupForm dark />
          </Fade>
        </section>

        {/* ── FOOTER ───────────────────────────────────────────── */}
        <footer style={{
          background: C.dark,
          borderTop: '1px solid rgba(255,255,255,0.06)',
          padding: '28px clamp(24px, 6vw, 80px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}>
          <a href="#" aria-label="Instagram" style={{ color: 'rgba(255,255,255,0.2)', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.2)')}
          >
            <Instagram size={16} />
          </a>
        </footer>
      </main>

      <style>{`
        * { box-sizing: border-box; }
        body { overflow-x: hidden; }

        @media (max-width: 640px) {
          /* Itinerary — hide image column */
          section[id="itinerary"] > div:last-child > div > div {
            grid-template-columns: clamp(36px, 8vw, 48px) 1fr !important;
          }
          section[id="itinerary"] > div:last-child > div > div > div:last-child {
            display: none !important;
          }

          /* Bottom CTA — stack vertically */
          .bottom-cta {
            grid-template-columns: 1fr !important;
            align-items: start !important;
          }
          .bottom-cta > * {
            min-width: 0 !important;
            max-width: 100% !important;
            width: 100% !important;
          }

          /* Batch radio buttons — stack vertically */
          .batch-radios {
            flex-direction: column !important;
          }

          footer {
            justify-content: center !important;
          }
        }

        @media (max-width: 768px) {
          /* Included/not-included — stack vertically */
          .included-grid {
            grid-template-columns: 1fr !important;
            gap: 40px 0 !important;
          }
          .included-divider {
            display: none !important;
          }
        }
      `}</style>
    </>
  )
}

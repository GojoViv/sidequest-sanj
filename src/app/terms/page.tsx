import Link from 'next/link'
import { Instagram } from 'lucide-react'

const C = {
  bg:      '#F3EDE3',
  surface: '#EDE6D8',
  border:  '#D4C8B4',
  text:    '#1A1814',
  muted:   '#8A7A68',
  faint:   '#B0A090',
  bronze:  '#9A7B4F',
  dark:    '#1C1710',
  white:   '#FAF7F2',
}

const sections = [
  {
    title: '1. ACCEPTANCE OF TERMS',
    body: 'By registering for any trip organised by The Side Quest ("TSQ", "we", "us"), you ("Participant") agree to be bound by these Terms & Conditions in full. If you do not agree, do not register.',
  },
  {
    title: '2. BOOKINGS & PAYMENT',
    items: [
      '2.1 A registration form submission constitutes an expression of interest, not a confirmed booking.',
      '2.2 A booking is only confirmed upon receipt of a non-refundable deposit (amount communicated at time of payment link issuance).',
      '2.3 Full payment is due no later than 30 days prior to the trip departure date. Failure to pay in full by this date may result in cancellation of your booking without refund of any amounts paid.',
      '2.4 All prices are quoted in USD unless otherwise stated. TSQ is not responsible for currency fluctuation losses.',
    ],
  },
  {
    title: '3. CANCELLATION BY PARTICIPANT — NO REFUND POLICY',
    items: [
      '3.1 All payments made to The Side Quest are strictly non-refundable.',
      '3.2 Cancellations made for any reason — including medical emergencies, personal circumstances, visa refusal, or change of plans — will not be eligible for a refund.',
      '3.3 Participants may transfer their spot to another eligible individual subject to TSQ\'s prior written approval and a transfer fee. The transfer must be requested no later than 21 days before departure.',
      '3.4 TSQ strongly recommends all Participants purchase comprehensive travel insurance including cancellation cover prior to making any payment.',
    ],
  },
  {
    title: '4. CANCELLATION OR MODIFICATION BY TSQ',
    items: [
      '4.1 TSQ reserves the right to cancel any trip due to insufficient registrations, force majeure, safety concerns, or circumstances beyond our control.',
      '4.2 In the event of a TSQ-initiated cancellation, Participants will receive a full refund of amounts paid or the option to transfer to a future trip.',
      '4.3 TSQ reserves the right to alter itineraries, accommodations, or activities at any time without notice where circumstances require. No compensation will be offered for minor amendments.',
      '4.4 Force majeure events include but are not limited to: acts of God, pandemics, natural disasters, government travel restrictions, war, civil unrest, or airline/transport failures.',
    ],
  },
  {
    title: '5. TRAVEL DOCUMENTS & VISAS',
    items: [
      '5.1 Participants are solely responsible for obtaining valid passports, visas, and any required travel documentation.',
      '5.2 TSQ accepts no liability for any Participant denied entry to any destination as a result of invalid or insufficient documentation.',
      '5.3 Passports must be valid for at least 6 months beyond the return date of the trip.',
    ],
  },
  {
    title: '6. HEALTH, FITNESS & MEDICAL',
    items: [
      '6.1 By registering, you confirm you are in good physical and mental health and capable of participating in all planned activities.',
      '6.2 You must disclose any medical conditions, allergies, or dietary requirements to TSQ in writing prior to departure. TSQ accepts no liability for undisclosed conditions.',
      '6.3 TSQ is not a medical provider and accepts no responsibility for any illness, injury, or medical costs incurred during the trip.',
      '6.4 Participants are responsible for carrying any required medications and personal medical supplies.',
    ],
  },
  {
    title: '7. TRAVEL INSURANCE',
    items: [
      '7.1 Comprehensive travel insurance is mandatory for all Participants. Coverage must include: medical emergencies and evacuation, trip cancellation and interruption, personal liability, and loss of baggage.',
      '7.2 Proof of insurance may be requested by TSQ prior to departure. Failure to provide proof may result in exclusion from the trip without refund.',
    ],
  },
  {
    title: '8. LIABILITY WAIVER',
    items: [
      '8.1 To the fullest extent permitted by applicable law, TSQ, its founders, employees, contractors, and partners shall not be liable for any loss, injury, damage, cost, or expense suffered by a Participant arising from participation in any TSQ trip.',
      '8.2 Participants engage in all activities — including but not limited to surfing, ATV riding, trekking, snorkelling, and water sports — entirely at their own risk.',
      '8.3 TSQ acts as an organiser only and is not liable for the acts or omissions of third-party service providers including airlines, hotels, transport operators, or activity vendors.',
    ],
  },
  {
    title: '9. CODE OF CONDUCT',
    items: [
      '9.1 Participants are expected to behave respectfully toward fellow Participants, TSQ staff, local communities, and cultural sites at all times.',
      '9.2 TSQ reserves the right to remove any Participant from a trip at any time for behaviour deemed disruptive, dangerous, discriminatory, or contrary to the spirit of the group. No refund will be issued in such cases.',
      '9.3 Participants must comply with all local laws and customs of the destination country. TSQ accepts no liability for any legal consequences arising from a Participant\'s conduct.',
    ],
  },
  {
    title: '10. PHOTOGRAPHY & MEDIA',
    items: [
      '10.1 TSQ may photograph or film activities during the trip for marketing and promotional purposes.',
      '10.2 By participating, you grant TSQ a royalty-free, perpetual licence to use any images or footage in which you appear, unless you notify us in writing prior to departure.',
    ],
  },
  {
    title: '11. PRIVACY',
    body: '11.1 Personal information collected at registration is used solely to administer your booking and communicate trip details. We do not sell or share your data with third parties outside of our operational partners.',
  },
  {
    title: '12. GOVERNING LAW & DISPUTES',
    items: [
      '12.1 These Terms are governed by the laws of India.',
      '12.2 Any disputes shall first be attempted to be resolved through good-faith negotiation. If unresolved within 30 days, disputes shall be referred to binding arbitration in Mumbai, India.',
    ],
  },
  {
    title: '13. AMENDMENTS',
    body: 'TSQ reserves the right to update these Terms at any time. The version in effect at the time of your booking confirmation shall apply to your trip.',
  },
]

export default function TermsPage() {
  return (
    <main style={{ background: C.bg, minHeight: '100vh', color: C.text }}>

      {/* ── NAV ─────────────────────────────────────────────── */}
      <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: C.bg,
        borderBottom: `1px solid ${C.border}`,
        padding: '0 clamp(24px, 6vw, 80px)',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Link
          href="/"
          style={{
            fontSize: '13px',
            color: C.muted,
            textDecoration: 'none',
            letterSpacing: '0.04em',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'color 0.2s',
          }}
        >
          ← Back
        </Link>

        <span style={{
          fontFamily: 'Georgia, serif',
          fontSize: '13px',
          letterSpacing: '0.18em',
          color: C.bronze,
          fontWeight: 400,
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
        }}>
          THE SIDE QUEST
        </span>

        <span style={{ width: '40px' }} />
      </nav>

      {/* ── CONTENT ─────────────────────────────────────────── */}
      <div style={{
        maxWidth: '720px',
        margin: '0 auto',
        padding: 'clamp(64px, 10vw, 120px) clamp(24px, 6vw, 48px)',
      }}>

        {/* Header */}
        <p style={{
          fontSize: '11px',
          letterSpacing: '0.2em',
          color: C.bronze,
          marginBottom: '16px',
          fontWeight: 500,
        }}>
          LEGAL
        </p>
        <h1 style={{
          fontFamily: 'Georgia, serif',
          fontSize: 'clamp(28px, 5vw, 48px)',
          fontWeight: 400,
          color: C.text,
          lineHeight: 1.1,
          marginBottom: '12px',
        }}>
          Terms &amp; Conditions
        </h1>
        <p style={{ fontSize: '13px', color: C.faint, marginBottom: 'clamp(48px, 8vw, 80px)', letterSpacing: '0.02em' }}>
          Last updated: March 2026
        </p>

        <div style={{ width: '40px', height: '1px', background: C.bronze, marginBottom: 'clamp(48px, 8vw, 80px)' }} />

        {/* Sections */}
        {sections.map((s, i) => (
          <section key={i} style={{ marginBottom: 'clamp(36px, 6vw, 56px)' }}>
            <h2 style={{
              fontFamily: 'Georgia, serif',
              fontSize: '16px',
              fontWeight: 400,
              color: C.text,
              marginBottom: '14px',
              letterSpacing: '0.01em',
            }}>
              {s.title}
            </h2>

            {s.body && (
              <p style={{ fontSize: '15px', color: C.muted, lineHeight: 1.75, margin: 0 }}>
                {s.body}
              </p>
            )}

            {s.items && (
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {s.items.map((item, j) => (
                  <li key={j} style={{
                    fontSize: '15px',
                    color: C.muted,
                    lineHeight: 1.75,
                    paddingBottom: '10px',
                    borderBottom: j < s.items!.length - 1 ? `1px solid ${C.border}` : 'none',
                    marginBottom: j < s.items!.length - 1 ? '10px' : 0,
                  }}>
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}

        {/* Closing statement */}
        <div style={{
          marginTop: 'clamp(48px, 8vw, 80px)',
          padding: '28px 32px',
          background: C.surface,
          border: `1px solid ${C.border}`,
          borderRadius: '8px',
        }}>
          <p style={{ fontSize: '14px', color: C.muted, lineHeight: 1.75, margin: 0, fontStyle: 'italic' }}>
            By submitting the registration form, you confirm you have read, understood, and agree to these Terms &amp; Conditions.
          </p>
        </div>

      </div>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <footer style={{
        background: C.dark,
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '28px clamp(24px, 6vw, 80px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: '24px',
      }}>
        <Link
          href="/terms"
          style={{
            fontSize: '11px',
            letterSpacing: '0.12em',
            color: 'rgba(255,255,255,0.2)',
            textDecoration: 'none',
            transition: 'color 0.2s',
          }}
        >
          TERMS &amp; CONDITIONS
        </Link>
        <a
          href="#"
          aria-label="Instagram"
          style={{ color: 'rgba(255,255,255,0.2)', transition: 'color 0.2s' }}
        >
          <Instagram size={16} />
        </a>
      </footer>

    </main>
  )
}

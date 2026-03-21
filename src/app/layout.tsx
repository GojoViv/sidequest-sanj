import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
  title: 'SideQuest — Bali · May 2026',
  description: 'An immersion travel company organizing curated trips to emerging markets. First stop: Bali, May 2026.',
  openGraph: {
    title: 'SideQuest — Bali · May 2026',
    description: 'Adventure, cultural exploration, and real-world learning. Early bird opens March 22.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="grain">{children}</body>
    </html>
  )
}

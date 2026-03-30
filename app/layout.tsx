import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AGNI Motors — Axial Flux Brushed and Brushless Motors',
  description: 'Shaping the Future of Electric Powertrains. World record-holding axial flux motor technology.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

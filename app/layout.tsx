import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AGNI Motors — Axial Flux Brushed and Brushless Motors',
  description: 'AGNI Motors website',
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

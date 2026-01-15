import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'TRUVESTA — Authority Layer for Dealing Desks',
  description: 'Govern • Route Intent • Prove • Measure • Explain',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}

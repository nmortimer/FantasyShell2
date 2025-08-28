import './globals.css'
import Link from 'next/link'
import type { ReactNode } from 'react'

export const metadata = {
  title: 'Fantasy League Studio',
  description: 'Logos + weekly content for your league',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-base text-text">
        <header className="border-b border-neutral-800 sticky top-0 z-20 bg-base/90 backdrop-blur">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-6">
            <Link href="/" className="text-xl font-bold tracking-wide">🏈 League Studio</Link>
            <nav className="text-sm flex gap-4">
              <Link href="/dashboard">Dashboard</Link>
              <Link href="/content">Content</Link>
            </nav>
            <div className="ml-auto text-xs opacity-70">Retro Trading Card • v0.1</div>
          </div>
        </header>
        <main className="max-w-6xl mx-auto px-4 py-6">{children}</main>
      </body>
    </html>
  )
}

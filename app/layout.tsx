import type { Metadata } from 'next'

import { fonts } from '@/styles/fonts'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: {
    template: '%s | Devlinks',
    default: 'Devlinks',
  },
  description: 'A link sharing app for HNG11 Stage 5a task',
  keywords: ['link sharing', 'linktree', 'social links'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${fonts} flex flex-col font-sans`}>{children}</body>
    </html>
  )
}

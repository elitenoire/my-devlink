import type { Metadata } from 'next'
import { Toaster } from '@/components/ui/sonner'

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
      <body className={`${fonts} flex flex-col font-sans`}>
        {children}
        <Toaster
          position="bottom-center"
          toastOptions={{
            classNames: {
              toast:
                'rounded-xl bg-foreground-dark gap-2 text-base text-background font-semibold py-4 px-6',
              title: 'font-semibold',
            },
          }}
        />
      </body>
    </html>
  )
}

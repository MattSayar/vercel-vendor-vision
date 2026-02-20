import type { Metadata, Viewport } from 'next'
import { DM_Sans, IBM_Plex_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const _ibmPlexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-ibm-mono" });

export const viewport: Viewport = {
  themeColor: '#6366F1',
  userScalable: false,
}

export const metadata: Metadata = {
  title: 'VendorVision — Supply Chain Risk Intelligence',
  description: 'AI-powered vendor risk management and supply chain threat intelligence platform by Abnormal Security',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${_ibmPlexMono.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}

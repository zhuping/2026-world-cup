import React from 'react'
import '../styles/index.css'
import Providers from './providers'

export const metadata = {
  title: '世界杯官网网页UI设计',
}

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

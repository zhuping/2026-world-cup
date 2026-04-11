import React from 'react'
import '../styles/index.css'
import Providers from './providers'
import Script from 'next/script'
import Analytics from './Analytics'

export const metadata = {
  title: '世界杯官网网页UI设计',
}

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <body>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-H0MFTF8LDE" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-H0MFTF8LDE', {
              page_path: window.location.pathname
            });
          `}
        </Script>
        <React.Suspense>
          <Analytics />
        </React.Suspense>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

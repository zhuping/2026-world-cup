'use client'
import { HelmetProvider } from 'react-helmet-async'
import { LanguageProvider } from './contexts/LanguageContext'

export default function Providers({ children }: { children: any }) {
  return (
    <HelmetProvider>
      <LanguageProvider>{children}</LanguageProvider>
    </HelmetProvider>
  )
}

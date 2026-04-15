'use client'
import { HelmetProvider } from 'react-helmet-async'
import { LanguageProvider } from './contexts/LanguageContext'

export default function Providers({ children, initialLang }: { children: any, initialLang?: string }) {
  return (
    <HelmetProvider>
      <LanguageProvider initialLang={initialLang}>{children}</LanguageProvider>
    </HelmetProvider>
  )
}

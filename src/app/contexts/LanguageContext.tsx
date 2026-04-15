import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { LangCode, Translation, TRANSLATIONS, SUPPORTED_LANGS, detectLanguage } from '../i18n/translations';

interface LanguageContextValue {
  lang: LangCode;
  t: Translation;
  setLang: (lang: LangCode) => void;
  supportedLangs: LangCode[];
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children, initialLang }: { children: ReactNode, initialLang?: string }) {
  const defaultLang = initialLang && SUPPORTED_LANGS.includes(initialLang as LangCode) 
    ? (initialLang as LangCode) 
    : detectLanguage();
  
  const [lang, setLangState] = useState<LangCode>(defaultLang);

  // Update lang if initialLang changes (e.g. route navigation)
  useEffect(() => {
    if (initialLang && SUPPORTED_LANGS.includes(initialLang as LangCode)) {
      setLangState(initialLang as LangCode);
    }
  }, [initialLang]);

  const setLang = useCallback((code: LangCode) => {
    setLangState(code);
    try { localStorage.setItem('wc2026-lang', code); } catch {}
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, t: TRANSLATIONS[lang], setLang, supportedLangs: SUPPORTED_LANGS }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider');
  return ctx;
}

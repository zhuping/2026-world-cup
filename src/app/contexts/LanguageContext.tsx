import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { LangCode, Translation, TRANSLATIONS, SUPPORTED_LANGS, detectLanguage } from '../i18n/translations';

interface LanguageContextValue {
  lang: LangCode;
  t: Translation;
  setLang: (lang: LangCode) => void;
  supportedLangs: LangCode[];
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LangCode>(detectLanguage);

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

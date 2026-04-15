import type { LangCode } from './translations';
import en from './dictionaries/en.json';
import zh from './dictionaries/zh.json';
import es from './dictionaries/es.json';
import pt from './dictionaries/pt.json';
import ja from './dictionaries/ja.json';
import ko from './dictionaries/ko.json';

export type Dictionary = typeof en;

export function toLangCode(lang: string): LangCode {
  const v = (lang || 'en').toLowerCase() as LangCode;
  if (v === 'zh' || v === 'en' || v === 'ja' || v === 'ko' || v === 'pt' || v === 'es') return v;
  return 'en';
}

const DICTS: Record<LangCode, Dictionary> = { en, zh, es, pt, ja, ko };

export function getDictionary(lang: string): Dictionary {
  const code = toLangCode(lang);
  return DICTS[code] || DICTS.en;
}

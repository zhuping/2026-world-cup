import React from 'react';
import Link from 'next/link';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../contexts/LanguageContext';
import { getDictionary } from '../i18n/dictionary';

export function HomeContent() {
  const { lang } = useLanguage();
  const dict = getDictionary(lang);
  const copy = dict.home;
  const base = `/${lang}`;
  const withLang = (path: string) => `${base}${path === '/' ? '' : path}`;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: copy.faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 24px', color: '#FFF', fontFamily: "'Inter', sans-serif" }}>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>
      
      {/* 1. Intro summary */}
      <section style={{ marginBottom: '60px' }}>
        <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '48px', color: '#D72828', marginBottom: '24px' }}>
          {copy.h1}
        </h1>
        <p style={{ fontSize: '18px', lineHeight: 1.6, color: 'rgba(255,255,255,0.8)' }}>
          {copy.intro}
        </p>
      </section>

      {/* 2. What we know (Official facts) */}
      <section style={{ marginBottom: '60px' }}>
        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '36px', marginBottom: '24px', borderBottom: '2px solid #0033A0', paddingBottom: '10px' }}>
          {copy.factsTitle}
        </h2>
        <ul style={{ fontSize: '16px', lineHeight: 1.8, color: 'rgba(255,255,255,0.8)', listStyleType: 'disc', paddingLeft: '20px' }}>
          {copy.facts.map((f) => (
            <li key={f.label}><strong>{f.label}:</strong> {f.value}</li>
          ))}
        </ul>
      </section>

      {/* 3. Deep Dives / Topic Hubs */}
      <section style={{ marginBottom: '60px' }}>
        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '36px', marginBottom: '24px', borderBottom: '2px solid #009A44', paddingBottom: '10px' }}>
          {copy.hubsTitle}
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          
          {copy.hubs.map((h) => (
            <Link key={h.href} href={withLang(h.href)} style={{ textDecoration: 'none' }}>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '24px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', height: '100%', transition: 'transform 0.2s', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                <h3 style={{ fontSize: '24px', color: h.color, marginBottom: '12px' }}>{h.title}</h3>
                <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>{h.desc}</p>
                <div style={{ marginTop: '16px', color: h.color, fontWeight: 600 }}>{h.cta}</div>
              </div>
            </Link>
          ))}

        </div>
      </section>

      {/* 4. Interactive map + how to use it */}
      <section style={{ marginBottom: '60px' }}>
        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '36px', marginBottom: '24px', borderBottom: '2px solid #0033A0', paddingBottom: '10px' }}>
          {copy.mapTitle}
        </h2>
        <p style={{ fontSize: '16px', lineHeight: 1.6, color: 'rgba(255,255,255,0.8)' }}>
          {copy.mapBody}
        </p>
      </section>

      {/* 5. General FAQ */}
      <section style={{ marginBottom: '60px' }}>
        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '36px', marginBottom: '24px', borderBottom: '2px solid #D72828', paddingBottom: '10px' }}>
          {copy.faqTitle}
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {copy.faq.map((faq) => (
            <div key={faq.q} style={{ background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '8px' }}>
              <h4 style={{ fontSize: '18px', fontWeight: 600, color: '#FFF', marginBottom: '8px' }}>{faq.q}</h4>
              <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.7)' }}>{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Sources + Last updated */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '24px' }}>
        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)' }}>
          <strong>{copy.sourcesLabel}:</strong> {copy.sourcesValue}<br/>
          <strong>{copy.lastUpdatedLabel}:</strong> {copy.lastUpdatedValue}
        </p>
      </section>
      
    </div>
  );
}

import React from 'react';
import { ClientLayout } from '@/app/components/ClientLayout';
import type { Metadata } from 'next';
import { getDictionary } from '@/app/i18n/dictionary';

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const dict = getDictionary(params.lang);
  return { title: dict.travelGuide.metaTitle };
}

export default function TravelGuidePage({ params }: { params: { lang: string } }) {
  const dict = getDictionary(params.lang);
  const copy = dict.travelGuide;
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
    <ClientLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '100px 24px 60px', color: '#FFF', fontFamily: "'Inter', sans-serif", minHeight: '100vh' }}>
        <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '56px', color: '#D72828', marginBottom: '24px' }}>
          {copy.h1}
        </h1>
        <p style={{ fontSize: '18px', lineHeight: 1.6, color: 'rgba(255,255,255,0.8)', marginBottom: '40px' }}>
          {copy.intro}
        </p>

        <section style={{ marginBottom: '60px' }}>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '36px', marginBottom: '24px', borderBottom: '2px solid #009A44', paddingBottom: '10px' }}>
            {copy.tipsTitle}
          </h2>
          <ul style={{ fontSize: '16px', lineHeight: 1.8, color: 'rgba(255,255,255,0.8)', listStyleType: 'disc', paddingLeft: '20px' }}>
            {copy.tips.map((t) => (
              <li key={t.label}><strong>{t.label}:</strong> {t.body}</li>
            ))}
          </ul>
        </section>

        <section style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '24px' }}>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)' }}>
            <strong>{copy.lastUpdatedLabel}:</strong> {copy.lastUpdatedValue}
          </p>
        </section>
      </div>
    </ClientLayout>
  );
}

'use client';
import React from 'react';
import '@/styles/fonts.css';
import { SEOHead } from './SEOHead';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SEOHead />
      <div style={{
        minHeight: '100vh',
        background: '#020A1B',
        fontFamily: "'Inter', sans-serif",
        overflowX: 'hidden',
      }}>
        <Navbar />
        <main id="main-content" role="main">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}

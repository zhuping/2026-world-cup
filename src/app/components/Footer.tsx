import { useLanguage } from '../contexts/LanguageContext';
import { useIsMobile } from '../hooks/useIsMobile';

export function Footer() {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const copyrightText = t.footer.disclaimer
    ? `© 2026 FIFA World Cup · ${t.footer.disclaimer}`
    : '© 2026 FIFA World Cup';

  return (
    <footer style={{
      background: '#010814',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      padding: isMobile ? '24px 16px' : '32px 24px',
      textAlign: 'center',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '14px' }}>
        <div style={{
          width: isMobile ? '32px' : '36px', height: isMobile ? '32px' : '36px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #D72828 0%, #0033A0 50%, #009A44 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <span style={{ fontSize: isMobile ? '16px' : '18px' }}>⚽</span>
        </div>
        <div>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: isMobile ? '16px' : '18px', letterSpacing: '2px', color: '#FFFFFF' }}>FIFA WORLD CUP 2026</div>
          <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: isMobile ? '9px' : '11px', letterSpacing: '3px', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>USA · CANADA · MEXICO</div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: isMobile ? '16px' : '28px', flexWrap: 'wrap', marginBottom: '14px' }}>
        {[
          { flag: '🇺🇸', label: t.footer.venuesUSA },
          { flag: '🇨🇦', label: t.footer.venuesCanada },
          { flag: '🇲🇽', label: t.footer.venuesMexico },
        ].map(item => (
          <div key={item.flag} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ fontSize: isMobile ? '14px' : '16px' }}>{item.flag}</span>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: isMobile ? '11px' : '12px', color: 'rgba(255,255,255,0.28)' }}>{item.label}</span>
          </div>
        ))}
      </div>

      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: isMobile ? '10px' : '11px', color: 'rgba(255,255,255,0.18)', letterSpacing: '0.5px' }}>
        {copyrightText}
      </div>
    </footer>
  );
}

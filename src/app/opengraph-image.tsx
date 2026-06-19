import { ImageResponse } from 'next/og';

export const alt = 'Citron — The Business Operating System';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background:
            'radial-gradient(120% 120% at 75% 10%, #1d1c18 0%, #12110e 55%, #0c0b09 100%)',
          padding: '80px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <svg width="56" height="56" viewBox="0 0 100 100">
            <rect x="31" y="17" width="13" height="34" rx="2" fill="#d9bc58" />
            <rect x="56" y="17" width="13" height="34" rx="2" fill="#d9bc58" />
            <path d="M 12 40 A 38 38 0 0 0 88 40" fill="none" stroke="#d9bc58" strokeWidth="10" />
          </svg>
          <span style={{ color: '#f5f4f0', fontSize: 34, fontWeight: 600, letterSpacing: -1 }}>
            Citron
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span
            style={{
              color: '#f5f4f0',
              fontSize: 76,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -3,
              maxWidth: 900,
            }}
          >
            Your Company. One Intelligence.
          </span>
          <span style={{ color: '#93928a', fontSize: 30, marginTop: 28, maxWidth: 820, lineHeight: 1.4 }}>
            The AI-powered operating system for modern business.
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ color: '#6b6a63', fontSize: 24 }}>citron.inkblotstudio.eu</span>
          <span style={{ color: '#c4a030', fontSize: 24, fontWeight: 500 }}>
            by Inkblot Studio
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}

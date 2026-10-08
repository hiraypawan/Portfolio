import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Pawan Hiray — AI Product Developer (Next.js + AI) | PawanOS';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 80,
          background: '#0b0b12',
          color: '#fff',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: 24,
              background: 'linear-gradient(135deg, #8b5cf6, #22d3ee)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 56,
              fontWeight: 900,
            }}
          >
            P
          </div>
          <div style={{ fontSize: 40, fontWeight: 800 }}>PawanOS</div>
        </div>
        <div style={{ marginTop: 32, fontSize: 64, fontWeight: 900, lineHeight: 1.05 }}>
          Pawan Hiray
        </div>
        <div style={{ marginTop: 12, fontSize: 34, color: '#a5b4fc' }}>
          AI Product Developer (Next.js + AI)
        </div>
        <div style={{ marginTop: 16, fontSize: 26, color: 'rgba(255,255,255,0.65)' }}>
          Ex-President, 10K+ MUStudentsUnited community · Open to Mumbai / Pune / Remote
        </div>
      </div>
    ),
    { ...size },
  );
}

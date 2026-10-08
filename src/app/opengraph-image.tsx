import { ImageResponse } from 'next/og';
import { ownerProfile } from '@/data/ownerProfile';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt =
  'Pawan Hiray — AI Product Developer. Next.js, TypeScript, AI integrations. Work, About, Resume, Contact.';

export default function OGImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: 72,
        background: '#0b0c12',
        color: '#f5f5fa',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 54,
            height: 54,
            borderRadius: 14,
            color: '#171122',
            background: '#b5a0ff',
            fontSize: 32,
            fontWeight: 800,
          }}
        >
          P
        </div>
        <span style={{ fontSize: 27, fontWeight: 700 }}>PawanOS.</span>
        <span style={{ marginLeft: 'auto', fontSize: 20, color: '#abb0c2' }}>
          Work · About · Resume · Contact
        </span>
      </div>
      <div style={{ display: 'flex', marginTop: 56, fontSize: 22, color: '#b5a0ff' }}>
        {ownerProfile.identity.fullName} / Mumbai, India
      </div>
      <div
        style={{ display: 'flex', fontSize: 76, lineHeight: 1.05, fontWeight: 800, marginTop: 14 }}
      >
        AI Product Developer.
      </div>
      <div style={{ display: 'flex', fontSize: 32, color: '#c9cad7', marginTop: 24 }}>
        Next.js · TypeScript · AI integrations
      </div>
      <div style={{ display: 'flex', fontSize: 24, color: '#abb0c2', marginTop: 'auto' }}>
        Inspectable work. Honest outcomes. Open to junior roles & freelance.
      </div>
    </div>,
    size,
  );
}

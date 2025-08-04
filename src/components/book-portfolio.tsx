'use client';

import { useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import CoverPage from './sections/CoverPage';
import IndexPage from './sections/IndexPage';
import StoryPage from './sections/StoryPage';
import ProjectsPage from './sections/ProjectsPage';
import SkillsPage from './sections/SkillsPage';
import ContactPage from './sections/ContactPage';
import AnimatedCursor from './ui/AnimatedCursor';

const pages = [
  { name: 'Cover', component: <CoverPage /> },
  { name: 'Index', component: <IndexPage /> },
  { name: 'My Story', component: <StoryPage /> },
  { name: 'Projects', component: <ProjectsPage /> },
  { name: 'Skills', component: <SkillsPage /> },
  { name: 'Contact', component: <ContactPage /> },
];

const flipBookStyle = {
  width: '100vw',
  height: '100vh',
  position: 'fixed' as const,
  top: 0,
  left: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'linear-gradient(135deg, #1e293b 0%, #6b46c1 50%, #1e293b 100%)',
  overflow: 'hidden'
};

export default function BookPortfolio() {
  const flipBookRef = useRef(null);

  return (
    <div style={flipBookStyle}>
      <AnimatedCursor />
      <HTMLFlipBook
        width={550}
        height={733}
        size="stretch"
        minWidth={315}
        maxWidth={1000}
        minHeight={400}
        maxHeight={1500}
        maxShadowOpacity={0.5}
        showCover={true}
        mobileScrollSupport={true}
        useMouseEvents={true}
        style={{ backgroundColor: 'transparent' }}
        drawShadow={true}
        ref={flipBookRef}
        className=""
        startPage={0}
        flippingTime={1000}
        usePortrait={true}
        startZIndex={0}
        autoSize={true}
        clickEventForward={true}
        swipeDistance={30}
        showPageCorners={true}
        disableFlipByClick={false}
      >
        {pages.map((page, index) => (
          <div key={index} className="page" style={{
            backgroundColor: '#1a1a2e',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '8px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            backdropFilter: 'blur(10px)'
          }}>
            <div className="w-full h-full flex items-center justify-center" style={{
              color: 'white',
              fontSize: '14px',
              lineHeight: '1.6'
            }}>
              {page.component}
            </div>
          </div>
        ))}
      </HTMLFlipBook>
    </div>
  );
}

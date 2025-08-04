'use client';

import { useRef, useState, useEffect } from 'react';
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
  const [dimensions, setDimensions] = useState({ width: 600, height: 800 });

  useEffect(() => {
    const updateDimensions = () => {
      const width = Math.min(window.innerWidth * 0.9, 1000);
      const height = Math.min(window.innerHeight * 0.9, 1200);
      setDimensions({ width, height });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return (
    <div style={flipBookStyle}>
      <AnimatedCursor />
      <HTMLFlipBook
        width={dimensions.width}
        height={dimensions.height}
        size="stretch"
        minWidth={350}
        maxWidth={1200}
        minHeight={500}
        maxHeight={1600}
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
            padding: '50px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            backdropFilter: 'blur(10px)',
            width: '100%',
            height: '100%'
          }}>
            <div className="w-full h-full flex items-center justify-center" style={{
              color: 'white',
              fontSize: '18px',
              lineHeight: '1.6',
              textAlign: 'center'
            }}>
              {page.component}
            </div>
          </div>
        ))}
      </HTMLFlipBook>
      
      {/* Tutorial Directions for Mobile Users */}
      <div className="absolute bottom-12 text-white text-sm text-center bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full">
        <p>ðŸ“± Swipe left or right to turn the page</p>
      </div>
    </div>
  );
}

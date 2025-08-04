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

export default function BookPortfolio() {
  const flipBookRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 350, height: 500 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateDimensions = () => {
      const isMobileDevice = window.innerWidth < 768;
      setIsMobile(isMobileDevice);
      
      if (isMobileDevice) {
        // Mobile dimensions - much larger to show more content
        const width = Math.min(window.innerWidth * 0.95, 450);
        const height = Math.min(window.innerHeight * 0.85, 700);
        setDimensions({ width, height });
      } else {
        // Desktop dimensions - larger
        const width = Math.min(window.innerWidth * 0.7, 900);
        const height = Math.min(window.innerHeight * 0.8, 1000);
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const containerStyle = {
    width: '100vw',
    height: '100vh',
    position: 'fixed' as const,
    top: 0,
    left: 0,
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)',
    overflow: 'hidden',
    padding: isMobile ? '10px' : '20px',
    boxSizing: 'border-box' as const
  };

  const pageStyle = {
    backgroundColor: '#1e1b4b',
    background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.95) 0%, rgba(15, 23, 42, 0.95) 100%)',
    border: '2px solid rgba(99, 102, 241, 0.3)',
    borderRadius: '12px',
    padding: isMobile ? '12px' : '25px',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'flex-start',
    alignItems: 'center',
    overflow: 'hidden', // Changed from auto to hidden to prevent double scrollbars
    boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
    backdropFilter: 'blur(10px)',
    width: '100%',
    height: '100%',
    color: '#ffffff',
    fontSize: isMobile ? '14px' : '16px',
    lineHeight: '1.4',
    position: 'relative' as const
  };

  return (
    <div style={containerStyle}>
      <AnimatedCursor />
      
      <HTMLFlipBook
        width={dimensions.width}
        height={dimensions.height}
        size="stretch"
        minWidth={300}
        maxWidth={1000}
        minHeight={400}
        maxHeight={1200}
        maxShadowOpacity={0.3}
        showCover={true}
        mobileScrollSupport={true}
        useMouseEvents={!isMobile}
        style={{ 
          backgroundColor: 'transparent',
          margin: 'auto'
        }}
        drawShadow={true}
        ref={flipBookRef}
        className=""
        startPage={0}
        flippingTime={800}
        usePortrait={true}
        startZIndex={0}
        autoSize={false}
        clickEventForward={true}
        swipeDistance={50}
        showPageCorners={true}
        disableFlipByClick={false}
      >
        {pages.map((page, index) => (
          <div key={index} className="page" style={pageStyle}>
            <div style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'center',
              textAlign: 'center',
              color: '#ffffff',
              overflowY: 'auto',
              overflowX: 'hidden',
              paddingTop: isMobile ? '10px' : '20px'
            }}>
              {page.component}
            </div>
          </div>
        ))}
      </HTMLFlipBook>
      
      {/* Mobile Tutorial */}
      {isMobile && (
        <div style={{
          position: 'absolute',
          bottom: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: 'rgba(0,0,0,0.8)',
          color: '#ffffff',
          padding: '6px 12px',
          borderRadius: '16px',
          fontSize: '11px',
          textAlign: 'center',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)',
          zIndex: 1000
        }}>
          📱 Swipe left/right to flip pages
        </div>
      )}
    </div>
  );
}

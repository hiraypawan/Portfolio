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
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  useEffect(() => {
    const updateDimensions = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      
      // Determine device type
      let currentDeviceType: 'mobile' | 'tablet' | 'desktop';
      if (screenWidth < 640) {
        currentDeviceType = 'mobile';
      } else if (screenWidth < 1024) {
        currentDeviceType = 'tablet';
      } else {
        currentDeviceType = 'desktop';
      }
      setDeviceType(currentDeviceType);
      
      // Calculate dimensions based on device type and screen size
      let width: number, height: number;
      
      if (currentDeviceType === 'mobile') {
        // Mobile: Use almost full screen with minimal margins
        width = Math.min(screenWidth - 20, 380);
        height = Math.min(screenHeight - 80, 620);
      } else if (currentDeviceType === 'tablet') {
        // Tablet: Larger but still contained
        width = Math.min(screenWidth * 0.85, 600);
        height = Math.min(screenHeight * 0.8, 800);
      } else {
        // Desktop: Larger and more spacious
        width = Math.min(screenWidth * 0.6, 800);
        height = Math.min(screenHeight * 0.85, 1000);
      }
      
      setDimensions({ width, height });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const isMobile = deviceType === 'mobile';
  const isTablet = deviceType === 'tablet';
  
  const containerClass = `
    fixed inset-0 w-screen h-screen
    flex flex-col items-center justify-center
    bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900
    overflow-hidden
    ${isMobile ? 'p-2' : isTablet ? 'p-4' : 'p-6'}
  `;

  const pageClass = `
    relative w-full h-full
    bg-gradient-to-br from-purple-900/95 to-slate-900/95
    border-2 border-indigo-500/30
    rounded-xl
    backdrop-blur-lg
    shadow-2xl
    overflow-hidden
    ${isMobile ? 'p-3' : isTablet ? 'p-4' : 'p-6'}
  `;

  const contentClass = `
    w-full h-full
    flex flex-col
    overflow-y-auto overflow-x-hidden
    text-white
    ${isMobile ? 'text-sm leading-tight' : isTablet ? 'text-base leading-normal' : 'text-lg leading-relaxed'}
    scrollbar-thin scrollbar-thumb-purple-500/50 scrollbar-track-transparent
  `;

  return (
    <div className={containerClass}>
      <AnimatedCursor />
      
      {/* Book Container */}
      <div className="relative flex items-center justify-center w-full h-full">
        <HTMLFlipBook
          width={dimensions.width}
          height={dimensions.height}
          size="stretch"
          minWidth={280}
          maxWidth={1200}
          minHeight={400}
          maxHeight={1400}
          maxShadowOpacity={0.4}
          showCover={true}
          mobileScrollSupport={true}
          useMouseEvents={!isMobile}
          style={{ 
            backgroundColor: 'transparent',
            margin: 'auto',
            transform: 'translateZ(0)' // Hardware acceleration
          }}
          drawShadow={true}
          ref={flipBookRef}
          startPage={0}
          flippingTime={600}
          usePortrait={true}
          startZIndex={0}
          autoSize={false}
          clickEventForward={true}
          swipeDistance={30}
          showPageCorners={true}
          disableFlipByClick={isMobile}
        >
          {pages.map((page, index) => (
            <div key={index} className={pageClass}>
              <div className={contentClass}>
                {page.component}
              </div>
            </div>
          ))}
        </HTMLFlipBook>
      </div>
      
      {/* Navigation Tutorial */}
      {isMobile && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-black/80 text-white px-3 py-2 rounded-full text-xs backdrop-blur-sm border border-white/20">
            📱 Swipe to turn pages
          </div>
        </div>
      )}
      
      {!isMobile && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-black/80 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm border border-white/20">
            🖱️ Click corners or use arrow keys to turn pages
          </div>
        </div>
      )}
    </div>
  );
}

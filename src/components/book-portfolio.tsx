'use client';

import { useState, useEffect, useRef } from 'react';
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
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [currentPage, setCurrentPage] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 400, height: 500, scale: 0.85 });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const flipBookRef = useRef<any>(null);

  useEffect(() => {
    const updateDeviceType = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      
      let newDimensions = { width: 400, height: 500, scale: 0.85 };
      
      if (screenWidth < 640) {
        setDeviceType('mobile');
        newDimensions = {
          width: Math.min(screenWidth - 30, 450),
          height: Math.min(screenHeight - 100, 650),
          scale: 1.0
        };
      } else if (screenWidth < 1024) {
        setDeviceType('tablet');
        newDimensions = {
          width: Math.min(screenWidth * 0.6, 650),
          height: Math.min(screenHeight * 0.85, 750),
          scale: 1.0
        };
      } else {
        setDeviceType('desktop');
        // Much larger dimensions for desktop - proper book size
        const optimalWidth = Math.min(screenWidth * 0.6, 800);
        const optimalHeight = Math.min(screenHeight * 0.9, 900);
        
        newDimensions = {
          width: optimalWidth,
          height: optimalHeight,
          scale: 1.0
        };
      }
      
      setDimensions(newDimensions);
    };

    updateDeviceType();
    window.addEventListener('resize', updateDeviceType);
    return () => window.removeEventListener('resize', updateDeviceType);
  }, []);

  const isMobile = deviceType === 'mobile';

  const nextPage = () => {
    if (isMobile && flipBookRef.current) {
      flipBookRef.current.pageFlip().flipNext();
    } else if (!isMobile) {
      // For desktop two-page spread, advance by 2 pages
      setCurrentPage(prev => Math.min(prev + 2, pages.length - 1));
    }
  };

  const prevPage = () => {
    if (isMobile && flipBookRef.current) {
      flipBookRef.current.pageFlip().flipPrev();
    } else if (!isMobile) {
      // For desktop two-page spread, go back by 2 pages
      setCurrentPage(prev => Math.max(prev - 2, 0));
    }
  };

  const handleFlip = (e: { data: number }) => {
    setCurrentPage(e.data);
  };

    return (
<div
          className={`flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 ${
            isMobile ? 'p-2 overflow-y-auto overflow-x-hidden' : 'p-6 overflow-hidden'
          }`}
          style={{
            height: isMobile ? 'auto' : '100vh',
            minHeight: '100vh',
            touchAction: isMobile ? 'pan-y' : 'auto'
          }}
        >
          <AnimatedCursor />

          {/* Custom Two-Page Book Layout for Desktop */}
          {!isMobile ? (
            <div 
              className="demo-book open-book-spread"
              style={{
                width: dimensions.width,
                height: dimensions.height,
                transform: `scale(${dimensions.scale})`,
                transformOrigin: 'center center',
                margin: 'auto',
                display: 'flex',
                border: '2px solid rgba(139, 69, 19, 0.4)',
                borderRadius: '12px',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6), inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Left Page */}
              <div 
                className="page-left bg-gradient-to-br from-purple-900 to-slate-900 border-r border-indigo-500/30 text-white"
                style={{
                  width: '50%',
                  height: '100%',
                  borderRadius: '12px 0 0 12px',
                  borderRight: '3px solid rgba(139, 69, 19, 0.5)',
                  boxShadow: '2px 0 8px rgba(0,0,0,0.3)'
                }}
              >
                <div 
                  className="w-full h-full custom-scrollbar"
                  style={{
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    padding: '1.5rem',
                    boxSizing: 'border-box'
                  }}
                >
                  {pages[currentPage] && pages[currentPage].component}
                </div>
              </div>
              
              {/* Right Page */}
              <div 
                className="page-right bg-gradient-to-br from-purple-900 to-slate-900 border-l border-indigo-500/30 text-white"
                style={{
                  width: '50%',
                  height: '100%',
                  borderRadius: '0 12px 12px 0',
                  borderLeft: '3px solid rgba(139, 69, 19, 0.5)',
                  boxShadow: '-2px 0 8px rgba(0,0,0,0.3)'
                }}
              >
                <div 
                  className="w-full h-full custom-scrollbar"
                  style={{
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    padding: '1.5rem',
                    boxSizing: 'border-box'
                  }}
                >
                  {pages[currentPage + 1] && pages[currentPage + 1].component}
                </div>
              </div>
            </div>
          ) : (
            /* Mobile Single Page Layout */
            <HTMLFlipBook
              ref={flipBookRef}
              width={dimensions.width}
              height={dimensions.height}
              size="fixed"
              minWidth={200}
              maxWidth={400}
              minHeight={600}
              maxHeight={1000}
              maxShadowOpacity={0.5}
              showCover={false}
              mobileScrollSupport={true}
              className="demo-book mobile-optimized"
              style={{ 
                touchAction: 'pan-y',
                transform: `scale(${dimensions.scale})`,
                transformOrigin: 'center center',
                margin: 'auto',
                display: 'block',
                border: '2px solid rgba(139, 69, 19, 0.4)',
                borderRadius: '12px',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6), inset 0 0 0 1px rgba(255, 255, 255, 0.1)'
              }}
              startPage={0}
              drawShadow={true}
              flippingTime={700}
              usePortrait={true}
              startZIndex={0}
              autoSize={false}
              clickEventForward={false}
              useMouseEvents={false}
              swipeDistance={100}
              showPageCorners={true}
              disableFlipByClick={false}
              onFlip={handleFlip}
            >
              {pages.map((page, index) => (
                <div
                  key={index}
                  className="page bg-gradient-to-br from-purple-900 to-slate-900 border border-indigo-500/30 shadow-lg text-white"
                  style={{
                    width: '100%',
                    height: '100%',
                    minHeight: '100%',
                    padding: 0,
                    margin: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    overflow: 'hidden',
                    boxSizing: 'border-box'
                  }}
                >
                  <div 
                    className="w-full h-full custom-scrollbar"
                    style={{
                      width: '100%',
                      height: '100%',
                      minHeight: '100%',
                      overflowY: 'auto',
                      overflowX: 'hidden',
                      WebkitOverflowScrolling: 'touch',
                      touchAction: isMobile ? 'pan-y' : 'auto',
                      padding: isMobile ? '1rem' : '1.5rem',
                      boxSizing: 'border-box',
                      scrollbarWidth: 'thin'
                    }}
                  >
                    {page.component}
                  </div>
                </div>
              ))}
            </HTMLFlipBook>
          )}

          {/* Navigation Buttons for all devices */}
          <div className="fixed top-1/2 left-4 transform -translate-y-1/2 z-50">
            <button
              onClick={prevPage}
              disabled={currentPage === 0}
              className="bg-black/80 text-white w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 disabled:opacity-30 hover:bg-white/20 transition-all duration-300 text-xl font-bold"
            >
              ‹
            </button>
          </div>
          <div className="fixed top-1/2 right-4 transform -translate-y-1/2 z-50">
            <button
              onClick={nextPage}
              disabled={currentPage >= pages.length - 1}
              className="bg-black/80 text-white w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 disabled:opacity-30 hover:bg-white/20 transition-all duration-300 text-xl font-bold"
            >
              ›
            </button>
          </div>
          
          {/* Page Indicator */}
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
            <div className="bg-black/80 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm border border-white/20">
              Page {currentPage + 1} of {pages.length}
            </div>
          </div>

          {/* Instructions */}
          {isMobile && (
            <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50">
              <div className="bg-black/80 text-white px-3 py-2 rounded-full text-xs backdrop-blur-sm border border-white/20">
                📱 Use arrows or scroll content vertically
              </div>
            </div>
          )}
        </div>
      );
}

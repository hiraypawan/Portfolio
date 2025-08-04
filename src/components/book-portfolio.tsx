'use client';

import { useState, useEffect, useRef } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
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
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 900, height: 700 });
  const mouseTrailRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const flipBookRef = useRef<any>(null);

  useEffect(() => {
    const updateDimensions = () => {
      const isMobileDevice = window.innerWidth < 768;
      setIsMobile(isMobileDevice);
      
      if (isMobileDevice) {
        setDimensions({
          width: Math.min(window.innerWidth - 40, 380),
          height: Math.min(window.innerHeight - 120, 600)
        });
      } else {
        setDimensions({
          width: Math.min(window.innerWidth - 200, 1000),
          height: Math.min(window.innerHeight - 180, 750)
        });
      }
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (mouseTrailRef.current && !isMobile) {
        mouseTrailRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMobile]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFlip = (e: any) => {
    setCurrentPage(e.data);
  };

  const nextPage = () => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipNext();
    }
  };

  const prevPage = () => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipPrev();
    }
  };

  return (
		<div className="book-page min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden px-4 py-8 box-border">
    		<AnimatedCursor />
    		
      {/* Mouse trail effect - desktop only */}
      {!isMobile && (
        <div 
          ref={mouseTrailRef} 
          className="fixed w-64 h-64 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl pointer-events-none z-0" 
          style={{ transition: 'transform 0.1s ease' }}
        />
      )}

      {/* React PageFlip Book */}
      <div className="relative z-10 flex items-center justify-center w-full h-full">
        <HTMLFlipBook
          ref={flipBookRef}
          width={dimensions.width}
          height={dimensions.height}
          size="stretch"
          minWidth={300}
          maxWidth={1200}
          minHeight={400}
          maxHeight={800}
          showCover={true}
          mobileScrollSupport={true}
          useMouseEvents={true}
          clickEventForward={true}
          swipeDistance={30}
          showPageCorners={true}
          disableFlipByClick={false}
          flippingTime={800}
          usePortrait={false}
          startPage={0}
          drawShadow={true}
          startZIndex={0}
          autoSize={false}
          maxShadowOpacity={0.3}
          onFlip={handleFlip}
          className="drop-shadow-2xl"
          style={{ margin: '0 auto', display: 'block' }}
        >
          {pages.map((page, index) => (
            <div key={index} className="w-full h-full bg-white/5 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl overflow-hidden" style={{ transformStyle: 'preserve-3d' }}>
              <div className="w-full h-full p-3 sm:p-4 md:p-6 overflow-y-auto custom-scrollbar" style={{ maxHeight: '100%' }}>
                {page.component}
              </div>
            </div>
          ))}
        </HTMLFlipBook>
      </div>

      {/* Navigation buttons - Desktop only */}
      {!isMobile && (
        <>
          <button 
            className="absolute left-8 top-1/2 transform -translate-y-1/2 p-3 bg-gray-800/80 text-white rounded-full shadow-lg hover:bg-gray-700/80 transition-colors duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed z-20"
            onClick={prevPage}
            disabled={currentPage === 0}
          >
            <FaArrowLeft className="text-lg" />
          </button>
          <button 
            className="absolute right-8 top-1/2 transform -translate-y-1/2 p-3 bg-blue-600/80 text-white rounded-full shadow-lg hover:bg-blue-700/80 transition-colors duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed z-20"
            onClick={nextPage}
            disabled={currentPage >= pages.length - 1}
          >
            <FaArrowRight className="text-lg" />
          </button>
        </>
      )}
      
      {/* Page indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {pages.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              index === currentPage ? 'bg-white' : 'bg-white/30'
            }`}
          />
        ))}
      </div>

      {/* Page counter */}
      <div className="absolute bottom-8 right-8 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm z-20">
        {currentPage + 1} / {pages.length}
      </div>
  		</div>
  );
}

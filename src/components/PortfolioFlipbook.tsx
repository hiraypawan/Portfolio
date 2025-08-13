'use client';

import React, { useRef, useState, useEffect } from 'react';
import HTMLFlipBook from 'react-pageflip';
import CoverPage from './sections/CoverPage';
import IndexPage from './sections/IndexPage';
import StoryPage from './sections/StoryPage';
import ProjectsPage from './sections/ProjectsPage';
import SkillsPage from './sections/SkillsPage';
import ContactPage from './sections/ContactPage';
import AnimatedCursor from './ui/AnimatedCursor';
import styles from './PortfolioFlipbook.module.css';

export default function PortfolioFlipbook() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const flipBookRef = useRef<any>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const mouseTrailRef = useRef<HTMLDivElement>(null);
  const [bookSize, setBookSize] = useState<{ width: number; height: number }>({ width: 380, height: 480 });

  const pages = [
    { name: 'Cover', component: <CoverPage /> },
    { name: 'Index', component: <IndexPage /> },
    { name: 'My Story', component: <StoryPage /> },
    { name: 'Projects', component: <ProjectsPage /> },
    { name: 'Skills', component: <SkillsPage /> },
    { name: 'Contact', component: <ContactPage /> },
  ];

  useEffect(() => {
    const recompute = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      const padding = vw < 768 ? 16 : 40; // match container padding roughly
      const maxBookWidth = Math.max(320, vw - padding * 2);
      const maxBookHeight = Math.max(360, vh - padding * 2);

      // HTMLFlipBook "width" is single page width. When showing two pages, total book width ≈ 2*width.
      // Keep a pleasant page aspect ratio (w:h ≈ 3:4.2)
      const desiredAspect = 3 / 4.2;

      // Compute page width so that the whole spread fits horizontally.
      const pageWidth = Math.floor(Math.min(520, (maxBookWidth - 24) / 2));
      // Compute height from width by aspect, then clamp to available height.
      const heightFromWidth = Math.floor(pageWidth / desiredAspect);
      const pageHeight = Math.min(heightFromWidth, Math.floor(maxBookHeight));

      setIsMobile(vw < 768);
      setBookSize({ width: pageWidth, height: pageHeight });
    };

    recompute();
    window.addEventListener('resize', recompute);
    return () => window.removeEventListener('resize', recompute);
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
    <div className={styles.container}>
      <AnimatedCursor />
      
      {/* Mouse trail effect - desktop only */}
      {!isMobile && (
        <div 
          ref={mouseTrailRef} 
          className="fixed w-64 h-64 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl pointer-events-none z-0" 
          style={{ transition: 'transform 0.1s ease' }}
        />
      )}

      <div className={styles.flipbookWrapper}>
        <HTMLFlipBook
          ref={flipBookRef}
          width={bookSize.width}
          height={bookSize.height}
          minWidth={bookSize.width}
          maxWidth={bookSize.width}
          minHeight={bookSize.height}
          maxHeight={bookSize.height}
          size="fixed"
          showCover={true}
          mobileScrollSupport={true}
          useMouseEvents={true}
          clickEventForward={true}
          swipeDistance={30}
          showPageCorners={true}
          disableFlipByClick={false}
          style={{ margin: '0 auto', touchAction: isMobile ? 'pan-y' : 'auto', maxWidth: '100%', maxHeight: '100%' }}
          onFlip={handleFlip}
          className={styles.flipbook}
          startPage={0}
          drawShadow={true}
          flippingTime={1000}
          usePortrait={true}
          startZIndex={0}
          autoSize={false}
          maxShadowOpacity={0.5}
        >
          {pages.map((page, index) => (
            <div key={index} className={styles.page} style={{
              overflowY: 'auto',
              overflowX: 'hidden',
              WebkitOverflowScrolling: 'touch',
              touchAction: isMobile ? 'pan-y' : 'auto'
            }}>
              <div className={styles.pageContent} style={{
                overflowY: 'auto',
                overflowX: 'hidden',
                WebkitOverflowScrolling: 'touch',
                height: '100%'
              }}>
                {page.component}
              </div>
            </div>
          ))}
        </HTMLFlipBook>
      </div>

      {/* Navigation buttons - only show on desktop or as fallback */}
      <div className={styles.navigationButtons}>
        <button 
          className={`${styles.navButton} ${styles.prevButton}`}
          onClick={prevPage}
          disabled={currentPage === 0}
          aria-label="Previous page"
        >
          ‹
        </button>
        
        <button 
          className={`${styles.navButton} ${styles.nextButton}`}
          onClick={nextPage}
          disabled={currentPage >= pages.length - 1}
          aria-label="Next page"
        >
          ›
        </button>
      </div>

      {/* Page indicator */}
      <div className={styles.pageIndicator}>
        {pages.map((_, index) => (
          <div
            key={index}
            className={`${styles.indicator} ${
              index === currentPage ? styles.indicatorActive : ''
            }`}
          />
        ))}
      </div>

      {/* Page counter */}
      <div className={styles.pageCounter}>
        <span>{currentPage + 1} / {pages.length}</span>
      </div>
    </div>
  );
}

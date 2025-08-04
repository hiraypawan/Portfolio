'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
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
  const [pageIndex, setPageIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const mouseTrailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
  const handleMouseMove = (e: MouseEvent) => {
    if (mouseTrailRef.current) {
      mouseTrailRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    }
  };

  const handleTouchStart = (e: TouchEvent) => {
    const touch = e.touches[0];
    if (touch) {
      setTouchStartX(touch.clientX);
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    const touch = e.touches[0];
    if (touch) {
      setTouchEndX(touch.clientX);
    }
  };

  const handleTouchEnd = () => {
    if (touchStartX - touchEndX > 50) {
      setPageIndex((prev) => Math.min(pages.length - 1, prev + 1));
    }

    if (touchEndX - touchStartX > 50) {
      setPageIndex((prev) => Math.max(0, prev - 1));
    }
  };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [touchStartX, touchEndX]);

  return (
		<div className="book-page min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden px-4 py-8 box-border">
    		<AnimatedCursor />
    		<div ref={mouseTrailRef} className="fixed w-64 h-64 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl pointer-events-none" style={{ transition: 'transform 0.1s ease' }}/>
    		<AnimatePresence mode="popLayout">
			<motion.div
				key={pageIndex}
				initial={{ opacity: 0, rotateY: -90 }}
				animate={{ opacity: 1, rotateY: 0 }}
				exit={{ opacity: 0, rotateY: 90 }}
				transition={{ duration: 0.6, ease: "easeInOut" }}
				className="card w-full max-w-4xl bg-white/5 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl p-8 overflow-hidden flex-shrink-0"
			style={{ transformStyle: 'preserve-3d', overflowWrap: 'break-word', wordBreak: 'break-word' }}
			>
				<div className="w-full">
					{pages[pageIndex].component}
				</div>
			</motion.div>
		</AnimatePresence>
  		<button 
        className="absolute left-8 top-1/2 transform -translate-y-1/2 p-3 bg-gray-800/80 text-white rounded-full shadow-lg hover:bg-gray-700/80 transition-colors duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => setPageIndex((prev) => Math.max(0, prev - 1))}
        disabled={pageIndex === 0}
      >
    		<FaArrowLeft className="text-lg" />
  		</button>
  		<button 
        className="absolute right-8 top-1/2 transform -translate-y-1/2 p-3 bg-blue-600/80 text-white rounded-full shadow-lg hover:bg-blue-700/80 transition-colors duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => setPageIndex((prev) => Math.min(pages.length - 1, prev + 1))}
        disabled={pageIndex === pages.length - 1}
      >
    		<FaArrowRight className="text-lg" />
  		</button>
      
      {/* Page indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {pages.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              index === pageIndex ? 'bg-white' : 'bg-white/30'
            }`}
          />
        ))}
      </div>
  		</div>
  );
}

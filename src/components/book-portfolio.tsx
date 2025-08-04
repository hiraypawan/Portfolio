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
  const mouseTrailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (mouseTrailRef.current) {
        mouseTrailRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

	return (
    	<div className="w-full min-h-screen min-h-[100dvh] flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-2 sm:p-4 md:p-6 lg:p-8">
      	<AnimatedCursor />
      	<div
        ref={mouseTrailRef}
        className="fixed w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl pointer-events-none z-0"
        style={{ transition: 'transform 0.1s ease', transform: 'translate(-50%, -50%)' }}
      	/>
      	<AnimatePresence mode="popLayout">
      		<motion.div
          key={pageIndex}
          initial={{ opacity: 0, rotateY: -90 }}
          animate={{ opacity: 1, rotateY: 0 }}
          exit={{ opacity: 0, rotateY: 90 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="w-full max-w-sm sm:max-w-2xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl bg-white/10 backdrop-blur-lg border border-white/20 p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl shadow-2xl z-10 relative overflow-hidden"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="w-full h-full overflow-y-auto max-h-[85vh] scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
            {pages[pageIndex].component}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-center gap-2 sm:gap-4 z-10">
        <button
          className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-gray-800/80 backdrop-blur-sm text-white rounded-xl disabled:opacity-50 hover:bg-gray-700/80 transition-all duration-300 flex items-center justify-center gap-2"
          onClick={() => setPageIndex((prev) => Math.max(0, prev - 1))}
          disabled={pageIndex === 0}
        >
          <FaArrowLeft className="text-sm" />
          <span className="hidden sm:inline">Previous</span>
        </button>
        <div className="px-3 sm:px-4 py-2 sm:py-3 text-white/90 text-xs sm:text-sm font-medium bg-black/20 backdrop-blur-sm rounded-xl border border-white/10">
          <span className="hidden sm:inline">{pages[pageIndex].name} • </span>
          Page {pageIndex + 1} of {pages.length}
        </div>
        <button
          className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-blue-600/80 backdrop-blur-sm text-white rounded-xl disabled:opacity-50 hover:bg-blue-700/80 transition-all duration-300 flex items-center justify-center gap-2"
          onClick={() => setPageIndex((prev) => Math.min(pages.length - 1, prev + 1))}
          disabled={pageIndex === pages.length - 1}
        >
          <span className="hidden sm:inline">Next</span>
          <FaArrowRight className="text-sm" />
        </button>
      </div>
    </div>
  );
}

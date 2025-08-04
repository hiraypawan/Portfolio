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
    <div className="w-full min-h-[100dvh] flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4 py-8">
      <div
        ref={mouseTrailRef}
        className="fixed w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl pointer-events-none"
        style={{ transition: 'transform 0.1s ease' }}
      />
      <AnimatePresence mode="wait">
        <motion.div
          key={pageIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-3xl bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-2xl shadow-xl"
        >
          {pages[pageIndex].component}
        </motion.div>
      </AnimatePresence>

      <div className="mt-6 flex gap-4">
        <button
          className="px-6 py-3 bg-gray-800 text-white rounded-xl disabled:opacity-50 hover:bg-gray-700 transition-colors"
          onClick={() => setPageIndex((prev) => Math.max(0, prev - 1))}
          disabled={pageIndex === 0}
        >
          <FaArrowLeft />
        </button>
        <div className="px-4 py-3 text-white/80 text-sm font-medium">
          {pages[pageIndex].name} ({pageIndex + 1}/{pages.length})
        </div>
        <button
          className="px-6 py-3 bg-blue-600 text-white rounded-xl disabled:opacity-50 hover:bg-blue-700 transition-colors"
          onClick={() => setPageIndex((prev) => Math.min(pages.length - 1, prev + 1))}
          disabled={pageIndex === pages.length - 1}
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
}

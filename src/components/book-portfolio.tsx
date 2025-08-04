'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
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

  return (
    <div className="w-full min-h-[100dvh] flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-purple-900 px-4 py-8">
      <motion.div
        key={pageIndex}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-2xl shadow-xl"
      >
        {pages[pageIndex].component}
      </motion.div>

      <div className="mt-6 flex gap-4">
        <button
          className="px-6 py-3 bg-gray-800 text-white rounded-xl disabled:opacity-50 hover:bg-gray-700 transition-colors"
          onClick={() => setPageIndex((prev) => Math.max(0, prev - 1))}
          disabled={pageIndex === 0}
        >
          Previous
        </button>
        <div className="px-4 py-3 text-white/80 text-sm font-medium bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl">
          {pages[pageIndex].name} ({pageIndex + 1}/{pages.length})
        </div>
        <button
          className="px-6 py-3 bg-blue-600 text-white rounded-xl disabled:opacity-50 hover:bg-blue-700 transition-colors"
          onClick={() => setPageIndex((prev) => Math.min(pages.length - 1, prev + 1))}
          disabled={pageIndex === pages.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
}

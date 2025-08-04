'use client';

import { useState, useEffect } from 'react';
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

  useEffect(() => {
    const updateDeviceType = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 640) {
        setDeviceType('mobile');
      } else if (screenWidth < 1024) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    };

    updateDeviceType();
    window.addEventListener('resize', updateDeviceType);
    return () => window.removeEventListener('resize', updateDeviceType);
  }, []);

  const isMobile = deviceType === 'mobile';

  return (
    <div className={`
      fixed inset-0 w-screen h-screen
      flex flex-col items-center justify-center
      bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900
      overflow-hidden
      ${isMobile ? 'p-2' : 'p-6'}
    `}>
      <AnimatedCursor />

      <div className="flex flex-wrap justify-center h-full w-full max-w-screen-lg overflow-auto">
        {pages.map((page, index) => (
          <div key={index} className={`
            flex flex-col p-4 m-2
            bg-gradient-to-br from-purple-900 to-slate-900
            border border-indigo-500/30
            rounded-xl
            ${isMobile ? 'w-full' : 'w-1/2'}
            overflow-hidden shadow-lg
          `}>
            <div className="flex-1 text-white overflow-y-auto">
              {page.component}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Tutorial */}
      {isMobile && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-black/80 text-white px-3 py-2 rounded-full text-xs backdrop-blur-sm border border-white/20">
            📱 Swipe to navigate
          </div>
        </div>
      )}
    </div>
  );
}

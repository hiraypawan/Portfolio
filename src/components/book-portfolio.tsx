'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaArrowRight, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import CoverPage from './sections/CoverPage';
import IndexPage from './sections/IndexPage';
import StoryPage from './sections/StoryPage';
import ProjectsPage from './sections/ProjectsPage';
import SkillsPage from './sections/SkillsPage';
import ContactPage from './sections/ContactPage';
import AnimatedCursor from './ui/AnimatedCursor';

const pageComponents = [
  CoverPage,
  IndexPage,
  StoryPage,
  ProjectsPage,
  SkillsPage,
  ContactPage,
];

const pageNames = [
  'Cover',
  'Index',
  'My Story',
  'Projects',
  'Skills',
  'Contact',
];

export default function BookPortfolio() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');

  // Play page flip sound
  const playPageFlipSound = useCallback(() => {
    if (soundEnabled) {
      try {
        const audio = new Audio('/sounds/page-flip.mp3');
        audio.volume = 0.3;
        audio.play().catch(() => {
          // Silently fail if audio can't play
        });
      } catch (error) {
        // Silently fail if audio creation fails
      }
    }
  }, [soundEnabled]);

  const nextPage = useCallback(() => {
    if (isFlipping) return;
    setIsFlipping(true);
    setDirection('forward');
    playPageFlipSound();
    setTimeout(() => {
      setCurrentPage((prevPage) => (prevPage + 1) % pageComponents.length);
      setIsFlipping(false);
    }, 300);
  }, [isFlipping, playPageFlipSound]);

  const prevPage = useCallback(() => {
    if (isFlipping) return;
    setIsFlipping(true);
    setDirection('backward');
    playPageFlipSound();
    setTimeout(() => {
      setCurrentPage((prevPage) => (prevPage - 1 + pageComponents.length) % pageComponents.length);
      setIsFlipping(false);
    }, 300);
  }, [isFlipping, playPageFlipSound]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextPage();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevPage();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [nextPage, prevPage]);

  const CurrentPageComponent = pageComponents[currentPage];

  // Page flip animation variants
  const pageVariants = {
    enter: (direction: string) => ({
      rotateY: direction === 'forward' ? 90 : -90,
      opacity: 0,
    }),
    center: {
      rotateY: 0,
      opacity: 1,
    },
    exit: (direction: string) => ({
      rotateY: direction === 'forward' ? -90 : 90,
      opacity: 0,
    }),
  };

  return (
    <div className="relative h-screen overflow-hidden bg-gradient-to-br from-slate-900 to-purple-900">
      {/* Animated Cursor */}
      <AnimatedCursor />
      
      {/* Book Container */}
      <div className="absolute inset-0 flex items-center justify-center perspective-1000">
        <div className="relative w-full h-full max-w-6xl max-h-4xl">
          {/* Page Content */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentPage}
              custom={direction}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.6,
                ease: "easeInOut",
              }}
              className="absolute inset-0 w-full h-full"
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              <CurrentPageComponent />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Buttons */}
      <motion.button
        onClick={prevPage}
        disabled={isFlipping}
        className="absolute left-8 top-1/2 transform -translate-y-1/2 z-50 p-4 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 text-white hover:bg-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Previous Page"
      >
        <FaArrowLeft size={24} />
      </motion.button>

      <motion.button
        onClick={nextPage}
        disabled={isFlipping}
        className="absolute right-8 top-1/2 transform -translate-y-1/2 z-50 p-4 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 text-white hover:bg-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Next Page"
      >
        <FaArrowRight size={24} />
      </motion.button>

      {/* Page Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full px-6 py-3">
          <div className="flex space-x-2">
            {pageComponents.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  if (index !== currentPage && !isFlipping) {
                    setIsFlipping(true);
                    setDirection(index > currentPage ? 'forward' : 'backward');
                    playPageFlipSound();
                    setTimeout(() => {
                      setCurrentPage(index);
                      setIsFlipping(false);
                    }, 300);
                  }
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentPage
                    ? 'bg-white scale-125'
                    : 'bg-white/40 hover:bg-white/60'
                }`}
                whileHover={{ scale: 1.2 }}
                aria-label={`Go to ${pageNames[index]}`}
              />
            ))}
          </div>
          <div className="text-white/80 text-sm font-medium">
            {pageNames[currentPage]}
          </div>
        </div>
      </div>

      {/* Sound Toggle */}
      <motion.button
        onClick={() => setSoundEnabled(!soundEnabled)}
        className="absolute top-8 right-8 z-50 p-3 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label={soundEnabled ? 'Mute Sound' : 'Enable Sound'}
      >
        {soundEnabled ? <FaVolumeUp size={20} /> : <FaVolumeMute size={20} />}
      </motion.button>

      {/* Keyboard Hints */}
      <div className="absolute top-8 left-8 z-50 text-white/60 text-sm">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg p-3">
          <div>← → Arrow keys to navigate</div>
          <div>Space bar for next page</div>
        </div>
      </div>
    </div>
  );
}

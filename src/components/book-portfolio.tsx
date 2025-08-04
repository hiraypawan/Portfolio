'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaArrowRight, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import CoverPage from './sections/CoverPage';
import IndexPage from './sections/IndexPage';
import StoryPage from './sections/StoryPage';
import ProjectsPage from './sections/ProjectsPage';
import SkillsPage from './sections/SkillsPage';
import ContactPage from './sections/ContactPage';
import AnimatedCursor from './ui/AnimatedCursor';
import BookLoader from './ui/BookLoader';

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
  const [isLoading, setIsLoading] = useState(true);

  // Audio reference for better performance
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Touch handling refs
  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);
  const touchStartTime = useRef<number>(0);
  const isDragging = useRef<boolean>(false);

  // Initialize audio on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        audioRef.current = new Audio('/sounds/page-flip.mp3');
        audioRef.current.volume = 0.3;
        audioRef.current.preload = 'auto';
      } catch (error) {
        console.warn('Audio initialization failed:', error);
      }
    }
  }, []);

  // Play page flip sound
  const playPageFlipSound = useCallback(() => {
    if (soundEnabled && audioRef.current) {
      try {
        // Reset audio to beginning for rapid clicks
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch((error) => {
          console.warn('Audio playback failed:', error);
        });
      } catch (error) {
        console.warn('Audio play error:', error);
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


  // Smart touch handlers - only handle horizontal swipes, allow vertical scrolling
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartX.current = touch.clientX;
    touchStartY.current = touch.clientY;
    touchStartTime.current = Date.now();
    isDragging.current = false;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!touchStartX.current) return;
    
    const touch = e.touches[0];
    const deltaX = Math.abs(touch.clientX - touchStartX.current);
    const deltaY = Math.abs(touch.clientY - touchStartY.current);
    
    // Only consider it dragging if horizontal movement is significant
    if (deltaX > 15 && deltaX > deltaY * 2) {
      isDragging.current = true;
      // Only prevent default for clear horizontal swipes
      e.preventDefault();
      e.stopPropagation();
    }
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!touchStartX.current || isFlipping) return;
    
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStartX.current;
    const deltaY = Math.abs(touch.clientY - touchStartY.current);
    const deltaTime = Date.now() - touchStartTime.current;
    
    // Only trigger page change for clear horizontal swipes
    const isHorizontalSwipe = Math.abs(deltaX) > 50 && 
                             Math.abs(deltaX) > deltaY * 1.5 && 
                             deltaTime < 500;
    
    if (isHorizontalSwipe) {
      if (deltaX > 0) {
        // Swipe right - go to previous page
        prevPage();
      } else {
        // Swipe left - go to next page  
        nextPage();
      }
    }
    
    // Reset values
    touchStartX.current = 0;
    touchStartY.current = 0;
    touchStartTime.current = 0;
    isDragging.current = false;
  }, [isFlipping, nextPage, prevPage]);

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

  // Enhanced 3D page flip animation variants
  const pageVariants = {
    enter: (direction: string) => ({
      rotateY: direction === 'forward' ? 180 : -180,
      opacity: 0,
      scale: 0.8,
      transformOrigin: direction === 'forward' ? 'left center' : 'right center',
      x: direction === 'forward' ? 100 : -100,
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
      x: 0,
      transformOrigin: 'center center',
    },
    exit: (direction: string) => ({
      rotateY: direction === 'forward' ? -180 : 180,
      opacity: 0,
      scale: 0.8,
      transformOrigin: direction === 'forward' ? 'right center' : 'left center',
      x: direction === 'forward' ? -100 : 100,
    }),
  };

  return (
    <>
      {/* Book Loader */}
      <BookLoader 
        isLoading={isLoading} 
        onLoadingComplete={() => setIsLoading(false)} 
      />
      
      {/* Mobile-first scrollable container */}
      <div className="relative w-full bg-gradient-to-br from-slate-900 to-purple-900">
        {/* Animated Cursor - Desktop only */}
        <div className="hidden md:block">
          <AnimatedCursor />
        </div>
      
        {/* Page transition wrapper */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentPage}
            custom={pageVariants}
            variants={{
              enter: { opacity: 0, x: direction === 'forward' ? 100 : -100 },
              center: { opacity: 1, x: 0 },
              exit: { opacity: 0, x: direction === 'forward' ? -100 : 100 }
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: 0.5,
              ease: "easeInOut",
            }}
            className="w-full"
          >
            {/* Main scrollable container */}
            <div 
              className="w-full overflow-y-auto overflow-x-hidden"
              style={{
                minHeight: '100vh',
                minHeight: '100dvh',
                WebkitOverflowScrolling: 'touch',
                touchAction: 'pan-y pinch-zoom'
              }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div className="w-full min-h-screen min-h-[100dvh] bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900">
                <CurrentPageComponent 
                  onNavigate={(page: number) => {
                    if (page !== currentPage && !isFlipping) {
                      setIsFlipping(true);
                      setDirection(page > currentPage ? 'forward' : 'backward');
                      playPageFlipSound();
                      setTimeout(() => {
                        setCurrentPage(page);
                        setIsFlipping(false);
                      }, 300);
                    }
                  }}
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Mobile Navigation - Bottom */}
      <div className="md:hidden fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
        <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full px-4 py-2">
          <motion.button
            onClick={prevPage}
            disabled={isFlipping}
            className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all duration-300 disabled:opacity-50"
            whileTap={{ scale: 0.95 }}
            aria-label="Previous Page"
          >
            <FaArrowLeft size={16} />
          </motion.button>
          
          <div className="flex space-x-1">
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
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentPage
                    ? 'bg-white scale-125'
                    : 'bg-white/40'
                }`}
                aria-label={`Go to ${pageNames[index]}`}
              />
            ))}
          </div>
          
          <motion.button
            onClick={nextPage}
            disabled={isFlipping}
            className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all duration-300 disabled:opacity-50"
            whileTap={{ scale: 0.95 }}
            aria-label="Next Page"
          >
            <FaArrowRight size={16} />
          </motion.button>
        </div>
      </div>

      {/* Desktop Navigation Buttons */}
      <motion.button
        onClick={prevPage}
        disabled={isFlipping}
        className="hidden md:block absolute left-4 lg:left-8 top-1/2 transform -translate-y-1/2 z-50 p-3 lg:p-4 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 text-white hover:bg-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Previous Page"
      >
        <FaArrowLeft size={20} />
      </motion.button>

      <motion.button
        onClick={nextPage}
        disabled={isFlipping}
        className="hidden md:block absolute right-4 lg:right-8 top-1/2 transform -translate-y-1/2 z-50 p-3 lg:p-4 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 text-white hover:bg-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Next Page"
      >
        <FaArrowRight size={20} />
      </motion.button>

      {/* Folded Page Corner - Mobile */}
      <div className="md:hidden fixed bottom-0 right-0 z-40">
        <motion.div
          onClick={nextPage}
          className="relative w-16 h-16 cursor-pointer overflow-hidden"
          whileTap={{ scale: 0.95 }}
        >
          {/* Folded corner triangle */}
          <div className="absolute bottom-0 right-0 w-16 h-16">
            <div className="absolute bottom-0 right-0 w-0 h-0 border-l-16 border-b-16 border-l-transparent border-b-white/20"></div>
            <div className="absolute bottom-0 right-0 w-0 h-0 border-l-12 border-b-12 border-l-transparent border-b-white/10"></div>
          </div>
          {/* Page curl shadow */}
          <div className="absolute bottom-0 right-0 w-4 h-4 bg-gradient-to-tl from-black/30 to-transparent"></div>
        </motion.div>
      </div>

      {/* Desktop Page Indicator */}
      <div className="hidden md:block absolute bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full px-4 lg:px-6 py-2 lg:py-3">
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
          <div className="text-white/80 text-sm font-medium hidden lg:block">
            {pageNames[currentPage]}
          </div>
        </div>
      </div>

      {/* Sound Toggle */}
      <motion.button
        onClick={() => setSoundEnabled(!soundEnabled)}
        className="absolute top-4 right-4 lg:top-8 lg:right-8 z-50 p-2 lg:p-3 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label={soundEnabled ? 'Mute Sound' : 'Enable Sound'}
      >
        {soundEnabled ? <FaVolumeUp size={16} /> : <FaVolumeMute size={16} />}
      </motion.button>

      {/* Keyboard Hints - Desktop only */}
      <div className="hidden lg:block absolute top-4 lg:top-8 left-4 lg:left-8 z-50 text-white/60 text-xs lg:text-sm">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg p-2 lg:p-3">
          <div>← → Arrow keys to navigate</div>
          <div>Space bar for next page</div>
        </div>
      </div>

      {/* Mobile swipe indicator */}
      <div className="md:hidden absolute top-4 left-1/2 transform -translate-x-1/2 z-50 text-white/60 text-xs">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg px-3 py-1">
          Swipe horizontally or use buttons to navigate
        </div>
      </div>
    </>
  );
}

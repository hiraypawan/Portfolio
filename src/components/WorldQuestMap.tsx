'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import { MapLocation, mapLocations, UserProgress, defaultProgress } from '@/data/mapData';
import LocationModal from './LocationModal';
import MapMarker from './MapMarker';
import ProgressTracker from './ProgressTracker';
import MouseTrail from './MouseTrail';
import { ThemeToggle } from './theme-toggle';

// Sound effects simulation (you can replace with actual audio later)
const playSound = (type: 'click' | 'unlock' | 'discover' | 'hover') => {
  // For now, we'll use vibration on mobile devices
  if ('vibrate' in navigator) {
    switch (type) {
      case 'click':
        navigator.vibrate(50);
        break;
      case 'unlock':
        navigator.vibrate([100, 50, 100]);
        break;
      case 'discover':
        navigator.vibrate([150, 100, 150, 100, 150]);
        break;
      case 'hover':
        navigator.vibrate(20);
        break;
    }
  }
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface WorldQuestMapProps {}

export default function WorldQuestMap({}: WorldQuestMapProps) {
  // Map state
  const [{ x, y, scale }, api] = useSpring(() => ({ 
    x: 0, 
    y: 0, 
    scale: 0.7,
    config: { tension: 200, friction: 25 } 
  }));

  // UI state
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgress>(defaultProgress);
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);
  const [mapSize, setMapSize] = useState({ width: 1400, height: 900 });
  const [showWelcome, setShowWelcome] = useState(true);
  const [questsCompleted, setQuestsCompleted] = useState(0);
  const [isExploring, setIsExploring] = useState(false);

  // Refs
  const mapContainerRef = useRef<HTMLDivElement>(null);

  // Load progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('worldQuestProgress');
    if (savedProgress) {
      try {
        const progress = JSON.parse(savedProgress);
        setUserProgress(progress);
        setQuestsCompleted(progress.visitedLocations.length);
      } catch (error) {
        console.error('Error loading progress:', error);
      }
    }
  }, []);

  // Save progress to localStorage
  const saveProgress = useCallback((progress: UserProgress) => {
    localStorage.setItem('worldQuestProgress', JSON.stringify(progress));
    setUserProgress(progress);
    setQuestsCompleted(progress.visitedLocations.length);
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (mapContainerRef.current) {
        const container = mapContainerRef.current;
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;
        
        setMapSize({
          width: Math.max(1400, containerWidth * 1.8),
          height: Math.max(900, containerHeight * 1.8)
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Drag functionality
  const bind = useDrag(
    ({ offset: [ox, oy], memo = { x: x.get(), y: y.get() } }) => {
      setIsExploring(true);
      const newX = memo.x + ox;
      const newY = memo.y + oy;
      
      // Constrain drag bounds
      const maxX = 300;
      const maxY = 300;
      const minX = -maxX;
      const minY = -maxY;
      
      api.start({
        x: Math.max(minX, Math.min(maxX, newX)),
        y: Math.max(minY, Math.min(maxY, newY))
      });
      
      return memo;
    },
    { 
      axis: undefined,
      bounds: { left: -300, right: 300, top: -300, bottom: 300 },
      onDragEnd: () => setIsExploring(false)
    }
  );

  // Handle location click with enhanced effects
  const handleLocationClick = useCallback((location: MapLocation) => {
    playSound('click');
    
    // Check if location is unlocked
    const isUnlocked = userProgress.unlockedLocations.includes(location.id);
    
    if (!isUnlocked && location.requiresUnlock) {
      const requirementsMet = location.requiresUnlock.every(reqId =>
        userProgress.visitedLocations.includes(reqId)
      );
      
      if (requirementsMet) {
        // Unlock the location with celebration
        playSound('unlock');
        const newProgress = {
          ...userProgress,
          unlockedLocations: [...userProgress.unlockedLocations, location.id]
        };
        saveProgress(newProgress);
      } else {
        // Show requirements not met with shake effect
        playSound('hover');
        return;
      }
    }

    setSelectedLocation(location);
    
    // Mark as visited
    if (!userProgress.visitedLocations.includes(location.id)) {
      playSound('discover');
      const newProgress = {
        ...userProgress,
        visitedLocations: [...userProgress.visitedLocations, location.id]
      };
      saveProgress(newProgress);
    }

    // Smooth zoom to location
    api.start({
      scale: location.zoomLevel || 1.4,
      x: -(location.position.x - 50) * 4,
      y: -(location.position.y - 50) * 4
    });
  }, [userProgress, saveProgress, api]);

  // Enhanced zoom handlers
  const zoomIn = useCallback(() => {
    playSound('hover');
    api.start({ scale: Math.min(scale.get() * 1.3, 2.5) });
  }, [api, scale]);

  const zoomOut = useCallback(() => {
    playSound('hover');
    api.start({ scale: Math.max(scale.get() * 0.7, 0.4) });
  }, [api, scale]);

  const resetView = useCallback(() => {
    playSound('click');
    api.start({ x: 0, y: 0, scale: 0.7 });
  }, [api]);

  // Close modal
  const closeModal = useCallback(() => {
    setSelectedLocation(null);
    resetView();
  }, [resetView]);

  // Enhanced hover handler
  const handleLocationHover = useCallback((locationId: string, hovered: boolean) => {
    if (hovered && hoveredLocation !== locationId) {
      playSound('hover');
    }
    setHoveredLocation(hovered ? locationId : null);
  }, [hoveredLocation]);

  // Filter visible locations
  const visibleLocations = mapLocations.filter(location => {
    if (location.isUnlocked) return true;
    if (location.requiresUnlock) {
      return location.requiresUnlock.every(reqId =>
        userProgress.visitedLocations.includes(reqId)
      );
    }
    return userProgress.unlockedLocations.includes(location.id);
  });

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 overflow-hidden">
      {/* Mouse Trail Effect */}
      <MouseTrail />

      {/* Enhanced Animated Background */}
      <div className="absolute inset-0">
        {/* Moving stars */}
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Animated nebulas */}
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              'radial-gradient(ellipse at 20% 30%, rgba(59,130,246,0.3) 0%, transparent 50%)',
              'radial-gradient(ellipse at 80% 70%, rgba(168,85,247,0.3) 0%, transparent 50%)',
              'radial-gradient(ellipse at 50% 50%, rgba(34,197,94,0.3) 0%, transparent 50%)',
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
        />
      </div>

      {/* Quest Completion Celebration */}
      <AnimatePresence>
        {questsCompleted > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none"
          >
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-3 rounded-full font-bold shadow-lg">
              🏆 Quest {questsCompleted}/13 Completed! 
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Map Container */}
      <div 
        ref={mapContainerRef}
        className="absolute inset-0 cursor-grab active:cursor-grabbing"
        style={{ touchAction: 'none' }}
      >
        <animated.div
          {...bind()}
          style={{
            x,
            y,
            scale,
            width: mapSize.width,
            height: mapSize.height,
            transformOrigin: 'center center'
          }}
          className="relative w-full h-full"
        >
          {/* Enhanced Map Background */}
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 1400 900"
            className="absolute inset-0 pointer-events-none"
          >
            <defs>
              {/* Enhanced map texture */}
              <pattern id="worldTexture" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                <rect width="60" height="60" fill="rgba(30, 58, 138, 0.1)" />
                <circle cx="30" cy="30" r="1.5" fill="rgba(59, 130, 246, 0.3)" />
                <circle cx="15" cy="45" r="0.5" fill="rgba(168, 85, 247, 0.2)" />
                <circle cx="45" cy="15" r="0.5" fill="rgba(34, 197, 94, 0.2)" />
              </pattern>
              
              {/* Enhanced glow filter */}
              <filter id="worldGlow">
                <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>

              {/* Animated gradient for paths */}
              <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(59, 130, 246, 0.8)">
                  <animate attributeName="stopColor" 
                    values="rgba(59,130,246,0.8);rgba(168,85,247,0.8);rgba(34,197,94,0.8);rgba(59,130,246,0.8)"
                    dur="4s" repeatCount="indefinite"/>
                </stop>
                <stop offset="100%" stopColor="rgba(168, 85, 247, 0.8)">
                  <animate attributeName="stopColor" 
                    values="rgba(168,85,247,0.8);rgba(34,197,94,0.8);rgba(59,130,246,0.8);rgba(168,85,247,0.8)"
                    dur="4s" repeatCount="indefinite"/>
                </stop>
              </linearGradient>
            </defs>

            {/* World base */}
            <rect 
              width="100%" 
              height="100%" 
              fill="url(#worldTexture)" 
              className="opacity-20"
            />

            {/* Enhanced compass rose */}
            <g transform="translate(120, 120)">
              <motion.circle 
                cx="0" cy="0" r="40" 
                fill="none" 
                stroke="rgba(59, 130, 246, 0.5)" 
                strokeWidth="2"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <line x1="0" y1="-35" x2="0" y2="35" stroke="rgba(59, 130, 246, 0.7)" strokeWidth="2"/>
              <line x1="-35" y1="0" x2="35" y2="0" stroke="rgba(59, 130, 246, 0.7)" strokeWidth="2"/>
              <text x="0" y="-50" textAnchor="middle" fill="rgba(59, 130, 246, 0.9)" fontSize="14" fontWeight="bold">N</text>
              <text x="0" y="65" textAnchor="middle" fill="rgba(59, 130, 246, 0.7)" fontSize="10">World Quest</text>
            </g>

            {/* Animated connection paths */}
            {visibleLocations.map((location, index) => {
              const nextLocation = visibleLocations[index + 1];
              if (!nextLocation) return null;
              
              const x1 = (location.position.x / 100) * 1400;
              const y1 = (location.position.y / 100) * 900;
              const x2 = (nextLocation.position.x / 100) * 1400;
              const y2 = (nextLocation.position.y / 100) * 900;
              
              return (
                <motion.path
                  key={`quest-path-${index}`}
                  d={`M ${x1} ${y1} Q ${(x1 + x2) / 2} ${Math.min(y1, y2) - 80} ${x2} ${y2}`}
                  fill="none"
                  stroke="url(#pathGradient)"
                  strokeWidth="3"
                  strokeDasharray="8,4"
                  className="pointer-events-none filter-[url(#worldGlow)]"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ 
                    pathLength: userProgress.visitedLocations.includes(location.id) ? 1 : 0,
                    opacity: userProgress.visitedLocations.includes(location.id) ? 0.8 : 0.3
                  }}
                  transition={{ duration: 2.5, delay: index * 0.2 }}
                />
              );
            })}
          </svg>

          {/* Location Markers */}
          {visibleLocations.map((location) => {
            const isUnlocked = userProgress.unlockedLocations.includes(location.id);
            const isVisited = userProgress.visitedLocations.includes(location.id);
            
            return (
              <MapMarker
                key={location.id}
                location={location}
                isUnlocked={isUnlocked}
                isVisited={isVisited}
                isHovered={hoveredLocation === location.id}
                onClick={() => handleLocationClick(location)}
                onHover={(hovered) => handleLocationHover(location.id, hovered)}
                containerSize={mapSize}
              />
            );
          })}
        </animated.div>
      </div>

      {/* Enhanced UI Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-3 z-50">
        <ThemeToggle />
        
        {/* Zoom Controls */}
        <div className="flex flex-col gap-2 bg-black/70 backdrop-blur-sm rounded-lg p-2 border border-white/20">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={zoomIn}
            className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg flex items-center justify-center font-bold text-lg shadow-lg hover:shadow-blue-500/25 transition-all"
          >
            +
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={zoomOut}
            className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg flex items-center justify-center font-bold text-lg shadow-lg hover:shadow-purple-500/25 transition-all"
          >
            -
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={resetView}
            className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg flex items-center justify-center text-sm shadow-lg hover:shadow-green-500/25 transition-all"
          >
            🏠
          </motion.button>
        </div>
      </div>

      {/* Enhanced Progress Tracker */}
      <ProgressTracker 
        progress={userProgress}
        totalLocations={mapLocations.length}
      />

      {/* Welcome Message with World Quest Theme */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowWelcome(false)}
          >
            <motion.div
              initial={{ y: 30, rotateX: -15 }}
              animate={{ y: 0, rotateX: 0 }}
              className="bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 p-8 rounded-2xl border border-blue-500/30 max-w-lg text-center shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.h2 
                className="text-3xl font-bold text-white mb-4"
                animate={{
                  textShadow: [
                    '0 0 20px rgba(59,130,246,0.8)',
                    '0 0 30px rgba(168,85,247,0.8)',
                    '0 0 20px rgba(59,130,246,0.8)',
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🗺️ Welcome to World Quest Portfolio!
              </motion.h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Embark on an epic journey through Pawan&apos;s digital world! Each glowing location is a quest waiting to be discovered. Click, explore, and unlock the treasures of code, creativity, and innovation!
              </p>
              <div className="flex justify-center gap-6 text-sm text-gray-400 mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                  <span>Projects</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Skills</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                  <span>Treasures</span>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05, rotateX: 5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setShowWelcome(false);
                  playSound('click');
                }}
                className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-blue-500/25 transition-all"
              >
                Begin Quest! 🚀
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Location Modal */}
      <LocationModal
        location={selectedLocation}
        onClose={closeModal}
        userProgress={userProgress}
        onProgressUpdate={saveProgress}
      />

      {/* Mobile Instructions */}
      <div className="fixed bottom-4 left-4 md:hidden z-40">
        <motion.div 
          className="bg-black/80 text-white px-4 py-3 rounded-lg text-sm backdrop-blur-sm border border-white/20"
          animate={{
            boxShadow: [
              '0 0 10px rgba(59,130,246,0.3)',
              '0 0 20px rgba(168,85,247,0.3)',
              '0 0 10px rgba(59,130,246,0.3)',
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          📱 Pinch to zoom • Drag to explore • Tap quests to discover!
        </motion.div>
      </div>

      {/* Exploration indicator */}
      {isExploring && (
        <motion.div
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
        >
          <div className="bg-gradient-to-r from-blue-500/80 to-purple-600/80 text-white px-6 py-3 rounded-full font-semibold backdrop-blur-sm">
            🧭 Exploring...
          </div>
        </motion.div>
      )}
    </div>
  );
}

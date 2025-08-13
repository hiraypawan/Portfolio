'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import { MapLocation, mapLocations, UserProgress, defaultProgress } from '@/data/mapData';
import LocationModal from './LocationModal';
import MapMarker from './MapMarker';
import ProgressTracker from './ProgressTracker';
import { ThemeToggle } from './theme-toggle';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface TreasureMapProps {}

export default function TreasureMap({}: TreasureMapProps) {
  // Map state
  const [{ x, y, scale }, api] = useSpring(() => ({ 
    x: 0, 
    y: 0, 
    scale: 0.6,
    config: { tension: 200, friction: 25 } 
  }));

  // UI state
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgress>(defaultProgress);
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);
  const [mapSize, setMapSize] = useState({ width: 1200, height: 800 });
  const [showWelcome, setShowWelcome] = useState(true);

  // Refs
  const mapContainerRef = useRef<HTMLDivElement>(null);

  // Load progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('treasureMapProgress');
    if (savedProgress) {
      try {
        const progress = JSON.parse(savedProgress);
        setUserProgress(progress);
      } catch (error) {
        console.error('Error loading progress:', error);
      }
    }
  }, []);

  // Save progress to localStorage
  const saveProgress = useCallback((progress: UserProgress) => {
    localStorage.setItem('treasureMapProgress', JSON.stringify(progress));
    setUserProgress(progress);
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (mapContainerRef.current) {
        const container = mapContainerRef.current;
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;
        
        // Update map dimensions based on container
        setMapSize({
          width: Math.max(1200, containerWidth * 1.5),
          height: Math.max(800, containerHeight * 1.5)
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
      const newX = memo.x + ox;
      const newY = memo.y + oy;
      
      // Constrain drag bounds
      const maxX = 200;
      const maxY = 200;
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
      bounds: { left: -200, right: 200, top: -200, bottom: 200 }
    }
  );

  // Handle location click
  const handleLocationClick = useCallback((location: MapLocation) => {
    // Check if location is unlocked
    const isUnlocked = userProgress.unlockedLocations.includes(location.id);
    
    if (!isUnlocked && location.requiresUnlock) {
      // Check if requirements are met
      const requirementsMet = location.requiresUnlock.every(reqId =>
        userProgress.visitedLocations.includes(reqId)
      );
      
      if (requirementsMet) {
        // Unlock the location
        const newProgress = {
          ...userProgress,
          unlockedLocations: [...userProgress.unlockedLocations, location.id]
        };
        saveProgress(newProgress);
      } else {
        // Show requirements not met message
        alert(`🔒 This location is locked! Visit ${location.requiresUnlock?.join(' and ')} first.`);
        return;
      }
    }

    setSelectedLocation(location);
    
    // Mark as visited
    if (!userProgress.visitedLocations.includes(location.id)) {
      const newProgress = {
        ...userProgress,
        visitedLocations: [...userProgress.visitedLocations, location.id]
      };
      saveProgress(newProgress);
    }

    // Zoom to location
    api.start({
      scale: location.zoomLevel || 1.2,
      x: -(location.position.x - 50) * 3,
      y: -(location.position.y - 50) * 3
    });
  }, [userProgress, saveProgress, api]);

  // Zoom handlers
  const zoomIn = useCallback(() => {
    api.start({ scale: Math.min(scale.get() * 1.2, 2) });
  }, [api, scale]);

  const zoomOut = useCallback(() => {
    api.start({ scale: Math.max(scale.get() * 0.8, 0.3) });
  }, [api, scale]);

  const resetView = useCallback(() => {
    api.start({ x: 0, y: 0, scale: 0.6 });
  }, [api]);

  // Close modal
  const closeModal = useCallback(() => {
    setSelectedLocation(null);
    resetView();
  }, [resetView]);

  // Filter locations based on unlock status
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
    <div className="relative w-full h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-purple-900/20 to-slate-900"></div>
      
      {/* Floating particles */}
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -10, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

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
          {/* Map Background - Treasure Map Style */}
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 1200 800"
            className="absolute inset-0 pointer-events-none"
          >
            {/* Map background texture */}
            <defs>
              <pattern id="mapTexture" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                <rect width="50" height="50" fill="rgba(139, 69, 19, 0.1)" />
                <circle cx="25" cy="25" r="1" fill="rgba(139, 69, 19, 0.2)" />
              </pattern>
              
              {/* Glow filter */}
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Map base */}
            <rect 
              width="100%" 
              height="100%" 
              fill="url(#mapTexture)" 
              className="opacity-20"
            />

            {/* Decorative compass rose */}
            <g transform="translate(100, 100)">
              <circle cx="0" cy="0" r="30" fill="none" stroke="rgba(139, 69, 19, 0.3)" strokeWidth="2"/>
              <line x1="0" y1="-25" x2="0" y2="25" stroke="rgba(139, 69, 19, 0.5)" strokeWidth="1"/>
              <line x1="-25" y1="0" x2="25" y2="0" stroke="rgba(139, 69, 19, 0.5)" strokeWidth="1"/>
              <text x="0" y="-35" textAnchor="middle" fill="rgba(139, 69, 19, 0.7)" fontSize="12">N</text>
            </g>

            {/* Decorative paths between locations */}
            {visibleLocations.map((location, index) => {
              const nextLocation = visibleLocations[index + 1];
              if (!nextLocation) return null;
              
              const x1 = (location.position.x / 100) * 1200;
              const y1 = (location.position.y / 100) * 800;
              const x2 = (nextLocation.position.x / 100) * 1200;
              const y2 = (nextLocation.position.y / 100) * 800;
              
              return (
                <motion.path
                  key={`path-${index}`}
                  d={`M ${x1} ${y1} Q ${(x1 + x2) / 2} ${Math.min(y1, y2) - 50} ${x2} ${y2}`}
                  fill="none"
                  stroke="rgba(139, 69, 19, 0.3)"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  className="pointer-events-none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ 
                    pathLength: userProgress.visitedLocations.includes(location.id) ? 1 : 0,
                    opacity: userProgress.visitedLocations.includes(location.id) ? 0.5 : 0.2
                  }}
                  transition={{ duration: 2, delay: index * 0.1 }}
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
                onHover={(hovered) => setHoveredLocation(hovered ? location.id : null)}
                containerSize={mapSize}
              />
            );
          })}
        </animated.div>
      </div>

      {/* UI Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-50">
        <ThemeToggle />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={zoomIn}
          className="w-12 h-12 bg-black/80 text-white rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all"
        >
          +
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={zoomOut}
          className="w-12 h-12 bg-black/80 text-white rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all"
        >
          -
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={resetView}
          className="w-12 h-12 bg-black/80 text-white rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all text-sm"
        >
          🏠
        </motion.button>
      </div>

      {/* Progress Tracker */}
      <ProgressTracker 
        progress={userProgress}
        totalLocations={mapLocations.length}
      />

      {/* Welcome Message */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowWelcome(false)}
          >
            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              className="bg-gradient-to-br from-slate-900 to-purple-900 p-8 rounded-2xl border border-purple-500/30 max-w-md text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold text-white mb-4">🗺️ Welcome to the Treasure Hunt!</h2>
              <p className="text-gray-300 mb-6">
                Explore Pawan&apos;s digital world by clicking on glowing locations. Discover projects, skills, and hidden treasures!
              </p>
              <div className="flex gap-4 text-sm text-gray-400 mb-6">
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
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowWelcome(false)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold"
              >
                Start Exploring! 🚀
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
        <div className="bg-black/80 text-white px-3 py-2 rounded-lg text-sm backdrop-blur-sm border border-white/20">
          📱 Pinch to zoom • Drag to explore
        </div>
      </div>
    </div>
  );
}

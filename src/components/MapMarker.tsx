'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { MapLocation } from '@/data/mapData';
import { useState } from 'react';

interface MapMarkerProps {
  location: MapLocation;
  isUnlocked: boolean;
  isVisited: boolean;
  isHovered: boolean;
  onClick: () => void;
  onHover: (hovered: boolean) => void;
  containerSize: { width: number; height: number };
}

export default function MapMarker({
  location,
  isUnlocked,
  isVisited,
  isHovered,
  onClick,
  onHover,
  containerSize
}: MapMarkerProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  // Calculate position based on container size
  const x = (location.position.x / 100) * containerSize.width;
  const y = (location.position.y / 100) * containerSize.height;

  const IconComponent = location.icon;

  // Determine marker appearance based on state
  const getMarkerStyle = () => {
    if (!isUnlocked) {
      return {
        bg: 'bg-gray-600/50',
        glow: 'rgba(107, 114, 128, 0.3)',
        border: 'border-gray-500/30'
      };
    }

    if (isVisited) {
      return {
        bg: `bg-gradient-to-r ${location.color}`,
        glow: location.glowColor,
        border: 'border-white/50'
      };
    }

    return {
      bg: `bg-gradient-to-r ${location.color}`,
      glow: location.glowColor,
      border: 'border-white/30'
    };
  };

  const markerStyle = getMarkerStyle();

  return (
    <div
      className="absolute z-30"
      style={{
        left: x - 20,
        top: y - 20,
        transform: 'translate(-50%, -50%)'
      }}
    >
      {/* Main Marker */}
      <motion.div
        className="relative cursor-pointer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: 1, 
          opacity: 1,
          rotate: location.treasure?.animation === 'rotate' ? 360 : 0
        }}
        whileHover={{ 
          scale: 1.2,
          y: location.treasure?.animation === 'bounce' ? -5 : 0
        }}
        whileTap={{ scale: 0.9 }}
        onClick={onClick}
        onMouseEnter={() => {
          onHover(true);
          setShowTooltip(true);
        }}
        onMouseLeave={() => {
          onHover(false);
          setShowTooltip(false);
        }}
        transition={{
          duration: 0.3,
          rotate: location.treasure?.animation === 'rotate' ? 
            { duration: 4, repeat: Infinity, ease: 'linear' } : 
            undefined
        }}
      >
        {/* Glow Effect */}
        <motion.div
          className={`absolute inset-0 rounded-full blur-lg ${markerStyle.bg}`}
          animate={{
            opacity: isHovered ? 0.8 : (location.treasure?.animation === 'glow' ? [0.4, 0.8, 0.4] : 0.5),
            scale: isHovered ? 1.5 : 1.2
          }}
          transition={{
            opacity: location.treasure?.animation === 'glow' ? 
              { duration: 2, repeat: Infinity, ease: 'easeInOut' } : 
              { duration: 0.3 }
          }}
          style={{
            backgroundColor: markerStyle.glow,
            filter: 'blur(8px)'
          }}
        />

        {/* Main Icon Container */}
        <motion.div
          className={`relative w-12 h-12 rounded-full ${markerStyle.bg} border-2 ${markerStyle.border} 
            flex items-center justify-center backdrop-blur-sm shadow-lg`}
          animate={{
            y: location.treasure?.animation === 'bounce' ? [0, -3, 0] : 0,
            boxShadow: isHovered ? 
              `0 0 20px ${markerStyle.glow}` : 
              `0 0 10px ${markerStyle.glow}`
          }}
          transition={{
            y: location.treasure?.animation === 'bounce' ? 
              { duration: 1.5, repeat: Infinity, ease: 'easeInOut' } : 
              undefined,
            boxShadow: { duration: 0.3 }
          }}
        >
          <IconComponent 
            className={`text-lg ${isUnlocked ? 'text-white' : 'text-gray-400'}`}
          />

          {/* Status Indicators */}
          {isVisited && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full 
                border-2 border-white flex items-center justify-center"
            >
              <span className="text-white text-xs">✓</span>
            </motion.div>
          )}

          {!isUnlocked && (
            <motion.div
              className="absolute -top-1 -right-1 w-4 h-4 bg-gray-600 rounded-full 
                border-2 border-white flex items-center justify-center"
            >
              <span className="text-white text-xs">🔒</span>
            </motion.div>
          )}

          {location.treasure && isUnlocked && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -bottom-1 -left-1 w-4 h-4 bg-yellow-500 rounded-full 
                border-2 border-white flex items-center justify-center"
            >
              <span className="text-white text-xs">💎</span>
            </motion.div>
          )}
        </motion.div>

        {/* Pulsing Ring for Important Locations */}
        {(location.type === 'project' || location.treasure) && isUnlocked && (
          <motion.div
            className="absolute inset-0 rounded-full border border-white/30"
            animate={{
              scale: [1, 1.8, 1],
              opacity: [0.5, 0, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        )}
      </motion.div>

      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: -50, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute left-1/2 transform -translate-x-1/2 z-50 pointer-events-none"
            transition={{ duration: 0.2 }}
          >
            <div className="bg-black/90 backdrop-blur-sm text-white px-3 py-2 rounded-lg 
              text-sm font-medium shadow-xl border border-white/20 whitespace-nowrap">
              {location.name}
              {location.treasure && (
                <div className="text-xs text-yellow-400 mt-1">
                  💎 Contains treasure!
                </div>
              )}
              {!isUnlocked && (
                <div className="text-xs text-red-400 mt-1">
                  🔒 Locked
                </div>
              )}
            </div>
            {/* Tooltip Arrow */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2">
              <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 
                border-transparent border-t-black/90" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Location Label for Main Locations */}
      {location.type === 'project' && isUnlocked && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0.7 }}
          className="absolute top-14 left-1/2 transform -translate-x-1/2 
            text-white text-xs font-medium text-center pointer-events-none
            bg-black/50 backdrop-blur-sm px-2 py-1 rounded border border-white/20"
        >
          {location.name.replace(' Kingdom', '').replace(' Empire', '').replace(' Dimension', '')}
        </motion.div>
      )}
    </div>
  );
}

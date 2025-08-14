'use client';

import { motion } from 'framer-motion';

interface DoorAnimationProps {
  isOpen: boolean;
  floorTheme: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
}

export default function DoorAnimation({ isOpen, floorTheme }: DoorAnimationProps) {
  const doorVariants = {
    closed: {
      x: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeInOut" as const,
        type: "spring" as const,
        stiffness: 100
      }
    },
    open: {
      x: '-100%',
      transition: { 
        duration: 0.8, 
        ease: "easeInOut" as const,
        type: "spring" as const,
        stiffness: 100
      }
    }
  };

  const rightDoorVariants = {
    closed: {
      x: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeInOut" as const,
        type: "spring" as const,
        stiffness: 100
      }
    },
    open: {
      x: '100%',
      transition: { 
        duration: 0.8, 
        ease: "easeInOut" as const,
        type: "spring" as const,
        stiffness: 100
      }
    }
  };

  return (
    <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
      {/* Left Door */}
      <motion.div
        className="absolute top-0 left-0 w-1/2 h-full"
        variants={doorVariants}
        animate={isOpen ? 'open' : 'closed'}
        style={{
          background: `linear-gradient(90deg, 
            rgba(20, 20, 20, 0.95) 0%, 
            rgba(40, 40, 40, 0.9) 40%, 
            rgba(60, 60, 60, 0.85) 100%
          )`
        }}
      >
        {/* Door Panel Details */}
        <div className="relative w-full h-full">
          {/* Main door surface */}
          <div className="absolute inset-2 bg-gradient-to-r from-gray-700 to-gray-600 
                          border-2 border-gray-500 rounded-lg shadow-inner">
            
            {/* Door Handle */}
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <div className="w-2 h-8 bg-gradient-to-b from-gray-400 to-gray-600 rounded-full shadow-lg" />
              <motion.div 
                className="w-4 h-4 bg-gradient-to-br rounded-full mt-2 shadow-md"
                style={{ 
                  background: `linear-gradient(135deg, ${floorTheme.accent}80, ${floorTheme.accent}40)` 
                }}
                animate={{
                  boxShadow: [
                    `0 0 5px ${floorTheme.accent}40`,
                    `0 0 15px ${floorTheme.accent}60`,
                    `0 0 5px ${floorTheme.accent}40`
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>

            {/* Decorative panel lines */}
            <div className="absolute inset-4 space-y-2">
              {[...Array(8)].map((_, i) => (
                <div 
                  key={i} 
                  className="h-0.5 bg-gradient-to-r from-gray-600 to-gray-500 rounded opacity-60" 
                />
              ))}
            </div>
          </div>

          {/* Door edge highlight */}
          <div className="absolute right-0 top-0 w-1 h-full bg-gradient-to-b from-gray-400 to-gray-600" />
        </div>
      </motion.div>

      {/* Right Door */}
      <motion.div
        className="absolute top-0 right-0 w-1/2 h-full"
        variants={rightDoorVariants}
        animate={isOpen ? 'open' : 'closed'}
        style={{
          background: `linear-gradient(270deg, 
            rgba(20, 20, 20, 0.95) 0%, 
            rgba(40, 40, 40, 0.9) 40%, 
            rgba(60, 60, 60, 0.85) 100%
          )`
        }}
      >
        {/* Door Panel Details */}
        <div className="relative w-full h-full">
          {/* Main door surface */}
          <div className="absolute inset-2 bg-gradient-to-l from-gray-700 to-gray-600 
                          border-2 border-gray-500 rounded-lg shadow-inner">
            
            {/* Door Handle */}
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <div className="w-2 h-8 bg-gradient-to-b from-gray-400 to-gray-600 rounded-full shadow-lg" />
              <motion.div 
                className="w-4 h-4 bg-gradient-to-br rounded-full mt-2 shadow-md"
                style={{ 
                  background: `linear-gradient(135deg, ${floorTheme.accent}80, ${floorTheme.accent}40)` 
                }}
                animate={{
                  boxShadow: [
                    `0 0 5px ${floorTheme.accent}40`,
                    `0 0 15px ${floorTheme.accent}60`,
                    `0 0 5px ${floorTheme.accent}40`
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>

            {/* Decorative panel lines */}
            <div className="absolute inset-4 space-y-2">
              {[...Array(8)].map((_, i) => (
                <div 
                  key={i} 
                  className="h-0.5 bg-gradient-to-l from-gray-600 to-gray-500 rounded opacity-60" 
                />
              ))}
            </div>
          </div>

          {/* Door edge highlight */}
          <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-gray-400 to-gray-600" />
        </div>
      </motion.div>

      {/* Center door seam when closed */}
      {!isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-full 
                     bg-gradient-to-b from-gray-800 to-gray-900 shadow-2xl z-10"
        />
      )}

      {/* Ambient lighting effects when doors are closed */}
      {!isOpen && (
        <motion.div
          className="absolute inset-0 bg-black/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Door opening light effect */}
      {isOpen && (
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.3, 0] }}
          transition={{ duration: 1.2 }}
          style={{
            background: `radial-gradient(ellipse at center, ${floorTheme.accent}20 0%, transparent 70%)`
          }}
        />
      )}
    </div>
  );
}

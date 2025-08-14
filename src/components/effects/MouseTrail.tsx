'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  timestamp: number;
}

interface MouseTrailProps {
  color?: string;
  particleCount?: number;
  particleLife?: number;
}

export default function MouseTrail({ 
  color = '#00bcd4', 
  particleCount = 15, 
  particleLife = 1000 
}: MouseTrailProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let animationFrameId: number;
    let particleId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      const newParticle: Particle = {
        id: particleId++,
        x: e.clientX,
        y: e.clientY,
        timestamp: Date.now()
      };

      setParticles(prev => {
        const filtered = prev.filter(p => Date.now() - p.timestamp < particleLife);
        return [...filtered, newParticle].slice(-particleCount);
      });
    };

    const updateParticles = () => {
      setParticles(prev => 
        prev.filter(p => Date.now() - p.timestamp < particleLife)
      );
      animationFrameId = requestAnimationFrame(updateParticles);
    };

    document.addEventListener('mousemove', handleMouseMove);
    animationFrameId = requestAnimationFrame(updateParticles);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [particleCount, particleLife]);

  return (
    <>
      {/* Main Cursor */}
      <motion.div
        className="fixed pointer-events-none z-50 mix-blend-difference"
        style={{
          left: mousePosition.x - 8,
          top: mousePosition.y - 8,
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{ duration: 0.5, repeat: Infinity }}
      >
        <div
          className="w-4 h-4 rounded-full border-2 border-white"
          style={{
            boxShadow: `0 0 20px ${color}, inset 0 0 10px ${color}`
          }}
        />
      </motion.div>

      {/* Particle Trail */}
      <AnimatePresence>
        {particles.map((particle, index) => {
          const age = Date.now() - particle.timestamp;
          const progress = age / particleLife;
          const scale = 1 - progress;
          const opacity = 1 - progress;

          return (
            <motion.div
              key={particle.id}
              className="fixed pointer-events-none z-40"
              style={{
                left: particle.x - 6,
                top: particle.y - 6,
              }}
              initial={{ scale: 1, opacity: 1 }}
              animate={{ 
                scale: scale * 0.8,
                opacity: opacity * 0.8,
                rotate: progress * 360
              }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.1 }}
            >
              <motion.div
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: color,
                  boxShadow: `0 0 ${10 * scale}px ${color}`,
                }}
                animate={{
                  boxShadow: [
                    `0 0 ${10 * scale}px ${color}`,
                    `0 0 ${20 * scale}px ${color}`,
                    `0 0 ${10 * scale}px ${color}`
                  ]
                }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Sparkle Effect */}
      <AnimatePresence>
        {particles.filter((_, index) => index % 3 === 0).map((particle) => (
          <motion.div
            key={`sparkle-${particle.id}`}
            className="fixed pointer-events-none z-30"
            style={{
              left: particle.x + Math.random() * 20 - 10,
              top: particle.y + Math.random() * 20 - 10,
            }}
            initial={{ scale: 0, rotate: 0, opacity: 1 }}
            animate={{ 
              scale: [0, 1, 0],
              rotate: [0, 180, 360],
              opacity: [1, 0.5, 0]
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div
              className="w-1 h-1 rounded-full"
              style={{
                backgroundColor: color,
                boxShadow: `0 0 8px ${color}`
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Ripple Effect on Click */}
      <motion.div
        className="fixed pointer-events-none z-20"
        style={{
          left: mousePosition.x - 25,
          top: mousePosition.y - 25,
        }}
        whileTap={{
          scale: [1, 2, 0],
          opacity: [0.5, 0.2, 0]
        }}
        transition={{ duration: 0.6 }}
      >
        <div
          className="w-12 h-12 rounded-full border-2 opacity-0"
          style={{
            borderColor: color,
            boxShadow: `0 0 30px ${color}`
          }}
        />
      </motion.div>
    </>
  );
}

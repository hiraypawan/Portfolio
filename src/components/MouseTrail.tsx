'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TrailParticle {
  id: number;
  x: number;
  y: number;
  emoji: string;
  timestamp: number;
}

const TRAIL_EMOJIS = ['💰', '⭐', '🧠', '🚀', '💎', '⚡', '🔮', '🎯', '💫', '🌟'];
const PARTICLE_LIFETIME = 1500;
const MAX_PARTICLES = 15;

export default function MouseTrail() {
  const [particles, setParticles] = useState<TrailParticle[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const addParticle = useCallback((x: number, y: number) => {
    const newParticle: TrailParticle = {
      id: Date.now() + Math.random(),
      x,
      y,
      emoji: TRAIL_EMOJIS[Math.floor(Math.random() * TRAIL_EMOJIS.length)],
      timestamp: Date.now()
    };

    setParticles(prev => {
      const filtered = prev.filter(p => Date.now() - p.timestamp < PARTICLE_LIFETIME);
      const newParticles = [newParticle, ...filtered];
      return newParticles.slice(0, MAX_PARTICLES);
    });
  }, []);

  useEffect(() => {
    let lastTime = 0;
    const THROTTLE_MS = 100;

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastTime > THROTTLE_MS) {
        setMousePosition({ x: e.clientX, y: e.clientY });
        addParticle(e.clientX, e.clientY);
        lastTime = now;
      }
    };

    // Cleanup old particles periodically
    const cleanupInterval = setInterval(() => {
      setParticles(prev => 
        prev.filter(p => Date.now() - p.timestamp < PARTICLE_LIFETIME)
      );
    }, 500);

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(cleanupInterval);
    };
  }, [addParticle]);

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute text-2xl select-none"
            style={{
              left: particle.x - 12,
              top: particle.y - 12,
            }}
            initial={{
              opacity: 0,
              scale: 0,
              rotate: 0,
            }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [0, 1.2, 1, 0.8],
              rotate: [0, 180, 360],
              y: -50,
            }}
            exit={{
              opacity: 0,
              scale: 0,
            }}
            transition={{
              duration: PARTICLE_LIFETIME / 1000,
              ease: "easeOut",
              times: [0, 0.1, 0.8, 1],
            }}
          >
            {particle.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
      
      {/* Cursor glow effect */}
      <motion.div
        className="absolute w-6 h-6 rounded-full pointer-events-none mix-blend-difference"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
        }}
        animate={{
          background: [
            'radial-gradient(circle, rgba(59,130,246,0.8) 0%, rgba(59,130,246,0) 70%)',
            'radial-gradient(circle, rgba(168,85,247,0.8) 0%, rgba(168,85,247,0) 70%)',
            'radial-gradient(circle, rgba(34,197,94,0.8) 0%, rgba(34,197,94,0) 70%)',
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />
    </div>
  );
}

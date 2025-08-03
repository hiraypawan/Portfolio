'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  char: string;
  color: string;
}

const codeChars = ['<', '>', '{', '}', '(', ')', ';', '=', '+', '-', '*', '/', '$', '@', '#', '💡', '💰', '⚙️', '✨', '🚀', '💻', '🔥', '⭐', '💎', '⚡'];
const colors = ['#0FF0FC', '#FF73FA', '#FBFF7B', '#7DFF6E', '#FF9E64', '#FFFFFF', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'];

export default function AnimatedCursor() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const createParticle = (x: number, y: number) => {
    if (Math.random() < 0.6) {
      const newParticle: Particle = {
        id: Date.now() + Math.random(),
        x,
        y,
        vx: (Math.random() - 0.5) * 6,
        vy: (Math.random() - 0.5) * 6,
        life: 100,
        maxLife: 100,
        char: codeChars[Math.floor(Math.random() * codeChars.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
      };
      
      setParticles(prev => [...prev.slice(-40), newParticle]);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      createParticle(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      if (touch) {
        setMousePos({ x: touch.clientX, y: touch.clientY });
        createParticle(touch.clientX, touch.clientY);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) {
        setMousePos({ x: touch.clientX, y: touch.clientY });
        createParticle(touch.clientX, touch.clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchStart);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => 
        prev
          .map(p => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            life: p.life - 1,
            vy: p.vy + 0.1, // gravity
          }))
          .filter(p => p.life > 0)
      );
    }, 16);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      {/* Main cursor trail */}
      <motion.div
        className="absolute w-6 h-6 border-2 border-blue-400 rounded-full mix-blend-difference"
        animate={{
          x: mousePos.x - 12,
          y: mousePos.y - 12,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 200,
        }}
      />
      
      {/* Code particles */}
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute text-sm font-mono font-bold pointer-events-none select-none"
          style={{
            left: particle.x,
            top: particle.y,
            color: particle.color,
            opacity: particle.life / particle.maxLife,
            textShadow: `0 0 10px ${particle.color}`,
          }}
          initial={{ scale: 0, rotate: 0 }}
          animate={{ 
            scale: 1, 
            rotate: 360,
          }}
          transition={{ duration: 0.5 }}
        >
          {particle.char}
        </motion.div>
      ))}
    </div>
  );
}


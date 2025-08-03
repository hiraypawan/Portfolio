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

const codeChars = ['<', '>', '{', '}', '(', ')', ';', '=', '+', '-', '*', '/', '$', '@', '#', '💡', '💰', '⚙️'];
const colors = ['#0FF0FC', '#FF73FA', '#FBFF7B', '#7DFF6E', '#FF9E64', '#FFFFFF'];

export default function AnimatedCursor() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      // Create new particles on mouse move
      if (Math.random() < 0.3) {
        const newParticle: Particle = {
          id: Date.now() + Math.random(),
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4,
          life: 60,
          maxLife: 60,
          char: codeChars[Math.floor(Math.random() * codeChars.length)],
          color: colors[Math.floor(Math.random() * colors.length)],
        };
        
        setParticles(prev => [...prev.slice(-20), newParticle]);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
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


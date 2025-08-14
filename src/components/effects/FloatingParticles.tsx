'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  angle: number;
}

interface FloatingParticlesProps {
  color?: string;
  count?: number;
  speed?: number;
}

export default function FloatingParticles({ 
  color = '#ffffff', 
  count = 50,
  speed = 1
}: FloatingParticlesProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    const newParticles: Particle[] = [];
    
    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        size: Math.random() * 4 + 1,
        speed: Math.random() * speed + 0.1,
        opacity: Math.random() * 0.5 + 0.1,
        angle: Math.random() * Math.PI * 2
      });
    }
    
    setParticles(newParticles);
  }, [count, speed, dimensions]);

  useEffect(() => {
    const animateParticles = () => {
      setParticles(prev => prev.map(particle => {
        // Calculate new position
        let newX = particle.x + Math.cos(particle.angle) * particle.speed;
        let newY = particle.y + Math.sin(particle.angle) * particle.speed;
        
        // Wrap around screen
        if (newX > dimensions.width) newX = -particle.size;
        if (newX < -particle.size) newX = dimensions.width;
        if (newY > dimensions.height) newY = -particle.size;
        if (newY < -particle.size) newY = dimensions.height;
        
        return {
          ...particle,
          x: newX,
          y: newY,
          angle: particle.angle + 0.01 * particle.speed
        };
      }));
    };

    const interval = setInterval(animateParticles, 50);
    return () => clearInterval(interval);
  }, [dimensions]);

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: color,
            opacity: particle.opacity,
            boxShadow: `0 0 ${particle.size * 2}px ${color}`
          }}
          animate={{
            opacity: [particle.opacity * 0.5, particle.opacity, particle.opacity * 0.5],
            scale: [0.8, 1.2, 0.8],
            boxShadow: [
              `0 0 ${particle.size * 2}px ${color}`,
              `0 0 ${particle.size * 4}px ${color}`,
              `0 0 ${particle.size * 2}px ${color}`
            ]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}

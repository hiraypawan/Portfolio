'use client';

import { motion } from 'framer-motion';

interface ElevatorShellProps {
  currentFloor: number;
}

export default function ElevatorShell({ currentFloor }: ElevatorShellProps) {
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Elevator Interior Walls */}
      <div className="absolute inset-0">
        {/* Left Wall */}
        <motion.div 
          className="absolute left-0 top-0 w-16 h-full bg-gradient-to-r from-gray-800 to-gray-700 
                     border-r border-gray-600 shadow-2xl"
          style={{
            background: 'linear-gradient(90deg, rgba(30,30,30,0.95) 0%, rgba(50,50,50,0.8) 100%)',
            boxShadow: 'inset -10px 0 20px rgba(0,0,0,0.5)'
          }}
        />
        
        {/* Right Wall */}
        <motion.div 
          className="absolute right-0 top-0 w-16 h-full bg-gradient-to-l from-gray-800 to-gray-700 
                     border-l border-gray-600 shadow-2xl"
          style={{
            background: 'linear-gradient(270deg, rgba(30,30,30,0.95) 0%, rgba(50,50,50,0.8) 100%)',
            boxShadow: 'inset 10px 0 20px rgba(0,0,0,0.5)'
          }}
        />
        
        {/* Top Wall/Ceiling */}
        <motion.div 
          className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-gray-800 to-gray-700 
                     border-b border-gray-600"
          style={{
            background: 'linear-gradient(180deg, rgba(20,20,20,0.95) 0%, rgba(40,40,40,0.8) 100%)',
            boxShadow: 'inset 0 -10px 20px rgba(0,0,0,0.5)'
          }}
        />
        
        {/* Bottom Floor */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-900 to-gray-800 
                     border-t border-gray-600"
          style={{
            background: 'linear-gradient(0deg, rgba(15,15,15,0.95) 0%, rgba(35,35,35,0.8) 100%)',
            boxShadow: 'inset 0 10px 20px rgba(0,0,0,0.6)'
          }}
        />
      </div>

      {/* Ceiling Lights */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex space-x-8 z-10">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="w-8 h-2 rounded-full bg-blue-400"
            animate={{
              boxShadow: [
                '0 0 10px rgba(59, 130, 246, 0.8)',
                '0 0 20px rgba(59, 130, 246, 1)',
                '0 0 10px rgba(59, 130, 246, 0.8)'
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3
            }}
            style={{
              background: 'linear-gradient(90deg, rgba(59, 130, 246, 0.8) 0%, rgba(147, 197, 253, 1) 50%, rgba(59, 130, 246, 0.8) 100%)'
            }}
          />
        ))}
      </div>

      {/* Floor Pattern */}
      <div className="absolute bottom-0 left-16 right-16 h-16">
        <div className="w-full h-full opacity-30" 
             style={{
               backgroundImage: `
                 repeating-linear-gradient(
                   45deg,
                   rgba(100,100,100,0.1) 0px,
                   rgba(100,100,100,0.1) 2px,
                   transparent 2px,
                   transparent 12px
                 )
               `
             }}
        />
      </div>

      {/* Ambient Lighting Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle glow around edges */}
        <div className="absolute inset-0 
                        shadow-[inset_0_0_100px_rgba(59,130,246,0.1)]" />
        
        {/* Dynamic floor indicator light */}
        <motion.div
          className="absolute top-8 left-8 w-3 h-3 rounded-full"
          animate={{
            backgroundColor: ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ef4444'],
            boxShadow: [
              '0 0 10px #ef444480',
              '0 0 10px #f59e0b80', 
              '0 0 10px #10b98180',
              '0 0 10px #3b82f680',
              '0 0 10px #8b5cf680',
              '0 0 10px #ef444480'
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Elevator Numbers Display */}
      <div className="absolute top-8 right-8 bg-black/80 border border-gray-600 rounded px-3 py-1">
        <motion.span 
          className="text-green-400 font-mono text-sm"
          animate={{
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity
          }}
        >
          FLOOR {String(currentFloor + 1).padStart(2, '0')}
        </motion.span>
      </div>

      {/* Subtle texture overlay */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(255,255,255,0.05) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(255,255,255,0.03) 0%, transparent 50%)
          `
        }}
      />
    </div>
  );
}

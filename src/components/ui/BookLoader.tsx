'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface BookLoaderProps {
  isLoading: boolean;
  onLoadingComplete: () => void;
}

export default function BookLoader({ isLoading, onLoadingComplete }: BookLoaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(onLoadingComplete, 500);
            return 100;
          }
          return prev + Math.random() * 15;
        });
      }, 200);

      return () => clearInterval(interval);
    }
  }, [isLoading, onLoadingComplete]);

  if (!isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 to-purple-900"
    >
      <div className="text-center">
        {/* Book Animation */}
        <div className="relative mb-8">
          <motion.div
            className="w-32 h-40 bg-gradient-to-br from-blue-600 to-purple-700 rounded-lg shadow-2xl mx-auto"
            animate={{
              rotateY: progress < 50 ? 0 : 180,
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            {/* Book Cover */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg p-4 flex flex-col items-center justify-center text-white">
              <div className="text-xl font-bold mb-2">📚</div>
              <div className="text-xs font-semibold text-center">Developer Portfolio</div>
            </div>
            
            {/* Book Spine */}
            <div className="absolute left-0 top-0 w-2 h-full bg-gradient-to-b from-blue-800 to-purple-800 rounded-l-lg"></div>
          </motion.div>

          {/* Floating Pages */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-2 left-2 w-28 h-36 bg-white/10 rounded border border-white/20"
              animate={{
                x: progress > 30 + i * 20 ? 50 + i * 10 : 0,
                y: progress > 30 + i * 20 ? -10 - i * 5 : 0,
                rotate: progress > 30 + i * 20 ? 15 + i * 5 : 0,
              }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            />
          ))}
        </div>

        {/* Loading Text */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-white mb-4"
        >
          Opening Portfolio Book...
        </motion.h2>

        {/* Progress Bar */}
        <div className="w-64 h-2 bg-white/20 rounded-full mx-auto mb-4 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Progress Text */}
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-white/70 text-sm"
        >
          {progress < 30 ? 'Loading content...' : 
           progress < 70 ? 'Preparing pages...' : 
           'Almost ready...'}
        </motion.p>

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

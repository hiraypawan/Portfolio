'use client';

import { motion } from 'framer-motion';
import { FaCode, FaBrain, FaRocket, FaGithub, FaLinkedin, FaEnvelope, FaGlobe } from 'react-icons/fa';
import { useEffect } from 'react';

interface CoverPageProps {
  onNavigate?: (page: number) => void;
}

const floatingIcons = [
  { icon: FaCode, x: 20, y: 20, delay: 0 },
  { icon: FaBrain, x: 80, y: 30, delay: 0.5 },
  { icon: FaRocket, x: 15, y: 70, delay: 1 },
  { icon: FaCode, x: 85, y: 80, delay: 1.5 },
];

export default function CoverPage({ onNavigate }: CoverPageProps) {
  useEffect(() => {
    // Mouse position tracking for future interactive effects
    const handleMouseMove = () => {
      // Currently unused but ready for enhancement
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 animate-pulse" />
        {/* Floating Background Icons */}
        <div className="hidden sm:block">
          {floatingIcons.slice(0, 2).map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={index}
                className="absolute text-white/10"
                style={{ left: `${item.x}%`, top: `${item.y}%` }}
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 180],
                }}
                transition={{
                  duration: 4,
                  delay: item.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <IconComponent size={30} />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Main Content - Fixed Height, No Scroll */}
      <div className="flex flex-col items-center justify-center text-center z-10 relative w-full h-full max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-white leading-tight"
          >
            Hi, I&apos;m Pawan Hiray <span className="wave">👋</span>
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg md:text-2xl text-gray-200 font-light tracking-wide"
          >
            Tech Builder • Web3 & AI Specialist • Growth Hacker
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-base md:text-lg text-gray-300 leading-relaxed max-w-2xl"
          >
            I&apos;m a multi-skilled developer passionate about building automation tools,
            AI agents, crypto systems, and viral growth tools.
            <span className="text-blue-400 font-semibold"> 30,000+ students</span> trust my work.
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate && onNavigate(3)}
              className="px-8 py-3 text-base bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-xl"
            >
              View My Work
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate && onNavigate(5)}
              className="px-8 py-3 text-base border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300"
            >
              Contact Me
            </motion.button>
          </motion.div>
          
          {/* Social Icons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            className="flex justify-center space-x-6"
          >
            <motion.a
              href="https://github.com/hiraypawan"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 5 }}
              className="text-white/70 hover:text-white transition-colors"
            >
              <FaGithub size={24} />
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/pawanhiray"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: -5 }}
              className="text-white/70 hover:text-blue-400 transition-colors"
            >
              <FaLinkedin size={24} />
            </motion.a>
            <motion.a
              href="mailto:pawanhiray1@gmail.com"
              whileHover={{ scale: 1.2, rotate: 5 }}
              className="text-white/70 hover:text-red-400 transition-colors"
            >
              <FaEnvelope size={24} />
            </motion.a>
            <motion.a
              href="https://pawanhiray.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: -5 }}
              className="text-white/70 hover:text-green-400 transition-colors"
            >
              <FaGlobe size={24} />
            </motion.a>
          </motion.div>
        </motion.div>
        
        {/* Navigation Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-4 text-white/40 text-xs text-center"
        >
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Use navigation arrows to explore →
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

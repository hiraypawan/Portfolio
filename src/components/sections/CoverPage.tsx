'use client';

import { motion } from 'framer-motion';
import { FaCode, FaBrain, FaRocket, FaGithub, FaLinkedin, FaEnvelope, FaGlobe } from 'react-icons/fa';
import { useEffect, useState } from 'react';

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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col justify-center items-center p-2 sm:p-4 min-h-screen">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 animate-pulse" />
        {/* Floating Background Icons - Smaller and fewer for card layout */}
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

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center text-center z-10 relative w-full">
        {/* Glassmorphism Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 md:p-12 shadow-2xl w-full max-w-full"
          style={{ minHeight: 'fit-content' }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-bold text-white mb-4 font-space-grotesk"
            style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)' }}
          >
            Hi, I&apos;m Pawan Hiray <span className="wave">👋</span>
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-base sm:text-lg md:text-xl text-gray-100 mb-6 font-light"
          >
            Tech Builder • Web3 & AI Specialist • Growth Hacker
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="text-gray-200 text-sm sm:text-base md:text-lg leading-relaxed mb-8"
          >
            I&apos;m a multi-skilled developer passionate about building automation tools,
            <br />
            AI agents, crypto systems, and viral growth tools.
            <br />
            <span className="text-blue-300 font-semibold">30,000+ students</span> trust my work at MuStudentsUnited.
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 mb-8"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate && onNavigate(3)}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg"
            >
              View My Work
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate && onNavigate(5)}
              className="px-8 py-3 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300"
            >
              Contact Me
            </motion.button>
          </motion.div>
          
          {/* Social Icons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
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
          
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="mt-8 flex justify-center space-x-6"
          >
            <div className="flex items-center space-x-2 text-blue-300">
              <FaCode className="animate-pulse" />
              <span className="text-sm">Developer</span>
            </div>
            <div className="flex items-center space-x-2 text-purple-300">
              <FaBrain className="animate-pulse" />
              <span className="text-sm">AI Expert</span>
            </div>
            <div className="flex items-center space-x-2 text-pink-300">
              <FaRocket className="animate-pulse" />
              <span className="text-sm">Innovator</span>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 text-white/60 text-sm"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center"
          >
            <span>Navigate with arrows</span>
            <div className="mt-2 text-2xl">→</div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { MapLocation, UserProgress } from '@/data/mapData';
import { FaTimes, FaExternalLinkAlt, FaGithub, FaTrophy, FaGem } from 'react-icons/fa';
import { useEffect, useState } from 'react';

interface LocationModalProps {
  location: MapLocation | null;
  onClose: () => void;
  userProgress: UserProgress;
  onProgressUpdate: (progress: UserProgress) => void;
}

export default function LocationModal({
  location,
  onClose,
  userProgress,
  onProgressUpdate
}: LocationModalProps) {
  const [treasureOpened, setTreasureOpened] = useState(false);

  useEffect(() => {
    if (location) {
      setTreasureOpened(false);
    }
  }, [location]);

  if (!location) return null;

  const handleTreasureOpen = () => {
    if (location.treasure && !treasureOpened) {
      setTreasureOpened(true);
      
      // Add achievement
      const newProgress = {
        ...userProgress,
        achievementsUnlocked: [...userProgress.achievementsUnlocked, location.id]
      };
      onProgressUpdate(newProgress);
    }
  };

  const IconComponent = location.icon;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-2xl 
            border border-purple-500/30 max-w-2xl w-full max-h-[80vh] overflow-hidden
            shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative p-6 border-b border-white/10">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${location.color} 
                  flex items-center justify-center shadow-lg`}
                  style={{ boxShadow: `0 0 20px ${location.glowColor}` }}>
                  <IconComponent className="text-white text-2xl" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {location.content.title}
                  </h2>
                  {location.content.subtitle && (
                    <p className="text-gray-300 text-lg">
                      {location.content.subtitle}
                    </p>
                  )}
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaTimes size={24} />
              </motion.button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 max-h-96 overflow-y-auto custom-scrollbar">
            {/* Description */}
            <div className="mb-6">
              <p className="text-gray-300 leading-relaxed text-lg">
                {location.content.description}
              </p>
            </div>

            {/* Stats */}
            {location.content.stats && (
              <div className="mb-6">
                <div className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${location.color} 
                  text-white font-semibold shadow-lg`}>
                  {location.content.stats}
                </div>
              </div>
            )}

            {/* Technologies */}
            {location.content.technologies && (
              <div className="mb-6">
                <h3 className="text-white font-semibold mb-3 flex items-center">
                  <span className="mr-2">🛠️</span>
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {location.content.technologies.map((tech, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full 
                        text-sm text-gray-200 hover:bg-white/20 transition-colors"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            )}

            {/* Details */}
            {location.content.details && (
              <div className="mb-6">
                <h3 className="text-white font-semibold mb-3 flex items-center">
                  <span className="mr-2">📋</span>
                  Key Features
                </h3>
                <div className="space-y-2">
                  {location.content.details.map((detail, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="text-gray-300 flex items-start"
                    >
                      <span className="mr-2 mt-1">•</span>
                      <span>{detail}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Links */}
            {location.content.links && (
              <div className="mb-6">
                <h3 className="text-white font-semibold mb-3 flex items-center">
                  <span className="mr-2">🔗</span>
                  Links
                </h3>
                <div className="flex flex-wrap gap-3">
                  {location.content.links.live && (
                    <motion.a
                      href={location.content.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r 
                        from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg 
                        transition-all"
                    >
                      <FaExternalLinkAlt size={14} />
                      Live Demo
                    </motion.a>
                  )}
                  {location.content.links.github && location.content.links.github !== '#' && (
                    <motion.a
                      href={location.content.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-700 
                        text-white rounded-lg hover:bg-gray-600 transition-all"
                    >
                      <FaGithub size={14} />
                      Source Code
                    </motion.a>
                  )}
                </div>
              </div>
            )}

            {/* Treasure Chest */}
            {location.treasure && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mb-6"
              >
                <h3 className="text-yellow-400 font-semibold mb-3 flex items-center">
                  <span className="mr-2">💎</span>
                  Hidden Treasure
                </h3>
                
                {!treasureOpened ? (
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="bg-gradient-to-r from-yellow-600/20 to-orange-600/20 
                      rounded-lg p-4 border border-yellow-500/30 backdrop-blur-sm">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-300 mb-2">
                            A mysterious {location.treasure.type} awaits...
                          </p>
                          <p className="text-sm text-gray-400">
                            Click to open and discover what's inside!
                          </p>
                        </div>
                        <motion.button
                          onClick={handleTreasureOpen}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          whileTap={{ scale: 0.9 }}
                          className="text-6xl hover:text-yellow-300 transition-colors"
                          animate={{
                            rotate: [0, -5, 5, -5, 0],
                            scale: [1, 1.1, 1]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 3
                          }}
                        >
                          📦
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 
                      rounded-lg p-4 border border-yellow-400/50 backdrop-blur-sm"
                  >
                    <div className="text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-6xl mb-3"
                      >
                        🎉
                      </motion.div>
                      <h4 className="text-yellow-400 font-bold text-lg mb-2">
                        Treasure Unlocked!
                      </h4>
                      <p className="text-gray-300">
                        {location.treasure.reward}
                      </p>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="mt-3 flex items-center justify-center gap-2 
                          text-sm text-yellow-400"
                      >
                        <FaTrophy />
                        <span>Achievement Unlocked!</span>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Experience Progress */}
            <div className="text-center pt-4 border-t border-white/10">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-gray-400"
              >
                🎯 Location explored • +10 XP earned
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

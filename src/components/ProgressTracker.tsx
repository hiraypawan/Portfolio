'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { UserProgress } from '@/data/mapData';
import { FaMap, FaGem } from 'react-icons/fa';
import { useState } from 'react';

interface ProgressTrackerProps {
  progress: UserProgress;
  totalLocations: number;
}

export default function ProgressTracker({ progress, totalLocations }: ProgressTrackerProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const visitedPercentage = Math.round((progress.visitedLocations.length / totalLocations) * 100);
  const treasuresFound = progress.achievementsUnlocked.length;

  const getExplorerLevel = () => {
    if (visitedPercentage < 20) return { level: "Novice Explorer", icon: "🗺️" };
    if (visitedPercentage < 50) return { level: "Adventure Seeker", icon: "🧭" };
    if (visitedPercentage < 80) return { level: "Treasure Hunter", icon: "💎" };
    return { level: "Master Explorer", icon: "👑" };
  };

  const explorerInfo = getExplorerLevel();

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <motion.div
        className="bg-black/80 backdrop-blur-sm border border-white/20 rounded-2xl 
          text-white shadow-xl"
        whileHover={{ scale: 1.02 }}
      >
        {/* Collapsed View */}
        <motion.div
          className="p-4 cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
          whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
        >
          <div className="flex items-center gap-3">
            <div className="text-2xl">{explorerInfo.icon}</div>
            <div>
              <div className="font-semibold text-sm">{explorerInfo.level}</div>
              <div className="text-xs text-gray-300">
                {progress.visitedLocations.length}/{totalLocations} locations
              </div>
            </div>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              className="text-gray-400"
            >
              ▼
            </motion.div>
          </div>
        </motion.div>

        {/* Expanded View */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-white/10"
            >
              <div className="p-4 space-y-4">
                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Exploration Progress</span>
                    <span className="text-sm text-gray-300">{visitedPercentage}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${visitedPercentage}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                    />
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {/* Locations Visited */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white/5 rounded-lg p-3 text-center"
                  >
                    <div className="text-blue-400 mb-1">
                      <FaMap size={16} className="mx-auto" />
                    </div>
                    <div className="text-lg font-bold">{progress.visitedLocations.length}</div>
                    <div className="text-xs text-gray-400">Locations</div>
                  </motion.div>

                  {/* Treasures Found */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white/5 rounded-lg p-3 text-center"
                  >
                    <div className="text-yellow-400 mb-1">
                      <FaGem size={16} className="mx-auto" />
                    </div>
                    <div className="text-lg font-bold">{treasuresFound}</div>
                    <div className="text-xs text-gray-400">Treasures</div>
                  </motion.div>
                </div>

                {/* Achievement Badges */}
                {treasuresFound > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="text-sm font-medium mb-2 text-yellow-400">
                      🏆 Recent Achievements
                    </div>
                    <div className="space-y-1 max-h-20 overflow-y-auto custom-scrollbar">
                      {progress.achievementsUnlocked.slice(-3).map((achievementId, index) => (
                        <motion.div
                          key={achievementId}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + index * 0.1 }}
                          className="text-xs text-gray-300 flex items-center gap-2"
                        >
                          <span className="text-yellow-400">✨</span>
                          <span>Treasure discovered!</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Next Milestone */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="border-t border-white/10 pt-3"
                >
                  <div className="text-xs text-gray-400 text-center">
                    {visitedPercentage < 100 ? (
                      <>
                        {totalLocations - progress.visitedLocations.length} more locations to discover!
                      </>
                    ) : (
                      <>
                        🎉 All locations discovered! You&apos;re a Master Explorer!
                      </>
                    )}
                  </div>
                </motion.div>

                {/* Fun Stats */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-xs text-center text-gray-500"
                >
                  Explorer since your first click 🚀
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Mini celebration when milestones are reached */}
      {visitedPercentage === 100 && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          className="absolute -top-16 left-1/2 transform -translate-x-1/2 
            bg-gradient-to-r from-yellow-400 to-orange-500 text-black 
            px-4 py-2 rounded-lg font-bold shadow-lg"
        >
          🎉 100% Complete!
        </motion.div>
      )}
    </div>
  );
}

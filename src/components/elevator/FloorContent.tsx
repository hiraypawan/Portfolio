'use client';

import { motion } from 'framer-motion';
import { FloorData } from '@/data/elevatorData';

interface FloorContentProps {
  floorData: FloorData;
}

export default function FloorContent({ floorData }: FloorContentProps) {
  return (
    <div className="flex items-center justify-center h-screen p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl w-full h-full flex flex-col"
      >
        {/* Main Content Card */}
        <motion.div
          className="bg-black/80 backdrop-blur-sm border-2 rounded-2xl p-6 shadow-2xl flex-1 overflow-hidden"
          style={{
            borderColor: floorData.theme.accent + '60',
            boxShadow: `0 0 50px ${floorData.theme.accent}30`
          }}
          animate={{
            borderColor: floorData.theme.accent + '60',
            boxShadow: `0 0 50px ${floorData.theme.accent}30`
          }}
        >
          {/* Enhanced Two-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
            {/* Left Column - Main Info */}
            <div className="space-y-6">
              {/* Header Section */}
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
              >
                <motion.h1 
                  className="text-6xl md:text-8xl font-bold mb-4"
                  style={{ 
                    background: `linear-gradient(135deg, ${floorData.theme.primary})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                  animate={{
                    backgroundImage: `linear-gradient(135deg, ${floorData.theme.primary})`,
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ scale: { duration: 3, repeat: Infinity } }}
                >
                  {floorData.title}
                </motion.h1>
                
                <motion.h2 
                  className="text-3xl md:text-4xl font-semibold text-white mb-3"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, type: "spring", stiffness: 80 }}
                  whileHover={{ scale: 1.02 }}
                >
                  {floorData.subtitle}
                </motion.h2>
              </motion.div>

              {/* Stats Row */}
              {floorData.stats && (
                <motion.div 
                  className="flex justify-center space-x-8"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, staggerChildren: 0.1 }}
                >
                  {floorData.stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      className="text-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.1, type: "spring" }}
                      whileHover={{ 
                        scale: 1.15,
                        rotate: [0, -2, 2, 0],
                        transition: { rotate: { duration: 0.3 } }
                      }}
                    >
                      <motion.div 
                        className="text-3xl font-bold mb-2"
                        style={{ color: floorData.theme.accent }}
                        animate={{
                          textShadow: [
                            `0 0 10px ${floorData.theme.accent}50`,
                            `0 0 20px ${floorData.theme.accent}80`,
                            `0 0 10px ${floorData.theme.accent}50`
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {stat.value}
                      </motion.div>
                      <div className="text-sm text-gray-300 uppercase tracking-wider font-medium">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* Description */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, type: "spring", stiffness: 120 }}
                className="relative"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r opacity-20 rounded-lg"
                  style={{ background: `linear-gradient(45deg, ${floorData.theme.primary})` }}
                  animate={{ opacity: [0.1, 0.3, 0.1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <p className="text-gray-100 text-lg leading-relaxed text-center relative z-10 p-4 font-medium">
                  {floorData.description}
                </p>
              </motion.div>

              {/* Highlights Row */}
              <motion.div 
                className="flex flex-wrap justify-center gap-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, staggerChildren: 0.1 }}
              >
                {floorData.highlights.map((highlight, index) => {
                  const IconComponent = highlight.icon;
                  return (
                    <motion.div
                      key={highlight.text}
                      className="flex items-center space-x-3 bg-gray-900/70 rounded-xl p-4 border text-base"
                      style={{ borderColor: floorData.theme.accent + '40' }}
                      initial={{ opacity: 0, rotate: -10, scale: 0.8 }}
                      animate={{ opacity: 1, rotate: 0, scale: 1 }}
                      transition={{ 
                        delay: 1.1 + index * 0.1, 
                        type: "spring", 
                        stiffness: 150 
                      }}
                      whileHover={{ 
                        scale: 1.1,
                        rotate: [0, -2, 2, 0],
                        borderColor: floorData.theme.accent + '90',
                        boxShadow: `0 0 25px ${floorData.theme.accent}40`
                      }}
                    >
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      >
                        <IconComponent 
                          className="text-2xl"
                          style={{ color: floorData.theme.accent }}
                        />
                      </motion.div>
                      <span className="text-gray-100 font-semibold text-lg">
                        {highlight.text}
                      </span>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

            {/* Right Column - Achievements & Tech */}
            <div className="space-y-6">
              {/* Key Achievements */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3, type: "spring", stiffness: 80 }}
              >
                <motion.h3 
                  className="text-2xl font-bold text-white mb-6 text-center"
                  animate={{
                    textShadow: [
                      `0 0 10px ${floorData.theme.accent}30`,
                      `0 0 20px ${floorData.theme.accent}60`,
                      `0 0 10px ${floorData.theme.accent}30`
                    ]
                  }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                >
                  Key Achievements
                </motion.h3>
                <div className="space-y-4">
                  {floorData.keyAchievements.map((achievement, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start space-x-4 p-4 bg-gray-900/50 rounded-xl border backdrop-blur-sm"
                      style={{ borderColor: floorData.theme.accent + '30' }}
                      initial={{ opacity: 0, x: 30, scale: 0.9 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      transition={{ 
                        delay: 1.4 + index * 0.15, 
                        type: "spring", 
                        stiffness: 100 
                      }}
                      whileHover={{
                        borderColor: floorData.theme.accent + '70',
                        scale: 1.03,
                        boxShadow: `0 0 30px ${floorData.theme.accent}20`,
                        backgroundColor: 'rgba(17, 24, 39, 0.7)'
                      }}
                    >
                      <motion.div 
                        className="w-3 h-3 rounded-full mt-2 flex-shrink-0"
                        style={{ backgroundColor: floorData.theme.accent }}
                        animate={{
                          boxShadow: [
                            `0 0 5px ${floorData.theme.accent}`,
                            `0 0 15px ${floorData.theme.accent}`,
                            `0 0 5px ${floorData.theme.accent}`
                          ],
                          scale: [1, 1.2, 1]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <p className="text-gray-100 text-base leading-relaxed font-medium">
                        {achievement}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Technologies */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8, type: "spring", stiffness: 100 }}
              >
                <motion.h3 
                  className="text-2xl font-bold text-white mb-6 text-center"
                  animate={{
                    textShadow: [
                      `0 0 10px ${floorData.theme.accent}30`,
                      `0 0 20px ${floorData.theme.accent}60`,
                      `0 0 10px ${floorData.theme.accent}30`
                    ]
                  }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                >
                  Technologies & Tools
                </motion.h3>
                <div className="flex flex-wrap justify-center gap-3">
                  {floorData.technologies.map((tech, index) => (
                    <motion.span
                      key={tech}
                      className="px-4 py-2 bg-gray-900/60 rounded-full text-base font-semibold border"
                      style={{ 
                        borderColor: floorData.theme.accent + '40',
                        color: floorData.theme.accent 
                      }}
                      initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      transition={{ 
                        delay: 1.9 + index * 0.08, 
                        type: "spring", 
                        stiffness: 150 
                      }}
                      whileHover={{
                        scale: 1.15,
                        rotate: [0, -3, 3, 0],
                        borderColor: floorData.theme.accent + '90',
                        boxShadow: `0 0 20px ${floorData.theme.accent}40`,
                        backgroundColor: `${floorData.theme.accent}10`
                      }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Navigation Hint */}
        <motion.div 
          className="text-center mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <p className="text-gray-400 text-sm">
            Use the control panel to explore other floors of my journey
          </p>
          <motion.div
            className="inline-block mt-2"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ⬇️
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

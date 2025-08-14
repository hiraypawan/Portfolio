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
          {/* Compact Two-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
            {/* Left Column - Main Info */}
            <div className="space-y-4">
              {/* Header Section */}
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <motion.h1 
                  className="text-4xl md:text-5xl font-bold mb-2"
                  style={{ 
                    background: `linear-gradient(135deg, ${floorData.theme.primary})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                  animate={{
                    backgroundImage: `linear-gradient(135deg, ${floorData.theme.primary})`
                  }}
                >
                  {floorData.year}
                </motion.h1>
                
                <motion.h2 
                  className="text-xl md:text-2xl font-semibold text-white mb-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {floorData.title}
                </motion.h2>
                
                <motion.p 
                  className="text-gray-300 text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {floorData.subtitle}
                </motion.p>
              </motion.div>

              {/* Stats Row */}
              {floorData.stats && (
                <motion.div 
                  className="flex justify-center space-x-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  {floorData.stats.map((stat) => (
                    <motion.div
                      key={stat.label}
                      className="text-center"
                      whileHover={{ scale: 1.1 }}
                    >
                      <div 
                        className="text-xl font-bold mb-1"
                        style={{ color: floorData.theme.accent }}
                      >
                        {stat.value}
                      </div>
                      <div className="text-xs text-gray-400 uppercase tracking-wider">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* Description */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <p className="text-gray-200 text-sm leading-relaxed text-center">
                  {floorData.description}
                </p>
              </motion.div>

              {/* Highlights Row */}
              <motion.div 
                className="flex flex-wrap justify-center gap-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                {floorData.highlights.map((highlight, index) => {
                  const IconComponent = highlight.icon;
                  return (
                    <motion.div
                      key={highlight.text}
                      className="flex items-center space-x-2 bg-gray-900/60 rounded-lg p-2 border text-xs"
                      style={{ borderColor: floorData.theme.accent + '40' }}
                      whileHover={{ 
                        scale: 1.05,
                        borderColor: floorData.theme.accent + '80'
                      }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                    >
                      <IconComponent 
                        className="text-sm"
                        style={{ color: floorData.theme.accent }}
                      />
                      <span className="text-gray-200 font-medium">
                        {highlight.text}
                      </span>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

            {/* Right Column - Achievements & Tech */}
            <div className="space-y-4">
              {/* Key Achievements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <h3 className="text-lg font-semibold text-white mb-3 text-center">
                  Key Achievements
                </h3>
                <div className="space-y-2">
                  {floorData.keyAchievements.map((achievement, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start space-x-2 p-3 bg-gray-900/40 rounded-lg border"
                      style={{ borderColor: floorData.theme.accent + '30' }}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1 + index * 0.1 }}
                      whileHover={{
                        borderColor: floorData.theme.accent + '60',
                        scale: 1.02
                      }}
                    >
                      <motion.div 
                        className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                        style={{ backgroundColor: floorData.theme.accent }}
                        animate={{
                          boxShadow: [
                            `0 0 3px ${floorData.theme.accent}`,
                            `0 0 8px ${floorData.theme.accent}`,
                            `0 0 3px ${floorData.theme.accent}`
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <p className="text-gray-200 text-xs leading-relaxed">
                        {achievement}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Technologies */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
              >
                <h3 className="text-lg font-semibold text-white mb-3 text-center">
                  Technologies & Tools
                </h3>
                <div className="flex flex-wrap justify-center gap-2">
                  {floorData.technologies.map((tech, index) => (
                    <motion.span
                      key={tech}
                      className="px-3 py-1 bg-gray-900/60 rounded-full text-xs font-medium border"
                      style={{ 
                        borderColor: floorData.theme.accent + '40',
                        color: floorData.theme.accent 
                      }}
                      whileHover={{
                        scale: 1.1,
                        borderColor: floorData.theme.accent + '80',
                        boxShadow: `0 0 15px ${floorData.theme.accent}30`
                      }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.3 + index * 0.05 }}
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

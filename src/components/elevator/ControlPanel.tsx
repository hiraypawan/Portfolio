'use client';

import { motion } from 'framer-motion';
import { FloorData } from '@/data/elevatorData';

interface ControlPanelProps {
  floors: FloorData[];
  currentFloor: number;
  onFloorSelect: (floorIndex: number) => void;
  isMoving: boolean;
}

export default function ControlPanel({ floors, currentFloor, onFloorSelect, isMoving }: ControlPanelProps) {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.8 }}
      className="bg-black/90 backdrop-blur-sm border border-gray-600 rounded-lg p-4 shadow-2xl
                 md:max-w-xs w-full"
    >
      {/* Panel Header */}
      <motion.div 
        className="mb-6 text-center"
        animate={{
          textShadow: [
            `0 0 10px ${floors[currentFloor].theme.accent}30`,
            `0 0 20px ${floors[currentFloor].theme.accent}60`,
            `0 0 10px ${floors[currentFloor].theme.accent}30`
          ]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <h3 className="text-white font-bold text-xl mb-3">PORTFOLIO SECTIONS</h3>
        <motion.div 
          className="h-1 bg-gradient-to-r from-transparent via-gray-400 to-transparent rounded-full"
          animate={{
            background: `linear-gradient(90deg, transparent, ${floors[currentFloor].theme.accent}, transparent)`
          }}
        />
      </motion.div>

      {/* Floor Buttons Grid */}
      <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
        {floors.map((floor, index) => {
          const isActive = index === currentFloor;
          const isDisabled = isMoving;
          
          return (
            <motion.button
              key={floor.year}
              onClick={() => !isDisabled && onFloorSelect(index)}
              disabled={isDisabled}
              className={`
                relative h-20 rounded-xl border-3 font-bold text-lg transition-all duration-500 overflow-hidden
                ${isActive 
                  ? 'bg-gradient-to-br shadow-2xl transform scale-105' 
                  : 'bg-gray-800/60 hover:bg-gray-700/80 hover:scale-102'
                }
                ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:shadow-xl'}
              `}
              style={{
                borderColor: isActive ? floor.theme.accent : '#6b7280',
                background: isActive 
                  ? `linear-gradient(135deg, ${floor.theme.primary})` 
                  : undefined,
                boxShadow: isActive 
                  ? `0 0 30px ${floor.theme.accent}60, inset 0 3px 15px rgba(255,255,255,0.1)` 
                  : 'inset 0 3px 15px rgba(0,0,0,0.4)'
              }}
              whileHover={!isDisabled ? { 
                scale: 1.08, 
                rotateY: 5,
                boxShadow: `0 10px 30px ${floor.theme.accent}40`
              } : {}}
              whileTap={!isDisabled ? { scale: 0.98 } : {}}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
            >
              {/* Background Animation */}
              <motion.div
                className="absolute inset-0 opacity-30"
                style={{
                  background: `linear-gradient(45deg, ${floor.theme.primary})`
                }}
                animate={{
                  opacity: isActive ? [0.2, 0.4, 0.2] : 0.1
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              {/* Button glow effect when active */}
              {isActive && (
                <motion.div
                  className="absolute inset-0 rounded-xl"
                  animate={{
                    boxShadow: [
                      `0 0 20px ${floor.theme.accent}50`,
                      `0 0 40px ${floor.theme.accent}90`,
                      `0 0 20px ${floor.theme.accent}50`
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
              
              {/* Button Content */}
              <div className="relative z-10 flex flex-col items-center justify-center h-full px-2">
                <motion.div 
                  className={`text-2xl font-bold mb-1 ${isActive ? 'text-white' : 'text-gray-200'}`}
                  animate={isActive ? {
                    textShadow: [
                      `0 0 5px ${floor.theme.accent}`,
                      `0 0 15px ${floor.theme.accent}`,
                      `0 0 5px ${floor.theme.accent}`
                    ]
                  } : {}}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  {floor.title}
                </motion.div>
                <div className={`text-sm text-center leading-tight ${isActive ? 'text-gray-100' : 'text-gray-400'}`}>
                  {floor.subtitle}
                </div>
              </div>

              {/* Active indicator */}
              {isActive && (
                <motion.div
                  className="absolute top-2 right-2 w-4 h-4 rounded-full"
                  style={{ backgroundColor: floor.theme.accent }}
                  animate={{
                    opacity: [0.5, 1, 0.5],
                    scale: [0.8, 1.3, 0.8],
                    boxShadow: [
                      `0 0 5px ${floor.theme.accent}`,
                      `0 0 20px ${floor.theme.accent}`,
                      `0 0 5px ${floor.theme.accent}`
                    ]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
              
              {/* Hover particles effect */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                whileHover={{
                  background: `radial-gradient(circle at center, ${floor.theme.accent}20, transparent)`
                }}
              />
            </motion.button>
          );
        })}
      </div>

      {/* Current Floor Info */}
      <motion.div 
        className="mt-4 p-3 bg-gray-900/80 rounded-lg border border-gray-700"
        animate={{
          borderColor: floors[currentFloor].theme.accent + '40'
        }}
      >
        <div className="text-center">
          <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">
            CURRENT FLOOR
          </div>
          <motion.div 
            className="text-xl font-bold mb-1"
            style={{ color: floors[currentFloor].theme.accent }}
            animate={{ color: floors[currentFloor].theme.accent }}
          >
            {floors[currentFloor].year}
          </motion.div>
          <div className="text-xs text-gray-500">
            {floors[currentFloor].title}
          </div>
        </div>
      </motion.div>

      {/* Emergency Controls */}
      <div className="mt-3 flex justify-center space-x-2">
        <motion.div
          className="w-3 h-3 rounded-full bg-red-500"
          animate={{
            opacity: [0.5, 1, 0.5],
            boxShadow: ['0 0 5px #ef444480', '0 0 15px #ef4444', '0 0 5px #ef444480']
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div
          className="w-3 h-3 rounded-full bg-yellow-500"
          animate={{
            opacity: [0.3, 0.8, 0.3],
            boxShadow: ['0 0 5px #f59e0b80', '0 0 10px #f59e0b', '0 0 5px #f59e0b80']
          }}
          transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
        />
        <motion.div
          className="w-3 h-3 rounded-full bg-green-500"
          animate={{
            opacity: [0.4, 0.9, 0.4],
            boxShadow: ['0 0 5px #10b98180', '0 0 12px #10b981', '0 0 5px #10b98180']
          }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
        />
      </div>
    </motion.div>
  );
}

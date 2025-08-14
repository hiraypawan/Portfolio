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
      <div className="mb-4 text-center">
        <h3 className="text-white font-bold text-sm mb-1">FLOOR SELECTION</h3>
        <div className="h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent" />
      </div>

      {/* Floor Buttons Grid */}
      <div className="grid grid-cols-4 md:grid-cols-2 gap-2">
        {floors.map((floor, index) => {
          const isActive = index === currentFloor;
          const isDisabled = isMoving;
          
          return (
            <motion.button
              key={floor.year}
              onClick={() => !isDisabled && onFloorSelect(index)}
              disabled={isDisabled}
              className={`
                relative h-12 rounded-lg border-2 font-bold text-sm transition-all duration-300
                ${isActive 
                  ? 'bg-gradient-to-br shadow-lg transform scale-105' 
                  : 'bg-gray-800/50 hover:bg-gray-700/70'
                }
                ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              `}
              style={{
                borderColor: isActive ? floor.theme.accent : '#4b5563',
                background: isActive 
                  ? `linear-gradient(135deg, ${floor.theme.primary})` 
                  : undefined,
                boxShadow: isActive 
                  ? `0 0 20px ${floor.theme.accent}50, inset 0 2px 10px rgba(255,255,255,0.1)` 
                  : 'inset 0 2px 10px rgba(0,0,0,0.3)'
              }}
              whileHover={!isDisabled ? { scale: 1.05 } : {}}
              whileTap={!isDisabled ? { scale: 0.95 } : {}}
            >
              {/* Button glow effect when active */}
              {isActive && (
                <motion.div
                  className="absolute inset-0 rounded-lg"
                  animate={{
                    boxShadow: [
                      `0 0 20px ${floor.theme.accent}50`,
                      `0 0 30px ${floor.theme.accent}80`,
                      `0 0 20px ${floor.theme.accent}50`
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
              
              {/* Button Content */}
              <div className="relative z-10 flex flex-col items-center justify-center h-full">
                <div className={`text-lg font-bold ${isActive ? 'text-white' : 'text-gray-300'}`}>
                  {floor.year}
                </div>
                <div className={`text-xs ${isActive ? 'text-gray-200' : 'text-gray-500'}`}>
                  AGE {floor.age}
                </div>
              </div>

              {/* Active indicator dot */}
              {isActive && (
                <motion.div
                  className="absolute top-1 right-1 w-2 h-2 rounded-full"
                  style={{ backgroundColor: floor.theme.accent }}
                  animate={{
                    opacity: [0.5, 1, 0.5],
                    scale: [0.8, 1.2, 0.8]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
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

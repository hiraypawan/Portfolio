'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { elevatorFloors, elevatorConfig } from '@/data/elevatorData';
import ElevatorShell from './elevator/ElevatorShell';
import ControlPanel from './elevator/ControlPanel';
import FloorContent from './elevator/FloorContent';
import DoorAnimation from './elevator/DoorAnimation';
import { useElevatorSounds } from '@/hooks/useSoundEffects';

export default function ElevatorPortfolio() {
  const [currentFloor, setCurrentFloor] = useState(0); // Start at 2018 (index 0)
  const [isMoving, setIsMoving] = useState(false);
  const [doorsOpen, setDoorsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { playElevatorSound } = useElevatorSounds();

  // Initialize elevator
  useEffect(() => {
    const initTimer = setTimeout(() => {
      setIsLoading(false);
      setDoorsOpen(true);
      playElevatorSound('arrival');
    }, 1000);

    return () => clearTimeout(initTimer);
  }, [playElevatorSound]);

  const moveToFloor = (floorIndex: number) => {
    if (floorIndex === currentFloor || isMoving) return;

    // Start moving sequence
    setIsMoving(true);
    setDoorsOpen(false);
    playElevatorSound('doors_close');

    // Play movement sound after doors close
    setTimeout(() => {
      playElevatorSound('moving');
    }, elevatorConfig.doorAnimationDuration * 1000);

    // Move to new floor
    setTimeout(() => {
      setCurrentFloor(floorIndex);
      setIsMoving(false);
      
      // Open doors and play arrival sound
      setTimeout(() => {
        setDoorsOpen(true);
        playElevatorSound('arrival');
      }, 200);
    }, elevatorConfig.transitionDuration * 1000);
  };

  const currentFloorData = elevatorFloors[currentFloor];

  return (
    <div className="relative w-full min-h-screen overflow-auto bg-black">
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          >
            <div className="text-center">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-6xl mb-4"
              >
                🚡
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl font-bold text-white mb-2"
              >
                Welcome to the Journey
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-gray-400"
              >
                Preparing your futuristic elevator experience...
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Elevator Interface */}
      <div className="relative w-full min-h-screen">
        {/* Elevator Shell with Dynamic Background */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${currentFloorData.theme.background})`
          }}
          animate={{
            background: `linear-gradient(135deg, ${currentFloorData.theme.background})`
          }}
          transition={{ duration: 1 }}
        >
          <ElevatorShell currentFloor={currentFloor} />
        </motion.div>

        {/* Door Animation Overlay */}
        <DoorAnimation 
          isOpen={doorsOpen} 
          floorTheme={currentFloorData.theme}
        />

        {/* Floor Content */}
        <AnimatePresence mode="wait">
          {doorsOpen && !isMoving && (
            <motion.div
              key={currentFloor}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative z-30 w-full"
            >
              <FloorContent floorData={currentFloorData} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Control Panel */}
        <div className="absolute bottom-0 left-0 right-0 md:bottom-4 md:left-4 md:right-auto z-40">
          <ControlPanel
            floors={elevatorFloors}
            currentFloor={currentFloor}
            onFloorSelect={moveToFloor}
            isMoving={isMoving}
          />
        </div>

        {/* Floor Indicator (Top Right) */}
        <motion.div
          className="absolute top-4 right-4 z-40 bg-black/80 backdrop-blur-sm border border-gray-600 rounded-lg px-4 py-2"
          animate={{
            borderColor: currentFloorData.theme.accent,
            boxShadow: `0 0 20px ${currentFloorData.theme.accent}30`
          }}
        >
          <div className="text-center">
            <motion.div
              className="text-2xl font-bold mb-1"
              style={{ color: currentFloorData.theme.accent }}
              animate={{ color: currentFloorData.theme.accent }}
            >
              {currentFloorData.year}
            </motion.div>
            <div className="text-xs text-gray-400 uppercase tracking-wider">
              FLOOR {currentFloor + 1}
            </div>
          </div>
        </motion.div>

        {/* Moving Indicator */}
        <AnimatePresence>
          {isMoving && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 
                         bg-black/90 backdrop-blur-sm border border-gray-600 rounded-xl px-8 py-4"
            >
              <div className="flex items-center space-x-3">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full"
                />
                <div className="text-white font-medium">
                  Moving to {elevatorFloors[currentFloor]?.year}...
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

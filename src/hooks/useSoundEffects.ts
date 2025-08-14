'use client';

import { useCallback } from 'react';

// Elevator sound effects paths - you can replace these with actual audio files later
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ELEVATOR_SOUNDS = {
  doors_open: '/sounds/elevator/doors-open.mp3',
  doors_close: '/sounds/elevator/doors-close.mp3',
  moving: '/sounds/elevator/moving.mp3',
  arrival: '/sounds/elevator/arrival-ding.mp3',
  button_press: '/sounds/elevator/button-press.mp3',
  ambient: '/sounds/elevator/ambient-hum.mp3',
} as const;

type ElevatorSoundType = keyof typeof ELEVATOR_SOUNDS;

export const useElevatorSounds = () => {
  const playElevatorSound = useCallback((type: ElevatorSoundType, _volume: number = 0.5) => {
    try {
      // For now, use vibration on mobile devices as placeholder
      if ('vibrate' in navigator) {
        switch (type) {
          case 'doors_open':
            navigator.vibrate([100, 50]);
            break;
          case 'doors_close':
            navigator.vibrate([50, 100]);
            break;
          case 'moving':
            navigator.vibrate([200, 100, 200]);
            break;
          case 'arrival':
            navigator.vibrate([150, 50, 150]);
            break;
          case 'button_press':
            navigator.vibrate(30);
            break;
          case 'ambient':
            // No vibration for ambient sound
            break;
        }
      }

      // When you're ready to add actual sound effects, uncomment this:
      /*
      const audio = new Audio(ELEVATOR_SOUNDS[type]);
      audio.volume = _volume;
      audio.play().catch(console.error);
      */
    } catch (error) {
      console.error('Elevator sound effect error:', error);
    }
  }, []);

  return { playElevatorSound };
};

export default useElevatorSounds;

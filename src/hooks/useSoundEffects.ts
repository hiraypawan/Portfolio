'use client';

import { useCallback } from 'react';

// Sound effects paths - you can replace these with actual audio files later
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SOUND_EFFECTS = {
  click: '/sounds/click.mp3',
  unlock: '/sounds/unlock.mp3',
  discover: '/sounds/discover.mp3',
  hover: '/sounds/hover.mp3',
  treasure: '/sounds/treasure.mp3',
  quest_complete: '/sounds/quest-complete.mp3',
} as const;

type SoundType = keyof typeof SOUND_EFFECTS;

export const useSoundEffects = () => {
  const playSound = useCallback((type: SoundType, _volume: number = 0.5) => {
    try {
      // For now, use vibration on mobile devices as placeholder
      if ('vibrate' in navigator) {
        switch (type) {
          case 'click':
            navigator.vibrate(50);
            break;
          case 'unlock':
            navigator.vibrate([100, 50, 100]);
            break;
          case 'discover':
            navigator.vibrate([150, 100, 150, 100, 150]);
            break;
          case 'hover':
            navigator.vibrate(20);
            break;
          case 'treasure':
            navigator.vibrate([200, 100, 200, 100, 200]);
            break;
          case 'quest_complete':
            navigator.vibrate([300, 150, 300, 150, 300]);
            break;
        }
      }

      // When you're ready to add actual sound effects, uncomment this:
      /*
      const audio = new Audio(SOUND_EFFECTS[type]);
      audio.volume = volume;
      audio.play().catch(console.error);
      */
    } catch (error) {
      console.error('Sound effect error:', error);
    }
  }, []);

  return { playSound };
};

export default useSoundEffects;

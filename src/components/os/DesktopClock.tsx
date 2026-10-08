'use client';

import { useEffect, useState } from 'react';

export default function DesktopClock() {
  const [time, setTime] = useState('—:—');
  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | undefined;
    const update = () =>
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    const visibility = () => {
      if (timer) clearInterval(timer);
      if (!document.hidden) {
        update();
        timer = setInterval(update, 60000);
      }
    };
    visibility();
    document.addEventListener('visibilitychange', visibility);
    return () => {
      if (timer) clearInterval(timer);
      document.removeEventListener('visibilitychange', visibility);
    };
  }, []);
  return (
    <span className="font-mono text-xs text-[var(--secondary)]" aria-label={`Local time ${time}`}>
      {time}
    </span>
  );
}

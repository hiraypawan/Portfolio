'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export interface WinState {
  id: string;
  title: string;
  stateText?: string;
  maximized?: boolean;
  z: number;
}

interface WindowFrameProps {
  win: WinState;
  focused: boolean;
  onFocus: () => void;
  onClose: () => void;
  onToggleMax: () => void;
  children: React.ReactNode;
}

export default function WindowFrame({ win, focused, onFocus, onClose, onToggleMax, children }: WindowFrameProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [placed, setPlaced] = useState(false);
  const drag = useRef<{ dx: number; dy: number; on: boolean }>({ dx: 0, dy: 0, on: false });

  useEffect(() => {
    if (placed || win.maximized) return;
    const w = window.innerWidth;
    const off = (win.z % 5) * 28;
    setPos({ x: Math.max(12, w / 2 - 330 + off), y: 120 + off });
    setPlaced(true);
  }, [placed, win.maximized, win.z]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && focused) onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [focused, onClose]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (win.maximized) return;
    onFocus();
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    drag.current = { dx: e.clientX - r.left, dy: e.clientY - r.top, on: true };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current.on || win.maximized) return;
    setPos({
      x: Math.min(Math.max(0, e.clientX - drag.current.dx), window.innerWidth - 120),
      y: Math.min(Math.max(64, e.clientY - drag.current.dy), window.innerHeight - 80),
    });
  };
  const endDrag = () => {
    drag.current.on = false;
  };

  if (win.maximized) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        role="dialog"
        aria-label={win.title}
        onPointerDown={onFocus}
        className="fixed inset-x-1 top-[60px] bottom-2 z-[1000] sm:inset-x-2"
        style={{ zIndex: 1000 + win.z }}
      >
        <div
          className={`flex h-full flex-col overflow-hidden rounded-2xl border bg-[#12121a]/95 backdrop-blur-xl ${
            focused ? 'border-white/25 shadow-2xl' : 'border-white/10'
          }`}
        >
          <TitleBar win={win} onClose={onClose} onToggleMax={onToggleMax} onDragStart={onPointerDown} />
          <div className="min-h-0 flex-1 overflow-y-auto p-5 text-[16px] leading-relaxed">{children}</div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.96, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      role="dialog"
      aria-label={win.title}
      onPointerDown={onFocus}
      className="fixed z-[1000] w-[min(680px,calc(100vw-16px))]"
      style={{ left: pos.x, top: pos.y, zIndex: 1000 + win.z }}
    >
      <div
        className={`flex max-h-[calc(100dvh-140px)] flex-col overflow-hidden rounded-2xl border bg-[#12121a]/95 backdrop-blur-xl ${
          focused ? 'border-white/25 shadow-2xl' : 'border-white/10'
        }`}
      >
        <TitleBar win={win} onClose={onClose} onToggleMax={onToggleMax} onDragStart={onPointerDown} onDragMove={onPointerMove} onDragEnd={endDrag} />
        <div className="min-h-0 flex-1 overflow-y-auto p-5 text-[16px] leading-relaxed">{children}</div>
      </div>
    </motion.div>
  );
}

function TitleBar({
  win,
  onClose,
  onToggleMax,
  onDragStart,
  onDragMove,
  onDragEnd,
}: {
  win: WinState;
  onClose: () => void;
  onToggleMax: () => void;
  onDragStart: (e: React.PointerEvent) => void;
  onDragMove?: (e: React.PointerEvent) => void;
  onDragEnd?: () => void;
}) {
  return (
    <div
      onPointerDown={onDragStart}
      onPointerMove={onDragMove}
      onPointerUp={onDragEnd}
      className="flex cursor-grab touch-none select-none items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-3 active:cursor-grabbing"
    >
      <span className="flex gap-1.5" onPointerDown={(e) => e.stopPropagation()}>
        <button onClick={onClose} aria-label={`Close ${win.title}`} className="h-3.5 w-3.5 rounded-full bg-[#ff5f57] hover:brightness-110" />
        <button onClick={onToggleMax} aria-label={`Maximize ${win.title}`} className="h-3.5 w-3.5 rounded-full bg-[#febc2e] hover:brightness-110" />
        <span className="h-3.5 w-3.5 rounded-full bg-[#28c840]" aria-hidden />
      </span>
      <span className="ml-2 truncate text-[14px] font-semibold text-white">{win.title}</span>
      {win.stateText && <span className="ml-auto hidden text-[12px] text-white/50 sm:block">{win.stateText}</span>}
    </div>
  );
}

'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Minus, Square, X } from 'lucide-react';

export interface WinState {
  id: string;
  title: string;
  stateText?: string;
  maximized?: boolean;
  minimized?: boolean;
  z: number;
}

interface WindowFrameProps {
  win: WinState;
  focused: boolean;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onToggleMax: () => void;
  children: React.ReactNode;
}

/** Phones (<640px) render windows as bottom sheets with swipe-down to minimize. */
function useCoarsePhone(): boolean {
  const [coarse, setCoarse] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)');
    const upd = () => setCoarse(mq.matches);
    upd();
    mq.addEventListener('change', upd);
    return () => mq.removeEventListener('change', upd);
  }, []);
  return coarse;
}

export default function WindowFrame({ win, focused, onFocus, onClose, onMinimize, onToggleMax, children }: WindowFrameProps) {
  const ref = useRef<HTMLDivElement>(null);
  const phone = useCoarsePhone();
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [placed, setPlaced] = useState(false);
  const drag = useRef<{ dx: number; dy: number; on: boolean }>({ dx: 0, dy: 0, on: false });
  // Swipe-down-to-minimize (phone sheets + maximized windows)
  const swipe = useRef<{ y: number; on: boolean }>({ y: 0, on: false });
  const [dy, setDy] = useState(0);

  useEffect(() => {
    if (placed || win.maximized || phone) return;
    const w = window.innerWidth;
    const off = (win.z % 5) * 28;
    setPos({ x: Math.max(12, w / 2 - 330 + off), y: 120 + off });
    setPlaced(true);
  }, [placed, win.maximized, win.z, phone]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && focused) onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [focused, onClose]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (win.maximized || phone) return;
    onFocus();
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    drag.current = { dx: e.clientX - r.left, dy: e.clientY - r.top, on: true };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current.on || win.maximized || phone) return;
    setPos({
      x: Math.min(Math.max(0, e.clientX - drag.current.dx), window.innerWidth - 120),
      y: Math.min(Math.max(64, e.clientY - drag.current.dy), window.innerHeight - 80),
    });
  };
  const endDrag = () => {
    drag.current.on = false;
  };

  // Phone swipe gesture: start only from the titlebar/grabber, drag down, release past 110px to minimize.
  const swipeBegin = (e: React.PointerEvent) => {
    if (!phone) return;
    onFocus();
    swipe.current = { y: e.clientY, on: true };
  };
  const swipeBeginFromBar = (e: React.PointerEvent) => {
    if (!phone) return;
    if (!(e.target as HTMLElement).closest('[data-titlebar]')) return;
    swipeBegin(e);
  };
  const swipeMove = (e: React.PointerEvent) => {
    if (!swipe.current.on) return;
    setDy(Math.max(0, e.clientY - swipe.current.y));
  };
  const swipeEnd = () => {
    if (swipe.current.on && dy > 110) onMinimize();
    swipe.current.on = false;
    setDy(0);
  };

  if (win.maximized) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        role="dialog"
        aria-label={win.title}
        onPointerDown={phone ? swipeBeginFromBar : onFocus}
        onPointerMove={phone ? swipeMove : undefined}
        onPointerUp={phone ? swipeEnd : undefined}
        onPointerCancel={phone ? swipeEnd : undefined}
        className="fixed inset-x-1 top-[60px] bottom-2 z-[1000] sm:inset-x-2"
        style={{ zIndex: 1000 + win.z }}
      >
        <div
          className={`flex h-full flex-col overflow-hidden rounded-xl border bg-[#14141d]/95 shadow-2xl backdrop-blur-2xl ${
            focused ? 'border-white/25' : 'border-white/10'
          }`}
          style={dy > 0 ? { transform: `translateY(${dy}px)` } : undefined}
        >
          <TitleBar win={win} onClose={onClose} onMinimize={onMinimize} onToggleMax={onToggleMax} onDragStart={onPointerDown} />
          <div className="min-h-0 flex-1 overflow-y-auto p-5 text-[16px] leading-relaxed sm:p-6">{children}</div>
        </div>
      </motion.div>
    );
  }

  // Phone bottom sheet
  if (phone) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        role="dialog"
        aria-label={win.title}
        onPointerDown={onFocus}
        className="fixed inset-x-2 bottom-2 z-[1000]"
        style={{ zIndex: 1000 + win.z }}
      >
        <div
          className="flex max-h-[88dvh] flex-col overflow-hidden rounded-t-3xl rounded-b-2xl border border-white/20 bg-[#14141d]/97 shadow-2xl backdrop-blur-2xl"
          style={dy > 0 ? { transform: `translateY(${dy}px)` } : undefined}
        >
          {/* iOS-style grabber — drag down to minimize */}
          <div
            className="flex touch-none justify-center pb-1 pt-2.5"
            onPointerDown={swipeBegin}
            onPointerMove={swipeMove}
            onPointerUp={swipeEnd}
            onPointerCancel={swipeEnd}
          >
            <span className="h-1.5 w-12 rounded-full bg-white/30" aria-hidden />
            <span className="sr-only">Drag down to minimize {win.title}</span>
          </div>
          <TitleBar win={win} onClose={onClose} onMinimize={onMinimize} onToggleMax={onToggleMax} onDragStart={() => {}} />
          <div className="min-h-0 flex-1 overflow-y-auto p-5 text-[17px] leading-relaxed">{children}</div>
        </div>
      </motion.div>
    );
  }

  // Desktop floating window
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.96, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', damping: 28, stiffness: 320 }}
      role="dialog"
      aria-label={win.title}
      onPointerDown={onFocus}
      className="fixed z-[1000] w-[min(680px,calc(100vw-16px))]"
      style={{ left: pos.x, top: pos.y, zIndex: 1000 + win.z }}
    >
      <div
        className={`flex max-h-[calc(100dvh-140px)] flex-col overflow-hidden rounded-xl border bg-[#14141d]/95 shadow-2xl backdrop-blur-2xl ${
          focused ? 'border-white/25' : 'border-white/10'
        }`}
      >
        <TitleBar win={win} onClose={onClose} onMinimize={onMinimize} onToggleMax={onToggleMax} onDragStart={onPointerDown} onDragMove={onPointerMove} onDragEnd={endDrag} />
        <div className="min-h-0 flex-1 overflow-y-auto p-5 text-[16px] leading-relaxed sm:p-6">{children}</div>
      </div>
    </motion.div>
  );
}

function TitleBar({
  win,
  onClose,
  onMinimize,
  onToggleMax,
  onDragStart,
  onDragMove,
  onDragEnd,
}: {
  win: WinState;
  onClose: () => void;
  onMinimize: () => void;
  onToggleMax: () => void;
  onDragStart: (e: React.PointerEvent) => void;
  onDragMove?: (e: React.PointerEvent) => void;
  onDragEnd?: () => void;
}) {
  const btn =
    'flex h-8 w-8 items-center justify-center rounded-full transition hover:brightness-110 active:scale-95';
  return (
    <div
      data-titlebar
      onPointerDown={onDragStart}
      onPointerMove={onDragMove}
      onPointerUp={onDragEnd}
      className="flex min-h-[52px] cursor-grab touch-none select-none items-center gap-2 border-b border-white/10 bg-white/[0.06] px-3 active:cursor-grabbing"
    >
      {/* Hybrid controls: macOS colors + explicit Windows-style symbols, always visible */}
      <span className="flex items-center gap-2" onPointerDown={(e) => e.stopPropagation()}>
        <button onClick={onClose} title="Close" aria-label={`Close ${win.title}`} className={`${btn} bg-[#FF5F57]`}>
          <X size={15} strokeWidth={2.75} className="text-black/60" />
        </button>
        <button onClick={onMinimize} title="Minimize" aria-label={`Minimize ${win.title}`} className={`${btn} bg-[#FEBC2E]`}>
          <Minus size={15} strokeWidth={2.75} className="text-black/60" />
        </button>
        <button
          onClick={onToggleMax}
          title={win.maximized ? 'Restore' : 'Maximize'}
          aria-label={`${win.maximized ? 'Restore' : 'Maximize'} ${win.title}`}
          className={`${btn} bg-[#28C840]`}
        >
          <Square size={12} strokeWidth={2.75} className="text-black/60" />
        </button>
      </span>
      <span className="ml-1 truncate text-[14px] font-semibold text-white">{win.title}</span>
      {win.stateText && <span className="ml-auto hidden shrink-0 text-[12px] text-white/50 sm:block">{win.stateText}</span>}
    </div>
  );
}

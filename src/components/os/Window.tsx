'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Crosshair, Minus, Square, X } from 'lucide-react';
import {
  clampPosition,
  initialPosition,
  windowWidth,
  type Viewport,
  type WinState,
} from '@/lib/os-state';
import { useDialogFocus } from './hooks';
export type { WinState } from '@/lib/os-state';

interface Props {
  win: WinState;
  focused: boolean;
  springs: boolean;
  viewport: Viewport;
  layer: number;
  blocked: boolean;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onToggleMax: () => void;
  children: React.ReactNode;
}

export default function WindowFrame({
  win,
  focused,
  springs,
  viewport,
  layer,
  blocked,
  onFocus,
  onClose,
  onMinimize,
  onToggleMax,
  children,
}: Props) {
  const phone = viewport.width < 768;
  const shown = !win.minimized && (!phone || focused);
  const ref = useRef<HTMLElement>(null);
  const [position, setPosition] = useState(() => initialPosition(viewport, win.z));
  const [swipeY, setSwipeY] = useState(0);
  const pointer = useRef<{
    id: number;
    x: number;
    y: number;
    originX: number;
    originY: number;
  } | null>(null);
  useDialogFocus(ref, focused && shown && !blocked, phone);
  useEffect(() => {
    setPosition((current) => clampPosition(current, viewport));
  }, [viewport]);
  const startPointer = (event: React.PointerEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest('button')) return;
    if (!phone && win.maximized) return;
    onFocus();
    pointer.current = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      originX: position.x,
      originY: position.y,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const movePointer = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!pointer.current || pointer.current.id !== event.pointerId) return;
    if (phone) setSwipeY(Math.max(0, event.clientY - pointer.current.y));
    else
      setPosition(
        clampPosition(
          {
            x: pointer.current.originX + event.clientX - pointer.current.x,
            y: pointer.current.originY + event.clientY - pointer.current.y,
          },
          viewport,
        ),
      );
  };
  const endPointer = (event: React.PointerEvent<HTMLDivElement>) => {
    if (
      phone &&
      event.type !== 'pointercancel' &&
      pointer.current &&
      event.clientY - pointer.current.y > 110
    )
      onMinimize();
    pointer.current = null;
    setSwipeY(0);
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId);
  };
  const bottom = 96;
  const style: React.CSSProperties = phone
    ? {
        left: 8,
        right: 8,
        bottom: 'max(8px, env(safe-area-inset-bottom))',
        maxHeight: win.maximized ? 'calc(100dvh - 72px)' : '88dvh',
        height: win.maximized ? 'calc(100dvh - 72px)' : undefined,
        zIndex: layer,
      }
    : win.maximized
      ? {
          left: 12,
          right: 12,
          top: 68,
          height: Math.max(130, viewport.height - 68 - bottom),
          zIndex: layer,
        }
      : {
          left: position.x,
          top: position.y,
          width: windowWidth(viewport),
          maxHeight: Math.max(130, viewport.height - position.y - bottom),
          zIndex: layer,
        };
  return (
    <>
      {phone && shown && (
        <button
          type="button"
          aria-label={`Minimize ${win.title} by dismissing the sheet`}
          tabIndex={-1}
          aria-hidden="true"
          className="os-dialog-backdrop fixed inset-0"
          style={{ zIndex: layer - 1 }}
          onClick={onMinimize}
        />
      )}
      <motion.section
        ref={ref}
        hidden={!shown}
        inert={blocked || (phone && !focused)}
        role="dialog"
        aria-label={win.title}
        aria-modal={phone && shown ? true : undefined}
        tabIndex={-1}
        onPointerDown={onFocus}
        onFocusCapture={onFocus}
        onKeyDown={(event) => {
          if (event.key === 'Escape' && focused && !blocked) {
            event.stopPropagation();
            event.preventDefault();
            onClose();
          }
        }}
        initial={springs ? { opacity: 0, scale: 0.98 } : false}
        animate={{ opacity: 1, scale: 1 }}
        transition={springs ? { duration: 0.15 } : { duration: 0 }}
        className={`os-window fixed flex flex-col overflow-hidden rounded-2xl ${focused ? 'os-window-focused' : ''}`}
        style={style}
      >
        <div
          style={swipeY ? { transform: `translateY(${swipeY}px)` } : undefined}
          className="flex min-h-0 flex-col"
        >
          <div
            onPointerDown={startPointer}
            onPointerMove={movePointer}
            onPointerUp={endPointer}
            onPointerCancel={endPointer}
            onLostPointerCapture={() => {
              pointer.current = null;
              setSwipeY(0);
            }}
            className={`os-window-title flex shrink-0 touch-none select-none flex-col ${phone ? '' : 'cursor-grab'}`}
          >
            {phone && (
              <span className="mx-auto mt-2 h-1 w-10 rounded-full bg-white/40" aria-hidden="true" />
            )}
            <div className="flex min-h-[60px] items-center gap-1.5 px-2.5">
              <div
                className="flex shrink-0 gap-1"
                onPointerDown={(event) => event.stopPropagation()}
              >
                <button
                  className="flex h-11 w-11 items-center justify-center rounded-xl hover:bg-white/10"
                  aria-label={`Close ${win.title}`}
                  title="Close"
                  onClick={onClose}
                >
                  <X size={17} className="text-[#fda4af]" aria-hidden="true" />
                </button>
                <button
                  className="flex h-11 w-11 items-center justify-center rounded-xl hover:bg-white/10"
                  aria-label={`Minimize ${win.title}`}
                  title="Minimize"
                  onClick={onMinimize}
                >
                  <Minus size={17} className="text-[#fcd34d]" aria-hidden="true" />
                </button>
                <button
                  className="flex h-11 w-11 items-center justify-center rounded-xl hover:bg-white/10"
                  aria-label={`${win.maximized ? 'Restore' : 'Maximize'} ${win.title}`}
                  title={win.maximized ? 'Restore' : 'Maximize'}
                  onClick={onToggleMax}
                >
                  <Square size={14} className="text-[#86efac]" aria-hidden="true" />
                </button>
              </div>
              <h2 className="min-w-0 truncate text-sm font-semibold">{win.title}</h2>
              {!phone && !win.maximized && (
                <button
                  className="ml-auto flex h-11 w-11 shrink-0 items-center justify-center rounded-xl hover:bg-white/10"
                  aria-label={`Center ${win.title} window`}
                  title="Center window"
                  onPointerDown={(event) => event.stopPropagation()}
                  onClick={() => setPosition(initialPosition(viewport, 0))}
                >
                  <Crosshair size={15} aria-hidden="true" />
                </button>
              )}
            </div>
          </div>
          <div className="min-h-0 overflow-y-auto overscroll-contain p-5 text-[15px] leading-relaxed md:p-6">
            {children}
          </div>
        </div>
      </motion.section>
    </>
  );
}

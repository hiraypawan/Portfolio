'use client';

import { useRef } from 'react';
import { X } from 'lucide-react';
import { useDialogFocus } from './hooks';

export default function HelpDialog({ close }: { close: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useDialogFocus(ref, true, true);
  return (
    <div
      className="os-dialog-backdrop fixed inset-0 z-[6000] flex items-center justify-center p-4"
      onPointerDown={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="os-help-title"
        tabIndex={-1}
        className="w-full max-w-md rounded-2xl border border-white/25 bg-[#141620] p-5 shadow-2xl"
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            event.preventDefault();
            event.stopPropagation();
            close();
          }
        }}
      >
        <div className="flex items-center justify-between gap-3">
          <h2 id="os-help-title" className="text-lg font-semibold">
            A desktop, not a puzzle.
          </h2>
          <button
            className="flex h-11 w-11 items-center justify-center rounded-lg hover:bg-white/10"
            aria-label="Close desktop help"
            onClick={close}
          >
            <X size={17} aria-hidden="true" />
          </button>
        </div>
        <ul className="mt-4 list-disc space-y-3 pl-5 text-[15px] text-[var(--secondary)]">
          <li>Open Work to explore the projects. Every case has a shareable page.</li>
          <li>Minimize a window to keep its draft. Its dock button brings it back.</li>
          <li>On phones, drag the title bar down to minimize a sheet.</li>
          <li>Press / or Ctrl / ⌘ K to search. Arrow keys select a result.</li>
          <li>Settings and whiteboard notes stay on this device.</li>
        </ul>
        <button
          data-autofocus
          className="button-primary mt-6 w-full justify-center"
          onClick={close}
        >
          Explore the workspace
        </button>
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState, type RefObject } from 'react';
import type { Viewport } from '@/lib/os-state';

export function useViewport(): Viewport {
  const [viewport, setViewport] = useState<Viewport>({ width: 1200, height: 800 });
  useEffect(() => {
    const update = () => setViewport({ width: window.innerWidth, height: window.innerHeight });
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return viewport;
}

export function useReducedPreference(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  return reduced;
}

export function useDialogFocus(
  ref: RefObject<HTMLElement | null>,
  active: boolean,
  modal: boolean,
) {
  useEffect(() => {
    if (!active || !ref.current) return;
    const root = ref.current;
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    if (!root.contains(document.activeElement))
      (root.querySelector<HTMLElement>('[data-autofocus]') ?? root).focus({ preventScroll: true });
    const onKey = (event: KeyboardEvent) => {
      if (!modal || event.key !== 'Tab') return;
      const targets = Array.from(
        root.querySelectorAll<HTMLElement>(
          'a[href],button:not([disabled]),input:not([disabled]),textarea:not([disabled]),select:not([disabled]),[tabindex="0"]',
        ),
      ).filter(
        (element) =>
          element.tabIndex >= 0 &&
          element.getClientRects().length > 0 &&
          !element.closest('[hidden], [inert]'),
      );
      const first = targets[0];
      const last = targets[targets.length - 1];
      if (!first) {
        event.preventDefault();
        root.focus();
        return;
      }
      if (event.shiftKey && (document.activeElement === first || document.activeElement === root)) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        (document.activeElement === last || document.activeElement === root)
      ) {
        event.preventDefault();
        first.focus();
      }
    };
    root.addEventListener('keydown', onKey);
    return () => {
      root.removeEventListener('keydown', onKey);
      if (
        previous?.isConnected &&
        !previous.closest('[hidden], [inert]') &&
        (root.contains(document.activeElement) || document.activeElement === document.body)
      )
        previous.focus({ preventScroll: true });
    };
  }, [active, modal, ref]);
}

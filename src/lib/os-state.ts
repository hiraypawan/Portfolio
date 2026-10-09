export interface WinState {
  id: string;
  title: string;
  maximized: boolean;
  minimized: boolean;
  z: number;
}
export interface DesktopState {
  windows: WinState[];
  activeId: string | null;
  nextZ: number;
}
export const INITIAL_DESKTOP: DesktopState = { windows: [], activeId: null, nextZ: 1 };
export type DesktopAction =
  | { type: 'open'; id: string; title: string }
  | { type: 'focus' | 'close' | 'minimize' | 'toggle-max'; id: string };

function visibleActive(windows: WinState[], preferred: string | null): string | null {
  if (windows.some((win) => win.id === preferred && !win.minimized)) return preferred;
  return windows.filter((win) => !win.minimized).sort((a, b) => b.z - a.z)[0]?.id ?? null;
}

export function desktopReducer(state: DesktopState, action: DesktopAction): DesktopState {
  const existing = state.windows.find((win) => win.id === action.id);
  if (action.type === 'open') {
    const windows = existing
      ? state.windows.map((win) =>
          win.id === action.id ? { ...win, minimized: false, z: state.nextZ } : win,
        )
      : [
          ...state.windows,
          {
            id: action.id,
            title: action.title,
            maximized: false,
            minimized: false,
            z: state.nextZ,
          },
        ];
    return { windows, activeId: action.id, nextZ: state.nextZ + 1 };
  }
  if (!existing) return state;
  if (action.type === 'focus') {
    if (state.activeId === action.id && !existing.minimized) return state;
    return {
      ...state,
      windows: state.windows.map((win) =>
        win.id === action.id ? { ...win, minimized: false, z: state.nextZ } : win,
      ),
      activeId: action.id,
      nextZ: state.nextZ + 1,
    };
  }
  if (action.type === 'toggle-max')
    return {
      ...state,
      windows: state.windows.map((win) =>
        win.id === action.id ? { ...win, maximized: !win.maximized } : win,
      ),
    };
  const windows =
    action.type === 'close'
      ? state.windows.filter((win) => win.id !== action.id)
      : state.windows.map((win) => (win.id === action.id ? { ...win, minimized: true } : win));
  return {
    ...state,
    windows,
    activeId: visibleActive(windows, state.activeId === action.id ? null : state.activeId),
  };
}

export interface Viewport {
  width: number;
  height: number;
}
export function windowWidth(viewport: Viewport): number {
  return Math.max(240, Math.min(720, viewport.width - 24));
}
export function clampPosition(position: { x: number; y: number }, viewport: Viewport) {
  return {
    x: Math.max(
      12,
      Math.min(position.x, Math.max(12, viewport.width - windowWidth(viewport) - 12)),
    ),
    y: Math.max(52, Math.min(position.y, Math.max(52, viewport.height - 240))),
  };
}
export function initialPosition(viewport: Viewport, order: number) {
  return clampPosition(
    {
      x: (viewport.width - windowWidth(viewport)) / 2 + (order % 4) * 18,
      y: 64 + (order % 4) * 18,
    },
    viewport,
  );
}

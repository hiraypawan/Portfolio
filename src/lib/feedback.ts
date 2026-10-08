'use client';

export type SoundName = 'open' | 'close' | 'minimize' | 'select' | 'toggle';
export type Wallpaper = 'auto' | 'day' | 'night' | 'dark';
export interface OSSettings {
  accentId: string;
  wallpaper: Wallpaper;
  sounds: boolean;
  haptics: boolean;
  motion: 'full' | 'calm';
}
export const ACCENTS = [
  { id: 'violet', name: 'Violet', a: '#b5a0ff', b: '#67e8f9' },
  { id: 'ocean', name: 'Ocean', a: '#7dd3fc', b: '#6ee7b7' },
  { id: 'sunset', name: 'Sunset', a: '#fcd34d', b: '#fda4af' },
  { id: 'rose', name: 'Rose', a: '#f9a8d4', b: '#c4b5fd' },
  { id: 'mono', name: 'Mono', a: '#e2e8f0', b: '#a4a9bc' },
];
export const SETTINGS_KEY = 'personal-os-settings-v2';
export const DEFAULT_SETTINGS: OSSettings = {
  accentId: 'violet',
  wallpaper: 'auto',
  sounds: false,
  haptics: false,
  motion: 'full',
};

export function normalizeSettings(value: unknown): OSSettings {
  const p = value && typeof value === 'object' ? (value as Record<string, unknown>) : {};
  return {
    accentId: ACCENTS.some((accent) => accent.id === p.accentId) ? String(p.accentId) : 'violet',
    wallpaper: ['auto', 'day', 'night', 'dark'].includes(String(p.wallpaper))
      ? (p.wallpaper as Wallpaper)
      : 'auto',
    sounds: p.sounds === true,
    haptics: p.haptics === true,
    motion: p.motion === 'calm' ? 'calm' : 'full',
  };
}
export function loadSettings(): OSSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (raw) return normalizeSettings(JSON.parse(raw));
    const previous = localStorage.getItem('personal-os-settings-v1');
    const theme = localStorage.getItem('personal-os-theme-v1');
    return normalizeSettings({
      ...(previous ? JSON.parse(previous) : {}),
      wallpaper: theme ?? 'auto',
    });
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}
export function saveSettings(settings: OSSettings): boolean {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    return true;
  } catch {
    return false;
  }
}
export function resetOSView(): void {
  try {
    for (const key of [
      SETTINGS_KEY,
      'personal-os-settings-v1',
      'personal-os-theme-v1',
      'personal-os-tour-v1',
      'theme',
    ])
      localStorage.removeItem(key);
    sessionStorage.removeItem('personal-os-boot-v1');
    // Notes have a separate, explicitly confirmed reset in Whiteboard.
  } catch {
    /* Preferences still reset for this session. */
  }
}
export function resolvedWallpaper(wallpaper: Wallpaper, hour: number): 'day' | 'night' | 'dark' {
  if (wallpaper !== 'auto') return wallpaper;
  return hour >= 6 && hour < 17 ? 'day' : hour >= 17 && hour < 20 ? 'night' : 'dark';
}

let ctx: AudioContext | null = null;
export function playSound(name: SoundName): void {
  try {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    ctx ??= new AC();
    if (ctx.state === 'suspended') void ctx.resume();
    const time = ctx.currentTime;
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    const frequencies: Record<SoundName, number> = {
      open: 720,
      close: 400,
      minimize: 440,
      select: 600,
      toggle: 520,
    };
    oscillator.frequency.setValueAtTime(frequencies[name], time);
    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.exponentialRampToValueAtTime(0.025, time + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.12);
    oscillator.connect(gain);
    gain.connect(ctx.destination);
    oscillator.start(time);
    oscillator.stop(time + 0.14);
  } catch {
    /* Audio is optional. */
  }
}
export function buzz(pattern: number | number[] = 12): void {
  try {
    navigator.vibrate?.(pattern);
  } catch {
    /* Haptics are optional. */
  }
}

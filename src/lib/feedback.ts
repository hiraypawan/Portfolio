'use client';

// Tiny synthesized feedback engine: no audio assets, everything generated
// with WebAudio on first user gesture. Sounds OFF by default.

export type SoundName = 'open' | 'close' | 'minimize' | 'select' | 'toggle';

export interface OSSettings {
  accentId: string;
  sounds: boolean;
  haptics: boolean;
  motion: 'full' | 'calm';
}

export const ACCENTS = [
  { id: 'violet', name: 'Violet Ice', a: '#8b5cf6', b: '#22d3ee' },
  { id: 'ocean', name: 'Ocean', a: '#0ea5e9', b: '#34d399' },
  { id: 'sunset', name: 'Sunset', a: '#f59e0b', b: '#ef4444' },
  { id: 'rose', name: 'Rose', a: '#f472b6', b: '#8b5cf6' },
  { id: 'mono', name: 'Mono', a: '#e2e8f0', b: '#64748b' },
];

export const DEFAULT_SETTINGS: OSSettings = {
  accentId: 'violet',
  sounds: false,
  haptics: true,
  motion: 'full',
};

const KEY = 'personal-os-settings-v1';

export function loadSettings(): OSSettings {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...DEFAULT_SETTINGS };
    const p = JSON.parse(raw) as Partial<OSSettings>;
    return {
      accentId: ACCENTS.some((a) => a.id === p.accentId) ? (p.accentId as string) : 'violet',
      sounds: p.sounds === true,
      haptics: p.haptics !== false,
      motion: p.motion === 'calm' ? 'calm' : 'full',
    };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

export function saveSettings(s: OSSettings) {
  try {
    localStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    /* storage unavailable */
  }
}

export function resetOSView() {
  try {
    for (const k of [
      'personal-os-settings-v1',
      'personal-os-theme-v1',
      'personal-os-tour-v1',
      'personal-os-whiteboard-v1',
    ]) {
      localStorage.removeItem(k);
    }
    sessionStorage.removeItem('personal-os-boot-v1');
  } catch {
    /* ignore */
  }
}

let ctx: AudioContext | null = null;

function ac(): AudioContext | null {
  try {
    if (!ctx) {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      ctx = new AC();
    }
    if (ctx.state === 'suspended') void ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

/** Short filtered "swish": rising for open, falling for close. */
function swish(up: boolean, dur = 0.22, vol = 0.05) {
  const c = ac();
  if (!c) return;
  const t = c.currentTime;
  const len = Math.floor(c.sampleRate * dur);
  const buf = c.createBuffer(1, len, c.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len);
  const src = c.createBufferSource();
  src.buffer = buf;
  const bp = c.createBiquadFilter();
  bp.type = 'bandpass';
  bp.Q.value = 1.4;
  bp.frequency.setValueAtTime(up ? 600 : 2400, t);
  bp.frequency.exponentialRampToValueAtTime(up ? 2600 : 500, t + dur);
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + dur * 0.35);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  src.connect(bp).connect(g).connect(c.destination);
  src.start(t);
}

function blip(freq = 660, dur = 0.07, vol = 0.05) {
  const c = ac();
  if (!c) return;
  const t = c.currentTime;
  const o = c.createOscillator();
  o.type = 'sine';
  o.frequency.setValueAtTime(freq, t);
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + 0.012);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(c.destination);
  o.start(t);
  o.stop(t + dur + 0.02);
}

export function playSound(name: SoundName) {
  try {
    if (name === 'open') {
      swish(true);
      blip(720, 0.06, 0.04);
    } else if (name === 'close') {
      swish(false);
    } else if (name === 'minimize') {
      blip(440, 0.09, 0.05);
    } else if (name === 'select') {
      blip(600, 0.05, 0.035);
    } else {
      blip(520, 0.06, 0.04);
    }
  } catch {
    /* audio unavailable */
  }
}

export function buzz(pattern: number | number[] = 12) {
  try {
    navigator.vibrate?.(pattern);
  } catch {
    /* haptics unavailable */
  }
}

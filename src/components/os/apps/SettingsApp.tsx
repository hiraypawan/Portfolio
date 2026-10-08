'use client';

import { useState } from 'react';
import { ACCENTS, playSound, type OSSettings, type Wallpaper } from '@/lib/feedback';

export interface SysControls {
  settings: OSSettings;
  patch: (patch: Partial<OSSettings>) => void;
  reset: () => void;
  persisted: boolean;
}
function Switch({ on, label, change }: { on: boolean; label: string; change: () => void }) {
  return (
    <button
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={change}
      className={`relative h-11 w-[64px] shrink-0 rounded-full border border-white/20 ${on ? 'bg-[#86efac]' : 'bg-[#404656]'}`}
    >
      <span
        className={`absolute top-2 h-6 w-6 rounded-full shadow ${on ? 'left-8 bg-[#17251f]' : 'left-2 bg-white'}`}
        aria-hidden="true"
      />
    </button>
  );
}
export default function SettingsApp({ sys }: { sys: SysControls }) {
  const [message, setMessage] = useState('');
  return (
    <div className="space-y-6">
      <p className="text-sm text-[var(--secondary)]">
        Local preferences only. No setting is sent to a server. The website uses one preference
        system, not competing themes.
      </p>
      {!sys.persisted && (
        <p className="notice">Storage unavailable. Changes apply to this session only.</p>
      )}
      <section>
        <h3 className="mb-3 text-lg font-semibold">Accent</h3>
        <div className="flex flex-wrap gap-3">
          {ACCENTS.map((accent) => (
            <button
              key={accent.id}
              onClick={() => sys.patch({ accentId: accent.id })}
              aria-pressed={sys.settings.accentId === accent.id}
              className={`flex min-h-16 min-w-16 flex-col items-center justify-center gap-2 rounded-xl p-2 ${sys.settings.accentId === accent.id ? 'bg-white/10 ring-2 ring-white/60' : 'hover:bg-white/5'}`}
            >
              <span
                className="h-8 w-8 rounded-full"
                style={{ background: `linear-gradient(135deg, ${accent.a}, ${accent.b})` }}
                aria-hidden="true"
              />
              <span className="text-xs">{accent.name}</span>
            </button>
          ))}
        </div>
      </section>
      <section>
        <h3 className="mb-3 text-lg font-semibold">Wallpaper</h3>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Wallpaper">
          {(['auto', 'day', 'night', 'dark'] as Wallpaper[]).map((wallpaper) => (
            <button
              className={`button-secondary capitalize ${sys.settings.wallpaper === wallpaper ? 'ring-2 ring-[var(--acc1)]' : ''}`}
              key={wallpaper}
              onClick={() => sys.patch({ wallpaper })}
              aria-pressed={sys.settings.wallpaper === wallpaper}
            >
              {wallpaper}
            </button>
          ))}
        </div>
        <p className="mt-3 text-sm text-[var(--muted)]">
          Auto follows the time on your device. Manual choices persist until reset.
        </p>
      </section>
      <section className="space-y-3">
        <h3 className="text-lg font-semibold">Sound & motion</h3>
        <div className="flex items-center justify-between gap-5 rounded-xl border border-white/15 p-4">
          <div>
            <p className="font-semibold">Interface sounds</p>
            <p className="mt-1 text-sm text-[var(--secondary)]">
              Generated on-device. Off by default.
            </p>
          </div>
          <Switch
            on={sys.settings.sounds}
            label="Interface sounds"
            change={() => {
              const next = !sys.settings.sounds;
              sys.patch({ sounds: next });
              if (next) playSound('select');
            }}
          />
        </div>
        <div className="flex items-center justify-between gap-5 rounded-xl border border-white/15 p-4">
          <div>
            <p className="font-semibold">Haptics</p>
            <p className="mt-1 text-sm text-[var(--secondary)]">
              Optional vibration, where supported.
            </p>
          </div>
          <Switch
            on={sys.settings.haptics}
            label="Haptics"
            change={() => sys.patch({ haptics: !sys.settings.haptics })}
          />
        </div>
        <div className="rounded-xl border border-white/15 p-4">
          <p className="font-semibold">Motion</p>
          <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Motion">
            {(['full', 'calm'] as const).map((motion) => (
              <button
                key={motion}
                className="button-secondary capitalize"
                onClick={() => sys.patch({ motion })}
                aria-pressed={sys.settings.motion === motion}
              >
                {motion}
              </button>
            ))}
          </div>
          <p className="mt-3 text-sm text-[var(--muted)]">
            Your device’s reduced-motion preference always takes priority. No ambient animations
            run.
          </p>
        </div>
      </section>
      <section>
        <button
          className="button-secondary"
          onClick={() => {
            sys.reset();
            setMessage('Preferences reset. Your whiteboard notes were kept.');
          }}
        >
          Reset preferences
        </button>
        <p className="mt-3 text-sm text-[var(--secondary)]">
          This resets accent, wallpaper, sounds, haptics, and motion. Whiteboard has a separate
          confirmed reset.
        </p>
        <p role="status" className="mt-3 text-sm text-[var(--accent)]">
          {message}
        </p>
      </section>
    </div>
  );
}

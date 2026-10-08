'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import { MotionConfig } from 'framer-motion';
import { ArrowUpRight, FileText, HelpCircle, Search } from 'lucide-react';
import { ownerProfile } from '@/data/ownerProfile';
import {
  ACCENTS,
  buzz,
  DEFAULT_SETTINGS,
  loadSettings,
  playSound,
  resetOSView,
  resolvedWallpaper,
  saveSettings,
  type OSSettings,
  type SoundName,
} from '@/lib/feedback';
import { desktopReducer, INITIAL_DESKTOP } from '@/lib/os-state';
import AppBody from './AppBody';
import AppErrorBoundary from './AppErrorBoundary';
import { APPS, APP_MAP, type AppDef, type SearchItem } from './app-registry';
import CommandPalette from './CommandPalette';
import DesktopClock from './DesktopClock';
import HelpDialog from './HelpDialog';
import { useReducedPreference, useViewport } from './hooks';
import WindowFrame from './Window';

export default function PersonalOS() {
  const [desktop, dispatch] = useReducer(desktopReducer, INITIAL_DESKTOP);
  const [settings, setSettings] = useState<OSSettings>({ ...DEFAULT_SETTINGS });
  const [ready, setReady] = useState(false);
  const [persisted, setPersisted] = useState(true);
  const [hour, setHour] = useState(20);
  const [palette, setPalette] = useState(false);
  const [help, setHelp] = useState(false);
  const viewport = useViewport();
  const phone = viewport.width < 768;
  const reduced = useReducedPreference();
  const calm = settings.motion === 'calm' || !!reduced;
  const blocked = palette || help;
  const accent = ACCENTS.find((item) => item.id === settings.accentId) ?? ACCENTS[0];
  const wallpaper = resolvedWallpaper(settings.wallpaper, hour);
  useEffect(() => {
    setSettings(loadSettings());
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready) setPersisted(saveSettings(settings));
  }, [ready, settings]);
  useEffect(() => {
    const update = () => {
      if (!document.hidden) setHour(new Date().getHours());
    };
    update();
    const timer = setInterval(update, 60000);
    document.addEventListener('visibilitychange', update);
    const keyboard = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      const typing =
        ['INPUT', 'TEXTAREA', 'SELECT'].includes(target?.tagName) || target?.isContentEditable;
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setPalette((current) => !current);
        setHelp(false);
      } else if (event.key === '/' && !typing) {
        event.preventDefault();
        setPalette(true);
        setHelp(false);
      }
    };
    window.addEventListener('keydown', keyboard);
    return () => {
      clearInterval(timer);
      document.removeEventListener('visibilitychange', update);
      window.removeEventListener('keydown', keyboard);
    };
  }, []);
  const feedback = (sound: SoundName) => {
    if (settings.sounds) playSound(sound);
    if (settings.haptics) buzz();
  };
  const patch = useCallback(
    (change: Partial<OSSettings>) => setSettings((current) => ({ ...current, ...change })),
    [],
  );
  const reset = useCallback(() => {
    resetOSView();
    setSettings({ ...DEFAULT_SETTINGS });
  }, []);
  const sys = useMemo(
    () => ({ settings, patch, reset, persisted }),
    [settings, patch, reset, persisted],
  );
  const open = (id: string) => {
    const title = id.startsWith('case:')
      ? `${ownerProfile.projects.find((project) => project.id === id.slice(5))?.name ?? 'Project'} — case study`
      : (APP_MAP[id]?.name ?? id);
    dispatch({ type: 'open', id, title });
    feedback('open');
    setPalette(false);
    setHelp(false);
  };
  const dock = (id: string) => {
    const win = desktop.windows.find((item) => item.id === id);
    if (!win || win.minimized) open(id);
    else if (desktop.activeId === id) {
      dispatch({ type: 'minimize', id });
      feedback('minimize');
    } else dispatch({ type: 'focus', id });
  };
  const select = (item: SearchItem) => {
    if (item.type === 'link') window.location.href = item.id;
    else open(item.type === 'case' ? `case:${item.id}` : item.id);
  };
  const favorites = ['projects', 'journey', 'contact', 'settings'];
  const extraWindows = desktop.windows.filter((win) => !favorites.includes(win.id));
  const layers = [...desktop.windows].sort((a, b) => a.z - b.z).map((win) => win.id);
  const chromeBlocked = blocked || (phone && desktop.activeId !== null);
  return (
    <MotionConfig reducedMotion="user">
      <div
        className={`personal-os fixed inset-0 flex h-dvh flex-col overflow-hidden text-white ${calm ? 'motion-calm' : ''}`}
        style={
          { '--acc1': accent.a, '--acc2': accent.b, '--accent': accent.a } as React.CSSProperties
        }
      >
        <div
          className={`pointer-events-none absolute inset-0 wp-${wallpaper}`}
          aria-hidden="true"
        />
        <div className="relative flex min-h-0 flex-1 flex-col" inert={chromeBlocked}>
          <header className="relative z-10 flex min-h-16 shrink-0 flex-wrap items-center justify-between gap-3 border-b border-white/20 bg-[#10121ddd] px-4 py-2 pt-[max(8px,env(safe-area-inset-top))] md:px-6">
            <Link href="/" className="inline-flex min-h-11 items-center gap-2 font-semibold">
              <span className="brand-symbol !h-8 !w-8 !text-xl" aria-hidden="true">
                P
              </span>
              PawanOS
              <span className="hidden text-xs font-normal text-[var(--muted)] xl:inline">
                {' '}
                / interactive desktop
              </span>
            </Link>
            <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
              <button
                className="min-h-11 rounded-lg px-3 text-sm hover:bg-white/10"
                onClick={() => open('projects')}
              >
                Work
              </button>
              <button
                className="min-h-11 rounded-lg px-3 text-sm hover:bg-white/10"
                onClick={() => open('journey')}
              >
                About
              </button>
              <Link
                className="flex min-h-11 items-center rounded-lg px-3 text-sm hover:bg-white/10"
                href="/resume"
              >
                Resume
              </Link>
              <button
                className="min-h-11 rounded-lg px-3 text-sm hover:bg-white/10"
                onClick={() => open('contact')}
              >
                Contact
              </button>
            </nav>
            <div className="flex items-center gap-1">
              <span className="hidden px-2 sm:inline">
                <DesktopClock />
              </span>
              <button
                className="flex h-11 w-11 items-center justify-center rounded-lg hover:bg-white/10"
                aria-label="How to use PawanOS"
                onClick={() => setHelp(true)}
              >
                <HelpCircle size={18} aria-hidden="true" />
              </button>
              <button
                className="flex h-11 w-11 items-center justify-center rounded-lg hover:bg-white/10"
                aria-label="Open search"
                onClick={() => setPalette(true)}
              >
                <Search size={18} aria-hidden="true" />
              </button>
            </div>
          </header>
          <main className="relative min-h-0 flex-1 overflow-y-auto px-4 pb-32 pt-6 md:px-8 md:pt-9">
            <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1fr_340px]">
              <div className="order-2 lg:order-1">
                <section className="os-surface p-4" aria-labelledby="os-apps-heading">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <h2 id="os-apps-heading" className="text-sm font-semibold">
                      Start with the work
                    </h2>
                    <span className="font-mono text-[11px] text-[var(--muted)]">
                      / or ⌘ K to search
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-1 md:grid-cols-6">
                    {APPS.filter((app) => app.primary).map((app) => (
                      <AppTile key={app.id} app={app} open={() => open(app.id)} />
                    ))}
                    <Link href="/resume" className="os-tile">
                      <span className="os-app-icon bg-gradient-to-br from-slate-500 to-slate-700">
                        <FileText size={24} aria-hidden="true" />
                      </span>
                      <span>Resume</span>
                    </Link>
                  </div>
                </section>
                <details className="os-surface mt-5 p-4">
                  <summary className="flex min-h-11 items-center text-sm font-semibold">
                    More apps & utilities{' '}
                    <span className="ml-auto text-xs text-[var(--muted)]">Explore</span>
                  </summary>
                  <div className="mt-3 grid grid-cols-4 gap-1 md:grid-cols-5">
                    {APPS.filter((app) => !app.primary).map((app) => (
                      <AppTile key={app.id} app={app} open={() => open(app.id)} />
                    ))}
                  </div>
                </details>
                <p className="os-surface mt-4 p-3 text-sm leading-relaxed text-white">
                  Minimize to keep a draft. Every open window has a dock button. Prefer a page?{' '}
                  <Link
                    href="/work"
                    className="rounded bg-[#10121ddd] px-1 text-[var(--acc1)] underline underline-offset-4"
                  >
                    Read the work directly.
                  </Link>
                </p>
              </div>
              <section
                className="os-surface order-1 self-start p-6 lg:order-2"
                aria-labelledby="os-owner-heading"
              >
                <p className="eyebrow !text-[var(--acc1)]">AI Product Developer</p>
                <h1 id="os-owner-heading" className="mt-3 text-3xl font-semibold tracking-tight">
                  Pawan Hiray<span className="text-[var(--acc1)]">.</span>
                </h1>
                <p className="mt-4 text-[15px] leading-relaxed text-[var(--secondary)]">
                  {ownerProfile.identity.intro}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <button className="button-primary" onClick={() => open('projects')}>
                    View my work <ArrowUpRight size={16} aria-hidden="true" />
                  </button>
                  <button className="button-secondary" onClick={() => open('contact')}>
                    Contact
                  </button>
                </div>
                <p className="mt-4 text-xs leading-relaxed text-[var(--muted)]">
                  {ownerProfile.identity.availability}
                </p>
                <Link
                  href="/"
                  className="text-link mt-4 inline-flex min-h-11 items-center gap-2 text-sm"
                >
                  Quick reading view <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
              </section>
            </div>
          </main>
          <nav
            aria-label="Dock"
            className="absolute inset-x-0 bottom-[max(10px,env(safe-area-inset-bottom))] z-20 flex justify-center px-3"
          >
            <div className="os-dock flex max-w-full items-center gap-1 overflow-x-auto p-1.5">
              {favorites.map((id) => {
                const app = APP_MAP[id];
                const win = desktop.windows.find((item) => item.id === id);
                return (
                  <button
                    key={id}
                    aria-label={`Dock: ${app.name}`}
                    aria-pressed={desktop.activeId === id}
                    onClick={() => dock(id)}
                    title={`${app.name}${win?.minimized ? ' — minimized' : ''}`}
                  >
                    <app.icon size={21} aria-hidden="true" />
                    <span>{app.name}</span>
                    {win && (
                      <span
                        className={`h-1 w-1 rounded-full ${win.minimized ? 'bg-[#a4a9bc]' : 'bg-white'}`}
                        aria-hidden="true"
                      />
                    )}
                  </button>
                );
              })}
              {extraWindows.length > 0 && (
                <span className="mx-1 h-9 w-px shrink-0 bg-white/20" aria-hidden="true" />
              )}
              {extraWindows.map((win) => (
                <button
                  key={win.id}
                  aria-label={`Dock: ${win.title}`}
                  aria-pressed={desktop.activeId === win.id}
                  onClick={() => dock(win.id)}
                  title={`${win.title}${win.minimized ? ' — minimized' : ''}`}
                >
                  <FileText size={21} aria-hidden="true" />
                  <span className="max-w-24 truncate">
                    {win.title.replace(' — case study', '')}
                  </span>
                </button>
              ))}
              <span className="mx-1 h-9 w-px shrink-0 bg-white/20" aria-hidden="true" />
              <button aria-label="Dock: Search" onClick={() => setPalette(true)}>
                <Search size={21} aria-hidden="true" />
                <span>Search</span>
              </button>
            </div>
          </nav>
        </div>
        {desktop.windows.map((win) => (
          <WindowFrame
            key={win.id}
            win={win}
            viewport={viewport}
            layer={1000 + layers.indexOf(win.id) * 2}
            focused={desktop.activeId === win.id}
            springs={!calm}
            blocked={blocked}
            onFocus={() => dispatch({ type: 'focus', id: win.id })}
            onClose={() => {
              dispatch({ type: 'close', id: win.id });
              feedback('close');
            }}
            onMinimize={() => {
              dispatch({ type: 'minimize', id: win.id });
              feedback('minimize');
            }}
            onToggleMax={() => dispatch({ type: 'toggle-max', id: win.id })}
          >
            <AppErrorBoundary name={win.title}>
              <AppBody id={win.id} openCase={(id) => open(`case:${id}`)} sys={sys} />
            </AppErrorBoundary>
          </WindowFrame>
        ))}
        {palette && <CommandPalette close={() => setPalette(false)} select={select} />}
        {help && <HelpDialog close={() => setHelp(false)} />}
      </div>
    </MotionConfig>
  );
}

function AppTile({ app, open }: { app: AppDef; open: () => void }) {
  return (
    <button className="os-tile" aria-label={`Open ${app.name}: ${app.desc}`} onClick={open}>
      <span className={`os-app-icon bg-gradient-to-br ${app.tint}`}>
        <app.icon size={24} strokeWidth={1.8} aria-hidden="true" />
      </span>
      <span>{app.name}</span>
    </button>
  );
}

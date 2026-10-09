'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import { MotionConfig } from 'framer-motion';
import {
  ArrowUpRight,
  BatteryFull,
  FileText,
  HelpCircle,
  Search,
  Signal,
  Sparkles,
  Wifi,
} from 'lucide-react';
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

const HOME_APP_IDS = new Set([
  ...APPS.filter((app) => app.primary).map((app) => app.id),
  'systems',
  'achievements',
]);
const HOME_APPS = APPS.filter((app) => HOME_APP_IDS.has(app.id));
const LIBRARY_APPS = APPS.filter((app) => !HOME_APP_IDS.has(app.id));
const FAVORITES = ['projects', 'journey', 'contact', 'settings'];

function greeting(hour: number) {
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

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
  const extraWindows = desktop.windows.filter((win) => !FAVORITES.includes(win.id));
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
        <div
          className="os-wallpaper-glow pointer-events-none absolute inset-0"
          aria-hidden="true"
        />

        <div className="relative flex min-h-0 flex-1 flex-col" inert={chromeBlocked}>
          <header className="os-system-bar">
            <div className="os-system-left">
              <span className="os-mobile-time">
                <DesktopClock />
              </span>
              <Link href="/" className="os-system-brand" aria-label="PawanOS home">
                <span className="os-start-mark" aria-hidden="true">
                  P
                </span>
                <span>PawanOS</span>
              </Link>
              <nav aria-label="Desktop menu" className="os-menu-links">
                <button onClick={() => open('projects')}>Work</button>
                <button onClick={() => open('journey')}>About</button>
                <Link href="/resume">Resume</Link>
                <button onClick={() => open('contact')}>Contact</button>
              </nav>
            </div>

            <div className="os-dynamic-island" aria-hidden="true">
              <span />
              <strong>PawanOS</strong>
            </div>

            <div className="os-system-right">
              <button
                className="os-system-action"
                aria-label="How to use PawanOS"
                onClick={() => setHelp(true)}
              >
                <HelpCircle size={16} aria-hidden="true" />
              </button>
              <button
                className="os-system-action"
                aria-label="Open search"
                onClick={() => setPalette(true)}
              >
                <Search size={16} aria-hidden="true" />
                <span className="os-search-shortcut">⌘ K</span>
              </button>
              <span className="os-status-icons" aria-hidden="true">
                <Signal size={15} fill="currentColor" />
                <Wifi size={16} />
                <BatteryFull size={19} />
              </span>
              <span className="os-desktop-time">
                <DesktopClock />
              </span>
            </div>
          </header>

          <main id="main-content" className="os-workspace">
            <div className="os-workspace-shell">
              <section className="os-owner-widget" aria-labelledby="os-owner-heading">
                <div className="os-owner-topline">
                  <span className="os-avatar" aria-hidden="true">
                    PH
                  </span>
                  <span className="os-online-pill">
                    <i aria-hidden="true" /> Available for work
                  </span>
                  <button
                    className="os-mobile-help"
                    aria-label="How to use PawanOS"
                    onClick={() => setHelp(true)}
                  >
                    <HelpCircle size={19} aria-hidden="true" />
                  </button>
                </div>
                <p className="os-widget-kicker">
                  <Sparkles size={13} aria-hidden="true" /> {greeting(hour)}
                </p>
                <h1 id="os-owner-heading">
                  I’m Pawan<span>.</span>
                </h1>
                <p className="os-owner-role">AI Product Developer · Mumbai, India</p>
                <p className="os-owner-intro">{ownerProfile.identity.intro}</p>
                <div className="os-owner-actions">
                  <button className="button-primary" onClick={() => open('projects')}>
                    View my work <ArrowUpRight size={16} aria-hidden="true" />
                  </button>
                  <button className="button-secondary" onClick={() => open('contact')}>
                    Let’s talk
                  </button>
                </div>
                <div className="os-widget-stats" aria-label="Portfolio summary">
                  <span>
                    <strong>03</strong>
                    <small>featured builds</small>
                  </span>
                  <span>
                    <strong>09</strong>
                    <small>case files</small>
                  </span>
                  <span>
                    <strong>Open</strong>
                    <small>junior & freelance</small>
                  </span>
                </div>
              </section>

              <section className="os-launch-area" aria-labelledby="os-apps-heading">
                <div className="os-mobile-search-row">
                  <button className="os-search-pill" onClick={() => setPalette(true)}>
                    <Search size={17} aria-hidden="true" />
                    <span>Search apps and projects</span>
                  </button>
                </div>
                <div className="os-section-heading">
                  <div>
                    <p className="os-section-kicker">Workspace</p>
                    <h2 id="os-apps-heading">Apps</h2>
                  </div>
                  <span>Open an app to explore</span>
                </div>
                <div className="os-app-grid">
                  {HOME_APPS.map((app) => (
                    <AppTile key={app.id} app={app} open={() => open(app.id)} />
                  ))}
                  <Link
                    href="/resume"
                    className="os-tile"
                    aria-label="Open Resume: One-page HTML and PDF resume"
                  >
                    <span className="os-app-icon bg-gradient-to-br from-slate-500 to-slate-700">
                      <FileText size={25} strokeWidth={1.8} aria-hidden="true" />
                    </span>
                    <span className="os-app-label">Resume</span>
                  </Link>
                </div>

                <details className="os-app-library">
                  <summary>
                    <span className="os-library-icon" aria-hidden="true">
                      <i />
                      <i />
                      <i />
                      <i />
                    </span>
                    <span>
                      <strong>App Library</strong>
                      <small>{LIBRARY_APPS.length} tools & utilities</small>
                    </span>
                    <span className="os-library-open">Open</span>
                  </summary>
                  <div className="os-library-grid">
                    {LIBRARY_APPS.map((app) => (
                      <AppTile key={app.id} app={app} open={() => open(app.id)} />
                    ))}
                  </div>
                </details>
              </section>

              <p className="os-workspace-note">
                <span aria-hidden="true">●</span> Windows remember drafts when minimized. Press{' '}
                <kbd>⌘ K</kbd> to search, or use the dock below.{' '}
                <Link href="/work">Open the reading view</Link>.
              </p>
            </div>
          </main>

          <nav aria-label="Dock" className="os-taskbar">
            <div className="os-dock">
              {FAVORITES.map((id) => {
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
                    <span className={`os-dock-icon bg-gradient-to-br ${app.tint}`}>
                      <app.icon size={21} strokeWidth={1.8} aria-hidden="true" />
                    </span>
                    <span className="os-dock-label">{app.name}</span>
                    {win && (
                      <span
                        className={`os-running-dot ${win.minimized ? 'is-minimized' : ''}`}
                        aria-hidden="true"
                      />
                    )}
                  </button>
                );
              })}
              {extraWindows.length > 0 && <span className="os-dock-divider" aria-hidden="true" />}
              {extraWindows.map((win) => (
                <button
                  key={win.id}
                  aria-label={`Dock: ${win.title}`}
                  aria-pressed={desktop.activeId === win.id}
                  onClick={() => dock(win.id)}
                  title={`${win.title}${win.minimized ? ' — minimized' : ''}`}
                >
                  <span className="os-dock-icon os-document-icon">
                    <FileText size={21} aria-hidden="true" />
                  </span>
                  <span className="os-dock-label">{win.title.replace(' — case study', '')}</span>
                </button>
              ))}
              <span className="os-dock-divider os-search-divider" aria-hidden="true" />
              <button aria-label="Dock: Search" onClick={() => setPalette(true)}>
                <span className="os-dock-icon os-search-icon">
                  <Search size={21} aria-hidden="true" />
                </span>
                <span className="os-dock-label">Search</span>
              </button>
            </div>
            <span className="os-home-indicator" aria-hidden="true" />
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
        <app.icon size={25} strokeWidth={1.8} aria-hidden="true" />
      </span>
      <span className="os-app-label">{app.name}</span>
    </button>
  );
}

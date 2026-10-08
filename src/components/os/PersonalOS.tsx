'use client';

import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import {
  BarChart3, BatteryMedium, BookOpen, Compass, FileText, FolderKanban, FolderOpen, Globe, Globe2,
  Mail, Search, Settings, Share2, Signal, Siren, StickyNote, Trophy, Wifi, Workflow, type LucideIcon,
} from 'lucide-react';
import WindowFrame, { WinState } from './Window';
import {
  AchievementsApp, BrowserApp, CaseDetailApp, CaseFilesApp, ContactApp, EmergencyApp, FounderTxtApp,
  JourneyApp, NotesApp, ProjectsApp, ProofApp, ResultsApp, SettingsApp, SocialsApp, SystemsApp, WhiteboardApp,
  type SysControls,
} from './apps';
import { ACCENTS, DEFAULT_SETTINGS, OSSettings, buzz, loadSettings, playSound, saveSettings, type SoundName } from '@/lib/feedback';
import { ownerProfile } from '@/data/ownerProfile';

interface AppDef {
  id: string;
  name: string;
  desc: string;
  badge?: string;
  icon: LucideIcon;
  tint: string;
  stateText?: string;
}

const APPS: AppDef[] = [
  { id: 'projects', name: 'Projects', desc: 'Selected case files', badge: 'MAIN DRIVE', icon: FolderKanban, tint: 'from-amber-400 to-orange-600', stateText: '9 case files' },
  { id: 'results', name: 'Results', desc: 'Outcomes + disclosures', badge: 'PROOF VAULT', icon: BarChart3, tint: 'from-emerald-400 to-teal-600', stateText: 'project outcomes' },
  { id: 'systems', name: 'Systems', desc: 'How the work ships', icon: Workflow, tint: 'from-sky-400 to-blue-600' },
  { id: 'proof', name: 'Proof', desc: 'Awaiting approved proof', icon: BookOpen, tint: 'from-rose-400 to-pink-600' },
  { id: 'journey', name: 'Journey', desc: '2018 to now', icon: Compass, tint: 'from-violet-400 to-purple-600' },
  { id: 'achievements', name: 'Achievements', desc: 'Shipped and earned', icon: Trophy, tint: 'from-yellow-300 to-amber-600' },
  { id: 'socials', name: 'Socials', desc: 'Where I publish', icon: Share2, tint: 'from-cyan-400 to-sky-600' },
  { id: 'contact', name: 'Contact', desc: 'Book and brief me', badge: 'REPLIES 48H', icon: Mail, tint: 'from-blue-400 to-indigo-600' },
  { id: 'founder', name: 'Founder.txt', desc: 'A personal note', icon: FileText, tint: 'from-slate-300 to-slate-500' },
  { id: 'whiteboard', name: 'Whiteboard', desc: 'Local sticky notes', icon: StickyNote, tint: 'from-lime-300 to-green-600' },
  { id: 'browser', name: 'PawanNet', desc: 'Approved bookmarks', icon: Globe2, tint: 'from-teal-300 to-cyan-600' },
  { id: 'cases', name: 'Case Files', desc: 'Explorer for everything', icon: FolderOpen, tint: 'from-orange-300 to-amber-600' },
  { id: 'notes', name: 'Field Notes', desc: 'Articles and drafts', icon: Globe, tint: 'from-fuchsia-400 to-violet-600' },
  { id: 'emergency', name: 'Emergency', desc: 'Urgent builds only', icon: Siren, tint: 'from-red-400 to-rose-600' },
  { id: 'settings', name: 'Settings', desc: 'Make it yours', icon: Settings, tint: 'from-slate-400 to-slate-600' },
];

const APP_MAP: Record<string, AppDef> = Object.fromEntries(APPS.map((a) => [a.id, a]));

const DESCRIPTORS = ['PawanOS', 'AI SYSTEMS OPERATOR', 'WEB + AI BUILDER', 'FOUNDER MODE: ACTIVE'];
const TRANSMISSIONS = [
  'Ship the smallest system that removes ten manual steps.',
  'Honest metrics beat big metrics. Label everything.',
  'If it only works on your laptop, it does not work.',
  'One sharp outcome per build. Two outcomes is zero outcomes.',
  'Document the handoff before you need the handoff.',
  'Serve the community first. Vanity metrics never.',
  'Debug at 3AM if you must — write the runbook at 10AM.',
];

const WALLPAPER: Record<'day' | 'night' | 'dark', string> = {
  day: 'wp-day',
  night: 'wp-night',
  dark: 'wp-dark',
};

export default function PersonalOS() {
  const [booted, setBooted] = useState(false);
  const [windows, setWindows] = useState<WinState[]>([]);
  const [caseId, setCaseId] = useState('mustudentsunited');
  const [palette, setPalette] = useState(false);
  const [query, setQuery] = useState('');
  const [theme, setTheme] = useState<'day' | 'night' | 'dark'>('dark');
  const [now, setNow] = useState(new Date());
  const [descIdx, setDescIdx] = useState(0);
  const [callDismissed, setCallDismissed] = useState(false);
  const [showTour, setShowTour] = useState(false);
  const [settings, setSettings] = useState<OSSettings>(DEFAULT_SETTINGS);
  const accent = ACCENTS.find((a) => a.id === settings.accentId) ?? ACCENTS[0];
  const calm = settings.motion === 'calm';
  const [transIdx] = useState(() => new Date().getDate() % TRANSMISSIONS.length);

  useEffect(() => {
    setSettings(loadSettings());
    try {
      const saved = localStorage.getItem('personal-os-theme-v1') as 'day' | 'night' | 'dark' | null;
      if (saved) {
        setTheme(saved);
      } else {
        // Dynamic default: match the wallpaper to the visitor's local time until they pick one.
        const h = new Date().getHours();
        setTheme(h >= 6 && h < 17 ? 'day' : h >= 17 && h < 20 ? 'night' : 'dark');
      }
    } catch { /* storage unavailable */ }
    try {
      if (!localStorage.getItem('personal-os-tour-v1')) setShowTour(true);
    } catch { /* storage unavailable */ }
    const seen = (() => {
      try { return sessionStorage.getItem('personal-os-boot-v1'); } catch { return '1'; }
    })();
    const t = setTimeout(
      () => {
        setBooted(true);
        try { sessionStorage.setItem('personal-os-boot-v1', '1'); } catch { /* ignore */ }
      },
      seen ? 500 : 1300,
    );
    const clock = setInterval(() => setNow(new Date()), 20000);
    const morph = setInterval(() => setDescIdx((i) => (i + 1) % DESCRIPTORS.length), 3200);
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      const typing = tag === 'INPUT' || tag === 'TEXTAREA' || (e.target as HTMLElement)?.isContentEditable;
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPalette((p) => !p);
      } else if (e.key === '/' && !typing) {
        e.preventDefault();
        setPalette(true);
      } else if (e.key === 'Escape') {
        setPalette(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      clearTimeout(t);
      clearInterval(clock);
      clearInterval(morph);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  useEffect(() => {
    try { localStorage.setItem('personal-os-theme-v1', theme); } catch { /* ignore */ }
  }, [theme]);

  const zTop = useMemo(() => windows.reduce((m, w) => Math.max(m, w.z), 0), [windows]);
  const visible = useMemo(() => windows.filter((w) => !w.minimized), [windows]);
  const openIds = useMemo(() => new Set(windows.map((w) => w.id.split(':')[0])), [windows]);
  const minimizedIds = useMemo(
    () => new Set(windows.filter((w) => w.minimized).map((w) => w.id.split(':')[0])),
    [windows],
  );

  const sfx = (n: SoundName) => {
    if (settings.sounds) playSound(n);
  };
  const hum = (p: number | number[] = 12) => {
    if (settings.haptics) buzz(p);
  };
  const patch = (p: Partial<OSSettings>) => {
    setSettings((s) => {
      const next = { ...s, ...p };
      saveSettings(next);
      return next;
    });
  };
  const resetAll = () => {
    setSettings({ ...DEFAULT_SETTINGS });
    const h = new Date().getHours();
    setTheme(h >= 6 && h < 17 ? 'day' : h >= 17 && h < 20 ? 'night' : 'dark');
  };
  const sys: SysControls = {
    theme,
    setTheme: (t) => {
      setTheme(t);
      sfx('toggle');
    },
    settings,
    patch,
    resetAll,
  };

  const openApp = (app: string, state?: string) => {
    sfx('open');
    hum(14);
    if (app === 'case' && state) setCaseId(state);
    const id = app === 'case' ? `case:${state ?? caseId}` : app;
    setWindows((ws) => {
      const ex = ws.find((w) => w.id === id);
      if (ex) return ws.map((w) => (w.id === id ? { ...w, z: zTop + 1, minimized: false } : w));
      const def = APP_MAP[app];
      return [
        ...ws,
        {
          id,
          title: app === 'case' ? 'Case file' : def ? `${def.name}${def.stateText ? ` — ${def.stateText}` : ''}` : app,
          z: zTop + 1,
        },
      ];
    });
    setPalette(false);
    setQuery('');
  };

  const closeWin = (id: string) => {
    sfx('close');
    hum(10);
    setWindows((ws) => ws.filter((w) => w.id !== id));
  };
  const dismissTour = () => {
    setShowTour(false);
    try { localStorage.setItem('personal-os-tour-v1', '1'); } catch { /* ignore */ }
  };
  const focusWin = (id: string) => setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, z: zTop + 1 } : w)));
  const minimizeWin = (id: string) => {
    sfx('minimize');
    hum(8);
    setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, minimized: true } : w)));
  };
  const toggleMax = (id: string) => {
    sfx('toggle');
    setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, maximized: !w.maximized } : w)));
  };
  const openPalette = () => {
    setPalette(true);
    sfx('select');
  };

  /** Dock/taskbar behavior: open → focus → minimize → restore */
  const dockActivate = (appId: string) => {
    const id = appId;
    const win = windows.find((w) => w.id === id || w.id.startsWith(`${id}:`));
    if (!win) return openApp(appId);
    if (win.minimized) {
      setWindows((ws) => ws.map((w) => (w.id === win.id ? { ...w, minimized: false, z: zTop + 1 } : w)));
    } else if (win.z === zTop) {
      minimizeWin(win.id);
    } else {
      focusWin(win.id);
    }
  };

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const items = [
      ...APPS.map((a) => ({ type: 'app' as const, id: a.id, label: a.name, hint: a.desc })),
      ...ownerProfile.projects.map((p) => ({ type: 'case' as const, id: p.id, label: p.name, hint: p.category })),
      { type: 'app' as const, id: 'contact', label: 'Book a call', hint: 'mailto booking' },
      { type: 'app' as const, id: 'whiteboard', label: 'Add a sticky note', hint: 'local whiteboard' },
    ];
    if (!q) return items;
    return items.filter((i) => (i.label + ' ' + i.hint).toLowerCase().includes(q)).slice(0, 12);
  }, [query]);

  if (!booted) {
    return (
      <div className="wp-dark fixed inset-0 z-[9000] flex flex-col items-center justify-center px-6 text-center text-white">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--acc1)] to-[var(--acc2)] text-[28px] font-black shadow-2xl">P</div>
        <p className="mt-5 text-[20px] font-bold tracking-tight">PawanOS</p>
        <p className="mt-1 text-[14px] text-white/60">projects · results · proof · contact</p>
        <div className="mt-5 h-1 w-52 overflow-hidden rounded-full bg-white/15">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-[var(--acc1)] to-[var(--acc2)]"
            initial={{ width: '8%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
          />
        </div>
        <button onClick={() => setBooted(true)} className="mt-6 min-h-[44px] rounded-lg border border-white/25 px-5 text-[15px] hover:bg-white/10">
          Skip
        </button>
      </div>
    );
  }

  return (
    <MotionConfig reducedMotion="user">
    <div
      className={`fixed inset-0 flex h-[100dvh] flex-col overflow-hidden text-white ${calm ? 'motion-calm' : ''}`}
      style={{ '--acc1': accent.a, '--acc2': accent.b } as React.CSSProperties}
    >
      {/* Per-theme wallpaper + drifting light + grain */}
      <div className={`pointer-events-none absolute inset-0 ${WALLPAPER[theme]}`} aria-hidden />
      {!calm && (
        <>
          <motion.div
            className="pointer-events-none absolute -left-24 top-1/4 h-96 w-96 rounded-full bg-white/10 blur-3xl"
            aria-hidden
            animate={{ y: [0, -36, 0], x: [0, 20, 0] }}
            transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="pointer-events-none absolute -right-24 bottom-1/4 h-96 w-96 rounded-full bg-white/[0.07] blur-3xl"
            aria-hidden
            animate={{ y: [0, 30, 0], x: [0, -24, 0] }}
            transition={{ duration: 32, repeat: Infinity, ease: 'easeInOut' }}
          />
        </>
      )}
      <div className="grain pointer-events-none absolute inset-0" aria-hidden />

      {/* ── PHONE STATUS BAR (Android × iOS hybrid) ── */}
      <header className="relative z-[200] flex h-11 shrink-0 items-center justify-between border-b border-white/10 bg-black/45 px-4 backdrop-blur-2xl md:hidden">
        <span className="min-w-[64px] text-[14px] font-semibold tracking-tight" aria-label={`Current time ${now.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}`}>
          {now.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' }).replace(/^0/, '')}
        </span>
        <span className="text-[13px] font-bold tracking-tight">PawanOS</span>
        <span className="flex min-w-[64px] items-center justify-end gap-1.5">
          <span className="flex items-center gap-1 text-white/85" aria-hidden>
            <Signal size={14} /> <Wifi size={14} /> <BatteryMedium size={18} />
          </span>
          <button
            onClick={() => openApp('contact')}
            className="ml-1 min-h-[32px] rounded-full bg-white px-3 text-[12.5px] font-bold text-black"
          >
            Book
          </button>
        </span>
      </header>

      {/* ── DESKTOP MENU BAR (Windows × macOS hybrid) ── */}
      <header className="relative z-[200] hidden h-12 shrink-0 items-center gap-1.5 border-b border-white/10 bg-black/45 px-3 text-[13px] backdrop-blur-2xl md:flex">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--acc1)] to-[var(--acc2)] text-[15px] font-black text-white shadow" aria-hidden>
          P
        </span>
        <span className="text-[14px] font-bold tracking-tight">PawanOS</span>
        <nav className="ml-2 hidden items-center gap-0.5 md:flex" aria-label="Primary">
          {(['projects', 'results', 'journey'] as const).map((a) => (
            <button
              key={a}
              onClick={() => openApp(a)}
              className="min-h-[36px] rounded-md px-2.5 font-medium capitalize text-white/75 hover:bg-white/10 hover:text-white"
            >
              {a}
            </button>
          ))}
          <button
            onClick={openPalette}
            className="flex min-h-[36px] items-center gap-1.5 rounded-md px-2.5 text-white/75 hover:bg-white/10 hover:text-white"
          >
            <Search size={14} /> Search
          </button>
          <button
            onClick={() => openApp('settings')}
            aria-label="Open Settings"
            title="Settings"
            className="flex min-h-[36px] min-w-[36px] items-center justify-center rounded-md px-2 text-white/75 hover:bg-white/10 hover:text-white"
          >
            <Settings size={15} />
          </button>
      </nav>
        <div className="ml-auto flex items-center gap-2">
          <span className="hidden items-center gap-1.5 rounded-full bg-emerald-400/15 px-2.5 py-1 text-[12px] font-medium text-emerald-300 sm:flex" title={ownerProfile.identity.availability}>
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" aria-hidden /> Open to work
          </span>
          <div className="flex overflow-hidden rounded-lg border border-white/15" role="group" aria-label="Appearance">
            {(['day', 'night', 'dark'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                aria-pressed={theme === t}
                className={`min-h-[36px] px-2.5 capitalize ${theme === t ? 'bg-white/20 text-white' : 'text-white/55 hover:text-white'}`}
              >
                {t}
              </button>
            ))}
          </div>
          <span className="hidden text-[12px] text-white/55 lg:inline">
            {now.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} ·{' '}
            {now.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
          </span>
          <button
            onClick={() => openApp('contact')}
            className="min-h-[36px] rounded-lg bg-white px-3.5 text-[13px] font-bold text-black hover:bg-white/85"
          >
            Book a call
          </button>
        </div>
      </header>

      {/* iOS-style home indicator (phones only) */}
      <div className="pointer-events-none fixed bottom-1 left-1/2 z-[560] h-1 w-32 -translate-x-1/2 rounded-full bg-white/40 md:hidden" aria-hidden />

      {/* ── DESKTOP ──────────────────────────────── */}
      <main className="relative min-h-0 flex-1 overflow-y-auto lg:overflow-hidden">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 p-4 pb-44 sm:p-6 lg:grid lg:h-full lg:grid-cols-[1fr_330px] lg:pb-28">
          {/* App icons — left on desktop */}
          <section aria-label="Applications" className="order-2 lg:order-1">
            <div className="grid grid-cols-4 gap-1 sm:grid-cols-4 xl:grid-cols-5">
              {APPS.map((a) => (
                <AppTile key={a.id} app={a} onOpen={() => openApp(a.id)} />
              ))}
            </div>
            <p className="mt-3 hidden text-[13px] text-white/50 lg:block">
              Tip: press <kbd className="rounded-md bg-white/10 px-1.5 py-0.5 font-mono text-[12px]">/</kbd> to search,
              click a dock icon to minimize or restore its window.
            </p>
          </section>

          {/* Identity + transmission — right on desktop, first on phone */}
          <div className="order-1 space-y-4 lg:order-2">
            <section aria-label="Owner identity" className="rounded-2xl border border-white/12 bg-black/45 p-5 shadow-xl backdrop-blur-2xl">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--acc1)] to-[var(--acc2)] text-[22px] font-black shadow-lg" aria-hidden>
                  P
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-violet-300 sm:truncate">
                    {ownerProfile.identity.roles.slice(0, 3).join(' · ')}
                  </p>
                  <h1 className="font-mono text-[20px] font-black leading-tight tracking-tight sm:truncate sm:text-[22px]">
                    {ownerProfile.identity.headline}
                  </h1>
                </div>
              </div>
              <p aria-live="polite" className="mt-2.5 h-5 text-[13px] font-bold tracking-wide text-[var(--acc1)]">
                {DESCRIPTORS[descIdx]}
              </p>
              <p className="mt-1.5 max-w-[60ch] text-[15px] leading-relaxed text-white/75">{ownerProfile.identity.intro}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={() => openApp('projects')}
                  className="min-h-[44px] flex-1 rounded-xl bg-white px-4 py-2.5 text-[15px] font-bold text-black hover:bg-white/85"
                >
                  Enter the Portfolio
                </button>
                <button
                  onClick={() => openApp('contact')}
                  className="min-h-[44px] flex-1 rounded-xl border border-white/25 px-4 py-2.5 text-[15px] font-semibold hover:bg-white/10"
                >
                  Book a call
                </button>
              </div>
              <p className="mt-3 text-[12.5px] text-white/45">10K+ community · Mumbai, India · Open to Remote / Hybrid / Relocate · {ownerProfile.identity.timezone}</p>
              <p className="mt-1.5 text-[12.5px] text-white/45">
                HR in a hurry?{' '}
                <a href="/resume" className="font-semibold text-[var(--acc1)] underline underline-offset-2 hover:brightness-125">
                  Read the plain one-page resume →
                </a>
              </p>
            </section>

            <section aria-label="Daily Transmission" className="rounded-2xl border border-white/12 bg-black/45 p-4 shadow-xl backdrop-blur-2xl">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden />
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/55">
                  Daily Transmission · {now.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                </p>
              </div>
              <p className="mt-2 text-[16px] leading-snug text-white/90">“{TRANSMISSIONS[transIdx]}”</p>
              <button
                onClick={() => openApp('whiteboard')}
                className="mt-3 min-h-[44px] w-full rounded-xl bg-white/10 text-[15px] font-semibold hover:bg-white/20"
              >
                + Add a Quick Sticky
              </button>
            </section>
          </div>
        </div>

        {/* Call card — bottom-right pill on desktop, full-width card on phones */}
        {!callDismissed && (
          <aside className="absolute bottom-24 right-4 z-[300] hidden w-64 rounded-2xl border border-white/12 bg-black/55 p-4 shadow-2xl backdrop-blur-2xl md:block" aria-label="Work with Pawan">
            <button onClick={() => setCallDismissed(true)} aria-label="Dismiss" className="float-right -mr-1 -mt-1 rounded-md p-1.5 text-white/50 hover:bg-white/10 hover:text-white">
              <span aria-hidden className="block text-[14px] leading-none">×</span>
            </button>
            <p className="text-[15px] font-bold">Want an OS like this?</p>
            <p className="mt-0.5 text-[13px] text-white/60">Portfolio, AI agents, Web3 builds.</p>
            <a
              href={ownerProfile.conversion.bookingUrl}
              className="mt-3 block min-h-[44px] rounded-xl bg-white px-4 py-2.5 text-center text-[15px] font-bold text-black hover:bg-white/85"
            >
              Book a call
            </a>
          </aside>
        )}
        <div className="mx-4 mb-28 rounded-2xl border border-white/12 bg-black/55 p-4 shadow-xl backdrop-blur-2xl md:hidden">
          <p className="text-[16px] font-bold">Want an OS like this for yourself?</p>
          <a
            href={ownerProfile.conversion.bookingUrl}
            className="mt-2.5 block min-h-[48px] rounded-xl bg-white px-4 py-3 text-center text-[16px] font-bold text-black"
          >
            Book a call
          </a>
        </div>
      </main>

      {/* ── DOCK ─────────────────────────────────── */}
      <nav aria-label="Dock" className="pointer-events-none fixed inset-x-0 bottom-3 z-[550] flex justify-center px-3">
        <div className="pointer-events-auto relative flex max-w-full items-end gap-0.5 overflow-x-auto rounded-2xl border border-white/15 bg-black/55 px-2 py-1.5 shadow-2xl backdrop-blur-2xl">
          <span className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" aria-hidden />
          {APPS.slice(0, 8).map((a) => {
            const Icon = a.icon;
            const open = openIds.has(a.id);
            const min = minimizedIds.has(a.id);
            return (
              <button
                key={a.id}
                onClick={() => dockActivate(a.id)}
                aria-label={`Dock: ${a.name}${min ? ' (minimized — activate to restore)' : ''}`}
                title={a.name}
                className="group relative flex min-h-[56px] w-[60px] shrink-0 flex-col items-center justify-center gap-0.5 rounded-xl px-1 hover:bg-white/10"
              >
                <span className={`flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br shadow ring-1 ring-white/20 transition duration-150 group-hover:scale-110 ${a.tint} ${min ? 'opacity-50 saturate-50' : ''}`}>
                  <Icon size={19} strokeWidth={2} className="text-white" />
                </span>
                <span className="max-w-full truncate text-[9px] font-medium text-white/65">{a.name}</span>
                <span
                  className={`h-1 w-1 rounded-full ${open && !min ? 'bg-white' : min ? 'bg-white/40' : 'bg-transparent'}`}
                  aria-hidden
                />
              </button>
            );
          })}
          <span className="mx-1 mb-2 h-10 w-px shrink-0 bg-white/12" aria-hidden />
          <button
            onClick={openPalette}
            aria-label="Open search"
            title="Search"
            className="group flex min-h-[56px] w-[60px] shrink-0 flex-col items-center justify-center gap-0.5 rounded-xl px-1 hover:bg-white/10"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15 transition duration-150 group-hover:scale-110">
              <Search size={19} className="text-white/85" />
            </span>
            <span className="text-[9px] font-medium text-white/65">Search</span>
            <span className="h-1 w-1" aria-hidden />
          </button>
        </div>
      </nav>

      {/* ── START-HERE HELPER (first visit) ──── */}
      {showTour && (
        <div className="fixed inset-x-0 bottom-24 z-[500] flex justify-center px-4" role="dialog" aria-label="How to use this portfolio">
          <div className="w-full max-w-md rounded-2xl border border-white/15 bg-[#14141d]/95 p-4 shadow-2xl backdrop-blur-2xl">
            <p className="text-[15px] font-bold">New here? It works like a computer.</p>
            <ol className="mt-2 space-y-1.5 text-[14px] text-white/75">
              <li><strong className="text-white">1.</strong> Open <button onClick={() => { openApp('projects'); dismissTour(); }} className="font-semibold text-[var(--acc1)] underline">Projects</button> to see the work.</li>
              <li><strong className="text-white">2.</strong> Open <button onClick={() => { openApp('results'); dismissTour(); }} className="font-semibold text-[var(--acc1)] underline">Results</button> for honest outcomes.</li>
              <li><strong className="text-white">3.</strong> Open <button onClick={() => { openApp('contact'); dismissTour(); }} className="font-semibold text-[var(--acc1)] underline">Contact</button> to book Pawan.</li>
            </ol>
            <button onClick={dismissTour} className="mt-3 min-h-[40px] w-full rounded-lg bg-white/10 text-[14px] font-semibold hover:bg-white/20">
              Got it — explore freely
            </button>
          </div>
        </div>
      )}

      {/* ── WINDOWS ──────────────────────────────── */}
      <AnimatePresence>
      {visible.map((w) => (
        <WindowFrame
          key={w.id}
          win={w}
          focused={w.z === zTop}
          springs={!calm}
          onFocus={() => focusWin(w.id)}
          onClose={() => closeWin(w.id)}
          onMinimize={() => minimizeWin(w.id)}
          onToggleMax={() => toggleMax(w.id)}
        >
          <AppBody id={w.id} onOpenCase={(id) => openApp('case', id)} onOpen={openApp} sys={sys} />
        </WindowFrame>
      ))}
      </AnimatePresence>

      {/* ── COMMAND PALETTE ────────────────────── */}
      <AnimatePresence>
        {palette && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[5400] flex items-start justify-center bg-black/60 p-4 pt-[12vh]"
            onClick={() => setPalette(false)}
          >
            <div
              className="w-full max-w-lg overflow-hidden rounded-2xl border border-white/15 bg-[#14141d] shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-label="Command palette"
            >
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') setPalette(false);
                  if (e.key === 'Enter' && results[0]) {
                    const r = results[0];
                    openApp(r.type === 'case' ? 'case' : r.id, r.type === 'case' ? r.id : undefined);
                  }
                }}
                placeholder="Search apps, cases, actions…"
                className="w-full border-b border-white/10 bg-transparent px-4 py-3.5 text-[16px] text-white outline-none placeholder:text-white/35"
                aria-label="Search"
              />
              <ul className="max-h-72 overflow-y-auto p-2">
                {results.map((r) => (
                  <li key={`${r.type}:${r.id}`}>
                    <button
                      onClick={() => openApp(r.type === 'case' ? 'case' : r.id, r.type === 'case' ? r.id : undefined)}
                      className="flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-left hover:bg-white/10"
                    >
                      <span className="text-[15px] text-white">{r.label}</span>
                      <span className="shrink-0 text-[12px] text-white/45">{r.type} · {r.hint}</span>
                    </button>
                  </li>
                ))}
                {results.length === 0 && <li className="px-3 py-4 text-[15px] text-white/50">No matches. Try “contact” or “projects”.</li>}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </MotionConfig>
  );
}

function AppTile({ app, onOpen }: { app: AppDef; onOpen: () => void }) {
  const Icon = app.icon;
  return (
    <button
      onClick={onOpen}
      aria-label={`Open ${app.name}: ${app.desc}`}
      className="group flex min-h-[96px] flex-col items-center gap-1 rounded-2xl p-2 text-center hover:bg-white/[0.07] active:bg-white/10 sm:min-h-[118px] sm:p-2.5"
    >
      {app.badge && (
        <span className="rounded-md bg-lime-300 px-1.5 py-px text-[8.5px] font-black tracking-wider text-black sm:text-[9px]">
          {app.badge}
        </span>
      )}
      <span
        className={`relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br shadow-lg ring-1 ring-white/25 transition duration-150 group-hover:scale-105 group-active:scale-95 sm:h-14 sm:w-14 ${app.tint}`}
      >
        <span className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-white/30 via-transparent to-black/10" aria-hidden />
        <Icon size={24} strokeWidth={2} className="relative text-white drop-shadow sm:hidden" />
        <Icon size={26} strokeWidth={2} className="relative hidden text-white drop-shadow sm:block" />
      </span>
      <span className="text-[12px] font-bold leading-tight text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.9)] sm:text-[13px]">
        {app.name}
      </span>
      <span className="hidden text-[11.5px] leading-tight text-white/65 [text-shadow:0_1px_2px_rgba(0,0,0,0.9)] sm:block">
        {app.desc}
      </span>
    </button>
  );
}

function AppBody({ id, onOpenCase, onOpen, sys }: { id: string; onOpenCase: (id: string) => void; onOpen: (app: string, state?: string) => void; sys: SysControls }) {
  const [app, state] = id.startsWith('case:') ? ['case', id.slice(5)] : [id, undefined];
  switch (app) {
    case 'projects': return <ProjectsApp onOpenCase={onOpenCase} />;
    case 'case': return <CaseDetailApp id={state ?? 'mustudentsunited'} />;
    case 'results': return <ResultsApp />;
    case 'systems': return <SystemsApp />;
    case 'proof': return <ProofApp />;
    case 'journey': return <JourneyApp />;
    case 'achievements': return <AchievementsApp />;
    case 'socials': return <SocialsApp />;
    case 'founder': return <FounderTxtApp />;
    case 'whiteboard': return <WhiteboardApp />;
    case 'browser': return <BrowserApp />;
    case 'contact': return <ContactApp />;
    case 'cases': return <CaseFilesApp onOpen={onOpen} />;
    case 'notes': return <NotesApp />;
    case 'emergency': return <EmergencyApp />;
    case 'settings': return <SettingsApp sys={sys} />;
    default: return <p className="text-white/70">Unknown app.</p>;
  }
}

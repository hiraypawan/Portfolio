'use client';

import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import WindowFrame, { WinState } from './Window';
import {
  AchievementsApp, BrowserApp, CaseDetailApp, CaseFilesApp, ContactApp, FounderTxtApp,
  JourneyApp, NotesApp, ProjectsApp, ProofApp, ResultsApp, SocialsApp, SystemsApp, WhiteboardApp,
} from './apps';
import { ownerProfile } from '@/data/ownerProfile';

const APPS = [
  { id: 'projects', name: 'Projects', desc: 'Main drive — selected work', badge: 'MAIN DRIVE', icon: '💾' },
  { id: 'results', name: 'Results', desc: 'Client outcomes + disclosures', badge: 'PROOF VAULT', icon: '📈' },
  { id: 'systems', name: 'Systems', desc: 'How I work, step by step', icon: '⚙️' },
  { id: 'proof', name: 'Proof', desc: 'Testimonial vault (approved only)', icon: '🎬' },
  { id: 'journey', name: 'Journey', desc: '2018 → now, honest timeline', icon: '🧭' },
  { id: 'achievements', name: 'Achievements', desc: 'Shipped + earned, plainly', icon: '🏆' },
  { id: 'socials', name: 'Socials', desc: 'Where I publish', icon: '📡' },
  { id: 'contact', name: 'Contact', desc: 'Book + brief me', badge: 'REPLY 48H', icon: '✉️' },
  { id: 'founder', name: 'Founder.txt', desc: 'A personal note', icon: '📝' },
  { id: 'whiteboard', name: 'Whiteboard', desc: 'Your local sticky notes', icon: '🗒️' },
  { id: 'browser', name: 'PawanNet', desc: 'Approved bookmarks', icon: '🌐' },
  { id: 'cases', name: 'Case Files', desc: 'Explorer for everything', icon: '🗂️' },
  { id: 'notes', name: 'Field Notes', desc: 'SEO articles (drafts)', icon: '📚' },
] as const;

const TITLES: Record<string, string> = {
  projects: 'Projects — main drive', results: 'Results — outcomes', systems: 'Systems — operating loop',
  proof: 'Proof — testimonial vault', journey: 'Journey', achievements: 'Achievements', socials: 'Socials',
  contact: 'Contact — book Pawan', founder: 'Founder.txt', whiteboard: 'Whiteboard', browser: 'PawanNet',
  cases: 'Case Files', notes: 'AI Field Notes', case: 'Case file',
};

const DESCRIPTORS = ['PawanOS', 'AI SYSTEMS OPERATOR', 'VOICE + WEB BUILDER', 'FOUNDER MODE: ACTIVE'];
const TRANSMISSIONS = [
  'Ship the smallest system that removes ten manual steps.',
  'Honest metrics beat big metrics. Label everything.',
  'If it only works on your laptop, it does not work.',
  'One sharp outcome per build. Two outcomes is zero outcomes.',
  'Document the handoff before you need the handoff.',
  '30,000 students > 30,000 followers. Serve first.',
  'Debug at 3AM if you must — write the runbook at 10AM.',
];

export default function PersonalOS() {
  const [booted, setBooted] = useState(false);
  const [bootShort, setBootShort] = useState(false);
  const [windows, setWindows] = useState<WinState[]>([]);
  const [caseId, setCaseId] = useState('mustudentsunited');
  const [palette, setPalette] = useState(false);
  const [query, setQuery] = useState('');
  const [theme, setTheme] = useState<'day' | 'night' | 'dark'>('dark');
  const [now, setNow] = useState(new Date());
  const [descIdx, setDescIdx] = useState(0);
  const [pet, setPet] = useState<'happy' | 'sad' | 'excited'>('happy');
  const [ping, setPing] = useState(true);
  const [petPos, setPetPos] = useState<{ x: number; y: number } | null>(null);
  const [transIdx] = useState(() => new Date().getDate() % TRANSMISSIONS.length);

  useEffect(() => {
    try {
      const seen = sessionStorage.getItem('personal-os-boot-v1');
      if (seen) setBootShort(true);
      const t = localStorage.getItem('personal-os-theme-v1') as 'day' | 'night' | 'dark' | null;
      if (t) setTheme(t);
    } catch { /* storage unavailable */ }
    const t = setTimeout(() => {
      setBooted(true);
      try { sessionStorage.setItem('personal-os-boot-v1', '1'); } catch { /* ignore */ }
    }, 1400);
    const clock = setInterval(() => setNow(new Date()), 20000);
    const morph = setInterval(() => setDescIdx((i) => (i + 1) % DESCRIPTORS.length), 3200);
    return () => { clearTimeout(t); clearInterval(clock); clearInterval(morph); };
  }, []);

  useEffect(() => {
    try { localStorage.setItem('personal-os-theme-v1', theme); } catch { /* ignore */ }
  }, [theme]);

  const zTop = useMemo(() => windows.reduce((m, w) => Math.max(m, w.z), 0), [windows]);

  const openApp = (app: string, state?: string) => {
    if (app === 'case' && state) setCaseId(state);
    setWindows((ws) => {
      const id = app === 'case' ? `case:${state ?? caseId}` : app;
      const ex = ws.find((w) => w.id === id);
      if (ex) return ws.map((w) => (w.id === id ? { ...w, z: zTop + 1 } : w));
      return [...ws, { id, title: app === 'case' ? 'Case file' : TITLES[app] ?? app, z: zTop + 1 }];
    });
    setPalette(false);
  };
  const closeWin = (id: string) => setWindows((ws) => ws.filter((w) => w.id !== id));
  const focusWin = (id: string) => setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, z: zTop + 1 } : w)));
  const toggleMax = (id: string) => setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, maximized: !w.maximized } : w)));

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return APPS.map((a) => ({ type: 'app' as const, id: a.id, label: a.name, hint: a.desc }));
    const items = [
      ...APPS.map((a) => ({ type: 'app' as const, id: a.id, label: a.name, hint: a.desc })),
      ...ownerProfile.projects.map((p) => ({ type: 'case' as const, id: p.id, label: p.name, hint: p.category })),
      { type: 'app' as const, id: 'contact', label: 'Book a call', hint: 'mailto booking' },
      { type: 'app' as const, id: 'whiteboard', label: 'Add a sticky note', hint: 'local whiteboard' },
    ];
    return items.filter((i) => (i.label + ' ' + i.hint).toLowerCase().includes(q)).slice(0, 12);
  }, [query]);

  const shellBg =
    theme === 'day'
      ? 'bg-gradient-to-br from-rose-200 via-amber-50 to-sky-200 text-slate-900'
      : theme === 'night'
        ? 'bg-gradient-to-br from-indigo-950 via-violet-950 to-slate-950 text-amber-50'
        : 'bg-[#0b0b12] text-white';

  if (!booted) {
    return (
      <div className="fixed inset-0 z-[9000] flex flex-col items-center justify-center bg-[#0b0b12] px-6 text-center text-white">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-400 text-2xl font-black">P</div>
        <p className="mt-5 text-[18px] font-bold">Loading PawanOS…</p>
        <p className="mt-1 max-w-sm text-[14px] text-white/60">projects · case studies · proof · contact {bootShort ? '(quick boot)' : '· v1.3'}</p>
        <div className="mt-4 h-1.5 w-52 overflow-hidden rounded-full bg-white/10">
          <motion.div className="h-full bg-gradient-to-r from-violet-400 to-cyan-300" initial={{ width: '5%' }} animate={{ width: '100%' }} transition={{ duration: bootShort ? 0.5 : 1.3 }} />
        </div>
        <button onClick={() => setBooted(true)} className="mt-5 min-h-[44px] rounded-lg border border-white/25 px-5 text-[15px] hover:bg-white/10">Skip Boot</button>
      </div>
    );
  }

  return (
    <div className={`fixed inset-0 flex h-[100dvh] flex-col overflow-hidden ${shellBg}`}>
      {/* wallpaper wash */}
      <div className="pointer-events-none absolute inset-0 opacity-60" aria-hidden>
        <div className="absolute -left-24 top-10 h-96 w-96 rounded-full bg-violet-600/25 blur-3xl" />
        <div className="absolute -right-24 bottom-10 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />
      </div>

      {/* SYSTEM NAV */}
      <header className="relative z-[200] flex h-[52px] shrink-0 items-center gap-2 border-b border-white/10 bg-black/40 px-3 text-[13px] backdrop-blur-xl">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-cyan-400 text-[15px] font-black text-white" aria-hidden>P</span>
        <span className="font-bold text-white">{ownerProfile.identity.osName}</span>
        <nav className="ml-2 hidden items-center gap-1 md:flex" aria-label="Primary">
          {(['projects', 'results', 'journey'] as const).map((a) => (
            <button key={a} onClick={() => openApp(a)} className="min-h-[36px] rounded-md px-2.5 text-white/80 hover:bg-white/10 hover:text-white">{TITLES[a].split(' —')[0]}</button>
          ))}
          <button onClick={() => setPalette(true)} className="min-h-[36px] rounded-md px-2.5 text-white/80 hover:bg-white/10 hover:text-white">Search ⌘K</button>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <span className="hidden items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-1 text-[12px] text-emerald-300 sm:flex" title="Availability">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" /> Open to work
          </span>
          <div className="flex overflow-hidden rounded-lg border border-white/15" role="group" aria-label="Theme">
            {(['day', 'night', 'dark'] as const).map((t) => (
              <button key={t} onClick={() => setTheme(t)} aria-pressed={theme === t}
                className={`min-h-[36px] px-2.5 capitalize ${theme === t ? 'bg-white/20 text-white' : 'text-white/60 hover:text-white'}`}>{t}</button>
            ))}
          </div>
          <span className="hidden text-white/60 lg:inline">{now.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} · {now.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })} {ownerProfile.identity.timezone}</span>
          <button onClick={() => openApp('contact')} className="min-h-[36px] rounded-lg bg-violet-500 px-3 font-semibold text-white hover:bg-violet-400">Book</button>
        </div>
      </header>

      {/* DESKTOP */}
      <main className="relative min-h-0 flex-1 overflow-y-auto lg:overflow-hidden">
        <div className="mx-auto grid w-full max-w-6xl gap-4 p-4 pb-40 sm:p-6 lg:h-full lg:grid-cols-[340px_1fr] lg:pb-24">
          {/* left column: identity + transmission */}
          <div className="space-y-4">
            <section aria-label="Owner identity" className="rounded-2xl border border-white/10 bg-black/40 p-5 backdrop-blur-xl">
              <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-violet-300">{ownerProfile.identity.roles.slice(0, 3).join(' · ')}</p>
              <h1 className="mt-1 font-mono text-[34px] font-black leading-tight text-white">{ownerProfile.identity.headline}</h1>
              <p aria-live="polite" className="mt-1 h-6 text-[14px] font-bold text-cyan-300">{DESCRIPTORS[descIdx]}</p>
              <p className="mt-2 max-w-[60ch] text-[16px] leading-relaxed text-white/80">{ownerProfile.identity.intro}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <button onClick={() => openApp('projects')} className="min-h-[44px] rounded-xl bg-white px-5 py-2.5 text-[15px] font-bold text-black hover:bg-white/85">Enter the Portfolio</button>
                <button onClick={() => openApp('contact')} className="min-h-[44px] rounded-xl border border-white/25 px-5 py-2.5 text-[15px] font-semibold text-white hover:bg-white/10">Book a call</button>
              </div>
              <p className="mt-3 text-[13px] text-white/50">30K+ students · Mumbai, India · {ownerProfile.identity.timezone}</p>
            </section>

            <section aria-label="Daily Transmission" className="rounded-2xl border border-white/10 bg-black/40 p-4 backdrop-blur-xl">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden />
                <p className="text-[12px] font-bold uppercase tracking-widest text-white/60">Daily Transmission · {now.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}</p>
              </div>
              <p className="mt-2 text-[16px] text-white/90">“{TRANSMISSIONS[transIdx]}”</p>
              <button onClick={() => openApp('whiteboard')} className="mt-3 min-h-[44px] w-full rounded-lg bg-white/10 text-[15px] font-semibold text-white hover:bg-white/20">+ Add a Quick Sticky</button>
            </section>
          </div>

          {/* app grid */}
          <section aria-label="Applications">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
              {APPS.map((a) => (
                <button key={a.id} onClick={() => openApp(a.id)} aria-label={`Open ${a.name}: ${a.desc}`}
                  className="group min-h-[104px] rounded-2xl border border-white/10 bg-black/40 p-3.5 text-left backdrop-blur-xl hover:border-white/25 hover:bg-black/60">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/80 to-cyan-500/80 text-[22px]" aria-hidden>{a.icon}</span>
                  <span className="mt-2 flex items-center gap-1.5 text-[14px] font-bold text-white">{a.name}
                    {'badge' in a && a.badge ? <span className="rounded-full bg-white/10 px-1.5 py-0.5 text-[10px] text-white/70">{a.badge}</span> : null}
                  </span>
                  <span className="mt-0.5 block text-[14px] leading-snug text-white/60">{a.desc}</span>
                </button>
              ))}
            </div>
            <p className="mt-3 text-[13px] text-white/45">Tip: press <kbd className="rounded bg-white/10 px-1.5">/</kbd> or Search to open the command palette. Esc closes windows.</p>
          </section>
        </div>

        {/* folded-corner call tab (desktop) */}
        <a href={ownerProfile.conversion.bookingUrl} aria-label="Book a call with Pawan"
          className="absolute bottom-0 right-0 z-[300] hidden h-0 w-0 border-b-[120px] border-l-[120px] border-b-violet-600 border-l-transparent sm:block">
          <span className="absolute -bottom-[104px] -left-[108px] w-[100px] rotate-[-45deg] text-center text-[12px] font-bold leading-tight text-white">Want this?<br />Book a call</span>
        </a>
        {/* call card (phone) */}
        <div className="mx-4 mb-24 rounded-2xl border border-violet-400/30 bg-violet-600/20 p-4 backdrop-blur-xl sm:hidden">
          <p className="text-[16px] font-bold text-white">Want an OS like this for yourself?</p>
          <a href={ownerProfile.conversion.bookingUrl} className="mt-2 block min-h-[48px] rounded-xl bg-violet-500 px-4 py-3 text-center text-[16px] font-bold text-white">Book a call</a>
        </div>
      </main>

      {/* companion + booking ping */}
      <div className="pointer-events-none fixed bottom-[76px] left-3 z-[400] flex items-end gap-2 sm:bottom-6">
        <div className="pointer-events-auto flex flex-col items-center">
          <button
            onClick={() => setPet((p) => (p === 'happy' ? 'excited' : p === 'excited' ? 'sad' : 'happy'))}
            onPointerDown={(e) => {
              const sx = e.clientX, sy = e.clientY;
              const move = (m: PointerEvent) => setPetPos({ x: m.clientX - sx, y: sy - m.clientY });
              const up = () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); };
              window.addEventListener('pointermove', move); window.addEventListener('pointerup', up);
            }}
            aria-label="PawanOS companion. Activate to change mood. Drag to nudge."
            className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-gradient-to-br from-violet-600 to-cyan-500 text-[30px] shadow-xl"
            style={petPos ? { transform: `translate(${Math.max(-40, Math.min(40, petPos.x))}px, ${Math.max(-40, Math.min(20, -petPos.y))}px)` } : undefined}
          >
            {pet === 'happy' ? '◕‿◕' : pet === 'excited' ? '★‿★' : '◕︿◕'}
          </button>
          <span className="mt-1 rounded-full bg-black/60 px-2 py-0.5 text-[11px] text-white/70">{pet}</span>
          <button onClick={() => setPetPos(null)} className="pointer-events-auto mt-1 text-[11px] text-white/45 underline">reset</button>
        </div>
        {ping && (
          <div className="pointer-events-auto max-w-[240px] rounded-xl border border-white/15 bg-black/80 p-3 text-[13px] text-white/85 backdrop-blur-xl">
            <p><strong>Demo ping</strong> (not a live booking): Someone just booked a call with {ownerProfile.identity.fullName}. Looks like they do not want their business falling behind on AI.</p>
            <button onClick={() => { setPing(false); setPet('excited'); setTimeout(() => setPet('happy'), 2500); }} className="mt-2 text-[13px] text-cyan-300 underline">Dismiss</button>
          </div>
        )}
      </div>

      {/* DOCK */}
      <nav aria-label="Dock" className="fixed inset-x-0 bottom-0 z-[550] border-t border-white/10 bg-black/60 backdrop-blur-xl">
        <div className="mx-auto flex max-w-3xl items-center gap-1 overflow-x-auto px-3 py-2">
          {APPS.slice(0, 8).map((a) => (
            <button key={a.id} onClick={() => openApp(a.id)} aria-label={`Dock: open ${a.name}`} title={a.name}
              className="flex min-h-[52px] min-w-[52px] flex-col items-center justify-center rounded-xl px-2 hover:bg-white/10">
              <span className="text-[22px]" aria-hidden>{a.icon}</span>
              <span className="text-[10px] text-white/60">{a.name}</span>
            </button>
          ))}
          <span className="mx-1 h-8 w-px bg-white/10" aria-hidden />
          <button onClick={() => setPalette(true)} aria-label="Open search" className="flex min-h-[52px] min-w-[52px] flex-col items-center justify-center rounded-xl px-2 hover:bg-white/10">
            <span className="text-[22px]" aria-hidden>⌘</span><span className="text-[10px] text-white/60">Search</span>
          </button>
        </div>
      </nav>

      {/* WINDOWS */}
      {windows.map((w) => (
        <WindowFrame key={w.id} win={w} focused={w.z === zTop} onFocus={() => focusWin(w.id)} onClose={() => closeWin(w.id)} onToggleMax={() => toggleMax(w.id)}>
          <AppBody id={w.id} onOpenCase={(id) => openApp('case', id)} onOpen={openApp} />
        </WindowFrame>
      ))}

      {/* COMMAND PALETTE */}
      <AnimatePresence>
        {palette && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[5400] flex items-start justify-center bg-black/60 p-4 pt-[12vh]" onClick={() => setPalette(false)}>
            <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-white/15 bg-[#14141d]" onClick={(e) => e.stopPropagation()} role="dialog" aria-label="Command palette">
              <input autoFocus value={query} onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Escape') setPalette(false); if (e.key === 'Enter' && results[0]) { const r = results[0]; openApp(r.type === 'case' ? 'case' : r.id, r.type === 'case' ? r.id : undefined); } }}
                placeholder="Search apps, cases, actions… (Enter opens, Esc closes)"
                className="w-full border-b border-white/10 bg-transparent px-4 py-3.5 text-[16px] text-white outline-none" aria-label="Search" />
              <ul className="max-h-72 overflow-y-auto p-2">
                {results.map((r) => (
                  <li key={`${r.type}:${r.id}`}>
                    <button onClick={() => openApp(r.type === 'case' ? 'case' : r.id, r.type === 'case' ? r.id : undefined)}
                      className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left hover:bg-white/10">
                      <span className="text-[15px] text-white">{r.label}</span>
                      <span className="text-[12px] text-white/50">{r.type} · {r.hint}</span>
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
  );
}

function AppBody({ id, onOpenCase, onOpen }: { id: string; onOpenCase: (id: string) => void; onOpen: (app: string, state?: string) => void }) {
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
    default: return <p className="text-white/70">Unknown app.</p>;
  }
}

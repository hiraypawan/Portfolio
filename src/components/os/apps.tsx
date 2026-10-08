'use client';

import { useEffect, useState } from 'react';
import { FileText, FolderClosed } from 'lucide-react';
import { ACCENTS, OSSettings, playSound, resetOSView } from '@/lib/feedback';
import { ownerProfile } from '@/data/ownerProfile';

function Disclosure({ status }: { status: string }) {
  if (status === 'verified') return <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[12px] text-emerald-300">Verified</span>;
  if (status === 'illustrative')
    return <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-[12px] text-amber-300">Illustrative — placeholder, do not quote</span>;
  return <span className="rounded-full bg-sky-500/20 px-2 py-0.5 text-[12px] text-sky-300">{status}</span>;
}

function Ext({ href, children }: { href: string; children: React.ReactNode }) {
  if (!href || href === '#')
    return <span className="cursor-not-allowed text-[13px] text-white/30">Archived / on request</span>;
  return (
    <a href={href} target="_blank" rel="noreferrer noopener" className="text-[14px] text-[var(--acc1)] underline underline-offset-4 hover:brightness-125">
      {children}
    </a>
  );
}

export function ProjectsApp({ onOpenCase }: { onOpenCase: (id: string) => void }) {
  const sorted = [...ownerProfile.projects].sort((a, b) => Number(b.featured) - Number(a.featured));
  return (
    <div className="space-y-4">
      <p className="text-[15px] text-white/70">
        Main drive — selected case files first. {ownerProfile.legal.metricDisclaimer}
      </p>
      {sorted.map((p) => (
        <article key={p.id} className="rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-[18px] font-bold text-white">{p.name}</h3>
            {p.featured && <span className="rounded-full bg-violet-500/25 px-2 py-0.5 text-[12px] text-violet-200">MAIN DRIVE</span>}
            <Disclosure status={p.outcomeStatus} />
          </div>
          <p className="mt-1 text-[13px] text-white/50">{p.category} · {p.dates} · {p.role}</p>
          <p className="mt-2 text-[15px] text-white/85"><span className="text-white/50">Problem:</span> {p.problem}</p>
          <p className="mt-1 text-[15px] text-white/85"><span className="text-white/50">Build:</span> {p.intervention}</p>
          <p className="mt-1 text-[15px] text-white/85"><span className="text-white/50">Outcome:</span> {p.outcome}</p>
          <p className="mt-1 text-[14px] text-white/70"><span className="text-white/50">Auth:</span> {p.auth}</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {p.stack.map((s) => (
              <span key={s} className="rounded-full bg-white/10 px-2.5 py-1 text-[13px] text-white/75">{s}</span>
            ))}
          </div>
          <div className="mt-3 flex gap-4">
            <Ext href={p.url}>Live link ↗</Ext>
            <button onClick={() => onOpenCase(p.id)} className="text-[14px] text-violet-300 underline underline-offset-4 hover:text-violet-200">
              Open case file →
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}

export function CaseDetailApp({ id }: { id: string }) {
  const p = ownerProfile.projects.find((x) => x.id === id) ?? ownerProfile.projects[0];
  return (
    <div className="space-y-3">
      <h3 className="text-[20px] font-bold text-white">{p.name}.case</h3>
      <dl className="space-y-2 text-[15px] text-white/85">
        <div><dt className="text-white/50">Client</dt><dd>{p.client}</dd></div>
        <div><dt className="text-white/50">Dates / Role</dt><dd>{p.dates} — {p.role}</dd></div>
        <div><dt className="text-white/50">Problem</dt><dd>{p.problem}</dd></div>
        <div><dt className="text-white/50">Intervention</dt><dd>{p.intervention}</dd></div>
        <div><dt className="text-white/50">Outcome</dt><dd className="flex items-center gap-2">{p.outcome} <Disclosure status={p.outcomeStatus} /></dd></div>
        <div><dt className="text-white/50">Auth</dt><dd>{p.auth}</dd></div>
        <div><dt className="text-white/50">Stack</dt><dd>{p.stack.join(' · ')}</dd></div>
      </dl>
      <p className="text-[13px] text-white/45">Claim ledger: outcome status = {p.outcomeStatus}. Illustrative entries must not be quoted as results.</p>
      <Ext href={p.url}>Open live URL ↗</Ext>
    </div>
  );
}

export function ResultsApp() {
  return (
    <div className="space-y-4">
      {ownerProfile.clientCases.map((c) => (
        <article key={c.client} className="rounded-xl border border-white/10 bg-white/5 p-4">
          <h3 className="text-[18px] font-bold text-white">{c.client}</h3>
          <p className="mt-1 text-[17px] text-emerald-300">{c.metric}</p>
          <p className="text-[13px] text-white/50">{c.disclosure}</p>
          <p className="mt-2 text-[15px] text-white/85"><span className="text-white/50">Challenge:</span> {c.challenge}</p>
          <p className="mt-1 text-[15px] text-white/85"><span className="text-white/50">System:</span> {c.system}</p>
          <p className="mt-1 text-[15px] text-white/70">{c.narrative}</p>
          <div className="mt-2"><Ext href={c.url}>Proof link ↗</Ext></div>
        </article>
      ))}
      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
        <h3 className="text-[16px] font-bold text-white">More metrics</h3>
        <ul className="mt-2 space-y-1.5">
          {ownerProfile.metrics.map((m) => (
            <li key={m.label} className="flex flex-wrap items-center gap-2 text-[15px] text-white/85">
              <strong className="text-white">{m.value}</strong> {m.label} <Disclosure status={m.status} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function SystemsApp() {
  const loop = [
    { s: 'Find the leverage', o: 'Map where one build removes ten manual steps.', c: 'Give access + honest constraints.', a: 'Leverage map', g: 'A falsifiable bottleneck is named.' },
    { s: 'Lock the system', o: 'Freeze scope to one sharp outcome.', c: 'Approve the single outcome.', a: 'One-page spec', g: 'No second outcome sneaks in.' },
    { s: 'Build the sharp edge', o: 'Ship the smallest working system.', c: 'Test weekly builds.', a: 'Working v1', g: 'It runs on real data.' },
    { s: 'Integrate the workflow', o: 'Wire it into daily tools (Telegram, sheets, site).', c: 'Assign one operator.', a: 'Runbook', g: 'Someone besides me can run it.' },
    { s: 'Prove and hand off', o: 'Measure + document + train.', c: 'Confirm the metric label.', a: 'Handoff doc', g: 'Outcome has a disclosure label.' },
  ];
  return (
    <div className="space-y-4">
      {ownerProfile.services.map((s) => (
        <div key={s.name} className="rounded-xl border border-white/10 bg-white/5 p-4">
          <h3 className="text-[17px] font-bold text-white">{s.name}</h3>
          <p className="mt-1 text-[15px] text-white/75">{s.detail}</p>
          <p className="mt-1 text-[13px] text-white/50">{s.stack.join(' · ')}</p>
        </div>
      ))}
      <h3 className="pt-2 text-[16px] font-bold text-white">Operating loop</h3>
      <ol className="space-y-2">
        {loop.map((l, i) => (
          <li key={l.s} className="rounded-xl border border-white/10 bg-white/5 p-3 text-[15px] text-white/85">
            <strong className="text-white">{i + 1}. {l.s}.</strong> {l.o}
            <span className="block text-[14px] text-white/60">Client: {l.c} Artifact: {l.a} Gate: {l.g}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function ProofApp() {
  return (
    <div className="space-y-3">
      <p className="text-[15px] text-white/70">
        Proof vault. No testimonials have been approved for embedding yet — nothing is invented here.
      </p>
      <div className="rounded-xl border border-dashed border-white/20 p-5 text-center text-[15px] text-white/60">
        Testimonial videos / quotes ship here only after written owner + client approval.
      </div>
      <p className="text-[13px] text-white/45">To approve one, send: name, role, exact quote or video URL, permission note.</p>
    </div>
  );
}

export function JourneyApp() {
  return (
    <ol className="relative space-y-4 border-l border-white/15 pl-5">
      {ownerProfile.journey.map((j) => (
        <li key={j.year} className="relative">
          <span className="absolute -left-[27px] top-1 h-3 w-3 rounded-full bg-violet-400" aria-hidden />
          <p className="text-[13px] font-bold text-violet-300">{j.year}</p>
          <h3 className="text-[17px] font-bold text-white">{j.title}</h3>
          <p className="mt-0.5 text-[15px] text-white/80">{j.story}</p>
          <p className="mt-0.5 text-[13px] text-white/50">OS upgrade: {j.upgrade}</p>
        </li>
      ))}
    </ol>
  );
}

export function AchievementsApp() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {ownerProfile.achievements.map((a) => (
        <div key={a.title} className="rounded-xl border border-white/10 bg-white/5 p-4">
          <p className="text-[12px] uppercase tracking-widest text-amber-300">{a.category}</p>
          <h3 className="mt-1 text-[16px] font-bold text-white">{a.title}</h3>
          <p className="mt-1 text-[15px] text-white/75">{a.detail}</p>
        </div>
      ))}
    </div>
  );
}

export function SocialsApp() {
  return (
    <ul className="space-y-3">
      {ownerProfile.socials.map((s) => (
        <li key={s.network} className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 p-3.5">
          <div>
            <p className="text-[16px] font-bold text-white">{s.network}</p>
            <p className="text-[14px] text-white/60">{s.handle} · {s.purpose}</p>
          </div>
          <a href={s.url} target={s.url.startsWith('mailto') ? undefined : '_blank'} rel="noreferrer noopener" className="min-h-[44px] rounded-lg bg-white/10 px-4 py-2 text-[14px] text-white hover:bg-white/20">
            Open
          </a>
        </li>
      ))}
    </ul>
  );
}

export function FounderTxtApp() {
  return (
    <pre className="whitespace-pre-wrap rounded-xl border border-white/10 bg-black/40 p-4 font-mono text-[14.5px] leading-relaxed text-white/85">{`who i am
  Pawan Hiray — tech builder from Mumbai. I like systems that do the boring work.

what i build
  Full-stack apps, AI agents + automations, crypto/Web3 tools, growth machines.

why i care
  MUStudentsUnited showed me software can help 10,000+ real students. I want more of that.

how i work
  1) find the leverage 2) lock scope 3) ship v1 4) integrate 5) prove + hand off.

exploring now
  AI x Web3 applied to real gaps. AI/ML in progress — currently going deeper on
  applied voice systems and fresher-ready full-stack depth.

who i want to work with
  Founders, student communities, creators who want leverage — not hype.

i refuse to compromise
  Honest metrics. No fake revenue screenshots. No invented testimonials.

contact
  ${ownerProfile.conversion.email} · ${ownerProfile.conversion.phone} — subject: what you want built + timeline.
  ${ownerProfile.identity.availability}.`}</pre>
  );
}

const WB_KEY = 'personal-os-whiteboard-v1';
interface Sticky { id: number; text: string; color: string; }

export function WhiteboardApp() {
  const [notes, setNotes] = useState<Sticky[]>([]);
  const [draft, setDraft] = useState('');
  const [color, setColor] = useState('#fef08a');
  useEffect(() => {
    try {
      const raw = localStorage.getItem(WB_KEY);
      if (raw) setNotes(JSON.parse(raw));
    } catch { /* malformed data resets quietly */ }
  }, []);
  useEffect(() => {
    try { localStorage.setItem(WB_KEY, JSON.stringify(notes)); } catch { /* storage full/blocked */ }
  }, [notes]);
  return (
    <div>
      <p className="text-[13px] text-white/50">Stored only in this browser ({WB_KEY}). The owner never sees these — use Contact for messages.</p>
      <form
        className="mt-2 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          if (!draft.trim()) return;
          setNotes((n) => [...n.slice(-11), { id: Date.now(), text: draft.trim().slice(0, 280), color }]);
          setDraft('');
        }}
      >
        <label htmlFor="sticky-input" className="sr-only">New sticky note</label>
        <input
          id="sticky-input"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          maxLength={280}
          placeholder="Type a note, Enter to stick it…"
          className="min-h-[44px] flex-1 rounded-lg border border-white/15 bg-black/40 px-3 text-[15px] text-white"
        />
        <button className="min-h-[44px] rounded-lg bg-violet-500 px-4 text-[15px] font-semibold text-white hover:bg-violet-400">Add Sticky</button>
      </form>
      <div className="mt-2 flex gap-2" role="group" aria-label="Note color">
        {['#fef08a', '#bbf7d0', '#bae6fd', '#fecdd3', '#e9d5ff'].map((c) => (
          <button
            key={c}
            onClick={() => setColor(c)}
            aria-label={`Note color ${c}`}
            className={`h-9 w-9 rounded-full border-2 ${color === c ? 'border-white' : 'border-transparent'}`}
            style={{ background: c }}
          />
        ))}
        <button onClick={() => setNotes([])} className="ml-auto text-[14px] text-white/60 underline">Reset board</button>
      </div>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {notes.map((n) => (
          <div key={n.id} className="rounded-lg p-3 text-[#1a1a1a]" style={{ background: n.color }}>
            <p className="whitespace-pre-wrap text-[15px]">{n.text}</p>
            <div className="mt-2 flex justify-end gap-2">
              <button
                className="text-[13px] underline"
                onClick={() => {
                  const t = prompt('Edit note:', n.text);
                  if (t !== null) setNotes((ns) => ns.map((x) => (x.id === n.id ? { ...x, text: t.slice(0, 280) } : x)));
                }}
              >Edit</button>
              <button className="text-[13px] underline" onClick={() => setNotes((ns) => ns.filter((x) => x.id !== n.id))}>Delete</button>
            </div>
          </div>
        ))}
        {notes.length === 0 && <p className="text-[15px] text-white/50">No stickies yet. Add one above.</p>}
      </div>
    </div>
  );
}

export function BrowserApp() {
  const bookmarks = [
    { name: 'OneBrain — live AI product', url: 'https://onebrains.pages.dev' },
    { name: 'Smarty — live extension site', url: 'https://mysmarty.vercel.app' },
    { name: 'DigitalWorkForce — live marketplace', url: 'https://digitalworkforce.vercel.app' },
    { name: 'VibeCoder Pro — live cloud IDE', url: 'https://vibecoderpro.vercel.app' },
    { name: 'MUStudentsUnited', url: 'https://mumbaistudentsunited.com' },
    { name: 'GitHub — hiraypawan', url: 'https://github.com/hiraypawan' },
  ];
  return (
    <div className="space-y-3">
      <p className="text-[15px] text-white/70">
        PawanNet — approved bookmarks only. External sites open in a new tab because most modern sites block iframe embedding (X-Frame-Options / CSP).
      </p>
      {bookmarks.map((b) => (
        <div key={b.url} className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 p-3.5">
          <div className="min-w-0">
            <p className="truncate text-[15px] font-semibold text-white">{b.name}</p>
            <p className="truncate text-[13px] text-white/50">{b.url}</p>
          </div>
          <a href={b.url} target="_blank" rel="noreferrer noopener" className="min-h-[44px] shrink-0 rounded-lg bg-white/10 px-4 py-2 text-[14px] text-white hover:bg-white/20">Open ↗</a>
        </div>
      ))}
    </div>
  );
}

export function ContactApp() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', build: '', budget: '', timeline: '', message: '' });
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <a href={ownerProfile.conversion.bookingUrl} className="min-h-[44px] rounded-xl bg-violet-500 px-5 py-2.5 text-[15px] font-semibold text-white hover:bg-violet-400">
          Book a call
        </a>
        <button
          onClick={() => { void navigator.clipboard?.writeText(ownerProfile.conversion.email); }}
          className="min-h-[44px] rounded-xl border border-white/20 px-5 py-2.5 text-[15px] text-white hover:bg-white/10"
        >
          Copy email
        </button>
      </div>
      <p className="text-[14px] text-white/60">{ownerProfile.conversion.email} · {ownerProfile.conversion.phone} · {ownerProfile.identity.timezone}</p>
      <p className="text-[14px] text-white/60">{ownerProfile.identity.availability} · replies within 48 hours.</p>
      {sent ? (
        <div className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-4 text-[15px] text-emerald-200">
          Brief ready — your email app should have opened with everything pre-filled. If not, send it manually to {ownerProfile.conversion.email}.
        </div>
      ) : (
        <form
          className="space-y-2.5"
          onSubmit={(e) => {
            e.preventDefault();
            const f = form;
            if ((document.getElementById('company-website') as HTMLInputElement)?.value) return;
            const body = `Name: ${f.name}%0D%0AEmail: ${f.email}%0D%0ADesired build: ${f.build}%0D%0ABudget: ${f.budget}%0D%0ATimeline: ${f.timeline}%0D%0A%0D%0A${encodeURIComponent(f.message)}`;
            window.location.href = `mailto:${ownerProfile.conversion.email}?subject=${encodeURIComponent('Project brief — ' + f.build)}&body=${body}`;
            setSent(true);
          }}
        >
          <div className="grid gap-2.5 sm:grid-cols-2">
            <Field label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
            <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
          </div>
          <div className="grid gap-2.5 sm:grid-cols-2">
            <Field label="Desired build" placeholder="e.g. AI Telegram bot" value={form.build} onChange={(v) => setForm({ ...form, build: v })} />
            <Field label="Budget / range" placeholder="e.g. ₹X–₹Y" value={form.budget} onChange={(v) => setForm({ ...form, budget: v })} />
          </div>
          <Field label="Timeline" placeholder="e.g. 4 weeks" value={form.timeline} onChange={(v) => setForm({ ...form, timeline: v })} />
          <div>
            <label className="mb-1 block text-[14px] text-white/70">Success definition + context</label>
            <textarea required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={4}
              className="w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-[15px] text-white" />
          </div>
          <input id="company-website" type="text" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
          <button className="min-h-[44px] w-full rounded-xl bg-white px-4 py-2.5 text-[15px] font-semibold text-black hover:bg-white/85">Send brief via email →</button>
        </form>
      )}
    </div>
  );
}

function Field({ label, value, onChange, type, placeholder }: { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string }) {
  return (
    <div>
      <label className="mb-1 block text-[14px] text-white/70">{label}</label>
      <input required type={type ?? 'text'} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)}
        className="min-h-[44px] w-full rounded-lg border border-white/15 bg-black/40 px-3 text-[15px] text-white" />
    </div>
  );
}

export interface SysControls {
  theme: 'day' | 'night' | 'dark';
  setTheme: (t: 'day' | 'night' | 'dark') => void;
  settings: OSSettings;
  patch: (p: Partial<OSSettings>) => void;
  resetAll: () => void;
}

function Switch({ on, onFlip, label }: { on: boolean; onFlip: () => void; label: string }) {
  return (
    <button
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={onFlip}
      className={`relative h-8 w-[52px] shrink-0 rounded-full transition ${on ? 'bg-emerald-500' : 'bg-white/15'}`}
    >
      <span
        className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow transition-all ${on ? 'left-[24px]' : 'left-1'}`}
        aria-hidden
      />
    </button>
  );
}

export function SettingsApp({ sys }: { sys: SysControls }) {
  const [resetMsg, setResetMsg] = useState(false);
  return (
    <div className="space-y-5">
      <p className="text-[13px] text-white/50">
        Yours only — every choice below lives in this browser, on this device. Nothing is sent anywhere.
      </p>

      <section aria-label="Accent color">
        <h3 className="mb-2 text-[15px] font-bold text-white">Accent</h3>
        <div className="flex flex-wrap gap-3">
          {ACCENTS.map((a) => (
            <button
              key={a.id}
              onClick={() => sys.patch({ accentId: a.id })}
              aria-pressed={sys.settings.accentId === a.id}
              aria-label={`Accent ${a.name}`}
              title={a.name}
              className={`flex flex-col items-center gap-1 rounded-xl p-1.5 ${sys.settings.accentId === a.id ? 'bg-white/10 ring-2 ring-white/60' : 'hover:bg-white/5'}`}
            >
              <span
                className="h-10 w-10 rounded-full shadow-lg ring-1 ring-white/30"
                style={{ background: `linear-gradient(135deg, ${a.a}, ${a.b})` }}
                aria-hidden
              />
              <span className="text-[11px] text-white/65">{a.name}</span>
            </button>
          ))}
        </div>
      </section>

      <section aria-label="Wallpaper">
        <h3 className="mb-2 text-[15px] font-bold text-white">Wallpaper</h3>
        <div className="flex overflow-hidden rounded-xl border border-white/15" role="group" aria-label="Wallpaper">
          {(['day', 'night', 'dark'] as const).map((t) => (
            <button
              key={t}
              onClick={() => sys.setTheme(t)}
              aria-pressed={sys.theme === t}
              className={`min-h-[44px] flex-1 capitalize ${sys.theme === t ? 'bg-white/20 font-semibold text-white' : 'text-white/60 hover:text-white'}`}
            >
              {t}
            </button>
          ))}
        </div>
        <p className="mt-1.5 text-[13px] text-white/45">First visit follows your local time of day until you pick one.</p>
      </section>

      <section aria-label="Sound and feel" className="space-y-2.5">
        <h3 className="text-[15px] font-bold text-white">Sound & feel</h3>
        <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 p-3.5">
          <div>
            <p className="text-[15px] font-semibold text-white">Interface sounds</p>
            <p className="text-[13px] text-white/55">Soft swishes, generated on-device. Off by default.</p>
          </div>
          <Switch
            on={sys.settings.sounds}
            label="Interface sounds"
            onFlip={() => {
              const next = !sys.settings.sounds;
              sys.patch({ sounds: next });
              if (next) playSound('select');
            }}
          />
        </div>
        <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 p-3.5">
          <div>
            <p className="text-[15px] font-semibold text-white">Haptics</p>
            <p className="text-[13px] text-white/55">Gentle vibration on touch devices.</p>
          </div>
          <Switch on={sys.settings.haptics} label="Haptics" onFlip={() => sys.patch({ haptics: !sys.settings.haptics })} />
        </div>
        <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 p-3.5">
          <div>
            <p className="text-[15px] font-semibold text-white">Motion</p>
            <p className="text-[13px] text-white/55">Full springs, or calm fades.</p>
          </div>
          <div className="flex overflow-hidden rounded-lg border border-white/15" role="group" aria-label="Motion">
            {(['full', 'calm'] as const).map((m) => (
              <button
                key={m}
                onClick={() => sys.patch({ motion: m })}
                aria-pressed={sys.settings.motion === m}
                className={`min-h-[40px] px-4 capitalize ${sys.settings.motion === m ? 'bg-white/20 font-semibold text-white' : 'text-white/60 hover:text-white'}`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section aria-label="Reset">
        <button
          onClick={() => {
            resetOSView();
            sys.resetAll();
            setResetMsg(true);
          }}
          className="min-h-[44px] w-full rounded-xl border border-red-400/40 text-[15px] font-semibold text-red-200 hover:bg-red-500/10"
        >
          Reset my view of this OS
        </button>
        {resetMsg && <p className="mt-2 text-[14px] text-emerald-300">Cleared — theme, tour, stickies, and these settings are back to defaults.</p>}
      </section>
    </div>
  );
}

export function CaseFilesApp({ onOpen }: { onOpen: (app: string, state?: string) => void }) {  const tree: { folder: string; files: { name: string; app: string; state?: string }[] }[] = [
    { folder: 'Start Here', files: [{ name: 'Founder.txt', app: 'founder' }, { name: 'Systems.op', app: 'systems' }] },
    { folder: 'Platforms', files: [{ name: 'MUStudentsUnited.case', app: 'case', state: 'mustudentsunited' }] },
    { folder: 'AI Agents', files: [{ name: 'OneBrain.case', app: 'case', state: 'onebrain' }, { name: 'SmartBotX.case', app: 'case', state: 'smartbotx' }] },
    { folder: 'Extensions', files: [{ name: 'Smarty.case', app: 'case', state: 'smarty' }, { name: 'YtStop.case', app: 'case', state: 'ytstop' }] },
    { folder: 'Marketplaces & Tools', files: [{ name: 'DigitalWorkForce.case', app: 'case', state: 'digitalworkforce' }, { name: 'VibeCoder Pro.case', app: 'case', state: 'vibecoderpro' }] },
    { folder: 'Games', files: [{ name: 'Hand Cricket Pro.case', app: 'case', state: 'handcricket' }] },
    { folder: 'Community Builds', files: [{ name: 'PeoplePole.case', app: 'case', state: 'peoplepole' }] },
    { folder: 'Proof', files: [{ name: 'Results.vault', app: 'results' }, { name: 'Achievements.vault', app: 'achievements' }] },
  ];
  return (
    <div className="space-y-3">
      {tree.map((t) => (
        <div key={t.folder}>
          <p className="flex items-center gap-1.5 text-[13px] font-bold uppercase tracking-widest text-white/45">
            <FolderClosed size={15} className="text-amber-300/80" /> {t.folder}
          </p>
          <div className="mt-1.5 space-y-1.5">
            {t.files.map((f) => (
              <button key={f.name} onClick={() => onOpen(f.app, f.state)}
                className="flex w-full items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3.5 py-2.5 text-left text-[15px] text-white/85 hover:bg-white/10">
                <span className="flex items-center gap-2"><FileText size={16} className="shrink-0 text-white/50" /> {f.name}</span><span className="text-white/35" aria-hidden>→</span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function NotesApp() {
  return (
    <div className="space-y-3">
      {ownerProfile.articles.map((a) => (
        <article key={a.url} className="rounded-xl border border-white/10 bg-white/5 p-4">
          <h3 className="text-[16px] font-bold text-white">{a.title}</h3>
          <p className="mt-1 text-[15px] text-white/70">{a.description}</p>
          <p className="mt-1 text-[13px] text-white/45">{a.date} · crawlable route ships with the article build [DRAFT]</p>
        </article>
      ))}
    </div>
  );
}

export function EmergencyApp() {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-red-400/30 bg-red-500/10 p-4">
        <h3 className="text-[17px] font-bold text-red-200">Urgent project inquiry only</h3>
        <p className="mt-1 text-[15px] text-white/80">
          This is for time-sensitive work — production down, launch blocked, deadline at risk.
          Not a life-safety service. Anything else goes through Contact.
        </p>
      </div>
      <div className="grid gap-2.5 sm:grid-cols-2">
        <a
          href={`mailto:${ownerProfile.conversion.email}?subject=${encodeURIComponent('[URGENT] Project inquiry — PawanOS')}`}
          className="min-h-[48px] rounded-xl bg-red-500 px-4 py-3 text-center text-[15px] font-bold text-white hover:bg-red-400"
        >
          Email now with [URGENT]
        </a>
        <a
          href={`tel:${ownerProfile.conversion.phone.replace(/[^+\d]/g, '')}`}
          className="min-h-[48px] rounded-xl border border-white/25 px-4 py-3 text-center text-[15px] font-semibold text-white hover:bg-white/10"
        >
          Call {ownerProfile.conversion.phone}
        </a>
      </div>
      <p className="text-[13px] text-white/50">
        {ownerProfile.identity.timezone} · {ownerProfile.identity.availability}
      </p>
    </div>
  );
}

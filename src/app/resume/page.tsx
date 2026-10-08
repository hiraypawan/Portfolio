'use client';

import Link from 'next/link';
import { ownerProfile } from '@/data/ownerProfile';

export default function ResumePage() {
  const live = ownerProfile.projects.filter((p) => p.url !== '#');
  const more = ownerProfile.projects.filter((p) => p.url === '#');
  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl bg-white px-6 py-10 text-slate-900 antialiased">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Pawan Hiray</h1>
        <p className="mt-1 text-lg text-slate-700">
          Fresher Computer Engineer | Community Leader | Learning Development
        </p>
        <address className="mt-3 text-[15px] not-italic leading-relaxed text-slate-700">
          Mumbai, Maharashtra · {ownerProfile.conversion.phone} · {ownerProfile.conversion.email}
          <br />
          <a className="underline" href="https://github.com/hiraypawan">github.com/hiraypawan</a>
          {' · '}
          <a className="underline" href={ownerProfile.socials.find((s) => s.network === 'LinkedIn')?.url}>LinkedIn</a>
          {' · '}
          <a className="underline" href="https://pawanhiray.vercel.app">pawanhiray.vercel.app</a>
        </address>
        <p className="mt-2 text-[15px] font-semibold text-emerald-700">{ownerProfile.identity.availability}</p>
        <div className="mt-4 flex flex-wrap gap-2 print:hidden">
          <a href="/Pawan-Hiray-Resume.pdf" download className="rounded-lg bg-slate-900 px-4 py-2.5 text-[15px] font-semibold text-white">
            Download PDF resume
          </a>
          <button onClick={() => window.print()} className="rounded-lg border border-slate-300 px-4 py-2.5 text-[15px] font-semibold">
            Print
          </button>
          <Link href="/" className="rounded-lg border border-slate-300 px-4 py-2.5 text-[15px] font-semibold">
            ← Back to PawanOS
          </Link>
        </div>
      </header>

      <section aria-label="Professional summary" className="mt-8">
        <h2 className="border-b border-slate-200 pb-1 text-sm font-bold uppercase tracking-widest text-slate-500">Summary</h2>
        <p className="mt-2 text-[16px] leading-relaxed">
          Recent Computer Engineering graduate and former President of MUStudentsUnited, a digital student community
          with 10,000+ followers. Combines community leadership and product thinking with hands-on building across
          full-stack web, AI agents, browser extensions, and games. Quick learner with modern AI-assisted workflows,
          seeking a fresher development role to build a professional coding foundation.
        </p>
      </section>

      <section aria-label="Skills" className="mt-8">
        <h2 className="border-b border-slate-200 pb-1 text-sm font-bold uppercase tracking-widest text-slate-500">Skills</h2>
        <ul className="mt-2 space-y-1.5 text-[15.5px] leading-relaxed">
          <li><strong>Web (learning):</strong> HTML5, CSS3, JavaScript fundamentals, MySQL basics, PHP basics</li>
          <li><strong>Full-stack:</strong> React, Next.js, Node.js, Express, MongoDB, JWT auth</li>
          <li><strong>AI & platforms:</strong> OpenAI/Gemini APIs, Cloudflare Workers, Supabase, Leaflet maps</li>
          <li><strong>Tools:</strong> Claude Code, OpenCode, Git, Vercel, Chrome extension packaging (MV3)</li>
          <li><strong>Strengths:</strong> Leadership, product thinking, community management, adaptability</li>
        </ul>
      </section>

      <section aria-label="Leadership" className="mt-8">
        <h2 className="border-b border-slate-200 pb-1 text-sm font-bold uppercase tracking-widest text-slate-500">Leadership</h2>
        <article className="mt-2">
          <h3 className="text-[17px] font-bold">President — MUStudentsUnited (student community)</h3>
          <p className="text-[14.5px] text-slate-600">Aug 2024 — Mar 2026 · Mumbai</p>
          <ul className="mt-1.5 list-disc space-y-1 pl-5 text-[15.5px] leading-relaxed">
            <li>Led digital community to 10,000+ followers with 200–300+ active users in peak exam seasons.</li>
            <li>Designed platform workflows: authentication, note uploads, admin approvals.</li>
            <li>Drove adoption across colleges with a 1,000+ member WhatsApp base.</li>
          </ul>
        </article>
      </section>

      <section aria-label="Selected projects" className="mt-8">
        <h2 className="border-b border-slate-200 pb-1 text-sm font-bold uppercase tracking-widest text-slate-500">Selected projects</h2>
        <div className="mt-2 space-y-4">
          {[...live, ...more].map((p) => (
            <article key={p.id}>
              <h3 className="text-[17px] font-bold">
                {p.name} <span className="font-normal text-slate-600">— {p.category} ({p.dates})</span>
              </h3>
              <p className="mt-0.5 text-[15px] text-slate-700">{p.intervention}</p>
              <p className="mt-0.5 text-[14.5px] text-slate-600">
                Stack: {p.stack.join(', ')} · Auth: {p.auth} · {p.outcome}
              </p>
              <p className="mt-0.5 text-[14.5px]">
                {p.url !== '#' && <a className="underline" href={p.url}>Live</a>}
                {p.url !== '#' && p.repository !== '#' && ' · '}
                {p.repository !== '#' && <a className="underline" href={p.repository}>Code</a>}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section aria-label="Education" className="mt-8">
        <h2 className="border-b border-slate-200 pb-1 text-sm font-bold uppercase tracking-widest text-slate-500">Education</h2>
        <ul className="mt-2 space-y-2 text-[15.5px] leading-relaxed">
          <li><strong>Bachelor of Engineering, Computer Engineering</strong> — B R Harne College of Engineering, Mumbai University (2026)</li>
          <li><strong>Diploma in Computer Engineering</strong> — S H Jondhale College, Dombivli, MSBTE (2022)</li>
          <li><strong>Secondary School Certificate (SSC)</strong> — Maharashtra State Board</li>
        </ul>
      </section>

      <footer className="mt-10 border-t border-slate-200 pt-3 text-[13.5px] text-slate-500">
        References and metrics available on request. Metrics on this page are self-reported unless stated otherwise.
      </footer>
    </main>
  );
}

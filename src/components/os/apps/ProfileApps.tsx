'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { featuredProjects, ownerProfile } from '@/data/ownerProfile';

export function JourneyApp() {
  return (
    <div>
      <p className="mb-5 text-[var(--secondary)]">
        AI Product Developer with community leadership experience.{' '}
        <Link className="text-link" href="/about">
          Read the About page.
        </Link>
      </p>
      <ol className="space-y-5 border-l border-white/20 pl-5">
        {ownerProfile.journey.map((item) => (
          <li key={item.year}>
            <p className="font-mono text-sm text-[var(--accent)]">{item.year}</p>
            <h3 className="mt-1 text-lg font-semibold">{item.title}</h3>
            <p className="mt-2 text-[var(--secondary)]">{item.story}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
export function SystemsApp() {
  return (
    <div className="space-y-4">
      {ownerProfile.services.map((service) => (
        <section key={service.name} className="rounded-xl border border-white/15 p-4">
          <h3 className="text-lg font-semibold">{service.name}</h3>
          <p className="mt-2 text-[var(--secondary)]">{service.detail}</p>
          <ul className="stack-list mt-3">
            {service.stack.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ))}
      <section className="notice">
        <h3 className="font-semibold">How I approach a build</h3>
        <ol className="mt-3 list-decimal space-y-2 pl-5">
          <li>Define a specific problem and the useful workflow.</li>
          <li>Keep the first version focused.</li>
          <li>Build with AI assistance; review what is produced.</li>
          <li>Make implementation decisions and evidence inspectable.</li>
          <li>Keep learning and improving the underlying coding skills.</li>
        </ol>
      </section>
    </div>
  );
}
export function AchievementsApp() {
  return (
    <div className="space-y-4">
      {ownerProfile.achievements.map((item) => (
        <section key={item.title} className="rounded-xl border border-white/15 p-4">
          <p className="eyebrow">{item.category}</p>
          <h3 className="mt-2 text-lg font-semibold">{item.title}</h3>
          <p className="mt-2 text-[var(--secondary)]">{item.detail}</p>
        </section>
      ))}
    </div>
  );
}
export function SocialsApp() {
  return (
    <ul className="space-y-3">
      {ownerProfile.socials.map((social) => (
        <li
          key={social.network}
          className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/15 p-4"
        >
          <div>
            <h3 className="font-semibold">{social.network}</h3>
            <p className="mt-1 text-sm text-[var(--secondary)]">{social.purpose}</p>
          </div>
          <a
            className="button-secondary"
            href={social.url}
            target={social.url.startsWith('mailto:') ? undefined : '_blank'}
            rel="noopener noreferrer"
          >
            Open {social.network}
            <ArrowUpRight size={15} aria-hidden="true" />
            {!social.url.startsWith('mailto:') && <span className="sr-only"> (new tab)</span>}
          </a>
        </li>
      ))}
    </ul>
  );
}
export function FounderTxtApp() {
  return (
    <pre className="whitespace-pre-wrap break-words rounded-xl border border-white/15 bg-black/20 p-4 font-mono text-sm leading-loose text-[var(--secondary)]">{`who i am\n  ${ownerProfile.identity.fullName} — AI Product Developer, Mumbai.\n\nwhat i build\n  Web products, AI integrations, and browser tools.\n\nhow i build\n  Next.js, TypeScript, and AI-assisted workflows.\n  I continue developing my coding depth.\n\ncommunity roots\n  President, MUStudentsUnited, Aug 2024–Mar 2026.\n  Platform workflows, UX, and adoption.\n  Followers are not platform users.\n\nwhat matters\n  Useful workflows. Clear decisions. Inspectable work.\n  No invented clients, revenue, or testimonials.\n\nnext chapter\n  ${ownerProfile.identity.availability}\n\ncontact\n  ${ownerProfile.conversion.email}`}</pre>
  );
}
export function NotesApp() {
  return (
    <div className="space-y-4">
      <p className="text-[var(--secondary)]">
        Build notes live in the published case studies: architecture, implementation decisions, and
        evidence limits. No unpublished articles are listed.
      </p>
      {featuredProjects.map((project) => (
        <Link
          key={project.id}
          className="flex min-h-14 items-center justify-between gap-3 rounded-xl border border-white/15 p-4 hover:bg-white/5"
          href={`/work/${project.id}`}
        >
          <span>{project.name} — build notes</span>
          <ArrowUpRight size={17} aria-hidden="true" />
        </Link>
      ))}
      <a
        className="text-link inline-flex min-h-11 items-center gap-2"
        href="https://github.com/hiraypawan/Portfolio"
        target="_blank"
        rel="noopener noreferrer"
      >
        Portfolio source & build documentation <ArrowUpRight size={15} aria-hidden="true" />
        <span className="sr-only"> (new tab)</span>
      </a>
    </div>
  );
}
export function EmergencyApp() {
  return (
    <div className="space-y-4">
      <section className="notice">
        <h3 className="text-lg font-semibold text-[#fda4af]">Urgent business inquiry</h3>
        <p className="mt-2">
          For time-sensitive project work only. This is not a life-safety service, an on-call
          contract, or a guaranteed response time.
        </p>
      </section>
      <a
        className="button-primary"
        href={`mailto:${ownerProfile.conversion.email}?subject=${encodeURIComponent('[URGENT] Project inquiry — PawanOS')}`}
      >
        Email with [URGENT] <ArrowUpRight size={16} aria-hidden="true" />
      </a>
      <a
        className="button-secondary"
        href={`tel:${ownerProfile.conversion.phone.replace(/[^+\d]/g, '')}`}
      >
        Call {ownerProfile.conversion.phone}
      </a>
      <p className="text-sm text-[var(--muted)]">
        Timezone: {ownerProfile.identity.timezone}. Normal hiring and project inquiries belong in
        Contact.
      </p>
    </div>
  );
}

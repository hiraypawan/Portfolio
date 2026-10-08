'use client';

import { ArrowUpRight } from 'lucide-react';
import { hasPublicUrl, ownerProfile } from '@/data/ownerProfile';

export default function BrowserApp() {
  const bookmarks = [
    ...ownerProfile.projects
      .filter((project) => hasPublicUrl(project.url))
      .map((project) => ({ name: project.name, url: project.url })),
    ...ownerProfile.socials
      .filter((social) => hasPublicUrl(social.url))
      .map((social) => ({ name: social.network, url: social.url })),
  ];
  return (
    <div className="space-y-3">
      <p className="mb-5 text-[var(--secondary)]">
        Public project and professional links. Sites open in a new tab rather than a simulated
        iframe browser. Deployment status is owner-reported.
      </p>
      {bookmarks.map((bookmark) => (
        <article
          className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/15 p-4"
          key={bookmark.url}
        >
          <div className="min-w-0">
            <h3 className="font-semibold">{bookmark.name}</h3>
            <p className="mt-1 break-all text-sm text-[var(--muted)]">{bookmark.url}</p>
          </div>
          <a
            className="button-secondary"
            href={bookmark.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open <ArrowUpRight size={15} aria-hidden="true" />
            <span className="sr-only"> {bookmark.name} (new tab)</span>
          </a>
        </article>
      ))}
    </div>
  );
}

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Code2, FolderClosed } from 'lucide-react';
import ProjectDetails, { ProjectLinks } from '@/components/portfolio/ProjectDetails';
import {
  featuredProjects,
  hasPublicUrl,
  ownerProfile,
  projectStatusLabels,
  publicMetrics,
} from '@/data/ownerProfile';

export function ProjectsApp({ onOpenCase }: { onOpenCase: (id: string) => void }) {
  return (
    <div className="space-y-5">
      <p className="text-[var(--secondary)]">
        Selected work first. Read a case study, inspect the source, or open the conventional{' '}
        <Link href="/work" className="text-link">
          work page
        </Link>
        .
      </p>
      {ownerProfile.projects.map((project) => (
        <article key={project.id} className="rounded-xl border border-white/15 bg-white/[.03] p-4">
          <p className="eyebrow">
            {project.category} / {projectStatusLabels[project.status]}
          </p>
          <h3 className="mt-2 text-xl font-semibold">{project.name}</h3>
          <p className="mt-2 text-[var(--secondary)]">{project.summary}</p>
          <ul className="stack-list mt-3">
            {project.stack.slice(0, 4).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button className="button-primary" onClick={() => onOpenCase(project.id)}>
              Open case study <ArrowRight size={15} aria-hidden="true" />
            </button>
            {hasPublicUrl(project.repository) && (
              <a
                className="button-secondary"
                href={project.repository}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Code2 size={15} aria-hidden="true" /> Source
                <span className="sr-only"> (new tab)</span>
              </a>
            )}
            {hasPublicUrl(project.url) && (
              <a
                className="text-link inline-flex min-h-11 items-center gap-1 text-sm"
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit <ArrowUpRight size={14} aria-hidden="true" />
                <span className="sr-only"> {project.name} (new tab)</span>
              </a>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}

export function CaseDetailApp({ id }: { id: string }) {
  const project = ownerProfile.projects.find((item) => item.id === id);
  if (!project)
    return (
      <p>
        This case does not exist.{' '}
        <Link href="/work" className="text-link">
          Read the work.
        </Link>
      </p>
    );
  return (
    <div>
      <p className="mb-5">
        <Link
          href={`/work/${project.id}`}
          className="text-link inline-flex min-h-11 items-center gap-2"
        >
          Shareable case page <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
      </p>
      <ProjectDetails project={project} compact />
    </div>
  );
}

export function ResultsApp() {
  return (
    <div className="space-y-5">
      <p className="text-[var(--secondary)]">
        Public deployment is a shipping milestone, not a revenue or adoption claim.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {publicMetrics().map((metric) => (
          <article className="metric-tile" key={metric.label}>
            <strong>{metric.value}</strong>
            <p>{metric.label}</p>
            <small>
              Self-reported. {metric.source}. Reviewed {metric.lastReviewed}.
            </small>
          </article>
        ))}
      </div>
      {featuredProjects.map((project) => (
        <article key={project.id} className="rounded-xl border border-white/15 p-4">
          <h3 className="text-lg font-semibold">{project.name}</h3>
          <p className="mt-2 text-[var(--secondary)]">{project.outcome}</p>
          <p className="mt-2 text-sm text-[var(--muted)]">{project.evidenceNote}</p>
          <Link
            className="text-link mt-3 inline-flex min-h-11 items-center gap-2"
            href={`/work/${project.id}`}
          >
            Inspect the evidence <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </article>
      ))}
    </div>
  );
}

export function ProofApp() {
  return (
    <div className="space-y-6">
      <p className="text-[var(--secondary)]">
        Evidence does not have to be a testimonial. Here are the supplied screenshot, public code,
        and project links. No testimonials or independent certifications are claimed.
      </p>
      {featuredProjects.map((project) => (
        <section key={project.id} className="rounded-xl border border-white/15 p-4">
          <h3 className="mb-3 text-lg font-semibold">{project.name}</h3>
          {project.image && (
            <Image
              src={project.image}
              alt="Owner-supplied MUStudentsUnited platform screenshot"
              width={1918}
              height={967}
              sizes="(max-width: 768px) 100vw, 650px"
              className="mb-4 rounded-lg"
            />
          )}
          <ProjectLinks project={project} />
          <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">{project.evidenceNote}</p>
        </section>
      ))}
    </div>
  );
}

export function CaseFilesApp({ onOpenCase }: { onOpenCase: (id: string) => void }) {
  const categories = [...new Set(ownerProfile.projects.map((project) => project.category))];
  return (
    <div className="space-y-5">
      {categories.map((category) => (
        <section key={category}>
          <h3 className="eyebrow mb-2 flex items-center gap-2">
            <FolderClosed size={16} aria-hidden="true" />
            {category}
          </h3>
          {ownerProfile.projects
            .filter((project) => project.category === category)
            .map((project) => (
              <button
                key={project.id}
                onClick={() => onOpenCase(project.id)}
                className="mb-2 flex min-h-12 w-full items-center justify-between gap-3 rounded-lg border border-white/15 px-4 py-3 text-left hover:bg-white/5"
              >
                <span>{project.name}.case</span>
                <ArrowRight size={16} aria-hidden="true" />
              </button>
            ))}
        </section>
      ))}
    </div>
  );
}

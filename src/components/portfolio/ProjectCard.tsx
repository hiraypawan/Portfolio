import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  AudioLines,
  Blocks,
  Code2,
  GraduationCap,
  MousePointer2,
} from 'lucide-react';
import { hasPublicUrl, projectStatusLabels, type Project } from '@/data/ownerProfile';

export function ProjectVisual({ project, large = false }: { project: Project; large?: boolean }) {
  if (project.image)
    return (
      <div className={`project-visual project-screenshot ${large ? 'visual-large' : ''}`}>
        <Image
          src={project.image}
          alt="Owner-supplied screenshot of the MUStudentsUnited notes platform, showing browse, upload, and admin navigation."
          width={1918}
          height={967}
          sizes={
            large
              ? '(max-width: 800px) 100vw, 1100px'
              : '(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 360px'
          }
        />
        <span className="visual-caption">Owner-supplied screenshot</span>
      </div>
    );
  const onebrain = project.id === 'onebrain';
  const smarty = project.id === 'smarty';
  const Icon = onebrain ? AudioLines : smarty ? MousePointer2 : Blocks;
  return (
    <div
      className={`project-visual ${onebrain ? 'visual-onebrain' : smarty ? 'visual-smarty' : 'visual-tool'} ${large ? 'visual-large' : ''}`}
    >
      <span className="visual-caption">{project.category} / workflow overview</span>
      <span className="visual-icon" aria-hidden="true">
        <Icon size={large ? 46 : 36} strokeWidth={1.5} />
      </span>
      <p className="visual-title">
        {project.name}
        <span>_</span>
      </p>
      <div className="visual-steps" role="group" aria-label={`${project.name} workflow`}>
        {(onebrain
          ? ['Capture', 'Review', 'Sync']
          : smarty
            ? ['Summarize', 'Collect', 'Fill forms']
            : project.stack.slice(0, 3)
        ).map((step) => (
          <span key={step}>{step}</span>
        ))}
      </div>
    </div>
  );
}

export function ProjectCard({
  project,
  number,
  heading = 'h3',
}: {
  project: Project;
  number: number;
  heading?: 'h2' | 'h3';
}) {
  const Heading = heading;
  return (
    <article className="project-card">
      <div className="project-cover">
        <ProjectVisual project={project} />
      </div>
      <div className="project-card-body">
        <div className="mb-3 flex items-center justify-between gap-2 font-mono text-[11px] uppercase tracking-wider text-[var(--muted)]">
          <span>
            {String(number).padStart(2, '0')} / {project.category}
          </span>
          <span className="status-dot" title={projectStatusLabels[project.status]}>
            <span aria-hidden="true" />
            {project.status === 'live'
              ? 'Public link'
              : project.status === 'in-development'
                ? 'In progress'
                : project.status === 'local'
                  ? 'Local build'
                  : 'Archived'}
          </span>
        </div>
        <Heading className="text-2xl font-semibold tracking-tight">
          <Link href={`/work/${project.id}`}>{project.name}</Link>
        </Heading>
        <p className="mt-2 min-h-[3rem] text-[15px] leading-relaxed text-[var(--secondary)]">
          {project.summary}
        </p>
        <ul aria-label={`${project.name} technology`} className="stack-list mt-4">
          {project.stack.slice(0, 3).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="project-card-actions">
          <Link
            href={`/work/${project.id}`}
            className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold"
          >
            Case study <ArrowRight size={15} aria-hidden="true" />
            <span className="sr-only"> for {project.name}</span>
          </Link>
          {hasPublicUrl(project.repository) ? (
            <a
              href={project.repository}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-1 text-sm text-[var(--secondary)]"
            >
              <Code2 size={15} aria-hidden="true" /> Code
              <span className="sr-only"> for {project.name} (new tab)</span>
            </a>
          ) : (
            hasPublicUrl(project.url) && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-1 text-sm text-[var(--secondary)]"
              >
                Visit <ArrowUpRight size={15} aria-hidden="true" />
                <span className="sr-only"> {project.name} (new tab)</span>
              </a>
            )
          )}
        </div>
      </div>
    </article>
  );
}

export function ProjectMark({ id }: { id: string }) {
  const Icon =
    id === 'onebrain' ? AudioLines : id === 'mustudentsunited' ? GraduationCap : MousePointer2;
  return <Icon size={22} strokeWidth={1.6} aria-hidden="true" />;
}

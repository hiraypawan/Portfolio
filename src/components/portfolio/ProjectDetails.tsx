import Link from 'next/link';
import { ArrowUpRight, Code2 } from 'lucide-react';
import { hasPublicUrl, projectStatusLabels, type Project } from '@/data/ownerProfile';
import { ProjectVisual } from './ProjectCard';

export function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap gap-3">
      {hasPublicUrl(project.url) && (
        <a href={project.url} className="button-primary" target="_blank" rel="noopener noreferrer">
          Visit project <ArrowUpRight size={16} aria-hidden="true" />
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      )}
      {hasPublicUrl(project.repository) && (
        <a
          href={project.repository}
          className="button-secondary"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Code2 size={16} aria-hidden="true" /> View source
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      )}
      {!hasPublicUrl(project.url) && !hasPublicUrl(project.repository) && (
        <Link href="/contact" className="button-secondary">
          Ask about this project <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      )}
    </div>
  );
}

export default function ProjectDetails({
  project,
  compact = false,
}: {
  project: Project;
  compact?: boolean;
}) {
  return (
    <div className={`case-body ${compact ? 'case-compact' : ''}`}>
      <dl className="case-meta">
        <div>
          <dt>Role</dt>
          <dd>{project.role}</dd>
        </div>
        <div>
          <dt>Period</dt>
          <dd>{project.dates}</dd>
        </div>
        <div>
          <dt>Context</dt>
          <dd>{project.client}</dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd>{projectStatusLabels[project.status]}</dd>
        </div>
      </dl>
      <section className="case-section">
        <h2>The problem</h2>
        <p>{project.problem}</p>
      </section>
      <section className="case-section">
        <h2>What I built</h2>
        <p>{project.intervention}</p>
        {project.caseStudy && (
          <ul>
            {project.caseStudy.contributions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
      </section>
      {project.caseStudy && (
        <>
          <section className="case-section">
            <h2>Architecture & workflow</h2>
            <ol className="architecture-list">
              {project.caseStudy.architecture.map((item, index) => (
                <li key={item}>
                  <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                  {item}
                </li>
              ))}
            </ol>
          </section>
          <section className="case-section">
            <h2>Implementation decisions</h2>
            <ul>
              {project.caseStudy.decisions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </>
      )}
      <section className="case-section">
        <h2>Stack & access</h2>
        <ul className="stack-list">
          {project.stack.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="mt-3">Authentication: {project.auth}</p>
      </section>
      {project.image && (
        <section className="case-section">
          <h2>Supplied evidence</h2>
          <ProjectVisual project={project} large={!compact} />
        </section>
      )}
      <section className="case-section evidence-panel">
        <p className="eyebrow">Outcome / owner-reported</p>
        <h2 className="mt-3">{project.outcome}</h2>
        <p>{project.caseStudy?.validation ?? project.evidenceNote}</p>
        {project.caseStudy && <p className="text-sm">{project.evidenceNote}</p>}
        <ProjectLinks project={project} />
      </section>
    </div>
  );
}

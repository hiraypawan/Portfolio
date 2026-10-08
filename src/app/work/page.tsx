import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import SiteShell from '@/components/portfolio/SiteShell';
import { ProjectCard } from '@/components/portfolio/ProjectCard';
import { featuredProjects, ownerProfile, projectStatusLabels } from '@/data/ownerProfile';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata(
  'Work — projects & case studies',
  'Explore OneBrain, MUStudentsUnited, Smarty, and more. Project roles, architecture, public code, and honestly qualified outcomes.',
  '/work',
);

export default function WorkPage() {
  const other = ownerProfile.projects.filter((project) => !project.featured);
  return (
    <SiteShell active="/work">
      <main id="main-content">
        <header className="page-heading">
          <p className="eyebrow">Work / {ownerProfile.projects.length} project records</p>
          <h1>
            Ideas into working products<span>.</span>
          </h1>
          <p>
            Web apps, AI integrations, and browser tools. Start with three selected builds, then
            explore experiments and work in progress.
          </p>
        </header>
        <section aria-labelledby="selected-heading">
          <h2 id="selected-heading" className="sr-only">
            Selected projects
          </h2>
          <div className="project-grid">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} number={index + 1} />
            ))}
          </div>
        </section>
        <section className="section-space" aria-labelledby="more-heading">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Also in the workspace</p>
              <h2 id="more-heading">
                More builds & experiments<span>.</span>
              </h2>
            </div>
          </div>
          <div className="more-project-grid">
            {other.map((project) => (
              <article className="more-project" key={project.id}>
                <p className="eyebrow">{projectStatusLabels[project.status]}</p>
                <h3 className="mt-3 text-xl font-semibold">
                  <Link href={`/work/${project.id}`}>{project.name}</Link>
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[var(--secondary)]">
                  {project.summary}
                </p>
                <p className="mt-3 font-mono text-xs leading-relaxed text-[var(--muted)]">
                  {project.stack.join(' / ')}
                </p>
                <Link
                  className="text-link mt-4 inline-flex min-h-11 items-center gap-2 text-sm"
                  href={`/work/${project.id}`}
                >
                  Project details <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </section>
        <aside className="notice my-12">
          <strong className="text-[var(--foreground)]">A note on evidence.</strong>{' '}
          {ownerProfile.legal.metricDisclaimer} Public links are supplied for inspection, not a
          guarantee of current uptime. Local and in-development projects are labeled separately.
        </aside>
      </main>
    </SiteShell>
  );
}

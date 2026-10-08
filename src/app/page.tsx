import Link from 'next/link';
import { ArrowDown, ArrowRight, ArrowUpRight, Braces, Command, MapPin } from 'lucide-react';
import SiteShell from '@/components/portfolio/SiteShell';
import { ProjectCard, ProjectMark } from '@/components/portfolio/ProjectCard';
import { featuredProjects, ownerProfile, publicMetrics } from '@/data/ownerProfile';

// A real server-rendered portfolio. JavaScript adds convenience, never access.
export default function Home() {
  const publicLinks = ownerProfile.projects.filter((project) => project.status === 'live').length;
  const communityMetric = publicMetrics().find((metric) => metric.label.includes('Instagram'));
  return (
    <SiteShell>
      <main id="main-content">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="availability">
              <span aria-hidden="true" /> Open to junior roles & freelance
            </p>
            <p className="eyebrow mt-9">Hello, I’m Pawan Hiray</p>
            <h1 id="hero-title" className="hero-title">
              AI Product
              <br />
              <span>Developer.</span>
            </h1>
            <p className="hero-subtitle">From an idea to a working product.</p>
            <p className="hero-description">{ownerProfile.identity.intro}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/work" className="button-primary">
                View my work <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
              <Link href="/resume" className="button-secondary">
                Read my resume <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
            <p className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] text-[var(--muted)]">
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={14} aria-hidden="true" /> Mumbai, India
              </span>
              <span>Remote / Hybrid / Ready to relocate</span>
            </p>
          </div>
          <div className="workspace-card">
            <div className="workspace-bar">
              <span className="flex gap-1.5" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span>pawan / workspace</span>
              <Braces size={15} aria-hidden="true" />
            </div>
            <div className="workspace-body">
              <span className="workspace-monogram" aria-hidden="true">
                P<span>_</span>
              </span>
              <p className="eyebrow mt-6">Product mindset. Builder’s curiosity.</p>
              <p className="workspace-heading">
                Useful products.
                <br />
                <span>Intentional AI.</span>
              </p>
              <p className="mt-4 max-w-[32ch] text-sm leading-relaxed text-[var(--secondary)]">
                Small systems for real problems. Here’s a look inside the workspace.
              </p>
              <div className="workspace-projects">
                {featuredProjects.map((project) => (
                  <Link href={`/work/${project.id}`} key={project.id}>
                    <span className={`workspace-project-icon icon-${project.id}`}>
                      <ProjectMark id={project.id} />
                    </span>
                    <span>
                      <strong>{project.name}</strong>
                      <small>{project.category}</small>
                    </span>
                    <ArrowUpRight size={17} aria-hidden="true" />
                  </Link>
                ))}
              </div>
              <Link href="/os" className="workspace-desktop-link">
                <Command size={14} aria-hidden="true" /> Prefer to explore? Open PawanOS{' '}
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
        <div className="proof-strip" aria-label="Portfolio at a glance">
          <div>
            <strong>{String(featuredProjects.length).padStart(2, '0')}</strong>
            <span>Selected case studies</span>
          </div>
          <div>
            <strong>{String(publicLinks).padStart(2, '0')}</strong>
            <span>
              Public project links<small>Deployment status is owner-reported</small>
            </span>
          </div>
          <div>
            <strong>{communityMetric?.value ?? 'AI'}</strong>
            <span>
              {communityMetric ? 'Community Instagram followers' : 'AI-assisted product work'}
              <small>
                {communityMetric
                  ? 'MUStudentsUnited · self-reported'
                  : 'Clear decisions. Inspectable work.'}
              </small>
            </span>
          </div>
          <a href="#selected-work" className="proof-scroll" aria-label="Scroll to selected work">
            <ArrowDown size={20} aria-hidden="true" />
          </a>
        </div>
        <section id="selected-work" className="section-space" aria-labelledby="work-heading">
          <div className="section-heading">
            <div>
              <p className="eyebrow">01 / Selected work</p>
              <h2 id="work-heading">
                Built around a real problem<span>.</span>
              </h2>
            </div>
            <Link href="/work" className="text-link inline-flex min-h-11 items-center gap-2">
              All projects <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
          <div className="project-grid">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} number={index + 1} />
            ))}
          </div>
          <p className="mt-5 text-[13px] leading-relaxed text-[var(--muted)]">
            Self-initiated builds, plus one community collaboration. Case studies separate
            implementation descriptions from supplied evidence. No invented clients or outcomes.
          </p>
        </section>
        <section className="about-preview section-space" aria-labelledby="about-heading">
          <div>
            <p className="eyebrow">02 / A little context</p>
            <h2 id="about-heading">
              Product thinking.
              <br />
              Community roots.
            </h2>
          </div>
          <div>
            <p className="text-lg leading-relaxed text-[var(--secondary)]">
              Before these projects, I worked on MUStudentsUnited’s student notes platform and
              served as President from August 2024 to March 2026.
            </p>
            <p className="mt-4 leading-relaxed text-[var(--muted)]">
              That experience connects how I think about products: start with a useful workflow,
              make the interface clear, and keep learning from the people using it. I build with AI
              assistance and continue developing my coding depth.
            </p>
            <Link href="/about" className="text-link mt-5 inline-flex min-h-11 items-center gap-2">
              More about me <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </section>
        <section className="contact-banner" aria-labelledby="contact-heading">
          <div>
            <p className="eyebrow">Have a role or a project in mind?</p>
            <h2 id="contact-heading">
              Let’s build something useful<span>.</span>
            </h2>
            <p>{ownerProfile.identity.availability}</p>
          </div>
          <Link href="/contact" className="button-primary">
            Let’s talk <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </section>
      </main>
    </SiteShell>
  );
}

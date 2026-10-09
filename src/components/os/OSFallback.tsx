import Link from 'next/link';
import { ArrowRight, Download } from 'lucide-react';
import { featuredProjects, ownerProfile } from '@/data/ownerProfile';

/**
 * A complete no-JavaScript and crawler-friendly entry point for PawanOS.
 * The interactive shell is progressively enhanced; the portfolio never depends on it.
 */
export default function OSFallback() {
  return (
    <div className="os-fallback">
      <main id="main-content" className="os-fallback-window">
        <header className="os-fallback-titlebar">
          <span aria-hidden="true" className="os-fallback-controls">
            <i />
            <i />
            <i />
          </span>
          <span>PawanOS / Portfolio</span>
        </header>
        <div className="os-fallback-content">
          <p className="eyebrow">Accessible reading mode</p>
          <h1>Pawan Hiray — AI Product Developer</h1>
          <p>{ownerProfile.identity.intro}</p>
          <nav aria-label="Portfolio sections" className="os-fallback-nav">
            <Link href="/work">Work</Link>
            <Link href="/about">About</Link>
            <Link href="/resume">Resume</Link>
            <Link href="/contact">Contact</Link>
          </nav>
          <section aria-labelledby="fallback-work-heading">
            <h2 id="fallback-work-heading">Selected work</h2>
            <div className="os-fallback-projects">
              {featuredProjects.map((project) => (
                <article key={project.id}>
                  <p className="eyebrow">{project.category}</p>
                  <h3>{project.name}</h3>
                  <p>{project.summary}</p>
                  <Link href={`/work/${project.id}`}>
                    Read case study <ArrowRight size={15} aria-hidden="true" />
                  </Link>
                </article>
              ))}
            </div>
          </section>
          <div className="os-fallback-actions">
            <Link href="/work" className="button-primary">
              Explore all work <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <a href="/Pawan-Hiray-Resume.pdf" className="button-secondary" download>
              Download resume <Download size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}

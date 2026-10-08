import Link from 'next/link';
import PersonalOS from '@/components/os/PersonalOS';
import SiteShell from '@/components/portfolio/SiteShell';
import { featuredProjects } from '@/data/ownerProfile';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata(
  'PawanOS — interactive desktop',
  'Explore Pawan Hiray’s work through an optional desktop interface. Project pages, resume, and contact remain readable without JavaScript.',
  '/os',
);
export default function OSPage() {
  return (
    <>
      <noscript>
        <style>{'.personal-os { display: none !important; }'}</style>
        <SiteShell>
          <main id="main-content" className="page-heading">
            <p className="eyebrow">The desktop is optional</p>
            <h1>Pawan Hiray — AI Product Developer</h1>
            <p>This interactive desktop needs JavaScript. Your access to the work does not.</p>
            <ul className="mt-6 space-y-3">
              {featuredProjects.map((project) => (
                <li key={project.id}>
                  <a href={`/work/${project.id}`} className="text-link">
                    {project.name}
                  </a>{' '}
                  — {project.summary}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/work" className="button-primary">
                Work
              </Link>
              <Link href="/about" className="button-secondary">
                About
              </Link>
              <Link href="/resume" className="button-secondary">
                Resume
              </Link>
              <Link href="/contact" className="button-secondary">
                Contact
              </Link>
            </div>
          </main>
        </SiteShell>
      </noscript>
      <PersonalOS />
    </>
  );
}

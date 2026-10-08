import Link from 'next/link';
import { ArrowUpRight, Code2, Layers3, Users } from 'lucide-react';
import SiteShell from '@/components/portfolio/SiteShell';
import { ownerProfile, publicMetrics } from '@/data/ownerProfile';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata(
  'About Pawan',
  'AI-assisted product building and community leadership. Pawan Hiray’s background, approach, and MUStudentsUnited Presidency, August 2024–March 2026.',
  '/about',
);

export default function AboutPage() {
  const principles = [
    {
      icon: Layers3,
      title: 'Start with a useful workflow',
      text: 'Focus on a specific problem and the smallest product that addresses it.',
    },
    {
      icon: Code2,
      title: 'AI-assisted. Still accountable.',
      text: 'AI tools support implementation. Product decisions, review, and continued learning remain my responsibility.',
    },
    {
      icon: Users,
      title: 'Stay close to the people using it',
      text: 'Community work informs how I approach interfaces, approvals, and adoption.',
    },
  ];
  return (
    <SiteShell active="/about">
      <main id="main-content">
        <header className="page-heading">
          <p className="eyebrow">About / Pawan Hiray</p>
          <h1>
            A product mindset.
            <br />A builder’s curiosity<span>.</span>
          </h1>
          <p>
            I’m a Mumbai-based AI Product Developer with a Computer Engineering background. I build
            with Next.js, TypeScript, and AI-assisted workflows, and I’m looking for a team where I
            can contribute and keep growing.
          </p>
        </header>
        <section className="about-principles" aria-labelledby="approach-heading">
          <h2 id="approach-heading" className="sr-only">
            My approach
          </h2>
          {principles.map(({ icon: Icon, title, text }) => (
            <article key={title}>
              <Icon size={25} className="text-[var(--accent)]" aria-hidden="true" />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </section>
        <section className="about-preview section-space" aria-labelledby="leadership-heading">
          <div>
            <p className="eyebrow">Community roots</p>
            <h2 id="leadership-heading">MUStudentsUnited</h2>
            <p className="mt-3 font-mono text-sm text-[var(--muted)]">
              President · Aug 2024–Mar 2026
            </p>
          </div>
          <div>
            <p className="text-lg leading-relaxed text-[var(--secondary)]">
              I worked with the student community founded by Jaden Joseph, overseeing platform UX,
              authentication, note uploads, administrator approvals, and adoption.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {publicMetrics().map((metric) => (
                <div key={metric.label} className="metric-tile">
                  <strong>{metric.value}</strong>
                  <p>{metric.label}</p>
                  <small>Self-reported · {metric.source}</small>
                </div>
              ))}
            </div>
            <Link
              href="/work/mustudentsunited"
              className="text-link mt-5 inline-flex min-h-11 items-center gap-2"
            >
              Read the community case study <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </section>
        <section className="section-space" aria-labelledby="journey-heading">
          <div className="section-heading">
            <div>
              <p className="eyebrow">The journey</p>
              <h2 id="journey-heading">
                Learning. Building. Repeating<span>.</span>
              </h2>
            </div>
          </div>
          <ol className="journey-list">
            {ownerProfile.journey.map((step) => (
              <li key={step.year}>
                <span className="font-mono text-sm text-[var(--accent)]">{step.year}</span>
                <div>
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-[var(--secondary)]">
                    {step.story}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>
        <section className="contact-banner">
          <div>
            <p className="eyebrow">The next chapter</p>
            <h2>
              A good team. A useful problem<span>.</span>
            </h2>
            <p>{ownerProfile.identity.availability}</p>
          </div>
          <Link href="/contact" className="button-primary">
            Get in touch <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </section>
      </main>
    </SiteShell>
  );
}

import Link from 'next/link';
import { Download } from 'lucide-react';
import SiteShell from '@/components/portfolio/SiteShell';
import PrintButton from '@/components/portfolio/PrintButton';
import { hasPublicUrl, ownerProfile, resumeProjects, siteUrl } from '@/data/ownerProfile';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata(
  'Resume — AI Product Developer',
  'Pawan Hiray’s concise resume: Next.js and AI product projects, MUStudentsUnited leadership, skills, education, and a downloadable one-page PDF.',
  '/resume',
);

export default function ResumePage() {
  const linkedin = ownerProfile.socials.find((social) => social.network === 'LinkedIn')!;
  return (
    <SiteShell active="/resume">
      <main id="main-content" className="resume-main">
        <div className="resume-toolbar print:hidden">
          <div>
            <p className="eyebrow">Resume / Same story, less interface</p>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Readable HTML. A synchronized, one-page PDF.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="/Pawan-Hiray-Resume.pdf" download className="button-primary">
              <Download size={16} aria-hidden="true" /> Download PDF
            </a>
            <PrintButton />
          </div>
        </div>
        <noscript>
          <style>{'.requires-js { display: none !important; }'}</style>
        </noscript>
        <article className="resume-page" aria-label="Pawan Hiray resume">
          <header>
            <h1>{ownerProfile.identity.fullName}</h1>
            <p className="resume-headline">{ownerProfile.resume.headline}</p>
            <address>
              Mumbai, India ·{' '}
              <a href={`tel:${ownerProfile.conversion.phone.replace(/[^+\d]/g, '')}`}>
                {ownerProfile.conversion.phone}
              </a>{' '}
              ·{' '}
              <a href={`mailto:${ownerProfile.conversion.email}`}>
                {ownerProfile.conversion.email}
              </a>
              <br />
              <a href="https://github.com/hiraypawan">github.com/hiraypawan</a> ·{' '}
              <a href={linkedin.url}>LinkedIn</a> · <a href={siteUrl}>pawanhiray.vercel.app</a>
            </address>
            <p className="resume-availability">{ownerProfile.identity.availability}</p>
          </header>
          <section>
            <h2>Summary</h2>
            <p>{ownerProfile.resume.summary}</p>
          </section>
          <section>
            <h2>Skills</h2>
            <ul className="resume-skills">
              {ownerProfile.resume.skills.map((skill) => (
                <li key={skill.label}>
                  <strong>{skill.label}:</strong> {skill.text}
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2>Leadership & community</h2>
            <div className="resume-row">
              <h3>{ownerProfile.resume.leadership.title}</h3>
              <span>{ownerProfile.resume.leadership.dates}</span>
            </div>
            <ul className="resume-bullets">
              {ownerProfile.resume.leadership.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </section>
          <section>
            <h2>Selected projects — AI-assisted implementation</h2>
            {resumeProjects.map((project) => (
              <div className="resume-project" key={project.id}>
                <div className="resume-row">
                  <h3>
                    {project.name} — {project.category}
                  </h3>
                  <span>{project.dates}</span>
                </div>
                <p>{project.intervention}</p>
                <p className="resume-stack">{project.stack.join(' · ')}</p>
                <p className="resume-links">
                  <Link href={`/work/${project.id}`}>Case study</Link>
                  {hasPublicUrl(project.url) && (
                    <>
                      {' '}
                      · <a href={project.url}>{project.url.replace('https://', '')}</a>
                    </>
                  )}
                  {hasPublicUrl(project.repository) && (
                    <>
                      {' '}
                      · <a href={project.repository}>Source code</a>
                    </>
                  )}
                </p>
              </div>
            ))}
          </section>
          <section>
            <h2>Education</h2>
            {ownerProfile.resume.education.map((item) => (
              <p key={item.qualification} className="resume-education">
                <strong>{item.qualification}</strong> — {item.institution} ({item.date})
              </p>
            ))}
          </section>
          <footer>
            Project implementations and community metrics are owner-reported. Followers are not
            platform users. Public project evidence: {siteUrl}/work.
          </footer>
        </article>
      </main>
    </SiteShell>
  );
}

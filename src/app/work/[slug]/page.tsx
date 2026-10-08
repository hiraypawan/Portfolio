import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import SiteShell from '@/components/portfolio/SiteShell';
import ProjectDetails, { ProjectLinks } from '@/components/portfolio/ProjectDetails';
import { ownerProfile, type Project } from '@/data/ownerProfile';
import { pageMetadata } from '@/lib/seo';

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return ownerProfile.projects.map((project) => ({ slug: project.id }));
}
function findProject(slug: string): Project {
  const project = ownerProfile.projects.find((item) => item.id === slug);
  if (!project) notFound();
  return project;
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = findProject((await params).slug);
  return pageMetadata(`${project.name} — case study`, project.summary, `/work/${project.id}`);
}

export default async function CasePage({ params }: Props) {
  const project = findProject((await params).slug);
  return (
    <SiteShell active="/work">
      <main id="main-content" className="case-page">
        <Link
          href="/work"
          className="text-link mt-10 inline-flex min-h-11 items-center gap-2 text-sm"
        >
          <ArrowLeft size={15} aria-hidden="true" /> All work
        </Link>
        <header className="page-heading">
          <p className="eyebrow">Case study / {project.category}</p>
          <h1>
            {project.name}
            <span>.</span>
          </h1>
          <p>{project.summary}</p>
          <div className="mt-6">
            <ProjectLinks project={project} />
          </div>
        </header>
        <ProjectDetails project={project} />
        <section className="contact-banner">
          <div>
            <p className="eyebrow">Want to talk about the work?</p>
            <h2>
              Let’s compare notes<span>.</span>
            </h2>
          </div>
          <Link href="/contact" className="button-primary">
            Get in touch <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </section>
      </main>
    </SiteShell>
  );
}

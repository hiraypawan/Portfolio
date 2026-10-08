import Link from 'next/link';
import SiteShell from '@/components/portfolio/SiteShell';

export default function NotFound() {
  return (
    <SiteShell>
      <main id="main-content" className="page-heading min-h-[55vh]">
        <p className="eyebrow">404 / Not in this workspace</p>
        <h1>
          Let’s get you back<span>.</span>
        </h1>
        <p>This page does not exist. The work, resume, and contact links are always available.</p>
        <Link href="/work" className="button-primary mt-7">
          Explore the work →
        </Link>
      </main>
    </SiteShell>
  );
}

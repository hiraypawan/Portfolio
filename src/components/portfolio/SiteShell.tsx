import Link from 'next/link';
import { ArrowUpRight, Command, Github, Linkedin } from 'lucide-react';
import { ownerProfile, PROFILE_UPDATED } from '@/data/ownerProfile';

const navigation = [
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Resume', href: '/resume' },
  { label: 'Contact', href: '/contact' },
];

export function SiteHeader({ active }: { active?: string }) {
  return (
    <header className="site-header">
      <Link href="/" className="brand">
        <span className="brand-symbol" aria-hidden="true">
          P
        </span>
        <span>
          Pawan<span className="text-[var(--accent)]">OS</span>
          <span className="text-[var(--muted)]">.</span>
        </span>
        <span className="sr-only"> — {ownerProfile.identity.fullName}, portfolio home</span>
      </Link>
      <nav aria-label="Primary" className="site-nav">
        {navigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active === item.href ? 'page' : undefined}
            className={item.href === '/contact' ? 'nav-contact' : ''}
          >
            {item.label}
            {item.href === '/contact' && <ArrowUpRight size={15} aria-hidden="true" />}
          </Link>
        ))}
      </nav>
    </header>
  );
}

export function SiteFooter() {
  const github = ownerProfile.socials.find((social) => social.network === 'GitHub')!;
  const linkedin = ownerProfile.socials.find((social) => social.network === 'LinkedIn')!;
  return (
    <footer className="site-footer">
      <div>
        <Link href="/" className="text-lg font-semibold">
          {ownerProfile.identity.fullName}
          <span className="text-[var(--accent)]">.</span>
        </Link>
        <p className="mt-1 text-sm text-[var(--muted)]">
          {ownerProfile.identity.roles[0]} · {ownerProfile.identity.location}
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Link href="/os" className="footer-link">
          <Command size={15} aria-hidden="true" /> Explore PawanOS
        </Link>
        <a href={github.url} target="_blank" rel="noopener noreferrer" className="footer-link">
          <Github size={16} aria-hidden="true" /> GitHub
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
        <a href={linkedin.url} target="_blank" rel="noopener noreferrer" className="footer-link">
          <Linkedin size={16} aria-hidden="true" /> LinkedIn
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
      <p className="w-full text-xs text-[var(--muted)]">
        © {PROFILE_UPDATED.slice(0, 4)} Pawan Hiray. Built with Next.js. Browser settings stay on
        your device.
      </p>
    </footer>
  );
}

export default function SiteShell({
  children,
  active,
}: {
  children: React.ReactNode;
  active?: string;
}) {
  return (
    <div className="portfolio-site">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <div className="site-container">
        <SiteHeader active={active} />
        {children}
        <SiteFooter />
      </div>
    </div>
  );
}

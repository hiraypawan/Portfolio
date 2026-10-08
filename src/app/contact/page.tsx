import Link from 'next/link';
import { ArrowUpRight, Clock3, MapPin } from 'lucide-react';
import SiteShell from '@/components/portfolio/SiteShell';
import ContactForm from '@/components/portfolio/ContactForm';
import { ownerProfile } from '@/data/ownerProfile';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata(
  'Contact Pawan',
  'Contact Pawan Hiray about a junior development role or freelance AI product work. Email directly or prepare a hiring or project brief.',
  '/contact',
);

export default function ContactPage() {
  return (
    <SiteShell active="/contact">
      <main id="main-content">
        <header className="page-heading">
          <p className="eyebrow">Contact / Let’s talk</p>
          <h1>
            A role. A project.
            <br />A useful conversation<span>.</span>
          </h1>
          <p>
            Tell me what you’re working on, what you need, and what a good outcome looks like.
            Hiring inquiries are welcome — no budget required.
          </p>
        </header>
        <div className="contact-layout mb-20">
          <section aria-labelledby="brief-heading" className="contact-panel">
            <h2 id="brief-heading" className="text-2xl font-semibold">
              Start the conversation
            </h2>
            <div className="mt-5">
              <ContactForm />
            </div>
          </section>
          <aside className="contact-aside">
            <p className="eyebrow">Good to know</p>
            <div className="mt-5 flex items-start gap-3">
              <MapPin size={19} aria-hidden="true" />
              <p>
                Mumbai, India
                <br />
                <span>Open to Pune, remote, hybrid, and relocation.</span>
              </p>
            </div>
            <div className="mt-5 flex items-start gap-3">
              <Clock3 size={19} aria-hidden="true" />
              <p>
                India Standard Time
                <br />
                <span>{ownerProfile.identity.timezone} · UTC+05:30</span>
              </p>
            </div>
            <div className="mt-7 border-t border-[var(--border)] pt-6">
              <p className="mb-2 font-semibold">Prefer a direct link?</p>
              {ownerProfile.socials
                .filter((social) => !social.url.startsWith('mailto:'))
                .map((social) => (
                  <a
                    className="text-link flex min-h-11 items-center justify-between gap-3"
                    key={social.network}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.network}
                    <ArrowUpRight size={16} aria-hidden="true" />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ))}
              <Link
                className="text-link flex min-h-11 items-center justify-between gap-3"
                href="/resume"
              >
                Resume <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-[var(--muted)]">
              No calendar embed or contact backend. Your brief stays in this page until you choose
              to open an email draft.
            </p>
          </aside>
        </div>
      </main>
    </SiteShell>
  );
}

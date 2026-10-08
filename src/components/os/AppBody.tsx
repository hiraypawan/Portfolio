'use client';

import Link from 'next/link';

import dynamic from 'next/dynamic';
import ContactForm from '@/components/portfolio/ContactForm';
import type { SysControls } from './apps/SettingsApp';

function Loading() {
  return (
    <p role="status" className="text-[var(--secondary)]">
      Loading app…
    </p>
  );
}
const Projects = dynamic(() => import('./apps/WorkApps').then((module) => module.ProjectsApp), {
  loading: Loading,
});
const CaseDetail = dynamic(() => import('./apps/WorkApps').then((module) => module.CaseDetailApp), {
  loading: Loading,
});
const Results = dynamic(() => import('./apps/WorkApps').then((module) => module.ResultsApp), {
  loading: Loading,
});
const Proof = dynamic(() => import('./apps/WorkApps').then((module) => module.ProofApp), {
  loading: Loading,
});
const Cases = dynamic(() => import('./apps/WorkApps').then((module) => module.CaseFilesApp), {
  loading: Loading,
});
const Journey = dynamic(() => import('./apps/ProfileApps').then((module) => module.JourneyApp), {
  loading: Loading,
});
const Systems = dynamic(() => import('./apps/ProfileApps').then((module) => module.SystemsApp), {
  loading: Loading,
});
const Achievements = dynamic(
  () => import('./apps/ProfileApps').then((module) => module.AchievementsApp),
  { loading: Loading },
);
const Socials = dynamic(() => import('./apps/ProfileApps').then((module) => module.SocialsApp), {
  loading: Loading,
});
const Founder = dynamic(() => import('./apps/ProfileApps').then((module) => module.FounderTxtApp), {
  loading: Loading,
});
const Notes = dynamic(() => import('./apps/ProfileApps').then((module) => module.NotesApp), {
  loading: Loading,
});
const Emergency = dynamic(
  () => import('./apps/ProfileApps').then((module) => module.EmergencyApp),
  { loading: Loading },
);
const Whiteboard = dynamic(() => import('./apps/WhiteboardApp'), { loading: Loading });
const Browser = dynamic(() => import('./apps/BrowserApp'), { loading: Loading });
const Settings = dynamic(() => import('./apps/SettingsApp'), { loading: Loading });

export default function AppBody({
  id,
  openCase,
  sys,
}: {
  id: string;
  openCase: (id: string) => void;
  sys: SysControls;
}) {
  if (id.startsWith('case:')) return <CaseDetail id={id.slice(5)} />;
  switch (id) {
    case 'projects':
      return <Projects onOpenCase={openCase} />;
    case 'results':
      return <Results />;
    case 'proof':
      return <Proof />;
    case 'cases':
      return <Cases onOpenCase={openCase} />;
    case 'journey':
      return <Journey />;
    case 'systems':
      return <Systems />;
    case 'achievements':
      return <Achievements />;
    case 'socials':
      return <Socials />;
    case 'founder':
      return <Founder />;
    case 'notes':
      return <Notes />;
    case 'emergency':
      return <Emergency />;
    case 'whiteboard':
      return <Whiteboard />;
    case 'browser':
      return <Browser />;
    case 'settings':
      return <Settings sys={sys} />;
    case 'contact':
      return <ContactForm />;
    default:
      return (
        <p>
          Unknown app.{' '}
          <Link className="text-link" href="/work">
            Read the work.
          </Link>
        </p>
      );
  }
}

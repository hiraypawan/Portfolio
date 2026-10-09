import PersonalOS from '@/components/os/PersonalOS';
import OSFallback from '@/components/os/OSFallback';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata(
  'PawanOS — interactive portfolio',
  'Explore Pawan Hiray’s projects, experience, resume, and contact details through an interactive desktop and mobile operating-system interface.',
  '/os',
);

// Kept as a shareable compatibility route; PawanOS now also powers the main page.
export default function OSPage() {
  return (
    <>
      <noscript>
        <style>{'.personal-os { display: none !important; }'}</style>
        <OSFallback />
      </noscript>
      <PersonalOS />
    </>
  );
}

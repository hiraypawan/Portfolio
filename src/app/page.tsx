import PersonalOS from '@/components/os/PersonalOS';
import OSFallback from '@/components/os/OSFallback';

// PawanOS is the portfolio home. Its no-script view keeps every core route readable.
export default function Home() {
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

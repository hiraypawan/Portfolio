import type { Metadata, Viewport } from 'next';
import '@fontsource-variable/space-grotesk';
import '@fontsource-variable/fira-code';
import './globals.css';
import { ownerProfile, siteUrl } from '@/data/ownerProfile';
import { serializeJsonLd } from '@/lib/seo';

const title = 'Pawan Hiray — AI Product Developer (Next.js + AI) | PawanOS';
const description =
  'Pawan Hiray builds web apps, AI integrations, and browser tools with Next.js and TypeScript. Explore projects, source code, resume, and contact.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  authors: [{ name: ownerProfile.identity.fullName }],
  creator: ownerProfile.identity.fullName,
  alternates: { canonical: siteUrl },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: 'PawanOS',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: { card: 'summary_large_image', title, description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
  themeColor: '#0b0c12',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: ownerProfile.identity.fullName,
              url: siteUrl,
              jobTitle: 'AI Product Developer',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Mumbai',
                addressCountry: 'IN',
              },
              email: ownerProfile.conversion.email,
              sameAs: ownerProfile.socials
                .filter((social) => !social.url.startsWith('mailto:'))
                .map((social) => social.url),
              knowsAbout: [
                'Next.js',
                'React',
                'TypeScript',
                'AI integration',
                'Browser extensions',
                'Community leadership',
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}

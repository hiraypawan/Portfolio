import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Fira_Code } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from '@/components/theme-provider';

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://pawanhiray.vercel.app'),
  title: "Pawan Hiray — Full-Stack Developer (Next.js + AI) | PawanOS",
  description: "Fresher Full-Stack Developer shipping AI features into real products. Ex-President, 10K+ MUStudentsUnited community. Live work: OneBrain AI OS, Smarty extension, DigitalWorkForce. Open to Mumbai / Pune / Remote / Hybrid roles and freelance.",
  keywords: "Pawan Hiray, PawanOS, Fresher Computer Engineer, Full-Stack Developer, AI Agents, Web3, MUStudentsUnited, OneBrain, Smarty Extension, Portfolio OS, Mumbai Developer, Hire AI Developer",
  authors: [{ name: "Pawan Hiray" }],
  creator: "Pawan Hiray",
  alternates: {
    canonical: 'https://pawanhiray.vercel.app',
  },
  openGraph: {
    title: "Pawan Hiray — Full-Stack Developer (Next.js + AI)",
    description: "Fresher Full-Stack Developer shipping AI features into real products. Ex-President, 10K+ MUStudentsUnited community. Open to Mumbai / Pune / Remote roles.",
    url: "https://pawanhiray.vercel.app",
    siteName: "PawanOS",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pawan Hiray — Full-Stack Developer (Next.js + AI)",
    description: "Portfolio OS: live Next.js + AI projects, honest outcomes, ATS resume, contact.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
  maximumScale: 5.0,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${firaCode.variable} font-sans antialiased touch-manipulation`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Pawan Hiray',
              url: 'https://pawanhiray.vercel.app',
              jobTitle: 'Fresher Computer Engineer, Full-Stack Developer, AI Builder',
              address: { '@type': 'PostalAddress', addressLocality: 'Mumbai', addressCountry: 'IN' },
              email: 'mailto:pawanhiray1@gmail.com',
              sameAs: [
                'https://github.com/hiraypawan',
                'https://www.linkedin.com/in/pawan-hiray%E2%9C%AA%F0%9F%92%8E-999bb32a6/',
              ],
              knowsAbout: ['Full-Stack Development', 'AI Agents', 'Web3', 'Chrome Extensions', 'Next.js', 'React', 'Node.js', 'MongoDB', 'Community Leadership'],
            }),
          }}
        />
      </body>
    </html>
  );
}

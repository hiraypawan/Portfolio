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
  title: "Pawan Hiray — PawanOS | AI, Web3 & Full-Stack Builder",
  description: "PawanOS: explore Pawan Hiray's work like an operating system — MUStudentsUnited (30K+ students), AI agents, Web3 tools, growth systems, journey, and contact.",
  keywords: "Pawan Hiray, PawanOS, Full-Stack Developer, AI Agents, Web3, MUStudentsUnited, Portfolio OS, Mumbai Developer",
  authors: [{ name: "Pawan Hiray" }],
  creator: "Pawan Hiray",
  openGraph: {
    title: "Pawan Hiray — PawanOS",
    description: "Explore Pawan's work through apps, case files, proof, journey, and contact — inside one personal OS.",
    url: "https://pawanhiray.vercel.app",
    siteName: "PawanOS",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pawan Hiray — PawanOS",
    description: "Portfolio OS: projects, results, journey, contact, whiteboard.",
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
      </body>
    </html>
  );
}

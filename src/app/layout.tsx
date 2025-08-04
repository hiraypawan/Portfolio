import type { Metadata } from "next";
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
  title: "Pawan Hiray - Full-Stack Developer & AI Innovator",
  description: "Interactive book-style portfolio showcasing full-stack development, AI projects, and Web3 innovations. Featured project: MUStudentsUnited with 20K+ active students.",
  keywords: "Full-Stack Developer, AI, Web3, React, Next.js, Portfolio, MUStudentsUnited, Pawan Hiray",
  authors: [{ name: "Pawan Hiray" }],
  creator: "Pawan Hiray",
  viewport: {
    width: 'device-width',
    initialScale: 1.0,
    maximumScale: 5.0,
    userScalable: true,
  },
  openGraph: {
    title: "Pawan Hiray - Full-Stack Developer & AI Innovator",
    description: "Interactive book-style portfolio showcasing full-stack development, AI projects, and Web3 innovations.",
    url: "https://pawanhiray.vercel.app",
    siteName: "Pawan Hiray Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pawan Hiray - Full-Stack Developer & AI Innovator",
    description: "Interactive book-style portfolio showcasing full-stack development, AI projects, and Web3 innovations.",
  },
  robots: {
    index: true,
    follow: true,
  },
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

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
  title: "Pawan Hiray - Interactive Treasure Hunt Portfolio",
  description: "Embark on a digital treasure hunt through Pawan's world! Discover projects, skills, and hidden achievements in this interactive map-based portfolio. Featured: MUStudentsUnited with 30K+ students.",
  keywords: "Interactive Portfolio, Treasure Hunt, Full-Stack Developer, AI, Web3, React, Next.js, MUStudentsUnited, Pawan Hiray, Game Portfolio",
  authors: [{ name: "Pawan Hiray" }],
  creator: "Pawan Hiray",
  viewport: {
    width: 'device-width',
    initialScale: 1.0,
    maximumScale: 5.0,
    userScalable: true,
  },
  openGraph: {
    title: "Pawan Hiray - Interactive Treasure Hunt Portfolio",
    description: "Embark on a digital treasure hunt through Pawan's interactive world! Discover projects, skills, and hidden achievements.",
    url: "https://pawanhiray.vercel.app",
    siteName: "Pawan Hiray - Treasure Hunt Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pawan Hiray - Interactive Treasure Hunt Portfolio",
    description: "Embark on a digital treasure hunt through Pawan's interactive world! Discover projects, skills, and hidden achievements.",
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

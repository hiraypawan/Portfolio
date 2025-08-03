import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from '@/components/theme-provider';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pawan Hiray | Tech Builder • AI & Web3 Dev • Digital Leader",
  description: "Full-stack developer specializing in AI, Web3, and growth hacking. Building innovative solutions with modern tech stacks.",
  keywords: "Pawan Hiray, Full Stack Developer, AI Developer, Web3, Blockchain, Growth Hacker, React, Node.js, Python, Automation",
  authors: [{ name: "Pawan Hiray" }],
  creator: "Pawan Hiray",
  openGraph: {
    title: "Pawan Hiray | Tech Builder • AI & Web3 Dev • Digital Leader",
    description: "Full-stack developer specializing in AI, Web3, and growth hacking. Building innovative solutions with modern tech stacks.",
    url: "https://pawanhiray.vercel.app",
    siteName: "Pawan Hiray Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pawan Hiray | Tech Builder • AI & Web3 Dev • Digital Leader",
    description: "Full-stack developer specializing in AI, Web3, and growth hacking. Building innovative solutions with modern tech stacks.",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
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

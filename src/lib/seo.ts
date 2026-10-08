import type { Metadata } from 'next';
import { ownerProfile, siteUrl } from '@/data/ownerProfile';

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const fullTitle = `${title} | ${ownerProfile.identity.fullName} — PawanOS`;
  return {
    title: fullTitle,
    description,
    alternates: { canonical: `${siteUrl}${path}` },
    openGraph: { title: fullTitle, description, url: `${siteUrl}${path}`, type: 'website' },
    twitter: { card: 'summary_large_image', title: fullTitle, description },
  };
}

export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

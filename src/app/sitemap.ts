import type { MetadataRoute } from 'next';
import { ownerProfile, PROFILE_UPDATED, siteUrl } from '@/data/ownerProfile';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...['', '/work', '/about', '/resume', '/contact', '/os'].map((path) => ({
      url: `${siteUrl}${path}`,
      lastModified: new Date(PROFILE_UPDATED),
      changeFrequency: 'monthly' as const,
      priority: path === '' ? 1 : path === '/os' ? 0.5 : 0.8,
    })),
    ...ownerProfile.projects.map((project) => ({
      url: `${siteUrl}/work/${project.id}`,
      lastModified: new Date(PROFILE_UPDATED),
      changeFrequency: 'monthly' as const,
      priority: project.featured ? 0.8 : 0.6,
    })),
  ];
}

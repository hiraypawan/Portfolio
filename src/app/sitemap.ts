import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://pawanhiray.vercel.app',
      lastModified: new Date('2026-10-08'),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://pawanhiray.vercel.app/resume',
      lastModified: new Date('2026-10-08'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
  ];
}

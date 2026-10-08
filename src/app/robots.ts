import type { MetadataRoute } from 'next';
import { siteUrl } from '@/data/ownerProfile';
export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: '*', allow: '/' }], sitemap: `${siteUrl}/sitemap.xml` };
}

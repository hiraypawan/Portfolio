import {
  hasPublicUrl,
  ownerProfile,
  publicMetrics,
  PROFILE_UPDATED,
  siteUrl,
} from '@/data/ownerProfile';

export const dynamic = 'force-static';
export function GET(): Response {
  const lines = [
    `# ${ownerProfile.identity.fullName} — ${ownerProfile.identity.roles[0]}`,
    '',
    `> ${ownerProfile.identity.intro}`,
    `> ${ownerProfile.identity.availability}`,
    '',
    '## Identity',
    `- Name: ${ownerProfile.identity.fullName}`,
    '- Primary role: AI Product Developer (Next.js + AI)',
    `- Location: ${ownerProfile.identity.location} (${ownerProfile.identity.timezone})`,
    `- [Email](mailto:${ownerProfile.conversion.email}): ${ownerProfile.conversion.email}`,
    `- [Portfolio home](${siteUrl}): server-rendered introduction and selected work.`,
    ...ownerProfile.socials
      .filter((social) => !social.url.startsWith('mailto:'))
      .map((social) => `- [${social.network}](${social.url})`),
    '',
    '## Readable pages',
    `- [Work](${siteUrl}/work): all projects, with status and evidence limits.`,
    `- [About](${siteUrl}/about): background, leadership, and working approach.`,
    `- [Resume](${siteUrl}/resume): searchable HTML resume.`,
    `- [One-page PDF](${siteUrl}/Pawan-Hiray-Resume.pdf): downloadable resume.`,
    `- [Contact](${siteUrl}/contact): direct email and editable inquiry brief.`,
    '',
    '## Leadership',
    '- President, MUStudentsUnited: August 2024–March 2026.',
    '- MUStudentsUnited is the only collaboration listed. Other projects are self-initiated, not agency clients.',
    '',
    '## Projects',
    ...ownerProfile.projects.map(
      (project) =>
        `- [${project.name}](${siteUrl}/work/${project.id}): ${project.category}, ${project.dates}; ${project.status}. ${project.intervention} Role: ${project.role}. Outcome: ${project.outcome} [${project.outcomeStatus}]. Stack: ${project.stack.join(', ')}.${hasPublicUrl(project.url) ? ` [Public link](${project.url}).` : ''}${hasPublicUrl(project.repository) ? ` [Source code](${project.repository}).` : ''} Evidence limits: ${project.evidenceNote}`,
    ),
    '',
    '## Public metrics',
    ...publicMetrics().map(
      (metric) =>
        `- ${metric.value} ${metric.label} [${metric.status}; source: ${metric.source}; reviewed: ${metric.lastReviewed}]`,
    ),
    '',
    '## Education',
    ...ownerProfile.resume.education.map(
      (item) => `- ${item.qualification}, ${item.institution}, ${item.date}.`,
    ),
    '',
    '## Evidence and privacy',
    `- ${ownerProfile.legal.metricDisclaimer}`,
    '- Contact prepares a mailto draft; nothing is submitted to a backend.',
    '- Browser settings and sticky notes are local-only. No analytics, testimonials, or calendar integration.',
    `- Content reviewed: ${PROFILE_UPDATED}.`,
    '',
    '## Optional',
    `- [Interactive desktop](${siteUrl}/os): the PawanOS experience; not required to read the portfolio.`,
  ];
  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}

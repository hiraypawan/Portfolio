import { ownerProfile } from '@/data/ownerProfile';

export async function GET(): Promise<Response> {
  const lines = [
    '# Pawan Hiray — llms.txt (for AI assistants)',
    '',
    `> ${ownerProfile.identity.headline}: ${ownerProfile.identity.roles.join(', ')} in ${ownerProfile.identity.location}.`,
    `> ${ownerProfile.identity.intro}`,
    `> ${ownerProfile.identity.availability}.`,
    '',
    '## Identity',
    `- Name: ${ownerProfile.identity.fullName}`,
    `- Location: ${ownerProfile.identity.location} (${ownerProfile.identity.timezone})`,
    `- Email: ${ownerProfile.conversion.email}`,
    `- Phone: ${ownerProfile.conversion.phone}`,
    '- GitHub: https://github.com/hiraypawan',
    `- LinkedIn: ${ownerProfile.socials.find((s) => s.network === 'LinkedIn')?.url}`,
    `- Site: https://${ownerProfile.identity.domain}`,
    `- Resume (human-readable): https://${ownerProfile.identity.domain}/resume`,
    `- Resume (PDF): https://${ownerProfile.identity.domain}/Pawan-Hiray-Resume.pdf`,
    '',
    '## Work history (only collaboration: MUStudentsUnited, President Aug 2024 — Mar 2026)',
    '- No agency clients yet. All other work is self-initiated and labelled founder-reported.',
    '',
    '## Projects',
    ...ownerProfile.projects.map(
      (p) =>
        `- ${p.name} (${p.category}, ${p.dates}, ${p.role}): ${p.intervention} Outcome: ${p.outcome} [${p.outcomeStatus}]. Auth: ${p.auth}. Stack: ${p.stack.join(', ')}. Live: ${p.url}. Repo: ${p.repository}.`,
    ),
    '',
    '## Metrics (with verification status)',
    ...ownerProfile.metrics.map((m) => `- ${m.value} ${m.label} [${m.status}; source: ${m.source}]`),
    '',
    '## Hiring',
    `- ${ownerProfile.identity.availability}. Contact via the site Contact app or email with role, timeline, and stack.`,
    '',
    `## Legal`,
    `- Metric disclaimer: ${ownerProfile.legal.metricDisclaimer}`,
  ];
  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}

export type InquiryKind = 'hiring' | 'project';
export interface ContactBrief {
  kind: InquiryKind;
  name: string;
  email: string;
  build: string;
  budget: string;
  timeline: string;
  message: string;
}

export const EMPTY_BRIEF: ContactBrief = {
  kind: 'hiring',
  name: '',
  email: '',
  build: '',
  budget: '',
  timeline: '',
  message: '',
};

export function briefBody(brief: ContactBrief): string {
  return [
    `Inquiry: ${brief.kind === 'hiring' ? 'Hiring / role' : 'Project / freelance'}`,
    `Name: ${brief.name.trim()}`,
    `Email: ${brief.email.trim()}`,
    `${brief.kind === 'hiring' ? 'Role / team' : 'Desired build'}: ${brief.build.trim() || 'Not specified'}`,
    ...(brief.kind === 'project' ? [`Budget: ${brief.budget.trim() || 'To discuss'}`] : []),
    `Timeline: ${brief.timeline.trim() || 'To discuss'}`,
    '',
    brief.message.trim(),
  ].join('\r\n');
}

export function briefMailto(email: string, brief: ContactBrief): string {
  const subject = `${brief.kind === 'hiring' ? 'Hiring inquiry' : 'Project brief'} — ${brief.build.trim() || 'Pawan Hiray'}`;
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(briefBody(brief))}`;
}

export async function copyText(text: string): Promise<boolean> {
  try {
    if (!navigator.clipboard?.writeText) return false;
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

export type MetricStatus =
  'verified' | 'client-reported' | 'founder-reported' | 'estimated' | 'illustrative' | 'private';
export type ProjectStatus = 'live' | 'local' | 'archived' | 'in-development';

export interface Metric {
  value: string;
  label: string;
  status: MetricStatus;
  source: string;
  public: boolean;
  lastReviewed: string;
}

export interface Project {
  id: string;
  name: string;
  client: string;
  category: string;
  dates: string;
  role: string;
  summary: string;
  problem: string;
  intervention: string;
  outcome: string;
  outcomeStatus: MetricStatus;
  status: ProjectStatus;
  url: string;
  repository: string;
  image: string;
  stack: string[];
  auth: string;
  services: string[];
  featured: boolean;
  evidenceNote: string;
  caseStudy?: {
    contributions: string[];
    architecture: string[];
    decisions: string[];
    validation: string;
  };
}

export const PROFILE_UPDATED = '2026-10-08';

export const ownerProfile = {
  identity: {
    fullName: 'Pawan Hiray',
    shortName: 'Pawan',
    osName: 'PawanOS',
    domain: 'pawanhiray.vercel.app',
    location: 'Mumbai, India',
    timezone: 'Asia/Kolkata',
    roles: ['AI Product Developer', 'Community Leader'],
    headline: 'AI Product Developer.',
    subheadline: 'From an idea to a working product.',
    intro:
      'I design and build web apps, AI integrations, and browser tools with Next.js, TypeScript, and AI-assisted workflows. My focus: useful products, clear decisions, and work you can inspect.',
    availability:
      'Open to junior roles & freelance — Mumbai / Pune / Remote / Hybrid. Ready to relocate.',
  },
  conversion: {
    primaryLabel: 'View my work',
    primaryUrl: '/work',
    secondaryLabel: 'Let’s talk',
    secondaryUrl: '/contact',
    bookingUrl: 'mailto:pawanhiray1@gmail.com?subject=Request%20a%20call%20%E2%80%94%20PawanOS',
    email: 'pawanhiray1@gmail.com',
    phone: '+91-8452065010',
    emergencyLabel: 'Urgent project inquiry — email with [URGENT] in the subject',
  },
  metrics: [
    {
      value: '10K+',
      label: 'Instagram followers in the MUStudentsUnited community',
      status: 'founder-reported',
      source: 'Owner-supplied resume; community leadership, Aug 2024–Mar 2026',
      public: true,
      lastReviewed: PROFILE_UPDATED,
    },
    {
      value: '200–300+',
      label: 'active platform users during peak exam seasons',
      status: 'founder-reported',
      source: 'Owner-supplied resume; no analytics export supplied',
      public: true,
      lastReviewed: PROFILE_UPDATED,
    },
  ] satisfies Metric[],
  projects: [
    {
      id: 'onebrain',
      name: 'OneBrain',
      client: 'Self-initiated',
      category: 'AI life OS',
      dates: '2026',
      role: 'Founder & AI Product Developer',
      summary:
        'A voice-first workspace for capturing thoughts, reviewing them, and keeping them together.',
      problem:
        'Thoughts scatter across apps, while many voice tools upload recordings without an explicit review step.',
      intervention:
        'Voice-first capture with a review step, a local vault, and D1-backed sync. Built with Next.js and Cloudflare Workers.',
      outcome: 'Public deployment at onebrains.pages.dev',
      outcomeStatus: 'founder-reported',
      status: 'live',
      url: 'https://onebrains.pages.dev',
      repository: 'https://github.com/hiraypawan/OneBrain',
      image: '',
      stack: ['Next.js', 'TypeScript', 'Cloudflare Workers', 'D1', 'Voice AI'],
      auth: 'Google OAuth',
      services: ['AI Product Development', 'AI Integration'],
      featured: true,
      evidenceNote:
        'Public code and a deployment are linked. Features are owner-reported; no independent security audit, user count, or performance benchmark is claimed.',
      caseStudy: {
        contributions: [
          'Designed the capture → review → sync workflow.',
          'Built the product using Next.js, TypeScript, and AI-assisted development.',
          'Integrated voice capture, Google OAuth, and Cloudflare-backed persistence.',
        ],
        architecture: [
          'Next.js / TypeScript → capture and review interface',
          'Google OAuth → account access',
          'Cloudflare Workers → API layer',
          'D1 → synchronized data; local vault → on-device storage',
        ],
        decisions: [
          'An explicit review step separates capture from upload.',
          'A local vault and remote sync serve different storage needs.',
          'Google OAuth is the current sign-in path; password login was retired.',
        ],
        validation:
          'Inspect the repository and try the public deployment. Encryption and privacy features are implementation claims, not certification; no load-test results have been supplied.',
      },
    },
    {
      id: 'mustudentsunited',
      name: 'MUStudentsUnited',
      client: 'Student community founded by Jaden Joseph',
      category: 'Student notes platform',
      dates: 'Aug 2024 — Mar 2026',
      role: 'President & Platform Developer',
      summary:
        'A student community and notes platform, built around the needs of Mumbai University students.',
      problem:
        'Study material was fragmented across groups and colleges, with no single workflow for finding and sharing notes.',
      intervention:
        'Led platform workflows, authentication, note uploads, admin approvals, and community adoption with AI-assisted development.',
      outcome:
        '10K+ Instagram followers; 200–300+ active platform users in peak exam seasons (self-reported)',
      outcomeStatus: 'founder-reported',
      status: 'live',
      url: 'https://mumbaistudentsunited.com',
      repository: '#',
      image: '/images/MuStudentPreview.png',
      stack: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT'],
      auth: 'JWT / email login (owner-reported)',
      services: ['AI Product Development', 'Community Leadership'],
      featured: true,
      evidenceNote:
        'The approved screenshot captures a PHP entry point. React/Node/MongoDB is the owner-reported stack; the relationship between deployment versions is not independently verified. Community figures are self-reported, not audited.',
      caseStudy: {
        contributions: [
          'Served as President from August 2024 to March 2026.',
          'Designed authentication, note-upload, and admin-approval workflows.',
          'Oversaw platform UX, feature implementation, and adoption across the student community.',
        ],
        architecture: [
          'Student interface → browse, search, and upload notes',
          'Authentication → student and administrator access',
          'Admin review → approve uploaded material',
          'Community channels → distribute study resources',
        ],
        decisions: [
          'Note uploads include an administrator approval workflow.',
          'The platform and community channels support different parts of the student journey.',
          'Follower counts and active platform users are reported separately.',
        ],
        validation:
          'The supplied screenshot and public site are available to inspect. Source code is not public. Usage figures come from the owner-supplied resume, not an independently reviewed analytics export.',
      },
    },
    {
      id: 'smarty',
      name: 'Smarty',
      client: 'Self-initiated',
      category: 'AI browser extension',
      dates: '2025 — 2026',
      role: 'Founder & Extension Developer',
      summary: 'Gemini-powered browser tools for repetitive research and everyday web tasks.',
      problem:
        'Summarizing pages, collecting information, and filling forms creates repetitive browser work.',
      intervention:
        'Built a Chrome MV3 extension with Gemini-powered summarization, scraping, form-fill, and monitoring features, backed by Supabase.',
      outcome: 'Public product site; owner-reported release v1.0.2',
      outcomeStatus: 'founder-reported',
      status: 'live',
      url: 'https://mysmarty.vercel.app',
      repository: 'https://github.com/hiraypawan/smarty',
      image: '',
      stack: ['TypeScript', 'Chrome MV3', 'Gemini AI', 'Supabase', 'React'],
      auth: 'Supabase — email & Google OAuth',
      services: ['AI Integration', 'Automation'],
      featured: true,
      evidenceNote:
        'Public code and the product site are linked. Feature availability and release version are owner-reported; no time-saved or adoption metric is claimed.',
      caseStudy: {
        contributions: [
          'Built the extension using TypeScript, React, and the Chrome MV3 platform.',
          'Integrated Gemini-powered browser actions.',
          'Connected Supabase account access and backend services.',
        ],
        architecture: [
          'Chrome MV3 → browser extension runtime',
          'React / TypeScript → extension interface',
          'Gemini API → AI features',
          'Supabase → authentication and backend services',
        ],
        decisions: [
          'Browser actions live in an extension rather than a separate web workspace.',
          'AI capabilities and account access use separate services.',
          'Features include summarization, form-fill, scraping, and monitoring; inspect code for implementation details.',
        ],
        validation:
          'Inspect the repository and product site for setup and available features. No browser-permission audit, automated test report, or usage benchmark has been supplied.',
      },
    },
    {
      id: 'digitalworkforce',
      name: 'DigitalWorkForce',
      client: 'Self-initiated',
      category: 'AI micro-task marketplace',
      dates: '2025',
      role: 'Founder & AI Product Developer',
      summary: 'A marketplace exploring AI-assisted task matching and micro-work.',
      problem: 'Talent and companies struggle to match on small pieces of work.',
      intervention:
        'Next.js marketplace with AI task matching, MongoDB, authentication, and Stripe / Razorpay payment integrations.',
      outcome: 'Public deployment at digitalworkforce.vercel.app',
      outcomeStatus: 'founder-reported',
      status: 'live',
      url: 'https://digitalworkforce.vercel.app',
      repository: 'https://github.com/hiraypawan/DigitalWorkForce',
      image: '',
      stack: ['Next.js', 'TypeScript', 'MongoDB', 'JWT', 'Stripe'],
      auth: 'NextAuth / JWT / bcrypt',
      services: ['AI Product Development', 'AI Integration'],
      featured: false,
      evidenceNote:
        'Implementation and deployment are owner-reported. Payment integrations do not imply revenue, paying users, or completed transactions.',
    },
    {
      id: 'vibecoderpro',
      name: 'VibeCoder Pro',
      client: 'Self-initiated',
      category: 'Cloud IDE',
      dates: '2026',
      role: 'Founder & AI Product Developer',
      summary: 'A browser coding workspace with an editor, virtual files, and an AI chat panel.',
      problem:
        'AI coding workflows need an accessible workspace for editing files and managing a session.',
      intervention:
        'Split-pane IDE with Monaco, a virtual file system, AI chat, a Cloudflare Workers API gateway, and MongoDB session telemetry.',
      outcome: 'Public deployment at vibecoderpro.vercel.app',
      outcomeStatus: 'founder-reported',
      status: 'live',
      url: 'https://vibecoderpro.vercel.app',
      repository: 'https://github.com/hiraypawan/vibecoderpro',
      image: '',
      stack: ['Next.js', 'Monaco', 'Cloudflare Workers', 'MongoDB'],
      auth: 'No login',
      services: ['AI Product Development', 'AI Integration'],
      featured: false,
      evidenceNote:
        'A public deployment and source repository are linked. No execution-isolation audit or adoption metric is claimed.',
    },
    {
      id: 'smartbotx',
      name: 'SmartBotX',
      client: 'Self-initiated',
      category: 'AI Telegram bot',
      dates: '2023 — 2024',
      role: 'AI Developer',
      summary: 'An earlier exploration of AI-assisted community engagement inside Telegram.',
      problem: 'Communities needed tools for recurring engagement and content tasks.',
      intervention: 'AI Telegram bot exploring engagement triggers, NLP, and meme generation.',
      outcome: 'Archived / details available on request',
      outcomeStatus: 'founder-reported',
      status: 'archived',
      url: '#',
      repository: '#',
      image: '',
      stack: ['Node.js', 'OpenAI API', 'Telegram API'],
      auth: 'Telegram',
      services: ['AI Integration', 'Automation'],
      featured: false,
      evidenceNote:
        'No public demo, source repository, or independently verified usage figure is supplied.',
    },
    {
      id: 'ytstop',
      name: 'YtStop',
      client: 'Self-initiated',
      category: 'Browser extension',
      dates: '2026',
      role: 'Solo Developer',
      summary: 'A personal-use Chrome MV3 experiment for YouTube playback.',
      problem: 'Ads and ad-block detection can interrupt playback.',
      intervention:
        'Local extension exploring declarativeNetRequest, API interception, and ad detection without runtime dependencies.',
      outcome: 'Owner-reported v3.0.0; local load-unpacked build',
      outcomeStatus: 'founder-reported',
      status: 'local',
      url: '#',
      repository: '#',
      image: '',
      stack: ['JavaScript', 'Chrome MV3', 'declarativeNetRequest'],
      auth: 'Local only',
      services: ['Automation'],
      featured: false,
      evidenceNote:
        'Personal-use local build. No public installation, compatibility guarantee, or effectiveness benchmark is supplied.',
    },
    {
      id: 'handcricket',
      name: 'Hand Cricket Pro',
      client: 'Self-initiated',
      category: 'Web game',
      dates: '2026',
      role: 'Solo Developer',
      summary: 'A lightweight cricket game with bot play, friend matches, and a career mode.',
      problem: 'Casual cricket games should not require a heavy installation.',
      intervention:
        'Mobile-first game with offline bot play, friend matches, and a story career. Cloudflare Pages / KV and a jsdom regression suite.',
      outcome: 'Owner-reported v2.9.0; source available',
      outcomeStatus: 'founder-reported',
      status: 'local',
      url: '#',
      repository: 'https://github.com/hiraypawan/handcricket',
      image: '',
      stack: ['JavaScript', 'Cloudflare Pages', 'Workers KV'],
      auth: 'No login',
      services: ['AI Product Development'],
      featured: false,
      evidenceNote:
        'Source is linked. Release and regression-suite details are owner-reported; no current public deployment is supplied.',
    },
    {
      id: 'peoplepole',
      name: 'PeoplePole',
      client: 'Self-initiated',
      category: 'Civic tech',
      dates: '2026',
      role: 'Founder & AI Product Developer',
      summary: 'An in-development map-based platform for local civic issues.',
      problem: 'Residents struggle to track and coordinate action on neighborhood issues.',
      intervention:
        'Developing a geo-tagged issue map with contribution pooling, local labor coordination, and visual verification.',
      outcome: 'In development; not deployed',
      outcomeStatus: 'founder-reported',
      status: 'in-development',
      url: '#',
      repository: '#',
      image: '',
      stack: ['React', 'Vite', 'Leaflet', 'Express', 'MongoDB', 'JWT'],
      auth: 'JWT / bcrypt (planned local implementation)',
      services: ['AI Product Development'],
      featured: false,
      evidenceNote:
        'Work in progress. No public deployment, repository, usage, or completed-result claim is made.',
    },
  ] satisfies Project[],
  journey: [
    {
      year: '2018',
      title: 'Started exploring software',
      story: 'Explored Kodular, Java, and Android Studio.',
      upgrade: 'Learning by building',
    },
    {
      year: '2022',
      title: 'A first community collaboration',
      story:
        'Started working on the MUStudentsUnited notes platform with the student community team.',
      upgrade: 'Designing around student needs',
    },
    {
      year: '2024–2026',
      title: 'President, MUStudentsUnited',
      story:
        'Served from August 2024 to March 2026, overseeing platform workflows, UX, and community adoption.',
      upgrade: 'Product thinking & community leadership',
    },
    {
      year: '2025–2026',
      title: 'Building AI products',
      story: 'Built self-initiated web products and browser tools with AI-assisted workflows.',
      upgrade: 'Next.js, TypeScript & AI integrations',
    },
    {
      year: 'Now',
      title: 'Looking for the next team',
      story:
        'Open to junior development roles and freelance projects in Mumbai, Pune, remote, or hybrid teams.',
      upgrade: 'Ready to learn, contribute & relocate',
    },
  ],
  achievements: [
    {
      category: 'leadership',
      title: 'MUStudentsUnited President',
      detail: 'August 2024–March 2026. Platform workflows, UX, and community adoption.',
    },
    {
      category: 'public work',
      title: 'Inspectable projects',
      detail:
        'Public deployments and source repositories are linked to the individual project records.',
    },
    {
      category: 'collaboration',
      title: 'Community-first experience',
      detail:
        'MUStudentsUnited is the only collaboration listed. Other projects are self-initiated, not agency client work.',
    },
  ],
  services: [
    {
      name: 'Web product development',
      detail:
        'Product interfaces, authentication, APIs, and deployment using AI-assisted workflows.',
      stack: ['Next.js', 'React', 'TypeScript', 'Node.js', 'MongoDB'],
    },
    {
      name: 'AI integrations',
      detail: 'Voice workflows, AI-powered browser tools, and integrations with model APIs.',
      stack: ['Gemini', 'OpenAI APIs', 'Cloudflare Workers', 'Supabase'],
    },
    {
      name: 'Browser tools & automation',
      detail: 'Chrome MV3 extensions and tools for repetitive web tasks.',
      stack: ['TypeScript', 'Chrome MV3', 'React'],
    },
  ],
  socials: [
    {
      network: 'GitHub',
      handle: 'hiraypawan',
      url: 'https://github.com/hiraypawan',
      purpose: 'Source code & projects',
    },
    {
      network: 'LinkedIn',
      handle: 'pawan-hiray',
      url: 'https://www.linkedin.com/in/pawan-hiray%E2%9C%AA%F0%9F%92%8E-999bb32a6/',
      purpose: 'Professional profile',
    },
    {
      network: 'Email',
      handle: 'pawanhiray1@gmail.com',
      url: 'mailto:pawanhiray1@gmail.com',
      purpose: 'Hiring & project inquiries',
    },
  ],
  resume: {
    headline: 'AI Product Developer — Next.js, TypeScript & AI integrations',
    summary:
      'Computer Engineering background with hands-on, AI-assisted product building and community leadership. Former President of MUStudentsUnited (Aug 2024–Mar 2026). Seeking a junior development role or freelance product work.',
    skills: [
      {
        label: 'Product stack (AI-assisted)',
        text: 'Next.js, React, TypeScript, Node.js, Express, MongoDB, JWT',
      },
      {
        label: 'AI & platforms',
        text: 'Gemini / OpenAI APIs, Cloudflare Workers / D1, Supabase, Chrome MV3',
      },
      {
        label: 'Tools & foundations',
        text: 'Git, Vercel, HTML, CSS, JavaScript fundamentals; continuing to build coding depth',
      },
    ],
    leadership: {
      title: 'President & Platform Developer — MUStudentsUnited',
      dates: 'Aug 2024 — Mar 2026',
      bullets: [
        'Designed authentication, note-upload, and administrator-approval workflows with AI-assisted development.',
        'Oversaw platform UX, feature implementation, and community adoption.',
        'Community: 10K+ Instagram followers; 200–300+ peak-season active users (self-reported).',
      ],
    },
    projectIds: ['onebrain', 'mustudentsunited', 'smarty'],
    education: [
      {
        qualification: 'B.E., Computer Engineering',
        institution: 'B R Harne College of Engineering, Mumbai University',
        date: 'Expected 2026',
      },
      {
        qualification: 'Diploma, Computer Engineering',
        institution: 'S H Jondhale College, MSBTE',
        date: '2022',
      },
    ],
  },
  legal: {
    copyrightOwner: 'Pawan Hiray',
    assetLicenses: ['MuStudentPreview.png — owner-supplied screenshot'],
    metricDisclaimer:
      'Community figures and project implementations are owner-reported, not independently audited. Followers are not platform users. No client revenue, testimonials, or security certifications are implied.',
  },
};

export type OwnerProfile = typeof ownerProfile;
export const siteUrl = `https://${ownerProfile.identity.domain}`;
export const featuredProjects: Project[] = ownerProfile.projects.filter(
  (project) => project.featured,
);
export const resumeProjects: Project[] = ownerProfile.resume.projectIds
  .map((id) => ownerProfile.projects.find((project) => project.id === id)!)
  .filter(Boolean);

export function publicMetrics(metrics: readonly Metric[] = ownerProfile.metrics): Metric[] {
  return metrics.filter(
    (metric) => metric.public && metric.status !== 'private' && metric.status !== 'illustrative',
  );
}

export function hasPublicUrl(url: string): boolean {
  return url.startsWith('https://');
}

export const projectStatusLabels: Record<ProjectStatus, string> = {
  live: 'Public deployment',
  local: 'Local / source available',
  archived: 'Archived',
  'in-development': 'In development',
};

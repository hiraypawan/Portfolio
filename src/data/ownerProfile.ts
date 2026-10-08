export type MetricStatus =
  | 'verified'
  | 'client-reported'
  | 'founder-reported'
  | 'estimated'
  | 'illustrative'
  | 'private';

export interface Metric {
  value: string;
  label: string;
  status: MetricStatus;
  source: string;
  public: boolean;
  lastVerified: string;
}

export interface Project {
  id: string;
  name: string;
  client: string;
  category: string;
  dates: string;
  role: string;
  problem: string;
  intervention: string;
  outcome: string;
  outcomeStatus: MetricStatus;
  url: string;
  repository: string;
  image: string;
  stack: string[];
  services: string[];
  featured: boolean;
}

export const ownerProfile = {
  identity: {
    fullName: 'Pawan Hiray',
    shortName: 'Pawan',
    osName: 'PawanOS',
    domain: 'pawanhiray.vercel.app',
    location: 'Mumbai, India',
    timezone: 'Asia/Kolkata',
    roles: [
      'Tech Builder',
      'Web3 & AI Specialist',
      'Full-Stack Developer',
      'Growth Hacker',
      'Digital Leader',
    ],
    headline: "Hi, I'm Pawan Hiray",
    intro:
      "Multi-skilled developer building automation tools, AI agents, crypto systems, and viral growth tools. 30,000+ students trust my work.",
    portrait: '/images/MuStudentPreview.png',
    sprite: '',
  },
  imageGeneration: {
    mode: 'approved-assets-only',
    provider: '',
    model: '',
    apiKeyEnvironmentVariable: '',
    approvedSourceImages: ['/images/MuStudentPreview.png'],
    likenessNotes:
      'No AI-generated likeness in this build. Uses approved supplied screenshot + icon system only.',
    requiredOutputs: [],
    finalApprovalBy: 'Pawan Hiray',
  },
  conversion: {
    primaryLabel: 'View My Work',
    primaryUrl: '#projects',
    secondaryLabel: 'Contact Me',
    secondaryUrl: '#contact',
    bookingUrl: 'mailto:pawanhiray1@gmail.com?subject=Project%20inquiry%20—%20PawanOS',
    whatsappUrl: '',
    email: 'pawanhiray1@gmail.com',
    emergencyLabel: 'URGENT BUSINESS IMPLEMENTATION — email with [URGENT] in subject',
  },
  metrics: [
    {
      value: '30K+',
      label: 'students served (MuStudentsUnited)',
      status: 'founder-reported',
      source: 'owner portfolio sections/IndexPage + StoryPage',
      public: true,
      lastVerified: '2026-10-08',
    },
    {
      value: '50+',
      label: 'projects built',
      status: 'founder-reported',
      source: 'owner portfolio sections/IndexPage',
      public: true,
      lastVerified: '2026-10-08',
    },
    {
      value: '3+',
      label: 'years experience',
      status: 'founder-reported',
      source: 'owner portfolio sections/IndexPage',
      public: true,
      lastVerified: '2026-10-08',
    },
  ] as Metric[],
  projects: [
    {
      id: 'mustudentsunited',
      name: 'MUStudentsUnited',
      client: 'Self-initiated (Mumbai students)',
      category: 'Academic Platform',
      dates: '2023 — present',
      role: 'Founder & Full-Stack Developer',
      problem: 'Mumbai students lacked one place for notes, forums, and study material.',
      intervention: 'Built academic social platform: note sharing, forums, study materials, auth.',
      outcome: '30,000+ students impacted',
      outcomeStatus: 'founder-reported',
      url: 'https://mumbaistudentsunited.com',
      repository: '#',
      image: '/images/MuStudentPreview.png',
      stack: ['React', 'Node.js', 'MongoDB', 'Express', 'JWT Auth'],
      services: ['Full-Stack Development', 'Product', 'Growth'],
      featured: true,
    },
    {
      id: 'smartbotx',
      name: 'SmartBotX',
      client: 'Self-initiated',
      category: 'AI Telegram Bot',
      dates: '2023 — 2024',
      role: 'AI Developer',
      problem: 'Communities needed automated engagement + viral content.',
      intervention: 'AI Telegram bot with growth triggers, NLP, meme generation.',
      outcome: '5K+ users (founder-reported)',
      outcomeStatus: 'founder-reported',
      url: '#',
      repository: '#',
      image: '',
      stack: ['Node.js', 'OpenAI API', 'Telegram API', 'NLP'],
      services: ['AI Integration', 'Automation'],
      featured: true,
    },
    {
      id: 'cryptotrader-pro',
      name: 'CryptoTrader Pro [PLACEHOLDER — confirm before launch]',
      client: 'TBD',
      category: 'Web3 Trading Platform',
      dates: 'TBD',
      role: 'Web3 Developer',
      problem: '[PLACEHOLDER] Trading analytics + portfolio tooling.',
      intervention: '[PLACEHOLDER] AI analytics, portfolio management concepts.',
      outcome: '[PLACEHOLDER] 1K+ traders — unverified, do not publish as fact',
      outcomeStatus: 'illustrative',
      url: '#',
      repository: '#',
      image: '',
      stack: ['React', 'Web3.js', 'Solidity', 'Python'],
      services: ['Web3', 'AI Integration'],
      featured: false,
    },
    {
      id: 'growthhack-suite',
      name: 'GrowthHack Suite [PLACEHOLDER]',
      client: 'TBD',
      category: 'Marketing Automation',
      dates: 'TBD',
      role: 'Full-Stack Developer',
      problem: '[PLACEHOLDER] SEO, scheduling, viral content tooling.',
      intervention: '[PLACEHOLDER] Analyzer + scheduler + generator concepts.',
      outcome: '[PLACEHOLDER] illustrative only',
      outcomeStatus: 'illustrative',
      url: '#',
      repository: '#',
      image: '',
      stack: ['Python', 'Django', 'Redis', 'Google APIs'],
      services: ['Growth Hacking'],
      featured: false,
    },
    {
      id: 'ai-content-studio',
      name: 'AI Content Studio [PLACEHOLDER]',
      client: 'TBD',
      category: 'Content Generation',
      dates: 'TBD',
      role: 'Full-Stack Developer',
      problem: '[PLACEHOLDER] Articles + social + marketing copy at scale.',
      intervention: '[PLACEHOLDER] Next.js + OpenAI content workflows.',
      outcome: '[PLACEHOLDER] illustrative only',
      outcomeStatus: 'illustrative',
      url: '#',
      repository: '#',
      image: '',
      stack: ['Next.js', 'OpenAI API', 'PostgreSQL', 'Redis'],
      services: ['AI Integration'],
      featured: false,
    },
  ] as Project[],
  clientCases: [
    {
      client: 'Mumbai student community',
      challenge: 'Fragmented study resources across colleges.',
      system: 'MuStudentsUnited platform + forums + notes.',
      metric: '30,000+ students impacted',
      disclosure: 'Founder-reported case outcome',
      narrative: 'Solo-built academic platform serving Mumbai students.',
      image: '/images/MuStudentPreview.png',
      url: 'https://mumbaistudentsunited.com',
    },
  ],
  testimonials: [] as { name: string; role: string; text: string; url: string }[],
  journey: [
    { year: '2018', title: 'The Spark', story: 'Kodular mobile app, then Java + Android Studio.', upgrade: 'Mobile basics' },
    { year: '2020', title: 'Into the Stack', story: 'Self-taught full-stack, UI, security basics, photo/video editing.', upgrade: 'Full-stack foundations' },
    { year: '2021', title: 'Viral Instinct', story: 'Viral ads, Unity + Unreal Engine, crypto + DApps discovery.', upgrade: 'Marketing + game engines' },
    { year: '2022', title: 'Freelance God Mode', story: 'Global clients: sites, apps, funnels. Early AI tinkering pre-ChatGPT.', upgrade: 'Client delivery' },
    { year: '2023', title: 'United We Build', story: 'Launched MuStudentsUnited — 30,000+ students. AI models + automations.', upgrade: 'Scale to 30K users' },
    { year: '2024', title: 'Creator Era', story: 'Helped creators grow (20K+ subs scripting/editing/SEO/ads). Crypto + meme trading.', upgrade: 'Creator growth systems' },
    { year: '2025', title: 'Now & Beyond', story: 'AI, Blockchain, Web3 for real-world gaps. AI/ML in progress.', upgrade: 'AI × Web3' },
  ],
  achievements: [
    { category: 'shipped work', title: 'MuStudentsUnited live', detail: 'Academic platform impacting 30,000+ students.' },
    { category: 'technical milestone', title: '50+ projects built', detail: 'Founder-reported across web, AI, Web3, growth.' },
    { category: 'founder milestone', title: 'Freelance clients worldwide', detail: 'Websites, apps, funnels delivered.' },
  ],
  services: [
    { name: 'Full-Stack & Automation', detail: 'Web, Mobile, SaaS tools, bots, APIs from scratch.', stack: ['React', 'Node.js', 'Python', 'MongoDB', 'AWS', 'Docker'] },
    { name: 'AI + Blockchain Dev', detail: 'AI agents, prompt engineering, crypto dApps, tokens, trading.', stack: ['OpenAI API', 'Solidity', 'Web3.js', 'TensorFlow', 'Ethereum'] },
    { name: 'Growth & Marketing', detail: 'SEO, funnels, ads, Telegram bots, meme virality.', stack: ['Analytics', 'Ads', 'Telegram API', 'SEO', 'A/B Testing'] },
    { name: 'Game & Media', detail: 'Unity, UE5, Blender, video editing, thumbnails.', stack: ['Unity 3D', 'UE5', 'Blender', 'After Effects', 'Premiere Pro'] },
  ],
  videos: [] as { title: string; url: string; topic: string }[],
  music: [] as { title: string; artist: string; url: string }[],
  socials: [
    { network: 'GitHub', handle: 'hiraypawan', url: 'https://github.com/hiraypawan', purpose: 'Code + projects', status: 'active' },
    { network: 'LinkedIn', handle: 'pawanhiray', url: 'https://linkedin.com/in/pawanhiray', purpose: 'Professional', status: 'active' },
    { network: 'Email', handle: 'pawanhiray1@gmail.com', url: 'mailto:pawanhiray1@gmail.com', purpose: 'Contact + booking', status: 'active' },
    { network: 'Website', handle: 'pawanhiray.vercel.app', url: 'https://pawanhiray.vercel.app', purpose: 'Canonical domain', status: 'active' },
  ],
  articles: [
    { title: 'How I scaled MuStudentsUnited to 30,000+ students [DRAFT]', description: 'Solo playbook: notes, forums, SEO, Telegram loops.', url: '/notes/scaling-mustudentsunited', date: '2026-10-08' },
    { title: 'AI Telegram bots that drive growth [DRAFT]', description: 'SmartBotX triggers, NLP, meme pipelines.', url: '/notes/ai-telegram-bots', date: '2026-10-08' },
  ],
  themes: {
    direction: 'minimal workstation, premium dark-first, grotesk display',
    primary: '#7c6cff',
    accent: '#22d3ee',
    neutral: '#0b0b12',
  },
  legal: {
    copyrightOwner: 'Pawan Hiray',
    assetLicenses: ['MuStudentPreview.png — owner-supplied screenshot'],
    metricDisclaimer: 'Founder-reported metrics are estimates from owner records, not audited results.',
  },
};

export type OwnerProfile = typeof ownerProfile;

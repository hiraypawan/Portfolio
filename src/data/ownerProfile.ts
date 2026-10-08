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
  auth: string;
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
      'AI Product Developer',
      'AI Application Builder',
      'Community Leader',
      'Product Thinker',
      'Tech Generalist',
    ],
    headline: "Hi, I'm Pawan Hiray",
    intro:
      "Fresher AI Product Developer (Next.js + AI) — I design and ship real products with AI-assisted workflows. Former President of the 10,000+ MUStudentsUnited student community (Aug 2024 — Mar 2026).",
    portrait: '/images/MuStudentPreview.png',
    sprite: '',
    availability: 'Open to work — Freelance · Remote · Hybrid · Ready to relocate',
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
    phone: '+91-8452065010',
    emergencyLabel: 'URGENT BUSINESS IMPLEMENTATION — email with [URGENT] in subject',
  },
  metrics: [
    {
      value: '10K+',
      label: 'Instagram followers + 200–300 active users in peak season (MUStudentsUnited)',
      status: 'founder-reported',
      source: 'owner resume (Final PDF)',
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
      client: 'MuStudentsUnited student community (founded by Jaden Joseph)',
      category: 'Academic Platform',
      dates: 'Aug 2024 — Mar 2026',
      role: 'President & Platform Developer',
      problem: 'Mumbai University students had no single place for notes, forums, and study material.',
      intervention: 'Led the community platform: designed workflows, auth, note uploads, admin approvals (AI-assisted build). Community cites 12.5K Instagram + 7K WhatsApp (Jaden Joseph, May 2024).',
      outcome: '10,000+ followers; 200–300+ active users in peak exam season',
      outcomeStatus: 'founder-reported',
      url: 'https://mumbaistudentsunited.com',
      repository: '#',
      image: '/images/MuStudentPreview.png',
      stack: ['React', 'Node.js', 'MongoDB', 'Express', 'JWT Auth'],
      auth: 'JWT (email login)',
      services: ['AI Product Development', 'Product', 'Growth'],
      featured: true,
    },
    {
      id: 'onebrain',
      name: 'OneBrain',
      client: 'Self-initiated',
      category: 'AI Life OS',
      dates: '2026',
      role: 'Founder & AI Product Developer',
      problem: 'Thoughts scatter across apps, and voice tools upload everything silently.',
      intervention: 'Voice-first capture with an explicit review step, encrypted local vault, D1-backed sync. Next.js + Cloudflare Workers.',
      outcome: 'Live at onebrains.pages.dev',
      outcomeStatus: 'founder-reported',
      url: 'https://onebrains.pages.dev',
      repository: 'https://github.com/hiraypawan/OneBrain',
      image: '',
      stack: ['Next.js', 'TypeScript', 'Cloudflare Workers', 'D1', 'Voice AI'],
      auth: 'Google OAuth (password login retired)',
      services: ['AI Integration', 'AI Product Development'],
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
      outcome: 'Serving communities (founder-reported, unverified count removed)',
      outcomeStatus: 'founder-reported',
      url: '#',
      repository: '#',
      image: '',
      stack: ['Node.js', 'OpenAI API', 'Telegram API', 'NLP'],
      auth: 'None — runs inside Telegram',
      services: ['AI Integration', 'Automation'],
      featured: false,
    },
    {
      id: 'smarty',
      name: 'Smarty',
      client: 'Self-initiated',
      category: 'AI Browser Extension',
      dates: '2025 — 2026',
      role: 'Founder & Extension Developer',
      problem: 'Repetitive browser work eats hours; most automation tools are dumb.',
      intervention: 'Gemini-powered MV3 extension: summarizer, scraper, form-fill, lead-gen, price monitor. Supabase backend, freemium SaaS.',
      outcome: 'Live v1.0.2 at mysmarty.vercel.app',
      outcomeStatus: 'founder-reported',
      url: 'https://mysmarty.vercel.app',
      repository: 'https://github.com/hiraypawan/smarty',
      image: '',
      stack: ['TypeScript', 'Chrome MV3', 'Gemini AI', 'Supabase', 'React'],
      auth: 'Supabase — email + Google OAuth',
      services: ['AI Integration', 'Automation'],
      featured: true,
    },
    {
      id: 'digitalworkforce',
      name: 'DigitalWorkForce',
      client: 'Self-initiated',
      category: 'AI Micro-task Marketplace',
      dates: '2025',
      role: 'Founder & AI Product Developer',
      problem: 'Talent and companies mismatch on micro-work; earnings leak to middlemen.',
      intervention: 'Next.js 14 marketplace: AI task matching, JWT auth, MongoDB, Stripe + Razorpay payments.',
      outcome: 'Live at digitalworkforce.vercel.app',
      outcomeStatus: 'founder-reported',
      url: 'https://digitalworkforce.vercel.app',
      repository: 'https://github.com/hiraypawan/DigitalWorkForce',
      image: '',
      stack: ['Next.js 14', 'TypeScript', 'MongoDB', 'JWT', 'Stripe'],
      auth: 'NextAuth + JWT + bcrypt (MongoDB)',
      services: ['AI Product Development', 'AI Integration'],
      featured: false,
    },
    {
      id: 'vibecoderpro',
      name: 'VibeCoder Pro',
      client: 'Self-initiated',
      category: 'Cloud IDE',
      dates: '2026',
      role: 'Founder & AI Product Developer',
      problem: 'AI coding agents need a real browser workspace with session telemetry.',
      intervention: 'Split-pane cloud IDE: Monaco editor, virtual file system, AI chat panel. Cloudflare Workers API gateway, MongoDB telemetry.',
      outcome: 'Live at vibecoderpro.vercel.app',
      outcomeStatus: 'founder-reported',
      url: 'https://vibecoderpro.vercel.app',
      repository: 'https://github.com/hiraypawan/vibecoderpro',
      image: '',
      stack: ['Next.js', 'Monaco', 'Cloudflare Workers', 'MongoDB'],
      auth: 'None — no login',
      services: ['AI Product Development', 'AI Integration'],
      featured: false,
    },
    {
      id: 'ytstop',
      name: 'YtStop',
      client: 'Self-initiated',
      category: 'Browser Extension',
      dates: '2026',
      role: 'Solo Developer',
      problem: 'YouTube ads plus aggressive adblock detection ruin playback.',
      intervention: 'MV3 extension: 6-layer neutralizer (declarativeNetRequest, API interception, SSAI detection, stealth proxies). Zero dependencies.',
      outcome: 'Shipped v3.0.0, load-unpacked (personal use)',
      outcomeStatus: 'founder-reported',
      url: '#',
      repository: '#',
      image: '',
      stack: ['JavaScript', 'Chrome MV3', 'declarativeNetRequest'],
      auth: 'None — local only',
      services: ['Automation'],
      featured: false,
    },
    {
      id: 'handcricket',
      name: 'Hand Cricket Pro',
      client: 'Self-initiated',
      category: 'Web Game',
      dates: '2026',
      role: 'Solo Developer',
      problem: 'Cricket games are heavy installs; casual play should have zero friction.',
      intervention: 'Mobile-first static game: offline bot, quick match, online friend play, 8-tier story career. Cloudflare Pages + KV, jsdom regression suite.',
      outcome: 'Shipped v2.9.0 with regression suite (repo-reported)',
      outcomeStatus: 'founder-reported',
      url: '#',
      repository: 'https://github.com/hiraypawan/handcricket',
      image: '',
      stack: ['JavaScript', 'Cloudflare Pages', 'Workers KV'],
      auth: 'None — no login',
      services: ['AI Product Development'],
      featured: false,
    },
    {
      id: 'peoplepole',
      name: 'PeoplePole',
      client: 'Self-initiated',
      category: 'Civic Tech Platform',
      dates: '2026',
      role: 'Founder & AI Product Developer',
      problem: 'Civic complaints vanish into municipal queues; residents cannot fix their own street.',
      intervention: 'Geo-tagged issue map with micro-contribution pooling, local labor hiring, visual verification. React + Vite + Leaflet client, Express + MongoDB server.',
      outcome: 'In development on this PC (not deployed)',
      outcomeStatus: 'founder-reported',
      url: '#',
      repository: '#',
      image: '',
      stack: ['React 19', 'Vite', 'Leaflet', 'Express', 'MongoDB', 'JWT'],
      auth: 'JWT + bcrypt (email login)',
      services: ['AI Product Development'],
      featured: false,
    },
  ] as Project[],
  clientCases: [
    {
      client: 'MuStudentsUnited community (founder: Jaden Joseph; Pawan: President)',
      challenge: 'Fragmented study resources across Mumbai University colleges.',
      system: 'Student notes platform + uploads + auth, led as President.',
      metric: '10K+ followers; 200–300+ active users in peak season',
      disclosure: 'Self-reported (owner resume); community cites 12.5K IG + 7K WhatsApp (Jaden Joseph, May 2024)',
      narrative: 'Former President (Aug 2024 — Mar 2026) of the student community; oversaw platform UX, features, and adoption.',
      image: '/images/MuStudentPreview.png',
      url: 'https://mumbaistudentsunited.com',
    },
    {
      client: 'Self-initiated product',
      challenge: 'Thoughts scatter across apps; voice tools upload everything silently.',
      system: 'OneBrain: voice-first capture with review step, encrypted vault, D1 sync.',
      metric: 'Live in production at onebrains.pages.dev',
      disclosure: 'Founder-reported case outcome',
      narrative: 'Solo-built AI life OS: Next.js + Cloudflare Workers + voice.',
      image: '',
      url: 'https://onebrains.pages.dev',
    },
  ],
  testimonials: [] as { name: string; role: string; text: string; url: string }[],
  journey: [
    { year: '2018', title: 'The Spark', story: 'Kodular mobile app, then Java + Android Studio.', upgrade: 'Mobile basics' },
    { year: '2020', title: 'Into the Build', story: 'Self-taught web fundamentals, UI, security basics, photo/video editing.', upgrade: 'Web + AI foundations' },
    { year: '2021', title: 'Viral Instinct', story: 'Viral ads, Unity + Unreal Engine, crypto + DApps discovery.', upgrade: 'Marketing + game engines' },
    { year: '2022', title: 'First Collaboration', story: 'Started building the MuStudentsUnited notes platform with the student community team — my first real users.', upgrade: 'Shipping for real users' },
    { year: '2023', title: 'United We Build', story: 'Became President of MUStudentsUnited — grew it to 10,000+ followers, built the notes platform.', upgrade: 'Leading 10K humans' },
    { year: '2024', title: 'Creator Era', story: 'Helped creators with scripting, editing, SEO, and ad strategy. Traded crypto personally.', upgrade: 'Creator growth systems' },
    { year: '2025', title: 'Now & Beyond', story: 'Building with AI, Blockchain, and Web3. Learning AI/ML, still shipping.', upgrade: 'AI × Web3' },
    { year: '2026', title: 'Stepping Out', story: 'Left MUStudentsUnited in March 2026 after 10K+ followers. Now seeking fresher developer roles — freelance, remote, hybrid, or relocate.', upgrade: 'Open to work' },
  ],
  achievements: [
    { category: 'shipped work', title: 'MUStudentsUnited President', detail: 'Led 10K+ community (Aug 2024 — Mar 2026); oversaw notes platform, UX, and adoption.' },
    { category: 'technical milestone', title: '50+ projects built', detail: 'Founder-reported across web, AI, Web3, growth.' },
    { category: 'founder milestone', title: 'Community collaborator', detail: 'Only collaboration so far: MuStudentsUnited. No agency clients yet — stated plainly.' },
  ],
  services: [
    { name: 'AI-Built Apps & Automation', detail: 'Web, Mobile, SaaS tools, bots, APIs — designed by me, built with AI-assisted workflows.', stack: ['React', 'Node.js', 'Python', 'MongoDB', 'AWS', 'Docker'] },
    { name: 'AI + Blockchain Dev', detail: 'AI agents, prompt engineering, crypto dApps, tokens, trading.', stack: ['OpenAI API', 'Solidity', 'Web3.js', 'TensorFlow', 'Ethereum'] },
    { name: 'Growth & Marketing', detail: 'SEO, funnels, ads, Telegram bots, meme virality.', stack: ['Analytics', 'Ads', 'Telegram API', 'SEO', 'A/B Testing'] },
    { name: 'Game & Media', detail: 'Unity, UE5, Blender, video editing, thumbnails.', stack: ['Unity 3D', 'UE5', 'Blender', 'After Effects', 'Premiere Pro'] },
  ],
  videos: [] as { title: string; url: string; topic: string }[],
  music: [] as { title: string; artist: string; url: string }[],
  socials: [
    { network: 'GitHub', handle: 'hiraypawan', url: 'https://github.com/hiraypawan', purpose: 'Code + projects', status: 'active' },
    { network: 'LinkedIn', handle: 'pawan-hiray', url: 'https://www.linkedin.com/in/pawan-hiray%E2%9C%AA%F0%9F%92%8E-999bb32a6/', purpose: 'Professional', status: 'active' },
    { network: 'Email', handle: 'pawanhiray1@gmail.com', url: 'mailto:pawanhiray1@gmail.com', purpose: 'Contact + booking', status: 'active' },
    { network: 'Website', handle: 'pawanhiray.vercel.app', url: 'https://pawanhiray.vercel.app', purpose: 'Canonical domain', status: 'active' },
  ],
  articles: [
    { title: 'How we grew MUStudentsUnited to 10,000+ followers [DRAFT]', description: 'Community playbook: notes, WhatsApp loops, college adoption.', url: '/notes/scaling-mustudentsunited', date: '2026-10-08' },
    { title: 'AI Telegram bots that drive growth [DRAFT]', description: 'SmartBotX triggers, NLP, meme pipelines.', url: '/notes/ai-telegram-bots', date: '2026-10-08' },
  ],
  themes: {
    direction: 'modern desktop OS hybrid (macOS dock + Windows controls + touch-first); glass tiles, one Lucide glyph family',
    primary: '#7c6cff',
    accent: '#22d3ee',
    neutral: '#0b0b12',
    wallpaper: 'aurora mesh per theme (Day/Night/Dark); portrait recomposition on phones; auto default from visitor local hour',
    companion: 'removed per owner 2026-10-08 — no mascot, no booking pings',
  },
  legal: {
    copyrightOwner: 'Pawan Hiray',
    assetLicenses: ['MuStudentPreview.png — owner-supplied screenshot'],
    metricDisclaimer: 'Founder-reported metrics are estimates from owner records, not audited results.',
  },
};

export type OwnerProfile = typeof ownerProfile;

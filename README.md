# Pawan Hiray — PawanOS

**AI Product Developer (Next.js + AI) who ships real products with AI-assisted workflows.**
Former President, MUStudentsUnited (10,000+ student community). Open to fresher roles — Mumbai / Pune / Remote / Hybrid — and freelance. Ready to relocate.

🌐 **Live:** https://pawanhiray.vercel.app · 📄 **ATS resume:** https://pawanhiray.vercel.app/resume · 🤖 **AI-readable:** https://pawanhiray.vercel.app/llms.txt

PawanOS is a personal operating system, not a landing page. Visitors explore the work through
applications: Projects, Results, Systems, Journey, Contact, Case Files, a whiteboard, PawanNet
bookmarks, and Settings they can customize (accent, wallpaper, sounds, haptics, motion — stored
only in their browser).

## Top 3 projects (Problem → Tech → Link → Result)

| # | Project | Problem | Tech | Live | Code | Result |
|---|---------|---------|------|------|------|--------|
| 1 | **OneBrain** — AI life OS | Thoughts scatter; voice tools upload everything silently | Next.js, TypeScript, Cloudflare Workers, D1, Voice AI (Google OAuth) | [onebrains.pages.dev](https://onebrains.pages.dev) | [GitHub](https://github.com/hiraypawan/OneBrain) | Live in production |
| 2 | **MUStudentsUnited** — student notes platform | No single place for Mumbai University study material | React, Node.js, MongoDB, Express, JWT | [mumbaistudentsunited.com](https://mumbaistudentsunited.com) | — | 10K+ followers; 200–300+ active users peak (self-reported) |
| 3 | **Smarty** — AI browser extension | Repetitive browser work eats hours | TypeScript, Chrome MV3, Gemini AI, Supabase, React | [mysmarty.vercel.app](https://mysmarty.vercel.app) | [GitHub](https://github.com/hiraypawan/smarty) | Live v1.0.2 |

More in the OS and on [/resume](https://pawanhiray.vercel.app/resume): DigitalWorkForce (marketplace),
VibeCoder Pro (cloud IDE), YtStop (MV3 ad neutralizer), Hand Cricket Pro (web game), PeoplePole
(civic tech, in development). Every metric carries a verification label — no fake clients, no
invented testimonials. The only collaboration so far is MUStudentsUnited.

## Stack I ship with (AI-assisted)

Next.js (App Router) · React · TypeScript · Node.js · Express · MongoDB · JWT/NextAuth ·
Tailwind CSS v4 · Framer Motion · Cloudflare Workers/D1 · Supabase · Chrome MV3 · Git · Vercel

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (tsc + eslint included)
```

Deploys automatically to Vercel from `main`.

## Project structure

```
src/
  app/            # /, /resume (ATS one-pager), /llms.txt, /sitemap.xml, /robots.txt, opengraph-image
  components/os/  # PersonalOS shell, Window manager, apps (Projects, Results, Contact, …)
  data/           # ownerProfile.ts — every number carries a verification status
  lib/            # utils, feedback (synth sounds + haptics, no audio files)
public/           # Pawan-Hiray-Resume.pdf, images, sounds
```

## License

MIT — see [LICENSE](LICENSE).

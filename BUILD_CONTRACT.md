# BUILD CONTRACT — PawanOS v1.1

Owner: Pawan Hiray. Canonical domain: pawanhiray.vercel.app. Reviewed 2026-10-08.

## Approved direction

The user approved the portfolio audit and implementation, with particular emphasis on crawlable server-rendered content and **Work · About · Resume · Contact** navigation.

- `/` is the immediate, server-rendered reading view; `/os` retains the optional PawanOS desktop.
- Work, About, resume, contact, and nine project cases are directly accessible without JavaScript.
- The OS cannot cover or gate the default portfolio behind a boot animation.
- Primary conversion: inspect work → contact about a role or project. A call CTA means an email request, not a calendar booking.

## Content and proof

Single content source: `src/data/ownerProfile.ts`; one-page PDF and HTML resume use it together. See `CONTENT_LEDGER.md` for exact evidence limits.

No invented clients, testimonials, revenue, certifications, benchmark results, or stronger employment/degree claims. Community followers and platform users remain separate, labeled self-reported. Unsupported lifetime totals are removed.

## Desktop and assets

Keep Work/Projects, Results, Systems, Proof, About/Journey, Achievements, Socials, Contact, Emergency, Founder.txt, Whiteboard, PawanNet, Case Files, Field Notes, and Settings. Primary apps are separate from secondary utilities.

- One Lucide glyph family; no generated avatar, mascot, or booking ping.
- Protected screenshot and legacy MP3 remain byte-identical.
- Day/Night/Dark wallpapers; auto follows visitor local hour. Preferences are consolidated into one validated storage system.
- Minimize keeps app state. Every open window is recoverable from the dock.
- Desktop and phone sheets share the 768px breakpoint; usable on short screens, with ≥44px controls and visible keyboard focus.
- Device reduced-motion preference wins. No ambient animations or repeating live-region announcements.
- Sounds and haptics are optional and off by default.

## Integrations and privacy

No analytics, calendar embed, contact backend, or secrets. Contact uses correctly encoded email drafts with a copyable fallback. Settings and whiteboard notes stay local; preference reset does not erase notes.

## Quality and deployment

Next.js 16 / React 19 / Tailwind 4. Node 22. Self-hosted existing font families. Lint, TypeScript, unit tests, production build, production dependency audit, PDF validation, and Playwright/axe regressions are required.

Changes ship through pull requests into `main`, with quality checks before merge. GitHub-to-Vercel deployment is an existing integration; verify status before claiming a live deployment.

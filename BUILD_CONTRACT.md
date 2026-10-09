# BUILD CONTRACT — PawanOS v2.0

Owner: Pawan Hiray. Canonical domain: pawanhiray.vercel.app. Reviewed 2026-10-09.

## Approved direction

The portfolio is an operating-system experience first, with crawlable content and direct **Work · About · Resume · Contact** routes.

- `/` is PawanOS. `/os` remains a compatible shareable route to the same experience.
- On desktop, the shell combines a macOS-style menu/window language with a Windows-style workspace and taskbar. On phones, it becomes a touch-native iOS/Android-inspired home screen and bottom-sheet app model.
- Work, About, resume, contact, and nine project cases remain directly accessible without JavaScript.
- A complete no-JavaScript fallback is rendered in the initial HTML, so the OS does not gate project access, crawling, or accessibility.
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
- Desktop windows and phone sheets share the 768px breakpoint; the home screen, app library, menu/status bar, dock, and every window remain usable on short screens, with ≥44px controls and visible keyboard focus.
- Device reduced-motion preference wins. No ambient animations or repeating live-region announcements.
- Sounds and haptics are optional and off by default.

## Integrations and privacy

No analytics, calendar embed, contact backend, or secrets. Contact uses correctly encoded email drafts with a copyable fallback. Settings and whiteboard notes stay local; preference reset does not erase notes.

## Quality and deployment

Next.js 16 / React 19 / Tailwind 4. Node 22. Self-hosted existing font families. Lint, TypeScript, unit tests, production build, production dependency audit, PDF validation, and Playwright/axe regressions are required.

Changes ship through pull requests into `main`, with quality checks before merge. GitHub-to-Vercel deployment is an existing integration; verify status before claiming a live deployment.

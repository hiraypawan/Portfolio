# Pawan Hiray — PawanOS

**AI Product Developer: Next.js, TypeScript, and AI integrations.**

An operating-system portfolio with a desktop workspace and a touch-native mobile home screen. PawanOS is the homepage; project cases, About, resume, and direct contact routes remain server-rendered and usable without JavaScript.

- **PawanOS:** https://pawanhiray.vercel.app
- **Work:** https://pawanhiray.vercel.app/work
- **Resume:** https://pawanhiray.vercel.app/resume
- **Compatibility route:** https://pawanhiray.vercel.app/os
- **AI-readable:** https://pawanhiray.vercel.app/llms.txt

## Selected work

| Project          | Context                                         | Evidence                                                                                                                                         |
| ---------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| OneBrain         | Self-initiated voice-first AI life OS           | [Case](https://pawanhiray.vercel.app/work/onebrain), [deployment](https://onebrains.pages.dev), [source](https://github.com/hiraypawan/OneBrain) |
| MUStudentsUnited | Student community; President, Aug 2024–Mar 2026 | [Case](https://pawanhiray.vercel.app/work/mustudentsunited), [site](https://mumbaistudentsunited.com), owner-supplied screenshot                 |
| Smarty           | Self-initiated AI browser extension             | [Case](https://pawanhiray.vercel.app/work/smarty), [product site](https://mysmarty.vercel.app), [source](https://github.com/hiraypawan/smarty)   |

Public deployments, local builds, archived work, and in-development projects are labeled separately. Project descriptions and community metrics are owner-reported, not independently audited. Instagram followers are not platform users. No agency clients, revenue, testimonials, or security certifications are invented.

## Stack

Next.js 16 App Router · React 19 · TypeScript · Tailwind CSS 4 · Lucide · Framer Motion (desktop interactions only). Space Grotesk and Fira Code are self-hosted through Fontsource under the OFL license; builds do not fetch Google Fonts.

## Run locally

Use Node 22 (see `.nvmrc`).

```bash
npm ci
npm run dev       # 0.0.0.0:3000
npm run check     # ESLint, TypeScript, unit tests
npm run build
npm run start     # production server, 0.0.0.0:3000
```

The preview host `*.e2b.app` is permitted for development. Browser-facing links and assets use relative URLs. No backend or environment secrets are required.

## Browser regression tests

```bash
npx playwright install --with-deps chromium
npm run build
npm run test:e2e
```

Playwright checks raw server HTML, no-JavaScript navigation, route metadata, sitemap, social image, PDF, accessibility, responsive widths, contact encoding, window restoration, keyboard search, phone sheets, storage failures, and reduced motion. `PLAYWRIGHT_BASE_URL` can point at an already-running local server; `PLAYWRIGHT_CHROMIUM_EXECUTABLE` supports a separately supplied Chromium binary.

GitHub Actions runs the production build, checks, PDF validation, production dependency audit, and browser suite.

## Resume: one source, two formats

Identity, role, education, leadership, and the three selected projects live in `src/data/ownerProfile.ts`. Both `/resume` and the PDF generator consume that data.

```bash
python3 -m venv .venv
.venv/bin/pip install -r scripts/requirements-pdf.txt
PATH="$PWD/.venv/bin:$PATH" npm run resume:pdf
PATH="$PWD/.venv/bin:$PATH" npm run check:pdf
```

The generator refuses to replace the PDF if it spans more than one A4 page. Validation checks searchable text, project names, canonical links, and PDF author metadata. Degree completion remains **Expected 2026**, as in the supplied resume; it is not changed to a confirmed graduation without owner confirmation.

## PawanOS behavior and privacy

- All 15 OS apps remain available; primary work is separate from the App Library utilities.
- Desktop uses menu-bar, window, workspace, and dock conventions; mobile switches to status chrome, a four-column launcher, bottom dock, and full-width sheets.
- Minimized windows stay mounted, preserving unsent Contact drafts and app state.
- Phone sheets use the same 768px breakpoint as the desktop shell, with focus confinement and swipe-down minimization.
- Search has unique result identities, arrow-key selection, focus restoration, and Escape isolation.
- Settings and notes are validated before persistence and migrate from the previous keys.
- Reset preferences keeps whiteboard notes; clearing notes requires separate confirmation.
- Sounds and haptics are off by default. Device reduced-motion preferences take priority.
- Contact prepares a mailto draft, not a server submission. A copyable fallback remains available.
- No analytics, calendar embed, external contact service, generated likeness, or automatic booking is added.

## Security and content limits

See [QUALITY_REPORT.md](QUALITY_REPORT.md) for validation and [CONTENT_LEDGER.md](CONTENT_LEDGER.md) for evidence limits and owner-confirmation items. The production dependency audit is clean. A dev-only `braces` advisory remains in the upstream Next.js ESLint globbing chain; no patched release is available, and forcing npm's proposed downgrade would mismatch the framework.

`public/images/MuStudentPreview.png` and the legacy `public/sounds/page-flip.mp3` are preserved byte-for-byte. The legacy audio file is not loaded by the new interface.

## Structure

```text
src/app/                  PawanOS home, reading routes, metadata, and compatibility /os route
src/components/portfolio/ Shared semantic content, project evidence, contact & print islands
src/components/os/        Responsive OS shell, fallback, windows, focus hooks, and lazy-loaded apps
src/data/ownerProfile.ts  Approved public content and shared resume data
src/lib/                  Pure window state, contact encoding, storage validation, SEO
scripts/                  Deterministic one-page PDF export and validation
tests/unit/              Pure-state and content invariant tests
tests/e2e/               Playwright + axe browser regressions
```

GitHub `main` is the documented Vercel deployment source. A merge triggers that configured integration; a successful merge alone is not proof that deployment has completed.

MIT — see [LICENSE](LICENSE).

# Portfolio quality report

Validated: **2026-10-08** against a local production build. This is a reproducible engineering report, not a claim of independent project verification, complete WCAG certification, search ranking, or production deployment success.

## Implemented

- `/` is a server-component portfolio page. Its initial response includes the actual hero, three selected projects, resume/contact links, and social metadata—not just an OS boot shell or serialized client data.
- Primary navigation is **Work · About · Resume · Contact**. The interactive PawanOS is optional at `/os`; all 15 apps remain available.
- Work, About, Contact, HTML resume, and nine shareable case pages are prerendered. Unknown project slugs return 404.
- Profile content, evidence-qualified metrics, case data, and resume exports share `src/data/ownerProfile.ts`.
- Contact explicitly prepares an editable email draft rather than claiming server delivery. Clipboard failures have an honest fallback; hiring inquiries omit budget.
- Minimized apps preserve drafts. Settings/notes have validated migration and initialization guards; preferences reset preserves notes. Phone sheets, bounded windows, focus confinement, keyboard search, and reduced motion are covered by regressions.
- Canonicals, sitemap, robots, JSON-LD, social image, and linked Markdown `llms.txt` are present. Fonts are self-hosted; obsolete book/theme/helper modules and unused dependencies are removed.
- The supplied screenshot and legacy sound are byte-identical to the baseline. No analytics, contact backend, calendar, fabricated proof, or generated likeness is introduced.

## Validation results

| Check                       | Result                                                                                     |
| --------------------------- | ------------------------------------------------------------------------------------------ |
| Formatting                  | `npm run format:check` passes                                                              |
| ESLint                      | 0 errors, 0 warnings                                                                       |
| TypeScript                  | Strict typecheck passes                                                                    |
| Unit tests                  | 17/17 pass                                                                                 |
| Playwright production tests | 21/21 pass                                                                                 |
| Accessibility               | Eight axe scans, WCAG 2/2.1/2.2 A and AA tags; no violations in tested states              |
| Production build            | Next.js 16.4 build passes; 22 generated pages, including nine cases                        |
| Production dependency audit | 0 reported vulnerabilities                                                                 |
| Downloaded PDF              | One A4 page; searchable text; 14 clickable links; synchronized content and author metadata |
| HTML print                  | Chromium print-to-PDF produces one A4 page                                                 |
| Protected assets            | SHA-256 hashes match baseline                                                              |

### Browser coverage

- Raw HTTP response—including a social-bot user agent—contains meaningful hero/project content and preview metadata.
- JavaScript-disabled navigation through home, Work, OneBrain, resume, and Contact; readable `/os` fallback.
- Canonicals, sitemap case entries, Markdown AI index links, social image response, PDF response, and unknown-case 404.
- Responsive checks on home, Work, About, resume, Contact, and **all nine cases** at 320, 390, 640, 768, and 1024px: 70 route/viewport combinations, with fonts loaded before checking overflow.
- axe scans on `/`, `/work`, `/about`, `/resume`, `/contact`, `/work/onebrain`, a phone Contact sheet, and the day-wallpaper desktop.
- Contact brief encoding, minimized draft retention, clipboard rejection, search arrows/Enter/Tab, Escape isolation, persistent notes, preference reset, invalid/blocked storage, phone sheet bounds/focus, resize bounds, swipe minimization, reduced motion, and hydration warnings.

Narrow-width failures found during validation were corrected at their source: mobile navigation padding, long case-heading typography, and unbroken evidence URLs. Horizontal overflow is not concealed with a global clipping rule. Visible link labels now participate in their accessible names; case controls identify their project.

## Local Lighthouse results

**Lighthouse 13.5.0**, Chromium 153, production `next start`, fresh browser sessions, default simulated mobile throttling and the desktop preset. These are local laboratory measurements; the origin and optimized-image cache were warm. No field INP/Core Web Vitals or production-network measurement is claimed.

| Metric                          | Mobile | Desktop |
| ------------------------------- | ------ | ------- |
| Performance                     | 97     | 100     |
| Accessibility                   | 100    | 100     |
| Best practices                  | 100    | 100     |
| SEO                             | 100    | 100     |
| Agentic browsing (experimental) | 100    | 100     |
| First contentful paint          | 1.37 s | 0.34 s  |
| Largest contentful paint        | 2.34 s | 0.55 s  |
| Total blocking time             | 72 ms  | 0 ms    |
| Cumulative layout shift         | 0.001  | 0.004   |

The first audit identified accessible-name mismatches and an AI index without Markdown links. Both were corrected before the final measurements. Remaining informational opportunities include framework JavaScript and render-blocking styles; the measured mobile LCP is below 2.5 seconds. Scores can vary across machines and runs.

## Authentic screenshots

Captured from the production build, not design mockups:

- [Desktop homepage](docs/screenshots/home-desktop.png) — 1440px viewport, full page.
- [Phone homepage](docs/screenshots/home-mobile.png) — 390px viewport, full page.
- [Optional PawanOS](docs/screenshots/desktop-os.png) — 1440px viewport.

## Dependency advisory not suppressed

The full development audit reports **five high-severity dependency entries in one upstream globbing chain**:

`eslint-config-next → @next/eslint-plugin-next → fast-glob → micromatch → braces`

[GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm) concerns deeply nested glob patterns causing stack exhaustion. npm reports no patched `braces` version. Its forced remediation proposes the incompatible `eslint-config-next@14.2.35` downgrade against Next.js 16.4. That downgrade and advisory suppression were not applied. This chain is development lint tooling, not a production page dependency; monitor upstream for a compatible fix. A clean production audit does not mean every dependency is risk-free.

## Protected media hashes

```text
MuStudentPreview.png  81ea18dd91c6aa6918a4d3deb4fc7f733fdd410e0fc943ccb5d37af748df061b
page-flip.mp3         517f682c31cb26eace74f63e1585bc4d51343758edbafb31c4cbf6927425f618
```

## Reproduce

```bash
npm ci
npm run format:check
npm run check
python3 -m pip install -r scripts/requirements-pdf.txt
npm run check:pdf
npm audit --omit=dev --audit-level=moderate
npm run build
npx playwright install --with-deps chromium
npm run test:e2e
```

For Lighthouse, start the production server, then run `npx lighthouse@13.5.0 http://localhost:3000/` with an installed Chrome/Chromium; add `--preset=desktop` for the second profile. Full transient reports and failure traces are not committed.

The sandbox browser used a separately extracted Chromium with its runtime libraries; CI installs Playwright's supported Chromium and dependencies normally. `.github/workflows/quality.yml` runs formatting, lint/types/units, pinned Python PDF validation, production audit, build, and browser tests.

## Limits and owner follow-up

- Other products' GitHub repository visibility was checked; their implementations, deployment uptime, adoption, and security were not independently audited. See [CONTENT_LEDGER.md](CONTENT_LEDGER.md).
- B.E. completion remains **Expected 2026**. Community metrics remain explicitly owner-reported. The MUStudentsUnited screenshot/claimed-stack version discrepancy is disclosed, not guessed away.
- Automated Chromium/axe checks are not a substitute for real-device Safari/Firefox, assistive-technology testing, or actual email-client delivery testing.
- No external search indexing, Slack/LinkedIn card fetch, field analytics, or live production HTTP response is verified by these local checks.
- GitHub PR checks and Vercel deployment status must be examined separately before describing a merge or deployment as successful.

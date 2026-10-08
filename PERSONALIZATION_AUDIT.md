# PERSONALIZATION_AUDIT.md — PawanOS build

Reference: prior book-portfolio theme in this same repo (also Pawan Hiray's — no foreign owner identity to purge).

## Tokens found in the old theme and their disposition

| Token (old theme) | Where | Replacement in PawanOS / REMOVE |
|---|---|---|
| `pawan@example.com` (fake contact email in deleted `BookPortfolio.tsx`) | deleted file | REMOVE — replaced everywhere by `pawanhiray1@gmail.com` from `ownerProfile.conversion.email` |
| `github.com/hiraypawan` | deleted file + CoverPage | Canonicalized to `https://github.com/hiraypawan` in `ownerProfile.socials` (single source of truth) |
| `linkedin.com/in/pawanhiray` (short) vs long encoded LinkedIn URL in `ContactPage.tsx` | old sections | Canonicalized to `https://linkedin.com/in/pawanhiray` in `ownerProfile.socials` |
| `Treasure Hunt Portfolio` naming (old metadata) | `layout.tsx` (old) | REMOVE — replaced with `PawanOS` naming |
| `index.html` elevator static site identity copy | deleted `index.html` | REMOVE |
| Unverified counts (`10K+ Downloads`, `500+ Marketers`, `2K+ Creators` in old `ProjectsPage.tsx`) | deleted sections | REMOVE — only `30K+ students`, `50+ projects`, `3+ years` ship, each labelled `founder-reported` with disclaimer; placeholder cases labelled `illustrative` |
| Old placeholder project images (`/images/smartbotx.png`, 0 bytes) | `public/images` | REMOVE (file deleted) |

## Scan procedure (run before every production build)

```bash
rg -n "pawan@example|hiraypawan|Treasure Hunt|smartbotx.png|index.html" src public --glob '!node_modules'
rg -n "pawan@example|hiraypawan|Treasure Hunt" .next/server/app/index.html .next/static 2>/dev/null
```

Result 2026-10-08 (rev 2): source scan clean — no `pawan@example`, no `Treasure Hunt`, no `smartbotx.png`, no `Demo ping`, no text-face companion, no emoji app icons in `src/`, `public/`, or metadata. The only `hiraypawan` hits are the canonical `github.com/hiraypawan` social/bookmark entries sourced from `ownerProfile`.
No automatic domain-greeting copy is rendered; the domain appears only in metadata, socials, and browser bookmarks from `ownerProfile.identity.domain`.

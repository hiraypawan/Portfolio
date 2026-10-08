# Personalization and claim audit — v1.1

Reviewed 2026-10-08. The previous theme also belonged to Pawan Hiray; no foreign identity was introduced.

## Single-source identity

Name, canonical domain, location, timezone, email, phone, LinkedIn URL, professional role, community dates, and resume sections live in `src/data/ownerProfile.ts`. Metadata and `llms.txt` derive from that profile. Root Person JSON-LD contains the single primary role “AI Product Developer.”

The supplied encoded LinkedIn URL is retained consistently in the website and PDF. A different short URL is not assumed equivalent.

## Removed or qualified claims

- Removed “50+ projects” and “3+ years experience,” which lacked a supporting inventory/history.
- Reconciled Presidency to Aug 2024–Mar 2026; removed the contradictory 2023 appointment claim.
- Kept B.E. status as Expected 2026, matching supplied evidence rather than assuming graduation.
- Distinguished Instagram followers from active platform users.
- Removed unsupported 48-hour response promises, broad Web3/full-stack marketing, and nonexistent draft article routes.
- Classified demo-linked, local, archived, and in-development projects independently.
- All implementation descriptions and community outcomes remain owner-reported unless independent evidence is later supplied.

No fake contact email, invented agency clients, generated likeness, mascot, emoji app icon, booking ping, or fabricated testimonial is present. See `CONTENT_LEDGER.md` for owner follow-up items and provenance.

## Protected media

- `public/images/MuStudentPreview.png`: preserved and now rendered as owner-supplied project evidence.
- `public/sounds/page-flip.mp3`: preserved but unused; interface sounds are synthesized locally only after opt-in.
- Font families remain Space Grotesk and Fira Code, now self-hosted through OFL-licensed Fontsource packages.

## Before publishing

Run `npm run check`, `npm run build`, `npm run check:pdf`, the production dependency audit, and `npm run test:e2e`. Confirm that real hero/project text is present in the `<main>` of the raw HTTP response, not just an RSC script or a noscript fallback.

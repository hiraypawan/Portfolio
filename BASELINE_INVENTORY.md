# BASELINE_INVENTORY.md

- Repository: https://github.com/hiraypawan/Portfolio · branch `main`
- Framework: Next.js 15.4.5 (App Router) · React 19 · Tailwind CSS v4 · framer-motion · Vercel (auto-deploy from GitHub)
- Install/run: `npm install` → `npm run dev` (http://localhost:3000) → `npm run build`
- Routes before OS rebuild: `/` (book portfolio), `/_not-found`
- Previous entry: `src/app/page.tsx` → `@/components/book-portfolio` (+ `sections/`, `layout/FitToPage`, `ui/AnimatedCursor`)
- Previous background system: gradient + blur blobs + cursor particles (no protected videos/wallpapers — none existed)
- Third-party embeds: none. Env vars: none.
- Known broken before OS rebuild: none after cleanup commit `93008e6` (build passed, 63.7 kB `/`).
- Protected elements: `public/images/MuStudentPreview.png`, `public/sounds/page-flip.mp3`, owner contact/social URLs in `ownerProfile`.

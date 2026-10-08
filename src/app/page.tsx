import PersonalOS from '@/components/os/PersonalOS';

// Server-rendered page shell: crawlers, link unfurlers, and no-JS visitors get
// the full story in plain HTML. The interactive OS hydrates on top for humans.
export default function Home() {
  return (
    <>
      <noscript>
        <div style={{ fontFamily: 'system-ui, sans-serif', padding: 24, maxWidth: 640 }}>
          <h1>Pawan Hiray — AI Product Developer (Next.js + AI)</h1>
          <p>
            Fresher Computer Engineer from Mumbai. I ship AI features into real products.
            Former President of MUStudentsUnited (10,000+ student community, Aug 2024 — Mar 2026).
            Open to fresher roles in Mumbai / Pune / Remote / Hybrid, and freelance. Ready to relocate.
          </p>
          <h2>Top projects</h2>
          <ul>
            <li><a href="https://onebrains.pages.dev">OneBrain</a> — AI life OS (Next.js, Cloudflare Workers). Live in production.</li>
            <li><a href="https://mumbaistudentsunited.com">MUStudentsUnited</a> — student notes platform. 10K+ followers.</li>
            <li><a href="https://mysmarty.vercel.app">Smarty</a> — Gemini-powered Chrome extension. Live v1.0.2.</li>
          </ul>
          <p>
            <a href="/resume">Read the one-page resume</a> ·{' '}
            <a href="mailto:pawanhiray1@gmail.com">pawanhiray1@gmail.com</a> ·{' '}
            <a href="https://github.com/hiraypawan">GitHub</a>
          </p>
        </div>
      </noscript>
      <PersonalOS />
    </>
  );
}

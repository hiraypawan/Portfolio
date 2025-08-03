import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { About } from '@/components/about';
import { Expertise } from '@/components/expertise';
import { Projects } from '@/components/projects';
import { Contact } from '@/components/contact';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-cosmic-900 text-cosmic-100">
      <Header />
      <main>
        <Hero />
        <About />
        <Expertise />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

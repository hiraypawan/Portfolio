'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, ExternalLink, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="py-12 bg-cosmic-900 border-t border-cosmic-700/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="flex justify-center space-x-6 mb-8">
            {[
              { icon: Github, href: 'https://github.com/pawanhiray', label: 'GitHub' },
              { icon: Linkedin, href: 'https://linkedin.com/in/pawanhiray', label: 'LinkedIn' },
              { icon: ExternalLink, href: 'https://www.pawanhiray.vercel.com', label: 'Website' },
            ].map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-cosmic-800 hover:bg-cosmic-700 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-neon-blue/25"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <social.icon className="w-5 h-5 text-cosmic-300 hover:text-neon-blue transition-colors" />
              </motion.a>
            ))}
          </div>

          <div className="flex items-center justify-center space-x-2 text-cosmic-400">
            <span>Built by Pawan Hiray</span>
            <Heart className="w-4 h-4 text-neon-pink" />
            <span>with Next.js & Tailwind CSS</span>
          </div>

          <div className="mt-4 text-sm text-cosmic-500">
            © {new Date().getFullYear()} Pawan Hiray. All rights reserved.
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

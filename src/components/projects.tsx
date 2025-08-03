'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Code as CodeIcon } from 'lucide-react';

export function Projects() {
  const projects = [
    {
      thumbnail: '/images/smartbotx.png',
      title: 'SmartBotX',
      description: 'AI Telegram bot with growth triggers, NLP, and meme-gen capabilities for viral content creation.',
      tech: ['Node.js', 'OpenAI API', 'Telegram API', 'NLP'],
      github: 'https://github.com/pawanhiray/smartbotx',
      demo: 'https://smartbotx.vercel.app'
    },
    {
      thumbnail: '/images/crypto-dapp.png',
      title: 'CryptoTrader Pro',
      description: 'Decentralized trading platform with automated strategies and portfolio management.',
      tech: ['React', 'Solidity', 'Web3.js', 'Ethereum', 'MetaMask'],
      github: 'https://github.com/pawanhiray/crypto-trader',
      demo: 'https://cryptotrader-pro.vercel.app'
    },
    {
      thumbnail: '/images/growth-tools.png',
      title: 'ViralGrowth Suite',
      description: 'Comprehensive growth hacking toolkit with SEO tools, funnel builders, and analytics.',
      tech: ['Next.js', 'PostgreSQL', 'Redis', 'Google Analytics', 'Stripe'],
      github: 'https://github.com/pawanhiray/viral-growth',
      demo: 'https://viralgrowth-suite.vercel.app'
    },
    {
      thumbnail: '/images/ai-assistant.png',
      title: 'AI Code Assistant',
      description: 'Intelligent coding companion with code generation, debugging, and optimization features.',
      tech: ['Python', 'FastAPI', 'OpenAI GPT', 'TypeScript', 'VS Code API'],
      github: 'https://github.com/pawanhiray/ai-code-assistant',
      demo: 'https://ai-code-assistant.vercel.app'
    }
  ];

  return (
    <section id="projects" className="py-20 bg-cosmic-700">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-neon-purple to-neon-blue bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-xl text-cosmic-300 max-w-3xl mx-auto">
            Some of the exciting projects I’ve built or contributed to
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-cosmic-800/50 backdrop-blur-sm border border-cosmic-700/50 rounded-xl hover:bg-cosmic-600/50 transition-all duration-300 hover:scale-105 h-full overflow-hidden">
                <div className="relative bg-gradient-to-br from-cosmic-600 to-cosmic-800 h-48 sm:h-64 md:h-48 lg:h-64 flex items-center justify-center">
                  <div className="text-4xl font-bold text-cosmic-300 opacity-50">
                    {project.title.split(' ').map(word => word[0]).join('')}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-cosmic-900 to-transparent opacity-50 group-hover:opacity-75 transition-opacity"></div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-semibold text-cosmic-100">
                      {project.title}
                    </h3>
                    <div className="flex space-x-4">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neon-blue hover:text-neon-purple transition-colors"
                      >
                        <CodeIcon className="w-6 h-6" />
                      </a>
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neon-blue hover:text-neon-purple transition-colors"
                      >
                        <ExternalLink className="w-6 h-6" />
                      </a>
                    </div>
                  </div>
                  <p className="text-cosmic-400 mb-4">
                    {project.description}
                  </p>
                  <div className="mt-4">
                    <h4 className="text-cosmic-200 font-medium mb-2">
                      Tech Stack:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-cosmic-700/50 border border-cosmic-600/50 rounded-full text-sm text-cosmic-200 hover:bg-cosmic-600/50 transition-colors duration-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

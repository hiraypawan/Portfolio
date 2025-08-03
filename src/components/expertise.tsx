'use client';

import { motion } from 'framer-motion';
import { Code2, Bot, TrendingUp, Gamepad2 } from 'lucide-react';

export function Expertise() {
  const expertiseAreas = [
    {
      icon: Code2,
      title: 'Full-Stack & Automation',
      description: 'Web, Mobile, SaaS Tools, Bots, APIs built from scratch.',
      technologies: ['React', 'Node.js', 'Python', 'TypeScript', 'MongoDB', 'PostgreSQL'],
      gradient: 'from-neon-blue to-neon-purple'
    },
    {
      icon: Bot,
      title: 'AI + Blockchain Dev',
      description: 'AI Agents, Prompt Engineering, Crypto dApps, Token Systems, Trading.',
      technologies: ['OpenAI API', 'Solidity', 'Web3.js', 'Ethereum', 'Smart Contracts', 'LangChain'],
      gradient: 'from-neon-purple to-neon-pink'
    },
    {
      icon: TrendingUp,
      title: 'Growth & Digital Marketing',
      description: 'SEO, Funnels, Ads, Telegram Bots, Meme Virality.',
      technologies: ['Google Ads', 'SEO', 'Analytics', 'Telegram API', 'Social Media', 'Conversion'],
      gradient: 'from-neon-pink to-neon-blue'
    },
    {
      icon: Gamepad2,
      title: 'Game & Media Creation',
      description: 'Unity, UE5, Blender, Video Editing, Thumbnails.',
      technologies: ['Unity', 'Unreal Engine', 'Blender', 'After Effects', 'Photoshop', '3D Modeling'],
      gradient: 'from-neon-blue to-neon-purple'
    }
  ];

  return (
    <section id="expertise" className="py-20 bg-gradient-to-b from-cosmic-900 to-cosmic-800">
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
              My Expertise
            </span>
          </h2>
          <p className="text-xl text-cosmic-300 max-w-3xl mx-auto">
            Four core areas where I excel and deliver exceptional results
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {expertiseAreas.map((area, index) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-cosmic-800/50 backdrop-blur-sm border border-cosmic-700/50 rounded-2xl p-8 hover:bg-cosmic-700/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-neon-purple/10 h-full">
                <div className="flex items-center mb-6">
                  <div className={`p-4 bg-gradient-to-r ${area.gradient} rounded-xl mr-4 group-hover:shadow-lg group-hover:shadow-neon-blue/25 transition-all duration-300`}>
                    <area.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-cosmic-100">
                    {area.title}
                  </h3>
                </div>
                
                <p className="text-cosmic-300 text-lg mb-6 leading-relaxed">
                  {area.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {area.technologies.map((tech, techIndex) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-cosmic-700/50 border border-cosmic-600/50 rounded-full text-sm text-cosmic-200 hover:bg-cosmic-600/50 transition-colors duration-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-cosmic-800/30 backdrop-blur-sm border border-cosmic-700/50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-cosmic-100 mb-4">
              Ready to build something amazing?
            </h3>
            <p className="text-cosmic-300 text-lg">
              Let's combine these skills to create innovative solutions that make a real impact.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

'use client';

import { motion } from 'framer-motion';
import { Code, Globe, Wrench, Rocket, Brain } from 'lucide-react';

export function About() {
  const skills = [
    {
      icon: Code,
      title: 'Tech Builder',
      description: 'Full-stack development with modern frameworks and tools'
    },
    {
      icon: Globe,
      title: 'Web3 & AI Specialist',
      description: 'Blockchain dApps, smart contracts, and AI integration'
    },
    {
      icon: Wrench,
      title: 'Full-Stack Developer',
      description: 'End-to-end application development and deployment'
    },
    {
      icon: Rocket,
      title: 'Growth Hacker',
      description: 'Digital marketing, SEO, and viral growth strategies'
    },
    {
      icon: Brain,
      title: 'Digital Leader',
      description: 'Innovation in tech, automation, and digital transformation'
    }
  ];

  return (
    <section id="about" className="py-20 bg-cosmic-900/50">
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
              About Me
            </span>
          </h2>
          <p className="text-xl text-cosmic-300 max-w-3xl mx-auto leading-relaxed">
            I&apos;m a multi-skilled developer passionate about building automation tools,
            AI agents, crypto systems, and viral growth tools. With expertise spanning 
            full-stack development, Web3, and digital marketing, I create innovative 
            solutions that drive real-world impact.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-cosmic-800/50 backdrop-blur-sm border border-cosmic-700/50 rounded-xl p-6 hover:bg-cosmic-700/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-neon-purple/10">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-gradient-to-r from-neon-purple to-neon-blue rounded-lg mr-4 group-hover:shadow-lg group-hover:shadow-neon-blue/25 transition-all duration-300">
                    <skill.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-cosmic-100">
                    {skill.title}
                  </h3>
                </div>
                <p className="text-cosmic-400 leading-relaxed">
                  {skill.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-cosmic-800/30 backdrop-blur-sm border border-cosmic-700/50 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-cosmic-100 mb-4">
              What drives me?
            </h3>
            <p className="text-cosmic-300 text-lg leading-relaxed">
              I believe in the power of technology to transform lives and businesses. 
              Whether it&apos;s building intelligent AI systems, creating decentralized applications, 
              or developing growth-hacking tools that go viral, I&apos;m always looking for ways 
              to push the boundaries of what&apos;s possible in the digital world.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

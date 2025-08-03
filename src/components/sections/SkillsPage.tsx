'use client';

import { motion } from 'framer-motion';
import { FaCode, FaRobot, FaChartLine, FaGamepad } from 'react-icons/fa';

const expertiseCards = [
  {
    icon: FaCode,
    title: 'Full-Stack & Automation',
    description: 'Web, Mobile, SaaS Tools, Bots, APIs built from scratch.',
    technologies: ['React', 'Node.js', 'Python', 'MongoDB', 'AWS', 'Docker'],
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'from-blue-900/20 to-cyan-900/20'
  },
  {
    icon: FaRobot,
    title: 'AI + Blockchain Dev',
    description: 'AI Agents, Prompt Engineering, Crypto dApps, Token Systems, Trading.',
    technologies: ['OpenAI API', 'Solidity', 'Web3.js', 'TensorFlow', 'Ethereum', 'Smart Contracts'],
    color: 'from-purple-500 to-pink-500',
    bgColor: 'from-purple-900/20 to-pink-900/20'
  },
  {
    icon: FaChartLine,
    title: 'Growth & Digital Marketing',
    description: 'SEO, Funnels, Ads, Telegram Bots, Meme Virality.',
    technologies: ['Google Analytics', 'Facebook Ads', 'Telegram API', 'SEO Tools', 'Growth Hacking', 'A/B Testing'],
    color: 'from-green-500 to-emerald-500',
    bgColor: 'from-green-900/20 to-emerald-900/20'
  },
  {
    icon: FaGamepad,
    title: 'Game & Media Creation',
    description: 'Unity, UE5, Blender, Video Editing, Thumbnails.',
    technologies: ['Unity 3D', 'Unreal Engine 5', 'Blender', 'After Effects', 'Photoshop', 'Premiere Pro'],
    color: 'from-orange-500 to-red-500',
    bgColor: 'from-orange-900/20 to-red-900/20'
  }
];

export default function SkillsPage() {
  return (
    <div className="relative h-full bg-gradient-to-br from-slate-900 via-yellow-900/30 to-slate-900 overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/10 to-orange-600/10 animate-pulse" />
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-yellow-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="flex flex-col h-full z-10 relative px-8 py-12 overflow-y-auto">
        <div className="text-center mb-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
          <h1 className="text-5xl font-bold text-white mb-6 font-space-grotesk">
            Expertise Grid
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Four core areas where I excel in building innovative solutions
          </p>
          </motion.div>
        </div>

        {/* Expertise Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto mb-8">
          {expertiseCards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className={`backdrop-blur-lg bg-gradient-to-br ${card.bgColor} border border-white/20 rounded-3xl p-8 hover:bg-white/10 transition-all duration-500 group`}
              >
                {/* Icon */}
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${card.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="text-white text-3xl" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-white mb-4">
                  {card.title}
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  {card.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {card.technologies.map((tech, techIndex) => (
                    <motion.span
                      key={techIndex}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: (index * 0.2) + (techIndex * 0.1) + 0.5 }}
                      className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm text-gray-200 hover:bg-white/20 transition-colors duration-200"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mt-12 backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-6"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-300 mb-1">15+</div>
              <div className="text-gray-300 text-sm">Languages</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-300 mb-1">25+</div>
              <div className="text-gray-300 text-sm">Frameworks</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-300 mb-1">10+</div>
              <div className="text-gray-300 text-sm">AI Tools</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-300 mb-1">5+</div>
              <div className="text-gray-300 text-sm">Platforms</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

'use client';

import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaGithub, FaUsers, FaRobot, FaGamepad, FaChartLine } from 'react-icons/fa';

const projects = [
  {
    id: 1,
    title: 'MUStudentsUnited',
    subtitle: 'Academic Social Platform',
    description: 'A comprehensive academic platform serving 30,000+ students with note sharing, forums, and study materials. Built as a solo initiative.',
    image: '/images/MuStudentPreview.png',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'JWT Auth'],
    stats: '30K+ Active Students',
    liveUrl: 'https://mumbaistudentsunited.com',
    githubUrl: '#',
    color: 'from-blue-500 to-purple-600',
    icon: FaUsers,
    featured: true
  },
  {
    id: 2,
    title: 'SmartBotX',
    subtitle: 'AI Telegram Bot',
    description: 'AI Telegram bot with growth triggers, NLP, and meme generation capabilities. Automates engagement and viral content creation.',
    image: '/images/smartbotx.png',
    technologies: ['Node.js', 'OpenAI API', 'Telegram API', 'NLP', 'AI'],
    stats: '5K+ Users',
    liveUrl: '#',
    githubUrl: '#',
    color: 'from-green-500 to-teal-600',
    icon: FaRobot
  },
  {
    id: 3,
    title: 'CryptoTrader Pro',
    subtitle: 'Web3 Trading Platform',
    description: 'Advanced cryptocurrency trading platform with AI-powered analytics, portfolio management, and automated trading strategies.',
    image: '/images/smartbotx.png',
    technologies: ['React', 'Web3.js', 'Solidity', 'Python', 'TradingView'],
    stats: '1K+ Traders',
    liveUrl: '#',
    githubUrl: '#',
    color: 'from-orange-500 to-red-600',
    icon: FaChartLine
  },
  {
    id: 4,
    title: 'GameVerse',
    subtitle: 'Unity Game Engine',
    description: 'Immersive 3D game built with Unity featuring advanced physics, multiplayer capabilities, and stunning visual effects.',
    image: '/images/smartbotx.png',
    technologies: ['Unity 3D', 'C#', 'Blender', 'Photon', 'Shader Graph'],
    stats: '10K+ Downloads',
    liveUrl: '#',
    githubUrl: '#',
    color: 'from-purple-500 to-pink-600',
    icon: FaGamepad
  },
  {
    id: 5,
    title: 'GrowthHack Suite',
    subtitle: 'Marketing Automation',
    description: 'Complete suite of growth hacking tools including SEO analyzer, social media scheduler, and viral content generator.',
    image: '/images/smartbotx.png',
    technologies: ['Python', 'Django', 'Celery', 'Redis', 'Google APIs'],
    stats: '500+ Marketers',
    liveUrl: '#',
    githubUrl: '#',
    color: 'from-indigo-500 to-blue-600',
    icon: FaChartLine
  },
  {
    id: 6,
    title: 'AI Content Studio',
    subtitle: 'Content Generation Platform',
    description: 'AI-powered content creation platform for generating articles, social media posts, and marketing copy at scale.',
    image: '/images/smartbotx.png',
    technologies: ['Next.js', 'OpenAI API', 'Stripe', 'PostgreSQL', 'Redis'],
    stats: '2K+ Creators',
    liveUrl: '#',
    githubUrl: '#',
    color: 'from-cyan-500 to-blue-600',
    icon: FaRobot
  }
];

export default function ProjectsPage() {
  // Show only top projects that fit in viewport
  const topProjects = projects.slice(0, 4);

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-pink-600/10 animate-pulse" />
      </div>

      <div className="flex flex-col items-center justify-center w-full text-center z-10 relative px-6 py-8 h-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Featured Projects
          </h1>
          <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto">
            Showcase of innovative projects built with modern technologies
          </p>
        </motion.div>

        {/* Projects Grid - Top 4 Only */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl w-full">
          {topProjects.map((project, index) => {
            const IconComponent = project.icon;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.02, y: -2 }}
                className="bg-white/5 rounded-2xl p-4 hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${project.color} flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform`}>
                    <IconComponent className="text-white text-lg" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-white">
                        {project.title}
                      </h3>
                      {project.featured && (
                        <span className="text-xs bg-gradient-to-r from-blue-500 to-purple-500 text-white px-2 py-1 rounded-full">
                          FEATURED
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-400 mb-2">{project.subtitle}</p>
                    <p className="text-sm text-gray-300 leading-relaxed mb-3 line-clamp-2">
                      {project.description.substring(0, 100)}...
                    </p>
                    <div className="flex items-center justify-between">
                      <div className={`text-sm font-semibold bg-gradient-to-r ${project.color} bg-clip-text text-transparent`}>
                        {project.stats}
                      </div>
                      <div className="flex space-x-2">
                        <motion.a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.2 }}
                          className="text-white/70 hover:text-white transition-colors"
                        >
                          <FaExternalLinkAlt size={14} />
                        </motion.a>
                        <motion.a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.2 }}
                          className="text-white/70 hover:text-white transition-colors"
                        >
                          <FaGithub size={14} />
                        </motion.a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
            })}
        </div>
      </div>
    </div>
  );
}

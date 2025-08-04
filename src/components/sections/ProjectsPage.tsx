'use client';

import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaGithub, FaUsers, FaRobot, FaGamepad, FaChartLine } from 'react-icons/fa';
import Image from 'next/image';

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
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-slate-900 via-red-900/30 to-slate-900">
      {/* Background Animation */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-pink-600/10 animate-pulse" />
      </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 min-h-screen overflow-y-auto md:overflow-y-visible scrollable-content mobile-scroll ios-scroll-fix scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent" style={{ touchAction: 'pan-y' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 font-space-grotesk">
            Featured Projects
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto">
            Showcase of innovative projects built with modern technologies
          </p>
        </motion.div>

        {/* Featured Project - MUStudentsUnited */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-8 sm:mb-12 w-full"
        >
          {projects.filter(p => p.featured).map((project) => {
            const IconComponent = project.icon;
            return (
              <div key={project.id} className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 hover:bg-white/15 transition-all duration-500 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-center">
                  <div>
                    <div className={`inline-flex items-center px-3 py-1 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r ${project.color} text-white text-xs sm:text-sm font-semibold mb-3 sm:mb-4`}>
                      <IconComponent className="mr-2" />
                      FEATURED PROJECT
                    </div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-base sm:text-lg text-gray-300 mb-3 sm:mb-4">{project.subtitle}</p>
                    <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4 sm:mb-6">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                      {project.technologies.map((tech, index) => (
                        <span key={index} className="px-2 py-1 sm:px-3 sm:py-1 bg-white/10 rounded-full text-xs sm:text-sm text-gray-200">
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className={`text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r ${project.color} bg-clip-text text-transparent`}>
                        {project.stats}
                      </div>
                      <div className="flex space-x-3">
                        <motion.a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                        >
                          <FaExternalLinkAlt className="text-white text-sm sm:text-base" />
                        </motion.a>
                        <motion.a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                        >
                          <FaGithub className="text-white text-sm sm:text-base" />
                        </motion.a>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative mt-4 lg:mt-0">
                    <div className={`absolute inset-0 bg-gradient-to-r ${project.color} rounded-xl sm:rounded-2xl blur-xl opacity-30`}></div>
                    <div className="relative bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-2 sm:p-4">
                      <Image 
                        src={project.image} 
                        alt={project.title}
                        width={400}
                        height={192}
                        className="w-full h-auto object-cover rounded-lg sm:rounded-xl"
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQADAAAAAAAAAAABAgMABAUGIWEREiMxQf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HcDjqefFVSmjhKC55eo/8Anqf0fHY50w"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/images/placeholder.png';
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Other Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {projects.filter(p => !p.featured).map((project, index) => {
            const IconComponent = project.icon;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + (index * 0.1), duration: 0.6 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:bg-white/15 transition-all duration-300 group"
              >
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-r ${project.color} flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform`}>
                  <IconComponent className="text-white text-base sm:text-xl" />
                </div>
                
                <h4 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2">{project.title}</h4>
                <p className="text-gray-400 text-xs sm:text-sm mb-2 sm:mb-3">{project.subtitle}</p>
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-3">{project.description}</p>
                
                <div className="flex flex-wrap gap-1 mb-3 sm:mb-4">
                  {project.technologies.slice(0, 3).map((tech, techIndex) => (
                    <span key={techIndex} className="px-2 py-1 bg-white/10 rounded text-xs text-gray-200">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className={`text-xs sm:text-sm font-semibold bg-gradient-to-r ${project.color} bg-clip-text text-transparent`}>
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
                      <FaExternalLinkAlt size={12} />
                    </motion.a>
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.2 }}
                      className="text-white/70 hover:text-white transition-colors"
                    >
                      <FaGithub size={12} />
                    </motion.a>
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

'use client';

import { motion } from 'framer-motion';
import { FaLaptopCode, FaGlobe, FaTools, FaRocket, FaBrain } from 'react-icons/fa';

const skillCards = [
  {
    icon: FaLaptopCode,
    title: '💻 Tech Builder',
    description: 'Building innovative web and mobile applications with modern tech stacks',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: FaGlobe,
    title: '🌐 Web3  AI Specialist',
    description: 'Developing AI agents, blockchain dApps, and intelligent automation systems',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: FaTools,
    title: '🛠 Full-Stack Developer',
    description: 'End-to-end development from database design to user interface',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: FaRocket,
    title: '🚀 Growth Hacker',
    description: 'Creating viral marketing tools and growth automation systems',
    color: 'from-orange-500 to-red-500'
  },
  {
    icon: FaBrain,
    title: '🧠 Digital Leader',
    description: 'Leading digital transformation and innovative technology adoption',
    color: 'from-indigo-500 to-purple-500'
  }
];

export default function IndexPage() {
  return (
    <div className="auto-fit-content w-full">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 to-teal-600/10 animate-pulse" />
      </div>

      <div className="flex flex-col items-center justify-center w-full text-center z-10 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 px-2"
        >
          <h1 className="font-bold text-white mb-4 font-space-grotesk" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
            About Me
          </h1>
          <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl p-4 max-w-2xl mx-auto">
            <p className="text-gray-200 leading-relaxed" style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)' }}>
              &ldquo;I&apos;m a multi-skilled developer passionate about building automation tools, 
              AI agents, crypto systems, and viral growth tools.&rdquo;
            </p>
          </div>
        </motion.div>

        {/* Skills Grid */}
        <div className="auto-grid max-w-4xl w-full">
          {skillCards.map((skill, index) => {
            const IconComponent = skill.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl p-4 hover:bg-white/20 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${skill.color} flex items-center justify-center mb-3 mx-auto`}>
                  <IconComponent className="text-white text-lg" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {skill.title}
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {skill.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mt-6 grid grid-cols-3 gap-4 backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl p-4 max-w-2xl mx-auto"
        >
          <div className="text-center">
            <div className="text-xl font-bold text-blue-300 mb-1">30K+</div>
            <div className="text-xs text-gray-300">Students Served</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-purple-300 mb-1">50+</div>
            <div className="text-xs text-gray-300">Projects Built</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-green-300 mb-1">3+</div>
            <div className="text-xs text-gray-300">Years Experience</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

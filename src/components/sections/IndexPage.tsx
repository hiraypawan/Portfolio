'use client';

import { motion } from 'framer-motion';
import { FaLaptopCode, FaGlobe, FaTools, FaRocket, FaBrain } from 'react-icons/fa';
import FitToPage from '../layout/FitToPage';

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
    <FitToPage designWidth={1280} designHeight={800} className="no-scroll">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 to-teal-600/10 animate-pulse" />
      </div>

      <div className="flex flex-col items-center justify-center w-full text-center px-16 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            About Me
          </h1>
          <p className="text-base md:text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto">
            I&apos;m a multi-skilled developer passionate about building automation tools, 
            AI agents, crypto systems, and viral growth tools.
          </p>
        </motion.div>

        {/* Skills Grid - Compact Version */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl w-full mb-6">
          {skillCards.slice(0, 6).map((skill, index) => {
            const IconComponent = skill.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.02, y: -2 }}
                className="text-center p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${skill.color} flex items-center justify-center mb-3 mx-auto`}>
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
          transition={{ delay: 0.8, duration: 0.8 }}
          className="grid grid-cols-3 gap-8 max-w-2xl mx-auto"
        >
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-blue-400 mb-1">30K+</div>
            <div className="text-sm text-gray-300">Students Served</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-purple-400 mb-1">50+</div>
            <div className="text-sm text-gray-300">Projects Built</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-green-400 mb-1">3+</div>
            <div className="text-sm text-gray-300">Years Experience</div>
          </div>
        </motion.div>
      </div>
    </FitToPage>
  );
}

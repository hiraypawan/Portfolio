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
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 to-teal-600/10 animate-pulse" />
      </div>

      <div className="flex flex-col items-center justify-center h-full text-center z-10 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12 px-4"
        >
          <h1 className="text-5xl font-bold text-white mb-6 font-space-grotesk">
            About Me
          </h1>
          <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-8 max-w-4xl mx-auto">
            <p className="text-xl text-gray-200 leading-relaxed">
              “Im a multi-skilled developer passionate about building automation tools, 
              AI agents, crypto systems, and viral growth tools.”
            </p>
          </div>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl px-4">
          {skillCards.map((skill, index) => {
            const IconComponent = skill.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300"
              >
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${skill.color} flex items-center justify-center mb-4 mx-auto`}>
                  <IconComponent className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {skill.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
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
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-8 max-w-4xl mx-auto"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-300 mb-2">20K+</div>
            <div className="text-gray-300">Students Served</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-300 mb-2">50+</div>
            <div className="text-gray-300">Projects Built</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-300 mb-2">3+</div>
            <div className="text-gray-300">Years Experience</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

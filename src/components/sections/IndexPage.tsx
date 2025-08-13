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
    <div className="auto-fit-content w-full h-full">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 to-teal-600/10 animate-pulse" />
      </div>

      <div className="flex flex-col items-center justify-start w-full text-center z-10 relative px-8 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-8">
            About Me
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
            I'm a multi-skilled developer passionate about building automation tools, 
            AI agents, crypto systems, and viral growth tools.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full mb-16">
          {skillCards.map((skill, index) => {
            const IconComponent = skill.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.03, y: -8 }}
                className="text-center p-8 rounded-3xl bg-white/5 hover:bg-white/10 transition-all duration-300"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${skill.color} flex items-center justify-center mb-6 mx-auto`}>
                  <IconComponent className="text-white text-2xl" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {skill.title}
                </h3>
                <p className="text-lg text-gray-300 leading-relaxed">
                  {skill.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="grid grid-cols-3 gap-12 max-w-4xl mx-auto"
        >
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">30K+</div>
            <div className="text-lg text-gray-300">Students Served</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-purple-400 mb-2">50+</div>
            <div className="text-lg text-gray-300">Projects Built</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-green-400 mb-2">3+</div>
            <div className="text-lg text-gray-300">Years Experience</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

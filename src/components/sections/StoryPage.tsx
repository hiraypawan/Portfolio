'use client';

import { motion } from 'framer-motion';
import { FaCode, FaGraduationCap, FaRocket, FaCog, FaBitcoin, FaUsers, FaPalette, FaStar } from 'react-icons/fa';

const milestones = [
  {
    year: "2018",
    age: "16",
    title: "Started Coding",
    description: "Began at 16 using Kodular (no-code) to build apps.",
    icon: FaCode,
    color: "from-blue-500 to-cyan-500"
  },
  {
    year: "2019",
    age: "17",
    title: "Learning Java & Android Studio",
    description: "Self-learned Java and Android development.",
    icon: FaCode,
    color: "from-green-500 to-emerald-500"
  },
  {
    year: "2020",
    age: "18",
    title: "Diploma in Computer Engineering",
    description: "Completed at SH Jondhale College with a focus beyond the syllabus.",
    icon: FaGraduationCap,
    color: "from-purple-500 to-pink-500"
  },
  {
    year: "2021",
    age: "19",
    title: "Expanded Skills",
    description: "Mastered digital marketing, WordPress, game development (Unity, UE5), Blender.",
    icon: FaCog,
    color: "from-orange-500 to-red-500"
  },
  {
    year: "2022",
    age: "20",
    title: "Entered Crypto World",
    description: "Traded meme coins, built Dapps, tracked airdrops, joined crypto projects as a moderator.",
    icon: FaBitcoin,
    color: "from-yellow-500 to-orange-500"
  },
  {
    year: "2023",
    age: "21",
    title: "Real World Applications",
    description: "Worked on real businesses & tools like mumbaistudentsunited.com, used by 20K+ students.",
    icon: FaUsers,
    color: "from-indigo-500 to-purple-500",
    link: { text: "mumbaistudentsunited.com", href: "https://mumbaistudentsunited.com" }
  },
  {
    year: "2024",
    age: "22",
    title: "Design and Leadership",
    description: "Learned UI/UX, graphic design, video editing, and leadership.",
    icon: FaPalette,
    color: "from-pink-500 to-rose-500"
  },
  {
    year: "2025",
    age: "23",
    title: "Tech + Design + Business = Me",
    description: "Full-stack mastery combining technical skills, creative design, and business acumen.",
    icon: FaStar,
    color: "from-cyan-500 to-blue-500"
  }
];

export default function StoryPage() {
  return (
    <div className="relative h-full bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-purple-600/10 animate-pulse" />
      </div>

      <div className="flex flex-col h-full z-10 relative px-8 py-12 overflow-y-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl font-bold text-white mb-4 font-space-grotesk">
            My Journey (2018–2025)
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            From 16-year-old beginner to full-stack innovator
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {milestones.map((milestone, index) => {
              const IconComponent = milestone.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 group"
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${milestone.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                      <IconComponent className="text-white text-xl" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-sm font-semibold bg-gradient-to-r ${milestone.color} bg-clip-text text-transparent`}>
                          {milestone.year} • Age {milestone.age}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {milestone.description}
                        {milestone.link && (
                          <a 
                            href={milestone.link.href} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-blue-400 hover:text-blue-300 underline ml-1 transition-colors"
                          >
                            {milestone.link.text}
                          </a>
                        )}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-8 backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-6 max-w-4xl mx-auto"
        >
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              The Journey Continues...
            </h3>
            <p className="text-gray-300 text-lg">
              From building simple apps to creating comprehensive platforms serving thousands of users. 
              Every challenge has been a stepping stone to innovation.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

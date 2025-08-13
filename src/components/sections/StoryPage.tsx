'use client';

import { motion } from 'framer-motion';
import { FaCode, FaServer, FaRocket, FaBriefcase, FaGem, FaLightbulb } from 'react-icons/fa';

const milestones = [
  {
    year: "2018",
    age: "16",
    title: "📖 Chapter 1: The Spark",
    description: "In a world where teenagers played PUBG, I opened Kodular and built my first mobile app without writing a single line of code. Then Java whispered, 'Let’s level up,' and Android Studio became my new battleground. My school notebooks had more code than math.",
    icon: FaCode,
    color: "from-blue-500 to-cyan-500"
  },
  {
    year: "2020",
    age: "17",
    title: "📖 Chapter 2: Into the Stack",
    description: "While others memorized textbook definitions, I was learning full-stack development on my own. Discovered UI design, white-hat hacking, and black-hat (just for knowledge 😏), photo editing, video editing—because being multi-talented is a lifestyle, not a choice.",
    icon: FaServer,
    color: "from-green-500 to-emerald-500"
  },
  {
    year: "2021",
    age: "18",
    title: "📖 Chapter 3: Viral Instinct",
    description: "College was okay... but I became the digital marketing guy—running viral ads before Reels became a thing. Learned Unity, then Unreal Engine 4/5 because one engine wasn’t enough. Stumbled into crypto and learned about DApps while India was still Googling 'What is blockchain?' Yes, I made ₹1,00,000+ in a day—no cap.",
    icon: FaRocket,
    color: "from-orange-500 to-red-500"
  },
  {
    year: "2022",
    age: "19",
    title: "📖 Chapter 4: Freelance Level: God Mode",
    description: "Started working with real clients across the globe. Built websites, apps, marketing funnels—you name it. Tinkered with AI long before ChatGPT became mainstream (and yes, I had early access 😎). Basically, I was the quiet storm building silently.",
    icon: FaBriefcase,
    color: "from-purple-500 to-pink-500"
  },
  {
    year: "2023",
    age: "20",
    title: "📖 Chapter 5: United We Build",
    description: "Launched MuStudentsUnited, now impacting 30,000+ students across Mumbai. Created a real-life system that actually helped students, not just another idea lost in a Notion doc. Also started building AI models, automations, and went full cyborg mode—still human though.",
    icon: FaGem,
    color: "from-yellow-500 to-orange-500",
    link: { text: "mumbaistudentsunited.com", href: "https://mumbaistudentsunited.com" }
  },
  {
    year: "2024",
    age: "21",
    title: "📖 Chapter 6: Creator Era",
    description: "Started helping creators hit 20K+ subs by scripting, editing, SEO, and ad strategy. Business ROI? Crushed it. Also became the go-to guy for crypto and meme coin trades—because why not?",
    icon: FaLightbulb,
    color: "from-pink-500 to-rose-500"
  },
  {
    year: "2025",
    age: "22",
    title: "📖 Chapter 7: Now & Beyond",
    description: "Now building smart things with AI, Blockchain, and Web3—solving real-world gaps with tech. Learning AI/ML, still hustling, still helping, still hungry. And yes, I still make memes, build DApps, and sometimes debug code at 3AM with coffee and chaos. If you’ve read this far… maybe you should hire me or invest in me.",
    icon: FaCode,
    color: "from-cyan-500 to-blue-500"
  }
];

export default function StoryPage() {
  // Show only key milestones that fit in viewport
  const keyMilestones = milestones.filter((_, index) => [0, 2, 4, 6].includes(index));

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-purple-600/10 animate-pulse" />
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
            My Journey
          </h1>
          <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto">
            Key milestones from 16-year-old beginner to full-stack innovator
          </p>
        </motion.div>

        {/* Timeline - Key Milestones Only */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl w-full mb-6">
          {keyMilestones.map((milestone, index) => {
            const IconComponent = milestone.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.02, y: -2 }}
                className="bg-white/5 rounded-2xl p-4 hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${milestone.color} flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform`}>
                    <IconComponent className="text-white text-lg" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="mb-2">
                      <span className={`text-sm font-bold bg-gradient-to-r ${milestone.color} bg-clip-text text-transparent`}>
                        {milestone.year} • Age {milestone.age}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 line-clamp-1">
                      {milestone.title.replace('📖 ', '')}
                    </h3>
                    <p className="text-sm text-gray-300 leading-relaxed line-clamp-3">
                      {milestone.description.substring(0, 120)}...
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
        {/* Bottom Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center max-w-2xl mx-auto"
        >
          <h3 className="text-lg font-bold text-white mb-2">
            The Journey Continues...
          </h3>
          <p className="text-sm text-gray-300">
            From building simple apps to serving 30,000+ users. Every challenge has been a stepping stone to innovation.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

import { FaUsers, FaRobot, FaChartLine, FaGamepad, FaCode, FaBrain, FaRocket, FaEnvelope, FaTrophy, FaGem } from 'react-icons/fa';
import { IconType } from 'react-icons';

export interface MapLocation {
  id: string;
  name: string;
  type: 'project' | 'skill' | 'achievement' | 'contact' | 'easter-egg' | 'story';
  position: { x: number; y: number };
  icon: IconType;
  color: string;
  glowColor: string;
  isUnlocked: boolean;
  requiresUnlock?: string[]; // IDs of locations that must be visited first
  zoomLevel: number;
  content: {
    title: string;
    subtitle?: string;
    description: string;
    image?: string;
    technologies?: string[];
    stats?: string;
    links?: {
      live?: string;
      github?: string;
      demo?: string;
    };
    details?: string[];
    media?: {
      type: 'video' | 'image' | 'gallery';
      src: string | string[];
    };
  };
  treasure?: {
    type: 'chest' | 'artifact' | 'scroll';
    reward: string;
    animation: 'bounce' | 'glow' | 'rotate';
  };
}

export const mapLocations: MapLocation[] = [
  // Central Hub - Introduction
  {
    id: 'intro-hub',
    name: 'Pawan\'s Digital Realm',
    type: 'story',
    position: { x: 50, y: 50 },
    icon: FaRocket,
    color: 'from-blue-500 to-purple-600',
    glowColor: 'rgba(59, 130, 246, 0.8)',
    isUnlocked: true,
    zoomLevel: 1,
    content: {
      title: 'Welcome, Digital Explorer! 🚀',
      subtitle: 'Tech Builder • Web3 & AI Specialist • Growth Hacker',
      description: 'Embark on a journey through my digital world! Each location represents a milestone in my tech journey. Click on glowing markers to discover projects, skills, and hidden treasures.',
      details: [
        '🎯 Multi-skilled developer with 30,000+ students trusting my work',
        '🚀 Passionate about building automation tools, AI agents, and crypto systems',
        '💡 Creator of viral growth tools and educational platforms',
        '🌟 Always exploring the intersection of technology and human connection'
      ],
      media: {
        type: 'image',
        src: '/images/hero-avatar.png'
      }
    }
  },

  // Major Projects - The Four Kingdoms
  {
    id: 'mustudents-kingdom',
    name: 'MUStudents Kingdom',
    type: 'project',
    position: { x: 25, y: 30 },
    icon: FaUsers,
    color: 'from-blue-500 to-purple-600',
    glowColor: 'rgba(59, 130, 246, 1)',
    isUnlocked: true,
    zoomLevel: 2,
    content: {
      title: 'MUStudentsUnited',
      subtitle: 'Academic Social Platform Kingdom 👑',
      description: 'The crown jewel of my portfolio! A comprehensive academic platform that became the digital home for 30,000+ Mumbai University students.',
      image: '/images/MuStudentPreview.png',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'JWT Auth', 'Socket.io'],
      stats: '30,000+ Active Students',
      links: {
        live: 'https://mumbaistudentsunited.com',
        github: '#'
      },
      details: [
        '📚 Complete note-sharing ecosystem with categorized subjects',
        '💬 Active community forums with real-time discussions',
        '📊 Study material repository with search functionality',
        '🔐 Secure authentication and user management system',
        '📱 Mobile-responsive design for on-the-go studying',
        '🏆 Built from scratch as a solo initiative'
      ]
    },
    treasure: {
      type: 'chest',
      reward: 'Unlock the "Community Builder" achievement!',
      animation: 'glow'
    }
  },

  {
    id: 'ai-empire',
    name: 'AI Bot Empire',
    type: 'project',
    position: { x: 75, y: 25 },
    icon: FaRobot,
    color: 'from-green-500 to-teal-600',
    glowColor: 'rgba(16, 185, 129, 1)',
    isUnlocked: true,
    zoomLevel: 2,
    content: {
      title: 'SmartBotX & AI Empire',
      subtitle: 'Intelligent Automation Realm 🤖',
      description: 'Enter the realm where AI meets automation! SmartBotX leads an army of intelligent bots designed to engage, entertain, and grow communities.',
      image: '/images/smartbotx.png',
      technologies: ['Node.js', 'OpenAI API', 'Telegram API', 'NLP', 'Machine Learning'],
      stats: '5,000+ Active Users',
      links: {
        demo: '#ai-bot-demo'
      },
      details: [
        '🧠 Advanced NLP for natural conversation flows',
        '🎯 Growth trigger automation for viral engagement',
        '😂 AI-powered meme generation and content creation',
        '📈 Analytics dashboard for performance tracking',
        '🔄 Continuous learning from user interactions',
        '⚡ Lightning-fast response times'
      ]
    },
    treasure: {
      type: 'artifact',
      reward: 'Discover the "AI Whisperer" secret skill!',
      animation: 'rotate'
    }
  },

  {
    id: 'crypto-citadel',
    name: 'Crypto Trading Citadel',
    type: 'project',
    position: { x: 80, y: 60 },
    icon: FaChartLine,
    color: 'from-orange-500 to-red-600',
    glowColor: 'rgba(249, 115, 22, 1)',
    isUnlocked: true,
    zoomLevel: 2,
    content: {
      title: 'CryptoTrader Pro',
      subtitle: 'Web3 Trading Fortress 💰',
      description: 'Ascend the heights of DeFi! An advanced cryptocurrency trading platform with AI-powered analytics and automated strategies.',
      technologies: ['React', 'Web3.js', 'Solidity', 'Python', 'TradingView'],
      stats: '1,000+ Active Traders',
      details: [
        '📊 Real-time market data and advanced charting',
        '🤖 AI-powered trading signal generation',
        '💼 Comprehensive portfolio management tools',
        '🔒 Secure wallet integration and transaction handling',
        '📈 Automated trading strategies and backtesting',
        '🌐 Multi-exchange connectivity'
      ]
    },
    treasure: {
      type: 'chest',
      reward: 'Unlock the "DeFi Master" badge!',
      animation: 'bounce'
    }
  },

  {
    id: 'game-dimension',
    name: 'Game Development Dimension',
    type: 'project',
    position: { x: 20, y: 70 },
    icon: FaGamepad,
    color: 'from-purple-500 to-pink-600',
    glowColor: 'rgba(168, 85, 247, 1)',
    isUnlocked: true,
    zoomLevel: 2,
    content: {
      title: 'GameVerse & Unity Creations',
      subtitle: 'Immersive Gaming Dimension 🎮',
      description: 'Step into alternate realities! A collection of immersive 3D games and interactive experiences built with cutting-edge game engines.',
      technologies: ['Unity 3D', 'C#', 'Blender', 'Photon', 'Shader Graph'],
      stats: '10,000+ Downloads',
      details: [
        '🎯 Physics-based gameplay mechanics',
        '🌐 Multiplayer networking with Photon',
        '🎨 Custom shaders and visual effects',
        '🏗️ Procedural world generation systems',
        '🎵 Dynamic audio systems and soundscapes',
        '📱 Cross-platform deployment capabilities'
      ]
    },
    treasure: {
      type: 'artifact',
      reward: 'Discover the "Game Architect" title!',
      animation: 'glow'
    }
  },

  // Skill Islands
  {
    id: 'fullstack-island',
    name: 'Full-Stack Island',
    type: 'skill',
    position: { x: 40, y: 20 },
    icon: FaCode,
    color: 'from-blue-500 to-cyan-500',
    glowColor: 'rgba(59, 130, 246, 0.7)',
    isUnlocked: true,
    zoomLevel: 1.5,
    content: {
      title: 'Full-Stack & Automation Mastery',
      subtitle: 'The Foundation Island 🏗️',
      description: 'Where it all begins! Master the art of building complete applications from frontend to backend, with automation sprinkled throughout.',
      technologies: ['React', 'Node.js', 'Python', 'MongoDB', 'AWS', 'Docker'],
      details: [
        '⚛️ Modern frontend frameworks and libraries',
        '🔧 Robust backend API development',
        '🗄️ Database design and optimization',
        '☁️ Cloud deployment and scaling',
        '🔄 CI/CD pipeline automation',
        '🐳 Containerization and orchestration'
      ]
    }
  },

  {
    id: 'ai-blockchain-peak',
    name: 'AI & Blockchain Peak',
    type: 'skill',
    position: { x: 65, y: 15 },
    icon: FaBrain,
    color: 'from-purple-500 to-pink-500',
    glowColor: 'rgba(168, 85, 247, 0.7)',
    isUnlocked: true,
    zoomLevel: 1.5,
    content: {
      title: 'AI + Blockchain Innovation',
      subtitle: 'The Future Summit 🧠',
      description: 'Reach new heights by combining artificial intelligence with blockchain technology to create next-generation solutions.',
      technologies: ['OpenAI API', 'Solidity', 'Web3.js', 'TensorFlow', 'Ethereum', 'Smart Contracts'],
      details: [
        '🤖 AI agent development and training',
        '📝 Smart contract programming and auditing',
        '🔗 DeFi protocol development',
        '💎 NFT marketplace creation',
        '🎯 Prompt engineering and optimization',
        '⛓️ Cross-chain interoperability'
      ]
    }
  },

  {
    id: 'growth-oasis',
    name: 'Growth Hacking Oasis',
    type: 'skill',
    position: { x: 60, y: 80 },
    icon: FaRocket,
    color: 'from-green-500 to-emerald-500',
    glowColor: 'rgba(34, 197, 94, 0.7)',
    isUnlocked: true,
    zoomLevel: 1.5,
    content: {
      title: 'Growth & Digital Marketing',
      subtitle: 'The Viral Oasis 🚀',
      description: 'Discover the secrets of explosive growth! Master the art of scaling audiences and creating viral content that spreads like wildfire.',
      technologies: ['Google Analytics', 'Facebook Ads', 'Telegram API', 'SEO Tools', 'A/B Testing'],
      details: [
        '📈 Data-driven growth strategies',
        '🎯 Conversion funnel optimization',
        '📱 Social media automation and engagement',
        '🔍 SEO and content marketing mastery',
        '📊 Advanced analytics and attribution',
        '💥 Viral mechanics and meme creation'
      ]
    }
  },

  // Hidden Easter Eggs (require unlocking)
  {
    id: 'secret-cave',
    name: 'Secret Developer Cave',
    type: 'easter-egg',
    position: { x: 15, y: 45 },
    icon: FaGem,
    color: 'from-yellow-500 to-orange-500',
    glowColor: 'rgba(245, 158, 11, 1)',
    isUnlocked: false,
    requiresUnlock: ['mustudents-kingdom', 'ai-empire'],
    zoomLevel: 3,
    content: {
      title: 'The Secret Developer Cave 💎',
      subtitle: 'Hidden Treasures of Code',
      description: 'You\'ve found my secret stash! Here lie the experimental projects, late-night coding sessions, and the tools that power my productivity.',
      details: [
        '🔧 Custom development tools and scripts',
        '📱 Mobile app prototypes and experiments',
        '🎨 Design systems and component libraries',
        '⚡ Performance optimization techniques',
        '🧪 Beta features and upcoming projects',
        '☕ Powered by countless cups of coffee'
      ]
    },
    treasure: {
      type: 'artifact',
      reward: 'Unlock the "Code Archaeologist" achievement!',
      animation: 'rotate'
    }
  },

  {
    id: 'achievement-shrine',
    name: 'Achievement Shrine',
    type: 'achievement',
    position: { x: 85, y: 40 },
    icon: FaTrophy,
    color: 'from-yellow-400 to-orange-500',
    glowColor: 'rgba(251, 191, 36, 1)',
    isUnlocked: false,
    requiresUnlock: ['fullstack-island', 'ai-blockchain-peak', 'growth-oasis'],
    zoomLevel: 2,
    content: {
      title: 'Hall of Achievements 🏆',
      subtitle: 'Milestones & Recognition',
      description: 'A shrine dedicated to the milestones and achievements that mark my journey in the tech world.',
      details: [
        '🎓 Self-taught developer with 5+ years experience',
        '👥 Built platform serving 30,000+ active users',
        '🏆 Successfully launched 6+ major projects',
        '💼 Expertise across 15+ programming languages',
        '🌟 Created viral content with millions of views',
        '🚀 Continuous learner and technology explorer'
      ]
    },
    treasure: {
      type: 'chest',
      reward: 'Unlock the complete achievements gallery!',
      animation: 'glow'
    }
  },

  // Contact Portal
  {
    id: 'contact-portal',
    name: 'Communication Portal',
    type: 'contact',
    position: { x: 45, y: 85 },
    icon: FaEnvelope,
    color: 'from-indigo-500 to-purple-600',
    glowColor: 'rgba(99, 102, 241, 0.8)',
    isUnlocked: true,
    zoomLevel: 2,
    content: {
      title: 'Open Communication Portal 📬',
      subtitle: 'Let\'s Connect & Collaborate',
      description: 'Ready to embark on a new adventure together? Whether you have a project idea, want to collaborate, or just want to chat about tech, this portal is always open!',
      details: [
        '📧 Email: pawanhiray1@gmail.com',
        '💼 LinkedIn: /in/pawanhiray',
        '🐙 GitHub: /hiraypawan',
        '🌐 Website: pawanhiray.vercel.app',
        '💬 Always open to new opportunities',
        '🤝 Let\'s build something amazing together!'
      ]
    }
  }
];

// Progress tracking
export interface UserProgress {
  unlockedLocations: string[];
  visitedLocations: string[];
  achievementsUnlocked: string[];
  totalExplorationTime: number;
}

export const defaultProgress: UserProgress = {
  unlockedLocations: ['intro-hub', 'mustudents-kingdom', 'ai-empire', 'crypto-citadel', 'game-dimension', 'fullstack-island', 'ai-blockchain-peak', 'growth-oasis', 'contact-portal'],
  visitedLocations: [],
  achievementsUnlocked: [],
  totalExplorationTime: 0
};

import { IconType } from 'react-icons';
import { 
  FaMobile, 
  FaCode, 
  FaBitcoin, 
  FaUsers, 
  FaRocket, 
  FaBrain,
  FaGamepad,
  FaChartLine,
  FaPalette,
  FaSearch
} from 'react-icons/fa';

export interface FloorData {
  year: number;
  age: number;
  title: string;
  subtitle: string;
  description: string;
  keyAchievements: string[];
  technologies: string[];
  highlights: {
    icon: IconType;
    text: string;
  }[];
  theme: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
  stats?: {
    label: string;
    value: string;
  }[];
}

export const elevatorFloors: FloorData[] = [
  {
    year: 2018,
    age: 16,
    title: "The Beginning",
    subtitle: "First Steps into Programming",
    description: "Started my coding journey with no-code tools and Java. Built my first Android app and discovered the magic of bringing ideas to life through code.",
    keyAchievements: [
      "Built first mobile app using Kodular (no-code)",
      "Started learning Java programming fundamentals", 
      "Explored Android Studio and mobile development",
      "Discovered passion for problem-solving through code"
    ],
    technologies: ["Java", "Android Studio", "Kodular", "XML", "SQLite"],
    highlights: [
      { icon: FaMobile, text: "First Mobile App" },
      { icon: FaCode, text: "Java Fundamentals" },
      { icon: FaRocket, text: "Programming Journey Begins" }
    ],
    theme: {
      primary: "from-blue-500 to-cyan-500",
      secondary: "from-blue-600 to-cyan-600", 
      accent: "#00bcd4",
      background: "from-slate-900 via-blue-900 to-cyan-900"
    },
    stats: [
      { label: "Age", value: "16" },
      { label: "First App", value: "Mobile" },
      { label: "Language", value: "Java" }
    ]
  },
  {
    year: 2019,
    age: 17,
    title: "Expanding Horizons", 
    subtitle: "Full-Stack & Creative Skills",
    description: "Broadened my skillset beyond mobile development. Learned full-stack web development, UI/UX design, and even explored cybersecurity basics.",
    keyAchievements: [
      "Mastered full-stack web development (MERN stack)",
      "Developed eye for UI/UX design principles",
      "Learned ethical hacking and cybersecurity basics",
      "Started photo and video editing for projects"
    ],
    technologies: ["React", "Node.js", "MongoDB", "Express", "Photoshop", "After Effects"],
    highlights: [
      { icon: FaCode, text: "Full-Stack Development" },
      { icon: FaPalette, text: "UI/UX Design" },
      { icon: FaMobile, text: "Mobile Development" }
    ],
    theme: {
      primary: "from-green-500 to-teal-500",
      secondary: "from-green-600 to-teal-600",
      accent: "#00a693", 
      background: "from-slate-900 via-green-900 to-teal-900"
    },
    stats: [
      { label: "Skills", value: "10+" },
      { label: "Stack", value: "MERN" },
      { label: "Design", value: "UI/UX" }
    ]
  },
  {
    year: 2020,
    age: 18,
    title: "Multi-Domain Mastery",
    subtitle: "Marketing, Gaming & Blockchain Pioneer", 
    description: "Diversified into digital marketing, game development, and blockchain - before crypto went mainstream. This year marked my entry into multiple high-potential domains.",
    keyAchievements: [
      "Launched successful digital marketing campaigns",
      "Built games in Unity and Unreal Engine",
      "Early blockchain/DApp development before the boom", 
      "Generated significant crypto earnings through early adoption"
    ],
    technologies: ["Unity 3D", "Unreal Engine", "Solidity", "Web3.js", "Google Ads", "Facebook Ads"],
    highlights: [
      { icon: FaChartLine, text: "Digital Marketing" },
      { icon: FaGamepad, text: "Game Development" },
      { icon: FaBitcoin, text: "Blockchain Pioneer" }
    ],
    theme: {
      primary: "from-purple-500 to-pink-500", 
      secondary: "from-purple-600 to-pink-600",
      accent: "#e91e63",
      background: "from-slate-900 via-purple-900 to-pink-900"
    },
    stats: [
      { label: "Domains", value: "3+" },
      { label: "Games Built", value: "5" },
      { label: "Crypto ROI", value: "500%+" }
    ]
  },
  {
    year: 2021,
    age: 19,
    title: "Professional Breakthrough",
    subtitle: "Real Clients & AI Early Adoption",
    description: "Started working with real US clients and began learning AI/ML - way before ChatGPT made it mainstream. This was the year I turned from hobbyist to professional.",
    keyAchievements: [
      "Secured first US client projects with impressive deliverables",
      "Started AI/Machine Learning before the ChatGPT boom",
      "Built complex full-stack applications for real businesses",
      "Established professional development workflows"
    ],
    technologies: ["React", "Node.js", "Python", "TensorFlow", "AWS", "Docker", "PostgreSQL"],
    highlights: [
      { icon: FaUsers, text: "US Clients" },
      { icon: FaBrain, text: "AI Early Adopter" }, 
      { icon: FaRocket, text: "Professional Projects" }
    ],
    theme: {
      primary: "from-orange-500 to-red-500",
      secondary: "from-orange-600 to-red-600", 
      accent: "#ff5722",
      background: "from-slate-900 via-orange-900 to-red-900"
    },
    stats: [
      { label: "Clients", value: "US-Based" },
      { label: "Projects", value: "10+" },
      { label: "AI Focus", value: "Pre-GPT" }
    ]
  },
  {
    year: 2022,
    age: 20,
    title: "Community Impact",
    subtitle: "MuStudentsUnited & AI Automation", 
    description: "Built MuStudentsUnited platform serving 30,000+ students. Dove deep into AI automation and advanced blockchain projects, making real impact in education.",
    keyAchievements: [
      "Launched MuStudentsUnited - helped 30,000+ Mumbai University students",
      "Developed AI automation tools for various industries", 
      "Built complex blockchain applications and smart contracts",
      "Established myself as a community builder and problem solver"
    ],
    technologies: ["React", "Node.js", "AI APIs", "Blockchain", "Smart Contracts", "MongoDB"],
    highlights: [
      { icon: FaUsers, text: "30k+ Students Helped" },
      { icon: FaBrain, text: "AI Automation" },
      { icon: FaBitcoin, text: "Advanced Blockchain" }
    ],
    theme: {
      primary: "from-indigo-500 to-purple-500",
      secondary: "from-indigo-600 to-purple-600",
      accent: "#673ab7", 
      background: "from-slate-900 via-indigo-900 to-purple-900"
    },
    stats: [
      { label: "Students", value: "30k+" },
      { label: "Platform", value: "MuStudentsUnited" },
      { label: "Impact", value: "Education" }
    ]
  },
  {
    year: 2023,
    age: 21, 
    title: "Growth & Trading",
    subtitle: "Social Media Growth & Meme Coins",
    description: "Focused on social media growth, advanced SEO, and strategic meme coin trading. Mastered growth hacking techniques and viral content creation.",
    keyAchievements: [
      "Grew social media channels to significant followings",
      "Mastered advanced SEO and content marketing strategies",
      "Successful meme coin trading with strategic timing",
      "Created viral content and growth automation systems"
    ],
    technologies: ["Social Media APIs", "SEO Tools", "Trading Bots", "Content Management", "Analytics"],
    highlights: [
      { icon: FaRocket, text: "Viral Growth" },
      { icon: FaSearch, text: "SEO Mastery" },
      { icon: FaChartLine, text: "Meme Coin Trading" }
    ],
    theme: {
      primary: "from-yellow-500 to-orange-500",
      secondary: "from-yellow-600 to-orange-600",
      accent: "#ff9800",
      background: "from-slate-900 via-yellow-900 to-orange-900"  
    },
    stats: [
      { label: "Growth", value: "Viral" },
      { label: "Trading", value: "Strategic" },
      { label: "Content", value: "Viral" }
    ]
  },
  {
    year: 2024,
    age: 22,
    title: "Expert Level",
    subtitle: "Crypto Trading & AI+Web3 Mastery",
    description: "Reached expert level in crypto trading and AI+Web3 integration. Built multiple projects solving real-world problems with cutting-edge technology.",
    keyAchievements: [
      "Advanced crypto trading strategies with consistent profits",
      "Mastered AI + Web3 integration for innovative solutions",
      "Launched multiple projects solving real-world problems", 
      "Established expertise in emerging technology intersections"
    ],
    technologies: ["Advanced Trading", "AI Integration", "Web3", "DeFi", "Smart Contracts", "Machine Learning"],
    highlights: [
      { icon: FaBitcoin, text: "Crypto Expert" },
      { icon: FaBrain, text: "AI+Web3 Master" },
      { icon: FaRocket, text: "Real Solutions" }
    ],
    theme: {
      primary: "from-emerald-500 to-green-500", 
      secondary: "from-emerald-600 to-green-600",
      accent: "#4caf50",
      background: "from-slate-900 via-emerald-900 to-green-900"
    },
    stats: [
      { label: "Trading", value: "Expert" },
      { label: "AI+Web3", value: "Master" },
      { label: "Projects", value: "Real Impact" }
    ]
  },
  {
    year: 2025,
    age: 23,
    title: "Future Builder", 
    subtitle: "AI/ML & Blockchain Innovation",
    description: "Currently advancing in AI/ML and blockchain development. Building the future with cutting-edge technology and innovative solutions that push boundaries.",
    keyAchievements: [
      "Ongoing advanced AI/ML research and implementation",
      "Building next-generation blockchain/Web3 solutions",
      "Mentoring others and sharing knowledge with community",
      "Pushing the boundaries of what's possible with technology"
    ],
    technologies: ["Advanced AI/ML", "Next-Gen Blockchain", "Web3 Innovation", "Research & Development"],
    highlights: [
      { icon: FaBrain, text: "AI/ML Research" },
      { icon: FaBitcoin, text: "Blockchain Innovation" },
      { icon: FaRocket, text: "Future Tech" }
    ],
    theme: {
      primary: "from-violet-500 to-purple-500",
      secondary: "from-violet-600 to-purple-600", 
      accent: "#9c27b0",
      background: "from-slate-900 via-violet-900 to-purple-900"
    },
    stats: [
      { label: "Research", value: "AI/ML" },
      { label: "Innovation", value: "Web3" },
      { label: "Future", value: "Building" }
    ]
  }
];

export const elevatorConfig = {
  totalFloors: elevatorFloors.length,
  floorHeight: 100, // vh units
  transitionDuration: 1.5, // seconds
  doorAnimationDuration: 0.8, // seconds
};

# Pawan Hiray – Portfolio 🚀

**🌐 Live Portfolio**: [pawanhiray.vercel.app](https://pawanhiray.vercel.app/)

Hi! I'm Pawan, a full-stack developer, AI & Web3 builder, and growth hacker.  
This site showcases my work, skills, and projects.  
Built using [Next.js](https://nextjs.org), [Tailwind CSS](https://tailwindcss.com), and hosted on [Vercel](https://vercel.com).

## 🌟 Features

- **Modern Design**: Cosmic dark theme with smooth animations
- **Responsive**: Works perfectly on all devices
- **Performance**: Optimized with Next.js 14 and App Router
- **Accessibility**: Built with semantic HTML and ARIA labels
- **SEO Optimized**: Meta tags and structured data
- **Dark/Light Mode**: Theme toggle with system preference detection
- **Interactive Book Portfolio**: Additional book-style SPA with page transitions

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Typography**: Geist Sans & Geist Mono
- **Deployment**: Vercel
- **Additional**: Interactive Book Portfolio with vanilla HTML/CSS/JS

## 🚀 Getting Started

### Next.js Portfolio
1. **Clone the repository**:
   ```bash
   git clone https://github.com/hiraypawan/Portfolio.git
# 🚀 Enhanced Interactive Portfolio

A modern, interactive portfolio website featuring advanced animations, particle effects, and responsive design.

## ✨ Recent Updates

### 🎨 Visual Enhancements
- **Removed zoom scaling** for better readability and performance
- **Enhanced color palette** with 6 different gradient themes
- **Improved mouse trail** with coding/money-themed emojis (💰, {}, $, etc.)
- **Section-specific colors** for better visual hierarchy
- **Larger text sizes** for improved accessibility

### 🚀 Performance Optimizations
- **Optimized particle system** (capped at 60 particles)
- **Efficient animations** using transform and opacity
- **Debounced mouse events** for smoother performance
- **Hardware acceleration** with will-change properties

### 📱 Mobile Improvements
- **Better responsive design** with improved touch interactions
- **Optimized font scaling** for all device sizes
- **Enhanced button sizes** for mobile usability

## 🎯 Key Features

- **Interactive particle background** with dynamic connections
- **Multi-section navigation** with smooth floor-based transitions
- **Sound effects** for enhanced user experience
- **Glass morphism design** with blur effects
- **Animated skill bars** and timeline
- **Contact form** with real-time validation
- **Custom mouse trail** with developer-themed symbols

## Portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

### Book Portfolio
Alternatively, you can open `index.html` directly in your browser for the interactive book experience.

## 📁 Project Structure

```
Portfolio/
├── index.html              # Interactive book portfolio
├── assets/                 # Book portfolio assets
│   ├── css/style.css      # Book styling
│   ├── js/main.js         # Book interactivity
│   └── audio/             # Sound effects
├── src/                   # Next.js application
│   ├── app/
│   │   ├── globals.css    # Global styles
│   │   ├── layout.tsx     # Root layout
│   │   └── page.tsx       # Main page
│   ├── components/        # React components
│   └── lib/              # Utilities
└── ...
```

## 🎨 Customization

### Colors
The cosmic theme colors are defined in `globals.css`:
- Cosmic palette: `cosmic-900` to `cosmic-100`
- Neon accents: `neon-blue`, `neon-purple`, `neon-pink`

### Content
Update the content in each component:
- Personal info in `hero.tsx`
- Skills in `about.tsx` and `expertise.tsx`
- Projects in `projects.tsx`
- Contact details in `contact.tsx`

## 📧 Contact Form

The contact form is ready for integration with:
- [Formspree](https://formspree.io/)
- [Resend](https://resend.com/)
- [EmailJS](https://www.emailjs.com/)

Update the form handler in `contact.tsx` with your preferred service.

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Deploy with zero configuration

### Other Platforms
- **Netlify**: `npm run build && npm run export`
- **GitHub Pages**: Use `next export` for static deployment

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

⭐ **Star this repo if you found it helpful!**

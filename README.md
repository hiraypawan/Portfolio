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

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Typography**: Geist Sans & Geist Mono
- **Deployment**: Vercel

## 🚀 Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/hiraypawan/Portfolio.git
   cd Portfolio
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

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css      # Global styles and Tailwind config
│   ├── layout.tsx       # Root layout with theme provider
│   └── page.tsx         # Main page component
├── components/
│   ├── about.tsx        # About section
│   ├── contact.tsx      # Contact section with form
│   ├── expertise.tsx    # Skills and expertise
│   ├── footer.tsx       # Footer component
│   ├── header.tsx       # Navigation header
│   ├── hero.tsx         # Hero section
│   ├── projects.tsx     # Projects showcase
│   ├── theme-provider.tsx
│   └── theme-toggle.tsx
└── lib/                 # Utility functions
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

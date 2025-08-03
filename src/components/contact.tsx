'use client';

import { motion } from 'framer-motion';
import { Mail, Send } from 'lucide-react';
import { useState } from 'react';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would integrate with Formspree, Resend, or another email service
    console.log('Form submitted:', formData);
    // For now, we'll just alert the user
    alert('Thank you for your message! I&apos;ll get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-cosmic-800 to-cosmic-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-neon-purple to-neon-blue bg-clip-text text-transparent">
              Let&apos;s Connect
            </span>
          </h2>
          <p className="text-xl text-cosmic-300 max-w-2xl mx-auto">
            Ready to collaborate on your next project? I&apos;m open to freelance work,
            partnerships, and exciting startup opportunities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-cosmic-100 mb-4">
                Get in Touch
              </h3>
              <p className="text-cosmic-300 text-lg leading-relaxed mb-6">
                I&apos;m always excited to discuss new opportunities, innovative projects,
                and ways we can work together to create something amazing.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-r from-neon-purple to-neon-blue rounded-lg">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-cosmic-100 font-semibold">Email</h4>
                  <a 
                    href="mailto:pawanhiray1@gmail.com"
                    className="text-neon-blue hover:text-neon-purple transition-colors"
                  >
                    pawanhiray1@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-cosmic-800/50 backdrop-blur-sm border border-cosmic-700/50 rounded-xl p-6">
              <h4 className="text-cosmic-100 font-semibold mb-3">
                What I&apos;m looking for:
              </h4>
              <ul className="text-cosmic-300 space-y-2">
                <li>• Freelance development projects</li>
                <li>• Startup collaborations</li>
                <li>• AI & Web3 consulting opportunities</li>
                <li>• Growth hacking partnerships</li>
              </ul>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-cosmic-200 font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-cosmic-800/50 border border-cosmic-700/50 rounded-lg text-cosmic-100 placeholder-cosmic-400 focus:outline-none focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 transition-all duration-200"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-cosmic-200 font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-cosmic-800/50 border border-cosmic-700/50 rounded-lg text-cosmic-100 placeholder-cosmic-400 focus:outline-none focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 transition-all duration-200"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-cosmic-200 font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-cosmic-800/50 border border-cosmic-700/50 rounded-lg text-cosmic-100 placeholder-cosmic-400 focus:outline-none focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 transition-all duration-200 resize-none"
                  placeholder="Tell me about your project or idea..."
                />
              </div>

              <button
                type="submit"
                className="w-full px-8 py-3 bg-gradient-to-r from-neon-purple to-neon-blue text-white font-semibold rounded-lg hover:from-neon-blue hover:to-neon-purple transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-neon-purple/25 flex items-center justify-center space-x-2"
              >
                <Send className="w-5 h-5" />
                <span>Send Message</span>
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

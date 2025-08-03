'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Message sent!'); // Simulate form submission
    setFormData({ name: '', email: '', message: '' });
  };
  return (
    <div className="relative h-full bg-gradient-to-br from-slate-900 via-teal-900/30 to-slate-900 overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600/10 to-cyan-600/10 animate-pulse" />
      </div>

      <div className="flex flex-col items-center justify-center h-full text-center z-10 relative px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-bold text-white mb-6 font-space-grotesk">
            Contact Me
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Open to freelance, collaborations, and startup ideas.
          </p>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-8 max-w-lg w-full"
        >
          <div className="mb-4">
            <label className="block text-left text-gray-300 mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-transparent border border-gray-300 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-left text-gray-300 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-transparent border border-gray-300 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-left text-gray-300 mb-2">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-transparent border border-gray-300 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
            />
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 px-8 py-3 bg-gradient-to-r from-teal-500 to-blue-600 text-white font-semibold rounded-full hover:from-teal-600 hover:to-blue-700 transition-all duration-300 shadow-lg"
          >
            Send Message
          </motion.button>
        </motion.form>

        {/* Contact Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-8 space-y-4"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              href="mailto:pawanhiray1@gmail.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full transition-all duration-300 shadow-lg"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              Email Me
            </motion.a>
            
            <motion.a
              href="https://www.linkedin.com/in/pawan-hiray%E2%9C%AA%F0%9F%92%8E-999bb32a6/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-all duration-300 shadow-lg"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
              </svg>
              LinkedIn
            </motion.a>
          </div>
          
          <div className="text-center text-gray-400 text-sm">
            Or fill out the form above and I&apos;ll get back to you soon!
          </div>
        </motion.div>
      </div>
    </div>
  );
}

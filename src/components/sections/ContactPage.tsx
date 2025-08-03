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

        {/* Email Information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-12 text-gray-400 text-sm"
        >
          Alternatively, reach me via email:
          <a href="mailto:pawanhiray1@gmail.com" className="text-blue-400 hover:underline ml-1">pawanhiray1@gmail.com</a>
        </motion.div>
      </div>
    </div>
  );
}

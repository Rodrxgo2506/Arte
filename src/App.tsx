/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import Gallery from './components/Gallery';
import Newsletter from './components/Newsletter';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initial load timer for the elegant fine-art intro animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 antialiased selection:bg-indigo-100 selection:text-indigo-900" id="app-root">
      <AnimatePresence mode="wait">
        {isLoading ? (
          /* Subtle and highly refined fine-art intro splash loader */
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 flex flex-col justify-center items-center bg-white"
            id="app-preloader"
          >
            <div className="text-center px-6 relative flex flex-col items-center">
              {/* Subtle animated stardust ring representing vision */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: [0, 0.4, 0.1, 0.5, 0], scale: [1, 1.15, 1.05, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute w-44 h-44 rounded-full border border-indigo-200/40 -z-10"
              />

              {/* Shamanic brand star */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="mb-6 text-indigo-600/70"
              >
                <Sparkles size={24} className="animate-pulse" />
              </motion.div>

              {/* Spaced logo */}
              <motion.h1
                initial={{ opacity: 0, letterSpacing: '0.15em' }}
                animate={{ opacity: 1, letterSpacing: '0.3em' }}
                transition={{ duration: 1.8, ease: 'easeInOut', delay: 0.2 }}
                className="font-serif text-3xl md:text-5xl font-light text-slate-900 uppercase tracking-[0.3em]"
              >
                LUIS TAMANI
              </motion.h1>

              {/* Horizontal rule that draws itself */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '80px' }}
                transition={{ duration: 1.2, ease: 'easeInOut', delay: 0.8 }}
                className="h-[1px] bg-indigo-500/30 my-5"
              />

              {/* Visionary Art label */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ duration: 1.2, delay: 1.2 }}
                className="text-[10px] font-mono tracking-[0.4em] text-slate-500 uppercase"
              >
                VISIONARY ART &bull; PERÚ
              </motion.p>
            </div>
          </motion.div>
        ) : (
          /* Main Landing Page contents */
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex flex-col min-h-screen"
            id="main-app-container"
          >
            {/* Nav Menu */}
            <Navbar onOpenAdmin={() => setIsAdminOpen(true)} />

            {/* Core sections */}
            <Hero />

            {/* Hidden Floating Local Database Inspector Overlay */}
            <AnimatePresence>
              {isAdminOpen && (
                <AdminPanel isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

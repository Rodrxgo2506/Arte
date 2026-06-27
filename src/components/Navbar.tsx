/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Instagram, Facebook, Shield, Menu, X, ArrowRight } from 'lucide-react';

interface NavbarProps {
  onOpenAdmin: () => void;
}

export default function Navbar({ onOpenAdmin }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        id="main-navbar"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${isScrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm py-4'
          : 'bg-transparent py-6'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo Brand */}
          <div className="flex flex-col cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} id="nav-brand">
            <span className={`font-serif text-lg md:text-xl font-medium tracking-[0.25em] transition-colors duration-300 ${isScrolled ? 'text-slate-900' : 'text-white'
              }`}>
              LUIS TAMANI
            </span>
            <span className={`text-[9px] font-mono tracking-[0.35em] mt-0.5 uppercase transition-colors duration-300 ${isScrolled ? 'text-indigo-600/80' : 'text-indigo-300'
              }`}>
              Visionary Art
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8" id="nav-links-desktop">
            <button
              onClick={() => scrollToSection('gallery-section')}
              className={`text-xs tracking-widest font-medium uppercase transition-colors duration-300 ${isScrolled ? 'text-slate-600 hover:text-indigo-600' : 'text-white/80 hover:text-white'
                }`}
            >
              Galería Curada
            </button>
            <button
              onClick={() => scrollToSection('philosophy-section')}
              className={`text-xs tracking-widest font-medium uppercase transition-colors duration-300 ${isScrolled ? 'text-slate-600 hover:text-indigo-600' : 'text-white/80 hover:text-white'
                }`}
            >
              Filosofía
            </button>
            <button
              onClick={() => scrollToSection('newsletter-section')}
              className={`text-xs tracking-widest font-medium uppercase transition-colors duration-300 ${isScrolled ? 'text-slate-600 hover:text-indigo-600' : 'text-white/80 hover:text-white'
                }`}
            >
              Boletín
            </button>
            <button
              onClick={() => scrollToSection('contact-section')}
              className={`text-xs tracking-widest font-medium uppercase transition-colors duration-300 ${isScrolled ? 'text-slate-600 hover:text-indigo-600' : 'text-white/80 hover:text-white'
                }`}
            >
              Contacto
            </button>
          </div>

          {/* Socials */}
          <div className="hidden md:flex items-center space-x-4" id="nav-socials-desktop">
            <a
              href="https://www.instagram.com/luistamani.visionart"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 transition-colors duration-300 ${isScrolled ? 'text-slate-500 hover:text-indigo-600' : 'text-white/70 hover:text-white'
                }`}
              title="Sigue en Instagram"
            >
              <Instagram size={17} />
            </a>
            <a
              href="https://www.facebook.com/LuisTamani"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 transition-colors duration-300 ${isScrolled ? 'text-slate-500 hover:text-indigo-600' : 'text-white/70 hover:text-white'
                }`}
              title="Sigue en Facebook"
            >
              <Facebook size={17} />
            </a>
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden flex items-center space-x-3" id="nav-actions-mobile">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 transition-colors duration-300 focus:outline-none ${isScrolled ? 'text-slate-700 hover:text-indigo-600' : 'text-white hover:text-indigo-200'
                }`}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 z-30 bg-white/98 transition-all duration-500 flex flex-col justify-between ${mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
          }`}
        id="mobile-menu-drawer"
      >
        <div className="flex-1 flex flex-col justify-center items-center space-y-8 px-6 pt-24">
          <button
            onClick={() => scrollToSection('gallery-section')}
            className="text-base tracking-[0.2em] text-slate-800 hover:text-indigo-600 font-serif font-medium uppercase transition-colors"
          >
            Galería Curada
          </button>
          <button
            onClick={() => scrollToSection('philosophy-section')}
            className="text-base tracking-[0.2em] text-slate-800 hover:text-indigo-600 font-serif font-medium uppercase transition-colors"
          >
            Filosofía
          </button>
          <button
            onClick={() => scrollToSection('newsletter-section')}
            className="text-base tracking-[0.2em] text-slate-800 hover:text-indigo-600 font-serif font-medium uppercase transition-colors"
          >
            Boletín
          </button>
          <button
            onClick={() => scrollToSection('contact-section')}
            className="text-base tracking-[0.2em] text-slate-800 hover:text-indigo-600 font-serif font-medium uppercase transition-colors"
          >
            Contacto
          </button>
        </div>

        {/* Mobile Menu Footer */}
        <div className="p-10 border-t border-slate-50 flex flex-col items-center space-y-4 bg-slate-50/50">
          <div className="flex space-x-6">
            <a
              href="https://www.instagram.com/luistamani.visionart"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-indigo-600 transition-colors"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://www.facebook.com/LuisTamani"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-indigo-600 transition-colors"
            >
              <Facebook size={20} />
            </a>
          </div>
          <p className="text-[10px] text-slate-400 font-mono">
            luistamani.atelier@gmail.com
          </p>
        </div>
      </div>
    </>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Instagram, Facebook } from 'lucide-react';

interface NavbarProps {
  onOpenAdmin: () => void;
}

export default function Navbar({ onOpenAdmin }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);

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

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${isScrolled
          ? 'bg-slate-950/90 backdrop-blur-md border-b border-white/5 py-4'
          : 'bg-transparent py-6'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo Brand */}
        <div className="flex flex-col cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} id="nav-brand">
          <span className="font-serif text-lg md:text-xl font-medium tracking-[0.25em] text-white">
            LUIS TAMANI
          </span>
          <span className="text-[9px] font-mono tracking-[0.35em] mt-0.5 uppercase text-indigo-300">
            Visionary Art
          </span>
        </div>

        {/* Socials - Visible on all screens */}
        <div className="flex items-center space-x-4" id="nav-socials-desktop">
          <a
            href="https://www.instagram.com/luistamani.visionart"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-white/70 hover:text-white transition-colors duration-300"
            title="Sigue en Instagram"
          >
            <Instagram size={17} />
          </a>
          <a
            href="https://www.facebook.com/LuisTamani"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-white/70 hover:text-white transition-colors duration-300"
            title="Sigue en Facebook"
          >
            <Facebook size={17} />
          </a>
        </div>
      </div>
    </nav>
  );
}

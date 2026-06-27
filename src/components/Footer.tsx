/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Instagram, Facebook, Mail, ShieldAlert, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenAdmin: () => void;
}

export default function Footer({ onOpenAdmin }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="main-footer" className="bg-slate-50 border-t border-slate-100 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-6">
            <div className="flex flex-col cursor-pointer" onClick={scrollToTop}>
              <span className="font-serif text-xl tracking-[0.25em] text-slate-900 font-medium">
                LUIS TAMANI
              </span>
              <span className="text-[10px] font-mono tracking-[0.3em] text-indigo-600 mt-1 uppercase">
                Visionary Art
              </span>
            </div>
            <p className="text-xs md:text-sm text-slate-500 font-light leading-relaxed max-w-sm">
              Inspirado por el reino vegetal de la selva amazónica y sus maestros sagrados, Luis Tamani plasma en óleos la conexión profunda entre los seres vivos y la sabiduría de la Madre Tierra.
            </p>
          </div>

          {/* Quick Links Col */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400 font-semibold">
              Explorar Sitio
            </h4>
            <ul className="space-y-2.5 text-xs tracking-wider">
              <li>
                <button
                  onClick={() => scrollToSection('gallery-section')}
                  className="text-slate-600 hover:text-indigo-600 transition-colors uppercase font-medium"
                >
                  Galería Curada
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('philosophy-section')}
                  className="text-slate-600 hover:text-indigo-600 transition-colors uppercase font-medium"
                >
                  Filosofía del Arte
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('newsletter-section')}
                  className="text-slate-600 hover:text-indigo-600 transition-colors uppercase font-medium"
                >
                  Boletín del Taller
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contact-section')}
                  className="text-slate-600 hover:text-indigo-600 transition-colors uppercase font-medium"
                >
                  Contacto
                </button>
              </li>
            </ul>
          </div>

          {/* Atelier Details Col */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400 font-semibold">
              Taller de Creación
            </h4>
            <div className="space-y-3 text-xs leading-relaxed font-light text-slate-600">
              <p>Pucallpa, Amazonía Peruana</p>
              <p className="font-mono">luistamani.atelier@gmail.com</p>
              <div className="flex space-x-4 pt-2">
                <a
                  href="https://www.instagram.com/luistamani.visionart"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-indigo-600 transition-colors"
                >
                  <Instagram size={16} />
                </a>
                <a
                  href="https://www.facebook.com/LuisTamani"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-indigo-600 transition-colors"
                >
                  <Facebook size={16} />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="border-t border-slate-200/60 pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-[10px] font-mono text-slate-400 text-center sm:text-left">
            <span>
              &copy; {new Date().getFullYear()} Luis Tamani Visionary Art. Todos los derechos reservados.
            </span>
            <span className="hidden sm:inline-block">|</span>
            <span>Atelier en Renovación Digital</span>
          </div>

          <div className="flex items-center space-x-4">
            {/* Subtle Sandbox Inspector button */}
            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-slate-200/50 hover:bg-slate-200 text-[10px] font-mono text-slate-500 hover:text-slate-700 transition-colors rounded-lg"
              title="Administrar base de datos local de consultas"
              id="footer-admin-button"
            >
              <ShieldAlert size={12} />
              <span>Inspector de Pruebas</span>
            </button>

            <button
              onClick={scrollToTop}
              className="p-2 border border-slate-200 text-slate-400 hover:text-slate-700 hover:border-slate-400 transition-all rounded-full"
              title="Volver arriba"
              id="footer-scroll-top-button"
            >
              <ArrowUp size={14} />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}

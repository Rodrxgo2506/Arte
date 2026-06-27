/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ARTWORKS } from '../data/artworks';
import { Artwork } from '../types';
import { X, Calendar, Frame, Maximize2, ArrowRight, Palette, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Gallery() {
  const [filter, setFilter] = useState<'Todos' | 'Medicina' | 'Cosmos' | 'Naturaleza'>('Todos');
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);

  const filteredArtworks = filter === 'Todos'
    ? ARTWORKS
    : ARTWORKS.filter(art => art.category === filter);

  const handleInquire = (title: string) => {
    setSelectedArtwork(null);
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Autofill form inputs by searching for them
    setTimeout(() => {
      const subjectInput = document.getElementById('contact-subject') as HTMLInputElement;
      if (subjectInput) {
        subjectInput.value = `Consulta sobre obra: "${title}"`;
        // Trigger synthetic input change to update state if necessary
        const event = new Event('input', { bubbles: true });
        subjectInput.dispatchEvent(event);
      }
      const messageInput = document.getElementById('contact-message') as HTMLTextAreaElement;
      if (messageInput) {
        messageInput.value = `Hola Luis,\n\nEstoy muy interesado en conocer más detalles sobre tu maravillosa obra de arte "${title}" (${selectedArtwork?.year || '2024'}). Me gustaría saber si habrá reproducciones disponibles de alta fidelidad o ediciones limitadas en el nuevo catálogo.\n\nSaludos cordiales,`;
        const event = new Event('input', { bubbles: true });
        messageInput.dispatchEvent(event);
      }
    }, 450);
  };

  return (
    <section id="gallery-section" className="py-24 md:py-36 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Gallery Header */}
        <div className="text-center max-w-2xl mx-auto mb-16" id="gallery-header">
          <span className="text-xs font-mono tracking-[0.3em] text-indigo-600 uppercase font-bold mb-3 block">
            Exhibición Temporal
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-light text-slate-950 tracking-wide mb-6">
            Colección de Selección Curada
          </h2>
          <div className="w-12 h-[1px] bg-slate-200 mx-auto mb-6" />
          <p className="text-sm md:text-base text-slate-500 font-light leading-relaxed">
            Una muestra representativa de las obras de Luis Tamani que plasman la interconexión espiritual, la biodiversidad medicinal y la cosmovisión selvática.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 md:mb-16" id="gallery-filters">
          {(['Todos', 'Medicina', 'Cosmos', 'Naturaleza'] as const).map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-2.5 text-xs font-mono tracking-widest uppercase transition-all duration-300 ${
                filter === category
                  ? 'bg-indigo-900 text-white shadow-md shadow-indigo-950/10'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Artworks Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          id="gallery-grid"
        >
          <AnimatePresence mode="popLayout">
            {filteredArtworks.map((art) => (
              <motion.div
                layout
                key={art.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                onClick={() => setSelectedArtwork(art)}
                className="group cursor-pointer flex flex-col bg-slate-50 overflow-hidden border border-slate-100/50 hover:shadow-xl hover:border-slate-200/60 transition-all duration-300"
              >
                {/* Image Container with hover zoom & absolute display */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-100">
                  <img
                    src={art.imageUrl}
                    alt={art.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle Elegant Hover Overlay */}
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-white/90 text-indigo-900 flex items-center justify-center transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 shadow-lg">
                      <Maximize2 size={16} />
                    </div>
                  </div>
                  {/* Category Label */}
                  <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-[9px] font-mono tracking-widest text-indigo-700 font-semibold uppercase px-2.5 py-1">
                    {art.category}
                  </span>
                </div>

                {/* Info Area */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
                      <span>{art.medium}</span>
                      <span>{art.year}</span>
                    </div>
                    <h3 className="font-serif text-lg text-slate-950 font-medium tracking-wide group-hover:text-indigo-700 transition-colors">
                      {art.title}
                    </h3>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-200/60 flex items-center justify-between text-xs font-mono tracking-widest text-indigo-600/90 font-medium">
                    <span>VER DETALLES</span>
                    <ArrowRight size={12} className="transform -translate-x-1 group-hover:translate-x-0 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox / Details Modal */}
      <AnimatePresence>
        {selectedArtwork && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10" id="gallery-lightbox">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArtwork(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="relative w-full max-w-5xl h-[85vh] md:h-auto md:max-h-[85vh] bg-white shadow-2xl rounded-2xl overflow-hidden flex flex-col md:flex-row border border-white/10"
              id="gallery-lightbox-content"
            >
              {/* Image side */}
              <div className="md:w-1/2 relative bg-slate-950 flex items-center justify-center overflow-hidden h-[40%] md:h-auto">
                <img
                  src={selectedArtwork.imageUrl}
                  alt={selectedArtwork.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
              </div>

              {/* Text / Details side */}
              <div className="md:w-1/2 p-6 md:p-10 overflow-y-auto flex flex-col justify-between h-[60%] md:h-auto bg-white">
                <div>
                  {/* Close button inside modal on mobile, or float top-right */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] font-mono tracking-[0.25em] text-indigo-600 uppercase font-semibold">
                      {selectedArtwork.category} — {selectedArtwork.year}
                    </span>
                    <button
                      onClick={() => setSelectedArtwork(null)}
                      className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  {/* Title & Technical list */}
                  <h3 className="font-serif text-2xl md:text-3xl text-slate-950 font-medium tracking-wide mb-6">
                    {selectedArtwork.title}
                  </h3>

                  <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl mb-6 text-xs font-mono text-slate-600">
                    <div className="flex items-center space-x-2">
                      <Palette size={14} className="text-slate-400" />
                      <div>
                        <span className="block text-[10px] text-slate-400 uppercase">Técnica</span>
                        <span className="font-medium">{selectedArtwork.medium}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Frame size={14} className="text-slate-400" />
                      <div>
                        <span className="block text-[10px] text-slate-400 uppercase">Dimensiones</span>
                        <span className="font-medium">{selectedArtwork.dimensions}</span>
                      </div>
                    </div>
                  </div>

                  {/* Description & Mystical Meaning */}
                  <div className="space-y-4 text-sm leading-relaxed text-slate-600">
                    <div>
                      <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1">
                        Reseña de la Obra
                      </span>
                      <p className="font-light">{selectedArtwork.description}</p>
                    </div>
                    
                    <div className="border-t border-slate-100 pt-4 mt-4">
                      <span className="block text-[10px] font-mono uppercase tracking-wider text-indigo-500 mb-1 font-semibold flex items-center space-x-1">
                        <Eye size={12} />
                        <span>Significado Espiritual & Filosofía</span>
                      </span>
                      <p className="font-serif italic text-slate-700 leading-relaxed font-light">
                        &ldquo;{selectedArtwork.philosophy}&rdquo;
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer Inquire Action */}
                <div className="pt-6 border-t border-slate-100 mt-8 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
                  <p className="text-xs text-slate-400 font-mono">
                    * El taller está preparando impresiones oficiales de archivo.
                  </p>
                  <button
                    onClick={() => handleInquire(selectedArtwork.title)}
                    className="px-6 py-3 bg-indigo-900 hover:bg-indigo-800 text-white text-xs font-semibold uppercase tracking-[0.15em] rounded-none transition-colors duration-300 text-center"
                  >
                    Consultar disponibilidad
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

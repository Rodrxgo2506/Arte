/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Quote, Sparkles } from 'lucide-react';

export default function Philosophy() {
  return (
    <section
      id="philosophy-section"
      className="py-24 md:py-36 bg-slate-50 relative overflow-hidden"
    >
      {/* Structural subtle decorative details */}
      <div className="absolute top-0 right-0 w-1/3 h-full border-l border-slate-100 hidden lg:block" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Image with elegant floating frames */}
          <div className="lg:col-span-5 relative" id="philosophy-image-container">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[3/4] w-full bg-slate-200 overflow-hidden shadow-2xl border border-white"
            >
              {/* Mystical jungle light through trees */}
              <img
                src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=800&auto=format&fit=crop"
                alt="Mystical foggy jungle, representing Luis Tamani's childhood in Pucallpa"
                className="w-full h-full object-cover transition-transform duration-[4000ms] hover:scale-105"
                referrerPolicy="no-referrer"
              />
              {/* Inner dark gradient overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent" />
            </motion.div>

            {/* Decorative Offset Border */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border border-indigo-200 pointer-events-none -z-10 translate-x-2 translate-y-2 hidden sm:block" />
            
            {/* Tiny vertical geo coordinates or text, mimicking gallery layout */}
            <div className="absolute -left-12 bottom-20 origin-bottom -rotate-90 text-[9px] font-mono tracking-[0.3em] text-slate-400 uppercase hidden xl:block">
              Pucallpa, Amazonía Peruana — 8.3801° S, 74.5439° W
            </div>
          </div>

          {/* Right Column: Text & philosophy details */}
          <div className="lg:col-span-7 flex flex-col justify-center" id="philosophy-text-container">
            {/* Section Tag */}
            <span className="text-xs font-mono tracking-[0.3em] text-indigo-600 uppercase font-bold mb-4 block">
              Filosofía Creativa
            </span>
            
            {/* Main title in refined serif */}
            <h2 className="font-serif text-3xl md:text-5xl font-light text-slate-950 tracking-wide leading-tight mb-8">
              El lenguaje de las Plantas Maestras
            </h2>

            {/* Quote Block */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative border-l border-indigo-500 pl-6 mb-8 py-2"
              id="philosophy-quote"
            >
              <Quote size={24} className="text-indigo-200 absolute -top-4 left-2 -z-10" />
              <p className="font-serif text-lg md:text-xl italic text-slate-800 leading-relaxed font-light">
                &ldquo;El arte es un puente visual que traduce los cantos de la naturaleza. No represento el bosque de manera externa; plasmo el diálogo íntimo entre el espíritu de la planta y la conciencia humana.&rdquo;
              </p>
              <cite className="text-xs font-mono tracking-widest text-indigo-600/80 uppercase font-semibold block mt-3 not-italic">
                — Luis Tamani
              </cite>
            </motion.div>

            {/* Narrative Paragraphs */}
            <div className="space-y-6 text-sm md:text-base text-slate-600 leading-relaxed font-light">
              <p>
                Nacido en <strong>Pucallpa</strong>, a orillas del río Ucayali en el Amazonas peruano, Luis Tamani creció rodeado de la inmensidad del bosque y el río. Formado académicamente en la prestigiosa <em>Escuela Superior de Formación Artística Eduardo Meza Saravia</em>, inició su carrera artística en el realismo y el retrato clásico.
              </p>
              <p>
                Su camino tomó un giro espiritual profundo al adentrarse en la medicina tradicional amazónica y las plantas maestras como la Ayahuasca. A partir de esa conexión directa, comenzó a plasmar visiones metafísicas donde el cuerpo humano se disuelve en lianas, hojas de chacruna, plumas de aves medicinales y miradas de jaguares protectores.
              </p>
              <p>
                Hoy en día, su obra es reconocida internacionalmente por su precisión técnica, su atmósfera mística y su habilidad para transmitir la vibración viva del bosque. Su taller en renovación prepara nuevas colecciones que seguirán explorando el misterio de la vida interconectada.
              </p>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-2 gap-6 mt-10 pt-8 border-t border-slate-200/60" id="philosophy-highlights">
              <div>
                <h4 className="font-mono text-xs text-indigo-600 uppercase tracking-widest font-semibold mb-1">
                  Visión Cósmica
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed font-light">
                  Unión simbiótica del ser humano, las plantas maestras y la fauna salvaje en un solo plano espiritual.
                </p>
              </div>
              <div>
                <h4 className="font-mono text-xs text-indigo-600 uppercase tracking-widest font-semibold mb-1">
                  Legado Sagrado
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed font-light">
                  Traducción visual de los icaros, la geometría sagrada y la sanación que fluye desde el interior de la selva.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Instagram, Facebook, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ContactMessage } from '../types';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (status === 'error') setStatus('idle');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, subject, message } = formData;

    if (!name || !email || !subject || !message) {
      setStatus('error');
      setErrorMessage('Por favor, completa todos los campos del formulario.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus('error');
      setErrorMessage('Por favor, ingresa un correo electrónico válido.');
      return;
    }

    setStatus('loading');

    // Simulate sending message
    setTimeout(() => {
      try {
        const storedMsgs = localStorage.getItem('luistamani_messages');
        const messages: ContactMessage[] = storedMsgs ? JSON.parse(storedMsgs) : [];

        const newMsg: ContactMessage = {
          id: Math.random().toString(36).substr(2, 9),
          name: name.trim(),
          email: email.toLowerCase().trim(),
          subject: subject.trim(),
          message: message.trim(),
          sentAt: new Date().toISOString()
        };

        const updated = [newMsg, ...messages];
        localStorage.setItem('luistamani_messages', JSON.stringify(updated));

        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } catch (err) {
        setStatus('error');
        setErrorMessage('Ocurrió un error al procesar tu mensaje. Por favor, inténtalo de nuevo.');
      }
    }, 1500);
  };

  return (
    <section id="contact-section" className="py-24 md:py-36 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24" id="contact-header">
          <span className="text-xs font-mono tracking-[0.3em] text-indigo-600 uppercase font-bold mb-3 block">
            Contacto & Atelier
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-light text-slate-950 tracking-wide mb-6">
            Ponerse en Contacto
          </h2>
          <div className="w-12 h-[1px] bg-slate-200 mx-auto mb-6" />
          <p className="text-sm md:text-base text-slate-500 font-light leading-relaxed">
            Para cualquier consulta sobre las obras originales, encargos de proyectos especiales o disponibilidad de colecciones futuras, no dudes en escribirnos.
          </p>
        </div>

        {/* Form and Contact Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start" id="contact-grid">
          
          {/* Left Side: Contact Information & Social channels */}
          <div className="lg:col-span-5 space-y-12" id="contact-info-panel">
            
            {/* Atelier details */}
            <div className="space-y-4">
              <h3 className="font-serif text-xl md:text-2xl font-light text-slate-950 tracking-wide">
                El Detrás de Escena
              </h3>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed font-light">
                Puedes seguir el detrás de escena del taller y descubrir los detalles de las próximas creaciones en nuestras plataformas oficiales:
              </p>
            </div>

            {/* Social channels card links */}
            <div className="space-y-4" id="social-links-container">
              <a
                href="https://www.instagram.com/luistamani.visionart"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center space-x-4 p-4 border border-slate-100 hover:border-indigo-100 bg-slate-50/50 hover:bg-indigo-50/20 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-full bg-white text-indigo-600 border border-slate-100 flex items-center justify-center shadow-sm group-hover:bg-indigo-900 group-hover:text-white transition-all duration-300">
                  <Instagram size={18} />
                </div>
                <div>
                  <span className="block text-[10px] font-mono tracking-widest text-slate-400 uppercase">Instagram</span>
                  <span className="text-sm font-medium text-slate-800 font-mono">@luistamani.visionart</span>
                </div>
              </a>

              <a
                href="https://www.facebook.com/LuisTamani"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center space-x-4 p-4 border border-slate-100 hover:border-indigo-100 bg-slate-50/50 hover:bg-indigo-50/20 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-full bg-white text-indigo-600 border border-slate-100 flex items-center justify-center shadow-sm group-hover:bg-indigo-900 group-hover:text-white transition-all duration-300">
                  <Facebook size={18} />
                </div>
                <div>
                  <span className="block text-[10px] font-mono tracking-widest text-slate-400 uppercase">Facebook</span>
                  <span className="text-sm font-semibold text-slate-800">Luis Tamani</span>
                </div>
              </a>

              <a
                href="mailto:luistamani.atelier@gmail.com"
                className="group flex items-center space-x-4 p-4 border border-slate-100 hover:border-indigo-100 bg-slate-50/50 hover:bg-indigo-50/20 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-full bg-white text-indigo-600 border border-slate-100 flex items-center justify-center shadow-sm group-hover:bg-indigo-900 group-hover:text-white transition-all duration-300">
                  <Mail size={18} />
                </div>
                <div>
                  <span className="block text-[10px] font-mono tracking-widest text-slate-400 uppercase">Correo Directo</span>
                  <span className="text-sm font-medium text-slate-800 font-mono">luistamani.atelier@gmail.com</span>
                </div>
              </a>
            </div>

            {/* General support note */}
            <div className="p-6 border-l-2 border-indigo-600 bg-slate-50 rounded-r-xl">
              <p className="text-xs text-slate-500 leading-relaxed font-light">
                * Las consultas de correo electrónico directo generalmente se responden dentro de las 48 horas hábiles. Agradecemos su paciencia durante este período de renovación creativa en el taller.
              </p>
            </div>
          </div>

          {/* Right Side: Interactive Form panel */}
          <div className="lg:col-span-7 bg-slate-50/50 border border-slate-100 p-8 md:p-12 rounded-2xl" id="contact-form-panel">
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-12"
                  id="contact-success-wrapper"
                >
                  <CheckCircle size={48} className="text-emerald-500 mx-auto mb-6" />
                  <h3 className="font-serif text-2xl font-light text-slate-950 mb-3">
                    Mensaje Recibido
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed max-w-md mx-auto font-light">
                    Tu mensaje ha sido guardado de manera segura en el sistema local de consultas. Nos pondremos en contacto contigo lo antes posible para atender tus inquietudes sobre la obra.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-8 px-6 py-3 bg-indigo-900 hover:bg-indigo-800 text-white text-xs font-semibold uppercase tracking-[0.15em] transition-all"
                  >
                    Enviar otro mensaje
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                  noValidate
                  id="contact-form"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="contact-name" className="block text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-2 font-semibold">
                        Nombre Completo
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="contact-name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Ej. María Elena"
                        className="w-full px-4 py-3 bg-white border border-slate-200 focus:outline-none focus:border-indigo-600 text-sm text-slate-800 font-light"
                        disabled={status === 'loading'}
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-2 font-semibold">
                        Correo Electrónico
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="contact-email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="ejemplo@correo.com"
                        className="w-full px-4 py-3 bg-white border border-slate-200 focus:outline-none focus:border-indigo-600 text-sm text-slate-800 font-light"
                        disabled={status === 'loading'}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="block text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-2 font-semibold">
                      Asunto de Consulta
                    </label>
                    <input
                      type="text"
                      name="subject"
                      id="contact-subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Consulta general / Adquisición / Proyectos"
                      className="w-full px-4 py-3 bg-white border border-slate-200 focus:outline-none focus:border-indigo-600 text-sm text-slate-800 font-light"
                      disabled={status === 'loading'}
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-2 font-semibold">
                      Mensaje o Comentario
                    </label>
                    <textarea
                      name="message"
                      id="contact-message"
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Escribe aquí tu mensaje en detalle..."
                      className="w-full px-4 py-3 bg-white border border-slate-200 focus:outline-none focus:border-indigo-600 text-sm text-slate-800 font-light resize-none leading-relaxed"
                      disabled={status === 'loading'}
                    />
                  </div>

                  {/* Form Submission Button */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
                    {status === 'error' ? (
                      <span className="flex items-center space-x-1.5 text-xs text-rose-500 font-mono">
                        <AlertCircle size={14} />
                        <span>{errorMessage}</span>
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-400 font-mono">
                        * Todos los campos son requeridos.
                      </span>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full sm:w-auto px-8 py-4 bg-indigo-900 hover:bg-indigo-800 text-white text-xs font-semibold uppercase tracking-[0.2em] transition-all flex items-center justify-center space-x-2 shadow-md shadow-indigo-950/10"
                      id="contact-submit-button"
                    >
                      {status === 'loading' ? (
                        <>
                          <Loader2 size={14} className="animate-spin" />
                          <span>Enviando...</span>
                        </>
                      ) : (
                        <>
                          <Send size={12} />
                          <span>Enviar Mensaje</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}

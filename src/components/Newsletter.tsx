/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, CheckCircle, Sparkles, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Subscriber } from '../types';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // Simple email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus('error');
      setErrorMessage('Por favor, ingresa un correo electrónico válido.');
      return;
    }

    setStatus('loading');

    // Simulate server request
    setTimeout(() => {
      try {
        // Read existing local storage
        const storedSubs = localStorage.getItem('luistamani_subscribers');
        const subscribers: Subscriber[] = storedSubs ? JSON.parse(storedSubs) : [];

        // Check if already subscribed
        if (subscribers.some(sub => sub.email.toLowerCase() === email.toLowerCase())) {
          setStatus('error');
          setErrorMessage('Este correo ya se encuentra registrado en nuestra lista.');
          return;
        }

        // Add new subscriber
        const newSub: Subscriber = {
          id: Math.random().toString(36).substr(2, 9),
          email: email.toLowerCase().trim(),
          subscribedAt: new Date().toISOString()
        };

        const updated = [newSub, ...subscribers];
        localStorage.setItem('luistamani_subscribers', JSON.stringify(updated));

        setStatus('success');
        setEmail('');
      } catch (err) {
        setStatus('error');
        setErrorMessage('Ocurrió un error al procesar tu suscripción. Inténtalo de nuevo.');
      }
    }, 1200);
  };

  return (
    <section
      id="newsletter-section"
      className="py-24 md:py-32 bg-indigo-950 text-white relative overflow-hidden"
    >
      {/* Background patterns representing subtle spiritual light and geometric paths */}
      <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-indigo-400 blur-md animate-[pulse_10s_infinite_alternate]" />
        <div className="absolute inset-0 bg-[radial-gradient(#1e1b4b_1px,transparent_1px)] [background-size:16px_16px]" />
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10 text-center" id="newsletter-container">

        {/* Sparkle icon banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="w-12 h-12 bg-indigo-900/60 rounded-full border border-indigo-700/50 flex items-center justify-center mx-auto mb-6 text-indigo-300"
        >
          <Sparkles size={18} />
        </motion.div>

        {/* Title */}
        <h2 className="font-serif text-3xl md:text-5xl font-light tracking-wide mb-6">
          Únete a la Comunidad del Taller
        </h2>
        <div className="w-12 h-[1px] bg-indigo-800 mx-auto mb-8" />

        {/* Paragraph descriptions in Spanish as requested */}
        <p className="text-sm md:text-base text-indigo-200/90 max-w-xl mx-auto leading-relaxed mb-10 font-light">
          Suscríbete a nuestra newsletter para ser una de las primeras personas en conocer la reapertura de la galería digital, las nuevas colecciones de arte y las próximas obras de edición limitada.
        </p>

        {/* Subscription Form / Success Message Panel */}
        <div className="max-w-2xl mx-auto" id="newsletter-form-wrapper">
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-indigo-900/40 border border-indigo-500/30 p-8 rounded-xl text-center"
                id="newsletter-success-box"
              >
                <CheckCircle size={40} className="text-emerald-400 mx-auto mb-4" />
                <h4 className="font-serif text-xl font-medium mb-2 text-white">¡Gracias por suscribirte!</h4>
                <p className="text-xs text-indigo-200 leading-relaxed max-w-xs mx-auto">
                  Te hemos registrado exitosamente. Serás notificado tan pronto como se abran las puertas de las nuevas creaciones.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-6 text-[10px] font-mono tracking-widest text-indigo-300 hover:text-white uppercase transition-colors"
                >
                  Suscribir otra cuenta
                </button>
              </motion.div>
            ) : (
              <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
                noValidate
                id="newsletter-form"
              >
                <div className="flex flex-col sm:flex-row gap-3 items-stretch">
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-indigo-400">
                      <Mail size={16} />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (status === 'error') setStatus('idle');
                      }}
                      placeholder="Tu correo electrónico"
                      required
                      className="w-full pl-11 pr-4 py-4 bg-indigo-950/80 border border-indigo-800/80 rounded-none text-sm text-white placeholder-indigo-400/70 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition-all font-light"
                      disabled={status === 'loading'}
                      id="newsletter-email-input"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="px-6 py-4 bg-white text-indigo-950 hover:bg-indigo-50 active:bg-slate-100 disabled:opacity-80 text-xs font-semibold uppercase tracking-[0.15em] rounded-none shadow-lg transition-all flex items-center justify-center space-x-2"
                    id="newsletter-submit-button"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 size={14} className="animate-spin" />
                        <span>Procesando...</span>
                      </>
                    ) : (
                      <span>Recibir las novedades del taller</span>
                    )}
                  </button>
                </div>

                {/* Error Banner */}
                {status === 'error' && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs text-rose-400 font-mono mt-2"
                  >
                    {errorMessage}
                  </motion.p>
                )}

                <p className="text-[10px] text-indigo-300/60 font-mono mt-4 leading-relaxed">
                  Respetamos profundamente tu privacidad. Nunca enviaremos spam y puedes darte de baja en cualquier momento.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}

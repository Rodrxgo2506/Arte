/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  VolumeX,
  Volume2,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Mail,
  Loader2,
  CheckCircle
} from 'lucide-react';

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [slideProgress, setSlideProgress] = useState(0);
  const [volume, setVolume] = useState(0.4);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showVolumeTip, setShowVolumeTip] = useState(true);

  // Transition & loading state for switching languages
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionProgress, setTransitionProgress] = useState(0);

  // Subscription state
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Language slide translations containing French, English, and Spanish (Castellano)
  const slides = [
    {
      id: 0,
      lang: 'fr',
      tagline: "LUIS TAMANI ATELIER",
      title: "LUIS TAMANI",
      text: "Nous travaillons actuellement à une mise à jour de notre espace en ligne ainsi qu'à l'arrivée de nouvelles créations et éditions qui seront bientôt disponibles.",
      subText: "Inscrivez-vous à notre newsletter pour être parmi les premier·ère·s informé·e·s de la réouverture, des nouvelles collections et des œuvres qui viendront enrichir cet univers en constante évolution.",
      placeholder: "Votre adresse e-mail",
      buttonText: "Recevoir les nouvelles de l'atelier",
      successMessage: "Merci ! Vous avez été inscrit avec succès.",
      errorMessage: "Cet e-mail est déjà inscrit ou invalide.",
      socialPrompt: "Vous pouvez suivre les coulisses de l'atelier et les détails des créations à venir sur :",
      instagram: "@luistamani.visionart",
      facebook: "Luis Tamani",
      contactPrompt: "Pour toute demande particulière, vous pouvez nous écrire à :",
      email: "luistamani.atelier@gmail.com"
    },
    {
      id: 1,
      lang: 'en',
      tagline: "LUIS TAMANI ATELIER",
      title: "LUIS TAMANI",
      text: "We are currently updating our online space and preparing the arrival of new creations and editions that will soon be available.",
      subText: "Join our newsletter to be among the first to hear about the reopening, upcoming collections, and the artworks that will continue to enrich this ever-evolving universe.",
      placeholder: "Your email address",
      buttonText: "Receive updates from the studio",
      successMessage: "Thank you! You have been successfully subscribed.",
      errorMessage: "This email is already registered or invalid.",
      socialPrompt: "Follow the life of the atelier and discover details of the upcoming creations on:",
      instagram: "@luistamani.visionart",
      facebook: "Luis Tamani",
      contactPrompt: "For any inquiries, please contact us at:",
      email: "luistamani.atelier@gmail.com"
    },
    {
      id: 2,
      lang: 'es',
      tagline: "TALLER DE LUIS TAMANI",
      title: "LUIS TAMANI",
      text: "Actualmente estamos renovando nuestro espacio digital y preparando la llegada de nuevas creaciones y ediciones que estarán disponibles muy pronto.",
      subText: "Suscríbete a nuestra newsletter para ser una de las primeras personas en conocer la reapertura, las nuevas colecciones y las obras que seguirán enriqueciendo este universo en constante evolución.",
      placeholder: "Tu correo electrónico",
      buttonText: "Recibir las novedades del taller",
      successMessage: "¡Gracias! Te has registrado con éxito.",
      errorMessage: "Este correo ya está registrado o es inválido.",
      socialPrompt: "Puedes seguir el detrás de escena del taller y descubrir los detalles de las próximas creaciones en:",
      instagram: "@luistamani.visionart",
      facebook: "Luis Tamani",
      contactPrompt: "Para cualquier consulta, puedes escribirnos a:",
      email: "luistamani.atelier@gmail.com"
    }
  ];

  // Auto-play the video and audio unmuted on load / first user gesture interaction
  useEffect(() => {
    const startPlay = () => {
      if (isPlaying) {
        if (videoRef.current) {
          videoRef.current.play().catch(() => { });
        }
        if (audioRef.current) {
          audioRef.current.play().catch(() => { });
        }
      }
    };

    // Attempt to auto-play immediately
    startPlay();

    // Attach listeners for first user gesture to guarantee unmuted play (bypassing strict browser policies)
    window.addEventListener('click', startPlay, { once: true });
    window.addEventListener('touchstart', startPlay, { once: true });

    return () => {
      window.removeEventListener('click', startPlay);
      window.removeEventListener('touchstart', startPlay);
    };
  }, [isPlaying]);

  // Synchronize play state of video and audio
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(err => {
          console.log('Video autoplay blocked or pending interaction:', err);
        });
      } else {
        videoRef.current.pause();
      }
    }
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(err => {
          console.log('Audio autoplay blocked or pending interaction:', err);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Synchronize volume and mute states
  useEffect(() => {
    const targetVolume = isMuted ? 0 : volume;
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
      videoRef.current.volume = targetVolume;
    }
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
      audioRef.current.volume = targetVolume;
    }
  }, [volume, isMuted]);

  // Hide the volume banner after 8 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowVolumeTip(false);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  // Smooth loading transitions when switching languages manually
  const triggerTransition = (targetIndex: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTransitionProgress(0);

    const duration = 500; // 500ms transition time
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / duration) * 100, 100);
      setTransitionProgress(progress);

      if (elapsed >= duration) {
        clearInterval(interval);
        setActiveSlide(targetIndex);
        setSlideProgress(0);
        setStatus('idle');
        setEmail('');
        // Smoothly exit transition shortly after
        setTimeout(() => {
          setIsTransitioning(false);
        }, 80);
      }
    }, 16);
  };

  const goToSlide = (index: number) => {
    triggerTransition(index);
  };

  const nextSlide = () => {
    triggerTransition((activeSlide + 1) % 3);
  };

  const prevSlide = () => {
    triggerTransition((activeSlide - 1 + 3) % 3);
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);

    if (!nextMuted) {
      setIsPlaying(true);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play().catch(() => { });
        }
        if (audioRef.current) {
          audioRef.current.play().catch(() => { });
        }
      }, 50);
    }
    setShowVolumeTip(false);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (val > 0) {
      setIsMuted(false);
      setIsPlaying(true);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play().catch(() => { });
        }
        if (audioRef.current) {
          audioRef.current.play().catch(() => { });
        }
      }, 50);
    } else {
      setIsMuted(true);
    }
  };

  // Submission handler for waitlist form
  const handleSubscriptionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // Simple email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus('error');
      const errNoValid = activeSlide === 0
        ? "Veuillez entrer une adresse e-mail valide."
        : activeSlide === 1
          ? "Please enter a valid email address."
          : "Por favor, ingresa un correo electrónico válido.";
      setErrorMessage(errNoValid);
      return;
    }

    setStatus('loading');

    setTimeout(() => {
      try {
        const storedSubs = localStorage.getItem('luistamani_subscribers');
        const subscribers = storedSubs ? JSON.parse(storedSubs) : [];

        if (subscribers.some((sub: any) => sub.email.toLowerCase() === email.toLowerCase())) {
          setStatus('error');
          const errDup = activeSlide === 0
            ? "Cette adresse e-mail est déjà inscrite."
            : activeSlide === 1
              ? "This email address is already subscribed."
              : "Este correo electrónico ya se encuentra registrado.";
          setErrorMessage(errDup);
          return;
        }

        const newSub = {
          id: Math.random().toString(36).substr(2, 9),
          email: email.toLowerCase().trim(),
          subscribedAt: new Date().toISOString()
        };

        localStorage.setItem('luistamani_subscribers', JSON.stringify([newSub, ...subscribers]));
        setStatus('success');
        setEmail('');
      } catch (err) {
        setStatus('error');
        const errFail = activeSlide === 0
          ? "Une erreur est survenue. Veuillez réessayer."
          : activeSlide === 1
            ? "An error occurred. Please try again."
            : "Ocurrió un error. Inténtalo de nuevo.";
        setErrorMessage(errFail);
      }
    }, 1200);
  };

  const activeLangData = slides[activeSlide];

  return (
    <header
      id="hero-section"
      className="relative min-h-screen w-full flex flex-col justify-end items-center px-4 sm:px-6 md:px-12 bg-slate-950 overflow-hidden pt-24 pb-3 md:pb-4 select-none"
    >
      {/* Layer 0: Fallback Mystic Shamanic Background */}
      <div className="absolute inset-0 bg-slate-950 overflow-hidden z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]" />

        {/* Drifting violet/indigo colored energy clouds resembling Luis Tamani's visionary style */}
        <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] rounded-full bg-purple-950/40 blur-[130px] animate-[pulse_12s_infinite_alternate]" />
        <div className="absolute bottom-[-20%] right-[-20%] w-[80%] h-[80%] rounded-full bg-indigo-950/50 blur-[140px] animate-[pulse_18s_infinite_alternate_2s]" />
        <div className="absolute top-[30%] left-[25%] w-[50%] h-[50%] rounded-full bg-violet-950/30 blur-[110px] animate-[pulse_10s_infinite_alternate_4s]" />

        {/* Shimmering starry dust layer */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-1/4 left-1/3 w-1 h-1 bg-indigo-300 rounded-full blur-[0.5px] animate-pulse" style={{ animationDuration: '3s' }} />
          <div className="absolute top-3/4 left-1/5 w-1.5 h-1.5 bg-purple-300 rounded-full blur-[0.5px] animate-pulse" style={{ animationDuration: '5s' }} />
          <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-violet-400 rounded-full blur-[0.5px] animate-pulse" style={{ animationDuration: '4s' }} />
          <div className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-indigo-400 rounded-full blur-[1px] animate-pulse" style={{ animationDuration: '6s' }} />
        </div>
      </div>

      {/* Layer 1: Always-Mounted Background Video */}
      <video
        ref={videoRef}
        loop
        playsInline
        autoPlay
        muted={isMuted}
        onError={() => {
          console.log("Background video loading status.");
        }}
        className="absolute inset-0 w-full h-full object-cover z-10 opacity-75 pointer-events-none"
      >
        {/* ========================================================================= */}
        {/* CONFIGURACIÓN DEL VIDEO DE FONDO:                                         */}
        {/* Reemplaza o añade aquí las URLs o rutas de tus videos locales.            */}
        {/* Por ejemplo, si subes "video-fondo.mp4" a la carpeta "public/videos",     */}
        {/* la ruta correcta será "/videos/video-fondo.mp4".                          */}
        {/* ========================================================================= */}
        <source src="/videos/video-fondo.mp4" type="video/mp4" />
        <source src="/video-fondo.mp4" type="video/mp4" />
        <source src="/images/video-fondo.mp4" type="video/mp4" />
        {/* URL temporal de repuesto (Mixkit Forest Stream): */}
        <source src="https://assets.mixkit.co/videos/preview/mixkit-forest-stream-in-the-sunlight-529-large.mp4" type="video/mp4" />
      </video>

      {/* Background Audio Source */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        onError={() => {
          console.log("Background audio file status.");
        }}
      >
        {/* ========================================================================= */}
        {/* CONFIGURACIÓN DEL AUDIO DE FONDO:                                         */}
        {/* Reemplaza o añade aquí las URLs o rutas de tus archivos de audio locales. */}
        {/* Por ejemplo, si subes "audio-fondo.mp3" a la carpeta "public/audio",      */}
        {/* la ruta correcta será "/audio/audio-fondo.mp3".                           */}
        {/* ========================================================================= */}
        <source src="/audio/audio-fondo.mp3" type="audio/mpeg" />
        <source src="/audio-fondo.mp3" type="audio/mpeg" />
        <source src="/audios/audio-fondo.mp3" type="audio/mpeg" />
        <source src="/audio/audio-fondo.mpeg" type="audio/mpeg" />
        {/* URL temporal de repuesto: */}
        <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" type="audio/mpeg" />
      </audio>

      {/* Layer 2: Subtle side gradients coming from left and right to keep the center of the video 100% clear and vibrant, with readable margins */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-transparent to-slate-950/90 z-20 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent z-20 pointer-events-none" />

      {/* Layer 3: Split-Screen Content Interface (Left & Right margins are populated while the center is left entirely open for the majestic art video) */}
      <div className="relative z-30 max-w-7xl w-full mx-auto flex flex-col justify-between items-center px-6 md:px-12 lg:px-16 min-h-[90vh] pt-28 pb-2">

        {/* Main Content Grid: Left Text Column and Right Interactive Column */}
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16 items-end my-auto pb-6">

          {/* Left Column: Visionary Artist bio and descriptions */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.1 }}
            className="col-span-1 md:col-span-5 text-left flex flex-col justify-end"
            id="hero-left-column"
          >
            <div className="min-h-[220px] md:min-h-[190px] flex flex-col justify-center text-left items-start w-full">
              <AnimatePresence mode="wait">
                {isTransitioning ? (
                  <motion.div
                    key="loading-state-left"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full flex flex-col items-start justify-center space-y-4 py-8 text-left"
                  >
                    <Loader2 size={32} className="animate-spin text-indigo-400" />
                    <div className="flex flex-col items-start space-y-2">
                      <span className="text-[10px] font-mono tracking-[0.2em] text-indigo-300 uppercase animate-pulse text-left">
                        {activeSlide === 0
                          ? "Mise à jour..."
                          : activeSlide === 1
                            ? "Updating..."
                            : "Cargando..."}
                      </span>
                      <div className="w-28 h-[2px] bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-indigo-500 transition-all duration-75"
                          style={{ width: `${transitionProgress}%` }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key={activeSlide}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="w-full flex flex-col space-y-4 text-left items-start"
                  >
                    {/* Tagline showing slide details */}
                    <span className="text-[10px] font-mono tracking-[0.25em] text-indigo-300 uppercase block text-left">
                      {activeLangData.tagline}
                    </span>

                    {/* Title */}
                    <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-[0.1em] uppercase text-left">
                      {activeLangData.title}
                    </h1>

                    {/* Elegant dynamic descriptions */}
                    <p className="font-serif font-light text-sm md:text-base text-slate-100 leading-relaxed max-w-xl text-left">
                      {activeLangData.text}
                    </p>
                    <p className="font-sans font-light text-xs text-indigo-200/80 max-w-xl leading-relaxed text-left">
                      {activeLangData.subText}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Center Space: Completely clear to let the majestic center of the video show! */}
          <div className="hidden md:block md:col-span-2" />

          {/* Right Column: Integrated Interactive Newsletter Form and Social & Contact details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.1 }}
            className="col-span-1 md:col-span-5 text-left flex flex-col justify-end"
            id="hero-right-column"
          >
            {/* Integrated Interactive Newsletter Form */}
            <div className="max-w-xl w-full text-left flex flex-col items-start" id="integrated-newsletter-form">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-start space-y-3 py-4 text-emerald-400 font-mono text-xs tracking-wider text-left"
                  >
                    <CheckCircle size={32} className="animate-bounce" />
                    <span>{activeLangData.successMessage}</span>
                  </motion.div>
                ) : (
                  <motion.form
                    onSubmit={handleSubscriptionSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col sm:flex-row gap-2.5 w-full justify-start items-stretch"
                  >
                    <div className="relative flex-1">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (status === 'error') setStatus('idle');
                        }}
                        placeholder={activeLangData.placeholder}
                        className="w-full bg-white/5 border border-white/15 px-5 py-3.5 text-base sm:text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all rounded-none font-mono"
                        disabled={status === 'loading'}
                        required
                      />
                      <Mail size={15} className="absolute right-5 top-1/2 -translate-y-1/2 text-white/20" />
                    </div>

                    <button
                      type="submit"
                      className="px-8 py-3.5 bg-white text-slate-950 hover:bg-slate-100 text-[12px] font-mono font-bold tracking-[0.2em] transition-all rounded-none uppercase flex items-center justify-center space-x-2 shrink-0 disabled:opacity-55 active:scale-[0.98]"
                      disabled={status === 'loading'}
                    >
                      {status === 'loading' ? (
                        <Loader2 size={13} className="animate-spin text-slate-950" />
                      ) : (
                        <span>{activeLangData.buttonText}</span>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>

              {/* Error Message */}
              <AnimatePresence>
                {status === 'error' && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-[10px] text-red-400 font-mono text-left mt-3 tracking-wide"
                  >
                    {errorMessage || activeLangData.errorMessage}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Social and Contact details */}
            <AnimatePresence mode="wait">
              {!isTransitioning && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="mt-8 pt-6 border-t border-white/5 text-left flex flex-col items-start justify-start space-y-4 w-full"
                >
                  <div className="space-y-2 text-left w-full">
                    <p className="text-[11px] font-mono tracking-[0.15em] text-slate-400 uppercase leading-relaxed max-w-lg text-left">
                      {activeLangData.socialPrompt}
                    </p>
                    <div className="flex flex-col sm:flex-row items-start justify-start gap-2 sm:gap-6 pt-1">
                      <a
                        href="https://www.instagram.com/luistamani.visionart"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center space-x-1.5 text-xs font-mono text-white/75 hover:text-white transition-colors duration-300"
                      >
                        <span className="text-indigo-400 text-[10px]">Instagram:</span>
                        <span className="underline decoration-indigo-500/20 group-hover:decoration-indigo-400 transition-colors">{activeLangData.instagram}</span>
                      </a>
                      <a
                        href="https://www.facebook.com/LuisTamani"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center space-x-1.5 text-xs font-mono text-white/75 hover:text-white transition-colors duration-300"
                      >
                        <span className="text-indigo-400 text-[10px]">Facebook:</span>
                        <span className="underline decoration-indigo-500/20 group-hover:decoration-indigo-400 transition-colors">{activeLangData.facebook}</span>
                      </a>
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-1 text-left w-full">
                    <p className="text-[11px] font-mono tracking-[0.15em] text-slate-400 uppercase text-left">
                      {activeLangData.contactPrompt}
                    </p>
                    <a
                      href={`mailto:${activeLangData.email}`}
                      className="text-xs sm:text-sm font-mono text-indigo-300 hover:text-indigo-200 transition-all duration-300 underline decoration-indigo-500/30 hover:decoration-indigo-400"
                    >
                      {activeLangData.email}
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Bottom Row: The Language Buttons in a beautiful, styled, border-framed rectangle at the bottom center */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="w-full flex justify-center mt-6 z-40"
          id="hero-bottom-languages-container"
        >
          {/* Beautifully styled custom container for language selection, matching the user's sketch */}
          <div className="bg-slate-950/85 backdrop-blur-md border border-white/10 px-6 py-3.5 flex items-center justify-center space-x-6 shadow-2xl transition-all duration-300 hover:border-white/20 min-w-[280px]">
            {slides.map((slide, idx) => (
              <React.Fragment key={slide.id}>
                {idx > 0 && <span className="text-white/10 select-none font-light">|</span>}
                <button
                  onClick={() => goToSlide(idx)}
                  className={`text-[11px] font-mono tracking-[0.25em] transition-all duration-300 uppercase relative py-1 ${idx === activeSlide
                      ? 'text-white font-bold'
                      : 'text-white/40 hover:text-white/80'
                    }`}
                  aria-label={`Switch to ${slide.lang.toUpperCase()}`}
                  disabled={isTransitioning}
                >
                  {slide.lang === 'fr' ? 'FRANÇAIS' : slide.lang === 'en' ? 'ENGLISH' : 'CASTELLANO'}

                  {idx === activeSlide && (
                    <motion.div
                      layoutId="activeLangIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-indigo-400"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              </React.Fragment>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Layer 4: Global Pill Volume Controller overlay in Bottom Left */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="absolute bottom-6 left-6 md:bottom-10 md:left-10 z-40 flex flex-col items-start"
      >
        {/* Pill-shaped volume container exactly matching the mock reference */}
        <div className="flex items-center space-x-3 bg-slate-950/80 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full shadow-2xl transition-all duration-300 hover:border-white/20">
          <button
            onClick={toggleMute}
            className="text-white/90 hover:text-white transition-colors focus:outline-none flex items-center justify-center p-0.5"
            title={isMuted ? "Activar Sonido" : "Silenciar"}
          >
            {isMuted ? (
              <VolumeX size={15} className="text-red-400" />
            ) : (
              <Volume2 size={15} className="text-indigo-400" />
            )}
          </button>

          <span className="text-[10px] font-sans font-bold tracking-widest text-slate-200">
            SONIDO
          </span>

          <div className="h-3.5 w-[1px] bg-white/20"></div>

          <div className="flex items-center space-x-2.5">
            <input
              type="range"
              min="0"
              max="1"
              step="0.02"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-20 md:w-28 h-1 bg-white/20 rounded-full appearance-none cursor-pointer accent-indigo-500 focus:outline-none"
              aria-label="Ajustar volumen"
            />
            <span className="text-[10px] font-mono text-slate-300 w-8 text-right font-medium">
              {isMuted ? '0%' : `${Math.round(volume * 100)}%`}
            </span>
          </div>
        </div>
      </motion.div>
    </header>
  );
}

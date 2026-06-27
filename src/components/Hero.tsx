/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowDown,
  Sparkles,
  VolumeX,
  Volume2,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Instagram,
  Facebook,
  Mail,
  Music
} from 'lucide-react';

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [slideProgress, setSlideProgress] = useState(0);
  const [volume, setVolume] = useState(0.4);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const [showVolumeTip, setShowVolumeTip] = useState(true);

  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Scroll function
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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

  // Hide the volume banner after 6 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowVolumeTip(false);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  // Slide autoplay progression synced with state
  useEffect(() => {
    if (!isPlaying) return;

    const slideDuration = 8000; // 8 seconds per slide to give comfortable reading time
    const updateRate = 100; // Update progress bar every 100ms
    let elapsed = 0;

    const interval = setInterval(() => {
      elapsed += updateRate;
      setSlideProgress((elapsed / slideDuration) * 100);

      if (elapsed >= slideDuration) {
        setActiveSlide((prev) => (prev + 1) % 3);
        elapsed = 0;
        setSlideProgress(0);
      }
    }, updateRate);

    return () => clearInterval(interval);
  }, [activeSlide, isPlaying]);

  const goToSlide = (index: number) => {
    setActiveSlide(index);
    setSlideProgress(0);
  };

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % 3);
    setSlideProgress(0);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + 3) % 3);
    setSlideProgress(0);
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);

    if (!nextMuted) {
      setIsPlaying(true);
      // Explicitly force audio and video play upon user gesture interaction
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play().catch(err => console.log('Video playback failed on interaction:', err));
        }
        if (audioRef.current) {
          audioRef.current.play().catch(err => console.log('Audio playback failed on interaction:', err));
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

  // Slide data containing the requested Spanish texts beautifully structured
  const slides = [
    {
      id: 0,
      tagline: "ESPACIO EN RENOVACIÓN",
      title: "Próximas Creaciones",
      content: (
        <div className="flex flex-col items-center justify-center space-y-4">
          <p className="font-light text-base md:text-xl text-slate-100 leading-relaxed md:leading-loose text-center max-w-2xl px-2 font-serif">
            Actualmente estamos renovando nuestro espacio digital y preparando la llegada de nuevas creaciones y ediciones que estarán disponibles muy pronto.
          </p>
          <div className="flex justify-center pt-2">
            <button
              onClick={() => scrollToSection('gallery-section')}
              className="px-6 py-2 border border-white/20 hover:border-white/50 bg-white/5 hover:bg-white/10 text-white text-[11px] font-mono tracking-widest transition-all duration-300"
            >
              Explorar Obras Curadas
            </button>
          </div>
        </div>
      )
    },
    {
      id: 1,
      tagline: "SÚSCRIPCIÓN EXCLUSIVA",
      title: "Boletín del Atelier",
      content: (
        <div className="flex flex-col items-center justify-center space-y-5">
          <p className="text-white/90 text-sm md:text-base max-w-xl text-center leading-relaxed font-sans px-4">
            Suscríbete a nuestra newsletter para ser una de las primeras personas en conocer la reapertura, las nuevas colecciones y las obras que seguirán enriqueciendo este universo en constante evolución.
          </p>
          <button
            onClick={() => scrollToSection('newsletter-section')}
            className="group px-8 py-3.5 bg-white text-indigo-950 text-xs font-semibold uppercase tracking-[0.2em] hover:bg-indigo-50 active:scale-95 transition-all duration-300 shadow-xl"
            id="hero-cta-button-slide"
          >
            Recibir las novedades del taller
          </button>
        </div>
      )
    },
    {
      id: 2,
      tagline: "DETRÁS DE ESCENA Y CONTACTO",
      title: "Universo de Luis Tamani",
      content: (
        <div className="flex flex-col items-center justify-center space-y-4 px-2">
          <p className="text-slate-200 text-xs md:text-sm max-w-xl text-center leading-relaxed font-sans">
            Puedes seguir el detrás de escena del taller y descubrir los detalles de las próximas creaciones en:
          </p>

          {/* Social Badges */}
          <div className="flex flex-wrap gap-3 justify-center pt-1 font-mono text-[11px]">
            <a
              href="https://www.instagram.com/luistamani.visionart"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-3.5 py-1.5 border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-colors tracking-wider rounded-sm"
            >
              <Instagram size={13} className="text-pink-400" />
              <span>@luistamani.visionart</span>
            </a>
            <a
              href="https://www.facebook.com/LuisTamani"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-3.5 py-1.5 border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-colors tracking-wider rounded-sm"
            >
              <Facebook size={13} className="text-blue-400" />
              <span>Luis Tamani</span>
            </a>
          </div>

          <div className="w-full max-w-xs border-t border-white/10 pt-3 mt-2 text-center">
            <p className="text-slate-400 font-mono text-[10px] uppercase tracking-widest mb-1">Para cualquier consulta:</p>
            <a
              href="mailto:luistamani.atelier@gmail.com"
              className="text-indigo-300 hover:text-white font-mono text-xs md:text-sm underline transition-colors inline-flex items-center space-x-1.5"
            >
              <Mail size={12} />
              <span>luistamani.atelier@gmail.com</span>
            </a>
          </div>
        </div>
      )
    }
  ];

  return (
    <header
      id="hero-section"
      className="relative min-h-screen w-full flex flex-col justify-center items-center px-4 sm:px-6 md:px-12 bg-slate-950 overflow-hidden pt-20 select-none"
    >
      {/* Layer 0: Fallback Mystic Shamanic Background */}
      <div className="absolute inset-0 bg-slate-950 overflow-hidden z-0 pointer-events-none">
        {/* Shamanic geometric lattice representation */}
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
          console.log("Background video loading state. Always rendering container.");
        }}
        className="absolute inset-0 w-full h-full object-cover z-10 opacity-75 pointer-events-none"
      >
        <source src="/videos/video-fondo.mp4" type="video/mp4" />
        <source src="/video-fondo.mp4" type="video/mp4" />
        <source src="/images/video-fondo.mp4" type="video/mp4" />
        <source src="https://assets.mixkit.co/videos/preview/mixkit-forest-stream-in-the-sunlight-529-large.mp4" type="video/mp4" />
      </video>

      {/* Background Audio Source */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        onError={() => {
          console.log("Background audio file status. Controlled via state slider.");
        }}
      >
        <source src="/audio/audio-fondo.mp3" type="audio/mpeg" />
        <source src="/audio/audio-fondo.mpeg" type="audio/mpeg" />
        <source src="/audio-fondo.mp3" type="audio/mpeg" />
        <source src="/audios/audio-fondo.mp3" type="audio/mpeg" />
        <source src="/audios/audio-fondo.mpeg" type="audio/mpeg" />
        <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" type="audio/mpeg" />
      </audio>

      {/* Layer 2: Perfect Dark Overlay to guarantee crisp text readability */}
      <div className="absolute inset-0 bg-slate-950/60 z-20 pointer-events-none" />

      {/* Layer 3: Central Content Interface (Elevated upward to let video and logo reveal beautifully below) */}
      <div className="relative z-30 max-w-4xl w-full mx-auto text-center flex flex-col items-center -translate-y-12 sm:-translate-y-20 md:-translate-y-24">
        {/* Sub-tag status */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="inline-flex items-center space-x-2 px-3 py-1.5 border border-white/10 bg-white/5 backdrop-blur-md rounded-full text-[10px] font-mono text-indigo-300 font-medium uppercase tracking-[0.2em] mb-6"
        >
          <Sparkles size={11} className="animate-pulse text-indigo-400" />
          <span>Atelier Luis Tamani &bull; Renovación</span>
        </motion.div>

        {/* Artist Display Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="font-serif text-5xl sm:text-7xl md:text-8xl font-light text-white tracking-[0.18em] uppercase mb-3 leading-tight"
        >
          LUIS TAMANI
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-xs md:text-sm font-mono tracking-[0.35em] text-indigo-300 uppercase mb-8"
        >
          Arte Visionario del Amazonas Peruano
        </motion.p>

        {/* Elegant geometric separator line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, ease: 'easeInOut', delay: 0.4 }}
          className="w-20 h-[1px] bg-white/20 mb-8"
        />

        {/* Central Card with transparent layout to let video reveal beautifully */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="w-full max-w-2xl bg-transparent border-none p-4 md:p-6 relative overflow-hidden shadow-none backdrop-blur-none"
          id="hero-slideshow-card"
        >
          {/* Active slide progress bar indicator */}
          <div
            className="absolute bottom-0 left-0 h-[1.5px] bg-indigo-500/80 transition-all duration-100"
            style={{ width: `${slideProgress}%` }}
          />

          {/* Tagline showing slide details */}
          <div className="text-[10px] font-mono tracking-[0.25em] text-indigo-400 uppercase mb-4 text-center">
            {slides[activeSlide].tagline}
          </div>

          {/* Sliding Content Window with beautiful fade/slide in out animation */}
          <div className="min-h-[160px] md:min-h-[130px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="w-full"
              >
                {slides[activeSlide].content}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Interactive slide controllers */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/5">
            {/* Nav Arrows */}
            <button
              onClick={prevSlide}
              className="p-1.5 text-white/50 hover:text-white border border-transparent hover:border-white/10 hover:bg-white/5 transition-all"
              aria-label="Diapositiva Anterior"
            >
              <ChevronLeft size={16} />
            </button>

            {/* Pagination Dots */}
            <div className="flex space-x-2.5">
              {slides.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(idx)}
                  className={`h-1.5 transition-all duration-300 rounded-none ${idx === activeSlide ? 'w-6 bg-white' : 'w-1.5 bg-white/20 hover:bg-white/40'
                    }`}
                  aria-label={`Ir a diapositiva ${idx + 1}`}
                />
              ))}
            </div>

            {/* Play / Pause Autoplay toggler */}
            <div className="flex space-x-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-1.5 text-white/50 hover:text-white border border-transparent hover:border-white/10 hover:bg-white/5 transition-all"
                title={isPlaying ? "Pausar Autoplay" : "Reanudar Autoplay"}
              >
                {isPlaying ? <Pause size={14} /> : <Play size={14} />}
              </button>

              <button
                onClick={nextSlide}
                className="p-1.5 text-white/50 hover:text-white border border-transparent hover:border-white/10 hover:bg-white/5 transition-all"
                aria-label="Siguiente Diapositiva"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Layer 4: Global Pill Volume Controller overlay in Bottom Left */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
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

      {/* Layer 4: Scroll Indicator in Bottom Center */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 cursor-pointer hidden md:flex flex-col items-center space-y-1.5 text-white/40 hover:text-white transition-colors z-40"
        onClick={() => scrollToSection('gallery-section')}
        id="hero-scroll-indicator"
      >
        <span className="text-[9px] font-mono uppercase tracking-[0.25em] whitespace-nowrap">
          Explorar Obras
        </span>
        <ArrowDown size={13} className="animate-bounce text-indigo-400" />
      </motion.div>
    </header>
  );
}

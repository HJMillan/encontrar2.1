"use client";

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Navigation, Shield, Bell, Lock, Activity, Heart, LocateFixed } from 'lucide-react';
import Logo from './components/Logo';

// Static Imports for Blur-up
import imgAbuelo from '../public/img/abuelo.jpg';
import imgMascota from '../public/img/mascota.jpg';

gsap.registerPlugin(ScrollTrigger);

// --- Configuration for the scrollytelling sections ---
const longText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const sectionsConfig = [
  {
    title: 'Un Familiar',
    color: '#8A2BE2', // Violet
    subtitle: 'Cuidado y Seguridad',
    image: imgAbuelo,
    features: [
      { text: 'Geoposicionamiento en tiempo real', icon: MapPin },
      { text: 'Historial de trayecto recorrido', icon: Navigation },
      { text: 'Geocercas y Zonas Seguras', icon: Shield },
      { text: 'Alerta sin movimiento', icon: Bell }
    ]
  },
  {
    title: 'Tus Objetos',
    color: '#FF0080', // Pink
    subtitle: 'Protección de Bienes',
    image: imgAbuelo, // Using same image as placeholder or re-use
    features: [
      { text: 'Geoposicionamiento preciso', icon: LocateFixed },
      { text: 'Historial de trayecto completo', icon: Navigation },
      { text: 'Configuración de Geocercas', icon: Lock },
      { text: 'Alerta movimiento no autorizado', icon: Bell }
    ]
  },
  {
    title: 'Tu Vehiculo',
    color: '#00D1FF', // Cyan
    subtitle: 'Control Vehicular',
    image: imgMascota,
    features: [
      { text: 'Rastreo GPS instantáneo', icon: MapPin },
      { text: 'Historial de rutas y paradas', icon: Navigation },
      { text: 'Geocercas de seguridad', icon: Shield },
      { text: 'Alerta de desplazamiento', icon: Bell }
    ]
  },
  {
    title: 'Tu Mascota',
    color: '#FFD700', // Gold
    subtitle: 'Amor y Cuidado',
    image: imgMascota,
    features: [
      { text: 'Ubicación exacta 24/7', icon: MapPin },
      { text: 'Historial de paseos', icon: Activity },
      { text: 'Geocerca "Zona Segura"', icon: Shield },
      { text: 'Red de veterinarias cercanas', icon: Heart },
      { text: 'Historial clínico digital', icon: Activity },
      { text: 'Alerta de adopción', icon: Bell }
    ]
  },
];

export default function HomePage() {
  const component = useRef<HTMLDivElement>(null);
  const scrolly = useRef<HTMLElement>(null);
  const background = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // --- Set initial colors ---
      const initialColor = '#FF4D00'; // Hero Orange
      gsap.set(background.current, {
        '--color-top': initialColor,
        '--color-bottom': initialColor,
        '--angle': '180deg',
      });

      // --- Hero Cinematic Entrance (Global Load) ---
      gsap.fromTo('.hero-title', { y: 100, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 1.5, ease: 'power3.out', delay: 0.2 });

      // Desktop Animations
      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: scrolly.current,
            start: 'top top',
            end: '+=6000',
            scrub: 1,
            pin: true,
          },
        });

        // --- Hero Scroll Effect ---
        tl.to('.hero-title', { opacity: 0, scale: 0.8, duration: 1, ease: 'power2.in' }, '+=1');

        // --- Loop through sections to create transitions ---
        sectionsConfig.forEach((section, index) => {
          const sectionId = `#section-${index}`;

          // Pincer animation IN
          tl.fromTo(`${sectionId}-title`, { xPercent: -100, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 2 }, `section${index}`);
          tl.fromTo(`${sectionId}-image`, { xPercent: 100, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 2 }, `section${index}`);

          // Staggered Features Animation
          tl.fromTo(`${sectionId}-title ul li`, { x: -20, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.1, duration: 1 }, `section${index}+=1`);

          // Sliding Pill Animation
          // Move to the current index position (0, 1.75rem, 3.5rem, etc.)
          tl.to('#nav-indicator', { y: `${index * 1.75}rem`, duration: 1, ease: 'power2.out' }, `section${index}`);

          // THE CRITICAL DIAGONAL WIPE TRANSITION
          tl.set(background.current, { '--color-bottom': section.color, '--angle': '170deg' }, `section${index}`);
          tl.to(background.current, { '--angle': '180deg', duration: 2 }, `section${index}`);
          tl.set(background.current, { '--color-top': section.color });

          // Pincer animation OUT
          if (index < sectionsConfig.length) {
            tl.to(`${sectionId}-title`, { xPercent: -100, opacity: 0, duration: 2 }, `section${index}+=3`);
            tl.to(`${sectionId}-image`, { xPercent: 100, opacity: 0, duration: 2 }, `section${index}+=3`);
            tl.to(`${sectionId}-title`, { xPercent: -100, opacity: 0, duration: 2 }, `section${index}+=3`);
            tl.to(`${sectionId}-image`, { xPercent: 100, opacity: 0, duration: 2 }, `section${index}+=3`);
          }
        });

        // --- Footer Transition ---
        tl.to('.gps-device', { opacity: 0, scale: 0, duration: 2 }, 'footer');
        tl.set(background.current, { '--color-bottom': '#111', '--angle': '170deg' }, 'footer');
        tl.to(background.current, { '--angle': '180deg', duration: 2 }, 'footer');
        tl.set(background.current, { '--color-top': '#111' });
        tl.fromTo('.footer-title', { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 2 }, 'footer');

        // Fluid Logo Transition (Desktop)
        tl.to('#app-logo', {
          left: '8%',      // Approximate left column position
          xPercent: 0,      // Remove centering
          bottom: '25%',    // Move up to catch the footer
          scale: 0.7,       // Shrink
          opacity: 0,       // Fade out eventually
          duration: 1.5,
          ease: 'power2.inOut'
        }, 'footer');

        // Reveal static footer logo
        tl.to('#footer-logo', { opacity: 1, duration: 0.5 }, 'footer+=1');
      });

      // Mobile Animations
      mm.add("(max-width: 767px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: scrolly.current,
            start: 'top top',
            end: '+=6000',
            scrub: 1,
            pin: true,
          },
        });

        // --- Hero Animation ---
        tl.to('.hero-title', { opacity: 0, scale: 0.8, duration: 1 }, '+=0.5');

        // --- Loop through sections ---
        sectionsConfig.forEach((section, index) => {
          const sectionId = `#section-${index}`;

          // Simple Fade/Slide IN (Vertical)
          tl.fromTo(`${sectionId}-title`, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 2 }, `section${index}`);
          tl.fromTo(`${sectionId}-image`, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 2 }, `section${index}`);

          // Staggered Features Animation (Mobile)
          tl.fromTo(`${sectionId}-title ul li`, { y: 10, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 1 }, `section${index}+=0.5`);

          // Transition color
          tl.set(background.current, { '--color-bottom': section.color, '--angle': '170deg' }, `section${index}`);
          tl.to(background.current, { '--angle': '180deg', duration: 2 }, `section${index}`);
          tl.set(background.current, { '--color-top': section.color });

          // Fade OUT
          if (index < sectionsConfig.length) {
            tl.to(`${sectionId}-title`, { opacity: 0, duration: 2 }, `section${index}+=3`);
            tl.to(`${sectionId}-image`, { opacity: 0, duration: 2 }, `section${index}+=3`);
          }
        });

        // --- Footer Transition ---
        tl.to('.gps-device', { opacity: 0, scale: 0, duration: 2 }, 'footer');
        tl.set(background.current, { '--color-bottom': '#111', '--angle': '170deg' }, 'footer');
        tl.to(background.current, { '--angle': '180deg', duration: 2 }, 'footer');
        tl.set(background.current, { '--color-top': '#111' });
        tl.fromTo('.footer-title', { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 2 }, 'footer');
        tl.to('#footer-logo', { opacity: 1, duration: 1 }, 'footer');
      });

      // Interactive Depth (Tilt)
      const handleMouseMove = (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 30; // Tilt range
        const y = (e.clientY / window.innerHeight - 0.5) * 30;
        gsap.to('.image-tilt-target', {
          rotationY: x,
          rotationX: -y,
          ease: 'power2.out',
          duration: 1
        });
      };
      window.addEventListener('mousemove', handleMouseMove);

      return () => {
        ctx.revert();
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }, component);
  }, []);

  return (
    <div ref={component}>
      <style jsx global>{`
        .background-wipe {
          --color-top: #FF4D00;
          --color-bottom: #FF4D00;
          --angle: 180deg;
          background: linear-gradient(var(--angle), var(--color-top) 0%, var(--color-top) 50%, var(--color-bottom) 50%, var(--color-bottom) 100%);
        }
      `}</style>

      {/* Navigation Dots (Desktop Only) */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-4">
        {/* Sliding Indicator */}
        <div id="nav-indicator" className="absolute top-0 left-0 w-3 h-3 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] z-10" />

        {/* Static Background Dots */}
        {sectionsConfig.map((_, idx) => (
          <div key={idx} className="w-3 h-3 rounded-full bg-white opacity-20" />
        ))}
      </div>

      <Logo />

      <main>
        {/* ... */}
        <section ref={scrolly} className="h-screen w-full relative">
          {/* 1. Background Layer */}
          <div ref={background} className="background-wipe absolute inset-0 z-0" />

          {/* 2. Content Layer (Text & Images) */}
          <div className="absolute inset-0 z-10 text-white">
            <h1 className="hero-title absolute inset-x-0 top-1/3 text-center text-5xl md:text-7xl font-black z-30">
              LA LIBERTAD DE<br />DEJARLOS IR
            </h1>
            {sectionsConfig.map((section, index) => {
              // Calculate specific border-radius for the "rotating angle" effect
              let radius = '200px 200px 200px 200px';
              if (index % 4 === 0) radius = '0px 150px 150px 150px'; // TL
              if (index % 4 === 1) radius = '150px 0px 150px 150px'; // TR
              if (index % 4 === 2) radius = '150px 150px 0px 150px'; // BR
              if (index % 4 === 3) radius = '150px 150px 150px 0px'; // BL

              return (
                <div key={index} className="absolute inset-0">
                  <div id={`section-${index}-title`} className="absolute left-0 top-0 h-full w-full md:w-1/2 flex items-center justify-center p-8 md:p-16">
                    <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4 max-w-lg">
                      <h2 className="text-4xl md:text-6xl font-bold">{section.title}</h2>
                      {section.subtitle && <h3 className="text-2xl font-semibold opacity-90 uppercase tracking-widest">{section.subtitle}</h3>}
                      {/* Feature List (Rich Icons) */}
                      <ul className="space-y-4 mt-6">
                        {section.features.map((feature, idx) => {
                          const Icon = feature.icon;
                          return (
                            <li key={idx} className="flex items-center space-x-4 text-sm md:text-base opacity-90 group cursor-default">
                              <div className="p-2 bg-white/20 rounded-full group-hover:bg-white/40 transition-colors">
                                <Icon size={18} className="text-white" />
                              </div>
                              <span>{feature.text}</span>
                            </li>
                          );
                        })}
                      </ul>
                      <a
                        href="#"
                        className="mt-8 inline-block px-8 py-3 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-black transition-colors uppercase tracking-widest text-sm"
                      >
                        Más Información
                      </a>
                    </div>
                  </div>
                  <div id={`section-${index}-image`} className="absolute left-0 top-1/2 md:left-auto md:right-0 md:top-0 h-1/2 w-full md:h-full md:w-1/2 flex items-center justify-center">
                    <Image
                      src={section.image}
                      alt={section.title}
                      width={500}
                      height={600}
                      placeholder="blur"
                      style={{ borderRadius: radius }}
                      className="shadow-2xl bg-white/10 p-2 w-64 h-80 md:w-[500px] md:h-[600px] object-cover transition-all image-tilt-target"
                    />
                  </div>
                </div>
              );
            })}
            <div className="footer-title absolute inset-0 flex flex-col items-center justify-end text-center opacity-0 pb-32 space-y-8">
              <h2 className="text-8xl md:text-5xl font-bold">EMPEZÁ HOY.</h2>
              <div className="flex flex-col md:flex-row gap-4">
                <button className="bg-white text-black px-6 py-3 rounded-xl font-bold flex items-center gap-3 hover:scale-105 transition-transform">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74 1.18 0 2.21-.93 3.12-.93.65 0 3.19.1 4.52 2.38-3.79 1.88-3.11 6.84 1.28 8.68-.69 1.34-1.29 2.13-1.8 2.53zM13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" /></svg>
                  <span>App Store</span>
                </button>
                <button className="bg-transparent border border-gray-500 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-3 hover:bg-white/10 hover:border-white transition-all">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm11.597 11.598l7.108-7.109A.996.996 0 0022 6.96v10.08a1 1 0 00-.686-.657l-7.108-7.11zM14.5 12.708l-1.415 1.414 7.022 7.022c.2.2.534.148.625-.11l.363-.984-6.595-7.342zM4.292 23.415l7.342-6.595-.984-.363a.475.475 0 00-.11-.625L4.292 23.415z" /></svg>
                  <span>Google Play</span>
                </button>
              </div>
            </div>
          </div>

        </section>

        <footer className="bg-[#111] text-white py-16 px-8 relative z-20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">

            {/* COMPANY INFO */}
            <div className="col-span-1 md:col-span-2">
              <div className="mb-6 relative w-48 h-16">
                <Image
                  src="/img/logo.png"
                  alt="Encontrar Logo"
                  fill
                  style={{ objectFit: 'contain', objectPosition: 'left' }}
                />
              </div>
              <p className="text-gray-400 leading-relaxed max-w-sm">
                Comprometidos con la seguridad y la libertad de tus seres queridos.
                Tecnología de vanguardia para tu tranquilidad.
              </p>
            </div>

            {/* LINKS */}
            <div>
              <h5 className="text-lg font-bold mb-6 text-gray-200">Institucional</h5>
              <ul className="space-y-4 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Sobre Nosotros</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Servicios</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contacto</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Política de Privacidad</a></li>
              </ul>
            </div>

            {/* SOCIALS */}
            <div>
              <h5 className="text-lg font-bold mb-6 text-gray-200">Síguenos</h5>
              <div className="flex space-x-4">
                {/* Facebook Icon Placeholder */}
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all">
                  <span className="sr-only">Facebook</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                </a>
                {/* Twitter Icon Placeholder */}
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all">
                  <span className="sr-only">Twitter</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>
                </a>
                {/* Instagram Icon Placeholder */}
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all">
                  <span className="sr-only">Instagram</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                </a>
              </div>
            </div>

          </div>

          <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Encontrar S.A. Todos los derechos reservados.
          </div>
        </footer>
      </main>
    </div>
  );
}

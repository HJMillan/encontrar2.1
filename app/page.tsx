"use client";

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Logo from './components/Logo';
import ScrollySection from './components/ScrollySection';
import ScrollToTop from './components/ScrollToTop';
import StoreButton from './components/StoreButton';
import { sectionsConfig } from './data';

gsap.registerPlugin(ScrollTrigger);

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
            end: `+=${sectionsConfig.length * 1500}`,
            scrub: 1,
            pin: true,
          },
        });

        // --- Hero Scroll Effect ---
        // Use fromTo to strictly define the start state (1) and end state (0)
        // This prevents race conditions with the initial entrance animation
        tl.fromTo('.hero-title', { opacity: 1, scale: 1 }, { opacity: 0, scale: 0.8, duration: 1, ease: 'power2.in' }, '+=1');

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
        // Fluid Logo Transition (Desktop) - GPU Accelerated
        // Moves from center (50%) to left (approx 8%) using Transforms (42vw diff)
        // Moves from bottom (32px) to approx 25vh using Y transform
        tl.to('#app-logo', {
          x: '-42vw',       // Move left
          y: '-22vh',       // Move up
          scale: 0.7,       // Shrink
          opacity: 0,       // Fade out
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
            end: `+=${sectionsConfig.length * 1500}`,
            scrub: 1,
            pin: true,
          },
        });

        // --- Hero Animation ---
        tl.fromTo('.hero-title', { opacity: 1, scale: 1 }, { opacity: 0, scale: 0.8, duration: 1 }, '+=0.5');

        // --- Mobile Progress Bar ---
        gsap.to('.mobile-progress-bar', {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: scrolly.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0
          }
        });

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

      return () => {
        ctx.revert();
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
      <ScrollToTop />

      {/* Mobile Progress Bar (Refreshed) - High Visibility Gradient */}
      <div className="fixed top-0 left-0 h-1 bg-gradient-to-r from-purple-600 to-orange-500 z-50 mobile-progress-bar md:hidden origin-left scale-x-0 w-full shadow-md" />

      <main>
        {/* ... */}
        <section ref={scrolly} className="h-screen w-full relative">
          {/* 1. Background Layer */}
          <div ref={background} className="background-wipe absolute inset-0 z-0" />

          {/* 2. Content Layer (Text & Images) */}
          <div className="absolute inset-0 z-10">
            <h1 className="hero-title absolute inset-x-0 top-1/3 text-center text-5xl md:text-7xl font-black z-30">
              LA LIBERTAD DE<br />DEJARLOS IR
            </h1>
            {sectionsConfig.map((section, index) => (
              <ScrollySection key={index} section={section} index={index} priority={index === 0} />
            ))}
            <div className="footer-title absolute inset-0 flex flex-col items-center justify-end text-center opacity-0 pb-32 space-y-8">
              <h2 className="text-8xl md:text-5xl font-bold">EMPEZÁ HOY.</h2>
              <div className="flex flex-col md:flex-row gap-4">
                <StoreButton store="apple" variant="light" />
                <StoreButton store="google" variant="outline" />
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

"use client";

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Components
import Logo from './components/Logo';
import ScrollySection from './components/ScrollySection';
import ScrollToTop from './components/ScrollToTop';
import StoreButton from './components/StoreButton';
import Loader from './components/Loader';
import { BackgroundLayers } from './components/BackgroundLayers';
import { NavigationDots } from './components/NavigationDots';
import { sectionsConfig } from './data';

gsap.registerPlugin(ScrollTrigger);

// Constants (Clean Code / No Magic Numbers)
const SCROLL_PER_SECTION = 1500;
const NAV_DOT_SPACING_REM = 1.75;

export default function HomePage() {
  const container = useRef<HTMLDivElement>(null);
  const scrollyRef = useRef<HTMLElement>(null);
  const bgRefs = useRef<HTMLDivElement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState(0);

  // Loader Logic handled via GSAP Callback
  const handleLoaderFinish = () => {
    setIsLoading(false);
    // Refresh ScrollTrigger to ensure pinned elements positions are correct after the "curtain" lifts
    // and DOM potentially shifts (though z-index overlay shouldn't shift layout, it's safer)
    setTimeout(() => ScrollTrigger.refresh(), 100);
  };

  useGSAP(() => {
    if (isLoading) return;

    const mm = gsap.matchMedia();

    // --- Hero Cinematic Entrance ---
    gsap.fromTo('.hero-title',
      { y: 100, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 1.5, ease: 'power3.out', delay: 0.2 }
    );

    // Desktop Animations (Pinned Storytelling)
    mm.add("(min-width: 768px)", () => {
      // Main Timeline linked to Scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scrollyRef.current,
          start: 'top top',
          end: `+=${sectionsConfig.length * SCROLL_PER_SECTION}`,
          scrub: 1,
          pin: true,
        },
      });

      // 1. Hero Exit
      tl.fromTo('.hero-title', { opacity: 1, scale: 1 }, { opacity: 0, scale: 0.8, duration: 1, ease: 'power2.in' }, '+=1');

      // 2. Section Loop
      sectionsConfig.forEach((section, index) => {
        const sectionId = `#section-${index}`;
        const timelineLabel = `section${index}`;

        // Content Entrance (Pincer Effect)
        tl.fromTo(`${sectionId}-title`, { xPercent: -100, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 2 }, timelineLabel);
        tl.fromTo(`${sectionId}-image`, { xPercent: 100, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 2 }, timelineLabel);

        // Staggered Features
        tl.fromTo(`${sectionId}-title ul li`, { x: -20, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.1, duration: 1 }, `${timelineLabel}+=1`);

        // Navigation Pill
        tl.to('#nav-indicator', { y: `${index * NAV_DOT_SPACING_REM}rem`, duration: 1, ease: 'power2.out' }, timelineLabel);

        // Background Atmosphere Transition (Cross-fade)
        // Verified: Uses GSAP opacity scrubbing on the absolute layer. No CSS conflicts.
        if (bgRefs.current[index]) {
          tl.fromTo(bgRefs.current[index],
            { opacity: 0 },
            { opacity: 1, duration: 2, ease: 'none' },
            timelineLabel
          );
        }

        // UX State: Update Active Section for Navigation Dots
        // Using a lightweight, separate ScrollTrigger for state management to avoid scrubbing weirdness
        ScrollTrigger.create({
          trigger: 'body',
          start: `top+=${index * SCROLL_PER_SECTION} top`,
          end: `+=${SCROLL_PER_SECTION}`,
          onToggle: (self) => {
            if (self.isActive) setActiveSection(index);
          }
        });

        // Content Exit (Pincer Out or Standard Fade)
        // Must happen before the next section enters fully
        if (index < sectionsConfig.length) {
          const exitTime = `${timelineLabel}+=3`;
          tl.to(`${sectionId}-title`, { xPercent: -100, opacity: 0, duration: 2 }, exitTime);
          tl.to(`${sectionId}-image`, { xPercent: 100, opacity: 0, duration: 2 }, exitTime);
        }
      });

      // 3. Footer Entrance
      const footerLabel = 'footer';
      tl.to('.gps-device', { opacity: 0, scale: 0, duration: 2 }, footerLabel);
      tl.fromTo('.footer-title', { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 2 }, footerLabel);

      // Fluid Logo Transition
      tl.to('#app-logo', {
        x: '-42vw',
        y: '-22vh',
        scale: 0.7,
        opacity: 0,
        duration: 1.5,
        ease: 'power2.inOut'
      }, footerLabel);

      // Reveal static footer logo
      tl.to('#footer-logo', { opacity: 1, duration: 0.5 }, `${footerLabel}+=1`);
    });

    // Mobile Animations (Vertical Flow)
    mm.add("(max-width: 767px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scrollyRef.current,
          start: 'top top',
          end: `+=${sectionsConfig.length * SCROLL_PER_SECTION}`,
          scrub: 1,
          pin: true,
        },
      });

      // Hero Exit
      tl.fromTo('.hero-title', { opacity: 1, scale: 1 }, { opacity: 0, scale: 0.8, duration: 1 }, '+=0.5');

      // Progress Bar
      gsap.to('.mobile-progress-bar', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: scrollyRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0
        }
      });

      // Logo Animation
      tl.to('#app-logo', {
        left: '2rem',
        xPercent: 0,
        scale: 0.5,
        transformOrigin: 'bottom left',
        duration: 0.5,
        ease: 'power1.out'
      }, 0);

      // Section Loop
      sectionsConfig.forEach((section, index) => {
        const sectionId = `#section-${index}`;
        const timelineLabel = `section${index}`;

        // Vertical Entrance
        tl.fromTo(`${sectionId}-title`, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 2 }, timelineLabel);
        tl.fromTo(`${sectionId}-image`, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 2 }, timelineLabel);

        // Features (Stagger)
        tl.fromTo(`${sectionId}-title ul li`, { y: 10, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 1 }, `${timelineLabel}+=0.5`);

        // Background Atmosphere (Mobile)
        if (bgRefs.current[index]) {
          tl.fromTo(bgRefs.current[index],
            { opacity: 0 },
            { opacity: 1, duration: 2, ease: 'none' },
            timelineLabel
          );
        }

        // Exit
        const exitTime = `${timelineLabel}+=3`;
        tl.to(`${sectionId}-title`, { opacity: 0, duration: 2 }, exitTime);
        tl.to(`${sectionId}-image`, { opacity: 0, duration: 2 }, exitTime);
      });

      // Footer
      const footerLabel = 'footer';
      tl.to('.gps-device', { opacity: 0, scale: 0, duration: 2 }, footerLabel);
      tl.fromTo('.footer-title', { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 2 }, footerLabel);
      tl.to('#footer-logo', { opacity: 1, duration: 1 }, footerLabel);
    });

  }, { scope: container, dependencies: [isLoading] });

  return (
    <div ref={container} className="relative w-full overflow-hidden">
      {isLoading && <Loader onFinish={handleLoaderFinish} />}

      <NavigationDots sections={sectionsConfig} activeIndex={activeSection} />
      <Logo />
      <ScrollToTop />

      <main>
        <section ref={scrollyRef} className="h-screen w-full relative">

          {/* 1. Background Layers (Z-0) */}
          {/* Managed by GSAP opacity transitions. No CSS transitions allowed. */}
          <BackgroundLayers ref={bgRefs} sections={sectionsConfig} />

          {/* 2. Content Layer (Z-10) */}
          <div className="absolute inset-0 z-10 pointer-events-none">
            <h1 className="hero-title absolute inset-x-0 top-1/3 text-center text-5xl md:text-7xl font-black z-30 text-brand-negro">
              LA LIBERTAD DE<br />DEJARLOS IR...
            </h1>

            {sectionsConfig.map((section, index) => (
              <div key={section.title} className="pointer-events-auto">
                <ScrollySection section={section} index={index} priority={index === 0} />
              </div>
            ))}

            <div className="footer-title absolute inset-0 flex flex-col items-center justify-end text-center opacity-0 pb-32 space-y-8 pointer-events-auto">
              <h2 className="text-4xl md:text-6xl font-bold mb-40 text-brand-negro">LA SEGURIDAD DE SABER DONDE ESTÁN</h2>
              <h2 className="text-4xl md:text-6xl font-bold text-brand-azul">EMPEZÁ HOY.</h2>
              <div className="flex flex-col md:flex-row gap-4">
                <StoreButton store="apple" variant="dark" />
                <StoreButton store="google" variant="outline" />
              </div>
            </div>
          </div>
        </section>

        <footer className="bg-brand-negro text-white py-16 px-8 relative z-20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">

            {/* COMPANY INFO */}
            <div className="col-span-1 md:col-span-2">
              <div className="mb-6 relative w-48 h-16">
                <Image
                  src="/img/logo.png"
                  alt="Encontrar Logo"
                  fill
                  className="object-contain object-left"
                />
              </div>
              <p className="text-text-muted leading-relaxed max-w-sm">
                Comprometidos con la seguridad y la libertad de tus seres queridos.
                Tecnología de vanguardia para tu tranquilidad.
              </p>
            </div>

            {/* LINKS */}
            <div>
              <h5 className="text-lg font-bold mb-6 text-gray-200">Institucional</h5>
              <ul className="space-y-4 text-text-muted">
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
                {/* Instagram Icon Placeholder */}
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all">
                  <span className="sr-only">Instagram</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                </a>
              </div>
            </div>

          </div>

          <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-800 text-center text-text-muted text-sm">
            &copy; {new Date().getFullYear()} Encontrar S.A. Todos los derechos reservados.
          </div>
        </footer>
      </main>
    </div>
  );
}

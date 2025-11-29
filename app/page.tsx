"use client";

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- Configuration for the scrollytelling sections ---
const sectionsConfig = [
  { 
    title: 'MOTOR SEGURO',
    color: '#8A2BE2', // Violet
    image: '/next.svg', // Placeholder
  },
  { 
    title: 'INDEPENDENCIA',
    color: '#FF0080', // Pink
    image: '/img/abuelo.jpg',
  },
  { 
    title: 'SIN CORREAS',
    color: '#00D1FF', // Cyan
    image: '/img/mascota.jpg',
  },
  { 
    title: 'PROTEGE TU VALOR',
    color: '#FFD700', // Gold
    image: '/globe.svg', // Placeholder
  },
];

export default function HomePage() {
  const component = useRef<HTMLDivElement>(null);
  const scrolly = useRef<HTMLElement>(null);
  const background = useRef<HTMLDivElement>(null);
  
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // --- Set initial colors ---
      const initialColor = '#FF4D00'; // Hero Orange
      gsap.set(background.current, {
        '--color-top': initialColor,
        '--color-bottom': initialColor,
        '--angle': '180deg',
      });
      
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
      tl.to('.hero-title', { opacity: 0, scale: 0.8, duration: 1, ease: 'power2.in' }, '+=1');

      // --- Loop through sections to create transitions ---
      sectionsConfig.forEach((section, index) => {
        const sectionId = `#section-${index}`;

        // Pincer animation IN
        tl.fromTo(`${sectionId}-title`, { xPercent: -100, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 2 }, `section${index}`);
        tl.fromTo(`${sectionId}-image`, { xPercent: 100, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 2 }, `section${index}`);

        // THE CRITICAL DIAGONAL WIPE TRANSITION
        tl.set(background.current, { '--color-bottom': section.color, '--angle': '170deg' }, `section${index}`);
        tl.to(background.current, { '--angle': '180deg', duration: 2 }, `section${index}`);
        tl.set(background.current, { '--color-top': section.color });

        // Pincer animation OUT
        if (index < sectionsConfig.length) {
            tl.to(`${sectionId}-title`, { xPercent: -100, opacity: 0, duration: 2 }, `section${index}+=3`);
            tl.to(`${sectionId}-image`, { xPercent: 100, opacity: 0, duration: 2 }, `section${index}+=3`);
        }
      });
      
      // --- Footer Transition ---
      tl.to('.gps-device', { opacity: 0, scale: 0, duration: 2}, 'footer');
      tl.set(background.current, { '--color-bottom': '#111', '--angle': '170deg' }, 'footer');
      tl.to(background.current, { '--angle': '180deg', duration: 2 }, 'footer');
      tl.set(background.current, { '--color-top': '#111' });
      tl.fromTo('.footer-title', { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 2 }, 'footer');


    }, component);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={component}>
      <style jsx global>{`
        .background-wipe {
          background: linear-gradient(var(--angle), var(--color-top) 0%, var(--color-top) 50%, var(--color-bottom) 50%, var(--color-bottom) 100%);
        }
      `}</style>
      
      <main>
        <section ref={scrolly} className="h-screen w-full relative">
          {/* 1. Background Layer */}
          <div ref={background} className="background-wipe absolute inset-0 z-0" />

          {/* 2. Content Layer (Text & Images) */}
          <div className="absolute inset-0 z-10 text-white">
            <h1 className="hero-title absolute inset-x-0 top-1/3 text-center text-7xl md:text-9xl font-black z-30">
              LA LIBERTAD DE<br/>DEJARLOS IR
            </h1>
            {sectionsConfig.map((section, index) => (
              <div key={index} className="absolute inset-0">
                <div id={`section-${index}-title`} className="absolute left-0 top-0 h-full w-1/2 flex items-center justify-center">
                  <h2 className="text-6xl md:text-8xl font-bold -translate-x-1/4">{section.title}</h2>
                </div>
                <div id={`section-${index}-image`} className="absolute right-0 top-0 h-full w-1/2 flex items-center justify-center">
                   <Image src={section.image} alt={section.title} width={400} height={400} className="rounded-2xl shadow-2xl bg-white/10 p-2"/>
                </div>
              </div>
            ))}
             <div className="footer-title absolute inset-0 flex items-center justify-center text-center opacity-0">
                <h2 className="text-8xl md:text-9xl font-bold">EMPEZÁ HOY.</h2>
            </div>
          </div>
          
          {/* 3. GPS Device Layer */}
          <div className="gps-device absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
            <div className="w-64 h-64 relative">
              <Image src="/window.svg" alt="GPS Device" fill style={{ objectFit: 'contain' }} className="drop-shadow-2xl" />
            </div>
          </div>

        </section>
        
        <footer className="h-96 bg-[#111]" />
      </main>
    </div>
  );
}

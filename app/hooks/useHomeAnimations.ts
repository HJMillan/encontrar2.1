'use client';

import { useRef, RefObject } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Section } from '../types';

gsap.registerPlugin(ScrollTrigger);

// Constants
const SCROLL_PER_SECTION = 1500;
const NAV_DOT_SPACING_REM = 1.75;

interface UseHomeAnimationsProps {
    containerRef: RefObject<HTMLDivElement | null>;
    scrollyRef: RefObject<HTMLElement | null>;
    bgRefs: RefObject<HTMLDivElement[] | null>;
    sectionsConfig: Section[];
    setActiveSection: (index: number) => void;
}

export function useHomeAnimations({
    containerRef,
    scrollyRef,
    bgRefs,
    sectionsConfig,
    setActiveSection
}: UseHomeAnimationsProps) {
    useGSAP(() => {
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

            // 0. Logo Transition (Center -> Top Left)
            tl.to('#app-logo', {
                left: '2.5rem',
                top: '2.5rem',
                x: '0%',
                y: '0%',
                xPercent: 0,
                yPercent: 0,
                scale: 0.5,
                transformOrigin: 'top left',
                opacity: 1,
                duration: 1,
                ease: 'power2.inOut'
            }, 0);

            // 1. Hero Exit
            tl.fromTo('.hero-title', { opacity: 1, scale: 1 }, { opacity: 0, scale: 0.8, duration: 1, ease: 'power2.in' }, '+=1');

            // 2. Section Loop
            sectionsConfig.forEach((section, index) => {
                const sectionId = `#section-${index}-content`;
                const timelineLabel = `section${index}`;

                // Generic Content Entrance (Fade Up)
                tl.fromTo(sectionId,
                    { y: 50, opacity: 0, scale: 0.95 },
                    { y: 0, opacity: 1, scale: 1, duration: 2, ease: 'power2.out' },
                    timelineLabel
                );

                // Navigation Pill
                tl.to('#nav-indicator', { y: `${index * NAV_DOT_SPACING_REM}rem`, duration: 1, ease: 'power2.out' }, timelineLabel);

                // Background Atmosphere Transition (Cross-fade)
                if (bgRefs.current && bgRefs.current[index]) {
                    tl.fromTo(bgRefs.current[index],
                        { opacity: 0 },
                        { opacity: 1, duration: 2, ease: 'none' },
                        timelineLabel
                    );
                }

                // UX State: Update Active Section for Navigation Dots
                ScrollTrigger.create({
                    trigger: 'body',
                    start: `top+=${index * SCROLL_PER_SECTION} top`,
                    end: `+=${SCROLL_PER_SECTION}`,
                    onToggle: (self) => {
                        if (self.isActive) setActiveSection(index);
                    }
                });

                // Content Exit (Fade Out)
                if (index < sectionsConfig.length) {
                    const exitTime = `${timelineLabel}+=3`;
                    tl.to(sectionId, { opacity: 0, scale: 0.9, duration: 2 }, exitTime);
                }
            });

            // 3. Footer Entrance
            const footerLabel = 'footer';
            tl.fromTo('.footer-title', { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 2 }, footerLabel);

            // Logo transition to footer status
            tl.to('#app-logo', { opacity: 0, duration: 0.5 }, footerLabel);
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

            // Logo Animation (Center -> Top Left Mobile)
            tl.to('#app-logo', {
                left: '1.5rem',
                top: '1.5rem',
                xPercent: 0,
                yPercent: 0,
                scale: 0.4,
                transformOrigin: 'top left',
                duration: 0.5,
                ease: 'power1.out'
            }, 0);

            // Section Loop
            sectionsConfig.forEach((section, index) => {
                const sectionId = `#section-${index}-content`;
                const timelineLabel = `section${index}`;

                // Vertical Entrance (Fade Up)
                tl.fromTo(sectionId, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 2 }, timelineLabel);

                // Background Atmosphere (Mobile)
                if (bgRefs.current && bgRefs.current[index]) {
                    tl.fromTo(bgRefs.current[index],
                        { opacity: 0 },
                        { opacity: 1, duration: 2, ease: 'none' },
                        timelineLabel
                    );
                }

                // Exit
                const exitTime = `${timelineLabel}+=3`;
                tl.to(sectionId, { opacity: 0, duration: 2 }, exitTime);
            });

            // Footer
            const footerLabel = 'footer';
            tl.fromTo('.footer-title', { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 2 }, footerLabel);
            tl.to('#footer-logo', { opacity: 1, duration: 1 }, footerLabel);
        });

    }, { scope: containerRef });
}

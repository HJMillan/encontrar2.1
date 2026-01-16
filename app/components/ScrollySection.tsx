"use client";

import React, { useRef } from 'react';
import Image, { StaticImageData } from 'next/image';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { SectionData } from '../types';

interface ScrollySectionProps {
    section: SectionData;
    index: number;
    priority?: boolean;
}

// Synced with page.tsx
const SCROLL_PER_SECTION = 1500;

export default function ScrollySection({ section, index, priority }: ScrollySectionProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    // Initial "Neutral" State (Rounded Rect)
    const initialRadius = '24px';

    // Target "Nose" State (Asymmetric)
    // TL, TR, BR, BL
    let targetRadius = '40px 12px 12px 12px'; // Default (Index 0 / Mod 0 - Top Left)
    if (index % 4 === 1) targetRadius = '12px 40px 12px 12px'; // Top Right
    if (index % 4 === 2) targetRadius = '12px 12px 40px 12px'; // Bottom Right
    if (index % 4 === 3) targetRadius = '12px 12px 12px 40px'; // Bottom Left

    useGSAP(() => {
        if (!cardRef.current) return;

        // Since the sections are pinned in a single container, we calculate 
        // the "Virtual Scroll" position where this specific section becomes active.
        const startOffset = index * SCROLL_PER_SECTION;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: 'body', // Global trigger due to pinning
                start: `top+=${startOffset} top`, // Virtual Start
                end: `+=1000`, // Duration of the "active" phase
                scrub: true,
            }
        });

        // 1. Morphing: Neutral -> Nose -> Neutral
        tl.fromTo(cardRef.current,
            { borderRadius: initialRadius, border: '1px solid rgba(255,255,255,0.2)' },
            {
                borderRadius: targetRadius,
                borderColor: 'rgba(255,255,255,0.6)',
                boxShadow: '0 0 30px rgba(255,255,255,0.2)',
                duration: 1,
                ease: 'power2.out'
            },
            0 // Start at beginning
        );

        // 2. Parallax: Move Image inside Container
        // We use position '0' to run it parallel with the morphing
        if (imageRef.current) {
            tl.fromTo(imageRef.current,
                { yPercent: -15 },
                { yPercent: 15, ease: 'none', duration: 2 }, // Double duration to span the whole interaction (morph in + out)
                0
            );
        }

        // Return to neutral at the end of the timeline/scroll
        tl.to(cardRef.current, {
            borderRadius: initialRadius,
            borderColor: 'rgba(255,255,255,0.2)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
            duration: 1,
            ease: 'power2.in'
        }, 1); // Starts after step 1 finishes (at 50% of total if we consider the previous duration 1)

    }, { scope: containerRef, dependencies: [index] });

    // Determine colors based on textColor prop (defaulting to text-white if undefined)
    const isTextBlack = section.textColor === 'text-brand-negro' || section.textColor?.includes('brand-azul') || section.textColor?.includes('brand-fucsia');
    // Increase contrast for icons on light backgrounds
    const featureBgClass = 'bg-white/40 group-hover:bg-white/60 text-current';
    const buttonClass = isTextBlack
        ? 'border-brand-negro text-brand-negro hover:bg-brand-negro hover:text-white'
        : 'border-white text-white hover:bg-white hover:text-brand-negro';

    return (
        <div ref={containerRef} className="absolute inset-0">
            {/* Text Column */}
            <div id={`section-${index}-title`} className={`absolute left-0 top-0 h-1/2 md:h-full w-full md:w-1/2 flex items-center justify-center p-8 md:p-16 ${section.textColor || 'text-white'}`}>
                <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4 max-w-lg">
                    <h2 className="text-4xl md:text-6xl font-bold">{section.title}</h2>
                    {section.subtitle && <h3 className="text-2xl font-semibold opacity-90 uppercase tracking-widest">{section.subtitle}</h3>}

                    {/* Feature List */}
                    <ul className="space-y-4 mt-6">
                        {section.features.map((feature, idx) => {
                            const Icon = feature.icon;
                            return (
                                <li key={idx} className="flex items-center space-x-4 text-sm md:text-base opacity-90 group cursor-default">
                                    <div className={`p-2 rounded-full transition-colors ${featureBgClass}`}>
                                        <Icon size={18} className="currentColor" />
                                    </div>
                                    <span>{feature.text}</span>
                                </li>
                            );
                        })}
                    </ul>

                    <a
                        href="#"
                        className={`mt-8 inline-block px-8 py-3 border-2 font-bold rounded-full transition-colors uppercase tracking-widest text-sm ${buttonClass}`}
                    >
                        Más Información
                    </a>
                </div>
            </div>

            {/* Image Column */}
            <div id={`section-${index}-image`} className="absolute left-0 top-1/2 md:left-auto md:right-0 md:top-0 h-1/2 w-full md:h-full md:w-1/2 flex items-center justify-center p-6">
                {/* Glass Frame Wrapper */}
                <div
                    ref={cardRef}
                    // Initial classes (will be seemingly overridden by GSAP but good for SSR/No-JS safety)
                    // Added overflow-hidden for parallax masking
                    className="relative w-64 h-80 md:w-[500px] md:h-[500px] p-3 bg-white/40 shadow-[0_20px_60px_rgba(0,0,0,0.1)] ring-1 ring-white/40 backdrop-blur-md transition-all duration-700 ease-out hover:scale-[1.02] overflow-hidden"
                    style={{ borderRadius: initialRadius }}
                >
                    <Image
                        ref={imageRef as any} // Cast if ref type mismatch with Next Image
                        src={section.image}
                        alt={section.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        placeholder="blur"
                        // Handle string vs StaticImageData for placeholder
                        blurDataURL={typeof section.image === 'string' ? undefined : (section.image as StaticImageData).blurDataURL}
                        priority={!!priority}
                        style={{ borderRadius: 'inherit' }} // Inherit parent's morphing radius
                        // Added scale-125 for parallax movement room
                        className="object-cover p-3 scale-125"
                    />
                </div>
            </div>
        </div>
    );
}

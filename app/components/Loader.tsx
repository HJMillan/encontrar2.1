"use client";

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

interface LoaderProps {
    onFinish: () => void;
}

export default function Loader({ onFinish }: LoaderProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                onFinish();
            }
        });

        // 1. Initial State
        gsap.set(textRef.current, { opacity: 0, y: 20 });

        // 2. Text Fade In
        tl.to(textRef.current, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out"
        });

        // 3. Pause for reading
        tl.to({}, { duration: 0.5 });

        // 4. The Curtain Reveal (Move Up)
        tl.to(containerRef.current, {
            yPercent: -100,
            duration: 1.2,
            ease: "power4.inOut"
        });

    }, { scope: containerRef });

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[100] bg-brand-negro flex items-center justify-center pointer-events-auto"
        >
            <h1
                ref={textRef}
                className="text-white text-sm md:text-base tracking-[0.2em] uppercase font-light opacity-0"
            >
                La libertad de dejarlos ir...
            </h1>
        </div>
    );
}

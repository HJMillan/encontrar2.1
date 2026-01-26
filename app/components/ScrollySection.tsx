"use client";

import React, { useRef } from 'react';
import { Section } from '../types';
import SectionRenderer from './sections/SectionRenderer';

interface ScrollySectionProps {
    section: Section;
    index: number;
    priority?: boolean;
}

export default function ScrollySection({ section, index, priority }: ScrollySectionProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <div ref={containerRef} className="absolute inset-0 flex items-center justify-center p-4">
            {/* 
                Wrapper with ID expected by Page.tsx if we keep specific animations, 
                OR we act as a generic container. 
                For now, we provide a clean container for the Renderer.
                We might set IDs here if we want page.tsx to animate this whole block.
            */}
            <div id={`section-${index}-content`} className="w-full h-full">
                <SectionRenderer section={section} />
            </div>
        </div>
    );
}

import React from 'react';
import { SectionData } from '../types';

interface NavigationDotsProps {
    sections: SectionData[];
    activeIndex: number;
}

export const NavigationDots = ({ sections, activeIndex }: NavigationDotsProps) => {
    return (
        <>
            {/* Desktop Navigation */}
            <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-4">
                {/* Sliding Indicator (Controlled by GSAP) */}
                <div
                    id="nav-indicator"
                    className="absolute top-0 left-0 w-3 h-3 rounded-full bg-brand-negro shadow-[0_0_15px_rgba(0,0,0,0.2)] z-10 transition-colors duration-300"
                />

                {/* Static Background Dots */}
                {sections.map((section, idx) => {
                    const isActive = idx === activeIndex;
                    // Extract branding color from text-brand-X or default to bg-brand-negro
                    // Heuristic: If section has 'text-brand-azul', dot is 'bg-brand-azul'
                    let dotColorClass = 'bg-brand-negro/20'; // Default inactive

                    if (isActive) {
                        if (section.textColor?.includes('brand-azul')) dotColorClass = 'bg-brand-azul';
                        else if (section.textColor?.includes('brand-fucsia')) dotColorClass = 'bg-brand-fucsia';
                        else dotColorClass = 'bg-brand-negro';
                    }

                    return (
                        <div
                            key={idx}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${isActive ? `scale-150 ${dotColorClass}` : 'bg-brand-negro/20'}`}
                        />
                    );
                })}
            </div>

            {/* Mobile Progress Bar */}
            <div className="fixed top-0 left-0 h-1 bg-gradient-to-r from-brand-azul to-brand-fucsia z-50 mobile-progress-bar md:hidden origin-left scale-x-0 w-full shadow-md" />
        </>
    );
};

import React, { forwardRef } from 'react';
import { Section } from '../types';

interface BackgroundLayersProps {
    sections: Section[];
}

export const BackgroundLayers = forwardRef<HTMLDivElement[], BackgroundLayersProps>(({ sections }, ref) => {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none">
            {/* Base Layer: Hero (Neutral Start) */}
            <div className="absolute inset-0 z-0 bg-bg-hero" />

            {/* Overlay Layers: Sections (Atmospheres) */}
            {sections.map((section, index) => (
                <div
                    key={`bg-${index}`}
                    ref={(el) => {
                        // Safe handling of ForwardedRef for array of elements
                        if (ref && typeof ref !== 'function' && ref.current && el) {
                            ref.current[index] = el;
                        }
                    }}
                    className={`absolute inset-0 z-0 opacity-0 ${section.backgroundColor}`}
                />
            ))}
        </div>
    );
});

BackgroundLayers.displayName = 'BackgroundLayers';

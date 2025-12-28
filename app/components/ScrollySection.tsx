import React from 'react';
import Image, { StaticImageData } from 'next/image';
import { SectionData } from '../types';

interface ScrollySectionProps {
    section: SectionData;
    index: number;
    priority?: boolean;
}

export default function ScrollySection({ section, index, priority }: ScrollySectionProps) {
    // Calculate specific border-radius for the "rotating angle" effect based on index
    // Calculate specific border-radius for the "Organic Asymmetry" effect (Squircle-like)
    // We avoid sharp 0px corners, using 60px as the "sharpest" point for a premium feel.
    let radius = '200px 200px 200px 200px';
    if (index % 4 === 0) radius = '60px 200px 200px 200px'; // TL "Nose"
    if (index % 4 === 1) radius = '200px 60px 200px 200px'; // TR "Nose"
    if (index % 4 === 2) radius = '200px 200px 60px 200px'; // BR "Nose"
    if (index % 4 === 3) radius = '200px 200px 200px 60px'; // BL "Nose"

    // Determine colors based on textColor prop (defaulting to text-white if undefined)
    const isTextBlack = section.textColor === 'text-black';
    const featureBgClass = isTextBlack ? 'bg-black/10 group-hover:bg-black/20' : 'bg-white/20 group-hover:bg-white/40';
    const buttonClass = isTextBlack
        ? 'border-black text-black hover:bg-black hover:text-white'
        : 'border-white text-white hover:bg-white hover:text-black';

    return (
        <div className="absolute inset-0">
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
                    className="relative w-64 h-80 md:w-[500px] md:h-[500px] p-3 bg-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.2)] ring-1 ring-white/20 backdrop-blur-sm transition-all duration-700 ease-out hover:scale-[1.02]"
                    style={{ borderRadius: radius }}
                >
                    <Image
                        src={section.image}
                        alt={section.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        placeholder="blur"
                        // Handle string vs StaticImageData for placeholder
                        blurDataURL={typeof section.image === 'string' ? undefined : (section.image as StaticImageData).blurDataURL}
                        priority={!!priority}
                        style={{ borderRadius: radius }}
                        className="object-cover p-3"
                    />
                </div>
            </div>
        </div>
    );
}

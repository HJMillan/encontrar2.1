import React from 'react';
import Image, { StaticImageData } from 'next/image';
import { LucideIcon } from 'lucide-react';

interface Feature {
    text: string;
    icon: LucideIcon;
}

interface SectionData {
    title: string;
    subtitle?: string;
    image: StaticImageData | string;
    color: string;
    textColor?: string;
    features: Feature[];
}

interface ScrollySectionProps {
    section: SectionData;
    index: number;
    priority?: boolean;
}

export default function ScrollySection({ section, index, priority }: ScrollySectionProps) {
    // Calculate specific border-radius for the "rotating angle" effect based on index
    let radius = '200px 200px 200px 200px';
    if (index % 4 === 0) radius = '0px 150px 150px 150px'; // TL
    if (index % 4 === 1) radius = '150px 0px 150px 150px'; // TR
    if (index % 4 === 2) radius = '150px 150px 0px 150px'; // BR
    if (index % 4 === 3) radius = '150px 150px 150px 0px'; // BL

    // Determine colors based on textColor prop (defaulting to text-white if undefined)
    const isTextBlack = section.textColor === 'text-black';
    const featureBgClass = isTextBlack ? 'bg-black/10 group-hover:bg-black/20' : 'bg-white/20 group-hover:bg-white/40';
    const buttonClass = isTextBlack
        ? 'border-black text-black hover:bg-black hover:text-white'
        : 'border-white text-white hover:bg-white hover:text-black';

    return (
        <div className="absolute inset-0">
            {/* Text Column */}
            <div id={`section-${index}-title`} className={`absolute left-0 top-0 h-full w-full md:w-1/2 flex items-center justify-center p-8 md:p-16 ${section.textColor || 'text-white'}`}>
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
            <div id={`section-${index}-image`} className="absolute left-0 top-1/2 md:left-auto md:right-0 md:top-0 h-1/2 w-full md:h-full md:w-1/2 flex items-center justify-center">
                <Image
                    src={section.image}
                    alt={section.title}
                    width={500}
                    height={600}
                    placeholder="blur"
                    // Handle string vs StaticImageData for placeholder
                    blurDataURL={typeof section.image === 'string' ? undefined : (section.image as StaticImageData).blurDataURL}
                    priority={!!priority}
                    style={{ borderRadius: radius }}
                    className="shadow-2xl bg-white/10 p-2 w-64 h-80 md:w-[500px] md:h-[600px] object-cover transition-all"
                />
            </div>
        </div>
    );
}

import React from 'react';
import Image, { StaticImageData } from 'next/image';
import { FeatureSection } from '../../types';

export default function FeatureView({ data }: { data: FeatureSection }) {
    // Determine title colors driven by branding or specific overrides
    // Mockup shows: Title in Blue, Subtitle in Dark Gray
    const titleColor = 'text-brand-azul';
    const subtitleColor = 'text-gray-800';

    return (
        <div className="flex flex-col md:flex-row h-full items-center justify-center relative z-10 px-4 md:px-12 max-w-7xl mx-auto gap-8 md:gap-16 font-sans">

            {/* Text Column (Left) */}
            <div className="flex-1 order-2 md:order-1 flex flex-col items-center md:items-start text-center md:text-left">

                {/* Titles */}
                <h2 className={`text-5xl md:text-7xl font-black mb-2 ${titleColor} uppercase leading-none`}>
                    {data.title}
                </h2>
                {data.subtitle && (
                    <h3 className={`text-3xl md:text-4xl font-bold mb-10 ${subtitleColor} uppercase tracking-wide opacity-90`}>
                        {data.subtitle}
                    </h3>
                )}

                {/* Feature List */}
                <ul className="space-y-6 mb-10 w-full max-w-md">
                    {data.features.map((feature, idx) => {
                        const Icon = feature.icon;
                        return (
                            <li key={idx} className="flex items-center gap-4 text-gray-600 font-medium text-lg">
                                <div className="p-2 rounded-full text-brand-azul bg-blue-50">
                                    <Icon size={24} strokeWidth={2} />
                                </div>
                                <span className="text-left">{feature.text}</span>
                            </li>
                        );
                    })}
                </ul>

                {/* Pill Button */}
                <button className="bg-[#ffb6c1] hover:bg-[#ff9eb0] text-white font-bold py-4 px-10 rounded-full transition-all duration-300 uppercase text-xs tracking-widest shadow-md hover:shadow-lg transform hover:-translate-y-1">
                    Más Información
                </button>
            </div>

            {/* Image Column (Right) */}
            <div className="flex-1 order-1 md:order-2 flex justify-center items-center relative w-full h-[50vh] md:h-auto">
                <div className="relative w-72 h-72 md:w-[500px] md:h-[500px]">

                    {/* Dynamic Decorations based on ID */}
                    {(() => {
                        // Map IDs to specific Angles (Clockwise flow)
                        // 0deg = Right, 90deg = Bottom, etc.
                        // We want 4 corners essentially: 
                        // Familiar: Top-Right (-45deg)
                        // Objetos: Bottom-Right (45deg)
                        // Vehiculo: Bottom-Left (135deg)
                        // Mascota: Top-Left (225deg)

                        const angleMap: Record<string, number> = {
                            'legacy-familiar': -45,
                            'legacy-objetos': 45,
                            'legacy-vehiculo': 135,
                            'legacy-mascota': 225
                        };

                        // Default to -45 if not found
                        const angleDeg = angleMap[data.id] ?? -45;
                        const angleRad = (angleDeg * Math.PI) / 180;

                        // 1. Transparent Circle: Center ON Border of Main
                        // Main Radius R = 50%
                        const tX = 50 + 50 * Math.cos(angleRad);
                        const tY = 50 + 50 * Math.sin(angleRad);

                        // 2. Solid Circle: "Mas separados" = Distinct position
                        // We shift it significantly (e.g., +120 degrees) so it doesn't overlap/clump with the transparent one.
                        // Ideally creates a balanced "satellite" effect.
                        const solidDist = 70; // Keeping it relatively close (70% radius)
                        const solidAngleRad = ((angleDeg + 120) * Math.PI) / 180;
                        const sX = 50 + solidDist * Math.cos(solidAngleRad);
                        const sY = 50 + solidDist * Math.sin(solidAngleRad);

                        return (
                            <>
                                {/* Decoration 1: Transparent Blue Circle */}
                                <div
                                    className="absolute w-44 h-44 md:w-80 md:h-80 bg-brand-azul rounded-full opacity-60 filter blur-[1px] z-20 mix-blend-multiply transition-all duration-700 ease-out"
                                    style={{
                                        left: `${tX}%`,
                                        top: `${tY}%`,
                                        transform: 'translate(-50%, -50%)' // Center the div on the coordinate
                                    }}
                                />

                                {/* Decoration 2: Solid Blue Circle */}
                                {/* Reduced size for the "satellite" look, closer than before */}
                                <div
                                    className="absolute w-16 h-16 md:w-28 md:h-28 bg-brand-azul rounded-full z-0 opacity-100 transition-all duration-700 ease-out shadow-lg"
                                    style={{
                                        left: `${sX}%`,
                                        top: `${sY}%`,
                                        transform: 'translate(-50%, -50%)'
                                    }}
                                />
                            </>
                        );
                    })()}

                    {/* Main Image Mask */}
                    <div className="relative w-full h-full rounded-full overflow-hidden border-8 border-white shadow-2xl z-10 bg-white">
                        <Image
                            src={data.image}
                            alt={data.title}
                            fill
                            className="object-cover"
                            priority
                            placeholder="blur"
                            blurDataURL={typeof data.image === 'string' ? undefined : (data.image as StaticImageData).blurDataURL}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

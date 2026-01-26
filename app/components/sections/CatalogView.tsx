import React from 'react';
import Image from 'next/image';
import { CatalogSection } from '../../types';

export default function CatalogView({ data }: { data: CatalogSection }) {
    return (
        <div className="flex flex-col h-full justify-center relative z-10 px-4 md:px-12 max-w-7xl mx-auto font-sans">
            {/* Header */}
            <div className="text-center mb-12 md:mb-16">
                <h2 className="text-5xl md:text-7xl font-black mb-6 text-brand-negro">
                    {data.title}
                </h2>
                <div className="max-w-2xl mx-auto">
                    <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
                        {data.copy}
                    </p>
                </div>
            </div>

            {/* Grid of Circular Items */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 w-full">
                {data.products.map((product, index) => {
                    // "Random" but fixed angle based on index (Golden Angle approximation to spread them out)
                    // We add a base offset (e.g., -45 degrees) to keep them mostly on one side/corner if desired, 
                    // or let them spin all around. Let's vary them: 
                    // product 0: bottom-right (45deg)
                    // product 1: top-right (-45deg)
                    // product 2: bottom-left (135deg)
                    // simplified logic: 
                    const angles = [45, -30, 120, 200, -100];
                    const angleDeg = angles[index % angles.length];
                    const angleRad = (angleDeg * Math.PI) / 180;

                    // Math:
                    // Container size (Relative parent) = 100% (w-64)
                    // Main Circle Radius R = 50%
                    // We want Blue Circle Center to be at distance R from Center (border of main circle)
                    // Blue Circle Size = w-32 (50% of container) -> Radius r = 25%
                    // CenterX = 50% + 50% * cos(theta)
                    // CenterY = 50% + 50% * sin(theta)
                    // Left = CenterX - r = 50% + 50%*cos - 25% = 25% + 50%*cos
                    // Top = CenterY - r = 50% + 50%*sin - 25% = 25% + 50%*sin

                    const left = 25 + 50 * Math.cos(angleRad);
                    const top = 25 + 50 * Math.sin(angleRad);

                    return (
                        <div key={product.id} className="flex flex-col items-center text-center group cursor-default">

                            {/* Image Container with Decoration */}
                            <div className="relative mb-8 w-64 h-64 flex-shrink-0">
                                {/* Decorative Blue Circle */}
                                <div
                                    className="absolute w-32 h-32 bg-brand-azul rounded-full opacity-50 filter blur-[1px] z-20 transform transition-all duration-700 group-hover:scale-110 ease-out"
                                    style={{
                                        left: `${left}%`,
                                        top: `${top}%`,
                                    }}
                                />

                                {/* Main Image Mask */}
                                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-lg z-10 bg-white">
                                    {typeof product.image === 'string' ? (
                                        // Fallback for empty/string image
                                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                                            no img
                                        </div>
                                    ) : (
                                        product.image && (
                                            <Image
                                                src={product.image}
                                                alt={product.models.join(', ')}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        )
                                    )}
                                </div>
                            </div>

                            {/* Title */}
                            <h3 className="text-brand-azul font-bold text-3xl mb-2">
                                {product.category}
                            </h3>

                            {/* Description */}
                            <p className="text-brand-negro font-medium text-sm mb-1 leading-tight">
                                {product.description}
                            </p>
                            <p className="text-gray-500 text-xs mb-6 font-light">
                                {product.models.join(' / ')}
                            </p>

                            {/* Pill Button */}
                            <button className="bg-[#ffb6c1] hover:bg-[#ff9eb0] text-white font-bold py-3 px-8 rounded-full transition-all duration-300 uppercase text-xs tracking-widest shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                                Más Información
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

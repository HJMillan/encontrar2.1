import React from 'react';
import Image from 'next/image';

export default function Logo() {
    return (
        <div id="app-logo" className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 transition-opacity duration-500">
            {/* 
               Ripple Energy Structure 
               - Size: 96px (6rem) square for anchor.
            */}
            <div className="relative w-28 h-28 md:w-48 md:h-48 grid place-items-center">

                {/* 
                   Wave 3 (Outer/Last)
                   - Delay 2.4s
                */}
                <span className="absolute inset-0 rounded-full ripple-energy-animation z-0"
                    style={{
                        animationDelay: '2.4s',
                        border: '2px solid color-mix(in srgb, #ffb6c1, transparent 80%)',
                        boxShadow: '0 0 15px color-mix(in srgb, #ffb6c1, transparent 70%)'
                    }}
                />

                {/* 
                   Wave 2 (Middle)
                   - Delay 1.2s
                */}
                <span className="absolute inset-0 rounded-full ripple-energy-animation z-0"
                    style={{
                        animationDelay: '1.2s',
                        border: '2px solid color-mix(in srgb, #ffb6c1, transparent 80%)',
                        boxShadow: '0 0 15px color-mix(in srgb, #ffb6c1, transparent 70%)'
                    }}
                />

                {/* 
                   Wave 1 (Inner/First)
                   - Delay 0s
                */}
                <span className="absolute inset-0 rounded-full ripple-energy-animation z-0"
                    style={{
                        animationDelay: '0s',
                        border: '2px solid color-mix(in srgb, #ffb6c1, transparent 80%)',
                        boxShadow: '0 0 15px color-mix(in srgb, #ffb6c1, transparent 70%)'
                    }}
                />

                {/* 
                   Solid White Anchor (Top Layer z-10)
                */}
                <span className="absolute inset-0 rounded-full bg-white/50 shadow-lg z-10" />

                {/* 
                   Inner Circle Overlay 
                   - Superposed 50% opacity = Solid center effect.
                   - Inset-6 creates the "rim" effect.
                */}
                <span className="absolute inset-6 rounded-full bg-white/50 z-10" />

                {/* 
                   Logo Image 
                   - Centered on white background.
                   - Z-20 to sit on top of everything.
                */}
                <div className="absolute inset-10 z-20 translate-y-1">
                    {/* Mobile Logo (logo_ar.png) */}
                    <div className="md:hidden w-full h-full relative">
                        <Image
                            src="/img/logo_ar.png"
                            alt="Logo Mobile"
                            fill
                            style={{ objectFit: 'contain' }}
                            className="drop-shadow-none"
                        />
                    </div>

                    {/* Desktop Logo (logo.png) */}
                    <div className="hidden md:block w-full h-full relative">
                        <Image
                            src="/img/logo.png"
                            alt="Logo Desktop"
                            fill
                            style={{ objectFit: 'contain' }}
                            className="drop-shadow-none"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

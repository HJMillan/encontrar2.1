import React from 'react';
import Image from 'next/image';

export default function Logo() {
    return (
        <div id="app-logo" className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 transition-opacity duration-500">
            {/* 
               Premium "Anti-Loader" Structure 
               - Size: 96px (6rem) square for perfect circle halos.
            */}
            <div className="relative w-24 h-24 grid place-items-center">

                {/* 
                   Halo 2: Outer Breath (Big)
                */}
                <span className="absolute inset-0 rounded-full breathing-halo-animation z-0"
                    style={{
                        animationDelay: '1.1s',
                        backgroundColor: 'rgba(255, 255, 255, 0.4)', // Visible fallback 
                        boxShadow: '0 0 30px 10px rgba(255, 255, 255, 0.5)' // Heavy glow
                    }}
                />

                {/* 
                   Halo 1: Inner Breath (Medium)
                */}
                <span className="absolute inset-0 rounded-full breathing-halo-animation z-0"
                    style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.6)',
                        boxShadow: '0 0 20px 5px rgba(255, 255, 255, 0.6)'
                    }}
                />

                {/* 
                   Fixed Ring Anchor & Background (Top Layer of Backgrounds)
                */}
                <span className="absolute inset-0 rounded-full bg-white border border-white/20 shadow-[0_0_0_1px_rgba(255,255,255,0.05)] relative z-10" />

                {/* 
                   Logo Image 
                   - Contained within the circle.
                   - Increased padding (p-5) for breathing room.
                */}
                <div className="relative w-full h-full p-5 z-20">
                    <Image
                        src="/img/logo.png"
                        alt="Logo"
                        fill
                        style={{ objectFit: 'contain' }}
                        className="drop-shadow-none"
                    />
                </div>
            </div>
        </div>
    );
}

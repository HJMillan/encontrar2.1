import React from 'react';
import Image from 'next/image';

export default function Logo() {
    return (
        <div id="app-logo" className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 transition-opacity duration-500">
            <div className="relative w-48 h-24">
                <Image
                    src="/img/logo.png"
                    alt="Logo"
                    fill
                    style={{ objectFit: 'contain' }}
                />
            </div>
        </div>
    );
}

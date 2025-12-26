import React from 'react';
import Image from 'next/image';

export default function GPSDevice() {
    return (
        <div className="gps-device absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
            <div className="w-64 h-64 relative">
                <Image
                    src="/img/gps.png"
                    alt="GPS Device"
                    fill
                    style={{ objectFit: 'contain' }}
                    className="drop-shadow-2xl"
                />
            </div>
        </div>
    );
}

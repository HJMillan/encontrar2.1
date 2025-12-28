"use client";

import React from 'react';
import Image from 'next/image';

interface LoaderProps {
    isLoading: boolean;
}

export default function Loader({ isLoading }: LoaderProps) {
    return (
        <div
            className={`fixed inset-0 z-[100] bg-black flex items-center justify-center transition-opacity duration-700 ease-out ${isLoading ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
        >
            <div className="relative flex flex-col items-center">
                {/* Logo with Pulse Effect */}
                <div className="relative w-32 h-32 md:w-48 md:h-48 animate-pulse mb-8">
                    <Image
                        src="/img/logo.png"
                        alt="Loading..."
                        fill
                        className="object-contain"
                        priority
                    />
                </div>

                {/* Spinner */}
                <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
            </div>
        </div>
    );
}

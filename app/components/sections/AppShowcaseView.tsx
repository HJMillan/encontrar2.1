import React from 'react';
import Image from 'next/image';
import { AppShowcaseSection } from '../../types';
import StoreButton from '../StoreButton';

export default function AppShowcaseView({ data }: { data: AppShowcaseSection }) {
    return (
        <div className="flex flex-col md:flex-row h-full items-center justify-center relative z-10 px-4 md:px-12 max-w-7xl mx-auto gap-12">

            {/* Text Content */}
            <div className="flex-1 order-2 md:order-1 text-center md:text-left">
                <h2 className="text-4xl md:text-6xl font-black mb-8 text-brand-negro">
                    {data.title}
                </h2>
                <ul className="space-y-6 mb-12 text-lg md:text-xl text-gray-600">
                    {data.features.map((feature, i) => (
                        <li key={i} className="flex items-center justify-center md:justify-start gap-4">
                            <span className="w-2 h-2 rounded-full bg-brand-azul" />
                            {feature}
                        </li>
                    ))}
                </ul>

                <div className="flex flex-col items-center md:items-start gap-6">
                    <p className="font-bold text-brand-azul">
                        {data.cta.label}
                    </p>
                    <div className="flex gap-4">
                        <StoreButton store="apple" variant="dark" />
                        <StoreButton store="google" variant="outline" />
                    </div>
                </div>
            </div>

            {/* Phone Mockup / Image */}
            <div className="flex-1 order-1 md:order-2 relative h-[50vh] md:h-[70vh] w-full flex items-center justify-center">
                {/* Placeholder for real screenshots slider later */}
                {data.screenshots[0] && (
                    <img
                        src={typeof data.screenshots[0] === 'string' ? data.screenshots[0] : data.screenshots[0].src}
                        alt="App Screenshot"
                        className="h-full w-auto shadow-2xl rounded-[2rem] md:rounded-[2.5rem] border-8 border-gray-900 bg-gray-900 mx-auto"
                    />
                )}
            </div>
        </div>
    );
}

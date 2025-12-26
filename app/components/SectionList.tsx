import React from 'react';
import Image from 'next/image';
import { sectionsConfig } from '../data';

export default function SectionList() {
    return (
        <>
            {sectionsConfig.map((section, index) => (
                <div key={index} className="absolute inset-0">
                    <div
                        id={`section-${index}-title`}
                        className="absolute left-0 top-0 h-1/2 w-full md:h-full md:w-1/2 flex items-center justify-center"
                    >
                        <h2 className="text-4xl md:text-6xl lg:text-8xl font-bold md:-translate-x-1/4 text-center px-4">
                            {section.title}
                        </h2>
                    </div>
                    <div
                        id={`section-${index}-image`}
                        className="absolute left-0 top-1/2 md:left-auto md:right-0 md:top-0 h-1/2 w-full md:h-full md:w-1/2 flex items-center justify-center"
                    >
                        <Image
                            src={section.image}
                            alt={section.title}
                            width={400}
                            height={400}
                            className="rounded-2xl shadow-2xl bg-white/10 p-2 w-48 h-48 md:w-[400px] md:h-[400px] object-cover"
                        />
                    </div>
                </div>
            ))}
        </>
    );
}

import React from 'react';
import { StepsSection } from '../../types';

export default function StepsView({ data }: { data: StepsSection }) {
    return (
        <div className="flex flex-col h-full justify-center relative z-10 px-4 md:px-12 max-w-7xl mx-auto">
            <h2 className={`text-4xl md:text-6xl font-black text-center mb-16 ${data.theme === 'dark' ? 'text-white' : 'text-brand-negro'}`}>
                {data.title}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                {/* Connecting Line (Desktop Only) */}
                <div className="hidden md:block absolute top-12 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-azul to-transparent opacity-30" />

                {data.steps.map((step, index) => (
                    <div key={index} className="flex flex-col items-center text-center relative z-10">
                        <div className="w-24 h-24 rounded-full bg-brand-azul text-white flex items-center justify-center text-4xl font-bold mb-8 shadow-lg shadow-brand-azul/30">
                            {step.number}
                        </div>
                        <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                        <p className="text-gray-500 leading-relaxed max-w-xs">
                            {step.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

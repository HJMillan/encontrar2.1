import React from 'react';
import { InfoGridSection } from '../../types';

export default function InfoGridView({ data }: { data: InfoGridSection }) {
    return (
        <div className="flex flex-col h-full justify-center relative z-10 px-4 md:px-12 max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-6xl font-black mb-4 text-brand-negro">
                    {data.title}
                </h2>
                {data.subtitle && (
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                        {data.subtitle}
                    </p>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {data.items.map((item, i) => {
                    const Icon = item.icon;
                    return (
                        <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            {Icon && (
                                <div className="mb-6 w-12 h-12 bg-brand-azul/10 rounded-xl flex items-center justify-center text-brand-azul">
                                    <Icon size={24} />
                                </div>
                            )}
                            <h3 className="text-xl font-bold mb-3 text-brand-negro">{item.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                {item.text}
                            </p>
                        </div>
                    );
                })}
            </div>

            <div className="mt-16 text-center">
                <p className="text-brand-azul font-bold text-lg">
                    “No es solo un dispositivo: hay una empresa acompañándote.”
                </p>
            </div>
        </div>
    );
}

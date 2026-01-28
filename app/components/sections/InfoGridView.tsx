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
                {data.items.slice(0, 4).map((item, i) => {
                    const Icon = item.icon;
                    return (
                        <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                            {Icon && (
                                <div className="mb-6 w-14 h-14 bg-brand-azul/5 rounded-xl flex items-center justify-center text-brand-azul">
                                    <Icon size={28} strokeWidth={2} className="fill-brand-azul/10" />
                                </div>
                            )}
                            <h3 className="text-xl font-bold mb-3 text-brand-negro">{item.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                {item.text}
                            </p>
                        </div>
                    );
                })}

                {data.items[4] && (
                    <div className="col-span-1 md:col-span-2 lg:col-span-4 bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                        {data.items[4].icon && (() => {
                            const LastIcon = data.items[4].icon;
                            return (
                                <div className="w-20 h-20 bg-blue-50 rounded-full flex flex-shrink-0 items-center justify-center text-brand-azul">
                                    <LastIcon size={40} strokeWidth={2} className="fill-blue-100" />
                                </div>
                            )
                        })()}
                        <div>
                            <h3 className="text-2xl font-bold mb-3 text-brand-negro">{data.items[4].title}</h3>
                            <p className="text-gray-600 text-lg leading-relaxed max-w-2xl">
                                {data.items[4].text}
                            </p>
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-16 text-center">
                <p className="text-gray-600 text-lg">
                    “No es solo un dispositivo: hay una <span className="font-bold text-gray-900">empresa acompañándote</span>.”
                </p>
            </div>
        </div>
    );
}

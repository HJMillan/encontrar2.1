import React from 'react';
import { PricingSection } from '../../types';
import { Check } from 'lucide-react';

export default function PricingView({ data }: { data: PricingSection }) {
    return (
        <div className="flex flex-col h-full justify-center items-center relative z-10 px-4 max-w-5xl mx-auto">
            {/* Decorative Background Elements (Optimized) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none z-[-1] overflow-visible max-w-3xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-azul/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-fucsia/5 rounded-full mix-blend-multiply filter blur-3xl opacity-70" />
            </div>
            <h2 className="text-2xl md:text-4xl font-black text-center mb-4 md:mb-8 text-brand-negro">
                {data.title}
            </h2>

            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 transform hover:scale-105 transition-transform duration-300 hover:shadow-2xl">
                <div className="bg-brand-azul p-5 md:p-6 text-center text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="text-xl font-medium mb-1 uppercase tracking-wide text-white">{data.modelName}</h3>
                        {data.price ? (
                            <div className="text-3xl md:text-4xl font-black mb-1">
                                {data.price.amount}
                                {data.price.period && (
                                    <span className="text-lg md:text-xl opacity-80 font-medium ml-1">
                                        / {data.price.period}
                                    </span>
                                )}
                            </div>
                        ) : (
                            <div className="text-4xl md:text-5xl font-black mb-2">$ Consultar</div>
                        )}
                        <div className="inline-block bg-white/20 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 text-xs font-bold mt-2 shadow-sm text-white">
                            {data.disclaimer}
                        </div>
                    </div>
                </div>
                <div className="p-5 md:p-6">
                    <ul className="space-y-2 mb-4">
                        {data.features.map((feature, i) => {
                            const Icon = feature.icon || Check;
                            return (
                                <li key={i} className="flex items-start gap-4 text-gray-700">
                                    <div className={`mt-1 rounded-full p-2 ${feature.highlight ? 'bg-blue-100 text-brand-azul' : 'bg-gray-100 text-gray-500'}`}>
                                        <Icon size={18} strokeWidth={3} />
                                    </div>
                                    <span className={`${feature.highlight ? 'font-bold text-gray-900' : 'font-medium'}`}>
                                        {feature.text}
                                    </span>
                                </li>
                            );
                        })}
                    </ul>
                    <button className="w-full mt-4 bg-brand-negro text-white font-bold py-3 rounded-xl hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 duration-200">
                        {data.price ? "Empezar Ahora" : "Solicitar Cotización Rápida"}
                    </button>
                </div>
            </div>
        </div>
    );
}

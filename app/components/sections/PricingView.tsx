import React from 'react';
import { PricingSection } from '../../types';
import { Check } from 'lucide-react';

export default function PricingView({ data }: { data: PricingSection }) {
    return (
        <div className="flex flex-col h-full justify-center items-center relative z-10 px-4 max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black text-center mb-12 text-brand-negro">
                {data.title}
            </h2>

            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 transform hover:scale-105 transition-transform duration-300">
                <div className="bg-brand-azul p-8 text-center text-white">
                    <h3 className="text-2xl font-bold mb-2">{data.modelName}</h3>
                    {data.price && <div className="text-5xl font-black">{data.price}</div>}
                    <p className="opacity-90 mt-2 text-sm">{data.disclaimer}</p>
                </div>
                <div className="p-8">
                    <ul className="space-y-4">
                        {data.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-4 text-gray-700">
                                <div className="mt-1 bg-green-100 text-green-600 rounded-full p-1">
                                    <Check size={14} strokeWidth={3} />
                                </div>
                                <span className="font-medium">{feature}</span>
                            </li>
                        ))}
                    </ul>
                    <button className="w-full mt-8 bg-brand-negro text-white font-bold py-4 rounded-xl hover:bg-gray-800 transition-colors">
                        Contratar Ahora
                    </button>
                </div>
            </div>
        </div>
    );
}

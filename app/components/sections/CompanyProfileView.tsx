import React from 'react';
import { CompanyProfileSection } from '../../types';
import { ShieldCheck, Award, MapPin, Headphones, Smartphone, CheckCircle2 } from 'lucide-react';

interface CompanyProfileViewProps {
    data: CompanyProfileSection;
}

export default function CompanyProfileView({ data }: CompanyProfileViewProps) {
    return (
        <section
            id={data.id}
            className={`py-12 px-6 md:px-12 ${data.backgroundColor} transition-colors duration-500`}
        >
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8 text-center md:text-left">
                    <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${data.textColor || 'text-brand-azul'}`}>
                        {data.title}
                    </h2>
                    <p className="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-3xl">
                        {data.description}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    {/* Left Column: Narrative */}
                    <div className="space-y-4">
                        {/* Purpose */}
                        <div className="bg-white/60 p-6 rounded-2xl border border-white/50 shadow-sm backdrop-blur-sm">
                            <h3 className="text-xl font-bold text-brand-azul mb-2">
                                {data.purpose.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {data.purpose.text}
                            </p>
                        </div>

                        {/* Mission */}
                        <div className="bg-white/60 p-6 rounded-2xl border border-white/50 shadow-sm backdrop-blur-sm">
                            <h3 className="text-xl font-bold text-brand-azul mb-2">
                                {data.mission.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {data.mission.text}
                            </p>
                        </div>

                        {/* Objective */}
                        <div className="bg-brand-azul/5 p-6 rounded-2xl border border-brand-azul/10">
                            <h3 className="text-xl font-bold text-brand-azul mb-2">
                                {data.objective.title}
                            </h3>
                            <p className="text-gray-700 font-medium">
                                {data.objective.text}
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Legitimacy Signals */}
                    <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                            <ShieldCheck className="w-8 h-8 text-brand-fucsia" />
                            {data.legitimacySignals.title}
                        </h3>

                        <div className="space-y-6">
                            {data.legitimacySignals.items.map((item, index) => (
                                <div key={index} className="flex items-start gap-4 group">
                                    <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-brand-fucsia/10 flex items-center justify-center group-hover:bg-brand-fucsia/20 transition-colors">
                                        <CheckCircle2 className="w-5 h-5 text-brand-fucsia" />
                                    </div>
                                    <p className="text-gray-700 font-medium text-lg pt-1">
                                        {item}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Visual Trust Indicator (Decorative) */}
                        <div className="mt-10 pt-6 border-t border-gray-100 flex flex-wrap items-center justify-center gap-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                            <div className="text-center min-w-[80px]">
                                <MapPin className="w-8 h-8 mx-auto mb-2 text-brand-azul" />
                                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Argentina</span>
                            </div>
                            <div className="hidden md:block h-8 w-px bg-gray-300"></div>
                            <div className="text-center min-w-[80px]">
                                <Headphones className="w-8 h-8 mx-auto mb-2 text-brand-azul" />
                                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Soporte Local</span>
                            </div>
                            <div className="hidden md:block h-8 w-px bg-gray-300"></div>
                            <div className="text-center min-w-[80px]">
                                <Smartphone className="w-8 h-8 mx-auto mb-2 text-brand-azul" />
                                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">App Propia</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}



export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#111] flex flex-col items-center justify-center text-white p-4 overflow-hidden relative">

            {/* Radar Animation (Centerpiece) */}
            <div className="relative w-64 h-64 md:w-96 md:h-96 flex items-center justify-center mb-8">
                {/* Ripples (Reusing global animation) */}
                <div className="absolute inset-0 rounded-full ripple-energy-animation border-2 border-white/20" style={{ animationDelay: '0s' }} />
                <div className="absolute inset-0 rounded-full ripple-energy-animation border-2 border-white/20" style={{ animationDelay: '1.2s' }} />
                <div className="absolute inset-0 rounded-full ripple-energy-animation border-2 border-white/20" style={{ animationDelay: '2.4s' }} />

                {/* Static Center */}
                <div className="relative w-32 h-32 bg-white/10 rounded-full backdrop-blur-md flex items-center justify-center z-10 border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                    <span className="text-4xl font-black tracking-tighter">404</span>
                </div>
            </div>

            {/* Copy */}
            <h1 className="text-3xl md:text-5xl font-bold text-center mb-4 z-10 relative">
                No pudimos encontrar el rumbo
            </h1>
            <p className="text-gray-400 text-center max-w-md mb-10 z-10 text-lg relative leading-relaxed">
                Parece que la página que buscas está fuera de nuestra zona de cobertura.
            </p>

            {/* Action */}
            {/* Action */}
            <a
                href="/"
                className="px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform duration-300 z-10 shadow-[0_0_20px_rgba(255,255,255,0.4)]"
            >
                Volver a Zona Segura
            </a>
        </div>
    )
}

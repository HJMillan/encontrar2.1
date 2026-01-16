"use client";

import { useRef, useEffect } from 'react';
import { ReactLenis } from 'lenis/react'
import 'lenis/dist/lenis.css'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    const lenisRef = useRef<any>(null);

    useEffect(() => {
        // TAREA 2: CONFIGURACIÓN GLOBAL DE GSAP
        // Vital para evitar saltos en móvil cuando la barra de direcciones se esconde/muestra
        ScrollTrigger.config({
            ignoreMobileResize: true
        });

        // TAREA 1: SINCRONIZACIÓN LENIS + GSAP
        // Conectar el ticker de GSAP con el rAF de Lenis para scroll perfectamente fluido
        function update(time: number) {
            lenisRef.current?.lenis?.raf(time * 1000);
        }

        gsap.ticker.add(update);

        // Desactivar el lag smoothing de GSAP para evitar conflictos de "catch-up"
        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove(update);
        };
    }, []);

    return (
        <ReactLenis
            ref={lenisRef}
            root
            options={{
                lerp: 0.1,
                duration: 1.5,
                touchMultiplier: 1.5,
            }}
        >
            {children as any}
        </ReactLenis>
    );
}

import React from 'react';

/**
 * Google Play Store Logo
 * Full color vector graphic
 */
export const GooglePlayLogo = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <mask id="mask0_87_8320" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="7" y="3" width="24" height="26">
            <path d="M30.0484 14.4004C31.3172 15.0986 31.3172 16.9014 30.0484 17.5996L9.75627 28.7659C8.52052 29.4459 7 28.5634 7 27.1663L7 4.83374C7 3.43657 8.52052 2.55415 9.75627 3.23415L30.0484 14.4004Z" fill="#C4C4C4" />
        </mask>
        <g mask="url(#mask0_87_8320)">
            <path d="M7.63473 28.5466L20.2923 15.8179L7.84319 3.29883C7.34653 3.61721 7 4.1669 7 4.8339V27.1664C7 27.7355 7.25223 28.2191 7.63473 28.5466Z" fill="url(#paint0_linear_87_8320)" />
            <path d="M30.048 14.4003C31.3169 15.0985 31.3169 16.9012 30.048 17.5994L24.9287 20.4165L20.292 15.8175L24.6923 11.4531L30.048 14.4003Z" fill="url(#paint1_linear_87_8320)" />
            <path d="M24.9292 20.4168L20.2924 15.8179L7.63477 28.5466C8.19139 29.0232 9.02389 29.1691 9.75635 28.766L24.9292 20.4168Z" fill="url(#paint2_linear_87_8320)" />
            <path d="M7.84277 3.29865L20.2919 15.8177L24.6922 11.4533L9.75583 3.23415C9.11003 2.87878 8.38646 2.95013 7.84277 3.29865Z" fill="url(#paint3_linear_87_8320)" />
        </g>
        <defs>
            <linearGradient id="paint0_linear_87_8320" x1="15.6769" y1="10.874" x2="7.07106" y2="19.5506" gradientUnits="userSpaceOnUse">
                <stop stopColor="#00C3FF" />
                <stop offset="1" stopColor="#1BE2FA" />
            </linearGradient>
            <linearGradient id="paint1_linear_87_8320" x1="20.292" y1="15.8176" x2="31.7381" y2="15.8176" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FFCE00" />
                <stop offset="1" stopColor="#FFEA00" />
            </linearGradient>
            <linearGradient id="paint2_linear_87_8320" x1="7.36932" y1="30.1004" x2="22.595" y2="17.8937" gradientUnits="userSpaceOnUse">
                <stop stopColor="#DE2453" />
                <stop offset="1" stopColor="#FE3944" />
            </linearGradient>
            <linearGradient id="paint3_linear_87_8320" x1="8.10725" y1="1.90137" x2="22.5971" y2="13.7365" gradientUnits="userSpaceOnUse">
                <stop stopColor="#11D574" />
                <stop offset="1" stopColor="#01F176" />
            </linearGradient>
        </defs>
    </svg>
);

/**
 * Apple App Store Logo
 * Standard solid fill vector
 */
export const AppStoreLogo = ({ className = "w-6 h-6", stroke = "currentColor" }: { className?: string, stroke?: string }) => (
    <svg className={className} viewBox="0 0 64 64" stroke={stroke} fill="none" strokeWidth="3" xmlns="http://www.w3.org/2000/svg">
        <line x1="24.03" y1="39.07" x2="22.37" y2="41.97" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="34.86" y1="20.12" x2="26.05" y2="35.53" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="34.19" y1="28.31" x2="42.17" y2="41.97" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="29.39" y1="20.12" x2="32.16" y2="24.84" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="19.54" y1="35.53" x2="34.39" y2="35.53" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="44.71" y1="35.53" x2="38.41" y2="35.53" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="10.23" y="10.23" width="43.55" height="43.55" rx="10.31" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

interface StoreButtonProps {
    store: 'apple' | 'google';
    variant?: 'light' | 'dark' | 'outline';
    label?: string; // Optional custom label if not default
    href?: string;
}

export default function StoreButton({ store, variant = 'light', label, href = "#" }: StoreButtonProps) {
    const isApple = store === 'apple';
    const defaultLabel = isApple ? 'App Store' : 'Google Play';

    // Styles configuration
    const styles = {
        light: "bg-white text-black hover:scale-105 active:scale-95 border-transparent",
        dark: "bg-black text-white hover:scale-105 active:scale-95 border-transparent",
        outline: "bg-transparent border-gray-500 text-white hover:bg-white/10 hover:border-white active:scale-95 border"
    };

    return (
        <a
            href={href}
            className={`px-6 py-3 rounded-xl font-bold flex items-center gap-3 transition-all duration-300 border ${styles[variant]} group`}
        >
            {isApple ? (
                <AppStoreLogo className="w-7 h-7" />
            ) : (
                <GooglePlayLogo className="w-6 h-6" />
            )}
            <span>{label || defaultLabel}</span>
        </a>
    );
}

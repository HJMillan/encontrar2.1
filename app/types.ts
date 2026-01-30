import { LucideIcon } from 'lucide-react';
import { StaticImageData } from 'next/image';

// --- Base Types ---

export interface BaseSection {
    id: string;
    theme: 'dark' | 'light' | 'brand';
    // Visual styles maintained for transition logic
    backgroundColor: string; // Tailwind class
    textColor?: string;
}

// 1. Catalog (El Dispositivo)
export interface CatalogSection extends BaseSection {
    type: 'catalog';
    title: string;
    copy: string;
    products: {
        id: string;
        category: 'Conectados' | 'Portatiles' | 'TAG';
        models: string[]; // ["Gs900"]
        description?: string;
        image?: StaticImageData | string;
    }[];
}

// 2. Steps (Cómo funciona)
export interface StepsSection extends BaseSection {
    type: 'steps';
    title: string; // "Cómo funciona"
    subheading?: string;
    steps: {
        number: number;
        title: string;
        description: string;
        icon?: LucideIcon;
    }[];
}

// 3. App Showcase (La Experiencia)
export interface AppShowcaseSection extends BaseSection {
    type: 'app-showcase';
    title: string;
    features: string[];
    cta: { label: string; action: string };
    screenshots: (StaticImageData | string)[];
}

// 4. Pricing (Precios)
export interface PricingSection extends BaseSection {
    type: 'pricing';
    title: string;
    modelName: string; // "Suscripción Mensual"
    price?: {
        amount: string; // "$15.000"
        period?: string; // "mes"
    };
    features: {
        text: string;
        highlight?: boolean;
        icon?: LucideIcon;
    }[];
    disclaimer: string;
    ctaLabel?: string;
}

// 5. Info Grid (Empresa + Tranquilidad)
export interface InfoGridSection extends BaseSection {
    type: 'info-grid';
    title: string;
    subtitle?: string;
    items: {
        icon?: LucideIcon;
        title: string;
        text: string;
    }[];
}

// 6. Feature (Legacy/Use Cases)
export interface FeatureSection extends BaseSection {
    type: 'feature';
    title: string;
    subtitle?: string;
    image: StaticImageData | string;
    features: {
        text: string;
        icon: LucideIcon;
    }[];
}

// 7. Company Profile (La Empresa)
export interface CompanyProfileSection extends BaseSection {
    type: 'company-profile';
    title: string; // "Quiénes somos"
    description: string; // "ENCONTRAR es una empresa..."
    purpose: {
        title: string; // "Propósito"
        text: string;
    };
    mission: {
        title: string; // "Misión"
        text: string;
    };
    objective: {
        title: string; // "Objetivo"
        text: string;
    };
    legitimacySignals: {
        title: string; // "Señales de legitimidad"
        items: string[];
    };
}

// The Master Type
export type Section = CatalogSection | StepsSection | AppShowcaseSection | PricingSection | InfoGridSection | FeatureSection | CompanyProfileSection;


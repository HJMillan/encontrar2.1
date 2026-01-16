import { LucideIcon } from 'lucide-react';
import { StaticImageData } from 'next/image';

export interface Feature {
    text: string;
    icon: LucideIcon;
}

export interface Gradient {
    top: string;
    bottom: string;
}

export interface SectionData {
    title: string;
    subtitle?: string;
    image: StaticImageData | string;
    // Semantic color for UI accents (buttons, pills)
    color: string;
    // Tailwind class for the atmospheric background
    backgroundColor: string;
    // Tailwind class for text color
    textColor?: string;
    features: Feature[];
}

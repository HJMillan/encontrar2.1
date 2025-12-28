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
    color: string;
    gradient: Gradient;
    textColor?: string;
    features: Feature[];
}

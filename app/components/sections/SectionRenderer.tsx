import React from 'react';
import { Section } from '../../types';
import CatalogView from './CatalogView';
import StepsView from './StepsView';
import AppShowcaseView from './AppShowcaseView';
import PricingView from './PricingView';
import InfoGridView from './InfoGridView';
import FeatureView from './FeatureView';
import CompanyProfileView from './CompanyProfileView';

interface SectionRendererProps {
    section: Section;
}

export default function SectionRenderer({ section }: SectionRendererProps) {
    switch (section.type) {
        case 'catalog':
            return <CatalogView data={section} />;
        case 'steps':
            return <StepsView data={section} />;
        case 'app-showcase':
            return <AppShowcaseView data={section} />;
        case 'pricing':
            return <PricingView data={section} />;
        case 'info-grid':
            return <InfoGridView data={section} />;
        case 'feature':
            return <FeatureView data={section} />;
        case 'company-profile':
            return <CompanyProfileView data={section} />;
        default:
            return null;
    }
}

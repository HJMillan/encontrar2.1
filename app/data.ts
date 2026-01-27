import { Share2, MapPin, Bell, Battery, ShieldCheck, Map, Headphones, Smartphone, Navigation, Lock, LocateFixed, Activity, Heart } from 'lucide-react';
import { Section } from './types';

// Placeholder imports - logic to be replaced with real paths by user
import imgFamiliar from '../public/img/familiar.jpg';
import imgBicicleta from '../public/img/bicicleta.jpg';
import imgVehiculo from '../public/img/vehiculo.jpg';
import imgMascota from '../public/img/mascota.jpg';

export const sectionsConfig: Section[] = [
    // --- LEGACY SECTIONS (Restored as Features) ---
    {
        id: 'legacy-familiar',
        type: 'feature',
        title: 'Un Familiar',
        theme: 'light',
        backgroundColor: 'bg-bg-warm',
        textColor: 'text-brand-azul',
        subtitle: 'Cuidado y Seguridad',
        image: imgFamiliar,
        features: [
            { text: 'Geoposicionamiento en tiempo real', icon: MapPin },
            { text: 'Historial de trayecto recorrido', icon: Navigation },
            { text: 'Geocercas y Zonas Seguras', icon: ShieldCheck },
            { text: 'Alerta sin movimiento', icon: Bell }
        ]
    },
    {
        id: 'legacy-objetos',
        type: 'feature',
        title: 'Tus Objetos',
        theme: 'light',
        backgroundColor: 'bg-bg-cool',
        textColor: 'text-brand-fucsia',
        subtitle: 'Protección de Bienes',
        image: imgBicicleta,
        features: [
            { text: 'Geoposicionamiento preciso', icon: LocateFixed },
            { text: 'Historial de trayecto completo', icon: Navigation },
            { text: 'Configuración de Geocercas', icon: Lock },
            { text: 'Alerta movimiento no autorizado', icon: Bell }
        ]
    },
    {
        id: 'legacy-vehiculo',
        type: 'feature',
        title: 'Tu Vehiculo',
        theme: 'light',
        backgroundColor: 'bg-bg-tech',
        textColor: 'text-brand-azul',
        subtitle: 'Control Vehicular',
        image: imgVehiculo,
        features: [
            { text: 'Rastreo GPS instantáneo', icon: MapPin },
            { text: 'Historial de rutas y paradas', icon: Navigation },
            { text: 'Geocercas de seguridad', icon: ShieldCheck },
            { text: 'Alerta de desplazamiento', icon: Bell }
        ]
    },
    {
        id: 'legacy-mascota',
        type: 'feature',
        title: 'Tu Mascota',
        theme: 'light',
        backgroundColor: 'bg-bg-visual-soft',
        textColor: 'text-brand-fucsia',
        subtitle: 'Amor y Cuidado',
        image: imgMascota,
        features: [
            { text: 'Ubicación exacta 24/7', icon: MapPin },
            { text: 'Historial de paseos', icon: Activity },
            { text: 'Geocerca "Zona Segura"', icon: ShieldCheck },
            { text: 'Red de veterinarias cercanas', icon: Heart },
            { text: 'Historial clínico digital', icon: Activity },
            { text: 'Alerta de adopción', icon: Bell }
        ]
    },

    // 0. CATALOG (El Dispositivo) -> MOVED HERE
    {
        id: 'device-catalog',
        type: 'catalog',
        theme: 'light',
        backgroundColor: 'bg-bg-warm',
        title: '¿Qué es SmartTrack?',
        copy: 'Rastreo inteligente para objetos, vehículos o personas. Compacto, sin botones, automático.',
        products: [
            {
                id: 'gs900',
                category: 'Conectados',
                models: ['Gs900'],
                description: 'Requiere instalación. Ideal para vehículos y flotas.',
                image: '' // User to provide
            },
            {
                id: 'portables',
                category: 'Portatiles',
                models: ['Lk6000', 'Lk20000'],
                description: 'Solo carga, sin instalación. Autonomía extendida.',
                image: ''
            },
            {
                id: 'tag',
                category: 'TAG', // Should match union type
                models: ['Micro'],
                description: 'Dispositivos micro para mochilas, llaves o collares.',
                image: ''
            }
        ]
    },

    // 5. CÓMO FUNCIONA
    {
        id: 'how-it-works',
        type: 'steps',
        theme: 'brand',
        backgroundColor: 'bg-brand-azul',
        textColor: 'text-white',
        title: 'Cómo funciona',
        steps: [
            {
                number: 1,
                title: 'Contratas',
                description: 'Elegís el plan que mejor se adapta a vos.',
                icon: Share2
            },
            {
                number: 2,
                title: 'Colocás',
                description: 'El dispositivo donde lo necesitás.',
                icon: MapPin
            },
            {
                number: 3,
                title: 'Visualizás',
                description: 'Ves la ubicación y alertas desde la App.',
                icon: Smartphone
            }
        ]
    },
    // 6. LA EXPERIENCIA
    {
        id: 'app-experience',
        type: 'app-showcase',
        theme: 'light',
        backgroundColor: 'bg-bg-visual-soft', // Reusing soft bg
        title: 'Tu control en tiempo real',
        features: [
            'Mapa con ubicación clara y en tiempo real.',
            'Historial de recorridos y movimientos.',
            'Alertas configurables (movimiento, zonas, eventos).',
            'Reportes simples y fáciles de entender.'
        ],
        cta: {
            label: 'Probar Demo',
            action: '#'
        },
        screenshots: [
            '' // User to provide
        ]
    },
    // 7. PRECIOS
    {
        id: 'pricing',
        type: 'pricing',
        theme: 'dark',
        backgroundColor: 'bg-brand-negro',
        textColor: 'text-white',
        title: 'Precio y forma de compra',
        modelName: 'Suscripción Mensual',
        price: '$ Consultar',
        disclaimer: 'Sin costos ocultos ni configuraciones complicadas.',
        features: [
            'Uso completo de la plataforma SmartTrack.',
            'Acceso a la App (Android, iOS y Web).',
            'Conectividad incluida (chip y datos).',
            'Soporte técnico.',
            'Actualizaciones de la plataforma.'
        ]
    },
    // 8. TRANQUILIDAD
    {
        id: 'trust-info',
        type: 'info-grid',
        theme: 'light',
        backgroundColor: 'bg-gray-50',
        title: 'Tranquilidad y Confianza',
        subtitle: 'Datos que responden al miedo principal: “¿y si falla?”',
        items: [
            {
                title: 'Batería',
                text: 'Autonomía diseñada para uso real y cotidiano.',
                icon: Battery
            },
            {
                title: 'Garantía',
                text: 'El dispositivo cuenta con garantía y respaldo local.',
                icon: ShieldCheck
            },
            {
                title: 'Cobertura',
                text: 'Funciona en todo el país gracias a conectividad móvil.',
                icon: Map
            },
            {
                title: 'Soporte',
                text: 'Asistencia técnica disponible para acompañar al usuario.',
                icon: Headphones
            },
            {
                title: 'Empresa',
                text: 'ENCONTRAR es una empresa argentina con plataforma propia.',
                icon: ShieldCheck
            }
        ]
    }
];

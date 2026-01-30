import { Share2, MapPin, Bell, Battery, ShieldCheck, Map, Headphones, Smartphone, Navigation, Lock, LocateFixed, Activity, Heart, Monitor, Car, Radio, Building2 } from 'lucide-react';
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
        title: '¿Qué es Encontrar?',
        copy: 'Rastreo inteligente para objetos, vehículos o personas. Compacto, sin botones, automático.',
        products: [
            {
                id: 'gs900',
                category: 'Conectados',
                models: ['Gs900'],
                description: 'Requiere instalación. Ideal para vehículos y flotas.',
                image: '/img/model/gs900.png' // User to provide
            },
            {
                id: 'portables',
                category: 'Portatiles',
                models: ['Lk6000'],
                description: 'Solo carga, sin instalación. Autonomía extendida.',
                image: '/img/model/LK6000.png'
            },
            {
                id: 'tag',
                category: 'TAG', // Should match union type
                models: ['Micro'],
                description: 'Dispositivos micro para mochilas, llaves o collares.',
                image: '/img/model/tag.webp'
            }
        ]
    },

    // 5. CÓMO FUNCIONA
    {
        id: 'how-it-works',
        type: 'steps',
        theme: 'light',
        backgroundColor: 'bg-bg-tech',
        textColor: 'text-brand-azul',
        title: 'Cómo funciona',
        subheading: 'Colocás el dispositivo donde quieras y ves la ubicación desde tu celular.',
        steps: [
            {
                number: 1,
                title: 'Contratas el servicio',
                description: 'Elegís el plan que mejor se adapta a vos.',
                icon: Share2
            },
            {
                number: 2,
                title: 'Colocás el dispositivo',
                description: 'Donde lo necesitás (vehículo, mochila, mascota, etc.).',
                icon: MapPin
            },
            {
                number: 3,
                title: 'Visualizás la ubicación',
                description: 'Y recibís alertas desde la App.',
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
            '/img/campturas/Screenshot_02.png' // User to provide
        ]
    },
    // 7. PRECIOS
    {
        id: 'pricing',
        type: 'pricing',
        theme: 'light',
        backgroundColor: 'bg-bg-tech',
        textColor: 'text-brand-negro',
        title: 'Inversión simple, todo incluido',
        modelName: 'Plan SmartTrack Integral',
        price: {
            amount: 'Desde $15.000',
            period: 'mes'
        },
        disclaimer: 'Sin costos ocultos ni letras chicas.',
        features: [
            { text: 'Plataforma SmartTrack: Acceso total y actualizaciones.', icon: Monitor },
            { text: 'App Móvil: Control total en Android, iOS y Web.', icon: Smartphone },
            { text: 'Conectividad Total: Chip y datos bonificados.', icon: Radio, highlight: true },
            { text: 'Soporte técnico humano y ágil.', icon: Headphones },
            { text: 'Garantía de Transparencia.', icon: ShieldCheck, highlight: true }
        ]
    },
    // 8. LA EMPRESA (New Section)
    {
        id: 'company-profile',
        type: 'company-profile',
        theme: 'light',
        backgroundColor: 'bg-bg-warm',
        title: 'Quiénes somos',
        description: 'ENCONTRAR es una empresa argentina especializada en soluciones de rastreo satelital y monitoreo inteligente.',
        purpose: {
            title: 'Propósito',
            text: 'Brindar tranquilidad, control e información clara a personas, familias y empresas a través de tecnología simple y confiable.'
        },
        mission: {
            title: 'Misión',
            text: 'Facilitar el acceso al rastreo y monitoreo sin complejidad técnica.'
        },
        objective: {
            title: 'Objetivo',
            text: 'Generar confianza y respaldo institucional.'
        },
        legitimacySignals: {
            title: 'Señales de legitimidad',
            items: [
                'Empresa argentina.',
                'Plataforma propia.',
                'Soporte técnico local.',
                'Experiencia en soluciones de rastreo y monitoreo.'
            ]
        }
    },
    // 9. TRANQUILIDAD
    {
        id: 'trust-info',
        type: 'info-grid',
        theme: 'light',
        backgroundColor: 'bg-gray-50',
        title: 'Tranquilidad y Confianza',
        subtitle: 'Datos que responden al miedo principal: “¿y si falla?”',
        items: [
            {
                title: 'Batería de Larga Duración',
                text: 'Hasta 5 días de autonomía sin recargas constantes.',
                icon: Battery
            },
            {
                title: 'Garantía Local Inmediata',
                text: 'Respaldo directo en Argentina. Si falla, lo solucionamos.',
                icon: ShieldCheck
            },
            {
                title: 'Cobertura Nacional 4G',
                text: 'Tu vehículo siempre visible, estés donde estés.',
                icon: Map
            },
            {
                title: 'Soporte Humano',
                text: 'Asistencia técnica real para acompañarte siempre.',
                icon: Headphones
            },
            {
                title: 'Desarrollo 100% Argentino',
                text: 'Sin intermediarios. Hablas con quienes crearon la plataforma.',
                icon: Building2
            }
        ]
    }
];

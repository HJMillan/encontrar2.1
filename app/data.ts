import { MapPin, Navigation, Shield, Bell, Lock, Activity, Heart, LocateFixed } from 'lucide-react';
import imgFamiliar from '../public/img/familiar.jpg';
import imgBicicleta from '../public/img/bicicleta.jpg';
import imgVehiculo from '../public/img/vehiculo.jpg';
import imgMascota from '../public/img/mascota.jpg';

// Reusable text constant
export const longText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

export const sectionsConfig = [
    {
        title: 'Un Familiar',
        color: '#8A2BE2', // Violet
        textColor: 'text-white',
        subtitle: 'Cuidado y Seguridad',
        image: imgFamiliar,
        features: [
            { text: 'Geoposicionamiento en tiempo real', icon: MapPin },
            { text: 'Historial de trayecto recorrido', icon: Navigation },
            { text: 'Geocercas y Zonas Seguras', icon: Shield },
            { text: 'Alerta sin movimiento', icon: Bell }
        ]
    },
    {
        title: 'Tus Objetos',
        color: '#FF0080', // Pink
        textColor: 'text-white',
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
        title: 'Tu Vehiculo',
        color: '#00D1FF', // Cyan
        textColor: 'text-black', // Critical Contrast Fix
        subtitle: 'Control Vehicular',
        image: imgVehiculo,
        features: [
            { text: 'Rastreo GPS instantáneo', icon: MapPin },
            { text: 'Historial de rutas y paradas', icon: Navigation },
            { text: 'Geocercas de seguridad', icon: Shield },
            { text: 'Alerta de desplazamiento', icon: Bell }
        ]
    },
    {
        title: 'Tu Mascota',
        color: '#FFD700', // Gold
        textColor: 'text-black', // Critical Contrast Fix
        subtitle: 'Amor y Cuidado',
        image: imgMascota,
        features: [
            { text: 'Ubicación exacta 24/7', icon: MapPin },
            { text: 'Historial de paseos', icon: Activity },
            { text: 'Geocerca "Zona Segura"', icon: Shield },
            { text: 'Red de veterinarias cercanas', icon: Heart },
            { text: 'Historial clínico digital', icon: Activity },
            { text: 'Alerta de adopción', icon: Bell }
        ]
    },
];

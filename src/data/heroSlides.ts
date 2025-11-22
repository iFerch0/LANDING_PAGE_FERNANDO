// Curated Hero Slides Data
// Selected best images that tell a story of professional PC repair services

export interface HeroSlide {
    id: number;
    src: string;
    alt: string;
    title: string;
    subtitle: string;
    category: string;
    objectPosition?: string; // Punto focal: "center", "top", "center top", etc.
}

export const HERO_SLIDES: HeroSlide[] = [
    {
        id: 1,
        src: "/img/pc-hogar-oficina/10.jpg",
        alt: "Setup dual monitor profesional con laptop y monitor externo Acer configurado",
        title: "Configuración Profesional",
        subtitle: "Setups optimizados para productividad máxima",
        category: "Setup",
        objectPosition: "center 30%" // Monitores arriba
    },
    {
        id: 2,
        src: "/img/pc-hogar-oficina/2.jpg",
        alt: "Laptop Lenovo Windows completamente funcional después de reparación",
        title: "Laptop Restaurada",
        subtitle: "Rendimiento como nuevo garantizado",
        category: "Reparación",
        objectPosition: "center 25%" // Pantalla en la parte superior
    },
    {
        id: 3,
        src: "/img/pc-hogar-oficina/5.JPG",
        alt: "Interior de laptop mostrando motherboard, disco duro y RAM durante mantenimiento",
        title: "Mantenimiento Profundo",
        subtitle: "Diagnóstico y limpieza de componentes internos",
        category: "Mantenimiento",
        objectPosition: "center center" // Componentes centrados
    },
    {
        id: 4,
        src: "/img/pc-hogar-oficina/3.JPG",
        alt: "MacBook Air con instalación de macOS Monterey en progreso",
        title: "Instalación de Sistemas",
        subtitle: "Windows, macOS y Linux configurados a medida",
        category: "Software",
        objectPosition: "center 20%" // MacBook pantalla arriba
    },
    {
        id: 5,
        src: "/img/pc-hogar-oficina/8.JPG",
        alt: "Mini PC Dell abierta mostrando disco duro 500GB y sistema de ventilación",
        title: "Upgrade de Hardware",
        subtitle: "Ampliación de almacenamiento y memoria",
        category: "Upgrade",
        objectPosition: "center 40%" // Disco duro y ventilador
    }
];

// Datos centralizados para la sección de Casos de Éxito

export interface TechBadge {
  icon: string;
  label: string;
  variant: 'primary' | 'secondary' | 'warning' | 'success' | 'neutral' | 'accent';
}

export interface CaseStat {
  value: string;
  label: string;
}

export interface BeforeAfterData {
  beforeLabel: string;
  beforeImage: string;
  beforeAlt: string;
  beforeStats?: CaseStat[];
  afterLabel: string;
  afterImage: string;
  afterAlt: string;
  afterStats?: CaseStat[];
}

export interface SuccessCase {
  id: string;
  tag: string;
  tagIcon: string;
  title: string;
  featured?: boolean;
  beforeAfter: BeforeAfterData;
  techBadges: TechBadge[];
  details: {
    label: string;
    value: string;
  }[];
}

export const SUCCESS_CASES_HEADER = {
  eyebrow: "Casos de éxito reales",
  title: "Transformaciones técnicas",
  titleHighlight: " documentadas",
  subtitle: "Trabajos reales con resultados medibles: desde mantenimiento profesional hasta ensambles especializados"
};

export const SUCCESS_CASES: SuccessCase[] = [
  {
    id: "mantenimiento-termico",
    tag: "Mantenimiento Profundo",
    tagIcon: "🧹",
    title: "Reducción térmica crítica: 85°C → 45°C",
    featured: true,
    beforeAfter: {
      beforeLabel: "ANTES",
      beforeImage: "/img/antes-despues/optimized/1-mantenimiento-antes.JPG",
      beforeAlt: "PC con polvo antes del mantenimiento",
      beforeStats: [
        { value: "85°C", label: "Temperatura CPU" },
        { value: "Muy alto", label: "Ruido ventiladores" }
      ],
      afterLabel: "DESPUÉS",
      afterImage: "/img/antes-despues/optimized/1-manteniento-despues.JPG",
      afterAlt: "PC limpia después del mantenimiento",
      afterStats: [
        { value: "45°C", label: "Temperatura CPU" },
        { value: "Silencioso", label: "Funcionamiento" }
      ]
    },
    techBadges: [
      { icon: "🌡️", label: "Diagnóstico térmico", variant: "warning" },
      { icon: "🧹", label: "Limpieza profunda", variant: "primary" },
      { icon: "❄️", label: "Pasta térmica nueva", variant: "primary" },
      { icon: "⚡", label: "Calibración fans", variant: "accent" },
      { icon: "📊", label: "Pruebas térmicas", variant: "secondary" },
      { icon: "✅", label: "Validación final", variant: "neutral" }
    ],
    details: [
      {
        label: "Diagnóstico inicial",
        value: "Sobrecalentamiento crítico por obstrucción total de ventiladores y degradación de pasta térmica"
      },
      {
        label: "Intervención especializada",
        value: "Limpieza profunda con aire comprimido + reemplazo pasta térmica + calibración ventiladores"
      },
      {
        label: "Resultado medible",
        value: "Reducción 47% temperatura CPU (85°C→45°C) + eliminación 100% ruido operativo"
      }
    ]
  },
  {
    id: "ensamble-workstation",
    tag: "Ensamble Especializado",
    tagIcon: "🔧",
    title: "Workstation diseño: AMD Ryzen 8500G + DDR5 32GB",
    featured: false,
    beforeAfter: {
      beforeLabel: "COMPONENTES",
      beforeImage: "/img/antes-despues/optimized/2-ensamble-antes.jpg",
      beforeAlt: "Componentes AMD Ryzen 8500G, DDR5 32GB, SSD M.2 1TB antes del ensamble",
      afterLabel: "PC TERMINADA",
      afterImage: "/img/antes-despues/optimized/2-ensamble-despues.jpg",
      afterAlt: "PC para diseño gráfico con AMD Ryzen 8500G ensamblada y funcionando"
    },
    techBadges: [
      { icon: "🔥", label: "AMD Ryzen 8500G", variant: "warning" },
      { icon: "🔌", label: "Board A620", variant: "primary" },
      { icon: "❄️", label: "Refrigeración líquida", variant: "primary" },
      { icon: "⚡", label: "DDR5 32GB 6400MHz", variant: "accent" },
      { icon: "💾", label: "SSD M.2 1TB", variant: "secondary" },
      { icon: "📦", label: "Cooler Master Q300L", variant: "neutral" }
    ],
    details: [
      {
        label: "Aplicación específica",
        value: "Workstation diseño gráfico profesional con arquitectura escalable para GPU dedicada"
      },
      {
        label: "Configuración entregada",
        value: "Sistema operativo optimizado + suite Adobe + drivers especializados + pruebas rendimiento"
      },
      {
        label: "Garantía técnica",
        value: "6 meses hardware + soporte configuración + asesoría upgrade futuro"
      }
    ]
  },
  {
    id: "restauracion-completa",
    tag: "Restauración Completa",
    tagIcon: "🔄",
    title: "Rescate técnico: PC archivado → Estado regalo",
    featured: false,
    beforeAfter: {
      beforeLabel: "ESTADO INICIAL",
      beforeImage: "/img/antes-despues/optimized/3-mantenimiento-pc-sencillo-antes.JPG",
      beforeAlt: "PC archivado extremadamente sucio antes del mantenimiento",
      afterLabel: "RECUPERADO",
      afterImage: "/img/antes-despues/optimized/3-mantenimiento-pc-sencillo-despues.jpg",
      afterAlt: "PC recuperado después del mantenimiento completo, listo para regalo"
    },
    techBadges: [
      { icon: "🧹", label: "Limpieza profunda", variant: "primary" },
      { icon: "🔍", label: "Diagnóstico completo", variant: "primary" },
      { icon: "💾", label: "Instalación Windows", variant: "secondary" },
      { icon: "⚡", label: "Optimización sistema", variant: "accent" },
      { icon: "🔥", label: "Pasta térmica nueva", variant: "warning" },
      { icon: "✅", label: "Pruebas completas", variant: "neutral" }
    ],
    details: [
      {
        label: "Situación inicial",
        value: "PC archivado durante años, extremadamente sucio, destinado para regalo familiar"
      },
      {
        label: "Intervención técnica",
        value: "Desmontaje completo + limpieza especializada + reemplazo pasta térmica + instalación Windows limpio"
      },
      {
        label: "Entrega final",
        value: "PC completamente funcional como nuevo, optimizado y listo para regalo con garantía"
      }
    ]
  }
];

export const SUCCESS_CASES_CTA = {
  title: "¿Necesitas una transformación similar?",
  description: "Diagnóstico profesional inmediato con evaluación técnica en menos de 5 minutos",
  buttonText: "Solicitar evaluación técnica",
  buttonLink: "https://wa.me/573015218139?text=Hola%20Fernando%2C%20vi%20los%20casos%20de%20éxito%20y%20necesito%20ayuda%20con%20mi%20equipo",
  benefits: [
    { icon: "💬", text: "Diagnóstico inmediato" },
    { icon: "💰", text: "Cotización gratuita" },
    { icon: "📸", text: "Trabajo documentado" }
  ],
  trustIndicators: [
    { icon: "⭐", text: "98% clientes satisfechos" },
    { icon: "🛡️", text: "Garantía incluida" },
    { icon: "⏰", text: "Respuesta inmediata" }
  ]
};

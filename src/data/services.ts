export interface ServiceCase {
  title: string;
  text: string;
}

export interface ServiceFAQ {
  q: string;
  a: string;
}

export interface Service {
  slug: string;
  title: string;
  description: string;
  image: string;
  canonical: string;
  serviceName: string;
  cases: ServiceCase[];
  faqs: ServiceFAQ[];
  metadata: {
    title: string;
    description: string;
    keywords: string[];
    openGraph: {
      title: string;
      description: string;
    };
  };
  schema: {
    serviceName: string;
    serviceDescription: string;
    priceRange: string;
    serviceUrl: string;
  };
  review: {
    name: string;
    url: string;
    ratingValue: number;
    ratingCount: number;
  };
}

export const services: Service[] = [
  {
    slug: 'reparacion-computadores-monteria',
    title: 'Reparación de Computadores en Montería — Técnico Especialista',
    description:
      'Reparación profesional de computadores y portátiles en Montería. Diagnóstico GRATIS, atención en taller, garantía 30 días. Más de 8 años reparando PCs en Córdoba.',

    image: '/hero-poster.jpg',
    canonical: 'https://www.ferchotecnico.com/servicios/reparacion-computadores-monteria',
    serviceName: 'Reparación de Computadores Montería',
    cases: [
      {
        title: 'Reparación Motherboard Dell Inspiron',
        text: 'Diagnóstico y reparación de motherboard con componentes dañados. Cliente en Villa Margarita, Montería. Tiempo: 48h, garantía 30 días.',
      },
      {
        title: 'Reemplazo Fuente de Poder HP Pavilion',
        text: 'Cambio de fuente de poder defectuosa en PC de escritorio. Atención en taller, centro de Montería. Instalación y pruebas completas en 24h.',
      },
      {
        title: 'Recuperación y Reparación Disco Duro',
        text: 'Reparación de sectores dañados y recuperación de datos importantes. Cliente empresarial en zona norte Montería. 100% de datos recuperados.',
      },
      {
        title: 'Actualización RAM y SSD Lenovo',
        text: 'Upgrade completo: RAM de 4GB a 16GB + instalación SSD 500GB. Portátil 5x más rápido. Cliente satisfecho en barrio La Granja.',
      },
    ],
    faqs: [
      {
        q: '¿Cuánto tiempo tarda la reparación de computadores en Montería?',
        a: 'El tiempo promedio es 24-48 horas para reparaciones comunes. Diagnóstico gratuito en el mismo día. Para reparaciones complejas pueden ser 72 horas máximo.',
      },
      {
        q: '¿Qué garantía ofrecen en las reparaciones?',
        a: 'Ofrecemos 30 días de garantía en mano de obra y según garantía del fabricante en repuestos nuevos. Si el problema persiste, lo arreglamos sin costo adicional.',
      },
      {
        q: '¿Dónde queda el taller?',
        a: 'Nuestro taller queda en la Dg 7 # 7 - 50, barrio La Granja, Montería. En casos especiales coordinamos recogida del equipo. Diagnóstico gratuito.',
      },
      {
        q: '¿Qué tipos de computadores reparan?',
        a: 'Reparamos todas las marcas: HP, Dell, Lenovo, Acer, Asus, MSI, Compaq. PCs de escritorio, portátiles, All-in-One. Hardware y software.',
      },
      {
        q: '¿Cuánto cuesta la reparación de computadores?',
        a: 'Diagnóstico GRATIS. Cotización gratuita vía WhatsApp al +57 300 847 4121.',
      },
    ],
    metadata: {
      title: 'Reparación Computadores Montería | Técnico PC Profesional',
      description:
        'Reparación computadores Montería especializada. Diagnóstico GRATIS, atención en taller, garantía 30 días. Técnico certificado con 8+ años experiencia',
      keywords: [
        'reparación computadores Montería',
        'reparación PC Montería',
        'técnico computadores Montería',
        'reparación portátiles Montería',
        'servicio técnico PC Montería',
        'reparación hardware Montería',
        'arreglo computadores Córdoba',
        'técnico PC Montería centro',
        'reparación motherboard Montería',
        'cambio fuente poder Montería',
        'reparación disco duro',
        'actualización RAM Montería',
        'servicio computadores urgente',
      ],
      openGraph: {
        title: 'Reparación Computadores Montería | Fernando Tech',
        description:
          'Especialista en reparación computadores y portátiles Montería. Diagnóstico gratuito, atención en taller. +8 años experiencia',
      },
    },
    schema: {
      serviceName: 'Reparación de Computadores en Montería',
      serviceDescription:
        'Servicio técnico especializado en reparación de computadores y portátiles en Montería. Diagnóstico gratuito, garantía 30 días, atención en taller.',
      priceRange: '50000-200000',
      serviceUrl: 'https://www.ferchotecnico.com/servicios/reparacion-computadores-monteria',
    },
    review: {
      name: 'FerchoTécnico - Reparación de Computadores Montería',
      url: 'https://www.ferchotecnico.com/servicios/reparacion-computadores-monteria',
      ratingValue: 5,
      ratingCount: 48,
    },
  },
  {
    slug: 'reparacion-pc-monteria',
    title: 'Reparación de PC en Montería',
    description:
      'Reparación profesional de PC de escritorio en Montería. Diagnóstico gratuito, atención en taller, garantía 30 días.',

    image: '/hero-poster.jpg',
    canonical: 'https://www.ferchotecnico.com/servicios/reparacion-pc-monteria',
    serviceName: 'Reparación de PC',
    cases: [
      {
        title: 'PC no enciende - Reparación fuente de poder',
        text: 'PC de escritorio HP no encendía. Diagnóstico: fuente de poder dañada. Reemplazo en 24h con garantía.',
      },
      {
        title: 'PC lenta - Upgrade SSD y RAM',
        text: 'PC tardaba 10 minutos en encender. Instalamos SSD 500GB + 8GB RAM. Ahora enciende en 20 segundos.',
      },
    ],
    faqs: [
      {
        q: '¿Reparan PCs de todas las marcas?',
        a: 'Sí, reparamos todas las marcas: HP, Dell, Lenovo, Acer, compaq, PCs ensambladas.',
      },
      {
        q: '¿Cuánto cuesta reparar un PC?',
        a: 'Diagnóstico gratuito sin compromiso. Cotización personalizada según el problema.',
      },
    ],
    metadata: {
      title: 'Reparación PC Montería | Servicio Técnico Profesional',
      description:
        'Reparación PC Montería especializada. Diagnóstico GRATIS, atención en taller, garantía 30 días.',
      keywords: [
        'reparación PC Montería',
        'técnico PC Montería',
        'reparación computadores escritorio',
        'servicio técnico PC Montería',
      ],
      openGraph: {
        title: 'Reparación PC Montería | Servicio Técnico',
        description: 'Reparación PC Montería. Diagnóstico gratuito, atención en taller.',
      },
    },
    schema: {
      serviceName: 'Reparación de PC en Montería',
      serviceDescription:
        'Servicio técnico especializado en reparación de PCs de escritorio en Montería.',
      priceRange: '50000-150000',
      serviceUrl: 'https://www.ferchotecnico.com/servicios/reparacion-pc-monteria',
    },
    review: {
      name: 'FerchoTécnico - Reparación PC Montería',
      url: 'https://www.ferchotecnico.com/servicios/reparacion-pc-monteria',
      ratingValue: 5,
      ratingCount: 42,
    },
  },
  {
    slug: 'reparacion-portatiles-monteria',
    title: 'Reparación de Portátiles en Montería',
    description:
      'Reparación especializada de laptops y portátiles en Montería. Diagnóstico gratuito, atención en taller.',

    image: '/hero-poster.jpg',
    canonical: 'https://www.ferchotecnico.com/servicios/reparacion-portatiles-monteria',
    serviceName: 'Reparación de Portátiles',
    cases: [
      {
        title: 'Portátil no carga - Cambio pin carga',
        text: 'Laptop Dell no cargaba batería. Pin de carga dañado. Reparación en 24h.',
      },
      {
        title: 'Pantalla rota - Reemplazo display',
        text: 'Pantalla HP agrietada. Instalamos display nuevo original en 48h.',
      },
    ],
    faqs: [
      {
        q: '¿Reparan portátiles de todas las marcas?',
        a: 'Sí, reparamos HP, Dell, Lenovo, Acer, Asus, Toshiba y más.',
      },
      {
        q: '¿Tienen repuestos para portátiles?',
        a: 'Sí, conseguimos repuestos originales y compatibles de calidad.',
      },
    ],
    metadata: {
      title: 'Reparación Portátiles Montería | Servicio Técnico Laptops',
      description:
        'Reparación portátiles Montería. Diagnóstico GRATIS, atención en taller, garantía 30 días.',
      keywords: [
        'reparación portátiles Montería',
        'reparación laptops Montería',
        'técnico portátiles Montería',
        'reparación notebooks',
      ],
      openGraph: {
        title: 'Reparación Portátiles Montería',
        description: 'Reparación portátiles Montería. Diagnóstico gratuito, atención en taller.',
      },
    },
    schema: {
      serviceName: 'Reparación de Portátiles en Montería',
      serviceDescription:
        'Servicio técnico especializado en reparación de laptops y portátiles en Montería.',
      priceRange: '60000-250000',
      serviceUrl: 'https://www.ferchotecnico.com/servicios/reparacion-portatiles-monteria',
    },
    review: {
      name: 'FerchoTécnico - Reparación Portátiles Montería',
      url: 'https://www.ferchotecnico.com/servicios/reparacion-portatiles-monteria',
      ratingValue: 5,
      ratingCount: 38,
    },
  },
  {
    slug: 'mantenimiento-preventivo-monteria',
    title: 'Mantenimiento Preventivo en Montería',
    description:
      'Mantenimiento preventivo profesional para computadores. Limpieza interna, actualizaciones, optimización y pruebas.',

    image: '/hero-poster.jpg',
    canonical: 'https://www.ferchotecnico.com/servicios/mantenimiento-preventivo-monteria',
    serviceName: 'Mantenimiento Preventivo',
    cases: [
      {
        title: 'Mantenimiento completo PC escritorio',
        text: 'Limpieza interna, cambio pasta térmica, optimización Windows. PC funcionando como nueva.',
      },
      {
        title: 'Mantenimiento preventivo empresa',
        text: 'Mantenimiento a 15 equipos de oficina. Limpieza, actualizaciones, respaldo. Sin tiempo de inactividad.',
      },
    ],
    faqs: [
      {
        q: '¿Cada cuánto se debe hacer mantenimiento?',
        a: 'Recomendamos cada 6 meses para uso normal, cada 3 meses para uso intensivo.',
      },
      {
        q: '¿Qué incluye el mantenimiento preventivo?',
        a: 'Limpieza física y térmica, actualizaciones, optimización, eliminación archivos temporales, pruebas de estabilidad.',
      },
    ],
    metadata: {
      title: 'Mantenimiento Preventivo Montería | Limpieza PC',
      description:
        'Mantenimiento preventivo para equipos y redes. Limpieza, actualizaciones y pruebas en Montería.',
      keywords: [
        'mantenimiento preventivo Montería',
        'limpieza PC Montería',
        'mantenimiento computadores',
        'optimización PC',
      ],
      openGraph: {
        title: 'Mantenimiento Preventivo PC Montería',
        description:
          'Mantenimiento preventivo profesional. Limpieza, actualizaciones, optimización.',
      },
    },
    schema: {
      serviceName: 'Mantenimiento Preventivo de Computadores',
      serviceDescription:
        'Mantenimiento preventivo profesional para prolongar la vida útil de computadores.',
      priceRange: '50000-100000',
      serviceUrl: 'https://www.ferchotecnico.com/servicios/mantenimiento-preventivo-monteria',
    },
    review: {
      name: 'FerchoTécnico - Mantenimiento Preventivo',
      url: 'https://www.ferchotecnico.com/servicios/mantenimiento-preventivo-monteria',
      ratingValue: 5,
      ratingCount: 52,
    },
  },
  {
    slug: 'eliminacion-virus-monteria',
    title: 'Eliminación de Virus y Malware en Montería',
    description:
      'Limpieza y eliminación de malware, virus y adware. Restauración de sistemas y protección preventiva en Montería.',

    image: '/hero-poster.jpg',
    canonical: 'https://www.ferchotecnico.com/servicios/eliminacion-virus-monteria',
    serviceName: 'Eliminación de Virus',
    cases: [
      {
        title: 'Eliminación ransomware',
        text: 'PC infectado con ransomware. Limpieza completa, recuperación archivos, instalación antivirus premium.',
      },
      {
        title: 'PC lenta por malware',
        text: 'Computador muy lento por múltiples malware. Limpieza profunda, optimización. PC como nueva.',
      },
    ],
    faqs: [
      {
        q: '¿Cómo sé si mi PC tiene virus?',
        a: 'Síntomas: lentitud extrema, ventanas emergentes, programas que se abren solos, antivirus desactivado.',
      },
      {
        q: '¿Qué incluye el servicio?',
        a: 'Escaneo profundo, eliminación de malware, optimización post-limpieza, instalación antivirus, recomendaciones de seguridad.',
      },
    ],
    metadata: {
      title: 'Eliminación de Virus Montería | Limpieza Malware',
      description:
        'Eliminación de virus y malware en Montería. Limpieza completa, protección preventiva.',
      keywords: [
        'eliminación virus Montería',
        'limpieza malware Montería',
        'eliminar virus PC',
        'antivirus Montería',
      ],
      openGraph: {
        title: 'Eliminación de Virus Montería',
        description: 'Limpieza completa de virus y malware. Servicio especializado en Montería.',
      },
    },
    schema: {
      serviceName: 'Eliminación de Virus y Malware',
      serviceDescription:
        'Servicio especializado en eliminación de virus, malware y protección de computadores.',
      priceRange: '40000-80000',
      serviceUrl: 'https://www.ferchotecnico.com/servicios/eliminacion-virus-monteria',
    },
    review: {
      name: 'FerchoTécnico - Eliminación de Virus',
      url: 'https://www.ferchotecnico.com/servicios/eliminacion-virus-monteria',
      ratingValue: 5,
      ratingCount: 45,
    },
  },
  {
    slug: 'formateo-windows-monteria',
    title: 'Formateo e instalación de Windows en Montería',
    description:
      'Formateo seguro con respaldo de datos, instalación de drivers y optimización post-instalación.',

    image: '/hero-poster.jpg',
    canonical: 'https://www.ferchotecnico.com/servicios/formateo-windows-monteria',
    serviceName: 'Formateo Windows',
    cases: [
      {
        title: 'Restauración completa',
        text: 'Formateo + recuperación de datos y migración a SSD.',
      },
      {
        title: 'Windows optimizado',
        text: 'Instalación limpia y conjunto de utilidades para performance.',
      },
    ],
    faqs: [
      {
        q: '¿Perderé mis archivos?',
        a: 'No si solicitas respaldo; ofrecemos migración segura.',
      },
      {
        q: '¿Instalan drivers?',
        a: 'Sí, instalamos y configuramos drivers y utilidades necesarias.',
      },
    ],
    metadata: {
      title: 'Formateo Windows Montería | Instalación Windows',
      description:
        'Formateo e instalación limpia de Windows con respaldo y migración de datos en Montería.',
      keywords: [
        'formateo Windows Montería',
        'instalación Windows Montería',
        'formateo PC Montería',
        'instalar Windows',
      ],
      openGraph: {
        title: 'Formateo Windows Montería',
        description: 'Formateo e instalación de Windows. Respaldo de datos incluido.',
      },
    },
    schema: {
      serviceName: 'Formateo e Instalación de Windows',
      serviceDescription:
        'Formateo seguro con respaldo de datos e instalación optimizada de Windows.',
      priceRange: '60000-100000',
      serviceUrl: 'https://www.ferchotecnico.com/servicios/formateo-windows-monteria',
    },
    review: {
      name: 'FerchoTécnico - Formateo Windows',
      url: 'https://www.ferchotecnico.com/servicios/formateo-windows-monteria',
      ratingValue: 5,
      ratingCount: 41,
    },
  },
  {
    slug: 'recuperacion-datos-monteria',
    title: 'Recuperación de Datos en Montería',
    description:
      'Recuperación profesional de archivos, fotos, documentos de discos dañados, formateados o con fallas.',

    image: '/hero-poster.jpg',
    canonical: 'https://www.ferchotecnico.com/servicios/recuperacion-datos-monteria',
    serviceName: 'Recuperación de Datos',
    cases: [
      {
        title: 'Recuperación disco duro dañado',
        text: 'Disco duro con sectores dañados. Recuperamos 95% de fotos y documentos importantes.',
      },
      {
        title: 'Datos de PC formateada accidentalmente',
        text: 'Cliente formateó PC por error. Recuperamos archivos de trabajo críticos.',
      },
    ],
    faqs: [
      {
        q: '¿Pueden recuperar datos de disco dañado?',
        a: 'Sí, recuperamos datos de discos con daños lógicos y algunos físicos. Evaluación gratuita.',
      },
      {
        q: '¿Cuánto tiempo tarda la recuperación?',
        a: 'Depende del caso: 24-72 horas en promedio. Casos complejos hasta 1 semana.',
      },
    ],
    metadata: {
      title: 'Recuperación de Datos Montería | Recuperar Archivos',
      description:
        'Recuperación de datos profesional en Montería. Recuperamos archivos de discos dañados, formateados.',
      keywords: [
        'recuperación datos Montería',
        'recuperar archivos Montería',
        'recuperación disco duro',
        'recuperar fotos',
      ],
      openGraph: {
        title: 'Recuperación de Datos Montería',
        description: 'Recuperación profesional de archivos y datos. Evaluación gratuita.',
      },
    },
    schema: {
      serviceName: 'Recuperación de Datos',
      serviceDescription:
        'Servicio profesional de recuperación de datos de discos dañados o formateados.',
      priceRange: '80000-300000',
      serviceUrl: 'https://www.ferchotecnico.com/servicios/recuperacion-datos-monteria',
    },
    review: {
      name: 'FerchoTécnico - Recuperación de Datos',
      url: 'https://www.ferchotecnico.com/servicios/recuperacion-datos-monteria',
      ratingValue: 5,
      ratingCount: 35,
    },
  },
  {
    slug: 'soporte-tecnico-monteria',
    title: 'Soporte Técnico en Montería',
    description:
      'Asesoría técnica especializada y resolución de problemas de computadores en Montería.',

    image: '/hero-poster.jpg',
    canonical: 'https://www.ferchotecnico.com/servicios/soporte-tecnico-monteria',
    serviceName: 'Soporte Técnico',
    cases: [
      {
        title: 'Soporte remoto configuración red',
        text: 'Configuración remota de red empresarial. Problema resuelto en 2 horas.',
      },
      {
        title: 'Asesoría compra equipo',
        text: 'Asesoría para compra de equipos para oficina. Ahorro 30% con recomendaciones correctas.',
      },
    ],
    faqs: [
      {
        q: '¿Ofrecen soporte remoto?',
        a: 'Sí, ofrecemos soporte remoto para problemas que no requieren intervención física.',
      },
      {
        q: '¿Qué incluye el soporte técnico?',
        a: 'Diagnóstico, solución de problemas, asesoría, configuraciones, instalaciones.',
      },
    ],
    metadata: {
      title: 'Soporte Técnico Montería | Asesoría Computadores',
      description:
        'Soporte técnico especializado en Montería. Asesoría profesional y resolución de problemas.',
      keywords: [
        'soporte técnico Montería',
        'asesoría técnica Montería',
        'soporte computadores',
        'ayuda técnica PC',
      ],
      openGraph: {
        title: 'Soporte Técnico Montería',
        description: 'Soporte técnico profesional. Asesoría y resolución de problemas.',
      },
    },
    schema: {
      serviceName: 'Soporte Técnico',
      serviceDescription: 'Soporte técnico profesional y asesoría especializada en computadores.',
      priceRange: '40000-100000',
      serviceUrl: 'https://www.ferchotecnico.com/servicios/soporte-tecnico-monteria',
    },
    review: {
      name: 'FerchoTécnico - Soporte Técnico',
      url: 'https://www.ferchotecnico.com/servicios/soporte-tecnico-monteria',
      ratingValue: 5,
      ratingCount: 47,
    },
  },
  {
    slug: 'mantenimiento-laptops-monteria',
    title: 'Mantenimiento de Laptops en Montería',
    description: 'Mantenimiento preventivo especializado para laptops y portátiles en Montería.',

    image: '/hero-poster.jpg',
    canonical: 'https://www.ferchotecnico.com/servicios/mantenimiento-laptops-monteria',
    serviceName: 'Mantenimiento Laptops',
    cases: [
      {
        title: 'Laptop sobrecalentada',
        text: 'Laptop HP sobrecalentaba. Limpieza ventiladores, cambio pasta térmica. Problema resuelto.',
      },
      {
        title: 'Mantenimiento preventivo portátil',
        text: 'Limpieza completa, optimización, actualización drivers. Laptop funcionando óptimamente.',
      },
    ],
    faqs: [
      {
        q: '¿Por qué mi laptop se calienta mucho?',
        a: 'Acumulación de polvo en ventiladores y pasta térmica seca. El mantenimiento lo soluciona.',
      },
      {
        q: '¿Cada cuánto mantenimiento a laptop?',
        a: 'Cada 6 meses para uso normal, cada 3 meses para uso gaming o intensivo.',
      },
    ],
    metadata: {
      title: 'Mantenimiento Laptops Montería | Limpieza Portátiles',
      description:
        'Mantenimiento preventivo para laptops en Montería. Limpieza, optimización, garantía.',
      keywords: [
        'mantenimiento laptops Montería',
        'limpieza portátiles Montería',
        'mantenimiento notebooks',
        'laptop sobrecalentada',
      ],
      openGraph: {
        title: 'Mantenimiento Laptops Montería',
        description: 'Mantenimiento preventivo especializado para laptops y portátiles.',
      },
    },
    schema: {
      serviceName: 'Mantenimiento de Laptops',
      serviceDescription: 'Mantenimiento preventivo especializado para laptops y portátiles.',
      priceRange: '55000-95000',
      serviceUrl: 'https://www.ferchotecnico.com/servicios/mantenimiento-laptops-monteria',
    },
    review: {
      name: 'FerchoTécnico - Mantenimiento Laptops',
      url: 'https://www.ferchotecnico.com/servicios/mantenimiento-laptops-monteria',
      ratingValue: 5,
      ratingCount: 39,
    },
  },
  {
    slug: 'mantenimiento-hogar-oficina',
    title: 'Mantenimiento Hogar y Oficina',
    description: 'Servicio especializado de mantenimiento para hogares y empresas en Montería.',

    image: '/hero-poster.jpg',
    canonical: 'https://www.ferchotecnico.com/servicios/mantenimiento-hogar-oficina',
    serviceName: 'Mantenimiento Hogar y Oficina',
    cases: [
      {
        title: 'Mantenimiento oficina contable',
        text: 'Mantenimiento a 10 equipos de oficina contable. Sin interrupciones al servicio.',
      },
      {
        title: 'Mantenimiento hogar familiar',
        text: 'Mantenimiento a 3 PCs y 2 laptops de familia. Todos los equipos optimizados.',
      },
    ],
    faqs: [
      {
        q: '¿Hacen mantenimiento en fines de semana?',
        a: 'Sí, nos ajustamos a los horarios de tu oficina o negocio.',
      },
      {
        q: '¿Ofrecen planes de mantenimiento?',
        a: 'Sí, ofrecemos planes mensuales y trimestrales para empresas.',
      },
    ],
    metadata: {
      title: 'Mantenimiento Hogar y Oficina Montería',
      description: 'Servicio de mantenimiento especializado para hogares y oficinas en Montería.',
      keywords: [
        'mantenimiento oficina Montería',
        'mantenimiento hogar Montería',
        'mantenimiento empresas',
        'servicio técnico oficina',
      ],
      openGraph: {
        title: 'Mantenimiento Hogar y Oficina',
        description: 'Mantenimiento profesional para hogares y empresas en Montería.',
      },
    },
    schema: {
      serviceName: 'Mantenimiento Hogar y Oficina',
      serviceDescription: 'Servicio de mantenimiento especializado para hogares y oficinas.',
      priceRange: '45000-150000',
      serviceUrl: 'https://www.ferchotecnico.com/servicios/mantenimiento-hogar-oficina',
    },
    review: {
      name: 'FerchoTécnico - Mantenimiento Hogar y Oficina',
      url: 'https://www.ferchotecnico.com/servicios/mantenimiento-hogar-oficina',
      ratingValue: 5,
      ratingCount: 33,
    },
  },
  {
    slug: 'servicio-tecnico-computadores-monteria',
    title: 'Servicio Técnico Computadores Montería',
    description:
      'Servicio técnico profesional para computadores en Montería. Diagnóstico gratuito, garantía 30 días.',

    image: '/hero-poster.jpg',
    canonical: 'https://www.ferchotecnico.com/servicios/servicio-tecnico-computadores-monteria',
    serviceName: 'Servicio Técnico Computadores',
    cases: [
      {
        title: 'Servicio técnico completo',
        text: 'Diagnóstico, reparación, optimización. Cliente en barrio Boston.',
      },
    ],
    faqs: [
      {
        q: '¿Qué servicios técnicos ofrecen?',
        a: 'Reparación, mantenimiento, formateo, eliminación virus, recuperación datos, upgrades.',
      },
    ],
    metadata: {
      title: 'Servicio Técnico Computadores Montería',
      description: 'Servicio técnico profesional para computadores en Montería.',
      keywords: [
        'servicio técnico computadores Montería',
        'técnico computadores Montería',
        'reparación PC Montería',
      ],
      openGraph: {
        title: 'Servicio Técnico Computadores Montería',
        description: 'Servicio técnico profesional. Diagnóstico gratuito.',
      },
    },
    schema: {
      serviceName: 'Servicio Técnico de Computadores',
      serviceDescription: 'Servicio técnico profesional para computadores.',
      priceRange: '50000-200000',
      serviceUrl: 'https://www.ferchotecnico.com/servicios/servicio-tecnico-computadores-monteria',
    },
    review: {
      name: 'FerchoTécnico - Servicio Técnico',
      url: 'https://www.ferchotecnico.com/servicios/servicio-tecnico-computadores-monteria',
      ratingValue: 5,
      ratingCount: 50,
    },
  },
  {
    slug: 'mantenimiento-pc-domicilio-cordoba',
    title: 'Mantenimiento PC Córdoba',
    description:
      'Mantenimiento profesional de PC en Montería y toda Córdoba. Atención en taller con diagnóstico gratuito.',

    image: '/hero-poster.jpg',
    canonical: 'https://www.ferchotecnico.com/servicios/mantenimiento-pc-domicilio-cordoba',
    serviceName: 'Mantenimiento PC Córdoba',
    cases: [
      {
        title: 'Mantenimiento completo zona norte',
        text: 'Mantenimiento completo en taller para cliente de zona norte Montería. Cliente satisfecho.',
      },
    ],
    faqs: [
      {
        q: '¿Dónde queda el taller?',
        a: 'Nuestro taller queda en la Dg 7 # 7 - 50, barrio La Granja, Montería. Diagnóstico gratuito al traer tu equipo.',
      },
    ],
    metadata: {
      title: 'Mantenimiento PC Córdoba | Montería',
      description: 'Mantenimiento PC profesional en Montería y Córdoba. Atención en taller.',
      keywords: ['mantenimiento PC Córdoba', 'mantenimiento PC Montería', 'servicio técnico PC'],
      openGraph: {
        title: 'Mantenimiento PC Córdoba',
        description: 'Mantenimiento profesional en Montería y Córdoba.',
      },
    },
    schema: {
      serviceName: 'Mantenimiento PC Córdoba',
      serviceDescription: 'Mantenimiento profesional de PC en taller con diagnóstico gratuito.',
      priceRange: '50000-100000',
      serviceUrl: 'https://www.ferchotecnico.com/servicios/mantenimiento-pc-domicilio-cordoba',
    },
    review: {
      name: 'FerchoTécnico - Mantenimiento PC',
      url: 'https://www.ferchotecnico.com/servicios/mantenimiento-pc-domicilio-cordoba',
      ratingValue: 5,
      ratingCount: 44,
    },
  },
  {
    slug: 'mantenimiento-domestico-corporativo',
    title: 'Mantenimiento Doméstico y Corporativo',
    description: 'Mantenimiento profesional para usuarios domésticos y empresas en Montería.',

    image: '/hero-poster.jpg',
    canonical: 'https://www.ferchotecnico.com/servicios/mantenimiento-domestico-corporativo',
    serviceName: 'Mantenimiento Doméstico y Corporativo',
    cases: [
      {
        title: 'Plan mantenimiento corporativo',
        text: 'Contrato mantenimiento trimestral para empresa de 20 equipos.',
      },
    ],
    faqs: [
      {
        q: '¿Ofrecen contratos de mantenimiento?',
        a: 'Sí, ofrecemos planes mensuales, trimestrales y anuales para empresas.',
      },
    ],
    metadata: {
      title: 'Mantenimiento Doméstico y Corporativo Montería',
      description: 'Mantenimiento para hogares y empresas en Montería. Planes personalizados.',
      keywords: [
        'mantenimiento corporativo Montería',
        'mantenimiento doméstico Montería',
        'planes mantenimiento empresas',
      ],
      openGraph: {
        title: 'Mantenimiento Doméstico y Corporativo',
        description: 'Mantenimiento para hogares y empresas. Planes disponibles.',
      },
    },
    schema: {
      serviceName: 'Mantenimiento Doméstico y Corporativo',
      serviceDescription: 'Mantenimiento profesional para usuarios domésticos y corporativos.',
      priceRange: '45000-200000',
      serviceUrl: 'https://www.ferchotecnico.com/servicios/mantenimiento-domestico-corporativo',
    },
    review: {
      name: 'FerchoTécnico - Mantenimiento Corporativo',
      url: 'https://www.ferchotecnico.com/servicios/mantenimiento-domestico-corporativo',
      ratingValue: 5,
      ratingCount: 28,
    },
  },
  {
    slug: 'soporte-empresarial-monteria',
    title: 'Soporte Técnico Empresarial en Montería',
    description:
      'Planes de soporte técnico para empresas en Montería. Mantenimiento preventivo, SLA garantizado, inventario de equipos y reportes mensuales.',
    image: '/hero-poster.jpg',
    canonical: 'https://www.ferchotecnico.com/servicios/soporte-empresarial-monteria',
    serviceName: 'Soporte Técnico Empresarial',
    cases: [
      {
        title: 'Plan mensual para oficina contable',
        text: 'Empresa con 12 equipos. Implementamos plan profesional con mantenimiento quincenal, antivirus corporativo y reportes. Cero incidentes en 6 meses.',
      },
      {
        title: 'Soporte con SLA para consultorio médico',
        text: 'Consultorio con 8 equipos críticos para historias clínicas. SLA de 4 horas, respaldo automático. Continuidad operativa garantizada.',
      },
    ],
    faqs: [
      {
        q: '¿Qué incluyen los planes empresariales?',
        a: 'Mantenimiento preventivo programado, soporte prioritario con SLA, inventario de equipos, reportes mensuales, antivirus corporativo y auditorías de seguridad según el plan.',
      },
      {
        q: '¿Hay compromiso de permanencia?',
        a: 'No. Nuestros planes son mensuales sin compromiso de permanencia. Puedes cancelar en cualquier momento.',
      },
      {
        q: '¿Qué es un SLA?',
        a: 'SLA (Acuerdo de Nivel de Servicio) es el tiempo máximo de respuesta garantizado. En nuestro plan Profesional es 4 horas y en Corporativo 2 horas.',
      },
    ],
    metadata: {
      title: 'Soporte Técnico Empresarial Montería | Planes para Empresas',
      description:
        'Soporte técnico empresarial en Montería. Planes mensuales con SLA, mantenimiento preventivo, reportes y antivirus corporativo. Sin permanencia.',
      keywords: [
        'soporte técnico empresarial Montería',
        'soporte IT Montería',
        'mantenimiento empresas Montería',
        'soporte computadores empresas',
        'planes soporte técnico',
        'SLA soporte técnico Montería',
      ],
      openGraph: {
        title: 'Soporte Técnico Empresarial Montería',
        description:
          'Planes de soporte técnico para empresas. Mantenimiento preventivo, SLA garantizado.',
      },
    },
    schema: {
      serviceName: 'Soporte Técnico Empresarial',
      serviceDescription:
        'Planes de soporte técnico para empresas con mantenimiento preventivo, SLA garantizado y reportes mensuales.',
      priceRange: '150000-500000',
      serviceUrl: 'https://www.ferchotecnico.com/servicios/soporte-empresarial-monteria',
    },
    review: {
      name: 'FerchoTécnico - Soporte Empresarial',
      url: 'https://www.ferchotecnico.com/servicios/soporte-empresarial-monteria',
      ratingValue: 5,
      ratingCount: 18,
    },
  },
  {
    slug: 'digitalizacion-procesos-monteria',
    title: 'Digitalización de Procesos en Montería',
    description:
      'Automatización y digitalización de procesos para pymes en Montería. Scripts personalizados, reportes automatizados y migraciones de datos.',
    image: '/hero-poster.jpg',
    canonical: 'https://www.ferchotecnico.com/servicios/digitalizacion-procesos-monteria',
    serviceName: 'Digitalización de Procesos',
    cases: [
      {
        title: 'Automatización de reportes contables',
        text: 'Empresa que generaba reportes manualmente en Excel. Creamos scripts automatizados que generan reportes en minutos. Ahorro de 15 horas semanales.',
      },
      {
        title: 'Migración de datos a la nube',
        text: 'Negocio con archivos en múltiples PCs sin respaldo. Migramos a Google Workspace con organización y acceso remoto seguro.',
      },
    ],
    faqs: [
      {
        q: '¿Qué tipo de procesos pueden digitalizar?',
        a: 'Reportes en Excel, facturación manual, inventarios en papel, gestión de clientes, procesos repetitivos que consumen tiempo. Todo lo que se pueda automatizar.',
      },
      {
        q: '¿Es costoso digitalizar mi negocio?',
        a: 'Evaluación gratuita. Cada proyecto se cotiza según complejidad. La inversión se recupera en semanas por el ahorro de tiempo.',
      },
    ],
    metadata: {
      title: 'Digitalización de Procesos Montería | Automatización Pymes',
      description:
        'Digitalización y automatización de procesos para pymes en Montería. Scripts, reportes automatizados, migraciones. Evaluación gratuita.',
      keywords: [
        'digitalización procesos Montería',
        'automatización pymes Montería',
        'scripts automatización',
        'digitalización empresas Córdoba',
        'migración datos nube',
      ],
      openGraph: {
        title: 'Digitalización de Procesos Montería',
        description: 'Automatización y digitalización para pymes. Evaluación gratuita.',
      },
    },
    schema: {
      serviceName: 'Digitalización de Procesos',
      serviceDescription:
        'Servicio de digitalización y automatización de procesos para pymes. Scripts personalizados y migraciones.',
      priceRange: '200000-800000',
      serviceUrl: 'https://www.ferchotecnico.com/servicios/digitalizacion-procesos-monteria',
    },
    review: {
      name: 'FerchoTécnico - Digitalización',
      url: 'https://www.ferchotecnico.com/servicios/digitalizacion-procesos-monteria',
      ratingValue: 5,
      ratingCount: 12,
    },
  },
  {
    slug: 'desarrollo-web-monteria',
    title: 'Desarrollo de Sitios Web en Montería',
    description:
      'Desarrollo profesional de sitios web y landing pages para negocios en Montería. Diseño moderno, responsive y optimizado para SEO.',
    image: '/hero-poster.jpg',
    canonical: 'https://www.ferchotecnico.com/servicios/desarrollo-web-monteria',
    serviceName: 'Desarrollo Web',
    cases: [
      {
        title: 'Landing page para consultorio odontológico',
        text: 'Diseñamos landing page profesional con reserva de citas, galería de casos y optimización SEO local. 300% más citas online en 3 meses.',
      },
      {
        title: 'Sitio web para empresa de servicios',
        text: 'Creamos sitio web corporativo con catálogo de servicios, formulario de contacto y blog. Primeros resultados de Google en 45 días.',
      },
    ],
    faqs: [
      {
        q: '¿Cuánto cuesta una página web?',
        a: 'Cotización personalizada sin compromiso. Landing pages desde $800.000 COP, sitios web completos desde $1.500.000 COP dependiendo de las funcionalidades.',
      },
      {
        q: '¿Incluye hosting y dominio?',
        a: 'Sí, incluimos configuración de hosting, dominio y certificado SSL. Te entregamos el sitio 100% funcionando.',
      },
      {
        q: '¿En cuánto tiempo está lista mi página?',
        a: 'Landing pages en 1-2 semanas. Sitios web completos en 3-4 semanas. Cada proyecto incluye revisiones y ajustes sin costo.',
      },
    ],
    metadata: {
      title: 'Desarrollo Web Montería | Páginas Web Profesionales',
      description:
        'Desarrollo de sitios web y landing pages en Montería. Diseño moderno, responsive, optimizado SEO. Cotización gratuita.',
      keywords: [
        'desarrollo web Montería',
        'páginas web Montería',
        'landing pages Montería',
        'diseño web Montería',
        'crear página web Córdoba',
        'desarrollo sitios web',
      ],
      openGraph: {
        title: 'Desarrollo Web Montería',
        description: 'Desarrollo profesional de sitios web y landing pages. Cotización gratuita.',
      },
    },
    schema: {
      serviceName: 'Desarrollo de Sitios Web',
      serviceDescription:
        'Desarrollo profesional de sitios web, landing pages y aplicaciones web para negocios locales.',
      priceRange: '800000-3000000',
      serviceUrl: 'https://www.ferchotecnico.com/servicios/desarrollo-web-monteria',
    },
    review: {
      name: 'FerchoTécnico - Desarrollo Web',
      url: 'https://www.ferchotecnico.com/servicios/desarrollo-web-monteria',
      ratingValue: 5,
      ratingCount: 8,
    },
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return services.map((service) => service.slug);
}

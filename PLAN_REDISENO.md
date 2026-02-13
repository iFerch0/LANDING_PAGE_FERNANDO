# Plan de Rediseño Progresivo - FerchoTécnico

## Contexto

Landing page de servicios técnicos en Montería con SEO posicionado en primeros resultados.
El rediseño se hace **sin reconstruir desde cero** para preservar el ranking actual.

**Metodología:** Sprints de 1-2 semanas con entregables funcionales por fase.

---

## Diagnóstico Actual

### Lo que funciona (no tocar)
- URLs, slugs y estructura de rutas
- 6 schemas JSON-LD (LocalBusiness, Organization, FAQ, Review, TechnicalService, Product)
- Sitemap con 140 rutas indexadas
- Geo-targeting y meta tags de negocio
- Metadata por página (OG, Twitter, canonical)

### Lo que necesita mejora
- Diseño visual genérico (glassmorphism estándar, sin personalidad de marca)
- Dark mode duplicado (media query + data-attribute con valores distintos)
- 36+ iconos SVG duplicados entre componentes
- `globals.css` monolítico (7,200 líneas)
- Portafolio de servicios limitado a reparación (no refleja capacidades completas)
- Sin animaciones de entrada o micro-interacciones distintivas

---

## Análisis de Portafolio: Qué Integrar

### Servicios actuales (solo reparación PC)
El sitio hoy vende únicamente reparación de computadores. Pero el perfil profesional
incluye capacidades de mayor valor que se pueden empaquetar sin perder el foco SEO.

### Servicios recomendados para integrar

**Tier 1 - Integración directa (misma audiencia, refuerza la marca)**

| Servicio | Por qué integrarlo | Cómo presentarlo |
|----------|-------------------|------------------|
| Soporte TI N2 para empresas | Es la evolución natural de "reparo PCs" hacia contratos corporativos. Mayor ticket. | "Planes de Soporte Empresarial" - mantenimiento mensual, SLA, inventario, reportes |
| Mantenimiento corporativo con SLA | Los clientes actuales (oficinas, colegios) ya lo necesitan | "Paquetes para Empresas" - bolsa de horas + prioridad + reportes mensuales |
| Automatización de procesos | Clientes pyme que viven en Excel, necesitan scripts/reportes | "Digitalización de Procesos" - automatizar tareas repetitivas, reportes, migraciones |

**Tier 2 - Página separada o sección secundaria (audiencia diferente)**

| Servicio | Por qué separarlo | Cómo presentarlo |
|----------|------------------|------------------|
| Desarrollo de Landing Pages | Compite con el foco SEO actual, pero demuestra capacidad | Sección "También desarrollo sitios web" con CTA a portafolio |
| Desarrollo Fullstack (MVPs) | Público distinto (startups, empresas digitales) | Página `/desarrollo` o link a portafolio externo |
| QA / Code Review | Público B2B muy específico (equipos dev) | No incluir en esta landing. Manejar en LinkedIn o portafolio dev |

**Tier 3 - No integrar aquí**

| Servicio | Razón |
|----------|-------|
| PM / implementación de procesos | Muy nicho, diluye el mensaje |
| Integraciones (Twilio, Firebase) | Público demasiado técnico para esta landing |

### Estrategia recomendada

```
ferchotecnico.com (landing actual)
├── Reparación y mantenimiento PC ← foco SEO principal (no cambiar)
├── Planes Empresariales (NUEVO) ← upsell corporativo
├── Digitalización de Procesos (NUEVO) ← diferenciador vs competencia
└── "También creo sitios web" (NUEVO) ← generar leads dev
```

La clave: los servicios Tier 1 comparten la misma audiencia (pymes locales que ya buscan
"técnico computadores"). No es un pivot, es una expansión natural.

---

## Fase 0: Limpieza Técnica (Fundamento)
> **Duración:** 1 semana
> **Objetivo:** Base limpia para rediseñar sin arrastrar deuda técnica

### Sprint 0.1 - Unificar Dark Mode
- [x] Elegir un solo enfoque: `@media (prefers-color-scheme: dark)` ✅
- [x] Eliminar todos los bloques `[data-color-scheme='dark']` de globals.css (58 bloques, 385 líneas) ✅
- [x] Eliminar los bloques `[data-color-scheme='dark']` de CADA CSS module (8 archivos limpiados) ✅
- [x] Eliminar `[data-color-scheme='light']` redundante de globals.css ✅
- [x] Alinear valores de dark mode (unificado en @media queries) ✅
- [x] Verificar que dark mode funcione correctamente en Chrome ✅

### Sprint 0.2 - Centralizar Iconos
- [x] Crear `src/components/Icons.tsx` con TODOS los iconos SVG del proyecto (21 iconos exportados) ✅
- [x] Exportar cada icono como componente con API unificada: `className`, `size`, `title` ✅
- [x] Reemplazar iconos inline en: Hero, Features, Process, ContactForm, CtaFinal, Stats, Faq, Testimonials, SuccessCases (9 componentes, 0 SVGs inline) ✅
- [x] Eliminar definiciones SVG duplicadas de cada componente ✅

### Sprint 0.3 - Modularizar globals.css
- [x] Extraer tokens primitivos → `src/styles/tokens.css` (79 líneas) ✅
- [x] Extraer brand palette + semantic tokens → `src/styles/brand.css` (135 líneas) ✅
- [x] Extraer tipografía + font-face → `src/styles/typography.css` (114 líneas) ✅
- [x] Extraer utilidades/botones/forms/cards → `src/styles/utilities.css` (343 líneas) ✅
- [x] Importar todo desde globals.css (preserva la cascada) ✅
- [x] globals.css queda con: imports + reset + estilos de secciones (6218 líneas vs 6820 antes) ✅
- [x] Consolidar tokens semánticos duplicados (líneas 50-66 subsumidas por 96-116) ✅
- [x] Absorber `:root` extra de línea 656-661 en brand.css ✅

### Entregable Fase 0
- Codebase limpio, sin duplicaciones
- Dark mode unificado y consistente
- Iconos centralizados y reutilizables
- CSS modular y mantenible

---

## Fase 1: Rediseño Visual - Impacto Inmediato
> **Duración:** 2 semanas
> **Objetivo:** Que el sitio se vea premium y memorable

### Sprint 1.1 - Identidad Visual Renovada
- [x] Definir dirección estética: "Técnico Artesanal Premium" ✅
      Profesional, bold, distintivo — sin glassmorphism genérico
- [x] Seleccionar tipografía distintiva (display + body) ✅
      Plus Jakarta Sans (display) + DM Sans (body)
- [x] Refinar paleta de colores ✅
      Azul-teal autoridad + naranja/ámbar cálido, warm cream background
- [x] Definir sistema de iconografía consistente ✅
      Icons.tsx centralizado con 36+ iconos SVG categorizados
- [x] Actualizar tokens en `tokens.css` y `brand.css` ✅

### Sprint 1.2 - Hero (Primera Impresión)
- [x] Rediseñar layout del Hero con composición más atrevida ✅
      Grid 1:1 balanceado, typography de impacto con Plus Jakarta Sans extrabold
- [x] Slider mantenido con frame refinado y entrada scale-in ✅
- [x] Stats grid: cards sólidas con shadows, iconos teal, jerarquía clara ✅
- [x] CTAs: gradient warm (naranja) con shadow-accent, outline limpio ✅
- [x] Animación staggered: badge→título→desc→CTAs→slider→stats ✅
- [x] Mobile optimizado: 480px/768px/1024px breakpoints refinados ✅
- [x] Shimmer gradient animado en "HOY mismo" (azul→naranja→rojo) ✅
- [x] prefers-reduced-motion: desactiva todas las animaciones ✅

### Sprint 1.3 - Secciones Clave
- [x] **Features (Bento Grid):** Banner hero full-width + 3 compact cards ✅
      Layout horizontal: texto izquierda + checklist derecha + strip de métricas
      Cards compactas con colores de acento diferenciados (blue, green, teal)
- [x] **Process:** Estilos refinados con design system premium ✅
- [x] **SuccessCases:** CSS alineado con design system, tokens, prefers-reduced-motion ✅
      Métricas en grid, patrón eyebrow con barra de acento gradient
- [x] **CtaFinal:** Sección dark de alto impacto con urgencia real ✅
      Badge pulsante "Disponible ahora", social proof, shimmer en CTA

### Entregable Fase 1
- Hero completamente rediseñado
- Tipografía y paleta renovadas en toda la página
- Secciones principales con nuevo diseño
- Animaciones de entrada implementadas

---

## Fase 2: Servicios y Conversión
> **Duración:** 2 semanas
> **Objetivo:** Mostrar servicios expandidos y mejorar conversión

### Sprint 2.1 - ServicesGrid Rediseñado
- [x] Rediseñar las cards de servicio con diseño premium ✅
      Hero card full-width + 5 compact cards con colores de acento únicos
- [x] Agregar hover states más expresivos ✅
      Barra de acento reveal, translateY, shadow-card-hover, icon scale
- [x] Mejorar la navegación entre servicios ✅
      CTA WhatsApp en hero, CTA outline con hover fill en compact cards
- [x] Mejor jerarquía visual: servicio principal vs secundarios ✅
      Hero banner domina, badge "MÁS SOLICITADO", compact cards subordinadas
- [x] Cada card debe comunicar claramente: qué, para quién, resultado ✅
      Título + descripción + 2 features clave + duración + CTA
- [x] Migración de `<style jsx>` a CSS Modules ✅
- [x] Migración de SVGs inline a sistema centralizado Icons.tsx ✅

### Sprint 2.2 - Nuevos Servicios (Tier 1)
- [x] Crear sección "Planes para Empresas" con: ✅
      BusinessPlans.tsx: 3 cards (Básico, Profesional, Corporativo)
      - Plan Básico: 5 equipos, soporte WhatsApp, reportes
      - Plan Profesional: 15 equipos, SLA 4h, antivirus corp (highlight "Más elegido")
      - Plan Corporativo: ilimitados, SLA 2h, gestor dedicado, auditoría
- [x] Crear sección "Digitalización" (automatización, scripts, procesos) ✅
      Servicio en services.ts con slug, FAQs, casos, metadata SEO
- [x] Agregar mini-sección "También desarrollo sitios web" con: ✅
      WebDevBanner.tsx: banner horizontal con 3 bullet points + CTA teal
      - Landing pages de alto impacto
      - Diseño moderno y responsive
      - Optimización SEO incluida
- [x] Actualizar `src/data/services.ts` con nuevos servicios ✅
      3 servicios añadidos: soporte-empresarial, digitalizacion-procesos, desarrollo-web
- [x] Crear páginas `/servicios/[slug]` para los nuevos servicios ✅
      Generadas automáticamente via generateStaticParams (ya existía la infra)
- [x] Agregar schemas JSON-LD para los nuevos servicios ✅
      TechnicalServiceSchema + ReviewSchema por servicio

### Sprint 2.3 - Formulario y Conversión
- [ ] Rediseñar ContactForm con mejor UX
      (pasos progresivos en vez de formulario largo)
- [ ] Mejorar la experiencia del selector de servicio (incluir nuevos servicios)
- [ ] Agregar social proof cerca del CTA (mini testimonials inline)
- [ ] Mejorar el FAQ con preguntas sobre servicios empresariales
- [ ] A/B considerar: formulario vs solo WhatsApp directo

### Entregable Fase 2
- ServicesGrid con diseño premium
- 3 nuevos servicios empresariales publicados con SEO
- Formulario de contacto mejorado
- FAQ actualizado

---

## Fase 3: Confianza y Prueba Social
> **Duración:** 1 semana
> **Objetivo:** Reforzar credibilidad profesional

### Sprint 3.1 - Testimonios y Casos
- [ ] Rediseñar sección de testimonios (si Elfsight permite personalización)
      o crear componente propio con reviews reales
- [ ] Mejorar SuccessCases: agregar más casos documentados si hay fotos
- [ ] Agregar sección "Clientes que confían" (logos de empresas si aplica)
- [ ] Stats con animación de contador (count-up al hacer scroll)

### Sprint 3.2 - Sobre Mí / Credibilidad
- [ ] Crear sección "Sobre Fernando" con:
      - Foto profesional
      - "Ingeniero de sistemas con 10+ años de experiencia"
      - Especialidades: reparación, soporte empresarial, desarrollo web
      - Certificaciones o logros relevantes
      - Enfoque: "Metodología profesional, resultados medibles"
        (esto comunica rigor sin revelar herramientas específicas)
- [ ] Integrar en la página principal o como página `/sobre-mi`

### Entregable Fase 3
- Prueba social reforzada
- Sección profesional que genera confianza
- Narrativa de marca coherente

---

## Fase 4: Polish y Performance
> **Duración:** 1 semana
> **Objetivo:** Detalles que separan un sitio bueno de uno excelente

### Sprint 4.1 - Micro-interacciones
- [ ] Hover states consistentes en toda la página
- [ ] Transiciones de scroll suaves (reemplazar AOS por Intersection Observer nativo)
- [ ] Animaciones de carga para imágenes (skeleton → reveal)
- [ ] Cursor effects sutiles en cards interactivas
- [ ] Focus states accesibles y visualmente atractivos

### Sprint 4.2 - Performance
- [ ] Auditar con Lighthouse (target: 95+ en todas las métricas)
- [ ] Implementar `next/dynamic` para componentes pesados (admin, tienda)
- [ ] Agregar Suspense boundaries para streaming
- [ ] Optimizar imágenes pendientes (lazy loading, sizes correctos)
- [ ] Verificar Core Web Vitals (LCP, FID, CLS)

### Sprint 4.3 - SEO Refuerzo
- [ ] Agregar BreadcrumbList JSON-LD schema
- [ ] Verificar que los nuevos servicios estén en el sitemap
- [ ] Actualizar keywords en metadata para servicios empresariales
- [ ] Agregar FAQ schema para preguntas de servicios nuevos
- [ ] Verificar indexación en Google Search Console

### Entregable Fase 4
- Sitio pulido con micro-interacciones
- Performance 95+ en Lighthouse
- SEO expandido para nuevos servicios

---

## Resumen de Fases

| Fase | Duración | Foco | Impacto |
|------|----------|------|---------|
| **Fase 0** | 1 semana | Limpieza técnica | Base sólida para todo lo demás |
| **Fase 1** | 2 semanas | Rediseño visual | El sitio se ve premium |
| **Fase 2** | 2 semanas | Servicios + conversión | Más servicios, más leads |
| **Fase 3** | 1 semana | Confianza y marca | Credibilidad profesional |
| **Fase 4** | 1 semana | Polish + performance | Sitio de nivel profesional |

**Total estimado: 7 semanas**

---

## Reglas del Rediseño

1. **Nunca cambiar URLs existentes** - Cada URL que rankea es sagrada
2. **Nunca eliminar schemas JSON-LD** - Solo agregar o mejorar
3. **Testear en móvil primero** - 70%+ del tráfico local es mobile
4. **Un componente a la vez** - No hacer refactors masivos de diseño
5. **Verificar SEO después de cada fase** - Google Search Console
6. **Dark mode siempre** - Cada componente nuevo debe funcionar en ambos modos

---

## Sobre la Presentación Profesional

El sitio debe comunicar:
- "Ingeniero de sistemas con metodología profesional"
- "Planificación rigurosa, entregas por fases, resultados medibles"
- "Desarrollo estructurado con estándares de calidad"

Esto refleja el proceso real de trabajo sin entrar en detalles de
herramientas específicas. El cliente ve el resultado: un profesional
organizado que entrega con calidad.

### Vocabulario para el sitio
- "Metodología profesional" (no "uso IA")
- "Desarrollo planificado por sprints" (no "desarrollo asistido por IA")
- "Diagnóstico técnico exhaustivo" (no "análisis automatizado")
- "Estándares de calidad empresarial" (no "revisión con herramientas de IA")
- "Soluciones a medida" (no "generado con...")

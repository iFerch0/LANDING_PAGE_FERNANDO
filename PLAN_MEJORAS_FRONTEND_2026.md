# Plan de Mejoras Frontend 2026
## FerchoTécnico — Tienda + Servicios de Reparación

**Creado:** 2026-03-01
**Branch activo:** `feat/ecommerce`
**Stack:** Next.js 15 · React 19 · TypeScript · Supabase · Zustand · CSS Modules

---

## Diagnóstico General

### Puntuación actual (escala 1–5)

| Dimensión | Score | Notas |
|-----------|-------|-------|
| Arquitectura | 3.5 | Buena base, capas bien definidas |
| Diseño Visual | 2.5 | Landing funcional pero sin identidad fuerte |
| Tienda (UX) | 2.0 | Funcional pero sin jerarquía visual clara |
| Componentes | 2.5 | God components pendientes de dividir |
| CSS / Tokens | 2.0 | globals.css de 6,260 líneas (crítico) |
| Testing | 1.5 | < 70% cobertura, solo 7 archivos |
| Reutilización | 3.0 | ui/ creado, pero patrones inconsistentes |

### Problemas críticos

1. **La tienda tiene poca visibilidad** — no hay entry point en la landing
2. **globals.css monolítico** (6,260 líneas) — dificulta mantener y escalar
3. **God Components** — Navbar (14KB), ServicesGrid (551 líneas), ContactForm (352 líneas)
4. **Inline styles masivos** — ServicesGrid (314 líneas JSX), TrustBar (79 líneas)
5. **Sin checkout funcional** — el carrito existe pero no hay flujo de pago
6. **Testing crítico** — < 70%, no hay tests de cart ni de tienda
7. **Sin sección "Tienda" en la landing** — los usuarios no saben que hay una tienda

---

## Visión de Producto

> **FerchoTécnico** es primero una **tienda de tecnología** con soporte técnico experto.
> La reparación es el diferenciador de confianza; la tienda es el motor de ingresos.

**Jerarquía de conversión propuesta:**

```
Landing Page
├── Hero        → CTA principal: "Ver Tienda" + WhatsApp
├── Tienda Preview  → 4 productos destacados (NUEVO)
├── Servicios   → Reparación como soporte de confianza
├── Proceso     → Por qué comprarle a FerchoTécnico
├── Stats       → Clientes, reparaciones, años
└── Contacto    → WhatsApp / Formulario
```

---

## Fases y Sprints

---

### FASE 0 — Cimientos (Semana 1)
> **Objetivo:** Asegurar la base técnica antes de construir encima.
> Sin esta fase, cada mejora visual se vuelve deuda técnica.

#### Sprint 0.1 — Guardrails de código *(Día 1, ~2h)*
**Impacto:** Previene regresiones en cada commit.

**Tareas:**
- [ ] Instalar y configurar Husky + lint-staged
- [ ] Configurar Prettier (`.prettierrc`)
- [ ] Pre-commit hook: ESLint + Prettier + `tsc --noEmit`
- [ ] Commit base de configuración

**Archivos clave:** `package.json`, `.prettierrc`, `.husky/pre-commit`, `.lintstagedrc`

**Entregable:** Cada `git commit` valida código automáticamente.

---

#### Sprint 0.2 — Tokens CSS unificados *(Día 1–2, ~3h)*
**Impacto:** Permite hacer cambios de color/tipografía en un solo lugar.

**Tareas:**
- [ ] Consolidar `src/styles/tokens.css` como única fuente de verdad
- [ ] Definir paleta completa: `--color-brand-*`, `--color-surface-*`, `--color-text-*`
- [ ] Definir escala tipográfica: `--font-size-*`, `--font-weight-*`, `--line-height-*`
- [ ] Definir espaciado: `--space-*` (4px base)
- [ ] Importar tokens en `globals.css` y eliminar duplicados
- [ ] Reducir `globals.css` de 6,260 → < 3,000 líneas

**Archivos clave:** `src/styles/tokens.css`, `src/app/globals.css`

**Entregable:** Un solo archivo de tokens importado en toda la app.

---

#### Sprint 0.3 — Seguridad básica *(Día 2, ~1h)*
**Impacto:** Evitar exposición de credenciales.

**Tareas:**
- [ ] Verificar que `.env` está en `.gitignore`
- [ ] Mover credenciales a `.env.local`
- [ ] Rotar claves Supabase si ya fueron expuestas en git
- [ ] Documentar en README el proceso de setup

**Archivos clave:** `.env`, `.env.local`, `.gitignore`

**Entregable:** Credenciales seguras, README actualizado.

---

### FASE 1 — Tienda al Frente *(Semana 1–2)*
> **Objetivo:** Hacer que la tienda sea el protagonista de la experiencia.
> Mayor impacto en conversión con menos esfuerzo.

#### Sprint 1.1 — Sección "Tienda Preview" en Landing *(Día 2–4, ~5h)*
**Impacto:** ALTO — Los usuarios de la landing ahora descubren la tienda.

**Componente nuevo:** `src/components/TiendaPreview.tsx`

**Diseño:**
```
┌─────────────────────────────────────────────────────┐
│  EQUIPOS Y ACCESORIOS               [Ver todo →]    │
│  Tecnología con garantía de experto                 │
│                                                     │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐           │
│  │ Img  │  │ Img  │  │ Img  │  │ Img  │           │
│  │$XXX  │  │$XXX  │  │$XXX  │  │$XXX  │           │
│  │[Cart]│  │[Cart]│  │[Cart]│  │[Cart]│           │
│  └──────┘  └──────┘  └──────┘  └──────┘           │
└─────────────────────────────────────────────────────┘
```

**Tareas:**
- [ ] Crear `TiendaPreview.tsx` — server component que carga 4 productos destacados
- [ ] Crear `TiendaPreview.module.css` — grid responsivo, animaciones hover
- [ ] Agregar a `page.tsx` después del Hero (segunda sección)
- [ ] Botón "Ver tienda completa" → `/tienda`
- [ ] Reutilizar `ProductCard` del sistema de tienda existente

**Patrones de reutilización:**
```tsx
// Reutiliza productService.getProducts() ya existente
// Reutiliza ProductCard ya existente
// Reutiliza Button de src/components/ui/
```

**Entregable:** Sección de productos visibles en la landing page.

---

#### Sprint 1.2 — Navbar: Tienda como destino principal *(Día 4, ~2h)*
**Impacto:** ALTO — Cada página tiene acceso visible a la tienda.

**Diseño actual:**
```
Logo | Servicios | Procesos | Casos | Contacto | [WA] | [🛒]
```

**Diseño propuesto:**
```
Logo | 🛒 TIENDA | Servicios | Contacto | [WhatsApp] | [carrito]
     ^^^^^^^^^^ más prominente, primer item
```

**Tareas:**
- [ ] Reordenar nav links: Tienda primero
- [ ] Estilo diferenciado para "Tienda" (color de acento, slight background)
- [ ] Badge de "Nuevo" o cantidad de productos en la nav de tienda
- [ ] Simplificar el menú colapsando "Procesos" y "Casos" en "Nosotros"
- [ ] Dividir Navbar en sub-componentes:
  - `NavbarLogo.tsx`
  - `NavbarLinks.tsx`
  - `NavbarCta.tsx` (WhatsApp + Cart)
  - `NavbarMobile.tsx`

**Archivos clave:** `src/components/Navbar.tsx`, `src/components/Navbar.module.css`

**Entregable:** Navbar modular con tienda como destino prioritario.

---

#### Sprint 1.3 — Rediseño de ProductCard *(Día 5, ~4h)*
**Impacto:** ALTO — Cada producto se ve más atractivo y genera más conversión.

**Problemas actuales:**
- Layout básico sin jerarquía visual clara
- Hover states débiles
- CTA de carrito poco visible

**Diseño propuesto:**
```
┌────────────────────────────┐
│ [NUEVO]              ♡     │ ← Badge status + favorito
│                            │
│      [Imagen 4:3]          │ ← Imagen con zoom en hover
│                            │
├────────────────────────────┤
│ Lenovo IdeaPad 3           │ ← Título con font-weight
│ Intel Core i5 · 8GB RAM    │ ← Specs como subtítulo
│                            │
│ $1,850,000                 │ ← Precio con jerarquía
│ ──────────────────────────  │
│ [+ Agregar al carrito]     │ ← CTA full-width
│ [💬 Preguntar por WA]      │ ← Secundario
└────────────────────────────┘
```

**Tareas:**
- [ ] Crear `ProductCard.module.css` con estilos extraídos
- [ ] Imagen con aspect-ratio 4:3 y object-fit cover
- [ ] Hover: escala sutil + sombra elevada
- [ ] Badge de estado con colores semánticos
- [ ] Indicador de stock (`quedan N unidades`)
- [ ] Animación de entrada en la lista (CSS stagger)

**Archivos clave:** `src/components/tienda/ProductCard.tsx`

**Entregable:** Tarjetas de producto visualmente atractivas.

---

#### Sprint 1.4 — Hero de la Tienda *(Día 5–6, ~3h)*
**Impacto:** ALTO — Primera impresión al entrar a /tienda.

**Diseño propuesto:**
```
┌─────────────────────────────────────────────────────┐
│  FerchoTécnico Store                                │
│  Equipos reacondicionados y accesorios              │
│  con garantía de experto técnico                    │
│                                                     │
│  [🔍 Buscar productos...]  [Filtrar ▼]              │
│                                                     │
│  ● Todos  ● Laptops  ● Accesorios  ● Reacondicionado│
└─────────────────────────────────────────────────────┘
```

**Tareas:**
- [ ] Agregar hero section al principio de `tienda/page.tsx`
- [ ] Barra de búsqueda prominente (conectar con filtros existentes)
- [ ] Pills de categorías rápidas (filtros en una fila)
- [ ] Breadcrumb: Inicio › Tienda
- [ ] Crear `tienda/page.module.css` con estilos del hero

**Reutilización:**
```tsx
// Reutiliza StoreFilters.tsx ya existente (adaptar UI)
// Reutiliza Breadcrumbs.tsx ya existente
```

**Entregable:** Página de tienda con hero atractivo y filtros accesibles.

---

### FASE 2 — Calidad Visual y UX *(Semana 2–3)*
> **Objetivo:** Pulir la experiencia visual en toda la app.

#### Sprint 2.1 — CartDrawer mejorado *(Día 7, ~3h)*
**Impacto:** MEDIO-ALTO — El flujo del carrito es central para conversión.

**Problemas actuales:**
- CartDrawer existe pero puede mejorar visualmente
- No hay resumen de orden claro
- Sin feedback de "vacío"

**Diseño propuesto:**
```
┌──────────────────────────┐
│ Tu Carrito (3 artículos) │ ← Header con contador
├──────────────────────────┤
│ [img] Lenovo IdeaPad     │
│       $1,850,000  [- 1 +]│ ← Controles de cantidad
│       [🗑 Eliminar]       │
├──────────────────────────┤
│ Subtotal:   $3,700,000   │
│ [Comprar por WhatsApp →] │ ← CTA principal
│ [Seguir comprando]       │ ← Secundario
└──────────────────────────┘
```

**Tareas:**
- [ ] Refactorizar `CartDrawer.tsx` con mejor layout
- [ ] Animación de slide-in desde la derecha
- [ ] Estado vacío con CTA a la tienda
- [ ] Controles de cantidad +/- inline
- [ ] Botón "Comprar por WhatsApp" que genera mensaje con orden detallada

**Reutilización:**
```tsx
// Usa useCartStore de src/store/cart.ts (ya existente)
// Usa getWaLink de src/lib/utils/whatsapp.ts (ya existente)
// Usa Button de src/components/ui/ (ya existente)
```

**Archivos clave:** `src/components/cart/CartDrawer.tsx`

**Entregable:** Carrito funcional con CTA de WhatsApp para cerrar venta.

---

#### Sprint 2.2 — Migrar ServicesGrid a CSS Modules *(Día 8, ~3h)*
**Impacto:** MEDIO — Elimina 314 líneas de inline styles, mejora mantenibilidad.

**Tareas:**
- [ ] Crear `ServicesGrid.module.css`
- [ ] Extraer todos los `<style>` JSX a CSS Modules
- [ ] Verificar que el visual no cambia (screenshot diff)
- [ ] Mover datos de servicios del componente a `src/data/services.ts`
- [ ] Dividir en sub-componentes: `ServiceCard.tsx`, `ServiceBadge.tsx`

**Entregable:** ServicesGrid de 551 → ~150 líneas.

---

#### Sprint 2.3 — Skeleton de carga en Tienda *(Día 8–9, ~2h)*
**Impacto:** MEDIO — Mejora percepción de velocidad.

**Tareas:**
- [ ] Crear `ProductCardSkeleton.tsx` usando `Skeleton` de `components/ui/`
- [ ] Aplicar en `ProductGrid.tsx` mientras carga
- [ ] Crear `TiendaPreviewSkeleton.tsx` para la landing
- [ ] Animación shimmer en CSS

**Reutilización:**
```tsx
// Reutiliza Skeleton de src/components/ui/Skeleton/
```

**Entregable:** Loading states atractivos sin jank visual.

---

#### Sprint 2.4 — Tipografía y colores unificados *(Día 9, ~2h)*
**Impacto:** MEDIO — Consistencia visual en toda la app.

**Decisiones de diseño:**
- Font display (headings): `Syne` o `Space Grotesk` — bold, técnico
- Font body: `Inter Variable` — legible, moderno
- Color primario: Azul técnico `#0066FF`
- Color acento tienda: Verde `#00C851` (disponibilidad, carrito)
- Color reparación: Naranja `#FF6B2B` (urgencia, servicio)

**Tareas:**
- [ ] Definir fonts en `src/styles/typography.css`
- [ ] Cargar Google Fonts en `layout.tsx` con `next/font`
- [ ] Actualizar tokens en `src/styles/tokens.css`
- [ ] Aplicar en los componentes clave

**Archivos clave:** `src/styles/typography.css`, `src/styles/tokens.css`, `src/app/layout.tsx`

**Entregable:** Tipografía consistente y paleta de color clara.

---

### FASE 3 — Checkout y Conversión *(Semana 3–4)*
> **Objetivo:** Cerrar el ciclo de venta con flujo de pago real.

#### Sprint 3.1 — Checkout vía WhatsApp mejorado *(Día 10, ~4h)*
**Impacto:** ALTO — Cierra ventas sin necesidad de pasarela.

**Flujo:**
```
Carrito → Botón "Pedir por WhatsApp" → Formulario rápido → WA con orden pre-cargada
```

**Mensaje generado automáticamente:**
```
Hola Fernando! Quiero hacer este pedido:

📦 ORDEN #2026-001
• Lenovo IdeaPad 3 x1 = $1,850,000
• Mouse Logitech M500 x2 = $120,000

TOTAL: $1,970,000

Nombre: [Juan Pérez]
Ciudad: [Montería]
Método de pago preferido: [Nequi]
```

**Tareas:**
- [ ] Crear `src/lib/utils/order.ts` — genera mensaje de WhatsApp con carrito
- [ ] Crear formulario rápido de checkout (nombre, ciudad, método de pago)
- [ ] Crear `CheckoutModal.tsx` — modal simple antes de ir a WA
- [ ] Integrar con `useCartStore` + `getWaLink`
- [ ] Limpiar carrito después de enviar pedido

**Reutilización:**
```tsx
// Usa useCartStore de src/store/cart.ts
// Usa getWaLink de src/lib/utils/whatsapp.ts
// Usa Input, Button de src/components/ui/
// Usa PHONE_RAW de src/constants/contact.ts
```

**Entregable:** Flujo completo de checkout vía WhatsApp sin pasarela de pago.

---

#### Sprint 3.2 — Página de detalle de producto mejorada *(Día 11, ~3h)*
**Impacto:** ALTO — Es la página donde se toma la decisión de compra.

**Mejoras propuestas:**
- Galería de imágenes con zoom real (verificar `ImageGallery.tsx`)
- Specs en tabla visual clara
- Sticky "add to cart" en mobile
- Trust badges: garantía, devolución, soporte
- Sección de preguntas frecuentes sobre el producto

**Tareas:**
- [ ] Agregar trust badges (garantía técnica, soporte post-venta)
- [ ] Mejorar layout de specs (tabla vs. lista)
- [ ] Sticky bottom bar en mobile con precio + botón
- [ ] Mejorar galería con thumbnails navegables
- [ ] Agregar "Sobre este producto" expandible

**Archivos clave:** `src/app/tienda/[slug]/page.tsx`

**Entregable:** Página de producto que convierte mejor.

---

#### Sprint 3.3 — Sección de servicios rediseñada *(Día 12, ~4h)*
**Impacto:** MEDIO-ALTO — Claridad en los servicios de reparación.

**Objetivo:** Servicios como complemento a la tienda, no como competidor.

**Nuevo mensaje:** *"Comprás el equipo, lo reparamos si falla. Equipo + soporte en un solo lugar."*

**Tareas:**
- [ ] Reducir ServicesGrid de 6 → 4 servicios principales
- [ ] Agregar CTA de "¿Tienes un equipo viejo? Tráelo a reparar"
- [ ] Vincular servicios con productos relacionados de la tienda
- [ ] Diseño más compacto, menos texto

**Entregable:** Servicios presentados como complemento de la tienda.

---

### FASE 4 — Testing y Estabilización *(Semana 4)*
> **Objetivo:** Proteger lo construido con tests antes de continuar.

#### Sprint 4.1 — Tests críticos de carrito y tienda *(Día 13–14, ~6h)*
**Impacto:** ALTO — Sin tests, cualquier cambio puede romper el negocio.

**Tests a crear:**

```typescript
// src/store/__tests__/cart.test.ts
describe('useCartStore', () => {
  it('agrega producto al carrito')
  it('no excede el stock disponible')
  it('calcula el total correctamente')
  it('persiste en localStorage')
  it('limpia el carrito')
})

// src/components/tienda/__tests__/TiendaPreview.test.tsx
describe('TiendaPreview', () => {
  it('muestra 4 productos destacados')
  it('enlaza a /tienda')
})

// src/lib/services/__tests__/product.service.test.ts
describe('productService', () => {
  it('obtiene productos con filtros')
  it('valida datos con Zod')
  it('retorna error si falla')
})
```

**Tareas:**
- [ ] Tests para `useCartStore` (addItem, removeItem, total, stock limit)
- [ ] Tests snapshot para `ProductCard`
- [ ] Tests para `productService.getProducts`
- [ ] Tests para utils de WhatsApp (`getWaLink`, `order.ts`)
- [ ] Alcanzar > 70% de cobertura

**Entregable:** Cobertura de tests > 70%, CI pipeline verde.

---

#### Sprint 4.2 — Optimización de imágenes *(Día 14, ~2h)*
**Impacto:** MEDIO — Mejora de performance y SEO.

**Tareas:**
- [ ] Verificar que todas las imágenes usan `next/image`
- [ ] Agregar `sizes` prop correctamente en ProductCard y ProductGrid
- [ ] Configurar `sharp` en `next.config.js` para AVIF
- [ ] Revisar `hero-poster.jpg` (posiblemente 2.4MB)
- [ ] Lazy loading para productos fuera del viewport

**Archivos clave:** `scripts/optimize-images.js`, `next.config.js`

**Entregable:** Lighthouse performance > 85 en mobile.

---

### FASE 5 — Funcionalidades Avanzadas *(Mes 2)*
> **Objetivo:** Completar el e-commerce para operar de forma autónoma.

#### Sprint 5.1 — Búsqueda full-text *(Semana 5)*
- [ ] Endpoint de búsqueda en Supabase (texto en título, descripción, marca)
- [ ] Input de búsqueda en hero de tienda con debounce
- [ ] Resultados en tiempo real
- [ ] Highlight de texto coincidente en ProductCard

#### Sprint 5.2 — Filtros avanzados *(Semana 5)*
- [ ] Price range slider (el modelo ya tiene minPrice/maxPrice)
- [ ] Filtro por marca
- [ ] Filtro por disponibilidad (solo con stock)
- [ ] Ordenar por precio, fecha, popularidad

#### Sprint 5.3 — Favoritos con persistencia *(Semana 6)*
- [ ] Persistir favoritos en localStorage
- [ ] Página `/tienda/favoritos`
- [ ] Badge en navbar con cantidad de favoritos
- [ ] Botón de favorito en ProductCard (ya existe UI)

#### Sprint 5.4 — Pasarela de pago (Opcional) *(Semana 7–8)*
**Solo si el volumen de ventas lo justifica:**
- [ ] Integrar Stripe (tarjetas internacionales)
- [ ] Integrar Kushki o Wompi (PSE/Nequi Colombia)
- [ ] Crear modelo de órdenes en Supabase
- [ ] Emails de confirmación de orden

---

## Principios de Reutilización de Código

### Sistema de UI (ya existe en `src/components/ui/`)
```tsx
// SIEMPRE usar estos antes de crear nuevos componentes:
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Input'
import { Skeleton } from '@/components/ui/Skeleton'
import { EmptyState } from '@/components/ui/EmptyState'
```

### Utilidades centralizadas
```tsx
// Contacto — NUNCA hardcodear números
import { PHONE_RAW, getWaLink } from '@/constants/contact'

// WhatsApp — reutilizar helpers
import { buildWhatsAppMessage } from '@/lib/utils/whatsapp'

// Formato — precios, fechas
import { formatPrice, formatDate } from '@/lib/utils/format'
```

### Datos centralizados
```tsx
// Servicios de reparación
import { services } from '@/data/services'

// FAQ
import { faq } from '@/data/faq'

// Stats del negocio
import { stats } from '@/data/stats'
```

### Patrón para nuevos componentes

```
src/components/[nombre]/
  ├── index.ts               ← export por defecto
  ├── [Nombre].tsx           ← componente principal
  ├── [Nombre].module.css    ← estilos del componente
  └── [Nombre].test.tsx      ← tests unitarios
```

---

## Decisiones Técnicas Clave

### CSS: Orden de prioridad
1. `src/styles/tokens.css` — variables globales (colores, spacing, fonts)
2. `ComponentName.module.css` — estilos del componente
3. **NUNCA** más inline styles (`style={{...}}`) ni JSX `<style>` tags

### Estado
- **Cart:** Zustand (ya implementado) — no cambiar
- **Datos del servidor:** Server Components de Next.js (ya implementado) — mantener
- **Datos del cliente en tiempo real:** considerar SWR o React Query en Fase 5

### Imágenes
- **Siempre** usar `next/image` con `sizes` prop
- **Siempre** incluir `alt` descriptivo
- Formato preferido: WebP → AVIF (configurar en next.config.js)

### Rutas de API
- Patrón: `/api/[resource]/route.ts`
- Siempre validar input con Zod
- Siempre retornar `ServiceResult<T>` consistente

---

## Checklist de "Listo para producción"

### Por cada componente nuevo:
- [ ] Tiene su propio `.module.css` (sin inline styles)
- [ ] Usa componentes de `src/components/ui/`
- [ ] Tiene al menos un test unitario
- [ ] No hardcodea strings de contacto
- [ ] Usa `next/image` para imágenes
- [ ] Es responsive (mobile-first)
- [ ] Tiene estados de loading/error/empty

### Por cada sprint:
- [ ] Tests pasan (`npm test`)
- [ ] No hay errores de TypeScript (`tsc --noEmit`)
- [ ] ESLint sin errores (`npm run lint`)
- [ ] Visual verificado en mobile y desktop

---

## Métricas de Éxito

| Métrica | Actual | Objetivo F1 | Objetivo F3 |
|---------|--------|-------------|-------------|
| Lighthouse Performance | ~75 | > 85 | > 90 |
| Lighthouse SEO | ~90 | > 95 | 100 |
| Test Coverage | < 70% | > 70% | > 80% |
| globals.css líneas | 6,260 | < 3,000 | < 1,000 |
| Tiempo de carga FCP | ~2.5s | < 2s | < 1.5s |
| Tasa de conversión WA | baseline | +20% | +40% |

---

## Orden de Ejecución Recomendado

```
Semana 1:
  Día 1: Sprint 0.1 (Guardrails) + Sprint 0.3 (Seguridad)
  Día 2: Sprint 0.2 (Tokens CSS)
  Día 3-4: Sprint 1.1 (TiendaPreview en landing) ← MAYOR IMPACTO
  Día 5: Sprint 1.2 (Navbar) + Sprint 1.3 (ProductCard)

Semana 2:
  Día 6: Sprint 1.4 (Hero tienda) + Sprint 2.1 (CartDrawer)
  Día 7: Sprint 2.4 (Tipografía) + Sprint 2.3 (Skeletons)
  Día 8: Sprint 2.2 (ServicesGrid CSS Modules)

Semana 3:
  Día 9-10: Sprint 3.1 (Checkout WhatsApp) ← CIERRA VENTAS
  Día 11: Sprint 3.2 (Detalle de producto)
  Día 12: Sprint 3.3 (Servicios rediseñados)

Semana 4:
  Día 13-14: Sprint 4.1 (Tests) + Sprint 4.2 (Imágenes)
  → Release: rama feat/ecommerce → main
```

---

## Notas de Arquitectura

### ¿Por qué tienda antes que servicios?
La tienda genera ingresos pasivos. Los servicios requieren tiempo de Fernando.
Una tienda visible multiplica el alcance sin sumar trabajo manual.
Los servicios de reparación se convierten en el **diferenciador de confianza** para comprar en la tienda.

### ¿Por qué WhatsApp checkout antes que pasarela?
- Menor fricción para el cliente colombiano
- Sin comisiones de pasarela
- Fernando puede cerrar ventas con atención personalizada
- Se puede migrar a pasarela cuando el volumen lo justifique

### ¿Por qué dividir los componentes "God"?
- Navbar (14KB) → Más difícil de testear, más propenso a bugs
- ServicesGrid (551L) → Imposible de mantener sin romper cosas
- ContactForm (352L) → Estado complejo mezclado con UI
- Dividir permite: tests unitarios, reutilización, trabajo paralelo

---

*Documento generado el 2026-03-01. Revisar y actualizar al final de cada fase.*

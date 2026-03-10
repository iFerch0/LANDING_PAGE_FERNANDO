# Auditoría de Código — Fernando Técnico Web

> **Fecha**: Marzo 2026 | **Estado general**: 7/10
> Stack: Next.js 15 · React 19 · TypeScript · CSS Modules

---

## Resumen Ejecutivo

| Categoría | Estado | Issues |
|-----------|--------|--------|
| Código muerto / no usado | ⚠️ Crítico | 3 archivos/componentes |
| Datos hardcodeados | ⚠️ Alto | 7 ubicaciones |
| Inconsistencias de datos | 🔴 Crítico | Coordenadas GPS duplicadas con valores distintos |
| TypeScript | ✅ Bueno | Sin `any`, strict mode activo |
| Performance CSS | ✅ Bueno | Bien encapsulado con CSS Modules |
| Hooks / useEffect | ✅ Bueno | Cleanup correcto en casi todos |
| Arquitectura general | ✅ Bueno | App Router, componentes bien separados |

---

## PRIORIDAD 1 — Eliminar inmediatamente

### 1.1 Archivo temporal de backup
- **Archivo**: `.tmp_old_slider.tsx` (raíz del proyecto)
- **Problema**: Copia antigua del slider con `quality={85}` (el actual usa `quality={60}`). Nunca importado. Contamina el repositorio.
- **Acción**: `git rm .tmp_old_slider.tsx`

### 1.2 Componentes definidos pero nunca usados
- **`src/components/TrustBadges.tsx`** (103 líneas) — Nunca importado en ningún archivo
- **`src/components/TrustBar.tsx`** (177 líneas) — Nunca importado en ningún archivo
- Ambos usan **estilos inline** (`style={{ }}`) en lugar de CSS Modules, inconsistente con el resto del proyecto.
- **Acción**: Eliminar ambos o implementarlos realmente. Si se planea usar, migrar estilos a `.module.css`.

### 1.3 ~~Inconsistencia crítica de coordenadas GPS~~ ✅ RESUELTO
- Ambos archivos tenían coordenadas incorretas (distintas entre sí).
- Corregidas con las coordenadas reales del negocio: `8.7352034, -75.8903534`
- Archivos actualizados: `src/app/layout.tsx` (líneas 103-104) y `src/components/TechnicalServiceSchema.tsx` (líneas 41-42, 126-127)

### 1.4 Dependencia no usada
- **`@supabase/supabase-js`** en `package.json` — No se detectó ningún import de supabase en el código fuente.
- **Acción**: Verificar y si no se usa → `npm uninstall @supabase/supabase-js`

---

## PRIORIDAD 2 — Centralizar datos hardcodeados

El proyecto tiene datos de negocio dispersos directamente en componentes. Deberían vivir en `src/data/` para reutilización y mantenimiento centralizado.

### 2.1 ~~Información de contacto duplicada en ~8 lugares~~ ✅ RESUELTO

**Número de WhatsApp** aparece en:
- `Navbar.tsx`
- `Hero.tsx`
- `ServicesGrid.tsx` (2 veces)
- `WebDevServices.tsx`
- `AboutFernando.tsx`
- `ContactForm.tsx`
- `Footer.tsx` (2 veces)
- `ErrorBoundary.tsx`

**Solución**: Crear `src/data/contact.ts`:
```ts
export const CONTACT = {
  whatsapp: '573008474121',
  whatsappDisplay: '+57 300 847 4121',
  email: 'contacto@ferchotecnico.com',
  address: 'Dg. 7 #7 - 50, Montería, Córdoba',
  coordinates: '8.7574;-75.8781', // fuente única de verdad
} as const;

export const whatsappUrl = (message: string) =>
  `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
```

### 2.2 ~~Datos hardcodeados dentro de componentes~~ ✅ RESUELTO

| Componente | Datos a extraer | Destino sugerido |
|------------|-----------------|------------------|
| `ContactForm.tsx` | `SERVICE_OPTIONS`, `DEVICE_OPTIONS`, `URGENCY_OPTIONS`, `STEPS` | `src/data/formOptions.ts` |
| `ServicesGrid.tsx` | `compactServices` array | `src/data/servicesCompact.ts` |
| `WebDevServices.tsx` | `webFeatures`, `techStack`, `deliverables` | `src/data/webServices.ts` |
| `AboutFernando.tsx` | `specialties`, `values` | `src/data/about.ts` |
| `Footer.tsx` | `businessHours`, `contactInfo` | `src/data/footer.ts` o `src/data/contact.ts` |

---

## PRIORIDAD 3 — Refactorizaciones de código

### 3.1 ~~ContactForm.tsx es demasiado grande (477 líneas)~~ ✅ RESUELTO

Actualmente mezcla en un solo archivo:
- Lógica de validación de formulario
- Estado multi-step
- Construcción del mensaje WhatsApp
- Renderizado de 3 pasos distintos

**Propuesta de división**:
```
src/components/
  ContactForm/
    index.tsx              — componente orquestador (~80 líneas)
    ContactFormStep0.tsx   — paso Info Personal
    ContactFormStep1.tsx   — paso Detalles Servicio
    ContactFormStep2.tsx   — paso Descripción
    useContactForm.ts      — hook con estado y validación
    types.ts               — interfaces ContactFormData, FormErrors
```

### 3.2 ~~Iconos chevron duplicados~~ ✅ RESUELTO

- `HeroSliderStatic.tsx` líneas 9-19: redefine `ChevronLeftIcon` y `ChevronRightIcon`
- Estos mismos iconos ya existen en `src/components/Icons.tsx`

**Acción**: En `HeroSliderStatic.tsx`, reemplazar las definiciones locales con:
```tsx
import { ChevronLeftIcon, ChevronRightIcon } from './Icons';
```

### 3.3 ~~TechnicalServiceSchema.tsx — Anti-patrón Next.js~~ ✅ RESUELTO

Líneas 165-172 manipulan el DOM directamente:
```tsx
// ⚠️ Anti-patrón
const script = document.createElement('script');
script.type = 'application/ld+json';
script.text = JSON.stringify(structuredData);
document.head.appendChild(script);
```

**Solución correcta** en Next.js (App Router):
```tsx
// ✅ Patrón correcto
return (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
  />
);
```

### 3.4 ~~Tipos globales sin archivo dedicado~~ ✅ RESUELTO

Tipos que están definidos inline en componentes y deberían estar en `src/types/`:

| Tipo | Archivo actual | Destino sugerido |
|------|---------------|------------------|
| `BeforeInstallPromptEvent` | `PWAInstaller.tsx` líneas 5-12 | `src/types/pwa.d.ts` |
| `Window & { gtag }` | `ErrorBoundary.tsx` línea 37 | `src/types/gtag.d.ts` |
| `ContactFormData`, `FormErrors` | `ContactForm.tsx` | `src/types/forms.ts` |

---

## PRIORIDAD 4 — Mejoras menores

### 4.1 ~~Magic number en ContactForm.tsx~~ ✅ RESUELTO (durante P3)
- `MAX_DESCRIPTION_LENGTH = 500` en `ContactFormStep2.tsx`

### 4.2 ~~Ruta de imagen con `../../public/` en AboutFernando.tsx~~ ✅ RESUELTO
- Eliminado import estático frágil, reemplazado por `src="/img/sobre-mi.avif"`

### 4.3 services.ts es monolítico (890 líneas) — PENDIENTE (solo si crece)
- No se divide hasta que haya necesidad real

### 4.4 ~~ESLint — Añadir reglas útiles~~ ✅ RESUELTO
En `eslint.config.mjs`, considerar añadir:
```js
rules: {
  'no-unused-vars': 'error',           // detecta imports no usados
  '@typescript-eslint/no-unused-vars': 'error',
}
```
Actualmente `@supabase/supabase-js` podría haberse detectado antes con esta regla.

---

## Lo que está bien — No tocar

Estas decisiones técnicas son correctas y no necesitan cambios:

- ✅ CSS Modules para encapsulación de estilos
- ✅ `useEffect` con cleanup correcto (Navbar, HeroSlider, PWAInstaller, Testimonials)
- ✅ `IntersectionObserver` para lazy-load del widget Elfsight
- ✅ `next/image` con `quality={60}` para performance
- ✅ `next/script` para Google Analytics
- ✅ Headers de seguridad en `next.config.ts`
- ✅ Redirects 301 configurados (SEO)
- ✅ `strict: true` en TypeScript sin ningún `any`
- ✅ Accesibilidad básica (aria-labels, roles)
- ✅ Schema.org implementado para SEO local
- ✅ PWA support con service worker
- ✅ `src/data/` con testimonials, heroSlides bien estructurados

---

## Checklist de ejecución

```
PRIORIDAD 1 — Crítico
[ ] Eliminar .tmp_old_slider.tsx
[ ] Eliminar TrustBadges.tsx
[ ] Eliminar TrustBar.tsx
[ ] Verificar y resolver inconsistencia de coordenadas GPS
[ ] Verificar si @supabase se usa; si no, desinstalar

PRIORIDAD 2 — Datos centralizados
[ ] Crear src/data/contact.ts con CONTACT y whatsappUrl()
[ ] Crear src/data/formOptions.ts (SERVICE_OPTIONS, etc.)
[ ] Crear src/data/webServices.ts
[ ] Crear src/data/about.ts
[ ] Crear src/data/footer.ts
[ ] Actualizar todos los componentes para importar desde data/

PRIORIDAD 3 — Refactorizaciones
[ ] Dividir ContactForm.tsx en componentes + hook
[ ] Reemplazar chevron icons locales en HeroSliderStatic con import de Icons.tsx
[ ] Migrar TechnicalServiceSchema a <script> JSX en lugar de DOM manipulation
[ ] Mover tipos globales a src/types/

PRIORIDAD 4 — Menores
[ ] Extraer MAX_DESCRIPTION_LENGTH como constante
[ ] Corregir ruta de imagen en AboutFernando.tsx
[ ] Añadir no-unused-vars a ESLint
```

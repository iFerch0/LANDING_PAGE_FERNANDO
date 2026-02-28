# Plan de Refactor — Clean Code Step by Step

> **Regla de oro:** un paso a la vez. Verificar que el build pasa antes de avanzar.
> Comando de verificación rápida: `npm run build` (o `npm run lint`).

---

## Estado actual (resumen)

| Problema | Severidad | Archivos afectados |
|----------|-----------|-------------------|
| Strings de contacto hardcodeadas | CRÍTICO | 20+ archivos |
| Número inconsistente (`573015218139` vs `573008474121`) | CRÍTICO | AboutFernando, SuccessCases |
| SVGs inline duplicados (Footer, LocalBusinessSchema) | ALTO | Footer.tsx + 3 más |
| God components (>200 líneas) | ALTO | Navbar, ContactForm, Footer |
| Datos dentro de componentes en vez de `/data` | MEDIO | ContactForm, BusinessPlans |
| Hook `useResizeObserver` no reutilizable | MEDIO | Faq.tsx |
| Comentarios obvios (`// Hero`, `// Stats`) | BAJO | page.tsx, varios |

---

## Paso 1 — Crear `src/constants/contact.ts`

**Riesgo:** Ninguno (solo añade un archivo nuevo)

Crear el archivo con TODAS las constantes de contacto del negocio:

```ts
// src/constants/contact.ts

export const PHONE_DISPLAY   = '+57 300 847 4121';
export const PHONE_RAW       = '573008474121';
export const PHONE_TEL       = 'tel:+573008474121';

export const WA_SHORT_LINK   = 'https://wa.link/n8et4q';
export const WA_BASE_URL     = `https://wa.me/${PHONE_RAW}`;

export const ADDRESS         = 'Dg. 7 #7 - 50, Montería, Córdoba';
export const CITY            = 'Montería, Córdoba';

export const FACEBOOK_URL    = 'https://www.facebook.com/iFernandoR/';
export const INSTAGRAM_URL   = 'https://www.instagram.com/iFerch0/';
export const LINKEDIN_URL    = 'https://www.linkedin.com/in/iFerch0/';

export const BUSINESS_HOURS = [
  { day: 'Lun - Vie', hours: '8:00 AM - 6:00 PM' },
  { day: 'Sábados',   hours: '9:00 AM - 4:00 PM' },
  { day: 'Domingos',  hours: '10:00 AM - 2:00 PM' },
];

export function getWaLink(message: string): string {
  return `${WA_BASE_URL}?text=${encodeURIComponent(message)}`;
}
```

**Verificar:** `npm run build` — debe pasar sin cambios.

---

## Paso 2 — Migrar strings en archivos de bajo riesgo

**Riesgo:** Bajo (cambios de import + string swap)
**Archivos (ordenados por riesgo ascendente):**

### 2a. `Hero.tsx`
- Línea 56: `"http://wa.link/n8et4q"` → `WA_SHORT_LINK`
- Línea 67: `"tel:+573008474121"` → `PHONE_TEL`

### 2b. `CtaFinal.tsx`
- Línea 25: `"http://wa.link/n8et4q"` → `WA_SHORT_LINK`
- Línea 33: `"tel:+573008474121"` → `PHONE_TEL`

### 2c. `BlogCTA.tsx`
- Línea 45: `"http://wa.link/n8et4q"` → `WA_SHORT_LINK`

### 2d. `ErrorBoundary.tsx`
- Línea 157: `"http://wa.link/n8et4q"` → `WA_SHORT_LINK`

### 2e. `Navbar.tsx`
- Línea 440: `"https://wa.link/n8et4q"` → `WA_SHORT_LINK`

### 2f. `ServicesGrid.tsx`
- Líneas 124, 187, 222: `"http://wa.link/n8et4q"` → `WA_SHORT_LINK`

**Verificar después de cada archivo:** `npm run lint` (no build completo, solo lint es suficiente aquí).

---

## Paso 3 — Migrar strings en archivos con lógica dinámica

**Riesgo:** Medio (tocar funciones con `encodeURIComponent`)

### 3a. `ContactForm.tsx`
- Línea 177: `https://wa.me/573008474121?text=${encodeURIComponent(message)}`
  → `getWaLink(message)` de constants

### 3b. `BusinessPlans.tsx`
- Línea 121: template literal con número hardcodeado
  → `getWaLink(...)` pasando el mensaje existente

### 3c. `WebDevBanner.tsx`
- Línea 41: mismo patrón
  → `getWaLink('Hola Fernando, me interesa que me desarrolles un sitio web...')`

### 3d. `ServiceTemplate.tsx`
- Línea 47: `"https://wa.me/573008474121"`
  → `WA_BASE_URL`

**Verificar:** `npm run build` — obligatorio antes de avanzar.

---

## Paso 4 — Resolver inconsistencia de número (`573015218139`)

**Riesgo:** Medio — requiere decisión de negocio primero.

> ⚠️ **Acción requerida antes de codear:** Confirmar si `573015218139` (AboutFernando y SuccessCases) es correcto o es un error. Si es un número diferente de Fernando (personal vs taller), añadir `WA_SECONDARY = '573015218139'` a constants. Si es un error, reemplazar por `WA_BASE_URL`.

### 4a. `AboutFernando.tsx` — Línea 92
### 4b. `SuccessCases.tsx` — Línea 158

**Verificar:** `npm run build`

---

## Paso 5 — Migrar `Footer.tsx`

**Riesgo:** Medio (componente grande, tocar todo el bloque `contactInfo`)

### 5a. Reemplazar el objeto `contactInfo` local por imports de constants

```diff
- const contactInfo = {
-   phone: '+57 300 847 4121',
-   whatsapp: '573008474121',
-   address: 'Dg. 7 #7 - 50, Montería, Córdoba',
- };
+ import { PHONE_DISPLAY, ADDRESS, WA_SHORT_LINK, FACEBOOK_URL, INSTAGRAM_URL, LINKEDIN_URL, BUSINESS_HOURS } from '@/constants/contact';
```

### 5b. Reemplazar el array `businessHours` local por `BUSINESS_HOURS` de constants

### 5c. Reemplazar SVGs de redes sociales inline por componentes de `Icons.tsx`

> Verificar primero que `Icons.tsx` tenga: `FacebookIcon`, `InstagramIcon`, `LinkedInIcon`, `WhatsAppIcon`. Si falta alguno, añadirlo primero en Icons.tsx antes de usar en Footer.

**Verificar:** `npm run build` + revisar visualmente el footer en `npm run dev`.

---

## Paso 6 — Migrar schemas JSON-LD

**Riesgo:** Bajo (no afectan visual, solo datos estructurados)

### 6a. `LocalBusinessSchema.tsx` — Línea 23
### 6b. `TechnicalServiceSchema.tsx` — Líneas 31, 112, 134

Reemplazar números hardcodeados por `PHONE_RAW` o `PHONE_DISPLAY` según corresponda.

**Verificar:** `npm run build`

---

## Paso 7 — Extraer hook `useResizeObserver`

**Riesgo:** Bajo (nuevo archivo, sin romper API pública)

Crear `src/hooks/useResizeObserver.ts`:

```ts
import { useEffect, useRef, useCallback } from 'react';

export function useResizeObserver(callback: () => void) {
  const ref = useRef<HTMLElement | null>(null);
  const stableCallback = useCallback(callback, [callback]);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new ResizeObserver(stableCallback);
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [stableCallback]);

  return ref;
}
```

Luego actualizar `Faq.tsx` para importarlo desde `@/hooks/useResizeObserver`.

**Verificar:** `npm run build`

---

## Paso 8 — Mover datos de `ContactForm.tsx` a `/data`

**Riesgo:** Medio (cambio en componente grande)

Crear `src/data/services.form.ts` con:
- `SERVICE_OPTIONS`
- `DEVICE_OPTIONS`
- `URGENCY_OPTIONS`
- `STEPS`

Importar en `ContactForm.tsx`. Sin cambios de lógica.

**Verificar:** `npm run build` + probar el formulario paso a paso en `npm run dev`.

---

## Paso 9 — Dividir `ContactForm.tsx` (God Component)

**Riesgo:** Alto — hacerlo solo si los pasos anteriores están completos y el build está limpio.

Extraer en este orden (del más seguro al más complejo):

1. Extraer lógica de validación a `useContactFormValidation()` hook
2. Extraer lógica de envío (WhatsApp message building) a función pura `buildWhatsAppMessage(data)`
3. Extraer cada step como subcomponente: `FormStepPersonal`, `FormStepService`, `FormStepSummary`

**Verificar después de CADA sub-paso:** `npm run build` + testear el formulario completo.

---

## Paso 10 — Limpiar comentarios obvios

**Riesgo:** Ninguno

Eliminar comentarios que solo describen lo que el código ya dice:

| Archivo | Líneas | Comentario a eliminar |
|---------|--------|----------------------|
| `page.tsx` | 41-83 | `{/* Hero - Primera impresión */}`, `{/* Features - Por qué elegirnos */}`, etc. |
| `Navbar.tsx` | 8, 199, 214 | `// Iconos SVG profesionales inline`, `// Datos de navegación`, `// Servicios del dropdown` |
| `SuccessCases.tsx` | 8, 20 | `// Metric Component`, `// Case Card Component` |

**Verificar:** `npm run lint`

---

## Checkpoint final

```bash
npm run build       # sin errores
npm run test        # sin regresiones
npm run lint        # sin warnings nuevos
```

Revisar visualmente en dev:
- [ ] Hero muestra botones de WA y teléfono
- [ ] Footer muestra info de contacto correcta
- [ ] Formulario de contacto completa los 3 pasos y abre WhatsApp
- [ ] Navbar CTA de WhatsApp funciona

---

## Orden de commits sugerido

```
feat: add contact constants file
refactor: migrate WA/phone strings in Hero, CtaFinal, BlogCTA, ErrorBoundary
refactor: migrate WA/phone strings in Navbar, ServicesGrid
refactor: migrate dynamic WA links in ContactForm, BusinessPlans, WebDevBanner
refactor: migrate Footer to use contact constants
refactor: migrate JSON-LD schemas to contact constants
refactor: extract useResizeObserver hook
refactor: move ContactForm data to /data
refactor: split ContactForm into smaller components
chore: remove obvious comments
```

---

*Creado: 2026-02-28 | Basado en análisis clean code del proyecto.*

# 📊 AUDITORÍA DE ARQUITECTURA Y CLEAN CODE
## Landing Page Fernando - Técnico en Computadores Montería

**Fecha de auditoría:** 2026-01-24  
**Versión del proyecto:** 0.1.0  
**Framework:** Next.js 15.5.0 + React 19.1.0  
**Auditor:** Agente Senior de Arquitectura

---

## 📋 RESUMEN EJECUTIVO

Este proyecto es una **landing page profesional** para un servicio técnico de computadores en Montería, Colombia. Implementa Next.js App Router con páginas dinámicas para servicios, integración con Supabase para tienda, y un sistema de componentes bien estructurado. El proyecto ha pasado por fases previas de limpieza (código muerto eliminado, páginas dinámicas consolidadas, CSS Modules parcialmente implementados). Sin embargo, persisten problemas críticos: **globals.css monolítico de 6,921 líneas**, varios componentes con **inline styles JSX masivos**, y **tests insuficientes**. La arquitectura general es buena pero carece de capas claras entre UI, dominio e infraestructura. El plan propuesto prioriza estabilidad y guardrails antes de refactors estructurales.

---

## 📊 SCORECARD DE AUDITORÍA

| Área | Score (0-5) | Evidencia | Riesgo |
|------|-------------|-----------|--------|
| **Arquitectura** | 3.5/5 | App Router bien usado, datos centralizados en `/data/`, pero libs sin boundaries, mezcla de concerns tienda/landing | Medio |
| **Clean Code** | 3/5 | Nombres claros, TypeScript habilitado, pero componentes ServicesGrid (551 líneas) y ContactForm (14KB) muy grandes | Medio |
| **Buenas prácticas** | 3/5 | ESLint configurado, path aliases `@/`, pero sin Prettier, pre-commit hooks, ni reglas estrictas | Medio |
| **Mantenibilidad** | 2.5/5 | globals.css 6,921 líneas, inline styles dispersos (ServicesGrid, TrustBar), documentación fragmentada | Alto |
| **Testing** | 1.5/5 | Solo 2 test files básicos, coverage threshold 70% configurado pero no cumplido, tests frágiles | Crítico |
| **Performance** | 3.5/5 | next/image configurado, headers de cache, pero hero-poster.jpg 2.4MB sin optimizar | Medio |
| **Seguridad** | 4/5 | Headers de seguridad en next.config, Supabase con auth, env vars protegidas, pero falta CSP completo | Bajo |
| **Accesibilidad** | 3/5 | Semántica HTML correcta, roles ARIA en secciones, pero falta testing a11y y revisión contraste | Medio |
| **Observabilidad** | 2/5 | Google Analytics, WebVitals reporter, pero sin error boundaries comprehensivos ni logging estructurado | Alto |
| **DX/DevEx** | 2.5/5 | Scripts de build personalizados, pero algunos rotos (optimize:images), workflow CI básico | Alto |

---

## 🚨 HALLAZGOS PRIORIZADOS (Top 10)

| # | Hallazgo | Severidad | Evidencia | Recomendación |
|---|----------|-----------|-----------|---------------|
| 1 | **CSS monolítico** | Crítico | `globals.css` = 6,921 líneas, 167KB. Contenido: variables, estilos de todos los componentes, media queries duplicadas | Continuar migración a CSS Modules (5% completado → 80% objetivo) |
| 2 | **Inline styles masivos** | Alto | `ServicesGrid.tsx` líneas 231-545 = 314 líneas de `<style jsx>`, `TrustBar.tsx` líneas 68-147 = 79 líneas | Migrar a CSS Modules correspondientes |
| 3 | **Tests insuficientes** | Crítico | Solo 2 archivos de test: `Hero.test.tsx`, `Services.test.tsx`. Componentes críticos sin cobertura: ContactForm, Navbar, tienda | Crear tests protectores antes de refactors |
| 4 | **God Components** | Alto | `ServicesGrid.tsx` 551 líneas (data + UI + styles), `ContactForm.tsx` 14KB, `Navbar.tsx` 14KB | Separar data/logic/presentation, extraer sub-componentes |
| 5 | **Datos hardcodeados** | Medio | `ServicesGrid.tsx` tiene array `services[]` interno (líneas 16-128) en lugar de usar `/data/` | Centralizar en `src/data/servicesGrid.ts` |
| 6 | **Scripts de build rotos** | Alto | `build:full` en package.json depende de scripts que pueden fallar: optimize:images requiere sharp funcional | Simplificar pipeline, validar scripts |
| 7 | **Documentación fragmentada** | Medio | 3 archivos .md con info de auditorías previas: ANALISIS, AUDITORIA_CODIGO_LIMPIO, FASE3 | Consolidar en un solo CHANGELOG.md |
| 8 | **Falta pre-commit hooks** | Medio | No hay husky ni lint-staged configurados. Push de código sin formatear posible | Implementar husky + lint-staged |
| 9 | **Error boundaries limitados** | Medio | Solo `ErrorBoundary.tsx` genérico, componentes pesados (tienda) sin error handling específico | Agregar error boundaries por feature |
| 10 | **Imágenes sin optimizar** | Medio | `hero-poster.jpg` en comentarios previos 2.4MB, falta verificar estado actual de optimización | Validar y optimizar a WebP si aplica |

---

## 🏗️ MAPA DE ARQUITECTURA ACTUAL

### Estructura de Carpetas
```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout + schemas + analytics
│   ├── page.tsx                 # Landing principal
│   ├── globals.css              # ⚠️ 6,921 líneas - PROBLEMA CRÍTICO
│   ├── ClientLayout.tsx         # Client providers (AOS)
│   ├── servicios/[slug]/        # ✅ Páginas dinámicas (consolidadas)
│   ├── tienda/                  # Feature: tienda de productos
│   ├── admin/                   # Feature: admin panel
│   ├── blog/                    # Feature: blog
│   └── api/                     # API routes
├── components/                   # 47 archivos + 10 subcarpetas
│   ├── *.tsx + *.module.css     # Componentes con CSS Modules (parcial)
│   ├── __tests__/               # 2 tests básicos
│   ├── tienda/                  # ✅ Sub-módulo bien estructurado
│   └── admin/                   # Sub-módulo admin
├── data/                        # ✅ Datos centralizados
│   ├── services.ts              # 771 líneas - servicios dinámicos
│   ├── faq.ts, stats.ts, testimonials.ts
│   └── heroSlides.ts, pc-images.ts
├── lib/                         # Infraestructura
│   ├── supabase.ts              # Cliente Supabase
│   ├── db.ts, auth.ts           # Lógica de BD
│   └── storage.ts, types.ts
├── hooks/                       # 1 hook: useProducts
├── contexts/                    # 1 context: AuthContext
└── types/                       # 1 archivo de tipos
```

### Diagrama de Dependencias (ASCII)
```
                    ┌─────────────────────────────────────┐
                    │              layout.tsx             │
                    │  (Root: schemas, analytics, footer) │
                    └──────────────┬──────────────────────┘
                                   │
         ┌─────────────────────────┼─────────────────────────┐
         │                         │                         │
    ┌────▼────┐              ┌─────▼─────┐            ┌──────▼──────┐
    │ page.tsx│              │servicios  │            │   tienda    │
    │(Landing)│              │  /[slug]  │            │   /admin    │
    └────┬────┘              └─────┬─────┘            └──────┬──────┘
         │                         │                         │
         ▼                         ▼                         ▼
┌─────────────────┐    ┌─────────────────────┐    ┌─────────────────┐
│   COMPONENTS    │    │      data/          │    │     lib/        │
│ Hero, Features, │◄───│   services.ts       │    │  supabase.ts    │
│ ServicesGrid... │    │   faq.ts, stats.ts  │    │  db.ts, auth.ts │
└────────┬────────┘    └─────────────────────┘    └────────┬────────┘
         │                                                  │
         ▼                                                  │
┌─────────────────┐                                         │
│  globals.css    │◄────────────────────────────────────────┘
│  (monolítico)   │   ⚠️ Todos dependen de globals.css
└─────────────────┘
```

### Flujo de Datos Actual
```
UI (page.tsx)
    │
    ├──► Componentes ──► [ALGUNOS] ──► data/*.ts (centralizado) ✅
    │         │
    │         └──► [OTROS] ──► Data hardcodeada inline ❌
    │
    ├──► lib/supabase ──► API Supabase (productos, auth)
    │
    └──► API routes (/api/*) ──► Supabase
```

### Puntos Críticos Identificados
1. **Auth/pagos**: Integración Supabase Auth en `contexts/AuthContext.tsx`, productos en tienda
2. **SEO/Schemas**: Múltiples schemas JSON-LD (LocalBusiness, Organization, FAQ, Service)
3. **Formularios**: `ContactForm.tsx` con validación inline, no usa lib de forms

---

## 🎯 ARQUITECTURA OBJETIVO PROPUESTA

### Principios
1. **Separación de capas**: UI → Application → Domain → Infrastructure
2. **Feature-first**: Organizar por dominio (landing, tienda, admin, blog)
3. **Co-localización**: Componentes con sus tests, estilos y tipos cerca
4. **Boundaries claros**: Imports unidireccionales (nunca tienda→landing)

### Estructura Propuesta (Migración Incremental)
```
src/
├── app/                        # Solo routing y layouts
│   ├── (landing)/              # Route group: landing
│   │   ├── page.tsx
│   │   └── servicios/[slug]/
│   ├── (shop)/                 # Route group: tienda
│   │   └── tienda/
│   ├── (admin)/                # Route group: admin
│   │   └── admin/
│   └── globals.css             # REDUCIDO: solo variables + reset
│
├── features/                   # Feature modules (futuro)
│   ├── landing/
│   │   ├── components/
│   │   ├── data/
│   │   └── hooks/
│   ├── shop/
│   └── admin/
│
├── shared/                     # Código compartido
│   ├── components/ui/          # Componentes base reutilizables
│   ├── lib/                    # Infraestructura
│   ├── hooks/                  # Hooks genéricos
│   └── types/                  # Tipos compartidos
│
└── styles/                     # CSS design system
    ├── variables.css           # Design tokens
    ├── reset.css               # CSS reset
    └── utilities.css           # Helpers opcionales
```

**NOTA:** Esta estructura es el objetivo final. El plan incremental no la implementa de golpe sino que migra gradualmente manteniendo compatibilidad.

---

## 📦 PLAN DE ENTREGAS INCREMENTALES

### Estrategia de Priorización
1. ✅ **Observabilidad + seguridad básica** (si falta) → Ya implementado
2. 🔄 **Tooling y guardrails** (lint/format/tests/CI) sin tocar UI
3. 🔄 **Separación de capas** (UI vs dominio vs infra)
4. 🔄 **Refactor de hotspots** (archivos más grandes/complejos)
5. 🔄 **Tests antes/durante refactor** (tests protectores)
6. 🔄 **Optimización** (solo cuando lo anterior esté estable)

---

## 📋 ENTREGA 1: Guardrails de Desarrollo

### Información General
| Campo | Valor |
|-------|-------|
| **Nombre** | Setup de Guardrails: Prettier + Pre-commit Hooks |
| **Objetivo** | Establecer formateo consistente y prevenir commits de código sin formatear/lintear |
| **Tiempo estimado** | 2-4 horas |
| **Prioridad** | P1 - Crítica |
| **Impacto** | Mantenibilidad +30%, DX +40% |

### Cambios Concretos
1. **Instalar dependencias**
   - `prettier`, `eslint-config-prettier`
   - `husky`, `lint-staged`

2. **Archivos a crear/modificar**:
   - `/.prettierrc` (nueva config)
   - `/.prettierignore` (nuevo)
   - `package.json` (scripts + lint-staged config)
   - `/.husky/pre-commit` (nuevo hook)
   - `/eslint.config.mjs` (agregar prettier plugin)

3. **Comandos**:
   ```bash
   npm install -D prettier eslint-config-prettier husky lint-staged
   npx husky init
   ```

### Riesgos y Mitigación
| Riesgo | Mitigación |
|--------|------------|
| Formateo cambia muchos archivos | Commit separado "chore: format all files" |
| Conflictos con eslint rules | Usar eslint-config-prettier para desactivar reglas conflictivas |

### Criterios de Aceptación
- [ ] `npm run format` formatea todos los archivos
- [ ] `npm run lint` pasa sin errores
- [ ] Pre-commit hook bloquea commits con errores de lint
- [ ] Documentación actualizada en README

### Checklist de Verificación
- [ ] `npm install` exitoso
- [ ] `npm run format` ejecuta sin errores
- [ ] Hacer commit intencional con error de lint → bloqueado
- [ ] `npm run build` sigue funcionando
- [ ] Dev server funciona: `npm run dev`

### Rollback Plan
```bash
git revert HEAD      # Revertir commit de setup
npm install          # Reinstalar deps originales
```

---

## 📋 ENTREGA 2: Tests Protectores del Core

### Información General
| Campo | Valor |
|-------|-------|
| **Nombre** | Tests Protectores para Componentes Críticos |
| **Objetivo** | Crear snapshot tests y tests básicos para componentes que serán refactorizados |
| **Tiempo estimado** | 4-6 horas |
| **Prioridad** | P1 - Crítica |
| **Impacto** | Testing +60%, Seguridad de refactor 100% |

### Cambios Concretos
1. **Archivos a crear**:
   - `src/components/__tests__/Navbar.test.tsx`
   - `src/components/__tests__/Features.test.tsx`
   - `src/components/__tests__/ServicesGrid.test.tsx`
   - `src/components/__tests__/ContactForm.test.tsx`
   - `src/components/__tests__/Footer.test.tsx`

2. **Tipo de tests**:
   - Smoke tests: Renderiza sin errors
   - Snapshot tests: Captura estructura HTML
   - Interaction tests básicos: Clicks, navegación

3. **Actualizar jest config si necesario**

### Riesgos y Mitigación
| Riesgo | Mitigación |
|--------|------------|
| Snapshots muy grandes | Limitar profundidad, usar inline snapshots |
| Tests frágiles a cambios de estilo | No testear clases CSS, solo estructura |

### Criterios de Aceptación
- [ ] Mínimo 5 nuevos archivos de test
- [ ] `npm test` pasa con todos los tests
- [ ] Coverage de componentes críticos > 50%
- [ ] Tests documentan comportamiento esperado actual

### Checklist de Verificación
- [ ] `npm test` ejecuta sin errores
- [ ] `npm test -- --coverage` muestra mejora
- [ ] Cada componente renderiza correctamente
- [ ] Snapshots creados y comiteados

### Rollback Plan
```bash
git revert HEAD                    # Revertir commit de tests
rm -rf src/components/__tests__/   # Eliminar tests nuevos (si parcialmente añadidos)
```

---

## 📋 ENTREGA 3: Migrar ServicesGrid a CSS Modules

### Información General
| Campo | Valor |
|-------|-------|
| **Nombre** | Migrar Inline Styles de ServicesGrid |
| **Objetivo** | Eliminar 314 líneas de `<style jsx>` en ServicesGrid.tsx y moverlas a CSS Module |
| **Tiempo estimado** | 2-3 horas |
| **Prioridad** | P2 - Alta |
| **Impacto** | Mantenibilidad +20%, globals.css permanece igual (no tocamos) |

### Cambios Concretos
1. **Archivos a crear**:
   - `src/components/ServicesGrid.module.css`

2. **Archivos a modificar**:
   - `src/components/ServicesGrid.tsx`
     - Importar CSS Module
     - Reemplazar classNames globales con `styles.xxx`
     - Eliminar bloque `<style jsx>`

3. **Clases a migrar** (20+ clases):
   ```
   .services-grid, .services-grid__header, .services-grid__eyebrow,
   .services-grid__title, .services-grid__subtitle, .services-grid__container,
   .service-card, .service-card--popular, .service-card__badge, ...
   ```

### Riesgos y Mitigación
| Riesgo | Mitigación |
|--------|------------|
| Estilos se rompen visualmente | Comparar screenshots antes/después |
| Variables CSS no disponibles | CSS Modules pueden usar vars de :root |

### Criterios de Aceptación
- [ ] `<style jsx>` completamente eliminado de ServicesGrid.tsx
- [ ] Nuevo archivo ServicesGrid.module.css funcional
- [ ] Apariencia visual IDÉNTICA al estado anterior
- [ ] Build exitoso sin warnings

### Checklist de Verificación
- [ ] `npm run dev` - Verificar visualmente en browser
- [ ] Comparar screenshots: desktop, tablet, mobile
- [ ] `npm run build` - Sin errores
- [ ] Tests existentes pasan

### Rollback Plan
```bash
git checkout HEAD^ -- src/components/ServicesGrid.tsx
rm src/components/ServicesGrid.module.css
```

---

## 📋 ENTREGA 4: Migrar TrustBar a CSS Modules

### Información General
| Campo | Valor |
|-------|-------|
| **Nombre** | Migrar Inline Styles de TrustBar |
| **Objetivo** | Eliminar 79 líneas de `<style jsx>` en TrustBar.tsx |
| **Tiempo estimado** | 1-2 horas |
| **Prioridad** | P2 - Alta |
| **Impacto** | Mantenibilidad +10% |

### Cambios Concretos
1. **Archivos a crear**:
   - `src/components/TrustBar.module.css`

2. **Archivos a modificar**:
   - `src/components/TrustBar.tsx`
     - Eliminar `<style jsx>` (líneas 68-147)
     - Importar y usar CSS Module

### Riesgos y Mitigación
| Riesgo | Mitigación |
|--------|------------|
| Baja - Componente pequeño | Test visual rápido |

### Criterios de Aceptación
- [ ] `<style jsx>` eliminado de TrustBar.tsx
- [ ] TrustBar.module.css creado y funcional
- [ ] Apariencia visual idéntica

### Checklist de Verificación
- [ ] Visual check en browser (desktop/mobile)
- [ ] `npm run build` exitoso
- [ ] Landing page carga correctamente

### Rollback Plan
```bash
git checkout HEAD^ -- src/components/TrustBar.tsx
rm src/components/TrustBar.module.css
```

---

## 📋 ENTREGA 5: Centralizar Datos de ServicesGrid

### Información General
| Campo | Valor |
|-------|-------|
| **Nombre** | Extraer Data de ServicesGrid a /data/ |
| **Objetivo** | Mover el array `services[]` hardcodeado de ServicesGrid a un archivo centralizado |
| **Tiempo estimado** | 1-2 horas |
| **Prioridad** | P2 - Alta |
| **Impacto** | Clean Code +15%, Mantenibilidad +15% |

### Cambios Concretos
1. **Archivos a crear**:
   - `src/data/servicesGrid.ts` (nuevo archivo con interface + data)

2. **Archivos a modificar**:
   - `src/components/ServicesGrid.tsx`
     - Eliminar líneas 5-128 (interface + array services)
     - Importar desde `@/data/servicesGrid`

3. **Contenido nuevo archivo**:
   ```typescript
   export interface GridService {
     icon: React.ReactElement;
     title: string;
     description: string;
     priceFrom: string;
     duration: string;
     includes: string[];
     popular?: boolean;
   }
   
   export const gridServices: GridService[] = [ /* ... */ ];
   ```

### Riesgos y Mitigación
| Riesgo | Mitigación |
|--------|------------|
| Icons como JSX en data file | Mantener icons inline o extraer a componente Icons |
| Import path incorrecto | Usar alias @/data/ |

### Criterios de Aceptación
- [ ] Nuevo archivo `src/data/servicesGrid.ts` con tipos exportados
- [ ] ServicesGrid.tsx solo contiene UI y lógica de render
- [ ] Funcionalidad idéntica

### Checklist de Verificación
- [ ] `npm run dev` - Grid renderiza igual
- [ ] Import types funcionan
- [ ] `npm run build` exitoso

### Rollback Plan
```bash
git revert HEAD
```

---

## 📋 ENTREGA 6: Reducir globals.css - Fase 1

### Información General
| Campo | Valor |
|-------|-------|
| **Nombre** | Inicio de Reducción globals.css (Variables y Base) |
| **Objetivo** | Extraer variables CSS y estilos base a archivos separados para mejor organización |
| **Tiempo estimado** | 3-4 horas |
| **Prioridad** | P2 - Alta |
| **Impacto** | Mantenibilidad +25% |

### Cambios Concretos
1. **Archivos a crear**:
   - `src/app/styles/variables.css` (~200 líneas de :root)
   - `src/app/styles/base.css` (~100 líneas de reset + typography)

2. **Archivos a modificar**:
   - `src/app/globals.css`
     - Eliminar bloques extraídos
     - Mantener imports: `@import "./styles/variables.css";`
   - `src/app/layout.tsx` (si necesario ajustar import)

3. **Bloques a extraer de globals.css**:
   ```css
   /* variables.css: líneas 1-330 aprox */
   :root { /* Primitive Color Tokens */ }
   @media (prefers-color-scheme: dark) { }
   [data-color-scheme="dark"] { }
   [data-color-scheme="light"] { }
   
   /* base.css: líneas 326-408 aprox */
   html { }
   body { }
   *, *::before, *::after { }
   ```

### Riesgos y Mitigación
| Riesgo | Mitigación |
|--------|------------|
| CSS imports no funcionan | Verificar que Next.js soporta @import |
| Variables no disponibles | Asegurar orden de imports correcto |

### Criterios de Aceptación
- [ ] globals.css reducido en ~400 líneas
- [ ] Nuevos archivos styles/variables.css y styles/base.css
- [ ] Variables CSS siguen accesibles en toda la app
- [ ] Apariencia visual idéntica

### Checklist de Verificación
- [ ] Todos los colores/espacios funcionan
- [ ] Dark mode sigue funcionando
- [ ] `npm run build` exitoso
- [ ] Test en diferentes breakpoints

### Rollback Plan
```bash
git revert HEAD
rm -rf src/app/styles/
```

---

## 📋 ENTREGA 7: Consolidar Documentación

### Información General
| Campo | Valor |
|-------|-------|
| **Nombre** | Consolidar Archivos de Documentación |
| **Objetivo** | Fusionar documentos dispersos en README.md + ARCHITECTURE.md |
| **Tiempo estimado** | 1-2 horas |
| **Prioridad** | P3 - Media |
| **Impacto** | DX +20%, Onboarding +30% |

### Cambios Concretos
1. **Archivos a eliminar (después de consolidar)**:
   - `ANALISIS_LANDING_PAGE.md` (info de UX, mover relevante a docs)
   - `AUDITORIA_CODIGO_LIMPIO.md` (histórico, mantener como referencia)
   - `FASE3_MODULARIZACION.md` (completado, archivar)

2. **Archivos a crear/modificar**:
   - `README.md` (actualizar con instrucciones claras)
   - `ARCHITECTURE.md` (nuevo - resumen de estructura)
   - `CHANGELOG.md` (nuevo - historial de cambios)

3. **Estructura README propuesta**:
   ```markdown
   # FerchoTécnico - Landing Page
   ## Quick Start
   ## Scripts Disponibles
   ## Estructura del Proyecto
   ## Desarrollo
   ## Deploy
   ```

### Riesgos y Mitigación
| Riesgo | Mitigación |
|--------|------------|
| Perder información útil | No eliminar hasta consolidar |
| README muy largo | Usar archivos separados para detalles |

### Criterios de Aceptación
- [ ] README.md actualizado y completo
- [ ] ARCHITECTURE.md documenta estructura actual
- [ ] Archivos obsoletos archivados o eliminados
- [ ] Nuevo desarrollador puede hacer setup en <5 min

### Checklist de Verificación
- [ ] README tiene instrucciones de setup
- [ ] Scripts documentados funcionan
- [ ] Links en documentación funcionan

### Rollback Plan
```bash
git revert HEAD
```

---

## 📋 ENTREGA 8: Validar y Simplificar Pipeline de Build

### Información General
| Campo | Valor |
|-------|-------|
| **Nombre** | Auditar y Arreglar Scripts de Build |
| **Objetivo** | Asegurar que todos los scripts en package.json funcionan y documentar su uso |
| **Tiempo estimado** | 2-3 horas |
| **Prioridad** | P2 - Alta |
| **Impacto** | DX +30%, CI/CD +40% |

### Cambios Concretos
1. **Scripts a validar**:
   ```json
   "dev": "next dev"           // ✅ Funciona
   "build": "next build"       // ✅ Funciona
   "build:full": "..."         // ⚠️ Validar dependencias
   "optimize:images": "..."    // ⚠️ Requiere sharp
   ```

2. **Archivos a modificar**:
   - `package.json` (actualizar scripts si necesario)
   - Scripts en `/scripts/` (arreglar o documentar uso)

3. **Decisiones**:
   - Si `optimize:images` falla: documentar requisitos ó simplificar
   - Asegurar `npm run build` siempre funciona independiente

### Riesgos y Mitigación
| Riesgo | Mitigación |
|--------|------------|
| Scripts rotos bloquean deploy | Separar build:full de build |
| Dependencias de sistema faltantes | Documentar en README |

### Criterios de Aceptación
- [ ] `npm run build` siempre exitoso
- [ ] Scripts opcionales documentados
- [ ] CI puede correr sin scripts experimentales

### Checklist de Verificación
- [ ] `npm run build` - exitoso
- [ ] `npm run dev` - funciona
- [ ] Ejecutar cada script y documentar resultado

### Rollback Plan
```bash
git checkout HEAD^ -- package.json
```

---

## 📋 ENTREGAS ADICIONALES (Backlog Priorizado)

### Entrega 9: Migrar más componentes a CSS Modules
- HeroSliderStatic (7KB de componente)
- Faq (ya tiene module, verificar completitud)
- Features (ya tiene module, verificar completitud)

### Entrega 10: Componentes más pequeños
- Dividir ContactForm.tsx (14KB) en sub-componentes
- Dividir Navbar.tsx (14KB) en sub-componentes

### Entrega 11: Error Boundaries por Feature
- Crear error boundaries para tienda
- Crear error boundaries para admin

### Entrega 12: CI/CD Mejorado
- GitHub Actions para tests
- GitHub Actions para preview deploys
- Lighthouse CI integration

### Entrega 13: Accesibilidad
- Agregar testing a11y (jest-axe)
- Revisar y corregir contraste
- Verificar navegación por teclado

### Entrega 14: Performance
- Validar optimización de imágenes
- Implementar lazy loading para componentes below-the-fold
- Analizar bundle size

---

## ✅ CHECKLIST FINAL - DEFINITION OF DONE

Para considerar el refactor como completo, verificar:

### Código
- [ ] `npm run build` exitoso sin warnings
- [ ] `npm run lint` pasa sin errores
- [ ] `npm run test` pasa con coverage > 60%
- [ ] No hay archivos con `<style jsx>` (todos migrados a CSS Modules)
- [ ] globals.css < 2000 líneas (reducido de 6,921)

### Documentación
- [ ] README.md actualizado con setup completo
- [ ] ARCHITECTURE.md documenta estructura
- [ ] Cada script documentado

### QA Visual
- [ ] Landing page visualmente idéntica al estado inicial
- [ ] Páginas de servicios funcionan correctamente
- [ ] Responsive: móvil, tablet, desktop verificados
- [ ] Dark mode funciona

### DX
- [ ] Pre-commit hooks funcionando
- [ ] Nuevo desarrollador puede hacer setup en 5 minutos
- [ ] CI pasa en cada PR

### Performance
- [ ] Lighthouse Performance > 85
- [ ] LCP < 2.5s
- [ ] Bundle size documentado

---

## 📌 SUPOSICIONES A CONFIRMAR

1. **Supuesto:** El script `optimize:images` requiere sharp instalado globalmente o como dependencia
   - **Confirmar:** Ejecutar `npm run optimize:images` y verificar error
   - **Acción si falla:** Instalar sharp o documentar como opcional

2. **Supuesto:** Los tests existentes (`Hero.test.tsx`, `Services.test.tsx`) pasan correctamente
   - **Confirmar:** Ejecutar `npm test` y verificar resultados
   - **Acción si falla:** Arreglar tests antes de continuar

3. **Supuesto:** El proyecto hace deploy a Vercel
   - **Confirmar:** Verificar configuración de deploy
   - **Impacto:** CI/CD workflows dependen de esto

4. **Supuesto:** No hay archivos .md adicionales que deban preservarse
   - **Confirmar:** Revisar con el owner del proyecto
   - **Acción:** Archivar antes de eliminar

---

## 🎯 PRINCIPALES FORTALEZAS DEL PROYECTO (Top 5)

1. ✅ **Next.js App Router bien implementado**: Routing dinámico para servicios, metadata correcta, schemas JSON-LD
2. ✅ **Datos centralizados**: `/data/services.ts` con 771 líneas de contenido tipado, reutilizable
3. ✅ **CSS Modules parcialmente adoptados**: 15+ componentes ya usan modules (Stats, Testimonials, Features, etc.)
4. ✅ **Seguridad configurada**: Headers de seguridad en next.config, Supabase auth, middleware de redirección
5. ✅ **Modularidad de tienda**: Sub-carpeta `components/tienda/` bien estructurada con 23 archivos + tests

---

## 📊 MÉTRICAS DE SEGUIMIENTO

| Métrica | Estado Actual | Objetivo | Incremento |
|---------|---------------|----------|------------|
| Líneas en globals.css | 6,921 | < 2,000 | -70% |
| Componentes con inline styles | 2 (ServicesGrid, TrustBar) | 0 | -100% |
| Archivos de test | 2 | 10+ | +400% |
| Coverage | ~5% (estimado) | > 60% | +55% |
| Build time | TBD | -20% | - |
| Lighthouse Performance | TBD | > 85 | - |

---

**Documento generado automáticamente por Agente de Arquitectura**  
**Próxima revisión recomendada:** Después de completar Entregas 1-4

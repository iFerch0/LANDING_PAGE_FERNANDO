# Plan de Mejoras — FerchoTécnico (Fases 6–10)
## Continuación del Plan de Mejoras Frontend 2026

**Creado:** 2026-03-01
**Branch activo:** `feat/ecommerce`
**Stack:** Next.js 15.5.9 · React 19 · TypeScript · Supabase · Zustand · CSS Modules · Wompi

---

## Estado actual (post-Fase 5)

### Lo que ya funciona ✅

| Dimensión | Estado | Notas |
|-----------|--------|-------|
| Arquitectura | ✅ Sólida | Service/Repository pattern, TypeScript strict |
| Tienda base | ✅ Funcional | Catálogo, filtros, búsqueda, detalle, favoritos |
| Carrito | ✅ Completo | Zustand + localStorage, CartDrawer, CheckoutModal |
| Checkout | ⚠️ Solo WhatsApp | Sin pasarela de pago real |
| Testing | ✅ 98 tests / 82% | Stores, utils, componentes clave |
| SEO base | ✅ Presente | Sitemap, robots, JSON-LD, metadata dinámico |
| Imágenes | ✅ Optimizadas | next/image, AVIF+WebP, sizes correctos, sharp |
| Favoritos | ✅ Zustand | Store persistido, página /tienda/favoritos |
| Filtros | ✅ Avanzados | Sort, precio, marca, estado, disponibilidad |

### Deuda técnica pendiente ⚠️

| Problema | Impacto | Urgencia |
|----------|---------|---------|
| `globals.css` 6,260 líneas | Mantenimiento imposible | Alta |
| Navbar God Component (~550 líneas) | Imposible testear ni extender | Media |
| `TiendaClient.tsx` orphaned | Código muerto, confusión | Media |
| Warnings de build (Icons, img tags) | Build sucio | Baja |
| Sin paginación real en /tienda | Solo carga 20 items | Media |
| `ServicesGrid` con inline styles | Inconsistente con resto | Baja |

---

## Visión de producto — siguientes etapas

```
Conversión completa:
  Catálogo → Detalle → Carrito → Checkout Wompi → Confirmación
                                       ↓ (actual)
                               WhatsApp (fallback)

Admin:
  Dashboard → Pedidos → Productos → Analytics → Inventario

Engagement:
  Favoritos → Historial → Notificaciones → Blog técnico
```

---

## FASE 6 — Integración Wompi (Pagos en línea)

> **Objetivo:** Activar pagos reales con tarjeta, Nequi, PSE y Bancolombia.
> Wompi es el gateway colombiano de referencia — bajo costo, sin mensualidad, solo comisión por transacción.

### Contexto técnico de Wompi

| Concepto | Detalle |
|----------|---------|
| Tipo de integración | Widget embebido (drop-in) + API REST |
| Métodos de pago | Tarjeta C/D, Nequi, PSE, Bancolombia a la Mano, Efecty |
| Moneda | COP (centavos — multiplicar precio × 100) |
| Entornos | Sandbox: `sandbox.wompi.co` / Producción: `production.wompi.co` |
| Seguridad | Firma SHA256 del lado del servidor (obligatoria) |
| Webhooks | Evento `transaction.updated` para confirmar pago |

### Variables de entorno nuevas

```env
# Wompi
NEXT_PUBLIC_WOMPI_PUBLIC_KEY=pub_test_xxxx   # pública (cliente)
WOMPI_PRIVATE_KEY=prv_test_xxxx             # privada (servidor ONLY)
WOMPI_EVENTS_SECRET=xxxx                    # para validar webhooks
NEXT_PUBLIC_WOMPI_ENV=sandbox               # sandbox | production
```

---

### Sprint 6.1 — Infraestructura de pedidos (DB + tipos)

**Objetivo:** Crear la tabla `orders` en Supabase y los tipos necesarios.

#### Tarea 6.1.1 — Migración SQL en Supabase

```sql
-- Tabla de pedidos
CREATE TABLE orders (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reference     TEXT UNIQUE NOT NULL,           -- referencia única (ej: FT-1234)
  buyer_name    TEXT NOT NULL,
  buyer_email   TEXT NOT NULL,
  buyer_phone   TEXT,
  buyer_city    TEXT,
  payment_method TEXT,
  items         JSONB NOT NULL,                 -- snapshot del carrito
  subtotal      INTEGER NOT NULL,               -- en pesos COP
  total         INTEGER NOT NULL,               -- en pesos COP
  status        TEXT DEFAULT 'pending'          -- pending | paid | failed | cancelled
                CHECK (status IN ('pending','paid','failed','cancelled')),
  wompi_tx_id   TEXT,                           -- id de transacción Wompi
  wompi_status  TEXT,                           -- PENDING | APPROVED | DECLINED | VOIDED | ERROR
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para el dashboard admin
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created ON orders(created_at DESC);
CREATE INDEX idx_orders_reference ON orders(reference);

-- RLS: solo admin puede leer/escribir
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admin_full_access" ON orders
  USING (auth.role() = 'authenticated');

-- Trigger auto-update updated_at
CREATE TRIGGER set_updated_at BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();
```

#### Tarea 6.1.2 — Tipos TypeScript

Crear `src/lib/types/order.types.ts`:

```ts
export type OrderStatus = 'pending' | 'paid' | 'failed' | 'cancelled';
export type WompiStatus = 'PENDING' | 'APPROVED' | 'DECLINED' | 'VOIDED' | 'ERROR';

export interface OrderItem {
  productId: string;
  title: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

export interface Order {
  id: string;
  reference: string;
  buyerName: string;
  buyerEmail: string;
  buyerPhone?: string;
  buyerCity?: string;
  paymentMethod?: string;
  items: OrderItem[];
  subtotal: number;
  total: number;
  status: OrderStatus;
  wompiTxId?: string;
  wompiStatus?: WompiStatus;
  createdAt: string;
  updatedAt: string;
}
```

#### Tarea 6.1.3 — Repository y Service de pedidos

- `src/lib/repositories/order.repository.ts` — CRUD sobre tabla `orders`
- `src/lib/services/order.service.ts` — lógica de negocio (crear, confirmar, cancelar)
- `src/lib/validators/order.validators.ts` — Zod schema de checkout

**Entregable:** Tabla en Supabase + tipos + repository + service testeados.

---

### Sprint 6.2 — Generación de firma y checkout widget

**Objetivo:** Mostrar el widget de Wompi en el `CheckoutModal` con firma segura del servidor.

#### Tarea 6.2.1 — Server Action: generar referencia + firma

Crear `src/app/tienda/checkout/actions.ts`:

```ts
'use server';

import crypto from 'crypto';
import { orderService } from '@/lib/services/order.service';

export interface CheckoutPayload {
  items: OrderItem[];
  total: number;
  buyerName: string;
  buyerEmail: string;
  buyerPhone?: string;
  buyerCity?: string;
}

export async function createOrderAndSign(payload: CheckoutPayload) {
  // 1. Crear pedido en DB con status 'pending'
  const order = await orderService.create(payload);

  // 2. Obtener acceptance_token de Wompi (requerido por su API)
  const acceptanceRes = await fetch(
    `https://sandbox.wompi.co/v1/merchants/${process.env.NEXT_PUBLIC_WOMPI_PUBLIC_KEY}`
  );
  const { data: merchant } = await acceptanceRes.json();
  const acceptanceToken = merchant.presigned_acceptance.acceptance_token;

  // 3. Generar firma SHA256
  // Formato: reference + amountInCents + currency + integritySecret
  const amountInCents = payload.total * 100;
  const currency = 'COP';
  const secret = process.env.WOMPI_EVENTS_SECRET!;
  const raw = `${order.reference}${amountInCents}${currency}${secret}`;
  const signature = crypto.createHash('sha256').update(raw).digest('hex');

  return {
    reference: order.reference,
    amountInCents,
    publicKey: process.env.NEXT_PUBLIC_WOMPI_PUBLIC_KEY!,
    signature,
    acceptanceToken,
    redirectUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/tienda/pedido?ref=${order.reference}`,
  };
}
```

#### Tarea 6.2.2 — Componente WompiCheckout

Crear `src/components/cart/WompiCheckout.tsx`:

```tsx
'use client';
// Renderiza el botón/widget de Wompi con los datos firmados del servidor
// Usa <script src="https://checkout.wompi.co/widget.js" data-render="button" ...>
// Incluye datos del comprador pre-llenados
```

#### Tarea 6.2.3 — Actualizar CheckoutModal

El modal tendrá dos pasos:
1. **Paso 1:** Formulario de datos (nombre, email, teléfono, ciudad, método de pago)
2. **Paso 2:** Widget de Wompi con resumen + botón "Pagar"

El botón "Pagar por WhatsApp" queda como fallback en el paso 1.

**Entregable:** Checkout funcional en sandbox — el usuario llena datos y paga con tarjeta de prueba.

---

### Sprint 6.3 — Webhook y página de confirmación

**Objetivo:** Confirmar pagos automáticamente y mostrar página de éxito.

#### Tarea 6.3.1 — Webhook handler

Crear `src/app/api/wompi/webhook/route.ts`:

```ts
// POST /api/wompi/webhook
// 1. Validar signature del header X-Event-Checksum
// 2. Verificar que transaction.status === 'APPROVED'
// 3. Actualizar order en DB: status='paid', wompiTxId, wompiStatus
// 4. Disparar notificación WhatsApp al admin (via productService.trackWhatsAppClick o similar)
```

La validación de la firma usa HMAC-SHA256 con `WOMPI_EVENTS_SECRET`.

#### Tarea 6.3.2 — Página de confirmación

Crear `src/app/tienda/pedido/page.tsx`:

```
URL: /tienda/pedido?ref=FT-1234

Muestra:
✅ ¡Pago recibido! (si status=paid)
⏳ Procesando... (si status=pending — polling cada 3s)
❌ Pago fallido (si status=failed)

Contenido del pedido: lista de items + total
CTA: "Ver en WhatsApp" para contactar al vendedor
```

#### Tarea 6.3.3 — Limpiar carrito tras pago exitoso

En la página de confirmación, al detectar `status=paid`:
- `useCartStore.getState().clearCart()`
- Guardar referencia en localStorage para mostrar "pedido reciente" en nav

**Entregable:** Flujo E2E completo en sandbox: carrito → checkout → pago → confirmación.

---

### Sprint 6.4 — Gestión de pedidos en admin

**Objetivo:** El admin puede ver, filtrar y gestionar todos los pedidos.

#### Tarea 6.4.1 — Página de pedidos

Crear `src/app/admin/pedidos/page.tsx`:
- Tabla con: referencia, comprador, total, estado (badge), fecha, acciones
- Filtro por estado (pending/paid/failed/cancelled)
- Ordenar por fecha
- Click en fila → detalle del pedido con items

#### Tarea 6.4.2 — Detalle de pedido

Crear `src/app/admin/pedidos/[id]/page.tsx`:
- Información completa del comprador
- Lista de productos comprados (con precios al momento de compra)
- Timeline de estados (pending → paid)
- Botón "Marcar como enviado" (estado manual)
- Enlace directo a WhatsApp del comprador

#### Tarea 6.4.3 — Widget de resumen en Dashboard

Actualizar `src/app/admin/page.tsx` con métricas de Wompi:
- Total vendido (mes actual)
- Pedidos pendientes
- Tasa de conversión (pedidos pagados / pedidos creados)
- Últimos 5 pedidos

**Entregable:** Panel de pedidos funcional para el admin.

---

## FASE 7 — Refactoring técnico

> **Objetivo:** Limpiar la deuda técnica acumulada para poder escalar sin fricción.

### Sprint 7.1 — Eliminar globals.css monolítico

| Paso | Acción |
|------|--------|
| 7.1.1 | Extraer reset CSS → `src/styles/reset.css` |
| 7.1.2 | Extraer estilos de landing sections → CSS Modules de cada componente |
| 7.1.3 | Extraer estilos de admin → `src/app/admin/admin.css` |
| 7.1.4 | `globals.css` debe quedar < 200 líneas (solo imports + root vars) |

**Target:** `globals.css` ≤ 200 líneas.

---

### Sprint 7.2 — Dividir Navbar (~550 líneas)

Extraer subcomponentes:
- `NavbarDesktop.tsx` — menú horizontal para desktop
- `NavbarMobile.tsx` — menú hamburguesa para mobile
- `NavbarCart.tsx` — icono de carrito con contador
- `NavbarSearch.tsx` — buscador inline (futuro)
- `Navbar.tsx` — orquestador ligero (< 80 líneas)

**Target:** Navbar testeable, < 80 líneas cada archivo.

---

### Sprint 7.3 — Limpiar warnings de build

| Archivo | Warning | Fix |
|---------|---------|-----|
| `Icons.tsx` | `title` unused (×17) | Remover destructuring o usar `title` en `<title>` SVG |
| `admin/productos/page.tsx` | `<img>` → `<Image />` | Reemplazar con `next/image` + ancho/alto |
| `ImageUploader.tsx` | `<img>` → `<Image />` | Reemplazar para preview de uploads |
| `admin/login/page.tsx` | `err` unused | Cambiar a `_err` o usar `console.error(err)` |
| `ServiceTemplate.tsx` | `canonical` unused | Remover o conectar a `<link rel="canonical">` |

**Target:** `npm run build` sin ningún warning.

---

### Sprint 7.4 — Eliminar código muerto

| Archivo | Acción |
|---------|--------|
| `TiendaClient.tsx` | Verificar si se usa — si no, eliminar |
| `ProductFilters.tsx` | Orphaned — eliminar o reactivar |
| `src/lib/db.ts` | Legacy — migrar lo que reste a repository |
| `BlogPostCard.tsx`, `BlogCTA.tsx` | Mover a carpeta `/blog` o eliminar |

---

## FASE 8 — Paginación y performance

> **Objetivo:** El catálogo carga rápido con miles de productos.

### Sprint 8.1 — Paginación real en /tienda

El `pageSize` actual es 20 pero no hay controles de página visibles en la URL. Implementar:

- Controles de paginación (`<Pagination />` component) al final del grid
- Sincronizar `?page=N` con los searchParams del servidor
- Botón "Cargar más" como alternativa mobile (infinite scroll ligero)
- Indicador "Mostrando 1–20 de 87 productos"

### Sprint 8.2 — Core Web Vitals

| Métrica | Objetivo | Acción |
|---------|----------|--------|
| LCP | < 2.5s | Preload hero image, `priority` prop en primera imagen |
| CLS | < 0.1 | `aspect-ratio` en todos los contenedores de imagen |
| INP | < 200ms | Lazy load componentes pesados (BeforeAfterSlider, SuccessCases) |
| TTFB | < 800ms | `export const revalidate = 3600` en /tienda (ISR) |

Habilitar ISR en `/tienda`:
```ts
export const revalidate = 3600; // 1 hora
```

### Sprint 8.3 — Bundle analysis

```bash
npm install --save-dev @next/bundle-analyzer
```

- Identificar y lazy-load librerías pesadas (AOS, etc.)
- Dividir el bundle de admin (no cargar en rutas públicas)

---

## FASE 9 — SEO avanzado y blog técnico

> **Objetivo:** Aparecer en Google para búsquedas de reparación de PC y venta de equipos en Montería.

### Sprint 9.1 — SEO local

| Elemento | Estado | Acción |
|----------|--------|--------|
| `LocalBusinessSchema` | Existe | Verificar datos y activar en layout |
| `sitemap.xml` | Existe | Incluir URLs de productos dinámicamente |
| `robots.txt` | Existe | Verificar reglas (no bloquear /tienda) |
| `og:image` | Parcial | Añadir imagen OG por defecto (1200×630) |
| Google Search Console | Desconocido | Verificar propiedad y enviar sitemap |

### Sprint 9.2 — Blog técnico (3 artículos iniciales)

El proyecto tiene `BlogPostCard.tsx` y `BlogCTA.tsx` sin usar. Activarlos:

- Crear ruta `src/app/blog/page.tsx` — lista de artículos
- Crear ruta `src/app/blog/[slug]/page.tsx` — artículo individual con MDX
- 3 artículos de arranque:
  1. "¿Cómo saber si tu laptop necesita cambio de pasta térmica?"
  2. "RAM vs SSD: ¿qué mejora más el rendimiento de tu PC?"
  3. "Guía para comprar un computador reacondicionado con garantía"

Los artículos posicionan como experto y generan tráfico orgánico hacia la tienda.

### Sprint 9.3 — Reviews y testimonios estructurados

- Activar `ReviewSchema.tsx` con datos reales de Google Maps o Mercado Libre
- Añadir promedio de rating visible en la landing (ej. ⭐ 4.9 — 127 reseñas)

---

## FASE 10 — Notificaciones y engagement

> **Objetivo:** Retener usuarios, notificar al admin en tiempo real, reducir abandono de carrito.

### Sprint 10.1 — Toast notifications

Actualmente el carrito no tiene feedback visual inmediato. Implementar:

- Librería: `sonner` (< 2KB, compatible con Next.js)
- Notificaciones para: añadir al carrito, quitar, checkout exitoso, error de red

### Sprint 10.2 — Notificación al admin por nuevo pedido

Al recibir webhook de Wompi con pago aprobado:
- Enviar mensaje WhatsApp al admin via API de Meta (o Twilio)
- Incluir: comprador, items, total, referencia
- Alternativamente: email via Resend (gratuito hasta 3k/mes)

### Sprint 10.3 — Abandono de carrito

- Si el usuario tiene items en carrito y lleva >30min inactivo → mostrar toast recordatorio
- En PWA: push notification de "¿Olvidaste algo en tu carrito?"

### Sprint 10.4 — Wishlist pública (compartir favoritos)

- Generar URL sharable: `/tienda/favoritos?ids=prod-1,prod-2,prod-3`
- Botón "Compartir mi lista" en `/tienda/favoritos`
- Meta tags OG para que la lista se vea bonita al compartir en WhatsApp

---

## Prioridades recomendadas

```
Impacto en ingresos:
  🔴 CRÍTICO  → Fase 6 (Wompi) — activa pagos reales
  🟠 ALTO     → Fase 8 (Paginación + ISR) — escala el catálogo
  🟡 MEDIO    → Fase 9 (SEO + Blog) — tráfico orgánico gratis
  🟢 NORMAL   → Fase 7 (Refactoring) — deuda técnica
  🔵 FUTURO   → Fase 10 (Engagement) — retención

Secuencia sugerida:
  6.1 → 6.2 → 6.3 → 6.4   (Wompi completo primero — genera revenue)
  8.1 → 8.2               (Paginación + CWV — afecta SEO)
  7.3 → 7.2 → 7.1 → 7.4  (Refactoring ordenado — de menos a más riesgo)
  9.1 → 9.2 → 9.3         (SEO acumulativo — resultados en 2–3 meses)
  10.1 → 10.2 → 10.3      (Engagement — después de tener tráfico)
```

---

## Checklist antes de ir a producción con Wompi

- [ ] Cuenta Wompi verificada con RUT y datos de empresa
- [ ] Llaves de producción generadas en el dashboard de Wompi
- [ ] Variables de entorno en producción (Vercel / servidor)
- [ ] Webhook registrado en Wompi con la URL de producción (`/api/wompi/webhook`)
- [ ] Test en sandbox con tarjeta de prueba `4242 4242 4242 4242`
- [ ] Test de rechazo con tarjeta `4111 1111 1111 1111`
- [ ] Test de webhook recibido y pedido actualizado en DB
- [ ] Página de confirmación mostrada correctamente en mobile
- [ ] WhatsApp del admin recibe notificación de pedido
- [ ] Revisión legal: políticas de devolución visibles antes del checkout

---

## Estimación de esfuerzo

| Fase | Complejidad | Descripción |
|------|-------------|-------------|
| Fase 6 | 🔴 Alta | Wompi requiere backend, webhooks y manejo de estados de pago |
| Fase 7 | 🟡 Media | Refactoring cuidadoso para no romper nada |
| Fase 8 | 🟢 Baja | Paginación y ISR son cambios pequeños de gran impacto |
| Fase 9 | 🟡 Media | Blog requiere contenido + setup MDX |
| Fase 10 | 🟡 Media | Notificaciones tienen muchas partes móviles |

---

*Documento complementario de `PLAN_MEJORAS_FRONTEND_2026.md`*
*Cubre las Fases 6–10 del roadmap de FerchoTécnico*

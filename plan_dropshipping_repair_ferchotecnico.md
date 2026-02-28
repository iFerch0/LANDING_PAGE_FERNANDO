# Plan maestro de desarrollo - Evolucion de FerchoTecnico hacia e-commerce + reparacion

## 0. Metadata del documento
- **Proyecto:** FerchoTecnico - tienda online de tecnologia + reparacion de computadores
- **Version:** 1.0
- **Estado:** Plan de implementacion inicial
- **Base actual:** Sitio ya construido con landing, modulo tienda y panel admin existentes
- **Base de datos:** Neon (PostgreSQL)
- **Objetivo principal:** Separar frontend y backend, convertir la web actual en una plataforma dual de **e-commerce** y **servicios tecnicos**, sin exponer internamente al cliente el modelo operativo de dropshipping
- **Audiencia:** Equipo de desarrollo, agentes IA, PM, QA, DevOps

---

## 1. Resumen ejecutivo

La web actual ya transmite autoridad, confianza y experiencia tecnica. El problema no es visual; el problema es de **arquitectura de negocio y producto**. Hoy la web comunica principalmente:

- reparacion de equipos
- atencion por WhatsApp
- taller fisico
- diagnostico y soporte

Para convertirla en una operacion de alto impacto, la plataforma debe reorganizarse en dos motores de negocio claramente separados pero integrados:

1. **Servicios tecnicos y reparacion de computadoras**
2. **Tienda virtual de tecnologia**

La transformacion propuesta parte de una separacion progresiva entre frontend y backend, reorganizacion del dominio, modularizacion del admin, fortalecimiento del flujo de catalogo/producto/checkout, integracion de gestion de imagenes optimizadas en AVIF, y preparacion del sistema para pricing, stock, ordenes, garantias y crecimiento escalable.

---

## 2. Objetivos del proyecto

### 2.1 Objetivo general
Construir una plataforma moderna, escalable y mantenible que permita operar:

- una landing comercial dual
- una tienda online de tecnologia
- un flujo claro de compra sin friccion
- un modulo robusto de servicios tecnicos
- un panel admin reutilizable para gestion operativa
- una arquitectura lista para integraciones futuras de precios, stock y automatizacion

### 2.2 Objetivos especificos
- Separar frontend y backend sin romper la operacion actual.
- Mantener una experiencia premium y clara para el usuario final.
- Reestructurar la arquitectura del sitio para soportar catalogo, productos, categorias, stock, pedidos y contenido.
- Mantener servicio tecnico y ecommerce en convivencia, sin mensajes cruzados.
- Aplicar clean code, SOLID, separacion de responsabilidades y reutilizacion de componentes.
- Optimizar el manejo de imagenes transformando assets a AVIF.
- Definir una ruta de despliegue clara y repetible.
- Preparar la base para automatizacion de precios e integraciones futuras.

---

## 3. Estado actual resumido

### 3.1 Lo que ya existe
- Landing page funcional y visualmente fuerte.
- Secciones bien construidas para confianza y conversion en servicios tecnicos.
- Apartado de tienda ya presente.
- Panel admin ya existente.
- Base de datos en Neon.

### 3.2 Lo que falta
- Separacion real entre frontend comercial y backend de negocio.
- Dominio funcional claro para ecommerce.
- Flujo de compra mas robusto.
- Gestion consistente de productos, variaciones, stock, precios y ordenes.
- Politicas visibles de envio, garantia, disponibilidad y soporte postventa.
- Arquitectura preparada para escalar.
- Estrategia de imagenes moderna y consistente.
- CI/CD y despliegue formal por servicios.

### 3.3 Riesgo principal si no se reestructura
Quedar con una web que parece un **taller con tienda pegada**, en lugar de una **marca tecnologica con ecommerce y soporte tecnico experto**.

---

## 4. Supuestos de trabajo

> Este plan esta escrito para ejecutarse sobre una base moderna de JavaScript/TypeScript con React y PostgreSQL. Si el repositorio actual usa otra base, se ajusta el mapeo tecnico sin cambiar la estrategia.

### 4.1 Supuestos razonables
- El frontend actual ya existe y puede refactorizarse sin reescribir todo desde cero.
- El admin ya tiene una base funcional reutilizable.
- Neon es la fuente principal de datos.
- Se puede separar infraestructura por servicios.
- El sitio debe seguir funcionando mientras se migra.

### 4.2 Informacion pendiente para cerrar arquitectura final
Para afinar este plan durante el analisis inicial se necesita:

- acceso al repositorio o estructura de carpetas
- `package.json` del frontend actual
- `package.json` del admin actual
- esquema SQL o ERD de Neon
- variables de entorno actuales
- flujo actual de autenticacion
- estructura actual de productos, categorias y media

### 4.3 Si debo revisar Neon
Si quieres que haga el analisis inicial real de datos, necesito uno de estos insumos:

- dump de esquema SQL sin datos sensibles
- ERD exportado
- lista de tablas + columnas + relaciones
- acceso de solo lectura a Neon

---

## 5. Vision objetivo del producto

### 5.1 Front-facing
La experiencia final debe tener dos rutas claras:

- **Quiero reparar mi equipo**
- **Quiero comprar tecnologia**

### 5.2 Backoffice
El panel admin debe controlar:

- productos
- categorias
- marcas
- imagenes
- banners y contenido
- ordenes
- clientes
- servicios tecnicos
- tickets/diagnosticos
- politicas y FAQ
- pricing y disponibilidad futura

### 5.3 Resultado esperado
Una sola marca, dos lineas de negocio, una misma experiencia de confianza.

---

## 6. Arquitectura objetivo

## 6.1 Propuesta de separacion
Se recomienda evolucionar hacia una arquitectura por servicios:

```text
apps/
  frontend-web/        -> web publica (landing + tienda + servicios)
  admin-panel/         -> backoffice administrativo
  backend-api/         -> API de negocio
packages/
  ui/                  -> componentes UI reutilizables
  config/              -> eslint, tsconfig, prettier, env schema
  types/               -> tipos compartidos
  utils/               -> utilidades puras reutilizables
  domain/              -> reglas de dominio compartidas si aplica
infra/
  docker/
  scripts/
```

## 6.2 Responsabilidades por capa

### frontend-web
- landing principal
- catalogo
- detalle de producto
- carrito
- checkout
- paginas de politicas
- servicios tecnicos
- formularios de soporte

### admin-panel
- CRUD operativo
- gestion de contenido
- aprobacion de productos
- gestion de ordenes
- soporte tecnico
- indicadores administrativos

### backend-api
- autenticacion y autorizacion
- catalogo y productos
- categorias y marcas
- media
- ordenes
- usuarios/clientes
- servicios tecnicos
- pricing future-ready
- integraciones

---

## 7. Stack propuesto y librerias recomendadas

> Ajustar segun stack real del proyecto una vez se revise el repositorio.

## 7.1 Base recomendada
- **Frontend web:** Next.js + TypeScript
- **Admin panel:** React + TypeScript + Vite o Next.js, segun estado actual
- **Backend:** NestJS o Express estructurado con TypeScript
- **DB:** PostgreSQL en Neon
- **ORM:** Prisma
- **Cache / jobs:** Redis + BullMQ
- **Media processing:** Sharp
- **Object storage:** Cloudinary o S3-compatible
- **Forms/validation:** React Hook Form + Zod
- **Tables:** TanStack Table
- **Data fetching:** TanStack Query
- **State management:** Zustand para estado local/controlado
- **UI:** Tailwind CSS + sistema de componentes propio
- **Testing unitario:** Vitest o Jest
- **Testing e2e:** Playwright
- **Lint / formatting:** ESLint + Prettier + Husky + lint-staged
- **API contracts:** OpenAPI / Swagger
- **Logging:** Pino
- **Monitoring:** Sentry

## 7.2 Librerias nuevas sugeridas
- `sharp` para conversion y pipelines de imagen a AVIF
- `zod` para validacion consistente
- `@tanstack/react-query` para manejo de fetch/caching
- `zustand` para estados compartidos ligeros
- `bullmq` para procesos asincornos
- `pino` para logs estructurados
- `helmet` y `cors` para endurecimiento backend
- `rate-limiter-flexible` si se requiere proteccion de endpoints publicos

---

## 8. Principios de desarrollo

## 8.1 Clean code
- funciones pequenas y con responsabilidad unica
- nombres semanticos
- cero logica de negocio en componentes visuales
- evitar componentes gigantes
- evitar helpers anonimos repartidos por todo el repo
- manejo de errores centralizado

## 8.2 Buenas practicas
- tipado estricto
- DTOs y schemas de validacion en backend
- adapters para servicios externos
- envs validadas al iniciar
- codigo orientado a modulos
- reuse first, duplicate last

## 8.3 Patrones sugeridos
- Repository pattern para acceso a datos
- Service layer para negocio
- Factory pattern para estrategias de media o pricing
- Adapter pattern para integraciones externas
- Presenter / mapper para exponer respuestas limpias a frontend
- Composition over inheritance en componentes

## 8.4 Reutilizacion de componentes
Construir un design system basico con componentes compartidos:

- Button
- Input
- Select
- Badge
- Card
- SectionHeader
- ProductCard
- PriceBlock
- AvailabilityPill
- ServiceCard
- EmptyState
- Skeleton
- Modal
- Drawer
- Table primitives
- FilterBar

---

## 9. Modelo funcional objetivo

## 9.1 Modulos publicos
- Home
- Reparacion
- Tienda
- Categoria
- Producto
- Carrito
- Checkout
- FAQ
- Garantias
- Envios
- Contacto

## 9.2 Modulos del admin
- Dashboard
- Productos
- Categorias
- Marcas
- Media library
- Ordenes
- Clientes
- Tickets tecnicos
- Landing content / banners
- FAQ / politicas
- Logs operativos

## 9.3 Modulos backend
- Auth
- Users
- Products
- Product variants
- Categories
- Brands
- Inventory
- Pricing
- Orders
- Checkout
- Media
- Services
- Tickets
- CMS-lite
- Notifications

---

## 10. Manejo de imagenes y optimizacion AVIF

## 10.1 Objetivo
Reducir peso, mejorar carga, mantener calidad visual y unificar un pipeline de media profesional.

## 10.2 Regla general
Toda imagen cargada por panel admin o procesos internos debe generar al menos:

- original
- webp opcional si se necesita fallback
- **AVIF como formato principal optimizado**
- thumbnail
- card size
- product detail size

## 10.3 Flujo recomendado
```text
Upload -> Validacion -> Normalizacion -> Transformacion -> AVIF -> Derivados -> Storage -> Metadata en DB
```

## 10.4 Reglas tecnicas
- validar mime type y peso maximo
- normalizar nombre de archivo
- eliminar espacios y caracteres inseguros
- generar hashes o nombres unicos
- guardar metadata: width, height, size, format, alt, source
- permitir recrop futuro sin reemplazar original si aplica

## 10.5 Libreria recomendada
- `sharp`

## 10.6 Buenas practicas
- no almacenar imagenes sin transformar en rutas publicas del frontend
- centralizar uploads en backend
- servir URLs firmadas o controladas si aplica
- lazy loading y placeholders en frontend

---

## 11. Plan de separacion frontend / backend

## 11.1 Estrategia
Separacion progresiva, no destructiva.

## 11.2 Orden correcto
1. congelar cambios grandes de UI sin plan
2. mapear modulos actuales
3. extraer contratos de datos
4. centralizar acceso a DB via backend
5. migrar frontend para consumir API
6. modularizar admin
7. optimizar media y despliegue

## 11.3 Criterio de exito
- frontend ya no consulta DB directo
- admin ya no contiene logica de negocio critica mezclada con UI
- backend controla reglas, validaciones, media y seguridad
- se reduce acoplamiento entre pantallas y estructura de datos

---

## 12. Fases y sprints del proyecto

# Fase 0 - Discovery tecnico y auditoria

## Sprint 0.1 - Auditoria inicial del sistema actual
**Resumen:** levantar el mapa real del proyecto existente antes de tocar arquitectura.

### Objetivos
- inventariar frontend, tienda y admin actuales
- identificar stack real
- revisar dependencias
- detectar deuda tecnica
- revisar flujos actuales de producto, tienda, contacto y admin

### Tareas
- revisar estructura de carpetas
- revisar package.json y scripts
- revisar rutas y layout actuales
- identificar componentes reutilizables
- revisar flujo actual de autenticacion
- revisar como se cargan las imagenes hoy
- revisar integracion actual con Neon

### Entregables
- documento de auditoria tecnica
- mapa de arquitectura actual
- lista de deuda tecnica priorizada
- lista de quick wins

### Definition of Done
- se entiende como funciona el proyecto real
- se identifican zonas reutilizables y zonas criticas a refactorizar

---

## Sprint 0.2 - Analisis de base de datos y dominio
**Resumen:** entender si Neon soporta la evolucion sin migraciones traumáticas.

### Objetivos
- revisar entidades actuales
- mapear relaciones
- detectar huecos para ecommerce y servicios

### Tareas
- analizar tablas actuales
- mapear productos, media, usuarios, ordenes, servicios
- proponer schema target
- definir estrategia de migracion segura

### Entregables
- ERD actual
- ERD objetivo
- backlog de migraciones

### Definition of Done
- existe una propuesta clara de modelo de datos evolucionado

---

# Fase 1 - Fundacion arquitectonica

## Sprint 1.1 - Separacion de repositorio y capas
**Resumen:** preparar la base para dividir frontend, admin y backend sin romper el negocio.

### Objetivos
- definir arquitectura de monorepo o multirepo
- separar responsabilidades tecnicas
- crear packages compartidos

### Tareas
- crear estructura `apps/` y `packages/`
- mover utilidades comunes
- configurar tsconfig compartida
- unificar eslint/prettier
- configurar aliases absolutos
- definir convenciones de carpetas

### Entregables
- estructura base del nuevo workspace
- reglas de codigo compartidas
- guia de contribucion tecnica

### Definition of Done
- el proyecto compila por apps separadas
- existe base consistente para escalar

---

## Sprint 1.2 - Backend base y contratos API
**Resumen:** crear la capa central de negocio.

### Objetivos
- iniciar API central
- exponer contratos limpios
- desacoplar frontend de la DB

### Tareas
- bootstrap de backend
- configurar Prisma con Neon
- definir modulos base
- definir DTOs
- definir Zod/OpenAPI schemas segun estrategia
- crear endpoints healthcheck, auth base, media base

### Entregables
- backend funcional desplegable
- primer contrato API documentado
- base de validacion y logging

### Definition of Done
- el backend corre de forma independiente y versionable

---

## Sprint 1.3 - Observabilidad, seguridad y calidad
**Resumen:** blindar la base antes de crecer.

### Objetivos
- garantizar calidad minima obligatoria
- preparar monitoreo y seguridad

### Tareas
- configurar eslint, prettier, husky, lint-staged
- configurar tests base
- configurar logger estructurado
- configurar manejo global de errores
- configurar rate limit y headers seguros
- configurar Sentry o equivalente

### Entregables
- pipeline local de calidad
- base de testing
- middleware global de errores

### Definition of Done
- cada app tiene criterios minimos de calidad automatizados

---

# Fase 2 - Dominio ecommerce y servicios

## Sprint 2.1 - Dominio de catalogo
**Resumen:** modelar el corazon de la tienda.

### Objetivos
- construir catalogo desacoplado de UI
- soportar crecimiento futuro

### Tareas
- crear modelos de product, category, brand, media
- definir slugging y SEO fields
- definir price model
- definir availability model
- definir product status: draft, active, archived
- crear CRUD base desde backend

### Entregables
- dominio de catalogo estable
- endpoints de catalogo y detalle
- admin hooks para gestion inicial

### Definition of Done
- se puede crear y consultar un producto de forma formal

---

## Sprint 2.2 - Dominio de servicios tecnicos
**Resumen:** separar la logica de reparacion de la logica de tienda.

### Objetivos
- tratar servicios como primer modulo del negocio
- mantener claridad operativa

### Tareas
- crear entidades service, service-category, ticket, request
- definir flujo de solicitud de diagnostico
- definir estados del ticket
- habilitar formularios de contacto tecnico

### Entregables
- modulo backend de servicios
- panel basico para seguimiento tecnico

### Definition of Done
- la operacion tecnica ya no depende de formularios improvisados

---

## Sprint 2.3 - Media service y AVIF pipeline
**Resumen:** profesionalizar el manejo de imagenes.

### Objetivos
- centralizar uploads
- generar derivados optimizados

### Tareas
- endpoint de upload seguro
- procesamiento con Sharp
- conversion a AVIF
- generacion de miniaturas
- persistencia de metadata
- integracion admin media library

### Entregables
- media service reusable
- documentos de tamanos y reglas de imagen

### Definition of Done
- toda imagen nueva pasa por pipeline controlado

---

# Fase 3 - Frontend publico renovado

## Sprint 3.1 - Reestructuracion de informacion y navegacion
**Resumen:** convertir la landing en una plataforma dual clara.

### Objetivos
- separar reparacion y tienda visualmente
- mejorar conversion

### Tareas
- redefinir IA del sitio
- actualizar header y rutas
- crear home dual
- priorizar CTAs: comprar y reparar
- reorganizar FAQ y bloques de confianza

### Entregables
- mapa de navegacion nuevo
- home refactorizada

### Definition of Done
- el usuario entiende de inmediato que existen dos lineas de negocio

---

## Sprint 3.2 - Catalogo y categorias
**Resumen:** construir experiencia de navegacion comercial.

### Objetivos
- exponer tienda real
- habilitar descubrimiento de productos

### Tareas
- pagina /tienda
- pagina /categoria/[slug]
- filtros y ordenamiento
- busqueda basica
- cards reutilizables
- skeletons y empty states

### Entregables
- catalogo funcional responsive
- sistema de filtros inicial

### Definition of Done
- se puede navegar por categorias y productos sin ambiguedad

---

## Sprint 3.3 - Detalle de producto y trust blocks
**Resumen:** optimizar la decision de compra.

### Objetivos
- crear fichas de producto serias
- reducir incertidumbre del usuario

### Tareas
- galeria de imagenes
- precio y disponibilidad
- especificaciones tecnicas
- tiempos de entrega
- garantia
- metodos de pago
- productos relacionados
- soporte precompra

### Entregables
- plantilla PDP reutilizable
- bloque de confianza por producto

### Definition of Done
- cada producto tiene una ficha clara y lista para SEO

---

# Fase 4 - Carrito, checkout y operacion

## Sprint 4.1 - Carrito y estado comercial
**Resumen:** construir el flujo de compra formal.

### Objetivos
- permitir compra estructurada
- preparar paso a checkout

### Tareas
- carrito persistente
- resumen de compra
- validacion de stock y disponibilidad
- reglas de cantidad
- manejo de descuentos futuros

### Entregables
- flujo de carrito estable
- estado comercial controlado

### Definition of Done
- el usuario puede agregar, modificar y revisar su compra

---

## Sprint 4.2 - Checkout y ordenes
**Resumen:** formalizar la transaccion.

### Objetivos
- crear pedido formal
- separar datos de cliente, entrega y pago

### Tareas
- checkout por pasos o una sola pagina
- direccion de entrega
- resumen final
- creacion de orden
- estados de orden
- webhooks de pago si aplica

### Entregables
- flujo de orden completo
- backend de ordenes y estados

### Definition of Done
- existe una orden trazable desde frontend hasta admin

---

## Sprint 4.3 - Backoffice de ordenes y soporte postventa
**Resumen:** permitir operacion interna eficiente.

### Objetivos
- controlar pedidos y soporte
- reducir trabajo manual disperso

### Tareas
- listado de ordenes
- detalle de orden
- cambio de estado
- notas internas
- timeline de orden
- acciones de postventa

### Entregables
- modulo operativo de ordenes
- panel minimo de postventa

### Definition of Done
- el admin puede gestionar pedidos sin tocar DB manualmente

---

# Fase 5 - Admin refactor y CMS operativo

## Sprint 5.1 - Refactor del panel admin
**Resumen:** separar UI admin de logica, normalizar patrones y mejorar mantenibilidad.

### Objetivos
- profesionalizar el panel
- aplicar reuse-first

### Tareas
- dividir vistas por modulos
- extraer tables, forms y dialogs reutilizables
- centralizar hooks de datos
- eliminar logica duplicada
- normalizar manejo de errores y loaders

### Entregables
- admin modularizado
- libreria de componentes admin

### Definition of Done
- nuevas pantallas se pueden construir con bajo costo incremental

---

## Sprint 5.2 - CMS ligero para landing y contenido comercial
**Resumen:** permitir edicion de contenido sin tocar codigo.

### Objetivos
- hacer la landing mas operable
- permitir cambios de banners, bloques y FAQ

### Tareas
- entidades CMS para hero, banners, faq, trust blocks, testimonios
- forms admin para contenido
- preview simple si aplica

### Entregables
- CMS operativo basico
- contenido editable desde admin

### Definition of Done
- contenido comercial principal puede actualizarse desde panel

---

# Fase 6 - SEO, rendimiento y observabilidad

## Sprint 6.1 - SEO tecnico y performance
**Resumen:** asegurar visibilidad y velocidad real.

### Objetivos
- mejorar indexacion
- optimizar tiempos de carga

### Tareas
- metadata por pagina
- schema product/service/faq segun corresponda
- sitemap dinamico
- robots
- lazy loading
- optimizacion de imagenes AVIF
- revision Core Web Vitals

### Entregables
- checklist SEO tecnico implementado
- reporte base de performance

### Definition of Done
- paginas principales quedan listas para rastreo e indexacion seria

---

## Sprint 6.2 - Observabilidad productiva
**Resumen:** medir operacion y fallos en entorno real.

### Objetivos
- detectar errores rapido
- medir conversion y salud tecnica

### Tareas
- eventos clave de ecommerce
- monitoreo backend
- alertas de error
- logs por entorno
- dashboards basicos

### Entregables
- tablero minimo de salud
- convencion de eventos y tracking

### Definition of Done
- el sistema es observable y auditable

---

# Fase 7 - QA, estabilizacion y salida a produccion

## Sprint 7.1 - QA funcional y regresion
**Resumen:** validar que la migracion no rompa experiencia ni operacion.

### Objetivos
- cubrir flujos criticos
- reducir riesgo de salida

### Tareas
- test de catalogo
- test de detalle de producto
- test de carrito y checkout
- test de formularios de reparacion
- test admin CRUD principal
- smoke tests

### Entregables
- matriz QA
- reporte de defectos
- checklist go-live

### Definition of Done
- no quedan blockers abiertos

---

## Sprint 7.2 - Go-live controlado
**Resumen:** desplegar en fases y monitorear.

### Objetivos
- evitar caidas innecesarias
- habilitar rollback simple

### Tareas
- despliegue por entornos
- migraciones controladas
- feature flags si aplica
- monitoreo post-release
- plan rollback

### Entregables
- release estable
- playbook de despliegue

### Definition of Done
- sistema en produccion con monitoreo activo y rollback definido

---

## 13. Backlog funcional recomendado posterior al MVP
- cupones y promociones
- wishlist
- comparador de productos
- reseñas verificadas
- bundles y kits
- notificaciones transaccionales
- pricing engine
- stock sincronizado
- seguimiento de envios
- soporte empresarial con contratos digitales
- dashboard comercial

---

## 14. Criterios de calidad obligatorios

### 14.1 Frontend
- componentes desacoplados
- hooks limpios
- paginas delgadas
- loading/error/empty states
- accesibilidad minima razonable
- mobile first

### 14.2 Backend
- validacion de input en todos los endpoints
- manejo de errores consistente
- logs estructurados
- transacciones cuando aplique
- servicios y repositorios separados

### 14.3 DB
- migraciones versionadas
- indices revisados
- slugs unicos
- FKs claras
- campos de auditoria: createdAt, updatedAt

### 14.4 Media
- AVIF obligatorio en pipeline web
- metadata consistente
- tamanos normalizados
- limpieza de archivos huerfanos

---

## 15. Convenciones de desarrollo sugeridas

## 15.1 Branching
- `main`
- `develop`
- `feature/...`
- `fix/...`
- `chore/...`

## 15.2 Commits
- `feat:`
- `fix:`
- `refactor:`
- `chore:`
- `docs:`
- `test:`

## 15.3 Estructura de componente frontend sugerida
```text
components/
  product/
    ProductCard.tsx
    ProductPrice.tsx
    ProductGallery.tsx
    ProductSpecs.tsx
  service/
    ServiceCard.tsx
  shared/
    Button.tsx
    Badge.tsx
    SectionHeader.tsx
```

## 15.4 Estructura backend sugerida
```text
src/
  modules/
    products/
      controllers/
      services/
      repositories/
      dto/
      mappers/
      products.module.ts
    orders/
    media/
    services/
  common/
    errors/
    guards/
    interceptors/
    utils/
```

---

## 16. Riesgos y mitigacion

| Riesgo | Impacto | Mitigacion |
|---|---:|---|
| Acoplamiento fuerte entre UI y DB | Alto | Introducir API intermedia antes de seguir creciendo |
| Admin con deuda tecnica alta | Alto | Refactor por modulos, no reescritura total inmediata |
| Modelo de datos incompleto | Alto | Discovery de Neon antes de cerrar entidades |
| Media sin control | Medio | Centralizar uploads y pipeline AVIF |
| Tiempo de migracion subestimado | Alto | Fases con entregables parciales y releases graduales |
| Mezcla de mensajes entre tienda y reparacion | Medio | IA del sitio y contenidos separados |

---

## 17. Entregables por fase

| Fase | Entregable principal |
|---|---|
| Fase 0 | Auditoria tecnica + analisis DB |
| Fase 1 | Arquitectura base separada + backend inicial |
| Fase 2 | Dominio ecommerce + servicios + media pipeline |
| Fase 3 | Frontend publico renovado |
| Fase 4 | Carrito, checkout, ordenes |
| Fase 5 | Admin modular + CMS operativo |
| Fase 6 | SEO + performance + observabilidad |
| Fase 7 | QA + go-live |

---

## 18. Orden sugerido de implementacion real
1. Auditoria tecnica del repo actual
2. Analisis de Neon
3. Estructura `apps/` + `packages/`
4. Backend API inicial
5. Refactor de media y AVIF
6. Dominio catalogo
7. Dominio servicios tecnicos
8. Refactor Home y navegacion
9. Catalogo + PDP
10. Carrito + checkout
11. Admin modular
12. SEO + QA + release

---

## 19. Instrucciones de despliegue

> Estas instrucciones son base. Ajustar cuando se confirme el stack y proveedores definitivos.

## 19.1 Entornos recomendados
- **local**
- **staging**
- **production**

## 19.2 Servicios sugeridos
- **Frontend web:** Vercel o similar
- **Admin panel:** Vercel o similar
- **Backend API:** Railway, Fly.io, Render o VPS Dockerizado
- **DB:** Neon
- **Storage media:** Cloudinary o S3-compatible
- **Redis/jobs:** Upstash Redis o Redis administrado
- **DNS/CDN:** Cloudflare

## 19.3 Variables de entorno minimas

### frontend-web
- `NEXT_PUBLIC_API_URL`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_ENV`

### admin-panel
- `VITE_API_URL` o equivalente
- `VITE_APP_ENV`

### backend-api
- `DATABASE_URL`
- `DIRECT_URL` si Prisma lo requiere
- `REDIS_URL`
- `JWT_SECRET`
- `STORAGE_BUCKET` o credenciales Cloudinary
- `SENTRY_DSN`
- `NODE_ENV`
- `PORT`

## 19.4 Pipeline CI/CD recomendado
### En cada PR
- install
- lint
- typecheck
- unit tests
- build

### En merge a develop
- deploy a staging
- correr migraciones en staging
- smoke tests

### En merge a main
- deploy a production
- correr migraciones controladas
- verificar healthcheck
- activar monitoreo post-release

## 19.5 Secuencia de despliegue recomendada
1. preparar variables de entorno
2. desplegar backend
3. correr migraciones Prisma
4. validar healthcheck
5. desplegar admin
6. desplegar frontend web
7. invalidar cache CDN si aplica
8. ejecutar smoke test manual
9. monitorear logs y errores

## 19.6 Migraciones
- versionar todas las migraciones
- nunca editar migraciones ya ejecutadas en produccion
- usar backup/logical dump previo a cambios criticos
- probar migraciones primero en staging

## 19.7 Rollback
- mantener version anterior del frontend lista
- mantener imagen anterior del backend desplegable
- si una migracion rompe compatibilidad, tener script de rollback o estrategia forward-fix

---

## 20. Checklist de inicio inmediato

### Tecnico
- [ ] compartir estructura del repo actual
- [ ] compartir package.json de web y admin
- [ ] compartir esquema de Neon o acceso read-only
- [ ] definir si se usara monorepo
- [ ] confirmar proveedor de storage

### Producto
- [ ] definir categorias iniciales
- [ ] definir campos obligatorios de producto
- [ ] definir politica de envios
- [ ] definir politica de garantias
- [ ] definir mensajes exactos para tienda virtual vs reparacion

### Operacion
- [ ] definir flujo de orden
- [ ] definir estados de ticket tecnico
- [ ] definir flujo de postventa
- [ ] definir roles de admin

---

## 21. Recomendacion final
No conviene rehacer toda la web desde cero si la base visual ya funciona. Lo correcto es:

- conservar la confianza visual actual
- rediseñar arquitectura y dominio
- separar frontend y backend
- profesionalizar tienda y admin
- volver reusable el sistema de componentes
- centralizar imagenes y transformarlas a AVIF
- desplegar por fases con minimo riesgo

Este plan esta diseñado para que un equipo humano o agentes IA puedan ejecutarlo por etapas, con contexto claro, entregables definidos y bajo riesgo de desorden arquitectonico.


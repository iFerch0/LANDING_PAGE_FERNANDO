# CLAUDE.md — Landing Page Fernando

## Skill activa siempre
Usa siempre la skill `frontend-design` para cualquier tarea de UI/frontend en este proyecto.
Invócala con el Skill tool antes de generar código de componentes, páginas, estilos o layouts.

## Proyecto
Landing page personal de Fernando Técnico — portafolio y servicios de desarrollo web.

## Stack técnico
- **Framework**: Next.js 15 (App Router)
- **UI**: React 19 + TypeScript
- **Estilos**: CSS Modules (`src/styles/`) + `globals.css`
- **Animaciones**: AOS (Animate On Scroll)
- **Backend/DB**: Supabase
- **Testing**: Jest + React Testing Library
- **Linting**: ESLint + Prettier + Husky + lint-staged

## Estructura clave
```
src/
  app/          — rutas Next.js (App Router)
  components/   — componentes React reutilizables
  styles/       — CSS Modules por componente
  data/         — datos estáticos
  types/        — tipos TypeScript
```

## Convenciones
- CSS Modules para estilos por componente (evitar inline styles)
- Animaciones con transformaciones CSS puras (GPU-friendly)
- Imágenes optimizadas con Next.js Image + sharp
- Commits semánticos: feat/fix/perf/seo/refactor

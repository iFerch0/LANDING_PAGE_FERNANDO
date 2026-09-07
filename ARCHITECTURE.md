# Project Architecture

This document explains the key technical decisions made in this project.

## Why CSS Modules instead of Tailwind?

**Decision**: Use CSS Modules with centralized design tokens.

**Reasons**:
- Full control over generated CSS (not utility-first)
- Better performance (smaller, more specific CSS)
- Easier complex animations and hover/focus states
- Consistency with design tokens (CSS variables)
- No additional build step required

**Trade-offs**:
- More CSS files to maintain
- Slower development speed compared to utility-first
- Requires discipline for naming conventions

**Alternatives considered**:
- **Tailwind CSS**: rejected for preference of control and performance
- **Styled-components**: rejected for runtime overhead
- **Sass**: rejected for unnecessary complexity

## Why App Router instead of Pages Router?

**Decision**: Use Next.js 15 App Router.

**Reasons**:
- Server Components by default (better performance)
- Nested layouts and streaming
- Better data handling (server-side fetch)
- Future-proof (Next.js investment direction)

**Trade-offs**:
- Steeper learning curve
- Fewer examples/tutorials available
- Some patterns change (e.g. `getServerSideProps` → fetch in Server Component)

## Component Patterns

### Container-Presentational

- **Container**: manages state and logic (e.g. `useContactForm`)
- **Presentational**: renders UI only (e.g. `ContactFormStep0`, `ContactFormStep1`, `ContactFormStep2`)

**Example**:

```tsx
// Container
export default function ContactForm() {
  const { step, formData, errors, handleChange, handleBlur, nextStep, prevStep, handleSubmit } = useContactForm();
  return <Step0 formData={formData} errors={errors} onChange={handleChange} ... />;
}

// Presentational
export default function ContactFormStep0({ formData, errors, onChange, onBlur, onNext, active }) {
  return <input value={formData.name} onChange={onChange} />;
}
```

### Custom Hooks

Reusable logic extracted to hooks:
- `useContactForm`: form state and validation (`src/components/ContactForm/useContactForm.ts`)

**Benefits**:
- Separation of concerns
- Testability (hooks can be tested independently)
- Reusability

## Data Structure

Static data lives in `src/data/` (Single Source of Truth):
- `contact.ts`: contact info (email, phone, WhatsApp links)
- `servicesCompact.ts`: services list
- `testimonials.ts`: client testimonials configuration
- `heroSlides.ts`: hero slider images
- `formOptions.ts`: form select options (services, devices, urgency)
- `about.ts`: about section content & specialties
- `footer.ts`: footer schedule and business hours
- `portfolio.ts`: PC builds and maintenance portfolio
- `webServices.ts`: web development services

**Reasons**:
- Easy to edit without touching components
- Centralizes business information
- Typed with TypeScript

## Testing Strategy

**Tools**: Jest + React Testing Library

**What to test**:
- Form validation (required fields, formats)
- User flows (multi-step, navigation)
- Interactions (click, keyboard, scroll)
- Edge cases (empty states, error states)

**What NOT to test**:
- Internal implementation details
- Snapshots (fragile, give false security)
- Third-party components (they have their own tests)

**Target coverage**: 70% statements

## Performance Optimizations

### Images

- `next/image` with modern formats (WebP, AVIF)
- `priority` on above-the-fold images
- Automatic lazy loading for the rest
- Next.js built-in image optimization

### CSS

- Centralized design tokens (CSS variables)
- CSS Modules (scoped, no global leakage)
- Typography system in `src/styles/typography.css`
- Brand styles in `src/styles/brand.css`
- Keyframe animations in `src/styles/animations.css`

### JavaScript

- Automatic code splitting per route
- Tree shaking (eliminates unused code)
- `optimizePackageImports` for `web-vitals` (`next.config.ts`)

### Animations

- Only `transform` and `opacity` (GPU-accelerated)
- Zero-dependency IntersectionObserver (`RevealOnScroll`)
- CSS transitions for hover/focus states

## Security

### Headers

Configured in `next.config.ts`:
- `X-Frame-Options: SAMEORIGIN` — prevents clickjacking
- `X-Content-Type-Options: nosniff` — prevents MIME sniffing
- `X-XSS-Protection: 1; mode=block` — XSS filter
- `Referrer-Policy: origin-when-cross-origin` — controls referrer info
- `X-DNS-Prefetch-Control: on` — DNS prefetching

### SVG Handling

- `dangerouslyAllowSVG: true` with strict CSP: `default-src 'self'; script-src 'none'; sandbox;`
- Prevents XSS through SVG injection

### Environment Variables

- Secrets in `.env.local` (never committed)
- `.env.example` documents required variables
- `NEXT_PUBLIC_` prefix only for public variables

### Dependencies

- `poweredByHeader: false` — hides Next.js version header
- Lock file committed (reproducibility)

## Redirects & Rewrites

Configured in `next.config.ts`:
- `ferchotecnico.com` → `www.ferchotecnico.com` (permanent redirect)
- Legacy routes (`/servicios/*`, `/blog/*`, `/areas-servicio/*`) → `/`
- `/cotizaciones/*` → external quotation app (rewrite)

## Structured Data

JSON-LD schemas for SEO:
- `LocalBusinessSchema.tsx` — local business info
- `OrganizationSchema.tsx` — organization metadata

## Analytics & Monitoring

- `WebVitalsReporter.tsx` — Core Web Vitals telemetry
- `GoogleAnalytics.tsx` — analytics integration

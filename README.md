# Landing Page Fernando

Personal landing page for Fernando — IT support services portfolio. Built with Next.js 15, React 19, and TypeScript. Features a multi-step contact form with WhatsApp integration, hero slider, services grid, testimonials, and SEO-optimized single-page layout.

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI**: React 19 + TypeScript
- **Styles**: CSS Modules + Design Tokens
- **Animations**: AOS (Animate On Scroll)
- **Backend**: Supabase
- **Testing**: Jest + React Testing Library
- **Linting**: ESLint + Prettier + Husky

## 📋 Prerequisites

- Node.js 18+ (recommended: latest LTS)
- Package manager: npm, yarn, pnpm, or bun

## 🛠️ Setup

### 1. Clone the repository

```bash
git clone <repo-url>
cd LANDING_PAGE_FERNANDO
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

Required variables:

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics ID (e.g. `G-XXXXXXXXXX`) | Yes |

### 4. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build |
| `npm run build:full` | Full build (optimize images + update colors + generate images + build) |
| `npm start` | Production server |
| `npm test` | Run tests |
| `npm run test:watch` | Tests in watch mode |
| `npm run test:coverage` | Tests with coverage report |
| `npm run lint` | Run ESLint |
| `npm run format` | Format with Prettier |
| `npm run optimize:images` | Optimize images with sharp |
| `npm run update:colors` | Update color tokens |
| `npm run generate:images` | Generate image variants |

## 📁 Project Structure

```
src/
├── app/                  # Next.js routes (App Router)
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Main page
│   ├── not-found.tsx     # 404 page
│   ├── globals.css       # Global styles + tokens
│   ├── ClientLayout.tsx  # Client-side layout wrapper
│   ├── sitemap.ts        # Sitemap generation
│   └── api/              # API routes
├── components/           # React components
│   ├── ContactForm/      # Multi-step contact form
│   │   ├── index.tsx     # Form container
│   │   ├── useContactForm.ts  # Form logic hook
│   │   ├── ContactFormStep0.tsx
│   │   ├── ContactFormStep1.tsx
│   │   └── ContactFormStep2.tsx
│   ├── Navbar.tsx        # Main navigation
│   ├── Hero.tsx          # Hero section
│   ├── HeroSliderStatic.tsx  # Image slider
│   ├── ServicesGrid.tsx  # Services grid
│   ├── Testimonials.tsx  # Testimonials carousel
│   ├── AboutFernando.tsx # About section
│   ├── WebDevServices.tsx # Web dev services
│   ├── Footer.tsx        # Footer
│   ├── Icons.tsx         # Reusable SVG icons
│   ├── ErrorBoundary.tsx # Error boundary
│   ├── GoogleAnalytics.tsx
│   ├── PWAInstaller.tsx  # PWA install prompt
│   ├── WebVitalsReporter.tsx
│   ├── LocalBusinessSchema.tsx  # Structured data
│   ├── OrganizationSchema.tsx
│   └── TechnicalServiceSchema.tsx
├── data/                 # Static data
│   ├── contact.ts        # Contact info
│   ├── servicesCompact.ts # Services list
│   ├── testimonials.ts   # Client testimonials
│   ├── heroSlides.ts     # Slider images
│   ├── formOptions.ts    # Form select options
│   ├── about.ts          # About section data
│   ├── faq.ts            # FAQ data
│   ├── footer.ts         # Footer data
│   ├── stats.ts          # Statistics
│   └── webServices.ts    # Web dev services data
├── styles/               # CSS + tokens
│   ├── tokens.css        # Design tokens (colors, spacing)
│   ├── typography.css    # Typography scales
│   ├── brand.css         # Brand-specific styles
│   └── utilities.css     # Utility classes
└── types/                # TypeScript types
    └── forms.ts          # Form types
```

## 🎨 Style Architecture

### CSS Modules

The project uses CSS Modules for component-scoped styles. Each visual component has its own `.module.css` file.

**Conventions**:
- Class names in camelCase: `.heroSection`, `.statCard`
- Import: `import styles from './Component.module.css'`
- Usage: `className={styles.heroSection}`

### Design Tokens

Tokens are centralized in `src/styles/tokens.css`:
- Colors: `--color-teal-500`, `--color-orange-600`
- Spacing: `--space-4`, `--space-16`
- Border radius: `--radius-md`, `--radius-full`
- Shadows: `--shadow-primary`

**Usage**:

```css
.button {
  background: var(--color-teal-500);
  padding: var(--space-4);
  border-radius: var(--radius-md);
}
```

## 🧪 Testing

The project uses Jest + React Testing Library. Tests are in `src/components/__tests__/`.

```bash
npm test              # Watch mode
npm run test:coverage # With coverage
```

**Target coverage**: 70% (configured in `jest.config.js`)

## 🔒 Environment Variables

See `.env.example` for the full list. Main variables:

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics ID | Yes |

## 🚢 Deploy

The project is configured for Vercel deployment.

### Production build

```bash
npm run build
npm start
```

### Automatic optimizations

- Images: Next.js Image (WebP, AVIF)
- Code splitting: automatic per route
- CSS: purged in production
- Fonts: optimized with `next/font`

## 📝 Code Conventions

### TypeScript

- Strict mode enabled
- Zero `any` usage
- Explicit types for props and state

### Components

- Functional components with hooks
- Props typed with interfaces
- Custom hooks for reusable logic

### Commits

Conventional commits:

- `feat:` new feature
- `fix:` bug fix
- `perf:` performance improvement
- `refactor:` refactoring
- `docs:` documentation changes
- `test:` add/change tests

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👤 Author

Fernando — [Website](https://www.ferchotecnico.com) | [GitHub](https://github.com/)

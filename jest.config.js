const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  // Mapeo de alias @/* para jest.mock() — SWC ya lo maneja para imports normales
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    // Utils puros (100% testeable sin deps externas)
    'src/lib/utils/**/*.{ts,tsx}',
    // Store de Zustand (lógica de negocio del carrito)
    'src/store/**/*.{ts,tsx}',
    // Componentes con tests existentes
    'src/components/cart/CheckoutModal.tsx',
    'src/components/cart/CartDrawer.tsx',
    'src/components/tienda/ProductCard.tsx',
    'src/components/Navbar.tsx',
    'src/components/ServicesGrid.tsx',
    'src/components/ContactForm.tsx',
    'src/components/Footer.tsx',
    'src/components/Hero.tsx',
    'src/components/Features.tsx',
    // Excluir archivos de solo tipos
    '!src/**/*.d.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 65, // Navbar es un God Component (~50% branches) — sube a 70% en Fase 5
      functions: 70,
      lines: 75,
      statements: 75,
    },
  },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);

import '@testing-library/jest-dom'

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '/',
      query: {},
      asPath: '/',
      push: jest.fn(),
      pop: jest.fn(),
      reload: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn().mockResolvedValue(undefined),
      beforePopState: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
    }
  },
}))

// Mock Next.js Image component
/* eslint-disable @next/next/no-img-element, jsx-a11y/alt-text */
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    // In tests we return a plain <img> for simplicity; lint warnings are suppressed above.
    return <img {...props} />
  },
}))
/* eslint-enable @next/next/no-img-element, jsx-a11y/alt-text */

// Mock AOS
jest.mock('aos', () => ({
  init: jest.fn(),
  refresh: jest.fn(),
  refreshHard: jest.fn(),
}))

// Mock window.gtag for analytics
Object.defineProperty(window, 'gtag', {
  writable: true,
  value: jest.fn(),
})

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
}

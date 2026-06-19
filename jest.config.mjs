import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  // Le indica a Next.js dónde está la app para cargar el next.config.js y los .env
  dir: './',
})

// Configuración personalizada de Jest
const config = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
}

export default createJestConfig(config)
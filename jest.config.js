// import type { Config } from 'jest'

module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '<rootDir>/src/**/**',
    '!<rootDir>/src/main/**'
  ],
  collectCoverage: true,
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  coveragePathIgnorePatterns: [
    '/node_modules/',
    'src/presentation/controllers/singnup/singup-protocols.ts',
    '.*-protocols\\.ts$',
    'src/presentation/protocols/.*'
  ],
  preset: '@shelf/jest-mongodb',
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1'
  }
}

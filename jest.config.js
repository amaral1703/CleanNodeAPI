// import type { Config } from 'jest'

module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts'
  ],
  collectCoverage: true,
  // coverageDirectory: "coverage",
  // coverageProvider: "v8",
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  coveragePathIgnorePatterns: [
    '/node_modules/',
    'src/presentation/controllers/singnup/singup-protocols.ts',
    '.*-protocols\\.ts$',
    'src/presentation/protocols/.*'
  ],
  preset: '@shelf/jest-mongodb'
}

// export default config;

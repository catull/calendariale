export default {
  collectCoverageFrom: [
    'src/**/*.ts',
    'src/spec/**/*.ts',
    '!src/create-dist-package.json.ts',
    '!src/**/index.ts',
    '!src/jest*.ts',
    '!**/node_modules/**',
  ],
  coverageDirectory: 'tmp/coverage',
  coverageReporters: [
    'clover',
    'cobertura',
    'html',
    'json',
    'lcov',
    'text',
  ],
  globals: {
  },
  moduleDirectories: [
    'dist',
    'node_modules',
    'src',
  ],
  moduleFileExtensions: [
    'js',
    'ts',
  ],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  // outputName: 'tmp/reports/junit.xml',
  preset: 'ts-jest',
  // prettierPath: './node_modules/.bin/prettier',
  reporters: [
    'default',
    'jest-junit',
  ],
  roots: [
    'src',
  ],
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    url: 'http://localhost',
  },
  testMatch: [
    '<rootDir>/src/**/*.spec.ts',
  ],
  testResultsProcessor: 'jest-sonar-reporter',
  transform: {
    // MUST be empty!
  },
  verbose: false,
}


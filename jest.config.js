module.exports = {
  collectCoverageFrom: [
    'src/**/*.ts',
    'src/spec/**/*.ts',
    '!src/create-dist-package.json.ts',
    '!src/**/index.ts',
    '!src/jest*.ts',
    '!**/node_modules/**'
  ],
  coverageDirectory: 'tmp/coverage',
  coverageReporters: [
    'json',
    'lcov',
    'text',
    'clover',
    'cobertura',
    'html'
  ],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json'
    }
  },
  moduleDirectories: [
    'node_modules',
    'src'
  ],
  moduleFileExtensions: [
    'js',
    'ts',
  ],
  // outputName: 'tmp/reports/junit.xml',
  preset: 'ts-jest',
  prettierPath: './node_modules/.bin/prettier',
  reporters: [
    'default',
    'jest-junit'
  ],
  roots: [
    'src'
  ],
  testEnvironment: 'jest-environment-jsdom-thirteen',
  testMatch: [
    '<rootDir>/src/**/*.spec.ts'
  ],
  testResultsProcessor: 'jest-sonar-reporter',
  testURL: 'http://localhost',
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  verbose: false
};

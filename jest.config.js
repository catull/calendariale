module.exports = {
  collectCoverageFrom: [
    "src/**/*.ts",
    "src/spec/**/*.ts",
    "!src/create-dist-package.json.ts",
    "!src/**/index.ts",
    "!src/jest*.ts",
    "!**/node_modules/**"
  ],
  coverageDirectory: "tmp/coverage",
  coverageReporters: [
    "json",
    "lcov",
    "text",
    "clover",
    "cobertura",
    "html"
  ],
  globals: {
    'ts-jest': {
      tsConfig: "tsconfig.json"
    }
  },
  moduleDirectories: [
    "node_modules",
    "src"
  ],
  moduleFileExtensions: [
    "ts",
    "js"
  ],
  preset: "ts-jest",
  prettierPath: "node_modules/.bin/prettier",
  reporters: [
    "default",
    "jest-junit"
  ],
  roots: [
    "src"
  ],
  testMatch: [
    "<rootDir>/src/**/*.spec.ts"
  ],
  testResultsProcessor: "jest-sonar-reporter",
  testURL: "http://localhost",
  transform: {
    '^.+\\.ts$': "ts-jest"
  },
  verbose: false
};

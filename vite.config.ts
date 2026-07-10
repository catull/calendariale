import { resolve } from "node:path";

import { defineConfig } from "vite-plus";

export default defineConfig({
  build: {
    chunkImportMap: true,
    lib: {
      entry: resolve(import.meta.dirname, "src/index.ts"), //["src/index.ts"],
      fileName: "index",
      formats: ["cjs", "es"],
      name: "calendariale",
    },
    license: true,
    manifest: true,
    minify: "oxc",
    outDir: "dist",
    sourcemap: true,
  },
  fmt: {
    arrowParens: "always",
    bracketSameLine: true,
    bracketSpacing: true,
    semi: true,
    singleQuote: false,
    sortImports: false,
    sortPackageJson: true,
    trailingComma: "all",
  },
  lint: {
    ignorePatterns: ["dist/**"],
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
  pack: {
    dts: {
      tsgo: true,
    },
    exports: true,
    format: ["esm", "module"],
    sourcemap: true,
  },
  run: {
    tasks: {
      build: ["vp run barro", "vp build"],
      check: ["vp run lint:check", "vp run build:check", "vp run format:check"],
      pack: ["vp run build:dev"],
    },
  },
  staged: {
    "*": "vp check --fix",
  },
  test: {
    coverage: {
      provider: "v8",
      enabled: true,
      clean: true,
      include: ["src/**/*.ts"],
      exclude: ["src/**/index.ts"],
      reporter: ["clover", "cobertura", "html", "json", "lcov", "teamcity", "text"],
      reportsDirectory: "coverage",
    },
  },
});

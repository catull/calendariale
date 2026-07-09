import { resolve } from "node:path";
import { defineConfig } from "vite-plus";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(import.meta.dirname, "src/index.ts"),
      name: "calendariale",
      fileName: "index",
      formats: ["cjs"],
    },
  },
  fmt: {
    arrowParens: "always",
    bracketSameLine: true,
    bracketSpacing: true,
    singleQuote: false,
    trailingComma: "all",
  },
  lint: {
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
  },
  staged: {
    "*": "vp check --fix",
  },
});

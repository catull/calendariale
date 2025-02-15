import { defineConfig } from "tsup";

export default defineConfig ({
  clean: true,
  dts: true,
  entryPoints: ["src/index.ts"],
  format: ["esm"],
  include: [
    "src/Const.ts",
    "src/Astro.ts",
    "src/Location.ts",
    "src/calendar/core/*.ts",
    "src/calendar/*.ts"
  ],
  incremental: false,
  outDir: "dist",
  splitting: false,
  sourcemap: true,
  target: "esnext",
  treeshake: true,
});


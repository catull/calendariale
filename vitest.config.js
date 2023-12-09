import { mergeConfig } from 'vite';
import { defineConfig } from 'vitest/config';

export default mergeConfig(
    defineConfig({
        test: {
            globals: true,
            environment: 'happy-dom',
            exclude: [
                '.barro.config.cjs',
                'node_modules/**',
                '**/tests/e2e/**',
                'src/create-dist-package.json.js',
                'src/**/index.ts',
            ],
            coverage: {
                provider: 'v8',
                reporter: [
                    'clover',
                    'cobertura',
                    'html',
                    'json',
                    'text',
                ],
                exclude: [
                    '.barro.config.cjs',
                    'node_modules/**',
                    '**/tests/e2e/**',
                    'src/create-dist-package.json.js',
                    'src/**/index.ts',
                ],
                reportsDirectory: 'tmp/reports',
                branches: 99.9,
                functions: 100,
                lines: 100,
                statements: 100,
            },
        },
    }),
);

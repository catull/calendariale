import { mergeConfig } from 'vite';
import { defineConfig } from 'vitest/config';

export default mergeConfig(
    defineConfig({
        test: {
            globals: true,
            environment: 'happy-dom',
            include: [
                'src/spec/**/*.test.ts',
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
                    'src/spec/**',
                    'src/**/index.ts',
                ],
                include: [
                    'src/**/*.ts',
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

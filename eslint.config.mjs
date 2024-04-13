import path from 'path';
import { fileURLToPath } from 'url';

import { FlatCompat } from '@eslint/eslintrc';
import pluginJs from '@eslint/js';
import eslint from '@eslint/js';

import globals from 'globals';

//import tseslintInternalPlugin from '@typescript-eslint/eslint-plugin-internal';
import deprecationPlugin from 'eslint-plugin-deprecation';
import eslintCommentsPlugin from 'eslint-plugin-eslint-comments';
import eslintPluginPlugin from 'eslint-plugin-eslint-plugin';
import importPlugin from 'eslint-plugin-import';
import jsdocPlugin from 'eslint-plugin-jsdoc';
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort';
import tseslint from 'typescript-eslint';
import unicornPlugin from 'eslint-plugin-unicorn';

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: pluginJs.configs.recommended
});

export default tseslint.config(
  // register all of the plugins up-front
  {
    // note - intentionally uses computed syntax to make it easy to sort the keys
    plugins: {
      ['@typescript-eslint']: tseslint.plugin,
      //['@typescript-eslint/internal']: tseslintInternalPlugin,
      ['deprecation']: deprecationPlugin,
      ['eslint-comments']: eslintCommentsPlugin,
      ['eslint-plugin']: eslintPluginPlugin,
      ['import']: importPlugin,
      ['jsdoc']: jsdocPlugin,
      ['simple-import-sort']: simpleImportSortPlugin,
      ['unicorn']: unicornPlugin,
    },
  },

   // base config
   {
    languageOptions: {
      globals: {
        ...globals.es2021,
        ...globals.node,
      },
      parserOptions: {
        allowAutomaticSingleRunInference: true,
        cacheLifetime: {
          // we pretty well never create/change tsconfig structure - so no need to ever evict the cache
          // in the rare case that we do - just need to manually restart their IDE.
          glob: 'Infinity',
        },
        project: [
          'tsconfig.json',
        ],
        tsconfigRootDir: __dirname,
        warnOnUnsupportedTypeScriptVersion: false,
      },
    },
  },

  // extends ...
  eslint.configs.recommended,
  jsdocPlugin.configs['flat/recommended-typescript-error'],

  //...compat.extends('love'),
  ...tseslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  tseslint.configs.disableTypeChecked,

  {
    files: [
      'src/*.ts',
      'src/calendar/**/*.ts',
    ],
    ignores: [
      'dist/**',
      'node_modules/**',
      'src/spec/**/*.test.ts',
      'src/**/index.ts',
      'tmp/**',
    ],
    rules: {
      '@typescript-eslint/no-extraneous-class': 'off',
    },
  },
);

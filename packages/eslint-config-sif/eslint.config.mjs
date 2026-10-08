import pluginJs from '@eslint/js';
import vitest from '@vitest/eslint-plugin';
import eslintConfigPrettier from 'eslint-config-prettier';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import pluginReact from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const OFF = 0;
const WARNING = 1;
const ERROR = 2;

export default [
    {
        ignores: [
            '**/node_modules/**',
            '**/dist/**',
            '**/build/**',
            '**/.*/**',
            '**/coverage/**',
            '**/public/**',
            '**/out/**',
            '**/*.min.js',
            '**/*.bundle.js',
            '**/storybook/**',
            '**/storybook-static/**',
            '**/next-env.d.ts',
            '**/next.config.ts',
            '**/packages/**/*/lib',
        ],
    },
    {
        files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
        settings: {
            react: {
                // Eksplisitt versjon: 'detect' krever context.getFilename(), som er fjernet i ESLint 10
                version: '19.3',
            },
        },
        plugins: {
            vitest,
            'react-hooks': reactHooks,
            'simple-import-sort': simpleImportSort,
        },
        languageOptions: { globals: globals.browser },
    },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    { ...pluginReact.configs.flat.recommended, files: ['**/*.{jsx,tsx}'] },
    { ...jsxA11y.flatConfigs.recommended, files: ['**/*.{jsx,tsx}'] },
    eslintConfigPrettier,
    {
        files: ['**/*.{test,spec}.{ts,tsx}'],
        rules: vitest.configs.recommended.rules,
    },
    {
        rules: {
            'max-len': [ERROR, 300],
            'no-console': WARNING,
            'no-debugger': WARNING,
            'no-duplicate-imports': ERROR,
            'no-shadow': OFF,
            'no-unused-vars': OFF,
            'no-use-before-define': OFF,

            'simple-import-sort/exports': ERROR,
            'simple-import-sort/imports': ERROR,

            'react-hooks/rules-of-hooks': ERROR,

            '@typescript-eslint/array-type': [ERROR, { default: 'array-simple' }],
            '@typescript-eslint/ban-ts-comment': OFF,
            '@typescript-eslint/no-explicit-any': OFF,
            '@typescript-eslint/no-shadow': ERROR,
            '@typescript-eslint/no-unused-vars': ERROR,
            '@typescript-eslint/no-use-before-define': OFF,
        },
    },
    {
        files: ['**/*.{ts,tsx}'],
        ignores: [
            '**/*.test.ts',
            '**/*.test.tsx',
            '**/*.spec.ts',
            '**/*.spec.tsx',
            '**/*.stories.ts',
            '**/*.stories.tsx',
            '**/__tests__/**',
        ],
        languageOptions: {
            parserOptions: {
                projectService: true,
            },
        },
        rules: {
            '@typescript-eslint/switch-exhaustiveness-check': [ERROR, { considerDefaultExhaustiveForUnions: true }],
        },
    },
    {
        files: ['**/*.{jsx,tsx}'],
        rules: {
            'jsx-a11y/no-autofocus': WARNING,
            'react/display-name': OFF,
            'react/prop-types': OFF,
            'react/react-in-jsx-scope': OFF,
            'react/function-component-definition': OFF,
            'react/jsx-curly-brace-presence': [ERROR, { props: 'never', children: 'never' }],
        },
    },
];

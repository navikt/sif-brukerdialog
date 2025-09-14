import pluginJs from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import pluginReact from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import vitest from 'eslint-plugin-vitest';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const OFF = 0;
const WARNING = 1;
const ERROR = 2;

export default [
    {
        files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
        ignores: [
            '**/node_modules/**',
            '**/dist/**',
            '**/build/**',
            '**/.*/**',
            '**/coverage/**',
            '**/public/**',
            '**/.next/**',
            '**/out/**',
            '**/*.min.js',
            '**/*.bundle.js',
            '**/*.log',
            '**/*.tsbuildinfo',
            '**/storybook-static/**',
            '**/.turbo/**',
            '**/.vscode/**',
            '**/.idea/**',
            '**/.sanity/**',
            '**/.scannerwork/**',
            '**/*.local',
            '**/.env',
            '**/.cache',
            '**/*.zip',
            '**/index-decorated.html',
            '**/public/dist/**',
            '**/server/dist/**',
            '**/packages/**/*/coverage',
            '**/packages/**/*/lib',
        ],
        settings: {
            react: {
                version: 'detect',
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
    pluginReact.configs.flat.recommended,
    jsxA11y.flatConfigs.recommended,
    eslintConfigPrettier,
    {
        rules: {
            ...vitest.configs.recommended.rules,

            'max-len': [ERROR, 300],
            'no-console': WARNING,
            'no-debugger': WARNING,
            'no-duplicate-imports': ERROR,
            'no-shadow': OFF,
            'no-unused-vars': OFF,
            'no-use-before-define': OFF, // Note: you must disable the base rule as it can report incorrect errors

            'jsx-a11y/no-autofocus': WARNING,
            'jsx-quotes': ['error', 'prefer-double'],

            'react-hooks/rules-of-hooks': 'error',
            'react/display-name': OFF,
            'react/prop-types': OFF,
            'react/react-in-jsx-scope': OFF,
            'react/function-component-definition': [
                OFF,
                {
                    namedComponents: 'arrow-function',
                    unnamedComponents: 'arrow-function',
                },
            ],
            'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],

            'simple-import-sort/exports': ERROR,
            'simple-import-sort/imports': ERROR,

            '@typescript-eslint/array-type': [ERROR, { default: 'array-simple' }],
            '@typescript-eslint/ban-ts-comment': OFF,
            '@typescript-eslint/no-explicit-any': OFF,
            '@typescript-eslint/no-shadow': [ERROR],
            '@typescript-eslint/no-unused-vars': [ERROR],
            '@typescript-eslint/no-use-before-define': [OFF],
            '@typescript-eslint/no-unused-expressions': [
                'error', // Fix for TypeScript ESLint no-unused-expressions rule
                {
                    allowShortCircuit: false,
                    allowTernary: false,
                    allowTaggedTemplates: false,
                    enforceForJSX: false,
                },
            ],
        },
    },
];

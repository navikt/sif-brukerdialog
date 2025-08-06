import pluginNext from '@next/eslint-plugin-next';
import pluginReact from 'eslint-plugin-react';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

export default [
    {
        files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
            parser: tseslint.parser,
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
                ecmaVersion: 'latest',
                sourceType: 'module',
            },
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
        plugins: {
            '@next/next': pluginNext,
            react: pluginReact,
            '@typescript-eslint': tseslint.plugin,
            'jsx-a11y': jsxA11y,
            'react-hooks': reactHooks,
        },
        rules: {
            ...pluginNext.configs.recommended.rules,
            ...pluginReact.configs.recommended.rules,
            ...tseslint.configs.recommended.rules,
            ...jsxA11y.flatConfigs.recommended.rules,
            '@typescript-eslint/explicit-function-return-type': 0,
            '@typescript-eslint/explicit-module-boundary-types': 0,
            '@typescript-eslint/ban-ts-ignore': 'off',
            '@typescript-eslint/no-var-requires': 0,
            '@typescript-eslint/no-explicit-any': 0,
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',
            'react/react-in-jsx-scope': 0,
            'react/jsx-uses-react': 0,
            'react/prop-types': 0,
            'no-console': 'error',
        },
    },
    eslintConfigPrettier,
    {
        ignores: ['node_modules/**', 'dist/**', 'lib/**', '.turbo/**'],
    },
];

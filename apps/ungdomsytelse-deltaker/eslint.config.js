import pluginJs from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import pluginReact from 'eslint-plugin-react';
// import vitest from 'eslint-plugin-vitest';
import globals from 'globals';
import tseslint from 'typescript-eslint';
// import reactHooks from 'eslint-plugin-react-hooks';

const OFF = 0;
const WARNING = 1;
const ERROR = 2;

export default [
    {
        files: ['**/*.{js,mjs,js,ts,jsx,tsx}'],
        settings: {
            react: {
                version: 'detect',
            },
        },
        plugins: {
            // vitest,
            // 'react-hooks': reactHooks,
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
            // ...vitest.configs.recommended.rules,
            'max-len': [ERROR, 300],
            'no-console': WARNING,
            'no-debugger': WARNING,
            'react/prop-types': OFF,
            'jsx-a11y/no-autofocus': OFF,
            'react/react-in-jsx-scope': OFF,
            'react/display-name': OFF,

            // Note: you must disable the base rule as it can report incorrect errors
            'no-use-before-define': OFF,
            'no-shadow': OFF,
            '@typescript-eslint/no-shadow': [ERROR],
            'no-unused-vars': OFF,
            '@typescript-eslint/no-unused-vars': [ERROR],
            'no-duplicate-imports': ERROR,
            '@typescript-eslint/array-type': [ERROR, { default: 'array-simple' }],
            // 'react-hooks/rules-of-hooks': 'error',

            // TODO Bør ein ha med desse to?
            'react/function-component-definition': [
                OFF,
                {
                    namedComponents: 'arrow-function',
                    unnamedComponents: 'arrow-function',
                },
            ],
            // 'no-use-before-define': OFF,
            '@typescript-eslint/no-use-before-define': [OFF],

            // TODO (TOR) Ignorert inntil videre grunnet kost/nytte
            '@typescript-eslint/no-explicit-any': OFF,
            '@typescript-eslint/ban-ts-comment': OFF,

            'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
            'jsx-quotes': ['error', 'prefer-double'],
        },
    },
];

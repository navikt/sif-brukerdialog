import commonConfig from '@sif/eslint-config';

export default [
    ...commonConfig,
    {
        languageOptions: {
            parserOptions: {
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
    {
        // Legacy: fjern når appen er migrert til v2
        rules: { '@typescript-eslint/switch-exhaustiveness-check': 'off' },
    },
];

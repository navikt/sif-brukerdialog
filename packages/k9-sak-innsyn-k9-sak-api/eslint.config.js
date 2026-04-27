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
        files: ['**/*.gen.ts', '**/index.ts'],
        rules: {
            'max-len': 'off',
            'no-duplicate-imports': 'off',
            '@typescript-eslint/no-shadow': 'off',
        },
    },
];

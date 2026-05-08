import commonConfig from '@sif/eslint-config';

export default [
    ...commonConfig,
    {
        languageOptions: {
            parserOptions: {
                tsconfigRootDir: import.meta.dirname,
            },
        },
        rules: {
            'max-len': 'off',
            'no-duplicate-imports': 'off',
            '@typescript-eslint/no-shadow': 'off',
        },
    },
];

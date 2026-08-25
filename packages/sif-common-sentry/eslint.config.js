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
];

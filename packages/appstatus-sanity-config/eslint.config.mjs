import commonConfig from '@sif/eslint-config';

export default [
    { ignores: ['dist/**', '.sanity/**'] },
    ...commonConfig,
    {
        languageOptions: {
            parserOptions: {
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
];

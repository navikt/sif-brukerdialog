import commonConfig from '@sif/eslint-config';
import { restrictLegacyImports } from '@sif/eslint-config/legacy-imports';

export default [
    ...commonConfig,
    restrictLegacyImports(['@sif/hooks']),
    {
        languageOptions: {
            parserOptions: {
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
];

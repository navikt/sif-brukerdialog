import commonConfig from '@sif/eslint-config';
import { restrictLegacyImports } from '@sif/eslint-config/legacy-imports';

export default [
    ...commonConfig,
    restrictLegacyImports(['@navikt/sif-common-hooks']),
    {
        languageOptions: {
            parserOptions: {
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
];

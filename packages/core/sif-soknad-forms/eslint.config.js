import commonConfig from '@sif/eslint-config';
import { restrictLegacyImports } from '@sif/eslint-config/legacy-imports';

export default [
    ...commonConfig,
    restrictLegacyImports(['@navikt/sif-common-ui']),
    {
        languageOptions: {
            parserOptions: {
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
];

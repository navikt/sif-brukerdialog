/**
 * Hindrer at v2-pakker (packages/core) importerer v1-pakker (packages/legacy) eller Formik.
 * `allowed` er kjente avhengigheter som ennå ikke er migrert. Listen skal krympe over tid.
 */
export const restrictLegacyImports = (allowed = []) => ({
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    rules: {
        'no-restricted-imports': [
            'error',
            {
                patterns: [
                    {
                        group: ['@navikt/sif-common-*', ...allowed.map((name) => `!${name}`)],
                        message: 'v2-pakker skal ikke bruke v1-pakker (packages/legacy).',
                    },
                    {
                        group: ['formik'],
                        message: 'v2-pakker bruker @sif/rhf, ikke Formik.',
                    },
                ],
            },
        ],
    },
});

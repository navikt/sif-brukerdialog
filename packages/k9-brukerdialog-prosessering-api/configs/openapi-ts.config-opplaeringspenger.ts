import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
    input: 'https://k9-brukerdialog-prosessering.intern.dev.nav.no/v3/api-docs/opplaeringspenger',
    output: {
        format: 'prettier',
        lint: 'eslint',
        path: './src/generated/opplaeringspenger',
    },
    plugins: [
        {
            name: '@hey-api/typescript',
            enums: 'typescript',
        },
        {
            name: '@hey-api/sdk',
            asClass: true,
            validator: true,
        },
        {
            name: '@hey-api/client-axios',
            throwOnError: true,
            baseUrl: '',
            exportFromIndex: true,
        },
        { name: 'zod', exportFromIndex: true },
    ],
});

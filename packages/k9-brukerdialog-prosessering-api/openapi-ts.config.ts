import { defineConfig } from '@hey-api/openapi-ts';
import { defaultPlugins } from '@hey-api/openapi-ts';

export default defineConfig({
    input: 'https://k9-brukerdialog-prosessering.intern.dev.nav.no/v3/api-docs',
    output: {
        format: 'prettier',
        lint: 'eslint',
        path: './src/client',
    },
    plugins: [
        ...defaultPlugins,
        { name: '@hey-api/client-axios', throwOnError: true },
        'zod',
        { asClass: true, name: '@hey-api/sdk', validator: true },
        {
            enums: 'typescript', // default
            name: '@hey-api/typescript',
        },
    ],
});

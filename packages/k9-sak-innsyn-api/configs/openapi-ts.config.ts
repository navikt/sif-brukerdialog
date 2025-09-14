import { defaultPlugins, defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
    input: 'https://k9-sak-innsyn-api.intern.dev.nav.no/v3/api-docs/k9-sak',
    output: {
        format: 'prettier',
        lint: 'eslint',
        path: './src/generated/client',
    },
    plugins: [
        ...defaultPlugins,
        { name: 'zod', exportFromIndex: true },
        { asClass: true, name: '@hey-api/sdk', validator: true },
        { name: '@hey-api/client-axios', throwOnError: true },
        {
            enums: 'typescript', // default
            name: '@hey-api/typescript',
        },
    ],
});

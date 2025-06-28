import { defineConfig } from '@hey-api/openapi-ts';
import { defaultPlugins } from '@hey-api/openapi-ts';

export default defineConfig({
    input: 'https://ung-deltakelse-opplyser.intern.dev.nav.no/v3/api-docs/deltaker',
    output: {
        format: 'prettier',
        lint: 'eslint',
        path: './src/deltaker/client',
    },
    plugins: [
        ...defaultPlugins,
        'zod',
        { asClass: true, name: '@hey-api/sdk', validator: true },
        { name: '@hey-api/client-axios', throwOnError: true },
        {
            enums: 'typescript', // default
            name: '@hey-api/typescript',
        },
    ],
});

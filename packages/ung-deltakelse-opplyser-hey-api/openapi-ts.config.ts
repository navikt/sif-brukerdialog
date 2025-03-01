import { defineConfig } from '@hey-api/openapi-ts';
import { defaultPlugins } from '@hey-api/openapi-ts';

export default defineConfig({
    input: 'https://ung-deltakelse-opplyser.intern.dev.nav.no/v3/api-docs',
    output: {
        format: 'prettier',
        lint: 'eslint',
        path: './src/client',
    },
    plugins: [
        ...defaultPlugins,
        '@hey-api/client-axios',
        'zod',
        { name: '@hey-api/sdk', validator: true },
        {
            enums: 'typescript+namespace', // default
            name: '@hey-api/typescript',
        },
    ],
});

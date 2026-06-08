import { defineConfig, type UserConfig } from '@hey-api/openapi-ts';

export const createConfig = (): UserConfig => ({
    input: './openapi-spec.json',
    output: {
        postProcess: ['prettier', 'eslint'],
        path: './src/veileder/client',
    },
    plugins: [
        'zod',
        { operations: { strategy: 'byTags' }, name: '@hey-api/sdk', validator: true },
        { name: '@hey-api/client-axios', throwOnError: true },
        {
            enums: 'typescript', // default
            name: '@hey-api/typescript',
        },
    ],
});

export default defineConfig(createConfig());

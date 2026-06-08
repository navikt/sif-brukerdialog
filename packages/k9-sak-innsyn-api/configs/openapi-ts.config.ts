import { defineConfig, type UserConfig } from '@hey-api/openapi-ts';

export const createConfig = (): UserConfig => ({
    input: './specs/k9-sak.json',
    output: {
        postProcess: ['prettier', 'eslint'],
        path: './src/generated/client',
    },
    plugins: [
        { name: 'zod', exportFromIndex: true },
        { operations: { strategy: 'byTags' }, name: '@hey-api/sdk', validator: true },
        { name: '@hey-api/client-axios', throwOnError: true },
        {
            enums: 'typescript', // default
            name: '@hey-api/typescript',
        },
    ],
});

export default defineConfig(createConfig());

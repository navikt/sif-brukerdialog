import { defineConfig, type UserConfig } from '@hey-api/openapi-ts';

export const createConfig = (): UserConfig => ({
    input: './specs/innsyn.json',
    output: {
        postProcess: ['prettier'],
        path: './src/generated/innsyn', // Separat mappe
    },
    plugins: [
        { name: 'zod', exportFromIndex: true },
        { operations: { strategy: 'byTags' }, name: '@hey-api/sdk', validator: true },
        { name: '@hey-api/client-axios', throwOnError: true, baseUrl: '', exportFromIndex: true },
        {
            enums: 'typescript',
            name: '@hey-api/typescript',
        },
    ],
});

export default defineConfig(createConfig());

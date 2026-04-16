import { defaultPlugins, defineConfig, type UserConfig } from '@hey-api/openapi-ts';

export const createConfig = (): UserConfig => ({
    input: './specs/innsyn.json',
    output: {
        format: 'prettier',
        lint: 'eslint',
        path: './src/generated/innsyn', // Separat mappe
    },
    plugins: [
        ...defaultPlugins,
        { name: 'zod', exportFromIndex: true },
        { asClass: true, name: '@hey-api/sdk', validator: true },
        { name: '@hey-api/client-axios', throwOnError: true, baseUrl: '', exportFromIndex: true },
        {
            enums: 'typescript',
            name: '@hey-api/typescript',
        },
    ],
});

export default defineConfig(createConfig());

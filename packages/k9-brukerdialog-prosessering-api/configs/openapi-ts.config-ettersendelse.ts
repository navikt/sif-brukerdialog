import { defineConfig, type UserConfig } from '@hey-api/openapi-ts';

type Env = 'dev' | 'prod';

const getInputUrl = (env: Env): string => {
    const baseUrl = env === 'dev' ? 'intern.dev.nav.no' : 'intern.nav.no';
    return `https://k9-brukerdialog-prosessering.${baseUrl}/v3/api-docs/ettersendelse`;
};

export const createConfig = (env: Env): UserConfig => ({
    input: getInputUrl(env),
    output: {
        format: 'prettier',
        lint: 'eslint',
        path: './src/generated/ettersendelse', // Separat mappe
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

const env = (process.env.CODEGEN_ENV as Env) || 'dev';

export default defineConfig(createConfig(env));

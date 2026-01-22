import { defaultPlugins, defineConfig, type UserConfig } from '@hey-api/openapi-ts';

type Env = 'dev' | 'prod';

const getInputUrl = (env: Env): string => {
    const baseUrl = env === 'dev' ? 'intern.dev.nav.no' : 'intern.nav.no';
    return `https://k9-sak-innsyn-api.${baseUrl}/v3/api-docs/k9-sak`;
};

export const createConfig = (env: Env): UserConfig => ({
    input: getInputUrl(env),
    output: {
        format: 'prettier',
        lint: 'eslint',
        path: './src/generated/k9-sak', // Separat mappe
    },
    plugins: [
        ...defaultPlugins,
        { name: 'zod', exportFromIndex: true },
        { asClass: true, name: '@hey-api/sdk', validator: true },
        { name: '@hey-api/client-axios', throwOnError: true, exportFromIndex: true, baseUrl: '' },
        {
            enums: 'typescript', // default
            name: '@hey-api/typescript',
        },
    ],
});

const parseEnv = (value: string | undefined): Env => {
    if (value === 'prod') return 'prod';
    if (value === 'dev' || value === undefined) return 'dev';
    throw new Error(`Invalid CODEGEN_ENV: '${value}'. Must be 'dev' or 'prod'.`);
};

const env = parseEnv(process.env.CODEGEN_ENV);

export default defineConfig(createConfig(env));

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
        path: './src/client',
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

const env = (process.env.CODEGEN_ENV as Env) || 'dev';

export default defineConfig(createConfig(env));

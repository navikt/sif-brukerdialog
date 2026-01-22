import { defineConfig, type UserConfig } from '@hey-api/openapi-ts';

import { Env, getEnvBaseUrl } from '.';

const getInputUrl = (env: Env): string => {
    return `https://k9-brukerdialog-prosessering.${getEnvBaseUrl(env)}/v3/api-docs/pleiepenger-sykt-barn-soknad`;
};

export const createConfig = (env: Env): UserConfig => ({
    input: getInputUrl(env),
    output: {
        format: 'prettier',
        lint: 'eslint',
        path: './src/generated/pleiepenger-sykt-barn-soknad',
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

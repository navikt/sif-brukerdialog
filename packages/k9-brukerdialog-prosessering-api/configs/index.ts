import { defineConfig, type UserConfig } from '@hey-api/openapi-ts';

export type Env = 'dev' | 'prod';

export const parseEnv = (value: string | undefined): Env => {
    if (value === 'prod') return 'prod';
    if (value === 'dev' || value === undefined) return 'dev';
    throw new Error(`Invalid CODEGEN_ENV: '${value}'. Must be 'dev' or 'prod'.`);
};

export const getEnvBaseUrl = (env: Env): string => {
    /**  I påvente av at prod-spec ikke er tilgjengelig enda returneres alltid dev her */
    return env === 'dev' ? 'intern.dev.nav.no' : 'intern.dev.nav.no';
};

interface ConfigOptions {
    /** API docs path segment, e.g. 'ettersendelse' or '' for root */
    apiDocsPath: string;
    /** Output path relative to package root, e.g. './src/generated/ettersendelse' */
    outputPath: string;
}

export const createOpenApiConfig = (options: ConfigOptions): UserConfig => {
    const env = parseEnv(process.env.CODEGEN_ENV);
    const baseUrl = getEnvBaseUrl(env);
    const apiPath = options.apiDocsPath ? `/v3/api-docs/${options.apiDocsPath}` : '/v3/api-docs';

    return {
        input: `https://k9-brukerdialog-prosessering.${baseUrl}${apiPath}`,
        output: {
            format: 'prettier',
            lint: 'eslint',
            path: options.outputPath,
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
    };
};

export const createConfig = (options: ConfigOptions) => defineConfig(createOpenApiConfig(options));

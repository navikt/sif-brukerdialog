import { defineConfig, type UserConfig } from '@hey-api/openapi-ts';

interface ConfigOptions {
    /** API docs path segment, e.g. 'ettersendelse' or '' for root */
    apiDocsPath: string;
    /** Output path relative to package root, e.g. './src/generated/ettersendelse' */
    outputPath: string;
}

export const createOpenApiConfig = (options: ConfigOptions): UserConfig => {
    const specFile = options.apiDocsPath ? `${options.apiDocsPath}.json` : 'default.json';

    return {
        input: `./specs/${specFile}`,
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

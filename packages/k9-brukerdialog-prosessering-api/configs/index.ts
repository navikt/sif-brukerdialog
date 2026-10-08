import { defineConfig, type UserConfig } from '@hey-api/openapi-ts';

import { createSchemaNameResolver } from '../../../scripts/codegen/codegenUtils.js';

interface ConfigOptions {
    /** API docs path segment, e.g. 'ettersendelse' or '' for root */
    apiDocsPath: string;
    /** Output path relative to package root, e.g. './src/generated/ettersendelse' */
    outputPath: string;
    /** Begrens til operasjoner som matcher (hey-api filter, f.eks. 'GET /foo' eller '/^GET \\/foo/') */
    includeOperations?: string[];
}

export const createOpenApiConfig = (options: ConfigOptions): UserConfig => {
    const specFile = options.apiDocsPath ? `${options.apiDocsPath}.json` : 'default.json';

    return {
        input: `./specs/${specFile}`,
        parser: {
            ...(options.includeOperations && {
                filters: { operations: { include: options.includeOperations } },
            }),
            transforms: {
                schemaName: createSchemaNameResolver(`./specs/${specFile}`),
            },
        },
        output: {
            postProcess: ['prettier'],
            path: options.outputPath,
        },
        plugins: [
            {
                name: '@hey-api/typescript',
                enums: 'typescript',
            },
            {
                name: '@hey-api/sdk',
                operations: { strategy: 'byTags' },
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

import { defineConfig } from 'orval';

const workspace = './src/generated';

export default defineConfig({
    ungClient: {
        input: {
            target: 'https://ung-deltakelse-opplyser.intern.dev.nav.no/v3/api-docs',
        },
        output: {
            override: {
                useNativeEnums: true,
                mutator: {
                    path: '../ungDeltakelseOpplyserApiClient.ts',
                    name: 'customInstance',
                },
            },
            mode: 'single',
            client: 'axios-functions',
            target: './endpoints',
            tsconfig: './tsconfig.json',
            workspace,
            clean: true,
        },
    },
    ungZod: {
        input: {
            target: 'https://ung-deltakelse-opplyser.intern.dev.nav.no/v3/api-docs',
        },
        output: {
            override: {
                useNativeEnums: true,
            },
            mode: 'single',
            client: 'zod',
            fileExtension: '.zod.ts',
            target: './schemas',
            tsconfig: './tsconfig.json',
            workspace,
            clean: false,
        },
    },
});

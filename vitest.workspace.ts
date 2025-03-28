import { defineWorkspace } from 'vitest/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/experimental-addon-test/vitest-plugin';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/writing-tests/test-addon
export default defineWorkspace([
    './apps/dine-pleiepenger/vitest.config.ts',
    './apps/ekstra-omsorgsdager-andre-forelder-ikke-tilsyn/vitest.config.ts',
    './apps/endringsmelding-pleiepenger/vitest.config.ts',
    './apps/omsorgsdager-aleneomsorg-dialog/vite.config.ts',
    './apps/omsorgspengerutbetaling-arbeidstaker-soknad/vitest.config.ts',
    './apps/omsorgspengerutbetaling-soknad/vitest.config.ts',
    './apps/omsorgspengesoknad/vitest.config.ts',
    './apps/opplaringspenger-soknad/vitest.config.ts',
    './apps/pleiepenger-i-livets-sluttfase-soknad/vitest.config.ts',
    './apps/pleiepenger-sykt-barn/vitest.config.ts',
    './apps/sif-ettersending/vitest.config.ts',
    './packages/sif-common-core-ds/vitest.config.ts',
    './packages/sif-common-forms-ds/vitest.config.ts',
    './packages/sif-common-formik-ds/vitest.config.ts',
    './packages/sif-common-utils/vitest.config.ts',
    {
        extends: 'apps/ungdomsytelse-veileder/vite.config.ts',
        plugins: [
            // The plugin will run tests for the stories defined in your Storybook config
            // See options at: https://storybook.js.org/docs/writing-tests/test-addon#storybooktest
            storybookTest({
                configDir: path.join(dirname, '.storybook'),
            }),
        ],
        test: {
            name: 'storybook',
            browser: {
                enabled: true,
                headless: true,
                provider: 'playwright',
                instances: [
                    {
                        browser: 'chromium',
                    },
                ],
            },
            setupFiles: ['apps/ungdomsytelse-veileder/.storybook/vitest.setup.ts'],
        },
    },
]);

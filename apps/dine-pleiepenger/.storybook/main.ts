// This file has been automatically migrated to valid ESM format by Storybook.
import { createRequire } from 'node:module';
import { join, dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const require = createRequire(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value) {
    return dirname(require.resolve(join(value, 'package.json')));
}

/** @type { import('@storybook/nextjs').StorybookConfig } */
const config = {
    stories: ['../src/**/*.stories.@(ts|tsx)'],
    addons: [],

    framework: {
        name: getAbsolutePath('@storybook/nextjs'),
        options: {},
    },

    env: (config) => ({
        ...config,
        NEXT_PUBLIC_BASE_PATH: '/innsyn',
        NEXT_PUBLIC_LOGIN_URL: '/login',
        NEXT_PUBLIC_RUNTIME_ENVIRONMENT: 'storybook',
        NEXT_PUBLIC_API_URL_K9_SAK_INNSYN: 'http://localhost:1234',
        NEXT_PUBLIC_API_URL_INNSYN: 'http://localhost:1234',
        NEXT_PUBLIC_API_URL_BRUKERDIALOG: 'http://localhost:1234',
        NEXT_PUBLIC_TELEMETRY_URL: '#',
        NEXT_PUBLIC_ANALYTICS_KEY: 'default',
        NEXT_PUBLIC_APPSTATUS_PROJECT_ID: 'ryujtq87',
        NEXT_PUBLIC_APPSTATUS_DATASET: 'staging',
        NEXT_PUBLIC_DINE_UTBETALINGER_URL: '#',
        NEXT_PUBLIC_SKJEMA_ENDRINGSMELDING_URL: '#',
        NEXT_PUBLIC_SKJEMA_ETTERSENDELSE_URL: '#',
        NEXT_PUBLIC_SKJEMA_PLEIEPENGER_URL: '#',
        NEXT_PUBLIC_ENRINGER_DU_MA_GI_BESKJED_OM_INFO_URL: '#',
        NEXT_PUBLIC_KLAGE_INFO_URL: '#',
        NEXT_PUBLIC_MIN_SIDE_URL: '#',
        NEXT_PUBLIC_NAV_URL: '#',
        NEXT_PUBLIC_INNBOKS_URL: '#',
        NEXT_PUBLIC_PLEIEPENGER_INFO_URL: '#',
        NEXT_PUBLIC_REGELVERK_INFO_URL: '#',
        NEXT_PUBLIC_SAKSBEHANDLINGSTID_INFO_URL: '#',
        NEXT_PUBLIC_BESKJED_URL: '#',
        NEXT_PUBLIC_SKRIV_TIL_OSS_URL: '#',
        NEXT_PUBLIC_SYKDOM_I_FAMILIEN_INFO_URL: '#',
        NEXT_PUBLIC_ARBEIDSGIVER_PLEIEPENGER_URL: '#',
        NEXT_PUBLIC_MINSIDE_DOKUMENTOVERSIKT_URL: '#',
        NEXT_PUBLIC_UTBETALINGSOVERSIKT_URL: '#',
        NEXT_PUBLIC_FEATURE_APPSTATUS: 'off',
        NEXT_PUBLIC_FEATURE_FARO: 'off',
        NEXT_PUBLIC_FEATURE_INNTEKTSMELDING: 'on',
    }),

    webpackFinal: async (config) => {
        config.resolve = config.resolve || {};
        config.resolve.alias = {
            ...config.resolve.alias,
            // Mock @navikt/oasis for å unngå Node.js-moduler (prom-client, cluster, v8, etc.)
            '@navikt/oasis': resolve(__dirname, '../src/storybook/mocks/oasis.mock.ts'),
        };
        return config;
    },
};
export default config;

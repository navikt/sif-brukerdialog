/**
 * Mock for env.ts - brukes i Storybook
 */
import { z } from 'zod';

export const publicEnvSchema = z.object({
    NEXT_PUBLIC_BASE_PATH: z.string(),
    NEXT_PUBLIC_LOGIN_URL: z.string(),
    NEXT_PUBLIC_RUNTIME_ENVIRONMENT: z.union([z.string(), z.undefined()]),
    NEXT_PUBLIC_API_URL_K9_SAK_INNSYN: z.union([z.string(), z.undefined()]),
    NEXT_PUBLIC_API_URL_INNSYN: z.union([z.string(), z.undefined()]),
    NEXT_PUBLIC_API_URL_BRUKERDIALOG: z.union([z.string(), z.undefined()]),
    NEXT_PUBLIC_TELEMETRY_URL: z.string(),
    NEXT_PUBLIC_ANALYTICS_KEY: z.string(),
    NEXT_PUBLIC_APPSTATUS_PROJECT_ID: z.string(),
    NEXT_PUBLIC_APPSTATUS_DATASET: z.string(),
    NEXT_PUBLIC_DINE_UTBETALINGER_URL: z.string(),
    NEXT_PUBLIC_SKJEMA_ENDRINGSMELDING_URL: z.string(),
    NEXT_PUBLIC_SKJEMA_ETTERSENDELSE_URL: z.string(),
    NEXT_PUBLIC_SKJEMA_PLEIEPENGER_URL: z.string(),
    NEXT_PUBLIC_ENRINGER_DU_MA_GI_BESKJED_OM_INFO_URL: z.string(),
    NEXT_PUBLIC_KLAGE_INFO_URL: z.string(),
    NEXT_PUBLIC_MIN_SIDE_URL: z.string(),
    NEXT_PUBLIC_NAV_URL: z.string(),
    NEXT_PUBLIC_INNBOKS_URL: z.string(),
    NEXT_PUBLIC_PLEIEPENGER_INFO_URL: z.string(),
    NEXT_PUBLIC_REGELVERK_INFO_URL: z.string(),
    NEXT_PUBLIC_SAKSBEHANDLINGSTID_INFO_URL: z.string(),
    NEXT_PUBLIC_BESKJED_URL: z.string(),
    NEXT_PUBLIC_SKRIV_TIL_OSS_URL: z.string(),
    NEXT_PUBLIC_SYKDOM_I_FAMILIEN_INFO_URL: z.string(),
    NEXT_PUBLIC_ARBEIDSGIVER_PLEIEPENGER_URL: z.string(),
    NEXT_PUBLIC_MINSIDE_DOKUMENTOVERSIKT_URL: z.string(),
    NEXT_PUBLIC_UTBETALINGSOVERSIKT_URL: z.string(),
    NEXT_PUBLIC_FEATURE_APPSTATUS: z.union([z.literal('on'), z.literal('off'), z.undefined()]),
    NEXT_PUBLIC_FEATURE_FARO: z.union([z.literal('on'), z.literal('off'), z.undefined()]),
    NEXT_PUBLIC_FEATURE_INNTEKTSMELDING: z.union([z.literal('on'), z.literal('off'), z.undefined()]),
});

export type PublicEnv = z.infer<typeof publicEnvSchema>;

export const serverEnvSchema = z.object({
    NEXT_PUBLIC_INNSYN_BACKEND_SCOPE: z.string(),
    NEXT_PUBLIC_BRUKERDIALOG_BACKEND_SCOPE: z.string(),
    NEXT_PUBLIC_K9_SAK_INNSYN_BACKEND_SCOPE: z.string(),
    GITHUB_REF_NAME: z.string(),
    IDPORTEN_CLIENT_ID: z.union([z.string(), z.undefined()]),
    IDPORTEN_WELL_KNOWN_URL: z.union([z.string(), z.undefined()]),
    TOKEN_X_WELL_KNOWN_URL: z.union([z.string(), z.undefined()]),
    TOKEN_X_PRIVATE_JWK: z.union([z.string(), z.undefined()]),
    TOKEN_X_CLIENT_ID: z.union([z.string(), z.undefined()]),
    NAIS_CLIENT_ID: z.union([z.string(), z.undefined()]),
    NEXT_PUBLIC_FEATURE_INNTEKTSMELDING: z.union([z.literal('on'), z.literal('off'), z.undefined()]),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;

export const browserEnv: PublicEnv = {
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
};

export function getServerEnv(): ServerEnv & PublicEnv {
    return {
        ...browserEnv,
        NEXT_PUBLIC_INNSYN_BACKEND_SCOPE: 'mock-scope',
        NEXT_PUBLIC_BRUKERDIALOG_BACKEND_SCOPE: 'mock-scope',
        NEXT_PUBLIC_K9_SAK_INNSYN_BACKEND_SCOPE: 'mock-scope',
        GITHUB_REF_NAME: 'storybook',
        IDPORTEN_CLIENT_ID: undefined,
        IDPORTEN_WELL_KNOWN_URL: undefined,
        TOKEN_X_WELL_KNOWN_URL: undefined,
        TOKEN_X_PRIVATE_JWK: undefined,
        TOKEN_X_CLIENT_ID: undefined,
        NAIS_CLIENT_ID: undefined,
    };
}

export const isLocal = true;

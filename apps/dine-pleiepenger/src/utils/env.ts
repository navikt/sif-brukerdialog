import { z, ZodError } from 'zod';

export type PublicEnv = z.infer<typeof publicEnvSchema>;
export const publicEnvSchema = z.object({
    NEXT_PUBLIC_BASE_PATH: z.string(),
    NEXT_PUBLIC_LOGIN_URL: z.string(),
    NEXT_PUBLIC_RUNTIME_ENVIRONMENT: z.union([z.string(), z.undefined()]),
    NEXT_PUBLIC_API_URL_K9_SAK_INNSYN: z.union([z.string(), z.undefined()]),
    NEXT_PUBLIC_API_URL_INNSYN: z.union([z.string(), z.undefined()]),
    NEXT_PUBLIC_API_URL_BRUKERDIALOG: z.union([z.string(), z.undefined()]),
    NEXT_PUBLIC_GITHUB_REF_NAME: z.string(),

    /** Appstatus */
    NEXT_PUBLIC_APPSTATUS_PROJECT_ID: z.string(),
    NEXT_PUBLIC_APPSTATUS_DATASET: z.string(),

    /** Lenker */
    NEXT_PUBLIC_DINE_UTBETALINGER: z.string(),
    NEXT_PUBLIC_ENDRINGSDIALOG_URL: z.string(),
    NEXT_PUBLIC_ENRINGER_DU_MA_GI_BESKJED_OM_INFO_URL: z.string(),
    NEXT_PUBLIC_ETTERSENDELSE_PLEIEPENGER_URL: z.string(),
    NEXT_PUBLIC_KLAGE_INFO_URL: z.string(),
    NEXT_PUBLIC_MIN_SIDE_URL: z.string(),
    NEXT_PUBLIC_PLEIEPENGER_URL: z.string(),
    NEXT_PUBLIC_PLEIEPENGER_INFO_URL: z.string(),
    NEXT_PUBLIC_REGELVERK_INFO_URL: z.string(),
    NEXT_PUBLIC_SAKSBEHANDLINGSTID_INFO_URL: z.string(),
    NEXT_PUBLIC_SAKSOVERSIKT: z.string(),
    NEXT_PUBLIC_SKRIV_TIL_OSS: z.string(),
    NEXT_PUBLIC_SYKDOM_I_FAMILIEN_INFO_URL: z.string(),
    NEXT_PUBLIC_ARBEIDSGIVER_PLEIEPENGER_URL: z.string(),
    NEXT_PUBLIC_MINSIDE_DOKUMENTOVERSIKT_URL: z.string(),
    NEXT_PUBLIC_UTBETALINGSOVERSIKT_URL: z.string(),

    /** Features */
    NEXT_PUBLIC_FEATURE_HENT_SAKER: z.union([z.literal('on'), z.literal('off'), z.undefined()]),
    NEXT_PUBLIC_FEATURE_HENT_BEHANDLINGSTID: z.union([z.literal('on'), z.literal('off'), z.undefined()]),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;
export const serverEnvSchema = z.object({
    NEXT_PUBLIC_INNSYN_BACKEND_SCOPE: z.string(),
    NEXT_PUBLIC_BRUKERDIALOG_BACKEND_SCOPE: z.string(),
    NEXT_PUBLIC_K9_SAK_INNSYN_BACKEND_SCOPE: z.string(),

    IDPORTEN_CLIENT_ID: z.union([z.string(), z.undefined()]),
    IDPORTEN_WELL_KNOWN_URL: z.union([z.string(), z.undefined()]),
    TOKEN_X_WELL_KNOWN_URL: z.union([z.string(), z.undefined()]),
    TOKEN_X_PRIVATE_JWK: z.union([z.string(), z.undefined()]),
    TOKEN_X_CLIENT_ID: z.union([z.string(), z.undefined()]),
    NAIS_CLIENT_ID: z.union([z.string(), z.undefined()]),
});

/**
 * These envs are available in the browser. They are replaced during the bundling step by NextJS.
 *
 * They MUST be provided during the build step.
 */
export const browserEnv = publicEnvSchema.parse({
    NEXT_PUBLIC_BASE_PATH: process.env.NEXT_PUBLIC_BASE_PATH,
    NEXT_PUBLIC_LOGIN_URL: process.env.NEXT_PUBLIC_LOGIN_URL,
    NEXT_PUBLIC_RUNTIME_ENVIRONMENT: process.env.NEXT_PUBLIC_RUNTIME_ENVIRONMENT,
    NEXT_PUBLIC_APPSTATUS_PROJECT_ID: process.env.NEXT_PUBLIC_APPSTATUS_PROJECT_ID,
    NEXT_PUBLIC_APPSTATUS_DATASET: process.env.NEXT_PUBLIC_APPSTATUS_DATASET,
    NEXT_PUBLIC_API_URL_BRUKERDIALOG: process.env.NEXT_PUBLIC_API_URL_BRUKERDIALOG,
    NEXT_PUBLIC_API_URL_K9_SAK_INNSYN: process.env.NEXT_PUBLIC_API_URL_K9_SAK_INNSYN,
    NEXT_PUBLIC_API_URL_INNSYN: process.env.NEXT_PUBLIC_API_URL_INNSYN,
    NEXT_PUBLIC_SAKSBEHANDLINGSTID_INFO_URL: process.env.NEXT_PUBLIC_SAKSBEHANDLINGSTID_INFO_URL,
    NEXT_PUBLIC_SYKDOM_I_FAMILIEN_INFO_URL: process.env.NEXT_PUBLIC_SYKDOM_I_FAMILIEN_INFO_URL,
    NEXT_PUBLIC_ETTERSENDELSE_PLEIEPENGER_URL: process.env.NEXT_PUBLIC_ETTERSENDELSE_PLEIEPENGER_URL,
    NEXT_PUBLIC_KLAGE_INFO_URL: process.env.NEXT_PUBLIC_KLAGE_INFO_URL,
    NEXT_PUBLIC_REGELVERK_INFO_URL: process.env.NEXT_PUBLIC_REGELVERK_INFO_URL,
    NEXT_PUBLIC_MIN_SIDE_URL: process.env.NEXT_PUBLIC_MIN_SIDE_URL,
    NEXT_PUBLIC_ENRINGER_DU_MA_GI_BESKJED_OM_INFO_URL: process.env.NEXT_PUBLIC_ENRINGER_DU_MA_GI_BESKJED_OM_INFO_URL,
    NEXT_PUBLIC_PLEIEPENGER_URL: process.env.NEXT_PUBLIC_PLEIEPENGER_URL,
    NEXT_PUBLIC_PLEIEPENGER_INFO_URL: process.env.NEXT_PUBLIC_PLEIEPENGER_INFO_URL,
    NEXT_PUBLIC_ENDRINGSDIALOG_URL: process.env.NEXT_PUBLIC_ENDRINGSDIALOG_URL,
    NEXT_PUBLIC_SAKSOVERSIKT: process.env.NEXT_PUBLIC_SAKSOVERSIKT,
    NEXT_PUBLIC_DINE_UTBETALINGER: process.env.NEXT_PUBLIC_DINE_UTBETALINGER,
    NEXT_PUBLIC_SKRIV_TIL_OSS: process.env.NEXT_PUBLIC_SKRIV_TIL_OSS,
    NEXT_PUBLIC_ARBEIDSGIVER_PLEIEPENGER_URL: process.env.NEXT_PUBLIC_ARBEIDSGIVER_PLEIEPENGER_URL,
    NEXT_PUBLIC_MINSIDE_DOKUMENTOVERSIKT_URL: process.env.NEXT_PUBLIC_MINSIDE_DOKUMENTOVERSIKT_URL,
    NEXT_PUBLIC_UTBETALINGSOVERSIKT_URL: process.env.NEXT_PUBLIC_UTBETALINGSOVERSIKT_URL,
    NEXT_PUBLIC_FEATURE_HENT_SAKER: process.env.NEXT_PUBLIC_FEATURE_HENT_SAKER,
    NEXT_PUBLIC_FEATURE_HENT_BEHANDLINGSTID: process.env.NEXT_PUBLIC_FEATURE_HENT_BEHANDLINGSTID,
    NEXT_PUBLIC_GITHUB_REF_NAME: `${process.env.NEXT_PUBLIC_GITHUB_REF_NAME}`,
} satisfies Record<keyof PublicEnv, string | undefined>);

const getRawServerConfig = (): Partial<unknown> =>
    ({
        // Provided by nais-*.yml
        NEXT_PUBLIC_K9_SAK_INNSYN_BACKEND_SCOPE: process.env.NEXT_PUBLIC_K9_SAK_INNSYN_BACKEND_SCOPE,
        NEXT_PUBLIC_INNSYN_BACKEND_SCOPE: process.env.NEXT_PUBLIC_INNSYN_BACKEND_SCOPE,
        NEXT_PUBLIC_BRUKERDIALOG_BACKEND_SCOPE: process.env.NEXT_PUBLIC_BRUKERDIALOG_BACKEND_SCOPE,

        // Provided by nais
        IDPORTEN_CLIENT_ID: process.env.IDPORTEN_CLIENT_ID,
        IDPORTEN_WELL_KNOWN_URL: process.env.IDPORTEN_WELL_KNOWN_URL,
        TOKEN_X_WELL_KNOWN_URL: process.env.TOKEN_X_WELL_KNOWN_URL,
        TOKEN_X_PRIVATE_JWK: process.env.TOKEN_X_PRIVATE_JWK,
        TOKEN_X_CLIENT_ID: process.env.TOKEN_X_CLIENT_ID,
        NAIS_CLIENT_ID: process.env.NAIS_CLIENT_ID,
    }) satisfies Record<keyof ServerEnv, string | undefined>;

/**
 * Server envs are lazy loaded and verified using Zod.
 */
export function getServerEnv(): ServerEnv & PublicEnv {
    try {
        return { ...serverEnvSchema.parse(getRawServerConfig()), ...publicEnvSchema.parse(browserEnv) };
    } catch (e) {
        if (e instanceof ZodError) {
            throw new Error(
                `The following envs are missing: ${
                    e.errors
                        .filter((it) => it.message === 'Required')
                        .map((it) => it.path.join('.'))
                        .join(', ') || 'None are missing, but zod is not happy. Look at cause'
                }`,
                { cause: e },
            );
        } else {
            throw e;
        }
    }
}

export const isLocal = process.env.NODE_ENV !== 'production';

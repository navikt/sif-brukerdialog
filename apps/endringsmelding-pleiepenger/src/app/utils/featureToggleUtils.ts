import { getMaybeEnv } from '@navikt/sif-common-env';

export enum Feature {
    SIF_PUBLIC_ENDRE_OMSORGSTILBUD = 'SIF_PUBLIC_ENDRE_OMSORGSTILBUD',

    /** Skjul registrert tid i tilsynsordning.
     * - Vi viser bare tid som innlogget bruker har sendt inn, ikke tid fra annen part.
     * - Bruker skal alltid kunne sende inn ny tid, også når den er lik sist innsending.
     */
    SIF_PUBLIC_SKJUL_TID_I_OMSORGSTILBUD = 'SIF_PUBLIC_SKJUL_TID_I_OMSORGSTILBUD',
}

export const isFeatureEnabled = (feature: Feature) => {
    return getMaybeEnv(feature) === 'on';
};

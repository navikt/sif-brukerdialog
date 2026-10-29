import { getMaybeEnv } from '@sif/env';

export enum Feature {
    SIF_PUBLIC_VELG_ENDRE_FRA_OPPSUMMERING = 'SIF_PUBLIC_VELG_ENDRE_FRA_OPPSUMMERING',
    SIF_PUBLIC_SJEKK_OM_ARBEIDSTID_ER_GYLDIG = 'SIF_PUBLIC_SJEKK_OM_ARBEIDSTID_ER_GYLDIG',
    SIF_PUBLIC_HENT_TILGANG_FRA_BACKEND = 'SIF_PUBLIC_HENT_TILGANG_FRA_BACKEND',
}

export const isFeatureEnabled = (feature: Feature) => {
    return getMaybeEnv(feature) === 'on';
};

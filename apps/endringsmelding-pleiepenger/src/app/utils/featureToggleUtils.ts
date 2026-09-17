import { getMaybeEnv } from '@navikt/sif-common-env';

export enum Feature {
    SIF_PUBLIC_VELG_ENDRING_V2 = 'SIF_PUBLIC_VELG_ENDRING_V2',
    SIF_PUBLIC_SJEKK_OM_ARBEIDSTID_ER_GYLDIG = 'SIF_PUBLIC_SJEKK_OM_ARBEIDSTID_ER_GYLDIG',
}

export const isFeatureEnabled = (feature: Feature) => {
    return getMaybeEnv(feature) === 'on';
};

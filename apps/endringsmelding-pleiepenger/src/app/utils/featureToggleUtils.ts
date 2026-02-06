import { getMaybeEnv } from '@navikt/sif-common-env';

export enum Feature {
    SIF_PUBLIC_ENDRE_OMSORGSTILBUD = 'SIF_PUBLIC_ENDRE_OMSORGSTILBUD',
}

export const isFeatureEnabled = (feature: Feature) => {
    return getMaybeEnv(feature) === 'on';
};

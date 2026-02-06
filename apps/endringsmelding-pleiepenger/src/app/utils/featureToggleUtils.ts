import { getMaybeEnv } from '@navikt/sif-common-env';

export enum Feature {
    ENDRE_OMSORGSTILBUD = 'ENDRE_OMSORGSTILBUD',
}

export const isFeatureEnabled = (feature: Feature) => {
    return getMaybeEnv(feature) === 'on';
};

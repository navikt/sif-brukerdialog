import { getMaybeEnv } from '@navikt/sif-common-env';

export enum Feature {
    'OPPLARINGSPENGER' = 'FEATURE_OPPLARINGSPENGER',
}

export const isFeatureEnabled = (feature: Feature) => {
    return getMaybeEnv(feature) === 'on';
};

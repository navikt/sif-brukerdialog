import { getMaybeEnv } from '@navikt/sif-common-env';

export enum Feature {
    'OPPLARINGSPENGER_VELG_BARN' = 'SIF_PUBLIC_FEATURE_OPPLARINGSPENGER_VELG_BARN',
    'OPPLARINGSPENGER_VELG_DOKUMENTTYPE' = 'SIF_PUBLIC_FEATURE_OPPLARINGSPENGER_VELG_DOKUMENTTYPE',
}

export const isFeatureEnabled = (feature: Feature) => {
    return getMaybeEnv(feature) === 'on';
};

export const getFeaturesMap = () =>
    Object.values(Feature).map((value) => ({
        [value]: isFeatureEnabled(value),
    }));

export const getFeaturesHashString = () => JSON.stringify(getFeaturesMap());

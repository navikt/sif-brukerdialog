export enum Feature {
    'FEATURE_VELG_SAK' = 'FEATURE_VELG_SAK',
    'FEATURE_ENDRE_ARBEIDSTID' = 'FEATURE_ENDRE_ARBEIDSTID',
    'FEATURE_ENDRE_LOVBESTEMT_FERIE' = 'FEATURE_ENDRE_LOVBESTEMT_FERIE',
    'FEATURE_ENDRE_UTENLANDSOPPHOLD' = 'FEATURE_ENDRE_UTENLANDSOPPHOLD',
}

export const isFeatureEnabled = (feature: Feature) => {
    const appSettings = (window as any).appSettings;
    return appSettings[feature] === 'on' || appSettings[feature] === 'true';
};

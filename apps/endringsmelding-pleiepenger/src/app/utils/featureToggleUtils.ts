export enum Feature {
    UKJENT_ARBEIDSGIVER = 'UKJENT_ARBEIDSGIVER',
}

export const isFeatureEnabled = (feature: Feature) => {
    const appSettings = (window as any).appSettings;
    return appSettings[feature] === 'on' || appSettings[feature] === 'true';
};

export enum Feature {
    UKJENT_ARBEIDSFOHOLD = 'UKJENT_ARBEIDSFOHOLD',
}

export const isFeatureEnabled = (feature: Feature) => {
    const appSettings = (window as any).appSettings;
    return appSettings[feature] === 'on' || appSettings[feature] === 'true';
};

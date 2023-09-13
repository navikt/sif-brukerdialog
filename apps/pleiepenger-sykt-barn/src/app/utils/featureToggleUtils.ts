export enum Feature {
    'UTILGJENGELIG' = 'UTILGJENGELIG',
    'NYNORSK' = 'NYNORSK',
    'INNSYN' = 'INNSYN',
    'FORENKLET_ARBEID' = 'FORENKLET_ARBEID',
}

export const isFeatureEnabled = (feature: Feature) => {
    const appSettings = (window as any).appSettings;
    return appSettings[feature] === 'on' || (window as any).appSettings[feature] === 'true';
};

export enum Feature {
    'NYNORSK' = 'NYNORSK',
    'UTILGJENGELIG' = 'UTILGJENGELIG',
    'NY_ARBEIDSGIVER' = 'NY_ARBEIDSGIVER',
}

export const isFeatureEnabled = (feature: Feature) => {
    const appSettings = (window as any).appSettings;
    return appSettings[feature] === 'on' || (window as any).appSettings[feature] === 'true';
};

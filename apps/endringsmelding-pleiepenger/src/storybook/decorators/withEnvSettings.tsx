export const withEnvSettings = (Story) => {
    (window as any).appSettings.APP_VERSION = 'production';
    (window as any).appSettings.SIF_PUBLIC_SJEKK_OM_ARBEIDSTID_ER_GYLDIG = 'on';
    return <Story />;
};

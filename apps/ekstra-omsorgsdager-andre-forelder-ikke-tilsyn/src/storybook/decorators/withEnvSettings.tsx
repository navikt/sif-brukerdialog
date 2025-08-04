export const withEnvSettings = (Story) => {
    (window as any).appSettings.APP_VERSION = 'production';
    return <Story />;
};

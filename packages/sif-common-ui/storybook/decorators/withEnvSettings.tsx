import * as React from 'react';

export const withEnvSettings = (Story) => {
    (window as any).appSettings.APP_VERSION = 'production';
    return <Story />;
};

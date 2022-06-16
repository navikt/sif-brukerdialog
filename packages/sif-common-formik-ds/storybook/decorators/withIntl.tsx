import React from 'react';
import AppIntlProvider from '../stories/components/app-intl-provider/AppIntlProvider';

export const withIntl = (Story) => (
    <AppIntlProvider locale="nb">
        <Story />
    </AppIntlProvider>
);

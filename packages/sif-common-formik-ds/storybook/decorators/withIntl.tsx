import * as React from 'react';
import AppIntlProvider from '../components/app-intl-provider/AppIntlProvider';

export const withIntl = (Story) => (
    <AppIntlProvider locale="nb">
        <Story />
    </AppIntlProvider>
);

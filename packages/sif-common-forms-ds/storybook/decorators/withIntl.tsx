import * as React from 'react';
import AppIntlProvider from './AppIntlProvider';

export const withIntl = (Story) => (
    <AppIntlProvider locale="nb">
        <Story />
    </AppIntlProvider>
);

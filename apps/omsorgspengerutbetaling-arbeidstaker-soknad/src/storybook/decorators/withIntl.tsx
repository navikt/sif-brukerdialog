import * as React from 'react';
import StoryIntlProvider from '../components/StoryIntlProvider';

export const withIntl = (Story) => (
    <StoryIntlProvider locale="nb">
        <Story />
    </StoryIntlProvider>
);

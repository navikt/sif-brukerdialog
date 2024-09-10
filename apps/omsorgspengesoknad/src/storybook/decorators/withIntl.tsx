import * as React from 'react';
import StoryIntlProvider from '../components/StoryIntlProvider';
import './print.css';

export const withIntl = (Story) => (
    <StoryIntlProvider locale="nb">
        <Story />
    </StoryIntlProvider>
);

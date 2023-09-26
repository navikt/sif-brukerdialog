import * as React from 'react';
import StoryIntlProvider from '../components/StoryIntlProvider';

export const withIntlWrapper = (Story) => (
    <StoryIntlProvider locale="nb" messages={{}}>
        <Story />
    </StoryIntlProvider>
);

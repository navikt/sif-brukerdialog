import type { Decorator } from '@storybook/react';

import StoryIntlProvider from '../components/StoryIntlProvider';

export const withIntl: Decorator = (Story) => (
    <StoryIntlProvider locale="nb">
        <Story />
    </StoryIntlProvider>
);

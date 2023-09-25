import * as React from 'react';
import StoryWrapper from './StoryWrapper';

export const withStoryWrapper = (Story) => (
    <StoryWrapper>
        <Story />
    </StoryWrapper>
);

import React from 'react';
import { StoryFormikWrapper } from './StoryFormikWrapper';

export const withFormikWrapper = (Story, args) => (
    <StoryFormikWrapper {...args}>
        <Story />
    </StoryFormikWrapper>
);

import * as React from 'react';
import { StoryFormikWrapper } from '../components/StoryFormikWrapper';

export const withFormikWrapper = (Story, args) => (
    <StoryFormikWrapper {...args}>
        <Story />
    </StoryFormikWrapper>
);

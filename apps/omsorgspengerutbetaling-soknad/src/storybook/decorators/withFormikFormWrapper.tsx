import * as React from 'react';
import { StoryFormikFormWrapper } from '../components/StoryFormikFormWrapper';

export const withFormikWrapper = (Story, args) => (
    <StoryFormikFormWrapper {...args}>
        <Story />
    </StoryFormikFormWrapper>
);

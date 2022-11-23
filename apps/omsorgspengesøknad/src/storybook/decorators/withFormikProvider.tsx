import React from 'react';
import { StoryFormikWrapper } from '../components/FormikWrapper';

export const withFormikProvider = (Story, args) => (
    <StoryFormikWrapper {...args}>
        <Story />
    </StoryFormikWrapper>
);

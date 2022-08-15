import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import ErrorGuide from '../../../src/components/error-guide/ErrorGuide';
import StoryWrapper from '../../decorators/StoryWrapper';

export default {
    title: 'Component/ErrorGuide',
    component: ErrorGuide,
    decorators: [
        (Story) => (
            <StoryWrapper>
                <Story />
            </StoryWrapper>
        ),
    ],
} as ComponentMeta<typeof ErrorGuide>;

const Template: ComponentStory<typeof ErrorGuide> = () => {
    return <ErrorGuide title="This is the title">Some content</ErrorGuide>;
};

export const Default = Template.bind({});

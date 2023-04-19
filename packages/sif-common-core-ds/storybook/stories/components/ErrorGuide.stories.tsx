import { Meta, StoryFn } from '@storybook/react';
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
} as Meta<typeof ErrorGuide>;

const Template: StoryFn<typeof ErrorGuide> = () => {
    return <ErrorGuide title="This is the title">Some content</ErrorGuide>;
};

export const Default = Template.bind({});

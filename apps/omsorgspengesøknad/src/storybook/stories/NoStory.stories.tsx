import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import StoryWrapper from '../decorators/StoryWrapper';

const NoType = () => <>NoType</>;

export default {
    title: 'NoStory',
    component: NoType,
    decorators: [
        (Story) => (
            <StoryWrapper>
                <Story />
            </StoryWrapper>
        ),
    ],
} as ComponentMeta<typeof NoType>;

const Template: ComponentStory<typeof NoType> = () => {
    return <NoType />;
};

export const Default = Template.bind({});

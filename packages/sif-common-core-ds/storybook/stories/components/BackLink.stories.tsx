import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import StoryWrapper from '../../decorators/StoryWrapper';
import BackLink from '../../../src/components/back-link/BackLink';

export default {
    title: 'Component/BackLink',
    component: BackLink,
    decorators: [
        (Story) => (
            <StoryWrapper>
                <Story />
            </StoryWrapper>
        ),
    ],
} as ComponentMeta<typeof BackLink>;

const Template: ComponentStory<typeof BackLink> = () => {
    return (
        <BackLink onClick={() => null} href="">
            Go back
        </BackLink>
    );
};

export const Default = Template.bind({});

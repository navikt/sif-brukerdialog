import { Meta, StoryFn } from '@storybook/react';
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
} as Meta<typeof BackLink>;

const Template: StoryFn<typeof BackLink> = () => {
    return <BackLink onClick={() => null} href="" />;
};

export const Default = Template.bind({});

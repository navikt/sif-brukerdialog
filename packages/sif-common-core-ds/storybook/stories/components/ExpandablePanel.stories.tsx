import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import ExpandableInfo from '../../../src/components/expandable-info/ExpandableInfo';
import StoryWrapper from '../../decorators/StoryWrapper';

export default {
    title: 'Component/ExpandableInfo',
    component: ExpandableInfo,
    decorators: [
        (Story) => (
            <StoryWrapper>
                <Story />
            </StoryWrapper>
        ),
    ],
} as ComponentMeta<typeof ExpandableInfo>;

const Template: ComponentStory<typeof ExpandableInfo> = () => {
    return <ExpandableInfo title="A title">Content</ExpandableInfo>;
};

export const Default = Template.bind({});
Default.args = {};

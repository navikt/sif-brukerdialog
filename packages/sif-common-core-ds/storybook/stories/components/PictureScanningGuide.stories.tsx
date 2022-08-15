import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import StoryWrapper from '../../decorators/StoryWrapper';
import PictureScanningGuide from '../../../src/components/picture-scanning-guide/PictureScanningGuide';

export default {
    title: 'Component/PictureScanningGuide',
    component: PictureScanningGuide,
    decorators: [
        (Story) => (
            <StoryWrapper>
                <Story />
            </StoryWrapper>
        ),
    ],
} as ComponentMeta<typeof PictureScanningGuide>;

const Template: ComponentStory<typeof PictureScanningGuide> = () => {
    return <PictureScanningGuide />;
};

export const Default = Template.bind({});

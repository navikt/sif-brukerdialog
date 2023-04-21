import { Meta, StoryFn } from '@storybook/react';
import * as React from 'react';
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
} as Meta<typeof PictureScanningGuide>;

const Template: StoryFn<typeof PictureScanningGuide> = () => {
    return <PictureScanningGuide />;
};

export const Default = Template.bind({});

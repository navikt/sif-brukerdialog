import { Meta, StoryFn } from '@storybook/react-vite';
import * as React from 'react';

import StoryWrapper from '../../../../storybook/decorators/StoryWrapper';
import PictureScanningGuide from '../PictureScanningGuide';

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

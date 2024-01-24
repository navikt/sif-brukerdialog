import { Meta, StoryFn } from '@storybook/react';
import * as React from 'react';
import StoryWrapper from '../../../../storybook/decorators/StoryWrapper';
import PictureScanningGuide from '../PictureScanningGuide';
import { pictureScanningGuideMessages } from '../i18n/pictureScanningGuideMessages';

export default {
    title: 'Component/PictureScanningGuide',
    component: PictureScanningGuide,
    decorators: [
        (Story) => (
            <StoryWrapper messages={pictureScanningGuideMessages.nn}>
                <Story />
            </StoryWrapper>
        ),
    ],
} as Meta<typeof PictureScanningGuide>;

const Template: StoryFn<typeof PictureScanningGuide> = () => {
    return <PictureScanningGuide />;
};

export const Default = Template.bind({});

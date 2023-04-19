import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import StoryWrapper from '../../decorators/StoryWrapper';
import CounsellorWithSpeechBubble from '../../../src/components/_depr/counsellor-with-speech-bubble/CounsellorWithSpeechBubble';
import ResponsivePanel from '../../../src/components/_depr/responsive-panel/ResponsivePanel';

export default {
    title: 'Component/CounsellorWithSpeechBubble',
    component: CounsellorWithSpeechBubble,
    decorators: [
        (Story) => (
            <StoryWrapper>
                <Story />
            </StoryWrapper>
        ),
    ],
} as Meta<typeof CounsellorWithSpeechBubble>;

const Template: StoryFn<typeof CounsellorWithSpeechBubble> = () => {
    return (
        <ResponsivePanel style={{ backgroundColor: '#dfdfdf' }}>
            <CounsellorWithSpeechBubble strongText="Title" normalText="Bodytext" />
        </ResponsivePanel>
    );
};

export const Default = Template.bind({});

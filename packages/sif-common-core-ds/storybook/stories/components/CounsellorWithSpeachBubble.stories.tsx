import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import StoryWrapper from '../../decorators/StoryWrapper';
import CounsellorWithSpeechBubble from '../../../src/components/counsellor-with-speech-bubble/CounsellorWithSpeechBubble';
import ResponsivePanel from '../../../src/components/responsive-panel/ResponsivePanel';

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
} as ComponentMeta<typeof CounsellorWithSpeechBubble>;

const Template: ComponentStory<typeof CounsellorWithSpeechBubble> = () => {
    return (
        <ResponsivePanel style={{ backgroundColor: '#dfdfdf' }}>
            <CounsellorWithSpeechBubble strongText="Title" normalText="Bodytext" />
        </ResponsivePanel>
    );
};

export const Default = Template.bind({});

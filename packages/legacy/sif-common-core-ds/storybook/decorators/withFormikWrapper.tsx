import { StoryFormikWrapper } from './StoryFormikWrapper';

export const withFormikWrapper = (Story, args) => (
    <StoryFormikWrapper {...args}>
        <Story />
    </StoryFormikWrapper>
);

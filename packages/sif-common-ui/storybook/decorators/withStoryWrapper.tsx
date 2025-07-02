import StoryWrapper from '../components/StoryWrapper';

export const withStoryWrapper = (Story) => (
    <StoryWrapper>
        <Story />
    </StoryWrapper>
);

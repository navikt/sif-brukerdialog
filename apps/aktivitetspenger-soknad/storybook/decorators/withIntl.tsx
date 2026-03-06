import StoryIntlProvider from '../components/StoryIntlProvider';

export const withIntl = (Story) => {
    return (
        <StoryIntlProvider>
            <Story />
        </StoryIntlProvider>
    );
};

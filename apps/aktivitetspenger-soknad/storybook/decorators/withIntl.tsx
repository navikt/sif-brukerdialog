import StoryIntlProvider from '../components/StoryIntlProvider';

export const withIntl = (Story: any) => (
    <StoryIntlProvider>
        <Story />
    </StoryIntlProvider>
);

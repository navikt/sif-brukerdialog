import '@navikt/ds-css';

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    options: {
        storySort: {
            method: 'alphabetical',
            order: [
                'Questions',
                'Steps',
                ['OmBarnetStep', 'LegeerklæringStep', 'DeltBostedStep', 'OppsummeringStep'],
                'Pages',
            ],
        },
    },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
};

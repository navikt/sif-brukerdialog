import '@navikt/ds-css';

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    options: {
        storySort: {
            method: 'alphabetical',
            order: ['Components', 'Steps', ['OmBarnet', 'Legeerklæring', 'DeltBosted', 'Oppsummering'], 'Pages'],
        },
    },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
};

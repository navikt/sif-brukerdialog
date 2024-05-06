import type { Preview } from '@storybook/react';
import '@navikt/ds-css';

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
};

export default preview;

// import '@navikt/ds-css';

// export const parameters = {
//     actions: { argTypesRegex: '^on[A-Z].*' },
//     options: {
//         storySort: {
//             method: 'alphabetical',
//         },
//     },
//     controls: {
//         matchers: {
//             color: /(background|color)$/i,
//             date: /Date$/,
//         },
//     },
// };

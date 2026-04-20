import '@navikt/ds-css';

import { withIntl } from './decorators/withIntl';

const preview = {
    decorators: [withIntl],
    globalTypes: {
        locale: {
            name: 'Sprak',
            description: 'Velg sprak som skal brukes i komponenten',
            defaultValue: 'nb',
            toolbar: {
                icon: 'globe',
                items: [
                    { value: 'nb', title: 'Bokmal' },
                    { value: 'nn', title: 'Nynorsk' },
                ],
            },
        },
    },
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
        a11y: {
            test: 'todo',
        },
        layout: 'padded',
    },
};

export default preview;

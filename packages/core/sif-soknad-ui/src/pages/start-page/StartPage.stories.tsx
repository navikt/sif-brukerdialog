import { BodyLong } from '@navikt/ds-react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { StorybookDecorator } from '../../storybook/StorybookDecorator';
import { StartPage } from './StartPage';

const meta: Meta<typeof StartPage> = {
    title: 'Pages/StartPage',
    component: StartPage,
    decorators: [StorybookDecorator],
};

export default meta;

type Story = StoryObj<typeof StartPage>;

export const Default: Story = {
    name: 'StartPage',
    args: {
        title: 'Tittel på søknad',
        guide: {
            navn: 'Ola Nordmann',
            content: (
                <BodyLong>
                    Her kan du søke om stønad. Les gjennom informasjonen nedenfor før du starter søknaden.
                </BodyLong>
            ),
        },
        isPending: false,
        onStart: () => undefined,
        children: undefined,
    },
};

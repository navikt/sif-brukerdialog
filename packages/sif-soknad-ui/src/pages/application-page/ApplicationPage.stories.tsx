import { BodyLong } from '@navikt/ds-react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { StorybookDecorator } from '../../storybook/StorybookDecorator';
import { ApplicationPage } from './ApplicationPage';

const meta: Meta<typeof ApplicationPage> = {
    title: 'Pages/ApplicationPage',
    component: ApplicationPage,
    decorators: [StorybookDecorator],
};

export default meta;

type Story = StoryObj<typeof ApplicationPage>;

export const Default: Story = {
    name: 'ApplicationPage',
    args: {
        applicationTitle: 'Tittel på søknad',
        documentTitle: 'Steg 1',
        children: <BodyLong>Innhold på siden.</BodyLong>,
    },
};

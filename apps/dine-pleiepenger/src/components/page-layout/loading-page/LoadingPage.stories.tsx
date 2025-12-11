import type { Meta, StoryObj } from '@storybook/react-vite';

import LoadingPage from './LoadingPage';

const meta: Meta<typeof LoadingPage> = {
    component: LoadingPage,
    title: 'Components/LoadingPage',
    parameters: {
        layout: 'fullscreen',
    },
};
export default meta;

type Story = StoryObj<typeof LoadingPage>;

export const Default: Story = {
    args: {},
};

export const MedCustomTittel: Story = {
    name: 'Med custom tittel',
    args: {
        title: 'Henter informasjon ...',
    },
};

export const MedDokumentTittel: Story = {
    name: 'Med dokumenttittel',
    args: {
        title: 'Henter informasjon ...',
        documentTitle: 'Henter informasjon - Dine pleiepenger for sykt barn',
    },
};

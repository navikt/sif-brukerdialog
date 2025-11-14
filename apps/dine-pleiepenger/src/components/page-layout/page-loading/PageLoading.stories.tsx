import type { Meta, StoryObj } from '@storybook/react-vite';

import PageLoading from './PageLoading';

const meta: Meta<typeof PageLoading> = {
    component: PageLoading,
    title: 'Components/PageLoading',
    parameters: {
        layout: 'fullscreen',
    },
};
export default meta;

type Story = StoryObj<typeof PageLoading>;

export const Default: Story = {
    args: {},
};

export const MedCustomTittel: Story = {
    name: 'Med custom tittel',
    args: {
        title: 'Henter informasjon...',
    },
};

export const MedDokumentTittel: Story = {
    name: 'Med dokumenttittel',
    args: {
        title: 'Henter informasjon...',
        documentTitle: 'Henter informasjon - Dine pleiepenger for sykt barn',
    },
};

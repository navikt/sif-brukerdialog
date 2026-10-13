import type { Meta, StoryObj } from '@storybook/react-vite';

import { FallbackErrorPage } from './FallbackErrorPage';

const meta: Meta<typeof FallbackErrorPage> = {
    title: 'Pages/FallbackErrorPage',
    component: FallbackErrorPage,
};

export default meta;

type Story = StoryObj<typeof FallbackErrorPage>;

export const Default: Story = {
    name: 'FallbackErrorPage',
    args: {
        title: 'Beklager, noe gikk galt.',
        preTitle: 'Teknisk feil',
    },
};

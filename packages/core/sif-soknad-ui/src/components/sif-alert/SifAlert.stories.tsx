import type { Meta, StoryObj } from '@storybook/react-vite';

import { StorybookDecorator } from '../../storybook/StorybookDecorator';
import { SifAlert } from './SifAlert';

const meta: Meta<typeof SifAlert> = {
    title: 'Components/SifAlert',
    component: SifAlert,
    decorators: [StorybookDecorator],
};

export default meta;

type Story = StoryObj<typeof SifAlert>;

export const Info: Story = {
    args: {
        variant: 'info',
        children: 'Informasjonsmelding',
    },
};

export const Warning: Story = {
    args: {
        variant: 'warning',
        children: 'Advarsel',
    },
};

export const Error: Story = {
    args: {
        variant: 'error',
        children: 'Feilmelding',
    },
};

export const Success: Story = {
    args: {
        variant: 'success',
        children: 'Suksessmelding',
    },
};

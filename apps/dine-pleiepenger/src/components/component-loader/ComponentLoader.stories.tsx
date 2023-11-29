import ComponentLoader from './ComponentLoader';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ComponentLoader> = {
    component: ComponentLoader,
    title: 'Components/ComponentLoader',
    parameters: {
        layout: 'centered',
    },
};
export default meta;

type Story = StoryObj<typeof ComponentLoader>;

export const Default: Story = {
    args: {},
};
export const MedTittel: Story = {
    name: 'Med tittel',
    args: {
        title: 'En spesifikk tittel',
    },
};

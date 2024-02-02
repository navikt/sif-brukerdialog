import { withEmptyPage } from '../../storybook/hooks/withEmptyPage';
import Svarfrist from './Svarfrist';

import type { Meta, StoryObj } from '@storybook/react';
const meta: Meta<typeof Svarfrist> = {
    component: Svarfrist,
    title: 'Components/Svarfrist',
    parameters: {
        layout: 'centered',
    },
    decorators: [withEmptyPage],
};
export default meta;

type Story = StoryObj<typeof Svarfrist>;

export const Default: Story = {
    args: {
        frist: new Date(),
    },
};

export const UtenFristMedBehandlingstid: Story = {
    name: 'Med 3 ukers behandlingstid',
    args: {
        saksbehandlingstidUker: 3,
    },
};

export const UtenFrist: Story = {
    name: 'Uten frist - default 7 uker behandlingstid',
    args: {},
};

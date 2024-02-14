import dayjs from 'dayjs';
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
    name: 'Med frist',
    args: {
        frist: dayjs().add(10, 'day').toDate(),
    },
};

export const UtenFristMedBehandlingstid: Story = {
    name: 'Ingen frist',
    args: {
        saksbehandlingstidUker: 3,
    },
};

export const FristIGår: Story = {
    name: 'Frist i går',
    args: {
        frist: dayjs().subtract(1, 'day').toDate(),
    },
};
export const FristPassert: Story = {
    name: 'Frist i dag',
    args: {
        frist: dayjs().toDate(),
    },
};

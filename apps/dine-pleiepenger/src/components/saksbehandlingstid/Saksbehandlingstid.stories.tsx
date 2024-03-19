import dayjs from 'dayjs';
import { withEmptyPage } from '../../storybook/hooks/withEmptyPage';
import Saksbehandlingstid from './Saksbehandlingstid';

import type { Meta, StoryObj } from '@storybook/react';
import { withIntl } from '../../storybook/hooks/withIntl';
const meta: Meta<typeof Saksbehandlingstid> = {
    component: Saksbehandlingstid,
    title: 'Content/Saksbehandlingstid',
    parameters: {
        layout: 'centered',
    },
    decorators: [withEmptyPage, withIntl],
};
export default meta;

type Story = StoryObj<typeof Saksbehandlingstid>;

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

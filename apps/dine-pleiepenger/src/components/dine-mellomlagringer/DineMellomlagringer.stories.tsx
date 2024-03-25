import dayjs from 'dayjs';
import { withEmptyPage } from '../../storybook/hooks/withEmptyPage';
import { withIntl } from '../../storybook/hooks/withIntl';
import DineMellomlagringer from './DineMellomlagringer';

import type { Meta, StoryObj } from '@storybook/react';
const meta: Meta<typeof DineMellomlagringer> = {
    component: DineMellomlagringer,
    title: 'Content/DineMellomlagringer',
    parameters: {
        layout: 'centered',
    },
    decorators: [withIntl, withEmptyPage],
};
export default meta;

type Story = StoryObj<typeof DineMellomlagringer>;

export const Default: Story = {
    name: 'Påbegynt søknad og endring',
    args: {
        endring: {
            metadata: { updatedTimestamp: new Date() },
        },
        søknad: {
            metadata: { updatedTimestamp: dayjs().subtract(2, 'days').toDate() },
        },
    },
};

export const BarePåbegyntSøknad: Story = {
    name: 'Bare påbegynt søknad',
    args: {
        søknad: {
            metadata: { updatedTimestamp: dayjs().subtract(2, 'days').toDate() },
        },
    },
};

export const BarePåbegyntEndring: Story = {
    name: 'Bare påbegynt endring',
    args: {
        endring: {
            metadata: { updatedTimestamp: dayjs().subtract(2, 'days').toDate() },
        },
    },
};

export const UtenMellomlagring: Story = {
    name: 'Uten mellomlaginger (render null)',
    args: {},
};

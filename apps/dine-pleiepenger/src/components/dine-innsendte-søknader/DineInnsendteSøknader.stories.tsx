import { Meta, StoryObj } from '@storybook/react';
import mockSøknader from '../../../api-mock-server/mockdata/soknader.json';
import { withEmptyPage } from '../../storybook/hooks/withEmptyPage';
import { withIntl } from '../../storybook/hooks/withIntl';
import { InnsendtSøknad } from '../../types/Søknad';
import DineInnsendteSøknader from './DineInnsendteSøknader';

const meta: Meta<typeof DineInnsendteSøknader> = {
    title: 'Content/DineSøknader',
    component: DineInnsendteSøknader,
    parameters: {
        layout: 'centered',
    },
    decorators: [withIntl, withEmptyPage],
};
export default meta;

type Story = StoryObj<typeof DineInnsendteSøknader>;

const søknader = mockSøknader as any as InnsendtSøknad[];

export const MedEnSøknader: Story = {
    name: 'Med én søknad',
    args: {
        søknader: søknader.slice(0, 1),
    },
};

export const MedSøknader: Story = {
    name: 'Med flere søknader',
    args: {
        søknader: søknader as InnsendtSøknad[],
    },
};

export const UtenSøknader: Story = {
    name: 'Med ingen søknader',
    args: {
        søknader: [],
    },
};

import { Meta, StoryObj } from '@storybook/react';
import mockSøknader from '../../../api-mock-server/mockdata/soknader.json';
import { withEmptyPage } from '../../storybook/hooks/withEmptyPage';
import { withIntl } from '../../storybook/hooks/withIntl';
import { Søknad } from '../../types/Søknad';
import SøknadListe from './SøknadListe';

const meta: Meta<typeof SøknadListe> = {
    title: 'Components/SøknadListe',
    component: SøknadListe,
    parameters: {
        layout: 'centered',
    },
    decorators: [withIntl, withEmptyPage],
};
export default meta;

type Story = StoryObj<typeof SøknadListe>;

const søknader = mockSøknader as any as Søknad[];

export const MedEnSøknader: Story = {
    name: 'Med én søknad',
    args: {
        søknader: søknader.slice(0, 1),
    },
};

export const MedSøknader: Story = {
    name: 'Med flere søknader',
    args: {
        søknader: søknader as Søknad[],
    },
};

export const UtenSøknader: Story = {
    name: 'Med ingen søknader',
    args: {
        søknader: [],
    },
};

import { Meta, StoryObj } from '@storybook/react';
import mockSøknader from '../../../api-mock-server/mockdata/soknader.json';
import { withEmptyPage } from '../../storybook/hooks/withEmptyPage';
import { withIntl } from '../../storybook/hooks/withIntl';
import { InnsendtSøknad } from '../../types/InnsendtSøknad';
import InnsendtSøknadListe from './InnsendtSøknadListe';

const meta: Meta<typeof InnsendtSøknadListe> = {
    title: 'Components/SøknadListe',
    component: InnsendtSøknadListe,
    parameters: {
        layout: 'centered',
    },
    decorators: [withIntl, withEmptyPage],
};
export default meta;

type Story = StoryObj<typeof InnsendtSøknadListe>;

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

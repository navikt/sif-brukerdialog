import type { Meta, StoryObj } from '@storybook/react-vite';
import dayjs from 'dayjs';

import { withEmptyPage } from '../../storybook/hooks/withEmptyPage';
import { withIntl } from '../../storybook/hooks/withIntl';
import { Venteårsak } from '../../types';
import SaksbehandlingstidPanel from './Saksbehandlingstid';
const meta: Meta<typeof SaksbehandlingstidPanel> = {
    component: SaksbehandlingstidPanel,
    title: 'Content/Saksbehandlingstid',
    parameters: {
        layout: 'centered',
    },
    decorators: [withEmptyPage, withIntl],
};
export default meta;

type Story = StoryObj<typeof SaksbehandlingstidPanel>;

export const Default: Story = {
    name: 'Med frist',
    args: {
        frist: dayjs().add(10, 'day').toDate(),
        sakErLastet: true,
    },
};

export const UtenFristMedBehandlingstid: Story = {
    name: 'Ingen frist',
    args: { sakErLastet: true },
};

export const FristIGår: Story = {
    name: 'Frist i går',
    args: {
        frist: dayjs().subtract(1, 'day').toDate(),
        sakErLastet: true,
    },
};
export const FristPassert: Story = {
    name: 'Frist i dag',
    args: {
        frist: dayjs().toDate(),
        sakErLastet: true,
    },
};
export const VenteårsakMedisinsk: Story = {
    name: 'Venteårsak: Medisinsk dokumentasjon',
    args: {
        frist: dayjs().toDate(),
        venteårsak: Venteårsak.MEDISINSK_DOKUMENTASJON,
        sakErLastet: true,
    },
};
export const VenteårsakInntektsmelding: Story = {
    name: 'Venteårsak: Inntektsmelding',
    args: {
        frist: dayjs().toDate(),
        venteårsak: Venteårsak.INNTEKTSMELDING,
        sakErLastet: true,
    },
};
export const VenteårsakForTidligSøknad: Story = {
    name: 'Venteårsak: Søkt for tidlig (innenfor frist)',
    args: {
        frist: dayjs().toDate(),
        venteårsak: Venteårsak.FOR_TIDLIG_SOKNAD,
        sakErLastet: true,
    },
};
export const VenteårsakForTidligSøknadFristPassert: Story = {
    name: 'Venteårsak: Søkt for tidlig (etter frist)',
    args: {
        frist: dayjs().subtract(3, 'months').toDate(),
        venteårsak: Venteårsak.FOR_TIDLIG_SOKNAD,
        sakErLastet: true,
    },
};
export const VenteårsakMeldekort: Story = {
    name: 'Venteårsak: Meldekort',
    args: {
        frist: dayjs().toDate(),
        venteårsak: Venteårsak.MELDEKORT,
        sakErLastet: true,
    },
};

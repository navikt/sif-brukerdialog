import dayjs from 'dayjs';
import { withEmptyPage } from '../../storybook/hooks/withEmptyPage';
import Saksbehandlingstid from './Saksbehandlingstid';

import type { Meta, StoryObj } from '@storybook/react';
import { withIntl } from '../../storybook/hooks/withIntl';
import { Venteårsak } from '../../types/Venteårsak';
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
export const VenteårsakMedisinsk: Story = {
    name: 'Venteårsak: Medisinsk dokumentasjon',
    args: {
        frist: dayjs().toDate(),
        venteårsak: Venteårsak.MEDISINSK_DOKUMENTASJON,
    },
};
export const VenteårsakInntektsmelding: Story = {
    name: 'Venteårsak: Inntektsmelding',
    args: {
        frist: dayjs().toDate(),
        venteårsak: Venteårsak.INNTEKTSMELDING,
    },
};
export const VenteårsakForTidligSøknad: Story = {
    name: 'Venteårsak: Søkt for tidlig (innenfor frist)',
    args: {
        frist: dayjs().toDate(),
        venteårsak: Venteårsak.FOR_TIDLIG_SOKNAD,
    },
};
export const VenteårsakForTidligSøknadFristPassert: Story = {
    name: 'Venteårsak: Søkt for tidlig (etter frist)',
    args: {
        frist: dayjs().subtract(3, 'months').toDate(),
        venteårsak: Venteårsak.FOR_TIDLIG_SOKNAD,
    },
};
export const VenteårsakMeldekort: Story = {
    name: 'Venteårsak: Meldekort',
    args: {
        frist: dayjs().toDate(),
        venteårsak: Venteårsak.MELDEKORT,
    },
};

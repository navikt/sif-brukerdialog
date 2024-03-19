import StatusTag from './StatusTag';
import type { Meta, StoryObj } from '@storybook/react';
import { withEmptyPage } from '../../storybook/hooks/withEmptyPage';
import { Behandlingsstatus } from '../../server/api-models/Behandlingsstatus';
import { withIntl } from '../../storybook/hooks/withIntl';
import { Venteårsak } from '../../types/Venteårsak';

const meta: Meta<typeof StatusTag> = {
    component: StatusTag,
    title: 'Components/StatusTag',
    parameters: {
        layout: 'centered',
    },
    decorators: [withEmptyPage, withIntl],
};
export default meta;

type Story = StoryObj<typeof StatusTag>;

export const Avsluttet: Story = {
    args: {
        status: Behandlingsstatus.AVSLUTTET,
    },
};
export const Opprettet: Story = {
    args: {
        status: Behandlingsstatus.OPPRETTET,
    },
};
export const PåVent: Story = {
    args: {
        status: Behandlingsstatus.PÅ_VENT,
        venteårsak: Venteårsak.INNTEKTSMELDING,
    },
};
export const PåVentInntektsmelding: Story = {
    args: {
        status: Behandlingsstatus.PÅ_VENT,
        venteårsak: Venteårsak.INNTEKTSMELDING,
    },
};
export const PåVentMedisinsk: Story = {
    args: {
        status: Behandlingsstatus.PÅ_VENT,
        venteårsak: Venteårsak.MEDISINSK_DOKUMENTASJON,
    },
};
export const PåVentMeldekort: Story = {
    args: {
        status: Behandlingsstatus.PÅ_VENT,
        venteårsak: Venteårsak.MELDEKORT,
    },
};
export const PåVentSøktForTidlig: Story = {
    args: {
        status: Behandlingsstatus.PÅ_VENT,
        venteårsak: Venteårsak.SØKT_FOR_TIDLIG,
    },
};
export const UnderBehandling: Story = {
    args: {
        status: Behandlingsstatus.UNDER_BEHANDLING,
    },
};

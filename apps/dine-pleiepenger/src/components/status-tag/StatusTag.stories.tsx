import StatusTag from './StatusTag';
import type { Meta, StoryObj } from '@storybook/react';
import { withEmptyPage } from '../../storybook/hooks/withEmptyPage';
import { Behandlingsstatus } from '../../server/api-models/Behandlingsstatus';
import { withIntl } from '../../storybook/hooks/withIntl';
import { Venteårsak } from '../../types/Venteårsak';
import { HStack, VStack } from '@navikt/ds-react';

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

export const Default: Story = {
    render: () => {
        return (
            <VStack gap="6">
                <HStack gap="2">
                    {Behandlingsstatus.OPPRETTET}:
                    <StatusTag status={Behandlingsstatus.OPPRETTET} />
                </HStack>
                <HStack gap="2">
                    {Behandlingsstatus.UNDER_BEHANDLING}:
                    <StatusTag status={Behandlingsstatus.UNDER_BEHANDLING} />
                </HStack>
                <HStack gap="2">
                    {Behandlingsstatus.PÅ_VENT}/{Venteårsak.INNTEKTSMELDING}:
                    <StatusTag status={Behandlingsstatus.PÅ_VENT} venteårsak={Venteårsak.INNTEKTSMELDING} />
                </HStack>
                <HStack gap="2">
                    {Behandlingsstatus.PÅ_VENT}/{Venteårsak.MEDISINSK_DOKUMENTASJON}:
                    <StatusTag status={Behandlingsstatus.PÅ_VENT} venteårsak={Venteårsak.MEDISINSK_DOKUMENTASJON} />
                </HStack>
                <HStack gap="2">
                    {Behandlingsstatus.PÅ_VENT}/{Venteårsak.MELDEKORT}:
                    <StatusTag status={Behandlingsstatus.PÅ_VENT} venteårsak={Venteårsak.MELDEKORT} />
                </HStack>
                <HStack gap="2">
                    {Behandlingsstatus.PÅ_VENT}/{Venteårsak.MEDISINSK_DOKUMENTASJON}:
                    <StatusTag status={Behandlingsstatus.PÅ_VENT} venteårsak={Venteårsak.FOR_TIDLIG_SOKNAD} />
                </HStack>
                <HStack gap="2">
                    {Behandlingsstatus.AVSLUTTET}:
                    <StatusTag status={Behandlingsstatus.AVSLUTTET} />
                </HStack>
            </VStack>
        );
    },
};

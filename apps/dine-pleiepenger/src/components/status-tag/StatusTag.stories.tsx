import { HStack, VStack } from '@navikt/ds-react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { withEmptyPage } from '../../storybook/hooks/withEmptyPage';
import { withIntl } from '../../storybook/hooks/withIntl';
import { BehandlingStatus, Venteårsak } from '../../types';
import StatusTag from './StatusTag';
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
            <VStack gap="space-24">
                <HStack gap="space-8">
                    {BehandlingStatus.OPPRETTET}:
                    <StatusTag status={BehandlingStatus.OPPRETTET} />
                </HStack>
                <HStack gap="space-8">
                    {BehandlingStatus.UNDER_BEHANDLING}:
                    <StatusTag status={BehandlingStatus.UNDER_BEHANDLING} />
                </HStack>
                <HStack gap="space-8">
                    {BehandlingStatus.PÅ_VENT}/{Venteårsak.INNTEKTSMELDING}:
                    <StatusTag status={BehandlingStatus.PÅ_VENT} venteårsak={Venteårsak.INNTEKTSMELDING} />
                </HStack>
                <HStack gap="space-8">
                    {BehandlingStatus.PÅ_VENT}/{Venteårsak.MEDISINSK_DOKUMENTASJON}:
                    <StatusTag status={BehandlingStatus.PÅ_VENT} venteårsak={Venteårsak.MEDISINSK_DOKUMENTASJON} />
                </HStack>
                <HStack gap="space-8">
                    {BehandlingStatus.PÅ_VENT}/{Venteårsak.MELDEKORT}:
                    <StatusTag status={BehandlingStatus.PÅ_VENT} venteårsak={Venteårsak.MELDEKORT} />
                </HStack>
                <HStack gap="space-8">
                    {BehandlingStatus.PÅ_VENT}/{Venteårsak.MEDISINSK_DOKUMENTASJON}:
                    <StatusTag status={BehandlingStatus.PÅ_VENT} venteårsak={Venteårsak.FOR_TIDLIG_SOKNAD} />
                </HStack>
                <HStack gap="space-8">
                    {BehandlingStatus.AVSLUTTET}:
                    <StatusTag status={BehandlingStatus.AVSLUTTET} />
                </HStack>
            </VStack>
        );
    },
};

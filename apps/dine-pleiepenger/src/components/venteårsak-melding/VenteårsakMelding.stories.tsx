import VenteårsakMelding from './VenteårsakMelding';
import type { Meta, StoryObj } from '@storybook/react';
import { withEmptyPage } from '../../storybook/hooks/withEmptyPage';
import { withIntl } from '../../storybook/hooks/withIntl';
import { Venteårsak } from '../../types/Venteårsak';

const meta: Meta<typeof VenteårsakMelding> = {
    component: VenteårsakMelding,
    title: 'Content/VenteårsakMelding',
    parameters: {
        layout: 'centered',
    },
    decorators: [withEmptyPage, withIntl],
};
export default meta;

type Story = StoryObj<typeof VenteårsakMelding>;

export const Inntektsmelding: Story = {
    args: {
        venteårsak: Venteårsak.INNTEKTSMELDING,
    },
};
export const Legeerklæring: Story = {
    args: {
        venteårsak: Venteårsak.MEDISINSK_DOKUMENTASJON,
    },
};
export const Meldekort: Story = {
    args: {
        venteårsak: Venteårsak.MELDEKORT,
    },
};
export const SøktForTidlig: Story = {
    args: {
        venteårsak: Venteårsak.SØKT_FOR_TIDLIG,
    },
};

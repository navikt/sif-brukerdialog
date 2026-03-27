import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { OppgavePageDecorator } from '../../../storybook/OppgavePageDecorator';
import { StorybookDecorator } from '../../../storybook/StorybookDecorator';
import { UtalelseForm } from './UtalelseForm';

const meta = {
    title: 'Forms/UtalelseForm',
    component: UtalelseForm,
    decorators: [StorybookDecorator, OppgavePageDecorator],
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    args: {
        oppgaveReferanse: 'test-ref-456',
        spørsmål: 'Har du en tilbakemelding på endret startdato?',
        uttalelseLabel: 'Tilbakemelding',
        svaralternativer: {
            harUttalelseLabel: 'Ja, jeg har en tilbakemelding',
            harIkkeUttalelseLabel: 'Nei',
        },
        onSuccess: fn(),
    },
} satisfies Meta<typeof UtalelseForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const MedBeskrivelse: Story = {
    args: {
        uttalelseDescription: 'Beskriv hva du mener er feil med startdatoen.',
    },
};

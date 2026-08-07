import { Heading, VStack } from '@navikt/ds-react';
import { OppgaveStatus } from '@navikt/ung-brukerdialog-api';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { OppgaverList } from '../../../components';
import { OppgavePageDecorator } from '../../../storybook/OppgavePageDecorator';
import { StorybookDecorator } from '../../../storybook/StorybookDecorator';
import { FjernetPeriodeOppgavePanel } from './FjernetPeriodeOppgavePanel';
import { mockFjernetPeriodeBesvartUPY, mockFjernetPeriodeUPY } from './FjernetPeriodeOppgavePanel.mockData';

const meta: Meta = {
    title: 'Oppgaver/Ungdomsprogramytelsen/Fjernet periode',
    decorators: [StorybookDecorator, OppgavePageDecorator],
};
export default meta;

type Story = StoryObj<{ variant?: string }>;

export const Forsidevisning: Story = {
    name: 'Forsidevisning',
    parameters: { controls: { disable: true } },
    render: () => (
        <VStack gap="space-40">
            <VStack gap="space-16">
                <Heading level="2" size="medium">
                    Uløst oppgave
                </Heading>
                <OppgaverList oppgaver={[mockFjernetPeriodeUPY]} />
            </VStack>
            <VStack gap="space-16">
                <Heading level="2" size="medium">
                    Løste oppgaver
                </Heading>
                <OppgaverList
                    visBeskrivelse={false}
                    oppgaveStatusTagVariant="text"
                    oppgaver={[
                        { ...mockFjernetPeriodeUPY, status: OppgaveStatus.AVBRUTT },
                        { ...mockFjernetPeriodeUPY, status: OppgaveStatus.UTLØPT },
                        { ...mockFjernetPeriodeUPY, status: OppgaveStatus.LØST },
                    ]}
                />
            </VStack>
        </VStack>
    ),
};

export const Ubesvart: Story = {
    name: 'Ubesvart',
    parameters: { controls: { disable: true } },
    render: () => <FjernetPeriodeOppgavePanel oppgave={mockFjernetPeriodeUPY} navn="SNODIG VAFFEL" />,
};

export const Kvittering: Story = {
    name: 'Kvittering',
    parameters: { controls: { disable: true } },
    render: () => (
        <FjernetPeriodeOppgavePanel oppgave={mockFjernetPeriodeUPY} navn="SNODIG VAFFEL" initialVisKvittering={true} />
    ),
};

export const Besvart: Story = {
    name: 'Besvart',
    argTypes: {
        variant: {
            control: 'radio',
            options: ['Uten tilbakemelding', 'Med tilbakemelding'],
        },
    },
    args: { variant: 'Uten tilbakemelding' },
    parameters: { controls: { include: ['variant'] } },
    render: ({ variant }) => (
        <FjernetPeriodeOppgavePanel
            oppgave={{
                ...mockFjernetPeriodeBesvartUPY,
                respons:
                    variant === 'Med tilbakemelding'
                        ? {
                              type: 'VARSEL_SVAR',
                              harUttalelse: true,
                              uttalelseFraBruker:
                                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.',
                          }
                        : { type: 'VARSEL_SVAR', harUttalelse: false },
            }}
            navn="SNODIG VAFFEL"
        />
    ),
};

export const Utløpt: Story = {
    name: 'Utløpt',
    parameters: { controls: { disable: true } },
    render: () => (
        <FjernetPeriodeOppgavePanel
            oppgave={{ ...mockFjernetPeriodeUPY, status: OppgaveStatus.UTLØPT, løstDato: new Date() }}
            navn="SNODIG VAFFEL"
        />
    ),
};

export const Avbrutt: Story = {
    name: 'Avbrutt',
    parameters: { controls: { disable: true } },
    render: () => (
        <FjernetPeriodeOppgavePanel
            oppgave={{ ...mockFjernetPeriodeUPY, status: OppgaveStatus.AVBRUTT, løstDato: new Date() }}
            navn="SNODIG VAFFEL"
        />
    ),
};

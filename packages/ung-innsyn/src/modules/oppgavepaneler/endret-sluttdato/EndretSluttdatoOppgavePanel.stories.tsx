import { Heading, VStack } from '@navikt/ds-react';
import { OppgaveStatus } from '@navikt/ung-brukerdialog-api';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { OppgaverList } from '../../../components';
import { OppgavePageDecorator } from '../../../storybook/OppgavePageDecorator';
import { StorybookDecorator } from '../../../storybook/StorybookDecorator';
import { EndretSluttdatoOppgavePanel } from './EndretSluttdatoOppgavePanel';
import { mockEndretSluttdatoBesvartUPY, mockEndretSluttdatoUPY } from './EndretSluttdatoOppgavePanel.mockData';

const meta: Meta = {
    title: 'Oppgaver/Ungdomsprogramytelsen/Endret sluttdato',
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
                <OppgaverList oppgaver={[mockEndretSluttdatoUPY]} />
            </VStack>
            <VStack gap="space-16">
                <Heading level="2" size="medium">
                    Løste oppgaver
                </Heading>
                <OppgaverList
                    visBeskrivelse={false}
                    oppgaveStatusTagVariant="text"
                    oppgaver={[
                        { ...mockEndretSluttdatoUPY, status: OppgaveStatus.AVBRUTT },
                        { ...mockEndretSluttdatoUPY, status: OppgaveStatus.UTLØPT },
                        { ...mockEndretSluttdatoUPY, status: OppgaveStatus.LØST },
                    ]}
                />
            </VStack>
        </VStack>
    ),
};

export const Ubesvart: Story = {
    name: 'Ubesvart',
    parameters: { controls: { disable: true } },
    render: () => <EndretSluttdatoOppgavePanel oppgave={mockEndretSluttdatoUPY} navn="SNODIG VAFFEL" />,
};

export const Kvittering: Story = {
    name: 'Kvittering',
    parameters: { controls: { disable: true } },
    render: () => (
        <EndretSluttdatoOppgavePanel
            oppgave={mockEndretSluttdatoUPY}
            navn="SNODIG VAFFEL"
            initialVisKvittering={true}
        />
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
        <EndretSluttdatoOppgavePanel
            oppgave={{
                ...mockEndretSluttdatoBesvartUPY,
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
        <EndretSluttdatoOppgavePanel
            oppgave={{ ...mockEndretSluttdatoUPY, status: OppgaveStatus.UTLØPT, løstDato: new Date() }}
            navn="SNODIG VAFFEL"
        />
    ),
};

export const Avbrutt: Story = {
    name: 'Avbrutt',
    parameters: { controls: { disable: true } },
    render: () => (
        <EndretSluttdatoOppgavePanel
            oppgave={{ ...mockEndretSluttdatoUPY, status: OppgaveStatus.AVBRUTT, løstDato: new Date() }}
            navn="SNODIG VAFFEL"
        />
    ),
};

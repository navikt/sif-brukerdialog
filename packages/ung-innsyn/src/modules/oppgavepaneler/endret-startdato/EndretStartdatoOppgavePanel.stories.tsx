import { Heading, VStack } from '@navikt/ds-react';
import { OppgaveStatus } from '@navikt/ung-brukerdialog-api';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { OppgaverList } from '../../../components';
import { OppgavePageDecorator } from '../../../storybook/OppgavePageDecorator';
import { StorybookDecorator } from '../../../storybook/StorybookDecorator';
import { EndretStartdatoOppgavePanel } from './EndretStartdatoOppgavePanel';
import { mockEndretStartdatoBesvartUPY, mockEndretStartdatoUPY } from './EndretStartdatoOppgavePanel.mockData';

const meta: Meta = {
    title: 'Oppgaver/Ungdomsprogramytelsen/Endret startdato',
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
                <OppgaverList oppgaver={[mockEndretStartdatoUPY]} />
            </VStack>
            <VStack gap="space-16">
                <Heading level="2" size="medium">
                    Løste oppgaver
                </Heading>
                <OppgaverList
                    visBeskrivelse={false}
                    oppgaveStatusTagVariant="text"
                    oppgaver={[
                        { ...mockEndretStartdatoUPY, status: OppgaveStatus.AVBRUTT },
                        { ...mockEndretStartdatoUPY, status: OppgaveStatus.UTLØPT },
                        { ...mockEndretStartdatoUPY, status: OppgaveStatus.LØST },
                    ]}
                />
            </VStack>
        </VStack>
    ),
};

export const Ubesvart: Story = {
    name: 'Ubesvart',
    parameters: { controls: { disable: true } },
    render: () => <EndretStartdatoOppgavePanel oppgave={mockEndretStartdatoUPY} navn="SNODIG VAFFEL" />,
};

export const Kvittering: Story = {
    name: 'Kvittering',
    parameters: { controls: { disable: true } },
    render: () => (
        <EndretStartdatoOppgavePanel
            oppgave={mockEndretStartdatoUPY}
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
        <EndretStartdatoOppgavePanel
            oppgave={{
                ...mockEndretStartdatoBesvartUPY,
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
        <EndretStartdatoOppgavePanel
            oppgave={{ ...mockEndretStartdatoUPY, status: OppgaveStatus.UTLØPT, løstDato: new Date() }}
            navn="SNODIG VAFFEL"
        />
    ),
};

export const Avbrutt: Story = {
    name: 'Avbrutt',
    parameters: { controls: { disable: true } },
    render: () => (
        <EndretStartdatoOppgavePanel
            oppgave={{ ...mockEndretStartdatoUPY, status: OppgaveStatus.AVBRUTT, løstDato: new Date() }}
            navn="SNODIG VAFFEL"
        />
    ),
};

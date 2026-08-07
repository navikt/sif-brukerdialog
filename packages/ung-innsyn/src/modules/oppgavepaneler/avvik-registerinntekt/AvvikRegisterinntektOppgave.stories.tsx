import { Heading, VStack } from '@navikt/ds-react';
import { OppgaveStatus } from '@navikt/ung-brukerdialog-api';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { OppgaverList } from '../../../components';
import { OppgavePageDecorator } from '../../../storybook/OppgavePageDecorator';
import { StorybookDecorator } from '../../../storybook/StorybookDecorator';
import { AvvikRegisterinntektOppgavePanel } from './AvvikRegisterinntektOppgavePanel';
import {
    AVVIK_SCENARIO_OPTIONS,
    AvvikScenario,
    lagOppgaveMedScenario,
    mockAvvikRegisterinntektBesvartUPY,
    mockAvvikRegisterinntektUPY,
} from './AvvikRegisterinntektOppgavePanel.mockData';

const meta: Meta = {
    title: 'Oppgaver/Ungdomsprogramytelsen/Avvik registerinntekt',
    decorators: [StorybookDecorator, OppgavePageDecorator],
};
export default meta;

type Args = { scenario: AvvikScenario; variant?: string };
type Story = StoryObj<Args>;

const scenarioArgType = {
    control: 'radio' as const,
    options: AVVIK_SCENARIO_OPTIONS,
};

export const Forsidevisning: Story = {
    name: 'Forsidevisning',
    parameters: { controls: { disable: true } },
    render: () => (
        <VStack gap="space-40">
            <VStack gap="space-16">
                <Heading level="2" size="medium">
                    Uløst oppgave
                </Heading>
                <OppgaverList oppgaver={[mockAvvikRegisterinntektUPY]} />
            </VStack>
            <VStack gap="space-16">
                <Heading level="2" size="medium">
                    Løste oppgaver
                </Heading>
                <OppgaverList
                    visBeskrivelse={false}
                    oppgaveStatusTagVariant="text"
                    oppgaver={[
                        { ...mockAvvikRegisterinntektUPY, status: OppgaveStatus.AVBRUTT },
                        { ...mockAvvikRegisterinntektUPY, status: OppgaveStatus.UTLØPT },
                        { ...mockAvvikRegisterinntektUPY, status: OppgaveStatus.LØST },
                    ]}
                />
            </VStack>
        </VStack>
    ),
};

export const Ubesvart: Story = {
    name: 'Ubesvart',
    argTypes: { scenario: scenarioArgType },
    args: { scenario: 'Én arbeidsgiver' },
    parameters: { controls: { include: ['scenario'] } },
    render: ({ scenario }) => (
        <AvvikRegisterinntektOppgavePanel
            oppgave={lagOppgaveMedScenario(mockAvvikRegisterinntektUPY, scenario)}
            navn="SNODIG VAFFEL"
        />
    ),
};

export const Kvittering: Story = {
    name: 'Kvittering',
    argTypes: { scenario: scenarioArgType },
    args: { scenario: 'Én arbeidsgiver' },
    parameters: { controls: { include: ['scenario'] } },
    render: ({ scenario }) => (
        <AvvikRegisterinntektOppgavePanel
            oppgave={lagOppgaveMedScenario(mockAvvikRegisterinntektUPY, scenario)}
            navn="SNODIG VAFFEL"
            initialVisKvittering={true}
        />
    ),
};

export const Besvart: Story = {
    name: 'Besvart',
    argTypes: {
        scenario: scenarioArgType,
        variant: { control: 'radio', options: ['Uten tilbakemelding', 'Med tilbakemelding'] },
    },
    args: { scenario: 'Én arbeidsgiver', variant: 'Uten tilbakemelding' },
    parameters: { controls: { include: ['scenario', 'variant'] } },
    render: ({ scenario, variant }) => (
        <AvvikRegisterinntektOppgavePanel
            oppgave={{
                ...lagOppgaveMedScenario(mockAvvikRegisterinntektBesvartUPY, scenario),
                respons:
                    variant === 'Med tilbakemelding'
                        ? {
                              type: 'VARSEL_SVAR',
                              harUttalelse: true,
                              uttalelseFraBruker: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
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
        <AvvikRegisterinntektOppgavePanel
            oppgave={{ ...mockAvvikRegisterinntektUPY, status: OppgaveStatus.UTLØPT, løstDato: new Date() }}
            navn="SNODIG VAFFEL"
        />
    ),
};

export const Avbrutt: Story = {
    name: 'Avbrutt',
    parameters: { controls: { disable: true } },
    render: () => (
        <AvvikRegisterinntektOppgavePanel
            oppgave={{ ...mockAvvikRegisterinntektUPY, status: OppgaveStatus.AVBRUTT, løstDato: new Date() }}
            navn="SNODIG VAFFEL"
        />
    ),
};

import { Heading, VStack } from '@navikt/ds-react';
import { OppgaveStatus, OppgaveYtelsetype } from '@navikt/ung-brukerdialog-api';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { OppgaverList } from '../../../components';
import { OppgavePageDecorator } from '../../../storybook/OppgavePageDecorator';
import { StorybookDecorator } from '../../../storybook/StorybookDecorator';
import { AvvikRegisterinntektOppgavePanel } from './AvvikRegisterinntektOppgavePanel';
import {
    AVVIK_SCENARIO_OPTIONS,
    AvvikScenario,
    lagAvvikRegisterinntektBesvartOppgave,
    lagAvvikRegisterinntektOppgave,
    lagOppgaveMedScenario,
} from './AvvikRegisterinntektOppgavePanel.mockData';

const defaultYtelse = OppgaveYtelsetype.UNGDOMSYTELSE;

const meta: Meta = {
    title: 'Oppgaver/1. Felles/Avvik registerinntekt',
    decorators: [StorybookDecorator, OppgavePageDecorator],
};
export default meta;

type Args = { scenario: AvvikScenario; variant?: string; ytelse: OppgaveYtelsetype };
type Story = StoryObj<Args>;

const scenarioArgType = {
    control: 'radio' as const,
    options: AVVIK_SCENARIO_OPTIONS,
};
const ytelseArgType = {
    control: 'radio' as const,
    options: [OppgaveYtelsetype.UNGDOMSYTELSE, OppgaveYtelsetype.AKTIVITETSPENGER],
};

export const Ubesvart: Story = {
    name: 'Ubesvart',
    argTypes: { scenario: scenarioArgType, ytelse: ytelseArgType },
    args: { scenario: 'Én arbeidsgiver', ytelse: defaultYtelse },
    parameters: { controls: { include: ['scenario', 'ytelse'] } },
    render: ({ scenario, ytelse }) => (
        <AvvikRegisterinntektOppgavePanel
            oppgave={lagOppgaveMedScenario(lagAvvikRegisterinntektOppgave(ytelse), scenario)}
            navn="SNODIG VAFFEL"
        />
    ),
};

export const Forsidevisning: Story = {
    name: 'Forsidevisning',
    parameters: { controls: { disable: true } },
    render: () => {
        const oppgave = lagAvvikRegisterinntektOppgave(defaultYtelse);
        return (
            <VStack gap="space-40">
                <VStack gap="space-16">
                    <Heading level="2" size="medium">
                        Uløst oppgave
                    </Heading>
                    <OppgaverList oppgaver={[oppgave]} />
                </VStack>
                <VStack gap="space-16">
                    <Heading level="2" size="medium">
                        Løste oppgaver
                    </Heading>
                    <OppgaverList
                        visBeskrivelse={false}
                        oppgaveStatusTagVariant="text"
                        oppgaver={[
                            { ...oppgave, status: OppgaveStatus.AVBRUTT },
                            { ...oppgave, status: OppgaveStatus.UTLØPT },
                            { ...oppgave, status: OppgaveStatus.LØST },
                        ]}
                    />
                </VStack>
            </VStack>
        );
    },
};

export const Kvittering: Story = {
    name: 'Kvittering',
    argTypes: { scenario: scenarioArgType, ytelse: ytelseArgType },
    args: { scenario: 'Én arbeidsgiver', ytelse: defaultYtelse },
    parameters: { controls: { include: ['scenario', 'ytelse'] } },
    render: ({ scenario, ytelse }) => (
        <AvvikRegisterinntektOppgavePanel
            oppgave={lagOppgaveMedScenario(lagAvvikRegisterinntektOppgave(ytelse), scenario)}
            navn="SNODIG VAFFEL"
            initialVisKvittering={true}
        />
    ),
};

export const Besvart: Story = {
    name: 'Besvart',
    argTypes: {
        scenario: scenarioArgType,
        ytelse: ytelseArgType,
        variant: { control: 'radio', options: ['Uten tilbakemelding', 'Med tilbakemelding'] },
    },
    args: { scenario: 'Én arbeidsgiver', variant: 'Uten tilbakemelding', ytelse: defaultYtelse },
    parameters: { controls: { include: ['scenario', 'ytelse', 'variant'] } },
    render: ({ scenario, ytelse, variant }) => (
        <AvvikRegisterinntektOppgavePanel
            oppgave={{
                ...lagOppgaveMedScenario(lagAvvikRegisterinntektBesvartOppgave(ytelse), scenario),
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
    argTypes: { ytelse: ytelseArgType },
    args: { ytelse: defaultYtelse },
    parameters: { controls: { include: ['ytelse'] } },
    render: ({ ytelse }) => (
        <AvvikRegisterinntektOppgavePanel
            oppgave={{ ...lagAvvikRegisterinntektOppgave(ytelse), status: OppgaveStatus.UTLØPT, løstDato: new Date() }}
            navn="SNODIG VAFFEL"
        />
    ),
};

export const Avbrutt: Story = {
    name: 'Avbrutt',
    argTypes: { ytelse: ytelseArgType },
    args: { ytelse: defaultYtelse },
    parameters: { controls: { include: ['ytelse'] } },
    render: ({ ytelse }) => (
        <AvvikRegisterinntektOppgavePanel
            oppgave={{ ...lagAvvikRegisterinntektOppgave(ytelse), status: OppgaveStatus.AVBRUTT, løstDato: new Date() }}
            navn="SNODIG VAFFEL"
        />
    ),
};

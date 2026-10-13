import { Heading, VStack } from '@navikt/ds-react';
import { OppgaveStatus, OppgaveYtelsetype } from '@navikt/ung-brukerdialog-api';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { OppgaverList } from '../../../components';
import { OppgavePageDecorator } from '../../../storybook/OppgavePageDecorator';
import { StorybookDecorator } from '../../../storybook/StorybookDecorator';
import { RapporterInntektOppgavePanel } from './RapporterInntektOppgavePanel';
import {
    lagRapporterInntektBesvartOppgave,
    lagRapporterInntektOppgave,
    lagRapporterInntektOppgaveMedScenario,
    RAPPORTER_INNTEKT_SCENARIO_OPTIONS,
    RapporterInntektScenario,
} from './RapporterInntektOppgavePanel.mockData';

const defaultYtelse = OppgaveYtelsetype.UNGDOMSYTELSE;

const meta: Meta = {
    title: 'Oppgaver/1. Felles/Rapporter inntekt',
    decorators: [StorybookDecorator, OppgavePageDecorator],
};
export default meta;

type KvitteringVariant = 'Har hatt inntekt' | 'Ingen inntekt';
type StoryArgs = {
    scenario: RapporterInntektScenario;
    kvitteringVariant: KvitteringVariant;
    ytelse: OppgaveYtelsetype;
};
type Story = StoryObj<StoryArgs>;

const scenarioArgType = {
    control: 'radio' as const,
    options: RAPPORTER_INNTEKT_SCENARIO_OPTIONS,
};
const ytelseArgType = {
    control: 'radio' as const,
    options: [OppgaveYtelsetype.UNGDOMSYTELSE, OppgaveYtelsetype.AKTIVITETSPENGER],
};

export const Ubesvart: Story = {
    name: 'Ubesvart',
    argTypes: { scenario: scenarioArgType, ytelse: ytelseArgType },
    args: { scenario: 'Hel måned', kvitteringVariant: 'Har hatt inntekt', ytelse: defaultYtelse },
    parameters: { controls: { include: ['scenario', 'ytelse'] } },
    render: ({ scenario, ytelse }) => (
        <RapporterInntektOppgavePanel
            oppgave={lagRapporterInntektOppgaveMedScenario(lagRapporterInntektOppgave(ytelse), scenario)}
            navn="SNODIG VAFFEL"
        />
    ),
};

export const Forsidevisning: Story = {
    name: 'Forsidevisning',
    parameters: { controls: { disable: true } },
    render: () => {
        const oppgave = lagRapporterInntektOppgave(defaultYtelse);
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
    argTypes: {
        scenario: scenarioArgType,
        ytelse: ytelseArgType,
        kvitteringVariant: {
            control: 'radio',
            options: ['Har hatt inntekt', 'Ingen inntekt'],
        },
    },
    args: { scenario: 'Hel måned', kvitteringVariant: 'Har hatt inntekt', ytelse: defaultYtelse },
    parameters: { controls: { include: ['scenario', 'ytelse', 'kvitteringVariant'] } },
    render: ({ scenario, ytelse, kvitteringVariant }) => (
        <RapporterInntektOppgavePanel
            oppgave={lagRapporterInntektOppgaveMedScenario(lagRapporterInntektOppgave(ytelse), scenario)}
            navn="SNODIG VAFFEL"
            initialKvitteringData={{ harHattInntektOver0: kvitteringVariant === 'Har hatt inntekt' }}
        />
    ),
};

export const Besvart: Story = {
    name: 'Besvart',
    argTypes: { scenario: scenarioArgType, ytelse: ytelseArgType },
    args: { scenario: 'Hel måned', kvitteringVariant: 'Har hatt inntekt', ytelse: defaultYtelse },
    parameters: { controls: { include: ['scenario', 'ytelse'] } },
    render: ({ scenario, ytelse }) => (
        <RapporterInntektOppgavePanel
            oppgave={lagRapporterInntektOppgaveMedScenario(lagRapporterInntektBesvartOppgave(ytelse), scenario)}
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
        <RapporterInntektOppgavePanel
            oppgave={{ ...lagRapporterInntektOppgave(ytelse), status: OppgaveStatus.UTLØPT, løstDato: new Date() }}
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
        <RapporterInntektOppgavePanel
            oppgave={{ ...lagRapporterInntektOppgave(ytelse), status: OppgaveStatus.AVBRUTT, løstDato: new Date() }}
            navn="SNODIG VAFFEL"
        />
    ),
};

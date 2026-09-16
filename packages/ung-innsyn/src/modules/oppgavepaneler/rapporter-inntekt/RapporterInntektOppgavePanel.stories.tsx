import { Heading, VStack } from '@navikt/ds-react';
import { OppgaveStatus } from '@navikt/ung-brukerdialog-api';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { OppgaverList } from '../../../components';
import { OppgavePageDecorator } from '../../../storybook/OppgavePageDecorator';
import { StorybookDecorator } from '../../../storybook/StorybookDecorator';
import { RapporterInntektOppgavePanel } from './RapporterInntektOppgavePanel';
import {
    lagRapporterInntektOppgaveMedScenario,
    mockRapporterInntektBesvartUPY,
    mockRapporterInntektUPY,
    RAPPORTER_INNTEKT_SCENARIO_OPTIONS,
    RapporterInntektScenario,
} from './RapporterInntektOppgavePanel.mockData';

const meta: Meta = {
    title: 'Oppgaver/Ungdomsprogramytelsen/Rapporter inntekt',
    decorators: [StorybookDecorator, OppgavePageDecorator],
};
export default meta;

type KvitteringVariant = 'Har hatt inntekt' | 'Ingen inntekt';
type StoryArgs = { scenario: RapporterInntektScenario; kvitteringVariant: KvitteringVariant };
type Story = StoryObj<StoryArgs>;

const scenarioArgType = {
    control: 'radio' as const,
    options: RAPPORTER_INNTEKT_SCENARIO_OPTIONS,
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
                <OppgaverList oppgaver={[mockRapporterInntektUPY]} />
            </VStack>
            <VStack gap="space-16">
                <Heading level="2" size="medium">
                    Løste oppgaver
                </Heading>
                <OppgaverList
                    visBeskrivelse={false}
                    oppgaveStatusTagVariant="text"
                    oppgaver={[
                        { ...mockRapporterInntektUPY, status: OppgaveStatus.AVBRUTT },
                        { ...mockRapporterInntektUPY, status: OppgaveStatus.UTLØPT },
                        { ...mockRapporterInntektUPY, status: OppgaveStatus.LØST },
                    ]}
                />
            </VStack>
        </VStack>
    ),
};

export const Ubesvart: Story = {
    name: 'Ubesvart',
    argTypes: { scenario: scenarioArgType },
    args: { scenario: 'Hel måned', kvitteringVariant: 'Har hatt inntekt' },
    parameters: { controls: { include: ['scenario'] } },
    render: ({ scenario }) => (
        <RapporterInntektOppgavePanel
            oppgave={lagRapporterInntektOppgaveMedScenario(mockRapporterInntektUPY, scenario)}
            navn="SNODIG VAFFEL"
        />
    ),
};

export const Kvittering: Story = {
    name: 'Kvittering',
    argTypes: {
        scenario: scenarioArgType,
        kvitteringVariant: {
            control: 'radio',
            options: ['Har hatt inntekt', 'Ingen inntekt'],
        },
    },
    args: { scenario: 'Hel måned', kvitteringVariant: 'Har hatt inntekt' },
    parameters: { controls: { include: ['scenario', 'kvitteringVariant'] } },
    render: ({ scenario, kvitteringVariant }) => (
        <RapporterInntektOppgavePanel
            oppgave={lagRapporterInntektOppgaveMedScenario(mockRapporterInntektUPY, scenario)}
            navn="SNODIG VAFFEL"
            initialKvitteringData={{ harHattInntektOver0: kvitteringVariant === 'Har hatt inntekt' }}
        />
    ),
};

export const Besvart: Story = {
    name: 'Besvart',
    argTypes: { scenario: scenarioArgType },
    args: { scenario: 'Hel måned', kvitteringVariant: 'Har hatt inntekt' },
    parameters: { controls: { include: ['scenario'] } },
    render: ({ scenario }) => (
        <RapporterInntektOppgavePanel
            oppgave={lagRapporterInntektOppgaveMedScenario(mockRapporterInntektBesvartUPY, scenario)}
            navn="SNODIG VAFFEL"
        />
    ),
};

export const Utløpt: Story = {
    name: 'Utløpt',
    parameters: { controls: { disable: true } },
    render: () => (
        <RapporterInntektOppgavePanel
            oppgave={{ ...mockRapporterInntektUPY, status: OppgaveStatus.UTLØPT, løstDato: new Date() }}
            navn="SNODIG VAFFEL"
        />
    ),
};

export const Avbrutt: Story = {
    name: 'Avbrutt',
    parameters: { controls: { disable: true } },
    render: () => (
        <RapporterInntektOppgavePanel
            oppgave={{ ...mockRapporterInntektUPY, status: OppgaveStatus.AVBRUTT, løstDato: new Date() }}
            navn="SNODIG VAFFEL"
        />
    ),
};

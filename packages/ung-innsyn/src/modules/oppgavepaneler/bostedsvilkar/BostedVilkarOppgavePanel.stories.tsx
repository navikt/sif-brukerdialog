import { Heading, VStack } from '@navikt/ds-react';
import { BostedsavklaringKildeType, BostedsvilkårIkkeOppfyltÅrsak, OppgaveStatus } from '@navikt/ung-brukerdialog-api';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { OppgaverList } from '../../../components';
import { OppgavePageDecorator } from '../../../storybook/OppgavePageDecorator';
import { StorybookDecorator } from '../../../storybook/StorybookDecorator';
import { BostedVilkårOppgavePanel } from './BostedVilkarOppgavePanel';
import {
    BOSTED_KILDE_SCENARIO_OPTIONS,
    BOSTED_VARIANT_SCENARIO_OPTIONS,
    BOSTED_ÅRSAK_SCENARIO_OPTIONS,
    BostedVarselVariant,
    lagOppgaveMedÅrsak,
    mockBostedVilkårAKT,
    mockBostedVilkårBesvartAKT,
} from './BostedVilkarOppgavePanel.mockData';

const meta: Meta = {
    title: 'Oppgaver/2. Aktivitetspenger/Bosted',
    decorators: [StorybookDecorator, OppgavePageDecorator],
};
export default meta;

type Args = {
    årsak: BostedsvilkårIkkeOppfyltÅrsak;
    kilde: BostedsavklaringKildeType;
    varselvariant: BostedVarselVariant;
    variant?: string;
};
type Story = StoryObj<Args>;

const årsakArgType = {
    control: 'radio' as const,
    options: BOSTED_ÅRSAK_SCENARIO_OPTIONS,
};

const kildeArgType = {
    control: 'radio' as const,
    options: BOSTED_KILDE_SCENARIO_OPTIONS,
};

const varselvariantArgType = {
    control: 'radio' as const,
    options: BOSTED_VARIANT_SCENARIO_OPTIONS,
};

const scenarioArgs = {
    årsak: BostedsvilkårIkkeOppfyltÅrsak.IKKE_BOSATTADRESSE_I_TRONDHEIM,
    kilde: BostedsavklaringKildeType.FOLKEREGISTER,
    varselvariant: 'Periode' as const,
};

export const Ubesvart: Story = {
    name: 'Ubesvart',
    argTypes: { årsak: årsakArgType, kilde: kildeArgType, varselvariant: varselvariantArgType },
    args: scenarioArgs,
    parameters: { controls: { include: ['årsak', 'kilde', 'varselvariant'] } },
    render: ({ årsak, kilde, varselvariant }) => (
        <BostedVilkårOppgavePanel
            oppgave={lagOppgaveMedÅrsak(mockBostedVilkårAKT, årsak, kilde, varselvariant)}
            navn="SNODIG VAFFEL"
        />
    ),
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
                <OppgaverList oppgaver={[mockBostedVilkårAKT]} />
            </VStack>
            <VStack gap="space-16">
                <Heading level="2" size="medium">
                    Løste oppgaver
                </Heading>
                <OppgaverList
                    visBeskrivelse={false}
                    oppgaveStatusTagVariant="text"
                    oppgaver={[
                        { ...mockBostedVilkårAKT, status: OppgaveStatus.AVBRUTT },
                        { ...mockBostedVilkårAKT, status: OppgaveStatus.UTLØPT },
                        { ...mockBostedVilkårAKT, status: OppgaveStatus.LØST },
                    ]}
                />
            </VStack>
        </VStack>
    ),
};

export const Kvittering: Story = {
    name: 'Kvittering',
    argTypes: { årsak: årsakArgType, kilde: kildeArgType, varselvariant: varselvariantArgType },
    args: scenarioArgs,
    parameters: { controls: { include: ['årsak', 'kilde', 'varselvariant'] } },
    render: ({ årsak, kilde, varselvariant }) => (
        <BostedVilkårOppgavePanel
            oppgave={lagOppgaveMedÅrsak(mockBostedVilkårAKT, årsak, kilde, varselvariant)}
            navn="SNODIG VAFFEL"
            initialVisKvittering={true}
        />
    ),
};

export const Besvart: Story = {
    name: 'Besvart',
    argTypes: {
        årsak: årsakArgType,
        kilde: kildeArgType,
        varselvariant: varselvariantArgType,
        variant: { control: 'radio', options: ['Uten tilbakemelding', 'Med tilbakemelding'] },
    },
    args: { ...scenarioArgs, variant: 'Uten tilbakemelding' },
    parameters: { controls: { include: ['årsak', 'kilde', 'varselvariant', 'variant'] } },
    render: ({ årsak, kilde, varselvariant, variant }) => (
        <BostedVilkårOppgavePanel
            oppgave={{
                ...lagOppgaveMedÅrsak(mockBostedVilkårBesvartAKT, årsak, kilde, varselvariant),
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
        <BostedVilkårOppgavePanel
            oppgave={{ ...mockBostedVilkårAKT, status: OppgaveStatus.UTLØPT, løstDato: new Date() }}
            navn="SNODIG VAFFEL"
        />
    ),
};

export const Avbrutt: Story = {
    name: 'Avbrutt',
    parameters: { controls: { disable: true } },
    render: () => (
        <BostedVilkårOppgavePanel
            oppgave={{ ...mockBostedVilkårAKT, status: OppgaveStatus.AVBRUTT, løstDato: new Date() }}
            navn="SNODIG VAFFEL"
        />
    ),
};

import { Heading, VStack } from '@navikt/ds-react';
import {
    AktivitetsavklaringKildeType,
    AktivitetsvilkåretIkkeOppfyltÅrsak,
    OppgaveStatus,
} from '@sif/ung-brukerdialog-api';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { OppgaverList } from '../../../components';
import { OppgavePageDecorator } from '../../../storybook/OppgavePageDecorator';
import { StorybookDecorator } from '../../../storybook/StorybookDecorator';
import { AktivitetVilkårOppgavePanel } from './AktivitetVilkarOppgavePanel';
import {
    AKTIVITET_ÅRSAK_SCENARIO_OPTIONS,
    AKTIVITET_KILDE_SCENARIO_OPTIONS,
    lagAktivitetOppgaveMedÅrsak,
    mockAktivitetVilkårAKT,
    mockAktivitetVilkårBesvartAKT,
} from './AktivitetVilkarOppgavePanel.mockData';

const meta: Meta = {
    title: 'Oppgaver/2. Aktivitetspenger/Aktivitet',
    decorators: [StorybookDecorator, OppgavePageDecorator],
};
export default meta;

type Args = {
    årsak: AktivitetsvilkåretIkkeOppfyltÅrsak;
    kilde: AktivitetsavklaringKildeType;
    variant?: string;
};
type Story = StoryObj<Args>;

const årsakArgType = { control: 'radio' as const, options: AKTIVITET_ÅRSAK_SCENARIO_OPTIONS };
const kildeArgType = { control: 'radio' as const, options: AKTIVITET_KILDE_SCENARIO_OPTIONS };

const scenarioArgs = {
    årsak: AktivitetsvilkåretIkkeOppfyltÅrsak.ANNET,
    kilde: AktivitetsavklaringKildeType.NAV,
};

export const Ubesvart: Story = {
    name: 'Ubesvart',
    argTypes: { årsak: årsakArgType, kilde: kildeArgType },
    args: scenarioArgs,
    parameters: { controls: { include: ['årsak', 'kilde'] } },
    render: ({ årsak, kilde }) => (
        <AktivitetVilkårOppgavePanel
            oppgave={lagAktivitetOppgaveMedÅrsak(mockAktivitetVilkårAKT, årsak, kilde)}
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
                <OppgaverList oppgaver={[mockAktivitetVilkårAKT]} />
            </VStack>
            <VStack gap="space-16">
                <Heading level="2" size="medium">
                    Løste oppgaver
                </Heading>
                <OppgaverList
                    visBeskrivelse={false}
                    oppgaveStatusTagVariant="text"
                    oppgaver={[
                        { ...mockAktivitetVilkårAKT, status: OppgaveStatus.AVBRUTT },
                        { ...mockAktivitetVilkårAKT, status: OppgaveStatus.UTLØPT },
                        { ...mockAktivitetVilkårAKT, status: OppgaveStatus.LØST },
                    ]}
                />
            </VStack>
        </VStack>
    ),
};

export const Kvittering: Story = {
    name: 'Kvittering',
    argTypes: { årsak: årsakArgType, kilde: kildeArgType },
    args: scenarioArgs,
    parameters: { controls: { include: ['årsak', 'kilde'] } },
    render: ({ årsak, kilde }) => (
        <AktivitetVilkårOppgavePanel
            oppgave={lagAktivitetOppgaveMedÅrsak(mockAktivitetVilkårAKT, årsak, kilde)}
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
        variant: { control: 'radio', options: ['Uten tilbakemelding', 'Med tilbakemelding'] },
    },
    args: { ...scenarioArgs, variant: 'Uten tilbakemelding' },
    parameters: { controls: { include: ['årsak', 'kilde', 'variant'] } },
    render: ({ årsak, kilde, variant }) => (
        <AktivitetVilkårOppgavePanel
            oppgave={{
                ...lagAktivitetOppgaveMedÅrsak(mockAktivitetVilkårBesvartAKT, årsak, kilde),
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
        <AktivitetVilkårOppgavePanel
            oppgave={{ ...mockAktivitetVilkårAKT, status: OppgaveStatus.UTLØPT, løstDato: new Date() }}
            navn="SNODIG VAFFEL"
        />
    ),
};

export const Avbrutt: Story = {
    name: 'Avbrutt',
    parameters: { controls: { disable: true } },
    render: () => (
        <AktivitetVilkårOppgavePanel
            oppgave={{ ...mockAktivitetVilkårAKT, status: OppgaveStatus.AVBRUTT, løstDato: new Date() }}
            navn="SNODIG VAFFEL"
        />
    ),
};

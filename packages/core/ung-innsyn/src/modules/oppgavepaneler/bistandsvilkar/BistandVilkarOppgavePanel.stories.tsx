import { Heading, VStack } from '@navikt/ds-react';
import { BistandsavklaringKildeType, BistandsvilkårIkkeOppfyltÅrsak, OppgaveStatus } from '@sif/ung-brukerdialog-api';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { OppgaverList } from '../../../components';
import { OppgavePageDecorator } from '../../../storybook/OppgavePageDecorator';
import { StorybookDecorator } from '../../../storybook/StorybookDecorator';
import { BistandVilkårOppgavePanel } from './BistandVilkarOppgavePanel';
import {
    BISTAND_ÅRSAK_SCENARIO_OPTIONS,
    BISTAND_KILDE_SCENARIO_OPTIONS,
    lagBistandOppgaveMedÅrsak,
    mockBistandVilkårAKT,
    mockBistandVilkårBesvartAKT,
} from './BistandVilkarOppgavePanel.mockData';

const meta: Meta = {
    title: 'Oppgaver/2. Aktivitetspenger/Bistand',
    decorators: [StorybookDecorator, OppgavePageDecorator],
};
export default meta;

type Args = {
    årsak: BistandsvilkårIkkeOppfyltÅrsak;
    kilde: BistandsavklaringKildeType;
    variant?: string;
};
type Story = StoryObj<Args>;

const årsakArgType = { control: 'radio' as const, options: BISTAND_ÅRSAK_SCENARIO_OPTIONS };
const kildeArgType = { control: 'radio' as const, options: BISTAND_KILDE_SCENARIO_OPTIONS };

const scenarioArgs = {
    årsak: BistandsvilkårIkkeOppfyltÅrsak.KOMMET_I_ARBEID,
    kilde: BistandsavklaringKildeType.NAV,
};

export const Ubesvart: Story = {
    name: 'Ubesvart',
    argTypes: { årsak: årsakArgType, kilde: kildeArgType },
    args: scenarioArgs,
    parameters: { controls: { include: ['årsak', 'kilde'] } },
    render: ({ årsak, kilde }) => (
        <BistandVilkårOppgavePanel
            oppgave={lagBistandOppgaveMedÅrsak(mockBistandVilkårAKT, årsak, kilde)}
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
                <OppgaverList oppgaver={[mockBistandVilkårAKT]} />
            </VStack>
            <VStack gap="space-16">
                <Heading level="2" size="medium">
                    Løste oppgaver
                </Heading>
                <OppgaverList
                    visBeskrivelse={false}
                    oppgaveStatusTagVariant="text"
                    oppgaver={[
                        { ...mockBistandVilkårAKT, status: OppgaveStatus.AVBRUTT },
                        { ...mockBistandVilkårAKT, status: OppgaveStatus.UTLØPT },
                        { ...mockBistandVilkårAKT, status: OppgaveStatus.LØST },
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
        <BistandVilkårOppgavePanel
            oppgave={lagBistandOppgaveMedÅrsak(mockBistandVilkårAKT, årsak, kilde)}
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
        <BistandVilkårOppgavePanel
            oppgave={{
                ...lagBistandOppgaveMedÅrsak(mockBistandVilkårBesvartAKT, årsak, kilde),
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
        <BistandVilkårOppgavePanel
            oppgave={{ ...mockBistandVilkårAKT, status: OppgaveStatus.UTLØPT, løstDato: new Date() }}
            navn="SNODIG VAFFEL"
        />
    ),
};

export const Avbrutt: Story = {
    name: 'Avbrutt',
    parameters: { controls: { disable: true } },
    render: () => (
        <BistandVilkårOppgavePanel
            oppgave={{ ...mockBistandVilkårAKT, status: OppgaveStatus.AVBRUTT, løstDato: new Date() }}
            navn="SNODIG VAFFEL"
        />
    ),
};

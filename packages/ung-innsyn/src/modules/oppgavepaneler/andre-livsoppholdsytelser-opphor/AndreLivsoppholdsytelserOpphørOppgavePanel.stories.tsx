import { Heading, VStack } from '@navikt/ds-react';
import {
    AndreLivsoppholdsytelserAvklaringKildeType,
    AndreLivsoppholdsytelserIkkeOppfyltÅrsak,
    OppgaveStatus,
} from '@navikt/ung-brukerdialog-api';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { OppgaverList } from '../../../components';
import { OppgavePageDecorator } from '../../../storybook/OppgavePageDecorator';
import { StorybookDecorator } from '../../../storybook/StorybookDecorator';
import { AndreLivsoppholdsytelserOpphørOppgavePanel } from './AndreLivsoppholdsytelserOpphørOppgavePanel';
import {
    ANDRE_LIVSOPPHOLDSYTELSER_OPPHØR_KILDE_SCENARIO_OPTIONS,
    ANDRE_LIVSOPPHOLDSYTELSER_OPPHØR_ÅRSAK_SCENARIO_OPTIONS,
    lagOpphørOppgaveMedÅrsak,
    mockAndreLivsoppholdsytelserOpphørAKT,
    mockAndreLivsoppholdsytelserOpphørBesvartAKT,
} from './AndreLivsoppholdsytelserOpphørOppgavePanel.mockData';

const meta: Meta = {
    title: 'Oppgaver/Aktivitetspenger/Opphør/Andre livsoppholdsytelser opphør',
    decorators: [StorybookDecorator, OppgavePageDecorator],
};
export default meta;

type Args = {
    årsak: AndreLivsoppholdsytelserIkkeOppfyltÅrsak;
    kilde: AndreLivsoppholdsytelserAvklaringKildeType;
    variant?: string;
};
type Story = StoryObj<Args>;

const årsakArgType = {
    control: 'radio' as const,
    options: ANDRE_LIVSOPPHOLDSYTELSER_OPPHØR_ÅRSAK_SCENARIO_OPTIONS,
};

const kildeArgType = {
    control: 'radio' as const,
    options: ANDRE_LIVSOPPHOLDSYTELSER_OPPHØR_KILDE_SCENARIO_OPTIONS,
};

export const Ubesvart: Story = {
    name: 'Ubesvart',
    argTypes: { årsak: årsakArgType, kilde: kildeArgType },
    args: {
        årsak: AndreLivsoppholdsytelserIkkeOppfyltÅrsak.MOTTAR_ANNEN_YTELSE,
        kilde: AndreLivsoppholdsytelserAvklaringKildeType.ANNET,
    },
    parameters: { controls: { include: ['årsak', 'kilde'] } },
    render: ({ årsak, kilde }) => (
        <AndreLivsoppholdsytelserOpphørOppgavePanel
            oppgave={lagOpphørOppgaveMedÅrsak(mockAndreLivsoppholdsytelserOpphørAKT, årsak, kilde)}
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
                <OppgaverList oppgaver={[mockAndreLivsoppholdsytelserOpphørAKT]} />
            </VStack>
            <VStack gap="space-16">
                <Heading level="2" size="medium">
                    Løste oppgaver
                </Heading>
                <OppgaverList
                    visBeskrivelse={false}
                    oppgaveStatusTagVariant="text"
                    oppgaver={[
                        { ...mockAndreLivsoppholdsytelserOpphørAKT, status: OppgaveStatus.AVBRUTT },
                        { ...mockAndreLivsoppholdsytelserOpphørAKT, status: OppgaveStatus.UTLØPT },
                        { ...mockAndreLivsoppholdsytelserOpphørAKT, status: OppgaveStatus.LØST },
                    ]}
                />
            </VStack>
        </VStack>
    ),
};

export const Kvittering: Story = {
    name: 'Kvittering',
    argTypes: { årsak: årsakArgType, kilde: kildeArgType },
    args: {
        årsak: AndreLivsoppholdsytelserIkkeOppfyltÅrsak.MOTTAR_ANNEN_YTELSE,
        kilde: AndreLivsoppholdsytelserAvklaringKildeType.ANNET,
    },
    parameters: { controls: { include: ['årsak', 'kilde'] } },
    render: ({ årsak, kilde }) => (
        <AndreLivsoppholdsytelserOpphørOppgavePanel
            oppgave={lagOpphørOppgaveMedÅrsak(mockAndreLivsoppholdsytelserOpphørAKT, årsak, kilde)}
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
    args: {
        årsak: AndreLivsoppholdsytelserIkkeOppfyltÅrsak.MOTTAR_ANNEN_YTELSE,
        kilde: AndreLivsoppholdsytelserAvklaringKildeType.ANNET,
        variant: 'Uten tilbakemelding',
    },
    parameters: { controls: { include: ['årsak', 'kilde', 'variant'] } },
    render: ({ årsak, kilde, variant }) => (
        <AndreLivsoppholdsytelserOpphørOppgavePanel
            oppgave={{
                ...lagOpphørOppgaveMedÅrsak(mockAndreLivsoppholdsytelserOpphørBesvartAKT, årsak, kilde),
                respons:
                    variant === 'Med tilbakemelding'
                        ? {
                              type: 'VARSEL_SVAR',
                              harUttalelse: true,
                              uttalelseFraBruker:
                                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
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
        <AndreLivsoppholdsytelserOpphørOppgavePanel
            oppgave={{
                ...mockAndreLivsoppholdsytelserOpphørAKT,
                status: OppgaveStatus.UTLØPT,
                løstDato: new Date(),
            }}
            navn="SNODIG VAFFEL"
        />
    ),
};

export const Avbrutt: Story = {
    name: 'Avbrutt',
    parameters: { controls: { disable: true } },
    render: () => (
        <AndreLivsoppholdsytelserOpphørOppgavePanel
            oppgave={{
                ...mockAndreLivsoppholdsytelserOpphørAKT,
                status: OppgaveStatus.AVBRUTT,
                løstDato: new Date(),
            }}
            navn="SNODIG VAFFEL"
        />
    ),
};

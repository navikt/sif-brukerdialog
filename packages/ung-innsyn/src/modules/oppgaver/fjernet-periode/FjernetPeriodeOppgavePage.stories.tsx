import { Heading, VStack } from '@navikt/ds-react';
import { OppgaveStatus } from '@navikt/ung-brukerdialog-api';
import { FjernetPeriodeOppgave, ParsedOppgavetype } from '@sif/api/ung-brukerdialog';
import type { Meta, StoryObj } from '@storybook/react-vite';
import dayjs from 'dayjs';

import { OppgaverList } from '../../../components';
import { OppgavePageDecorator } from '../../../storybook/OppgavePageDecorator';
import { StorybookDecorator } from '../../../storybook/StorybookDecorator';
import { FjernetPeriodeOppgavePage } from './FjernetPeriodeOppgavePage';

const meta: Meta = {
    title: 'Oppgaver/6. Fjernet periode',
    parameters: {},
    decorators: [StorybookDecorator, OppgavePageDecorator],
};
export default meta;

type Story = StoryObj;

const oppgave: FjernetPeriodeOppgave = {
    oppgaveReferanse: '3d3e98b5-48e7-42c6-9fc1-e0f78022307f',
    oppgavetype: ParsedOppgavetype.BEKREFT_FJERNET_PERIODE,
    status: OppgaveStatus.ULØST,
    opprettetDato: dayjs().subtract(1, 'days').toDate(),
    sisteDatoEnKanSvare: dayjs().add(14, 'days').toDate(),
};

const besvartOppgave: FjernetPeriodeOppgave = {
    ...oppgave,
    respons: {
        type: 'VARSEL_SVAR',
        harUttalelse: false,
    },
    status: OppgaveStatus.LØST,
    løstDato: dayjs().toDate(),
};

export const OppgavePanel: Story = {
    name: 'Oppgavevisning på forside',
    render: () => (
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
    ),
};

export const UbesvartOppgave: Story = {
    name: 'Ubesvart oppgave',
    render: () => <FjernetPeriodeOppgavePage oppgave={oppgave} navn="SNODIG VAFFEL" />,
};

export const OppgaveKvittering: Story = {
    name: 'Kvittering',
    render: () => <FjernetPeriodeOppgavePage oppgave={oppgave} navn="SNODIG VAFFEL" initialVisKvittering={true} />,
};

export const BesvartOppgave: Story = {
    name: 'Besvart oppgave',
    render: () => <FjernetPeriodeOppgavePage oppgave={besvartOppgave} navn="SNODIG VAFFEL" />,
};

export const BesvartOppgaveMedTilbakemelding: Story = {
    name: 'Besvart oppgave med tilbakemelding',
    render: () => (
        <FjernetPeriodeOppgavePage
            oppgave={{
                ...besvartOppgave,
                respons: {
                    type: 'VARSEL_SVAR',
                    harUttalelse: true,
                    uttalelseFraBruker:
                        'Lore, ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                },
            }}
            navn="SNODIG VAFFEL"
        />
    ),
};

export const AvbruttOppgave: Story = {
    name: 'Avbrutt oppgave',
    render: () => (
        <FjernetPeriodeOppgavePage
            oppgave={{ ...besvartOppgave, respons: undefined, status: OppgaveStatus.AVBRUTT }}
            navn="SNODIG VAFFEL"
        />
    ),
};

export const UtløptOppgave: Story = {
    name: 'Utløpt oppgave',
    render: () => (
        <FjernetPeriodeOppgavePage
            oppgave={{ ...besvartOppgave, respons: undefined, status: OppgaveStatus.UTLØPT }}
            navn="SNODIG VAFFEL"
        />
    ),
};

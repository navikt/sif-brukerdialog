import OppgaverList from '@innsyn/components/oppgaver-list/OppgaverList';
import { Heading, VStack } from '@navikt/ds-react';
import { OppgaveStatus } from '@navikt/ung-deltakelse-opplyser-api-deltaker';
import { useWithInnsynApp } from '@shared/storybook/decorators/withInnsynApp';
import { withIntl } from '@shared/storybook/decorators/withIntl';
import { withQueryClient } from '@shared/storybook/decorators/withQueryClient';
import { withRouter } from '@shared/storybook/decorators/withRouter';
import { EndretStartdatoOppgave, ParsedOppgavetype } from '@shared/types/Oppgave';
import type { Meta, StoryObj } from '@storybook/react-vite';
import dayjs from 'dayjs';

import EndretStartdatoOppgavePage from './EndretStartdatoOppgavePage';

const meta: Meta = {
    title: 'Innsyn/Oppgaver/2. Endret startdato',
    parameters: {},
    decorators: [withIntl, withRouter, withQueryClient, (Story) => useWithInnsynApp(Story)],
};
export default meta;

type Story = StoryObj;

const oppgave: EndretStartdatoOppgave = {
    oppgaveReferanse: '3d3e98b5-48e7-42c6-9fc1-e0f78022307f',
    oppgavetype: ParsedOppgavetype.BEKREFT_ENDRET_STARTDATO,
    oppgavetypeData: {
        nyStartdato: dayjs('2025-05-01').toDate(),
        forrigeStartdato: dayjs('2025-05-05').toDate(),
    },
    status: OppgaveStatus.ULØST,
    opprettetDato: dayjs().subtract(1, 'days').toDate(),
    sisteDatoEnKanSvare: dayjs().add(14, 'days').toDate(),
};

const besvartOppgave: EndretStartdatoOppgave = {
    ...oppgave,
    bekreftelse: {
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
    render: () => <EndretStartdatoOppgavePage oppgave={oppgave} deltakerNavn="SNODIG VAFFEL" />,
};

export const Kvittering: Story = {
    name: 'Kvittering',
    render: () => (
        <EndretStartdatoOppgavePage oppgave={oppgave} deltakerNavn="SNODIG VAFFEL" initialVisKvittering={true} />
    ),
};

export const BesvartOppgave: Story = {
    name: 'Besvart oppgave',
    render: () => <EndretStartdatoOppgavePage oppgave={besvartOppgave} deltakerNavn="SNODIG VAFFEL" />,
};

export const BesvartOppgaveMedTilbakemelding: Story = {
    name: 'Besvart oppgave med tilbakemelding',
    render: () => (
        <EndretStartdatoOppgavePage
            oppgave={{
                ...besvartOppgave,
                bekreftelse: {
                    harUttalelse: true,
                    uttalelseFraBruker:
                        'Lore, ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                },
            }}
            deltakerNavn="SNODIG VAFFEL"
        />
    ),
};

export const AvbruttOppgave: Story = {
    name: 'Avbrutt oppgave',
    render: () => (
        <EndretStartdatoOppgavePage
            oppgave={{ ...besvartOppgave, bekreftelse: undefined, status: OppgaveStatus.AVBRUTT }}
            deltakerNavn="SNODIG VAFFEL"
        />
    ),
};

export const UtløptOppgave: Story = {
    name: 'Utløpt oppgave',
    render: () => (
        <EndretStartdatoOppgavePage
            oppgave={{ ...besvartOppgave, bekreftelse: undefined, status: OppgaveStatus.UTLØPT }}
            deltakerNavn="SNODIG VAFFEL"
        />
    ),
};

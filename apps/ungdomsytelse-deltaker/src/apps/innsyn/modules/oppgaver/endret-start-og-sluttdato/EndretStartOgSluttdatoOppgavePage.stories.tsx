import OppgaverList from '@innsyn/components/oppgaver-list/OppgaverList';
import { Heading, VStack } from '@navikt/ds-react';
import { OppgaveStatus } from '@navikt/ung-deltakelse-opplyser-api-deltaker';
import { useWithInnsynApp } from '@shared/storybook/decorators/withInnsynApp';
import { withIntl } from '@shared/storybook/decorators/withIntl';
import { withQueryClient } from '@shared/storybook/decorators/withQueryClient';
import { withRouter } from '@shared/storybook/decorators/withRouter';
import { EndretStartOgSluttdatoOppgave, ParsedOppgavetype } from '@shared/types/Oppgave';
import type { Meta, StoryObj } from '@storybook/react-vite';
import dayjs from 'dayjs';

import EndretStartOgSluttdatoOppgavePage from './EndretStartOgSluttdatoOppgavePage';

const meta: Meta = {
    title: 'Innsyn/Oppgaver/5. Endret startdato og sluttdato',
    parameters: {},
    decorators: [withIntl, withRouter, withQueryClient, (Story) => useWithInnsynApp(Story)],
};
export default meta;

type Story = StoryObj;

const oppgave: EndretStartOgSluttdatoOppgave = {
    oppgaveReferanse: '3d3e98b5-48e7-42c6-9fc1-e0f78022307f',
    oppgavetype: ParsedOppgavetype.BEKREFT_ENDRET_START_OG_SLUTTDATO,
    oppgavetypeData: {
        forrigePeriode: { from: dayjs('2025-05-04').toDate() },
        nyPeriode: {
            from: dayjs('2025-05-01').toDate(),
            to: dayjs('2025-08-01').toDate(),
        },
    },
    status: OppgaveStatus.ULØST,
    opprettetDato: dayjs().subtract(1, 'days').toDate(),
    sisteDatoEnKanSvare: dayjs().add(14, 'days').toDate(),
};

const besvartOppgave: EndretStartOgSluttdatoOppgave = {
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
        <VStack gap="10">
            <VStack gap="4">
                <Heading level="2" size="medium">
                    Uløst oppgave
                </Heading>
                <OppgaverList oppgaver={[oppgave]} />
            </VStack>
            <VStack gap="4">
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
    render: () => <EndretStartOgSluttdatoOppgavePage oppgave={oppgave} deltakerNavn="SNODIG VAFFEL" />,
};

export const Kvittering: Story = {
    name: 'Kvittering',
    render: () => (
        <EndretStartOgSluttdatoOppgavePage oppgave={oppgave} deltakerNavn="SNODIG VAFFEL" initialVisKvittering={true} />
    ),
};

export const BesvartOppgave: Story = {
    name: 'Besvart oppgave',
    render: () => <EndretStartOgSluttdatoOppgavePage oppgave={besvartOppgave} deltakerNavn="SNODIG VAFFEL" />,
};

export const BesvartOppgaveMedTilbakemelding: Story = {
    name: 'Besvart oppgave med tilbakemelding',
    render: () => (
        <EndretStartOgSluttdatoOppgavePage
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
        <EndretStartOgSluttdatoOppgavePage
            oppgave={{ ...besvartOppgave, bekreftelse: undefined, status: OppgaveStatus.AVBRUTT }}
            deltakerNavn="SNODIG VAFFEL"
        />
    ),
};

export const UtløptOppgave: Story = {
    name: 'Utløpt oppgave',
    render: () => (
        <EndretStartOgSluttdatoOppgavePage
            oppgave={{ ...besvartOppgave, bekreftelse: undefined, status: OppgaveStatus.UTLØPT }}
            deltakerNavn="SNODIG VAFFEL"
        />
    ),
};

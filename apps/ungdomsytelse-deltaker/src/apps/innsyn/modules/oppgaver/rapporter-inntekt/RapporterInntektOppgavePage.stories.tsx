import OppgaverList from '@innsyn/components/oppgaver-list/OppgaverList';
import { Heading, VStack } from '@navikt/ds-react';
import { OppgaveStatus } from '@navikt/ung-deltakelse-opplyser-api-deltaker';
import { useWithInnsynApp } from '@shared/storybook/decorators/withInnsynApp';
import { withIntl } from '@shared/storybook/decorators/withIntl';
import { withQueryClient } from '@shared/storybook/decorators/withQueryClient';
import { withRouter } from '@shared/storybook/decorators/withRouter';
import { ParsedOppgavetype, RapporterInntektOppgave } from '@shared/types/Oppgave';
import type { Meta, StoryObj } from '@storybook/react-vite';
import dayjs from 'dayjs';

import RapporterInntektOppgavePage from './RapporterInntektOppgavePage';

const meta: Meta = {
    title: 'Innsyn/Oppgaver/8. Rapporter inntekt',
    parameters: {},
    decorators: [withIntl, withRouter, withQueryClient, (Story) => useWithInnsynApp(Story)],
};
export default meta;

type Story = StoryObj;

const oppgave: RapporterInntektOppgave = {
    oppgaveReferanse: '3d3e98b5-48e7-42c6-9fc1-e0f78022307f',
    oppgavetype: ParsedOppgavetype.RAPPORTER_INNTEKT,
    oppgavetypeData: {
        fraOgMed: dayjs('2025-05-01').toDate(),
        tilOgMed: dayjs('2025-05-31').toDate(),
        gjelderDelerAvMåned: false,
    },
    status: OppgaveStatus.ULØST,
    opprettetDato: dayjs('2025-06-01').toDate(),
    sisteDatoEnKanSvare: dayjs('2025-06-06').startOf('day').toDate(),
};

const besvartOppgave: RapporterInntektOppgave = {
    ...oppgave,
    oppgavetypeData: {
        fraOgMed: dayjs('2025-05-01').toDate(),
        tilOgMed: dayjs('2025-05-31').toDate(),
        rapportertInntekt: {
            arbeidstakerOgFrilansInntekt: 10000,
        },
        gjelderDelerAvMåned: false,
    },
    status: OppgaveStatus.LØST,
    løstDato: dayjs().subtract(1, 'days').toDate(),
};

const utløptUbesvartOppgave: RapporterInntektOppgave = {
    oppgaveReferanse: 'ab0a18f8-8a6e-485b-b2b6-8d43a438165d',
    oppgavetype: ParsedOppgavetype.RAPPORTER_INNTEKT,
    oppgavetypeData: {
        fraOgMed: dayjs('2025-09-01').toDate(),
        tilOgMed: dayjs('2025-09-30').toDate(),
        rapportertInntekt: undefined,
        gjelderDelerAvMåned: false,
    },
    bekreftelse: undefined,
    status: OppgaveStatus.UTLØPT,
    opprettetDato: dayjs('2025-10-01T05:00:29.527840Z').toDate(),
    løstDato: dayjs('2025-10-08T05:00:54.739162Z').toDate(),
    åpnetDato: dayjs('2025-10-23T06:34:31.260740Z').toDate(),
    lukketDato: undefined,
    sisteDatoEnKanSvare: dayjs('2025-10-08T00:00:00Z').toDate(),
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
    render: () => <RapporterInntektOppgavePage oppgave={oppgave} deltakerNavn="SNODIG VAFFEL" />,
};

export const KvitteringHarInntekt: Story = {
    name: 'Kvittering - med inntekt',
    render: () => (
        <RapporterInntektOppgavePage
            oppgave={oppgave}
            deltakerNavn="SNODIG VAFFEL"
            initialKvitteringData={{ harHattInntektOver0: true }}
        />
    ),
};

export const KvitteringUtenInntekt: Story = {
    name: 'Kvittering - uten inntekt',
    render: () => (
        <RapporterInntektOppgavePage
            oppgave={oppgave}
            deltakerNavn="SNODIG VAFFEL"
            initialKvitteringData={{ harHattInntektOver0: false }}
        />
    ),
};

export const BesvartOppgave: Story = {
    name: 'Besvart oppgave',
    render: () => <RapporterInntektOppgavePage oppgave={besvartOppgave} deltakerNavn="SNODIG VAFFEL" />,
};

export const LukketOppgave: Story = {
    name: 'Lukket oppgave',
    render: () => (
        <RapporterInntektOppgavePage
            oppgave={{ ...oppgave, lukketDato: oppgave.opprettetDato, status: OppgaveStatus.LUKKET }}
            deltakerNavn="SNODIG VAFFEL"
        />
    ),
};

export const UtløptOppgave: Story = {
    name: 'Utløpt oppgave',
    render: () => <RapporterInntektOppgavePage oppgave={utløptUbesvartOppgave} deltakerNavn="SNODIG VAFFEL" />,
};

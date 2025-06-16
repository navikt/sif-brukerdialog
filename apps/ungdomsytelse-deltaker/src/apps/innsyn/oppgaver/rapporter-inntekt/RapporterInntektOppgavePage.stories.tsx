import type { Meta, StoryObj } from '@storybook/react-vite';
import { OppgaveStatus, Oppgavetype, RapporterInntektOppgave } from '@navikt/ung-common';
import dayjs from 'dayjs';
import { withInnsynApp } from '../../../../../storybook/decorators/withInnsynApp';
import { withIntl } from '../../../../../storybook/decorators/withIntl';
import { withQueryClient } from '../../../../../storybook/decorators/withQueryClient';
import { withRouter } from '../../../../../storybook/decorators/withRouter';
import RapporterInntektOppgavePage from './RapporterInntektOppgavePage';
import { Heading, VStack } from '@navikt/ds-react';
import OppgaverList from '../../components/oppgaver-list/OppgaverList';

const meta: Meta = {
    title: 'Innsyn/Oppgaver/Rapporter inntekt',
    parameters: {},
    decorators: [withIntl, withRouter, withQueryClient, (Story) => withInnsynApp(Story)],
};
export default meta;

type Story = StoryObj;

const oppgave: RapporterInntektOppgave = {
    oppgaveReferanse: '3d3e98b5-48e7-42c6-9fc1-e0f78022307f',
    oppgavetype: Oppgavetype.RAPPORTER_INNTEKT,
    oppgavetypeData: {
        fraOgMed: dayjs('2025-05-01').toDate(),
        tilOgMed: dayjs('2025-05-31').toDate(),
    },
    status: OppgaveStatus.ULØST,
    opprettetDato: dayjs('2025-06-01').toDate(),
    frist: dayjs('2025-06-06').startOf('day').toDate(),
};

const besvartOppgave: RapporterInntektOppgave = {
    ...oppgave,
    oppgavetypeData: {
        fraOgMed: dayjs('2025-05-01').toDate(),
        tilOgMed: dayjs('2025-05-31').toDate(),
        rapportertInntekt: {
            arbeidstakerOgFrilansInntekt: 10000,
        },
    },
    status: OppgaveStatus.LØST,
    løstDato: dayjs().subtract(1, 'days').toDate(),
};

export const OppgavePanel: Story = {
    name: 'Oppgavepaneler',
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

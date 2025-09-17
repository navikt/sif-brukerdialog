import { Heading, VStack } from '@navikt/ds-react';
import { OppgaveStatus, Oppgavetype } from '@navikt/ung-deltakelse-opplyser-api-deltaker';
import type { Meta, StoryObj } from '@storybook/react-vite';
import dayjs from 'dayjs';

import { withInnsynApp } from '../../../../../storybook/decorators/withInnsynApp';
import { withIntl } from '../../../../../storybook/decorators/withIntl';
import { withQueryClient } from '../../../../../storybook/decorators/withQueryClient';
import { withRouter } from '../../../../../storybook/decorators/withRouter';
import { KorrigertInntektOppgave } from '../../../../types/Oppgave';
import OppgaverList from '../../components/oppgaver-list/OppgaverList';
import { KorrigertInntektOppgavePage } from './KorrigertInntektOppgavePage';

const meta: Meta = {
    title: 'Innsyn/Oppgaver/6. Korrigert inntekt',
    parameters: {},
    decorators: [withIntl, withRouter, withQueryClient, (Story) => withInnsynApp(Story)],
};
export default meta;

type Story = StoryObj;

const oppgave: KorrigertInntektOppgave = {
    oppgaveReferanse: '3d3e98b5-48e7-42c6-9fc1-e0f78022307f',
    oppgavetype: Oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT,
    oppgavetypeData: {
        fraOgMed: dayjs('2025-05-01').toDate(),
        tilOgMed: dayjs('2025-05-01').toDate(),
        registerinntekt: {
            arbeidOgFrilansInntekter: [
                {
                    inntekt: 1500,
                    arbeidsgiver: '947064649',
                    arbeidsgiverNavn: 'SJOKKERENDE ELEKTRIKER',
                },
                {
                    inntekt: 500,
                    arbeidsgiver: '247064649',
                    arbeidsgiverNavn: 'SMIDIG MALER',
                },
            ],
            ytelseInntekter: [],
            totalInntektArbeidOgFrilans: 20000,
            totalInntektYtelse: 0,
            totalInntekt: 20000,
        },
    },
    status: OppgaveStatus.ULØST,
    opprettetDato: dayjs().subtract(1, 'days').toDate(),
    frist: dayjs().add(14, 'days').toDate(),
};

const besvartOppgave: KorrigertInntektOppgave = {
    ...oppgave,
    bekreftelse: {
        harUttalelse: false,
    },
    status: OppgaveStatus.LØST,
    løstDato: dayjs().toDate(),
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
    render: () => <KorrigertInntektOppgavePage oppgave={oppgave} deltakerNavn="SNODIG VAFFEL" />,
};

export const OppgaveKvittering: Story = {
    name: 'Kvittering ved svar på oppgave',
    render: () => <KorrigertInntektOppgavePage oppgave={oppgave} deltakerNavn="SNODIG VAFFEL" _devKvittering={true} />,
};

export const BesvartOppgave: Story = {
    name: 'Besvart oppgave',
    render: () => <KorrigertInntektOppgavePage oppgave={besvartOppgave} deltakerNavn="SNODIG VAFFEL" />,
};

export const BesvartOppgaveMedTilbakemelding: Story = {
    name: 'Besvart oppgave med tilbakemelding',
    render: () => (
        <KorrigertInntektOppgavePage
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
        <KorrigertInntektOppgavePage
            oppgave={{ ...besvartOppgave, bekreftelse: undefined, status: OppgaveStatus.AVBRUTT }}
            deltakerNavn="SNODIG VAFFEL"
        />
    ),
};

export const UtløptOppgave: Story = {
    name: 'Utløpt oppgave',
    render: () => (
        <KorrigertInntektOppgavePage
            oppgave={{ ...besvartOppgave, bekreftelse: undefined, status: OppgaveStatus.UTLØPT }}
            deltakerNavn="SNODIG VAFFEL"
        />
    ),
};

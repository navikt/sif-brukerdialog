import OppgaverList from '@innsyn/components/oppgaver-list/OppgaverList';
import { Heading, VStack } from '@navikt/ds-react';
import {
    ArbeidOgFrilansRegisterInntektDto,
    OppgaveStatus,
    Oppgavetype,
    RegisterinntektDto,
    YtelseRegisterInntektDto,
    YtelseType,
} from '@navikt/ung-deltakelse-opplyser-api-deltaker';
import { useWithInnsynApp } from '@shared/storybook/decorators/withInnsynApp';
import { withIntl } from '@shared/storybook/decorators/withIntl';
import { withQueryClient } from '@shared/storybook/decorators/withQueryClient';
import { withRouter } from '@shared/storybook/decorators/withRouter';
import { AvvikRegisterinntektOppgave } from '@shared/types/Oppgave';
import type { Meta, StoryObj } from '@storybook/react-vite';
import dayjs from 'dayjs';

import AvvikRegisterinntektOppgavePage from './AvvikRegisterinntektOppgavePage';

const meta: Meta = {
    title: 'Innsyn/Oppgaver/6. Avvik registerinntekt inntekt',
    parameters: {},
    decorators: [withIntl, withRouter, withQueryClient, (Story) => useWithInnsynApp(Story)],
};
export default meta;

type Story = StoryObj;

const inntektArbeidsgiver1: ArbeidOgFrilansRegisterInntektDto = {
    inntekt: 1500,
    arbeidsgiver: '947064649',
    arbeidsgiverNavn: 'SJOKKERENDE ELEKTRIKER',
};

const inntektArbeidsgiver2: ArbeidOgFrilansRegisterInntektDto = {
    inntekt: 500,
    arbeidsgiver: '247064649',
    arbeidsgiverNavn: 'SMIDIG MALER',
};

const inntektYtelse1: YtelseRegisterInntektDto = {
    inntekt: 3400,
    ytelsetype: YtelseType.SYKEPENGER,
};

const registerInntektEnArbeidsgiver: RegisterinntektDto = {
    arbeidOgFrilansInntekter: [inntektArbeidsgiver1],
    ytelseInntekter: [],
    totalInntektArbeidOgFrilans: inntektArbeidsgiver1.inntekt,
    totalInntektYtelse: 0,
    totalInntekt: inntektArbeidsgiver1.inntekt,
};

const oppgave: AvvikRegisterinntektOppgave = {
    oppgaveReferanse: '3d3e98b5-48e7-42c6-9fc1-e0f78022307f',
    oppgavetype: Oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT,
    oppgavetypeData: {
        fraOgMed: dayjs('2025-05-01').toDate(),
        tilOgMed: dayjs('2025-05-31').toDate(),
        registerinntekt: registerInntektEnArbeidsgiver,
        gjelderSisteMåned: false,
    },
    status: OppgaveStatus.ULØST,
    opprettetDato: dayjs().subtract(1, 'days').toDate(),
    sisteDatoEnKanSvare: dayjs().add(14, 'days').toDate(),
};

const getOppgaveMedInntekt = (
    arbeidOgFrilansInntekter: ArbeidOgFrilansRegisterInntektDto[] = [],
    ytelseInntekter: YtelseRegisterInntektDto[] = [],
): AvvikRegisterinntektOppgave => {
    const totalInntektArbeidOgFrilans = arbeidOgFrilansInntekter.reduce((sum, curr) => sum + curr.inntekt, 0);
    const totalInntektYtelse = ytelseInntekter.reduce((sum, curr) => sum + curr.inntekt, 0);
    const totalInntekt = totalInntektArbeidOgFrilans + totalInntektYtelse;

    return {
        ...oppgave,
        oppgavetypeData: {
            ...(oppgave.oppgavetypeData as any),
            registerinntekt: {
                arbeidOgFrilansInntekter,
                ytelseInntekter,
                totalInntektArbeidOgFrilans,
                totalInntektYtelse,
                totalInntekt,
            },
        },
    };
};
const besvartOppgave: AvvikRegisterinntektOppgave = {
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

export const UbesvartOppgaveEnArbeidsgiver: Story = {
    name: 'Èn arbeidsgiver',
    render: () => (
        <AvvikRegisterinntektOppgavePage
            oppgave={getOppgaveMedInntekt([inntektArbeidsgiver1])}
            deltakerNavn="SNODIG VAFFEL"
        />
    ),
};
export const UbesvartOppgaveToArbeidsgivere: Story = {
    name: 'To arbeidsgivere',
    render: () => (
        <AvvikRegisterinntektOppgavePage
            oppgave={getOppgaveMedInntekt([inntektArbeidsgiver1, inntektArbeidsgiver2])}
            deltakerNavn="SNODIG VAFFEL"
        />
    ),
};

export const UbesvartOppgaveNavYtelse: Story = {
    name: 'Kun Nav-ytelse',
    render: () => (
        <AvvikRegisterinntektOppgavePage
            oppgave={getOppgaveMedInntekt(undefined, [inntektYtelse1])}
            deltakerNavn="SNODIG VAFFEL"
        />
    ),
};
export const UbesvartOppgaveKombinasjon: Story = {
    name: 'Arbeidsgiver og Nav ytelse',
    render: () => (
        <AvvikRegisterinntektOppgavePage
            oppgave={getOppgaveMedInntekt([inntektArbeidsgiver1], [inntektYtelse1])}
            deltakerNavn="SNODIG VAFFEL"
        />
    ),
};
export const IngenInntekt: Story = {
    name: 'Ingen inntekt',
    render: () => (
        <AvvikRegisterinntektOppgavePage oppgave={getOppgaveMedInntekt([], [])} deltakerNavn="SNODIG VAFFEL" />
    ),
};

export const OppgaveKvittering: Story = {
    name: 'Kvittering',
    render: () => (
        <AvvikRegisterinntektOppgavePage oppgave={oppgave} deltakerNavn="SNODIG VAFFEL" initialVisKvittering={true} />
    ),
};

export const BesvartOppgave: Story = {
    name: 'Besvart oppgave',
    render: () => <AvvikRegisterinntektOppgavePage oppgave={besvartOppgave} deltakerNavn="SNODIG VAFFEL" />,
};

export const BesvartOppgaveMedTilbakemelding: Story = {
    name: 'Besvart oppgave med tilbakemelding',
    render: () => (
        <AvvikRegisterinntektOppgavePage
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
        <AvvikRegisterinntektOppgavePage
            oppgave={{ ...besvartOppgave, bekreftelse: undefined, status: OppgaveStatus.AVBRUTT }}
            deltakerNavn="SNODIG VAFFEL"
        />
    ),
};

export const UtløptOppgave: Story = {
    name: 'Utløpt oppgave',
    render: () => (
        <AvvikRegisterinntektOppgavePage
            oppgave={{ ...besvartOppgave, bekreftelse: undefined, status: OppgaveStatus.UTLØPT }}
            deltakerNavn="SNODIG VAFFEL"
        />
    ),
};

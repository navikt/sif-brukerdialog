import { Heading, VStack } from '@navikt/ds-react';
import {
    ArbeidOgFrilansRegisterInntektDto,
    OppgaveStatus,
    Oppgavetype,
    RegisterinntektDto,
    YtelseRegisterInntektDto,
    YtelseType,
} from '@navikt/ung-deltakelse-opplyser-api-deltaker';
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

// const inntektYtelse2: YtelseRegisterInntektDto = {
//     inntekt: 1200,
//     ytelsetype: YtelseType.OMSORGSPENGER,
// };

const registerInntektEnArbeidsgiver: RegisterinntektDto = {
    arbeidOgFrilansInntekter: [inntektArbeidsgiver1],
    ytelseInntekter: [],
    totalInntektArbeidOgFrilans: inntektArbeidsgiver1.inntekt,
    totalInntektYtelse: 0,
    totalInntekt: inntektArbeidsgiver1.inntekt,
};

const oppgave: KorrigertInntektOppgave = {
    oppgaveReferanse: '3d3e98b5-48e7-42c6-9fc1-e0f78022307f',
    oppgavetype: Oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT,
    oppgavetypeData: {
        fraOgMed: dayjs('2025-05-01').toDate(),
        tilOgMed: dayjs('2025-05-01').toDate(),
        registerinntekt: registerInntektEnArbeidsgiver,
    },
    status: OppgaveStatus.ULØST,
    opprettetDato: dayjs().subtract(1, 'days').toDate(),
    frist: dayjs().add(14, 'days').toDate(),
};

const getOppgaveMedInntekt = (
    arbeidOgFrilansInntekter: ArbeidOgFrilansRegisterInntektDto[] = [],
    ytelseInntekter: YtelseRegisterInntektDto[] = [],
): KorrigertInntektOppgave => ({
    ...oppgave,
    oppgavetypeData: {
        ...(oppgave.oppgavetypeData as any),
        registerinntekt: {
            arbeidOgFrilansInntekter,
            ytelseInntekter,
            totalInntektArbeidOgFrilans: arbeidOgFrilansInntekter.reduce((sum, curr) => sum + curr.inntekt, 0),
            totalInntektYtelse: ytelseInntekter.reduce((sum, curr) => sum + curr.inntekt, 0),
            totalInntekt:
                arbeidOgFrilansInntekter.reduce((sum, curr) => sum + curr.inntekt, 0) +
                ytelseInntekter.reduce((sum, curr) => sum + curr.inntekt, 0),
        },
    },
});

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

export const UbesvartOppgaveEnArbeidsgiver: Story = {
    name: 'Èn arbeidsgiver',
    render: () => (
        <KorrigertInntektOppgavePage
            oppgave={getOppgaveMedInntekt([inntektArbeidsgiver1])}
            deltakerNavn="SNODIG VAFFEL"
        />
    ),
};
export const UbesvartOppgaveToArbeidsgivere: Story = {
    name: 'To arbeidsgivere',
    render: () => (
        <KorrigertInntektOppgavePage
            oppgave={getOppgaveMedInntekt([inntektArbeidsgiver1, inntektArbeidsgiver2])}
            deltakerNavn="SNODIG VAFFEL"
        />
    ),
};

export const UbesvartOppgaveNavYtelse: Story = {
    name: 'Nav ytelse',
    render: () => (
        <KorrigertInntektOppgavePage
            oppgave={getOppgaveMedInntekt(undefined, [inntektYtelse1])}
            deltakerNavn="SNODIG VAFFEL"
        />
    ),
};
export const UbesvartOppgaveKombinasjon: Story = {
    name: 'Arbeidsgiver og Nav ytelse',
    render: () => (
        <KorrigertInntektOppgavePage
            oppgave={getOppgaveMedInntekt([inntektArbeidsgiver1], [inntektYtelse1])}
            deltakerNavn="SNODIG VAFFEL"
        />
    ),
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

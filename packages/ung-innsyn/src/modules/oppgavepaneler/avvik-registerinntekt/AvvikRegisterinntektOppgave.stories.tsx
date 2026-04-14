import { Heading, VStack } from '@navikt/ds-react';
import {
    ArbeidOgFrilansRegisterInntektDto,
    OppgaveStatus,
    OppgaveYtelsetype,
    RegisterinntektDto,
    YtelseRegisterInntektDto,
    YtelseType,
} from '@navikt/ung-brukerdialog-api';
import { AvvikRegisterinntektOppgave, ParsedOppgavetype } from '@sif/api/ung-brukerdialog';
import type { Meta, StoryObj } from '@storybook/react-vite';
import dayjs from 'dayjs';

import { OppgaverList } from '../../../components';
import { OppgavePageDecorator } from '../../../storybook/OppgavePageDecorator';
import { StorybookDecorator } from '../../../storybook/StorybookDecorator';
import { AvvikRegisterinntektOppgavePanel } from './AvvikRegisterinntektOppgavePanel';

const meta: Meta = {
    title: 'Oppgaver/7. Avvik registerinntekt inntekt',
    parameters: {},
    decorators: [StorybookDecorator, OppgavePageDecorator],
};
export default meta;

type Story = StoryObj;

const inntektArbeidsgiver1: ArbeidOgFrilansRegisterInntektDto = {
    inntekt: 1500,
    arbeidsgiverIdentifikator: '947064649',
    arbeidsgiverNavn: 'SJOKKERENDE ELEKTRIKER',
};

const inntektArbeidsgiver2: ArbeidOgFrilansRegisterInntektDto = {
    inntekt: 500,
    arbeidsgiverIdentifikator: '247064649',
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
    oppgavetype: ParsedOppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT,
    oppgavetypeData: {
        fraOgMed: dayjs('2025-05-01').toDate(),
        tilOgMed: dayjs('2025-05-31').toDate(),
        registerinntekt: registerInntektEnArbeidsgiver,
        gjelderDelerAvMåned: false,
    },
    status: OppgaveStatus.ULØST,
    opprettetDato: dayjs().subtract(1, 'days').toDate(),
    sisteDatoEnKanSvare: dayjs().add(14, 'days').toDate(),
    ytelsetype: OppgaveYtelsetype.AKTIVITETSPENGER,
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

export const UbesvartOppgaveEnArbeidsgiver: Story = {
    name: 'Èn arbeidsgiver',
    render: () => (
        <AvvikRegisterinntektOppgavePanel oppgave={getOppgaveMedInntekt([inntektArbeidsgiver1])} navn="SNODIG VAFFEL" />
    ),
};
export const UbesvartOppgaveToArbeidsgivere: Story = {
    name: 'To arbeidsgivere',
    render: () => (
        <AvvikRegisterinntektOppgavePanel
            oppgave={getOppgaveMedInntekt([inntektArbeidsgiver1, inntektArbeidsgiver2])}
            navn="SNODIG VAFFEL"
        />
    ),
};

export const UbesvartOppgaveNavYtelse: Story = {
    name: 'Kun Nav-ytelse',
    render: () => (
        <AvvikRegisterinntektOppgavePanel
            oppgave={getOppgaveMedInntekt(undefined, [inntektYtelse1])}
            navn="SNODIG VAFFEL"
        />
    ),
};
export const UbesvartOppgaveKombinasjon: Story = {
    name: 'Arbeidsgiver og Nav ytelse',
    render: () => (
        <AvvikRegisterinntektOppgavePanel
            oppgave={getOppgaveMedInntekt([inntektArbeidsgiver1], [inntektYtelse1])}
            navn="SNODIG VAFFEL"
        />
    ),
};
export const IngenInntekt: Story = {
    name: 'Ingen inntekt',
    render: () => <AvvikRegisterinntektOppgavePanel oppgave={getOppgaveMedInntekt([], [])} navn="SNODIG VAFFEL" />,
};

export const OppgaveKvittering: Story = {
    name: 'Kvittering',
    render: () => (
        <AvvikRegisterinntektOppgavePanel oppgave={oppgave} navn="SNODIG VAFFEL" initialVisKvittering={true} />
    ),
};

export const BesvartOppgave: Story = {
    name: 'Besvart oppgave',
    render: () => <AvvikRegisterinntektOppgavePanel oppgave={besvartOppgave} navn="SNODIG VAFFEL" />,
};

export const BesvartOppgaveMedTilbakemelding: Story = {
    name: 'Besvart oppgave med tilbakemelding',
    render: () => (
        <AvvikRegisterinntektOppgavePanel
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
        <AvvikRegisterinntektOppgavePanel
            oppgave={{ ...besvartOppgave, respons: undefined, status: OppgaveStatus.AVBRUTT }}
            navn="SNODIG VAFFEL"
        />
    ),
};

export const UtløptOppgave: Story = {
    name: 'Utløpt oppgave',
    render: () => (
        <AvvikRegisterinntektOppgavePanel
            oppgave={{ ...besvartOppgave, respons: undefined, status: OppgaveStatus.UTLØPT }}
            navn="SNODIG VAFFEL"
        />
    ),
};

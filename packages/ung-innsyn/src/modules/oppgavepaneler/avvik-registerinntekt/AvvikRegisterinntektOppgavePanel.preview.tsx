import { VStack } from '@navikt/ds-react';
import {
    ArbeidOgFrilansRegisterInntektDto,
    OppgaveStatus,
    OppgaveType,
    OppgaveYtelsetype,
    RegisterinntektDto,
    YtelseRegisterInntektDto,
    YtelseType,
} from '@navikt/ung-brukerdialog-api';
import { AvvikRegisterinntektOppgave, ParsedOppgavetype } from '@sif/api/ung-brukerdialog';
import { dateToISODate, ISODate } from '@sif/utils';
import dayjs from 'dayjs';

import { OppgaverList } from '../../../components';
import { StoryBox } from '../../../storybook/storyUtils';
import { AvvikRegisterinntektOppgavePanel } from './AvvikRegisterinntektOppgavePanel';

const inntektArbeidsgiver1: ArbeidOgFrilansRegisterInntektDto = {
    inntekt: 1500,
    arbeidsgiverIdentifikator: '947064649',
    arbeidsgiverNavn: 'SJOKKERENDE ELEKTRIKER',
};

const inntektYtelse1: YtelseRegisterInntektDto = { inntekt: 3400, ytelsetype: YtelseType.SYKEPENGER };

const registerInntekt: RegisterinntektDto = {
    arbeidOgFrilansInntekter: [inntektArbeidsgiver1],
    ytelseInntekter: [],
    totalInntektArbeidOgFrilans: inntektArbeidsgiver1.inntekt,
    totalInntektYtelse: 0,
    totalInntekt: inntektArbeidsgiver1.inntekt,
};

export const mockAvvikRegisterinntektOppgave: AvvikRegisterinntektOppgave = {
    oppgaveReferanse: '3d3e98b5-48e7-42c6-9fc1-e0f78022307f',
    oppgavetype: OppgaveType.BEKREFT_AVVIK_REGISTERINNTEKT,
    parsedOppgavetype: ParsedOppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT,
    oppgavetypeData: {
        fraOgMed: '2025-05-01' as ISODate,
        tilOgMed: '2025-05-31' as ISODate,
        registerinntekt: registerInntekt,
        gjelderDelerAvMåned: false,
    },
    status: OppgaveStatus.ULØST,
    opprettetDato: dayjs().subtract(1, 'days').toDate(),
    frist: dateToISODate(dayjs().add(14, 'days')),
    ytelsetype: OppgaveYtelsetype.UNGDOMSYTELSE,
};

export const mockAvvikRegisterinntektOppgaveAKT: AvvikRegisterinntektOppgave = {
    ...mockAvvikRegisterinntektOppgave,
    ytelsetype: OppgaveYtelsetype.AKTIVITETSPENGER,
};

const besvartOppgave: AvvikRegisterinntektOppgave = {
    ...mockAvvikRegisterinntektOppgave,
    respons: { type: 'VARSEL_SVAR', harUttalelse: false },
    status: OppgaveStatus.LØST,
    løstDato: dayjs().toDate(),
};

const medInntekt = (
    base: AvvikRegisterinntektOppgave,
    arbeid: ArbeidOgFrilansRegisterInntektDto[] = [],
    ytelse: YtelseRegisterInntektDto[] = [],
): AvvikRegisterinntektOppgave => ({
    ...base,
    oppgavetypeData: {
        ...base.oppgavetypeData,
        registerinntekt: {
            arbeidOgFrilansInntekter: arbeid,
            ytelseInntekter: ytelse,
            totalInntektArbeidOgFrilans: arbeid.reduce((s, i) => s + i.inntekt, 0),
            totalInntektYtelse: ytelse.reduce((s, i) => s + i.inntekt, 0),
            totalInntekt: [...arbeid, ...ytelse].reduce((s, i) => s + i.inntekt, 0),
        },
    },
});

const renderAlleStater = (oppgave: AvvikRegisterinntektOppgave) => {
    const besvart = { ...besvartOppgave, ytelsetype: oppgave.ytelsetype };
    return (
        <VStack gap="space-24">
            <StoryBox title="Forside — uløst">
                <OppgaverList oppgaver={[oppgave]} />
            </StoryBox>
            <StoryBox title="Ubesvart — én arbeidsgiver">
                <AvvikRegisterinntektOppgavePanel oppgave={medInntekt(oppgave, [inntektArbeidsgiver1])} navn="SNODIG VAFFEL" />
            </StoryBox>
            <StoryBox title="Ubesvart — arbeidsgiver og Nav-ytelse">
                <AvvikRegisterinntektOppgavePanel oppgave={medInntekt(oppgave, [inntektArbeidsgiver1], [inntektYtelse1])} navn="SNODIG VAFFEL" />
            </StoryBox>
            <StoryBox title="Kvittering">
                <AvvikRegisterinntektOppgavePanel oppgave={oppgave} navn="SNODIG VAFFEL" initialVisKvittering={true} />
            </StoryBox>
            <StoryBox title="Besvart oppgave">
                <AvvikRegisterinntektOppgavePanel oppgave={besvart} navn="SNODIG VAFFEL" />
            </StoryBox>
            <StoryBox title="Forside — løst oppgave">
                <OppgaverList visBeskrivelse={false} oppgaveStatusTagVariant="text" oppgaver={[{ ...oppgave, status: OppgaveStatus.LØST }]} />
            </StoryBox>
        </VStack>
    );
};

export const renderAvvikRegisterinntektAlleStater = () => renderAlleStater(mockAvvikRegisterinntektOppgave);
export const renderAvvikRegisterinntektAKTAlleStater = () => renderAlleStater(mockAvvikRegisterinntektOppgaveAKT);

import {
    BrukerdialogOppgaveDto,
    OppgaveStatus,
    OppgaveType,
    OppgaveYtelsetype,
    PeriodeEndringType,
} from '@navikt/ung-brukerdialog-api';
import dayjs from 'dayjs';

import { dateToISODate } from '../../utils/dateUtils';
import { getMockToday } from '../../utils/mockDate';

const getDatoer = () => {
    const datoer = {
        deltakelseFraOgMed: dayjs(getMockToday()).subtract(46, 'days').startOf('week'),
        oppgaveMåned: dayjs(getMockToday()).startOf('month'),
    };
    return datoer;
};

const getSøkYtelseOppgaveDto = (): BrukerdialogOppgaveDto => {
    const søkYtelseDay = dayjs(getMockToday()).subtract(2, 'months');
    return {
        oppgaveReferanse: 'e632b20a-b0c9-4953-97ec-851ebd1a0e92',
        oppgavetype: OppgaveType.SØK_YTELSE,
        ytelsetype: OppgaveYtelsetype.UNGDOMSYTELSE,
        status: OppgaveStatus.ULØST,
        frist: getDatoer().oppgaveMåned.add(14, 'days').add(7, 'hours').toISOString(),
        oppgavetypeData: {
            type: 'SØK_YTELSE',
            fomDato: dateToISODate(søkYtelseDay.toDate()),
        },
        opprettetDato: søkYtelseDay.toISOString(),
    };
};

const getSøkYtelseOppgaveDtoLøst = (): BrukerdialogOppgaveDto => {
    const oppgave = getSøkYtelseOppgaveDto();
    return {
        ...oppgave,
        status: OppgaveStatus.LØST,
        løstDato: dayjs(oppgave.opprettetDato).add(12, 'days').endOf('day').subtract(2.3, 'hours').toISOString(),
    };
};

const getEndretStartdatoOppgaveDto = (): BrukerdialogOppgaveDto => ({
    oppgaveReferanse: '3d3e98b5-48e7-42c6-9fc1-e0f78022307f',
    oppgavetype: OppgaveType.BEKREFT_ENDRET_STARTDATO,
    ytelsetype: OppgaveYtelsetype.UNGDOMSYTELSE,
    oppgavetypeData: {
        type: 'ENDRET_STARTDATO',
        nyStartdato: dateToISODate(dayjs(getDatoer().deltakelseFraOgMed).add(1, 'week').startOf('week').toDate()),
        forrigeStartdato: dateToISODate(getDatoer().deltakelseFraOgMed.toDate()),
    },
    respons: {
        type: 'VARSEL_SVAR',
        harUttalelse: false,
    },
    status: OppgaveStatus.ULØST,
    opprettetDato: getDatoer().oppgaveMåned.add(3, 'hours').toISOString(),
    frist: getDatoer().oppgaveMåned.add(14, 'days').add(7, 'hours').toISOString(),
});

const getEndretStartdatoOppgaveDtoLøst = (): BrukerdialogOppgaveDto => ({
    oppgaveReferanse: '3d3e98b5-48e7-42c6-9fc1-e0f780223077',
    oppgavetype: OppgaveType.BEKREFT_ENDRET_STARTDATO,
    ytelsetype: OppgaveYtelsetype.UNGDOMSYTELSE,
    oppgavetypeData: {
        type: 'ENDRET_STARTDATO',
        nyStartdato: dateToISODate(dayjs(getDatoer().deltakelseFraOgMed).add(1, 'week').startOf('week').toDate()),
        forrigeStartdato: dateToISODate(getDatoer().deltakelseFraOgMed.toDate()),
    },
    respons: {
        type: 'VARSEL_SVAR',
        harUttalelse: false,
    },
    status: OppgaveStatus.LØST,
    opprettetDato: getDatoer().oppgaveMåned.add(3, 'hours').toISOString(),
    frist: getDatoer().oppgaveMåned.add(7, 'days').add(7, 'hours').toISOString(),
    løstDato: getDatoer().oppgaveMåned.add(3, 'days').startOf('day').add(12, 'hours').toISOString(),
});

const getMeldtUtOppgaveDto = (): BrukerdialogOppgaveDto => ({
    oppgaveReferanse: 'd6d6d462-66cd-4d87-a015-4709637a7927',
    oppgavetype: OppgaveType.BEKREFT_ENDRET_SLUTTDATO,
    ytelsetype: OppgaveYtelsetype.UNGDOMSYTELSE,
    oppgavetypeData: {
        type: 'ENDRET_SLUTTDATO',
        nySluttdato: '2026-01-29',
    },
    status: OppgaveStatus.ULØST,
    opprettetDato: '2025-09-22T05:39:32.420085Z',
    frist: '2025-09-23T07:39:32.310154Z',
});

const getMeldtUtOppgaveDtoLøst = (): BrukerdialogOppgaveDto => ({
    oppgaveReferanse: 'd6d6d462-66cd-4d87-a015-4709637a7921',
    oppgavetype: OppgaveType.BEKREFT_ENDRET_SLUTTDATO,
    ytelsetype: OppgaveYtelsetype.UNGDOMSYTELSE,
    oppgavetypeData: {
        type: 'ENDRET_SLUTTDATO',
        nySluttdato: '2026-01-29',
        forrigeSluttdato: '2026-01-30',
    },
    respons: {
        type: 'VARSEL_SVAR',
        harUttalelse: false,
    },
    status: OppgaveStatus.LØST,
    opprettetDato: '2025-09-22T05:39:32.420085Z',
    løstDato: '2025-09-22T05:40:05.767753Z',
    frist: '2025-09-23T07:39:32.310154Z',
});

const getEndretSluttdatoOppgaveDto = (): BrukerdialogOppgaveDto => ({
    oppgaveReferanse: 'd6d6d462-66cd-4d87-a015-4709637a7928',
    oppgavetype: OppgaveType.BEKREFT_ENDRET_SLUTTDATO,
    ytelsetype: OppgaveYtelsetype.UNGDOMSYTELSE,
    oppgavetypeData: {
        type: 'ENDRET_SLUTTDATO',
        nySluttdato: '2026-01-24',
        forrigeSluttdato: '2026-01-25',
    },
    status: OppgaveStatus.ULØST,
    opprettetDato: '2025-09-22T05:39:32.420085Z',
    frist: '2025-09-23T07:39:32.310154Z',
});

const getEndretSluttdatoOppgaveDtoLøst = (): BrukerdialogOppgaveDto => ({
    oppgaveReferanse: 'd6d6d462-66cd-4d87-a015-4709637a7929',
    oppgavetype: OppgaveType.BEKREFT_ENDRET_SLUTTDATO,
    ytelsetype: OppgaveYtelsetype.UNGDOMSYTELSE,
    oppgavetypeData: {
        type: 'ENDRET_SLUTTDATO',
        nySluttdato: '2026-01-29',
        forrigeSluttdato: '2026-01-30',
    },
    respons: {
        type: 'VARSEL_SVAR',
        harUttalelse: true,
        uttalelseFraBruker: 'teste',
    },
    status: OppgaveStatus.LØST,
    opprettetDato: '2025-09-22T05:39:32.420085Z',
    løstDato: '2025-09-22T05:40:05.767753Z',
    frist: '2025-09-23T07:39:32.310154Z',
});

const getRapporterInntektOppgaveDto = (): BrukerdialogOppgaveDto => ({
    oppgaveReferanse: 'f3e1b0e2-3f3c-4e2d-8f7a-5c3e5e6b7a8c',
    oppgavetype: OppgaveType.RAPPORTER_INNTEKT,
    ytelsetype: OppgaveYtelsetype.UNGDOMSYTELSE,
    status: OppgaveStatus.ULØST,
    opprettetDato: getDatoer().oppgaveMåned.add(3, 'hours').toISOString(),
    frist: getDatoer().oppgaveMåned.add(7, 'days').add(7, 'hours').toISOString(),
    oppgavetypeData: {
        type: 'INNTEKTSRAPPORTERING',
        fraOgMed: dateToISODate(getDatoer().oppgaveMåned.startOf('month').toDate()),
        tilOgMed: dateToISODate(getDatoer().oppgaveMåned.endOf('month').toDate()),
        gjelderDelerAvMåned: false,
    },
});

const getRapporterInntektOppgaveDtoLøst = (): BrukerdialogOppgaveDto => ({
    oppgaveReferanse: 'f4e1b0e2-3f3c-4e2d-8f7a-5c3e5e6b7a89',
    oppgavetype: OppgaveType.RAPPORTER_INNTEKT,
    ytelsetype: OppgaveYtelsetype.UNGDOMSYTELSE,
    status: OppgaveStatus.LØST,
    opprettetDato: getDatoer().oppgaveMåned.add(3, 'hours').toISOString(),
    frist: getDatoer().oppgaveMåned.add(7, 'days').add(7, 'hours').toISOString(),
    løstDato: getDatoer().oppgaveMåned.add(4, 'days').add(12, 'hours').toISOString(),
    oppgavetypeData: {
        type: 'INNTEKTSRAPPORTERING',
        fraOgMed: dateToISODate(getDatoer().oppgaveMåned.startOf('month').toDate()),
        tilOgMed: dateToISODate(getDatoer().oppgaveMåned.endOf('month').toDate()),
        gjelderDelerAvMåned: false,
    },
    respons: {
        type: 'RAPPORTERT_INNTEKT',
        fraOgMed: dateToISODate(getDatoer().oppgaveMåned.startOf('month').toDate()),
        tilOgMed: dateToISODate(getDatoer().oppgaveMåned.endOf('month').toDate()),
        arbeidstakerOgFrilansInntekt: 23000,
    } as any,
});

const getRapporterInntektDelerAvMånedOppgaveDto = (): BrukerdialogOppgaveDto => ({
    oppgaveReferanse: 'f3e1b0e2-3f3c-4e2d-8f7a-5c3e5e6b7a82',
    oppgavetype: OppgaveType.RAPPORTER_INNTEKT,
    ytelsetype: OppgaveYtelsetype.UNGDOMSYTELSE,
    status: OppgaveStatus.ULØST,
    opprettetDato: getDatoer().oppgaveMåned.add(3, 'hours').toISOString(),
    frist: getDatoer().oppgaveMåned.add(7, 'days').add(7, 'hours').toISOString(),
    oppgavetypeData: {
        type: 'INNTEKTSRAPPORTERING',
        fraOgMed: dateToISODate(getDatoer().oppgaveMåned.startOf('month').toDate()),
        tilOgMed: dateToISODate(getDatoer().oppgaveMåned.endOf('month').subtract(4, 'days').toDate()),
        gjelderDelerAvMåned: true,
    },
});

const getRapporterInntektDelerAvMånedOppgaveDtoLøst = (): BrukerdialogOppgaveDto => ({
    oppgaveReferanse: 'f4e1b0e2-3f3c-4e2d-8f7a-5c3e5e6b7a8c',
    oppgavetype: OppgaveType.RAPPORTER_INNTEKT,
    ytelsetype: OppgaveYtelsetype.UNGDOMSYTELSE,
    status: OppgaveStatus.LØST,
    opprettetDato: getDatoer().oppgaveMåned.add(3, 'hours').toISOString(),
    frist: getDatoer().oppgaveMåned.add(7, 'days').add(7, 'hours').toISOString(),
    løstDato: getDatoer().oppgaveMåned.add(4, 'days').add(12, 'hours').toISOString(),
    oppgavetypeData: {
        type: 'INNTEKTSRAPPORTERING',
        fraOgMed: dateToISODate(getDatoer().oppgaveMåned.startOf('month').toDate()),
        tilOgMed: dateToISODate(getDatoer().oppgaveMåned.endOf('month').subtract(4, 'days').toDate()),
        gjelderDelerAvMåned: true,
    },
    respons: {
        type: 'RAPPORTERT_INNTEKT',
        fraOgMed: dateToISODate(getDatoer().oppgaveMåned.startOf('month').toDate()),
        tilOgMed: dateToISODate(getDatoer().oppgaveMåned.endOf('month').toDate()),
        arbeidstakerOgFrilansInntekt: 23000,
    },
});

const getBekreftAvvikOppgaveDto = (): BrukerdialogOppgaveDto => ({
    oppgaveReferanse: 'be07ce74-9cb5-4012-bbae-5ab0940b04f7',
    oppgavetype: OppgaveType.BEKREFT_AVVIK_REGISTERINNTEKT,
    ytelsetype: OppgaveYtelsetype.UNGDOMSYTELSE,
    oppgavetypeData: {
        type: 'KONTROLLER_REGISTERINNTEKT',
        fraOgMed: dateToISODate(getDatoer().oppgaveMåned.subtract(1, 'month').startOf('month').toDate()),
        tilOgMed: dateToISODate(getDatoer().oppgaveMåned.subtract(1, 'month').endOf('month').toDate()),
        registerinntekt: {
            arbeidOgFrilansInntekter: [
                {
                    inntekt: 20000,
                    arbeidsgiverIdentifikator: '947064649',
                    arbeidsgiverNavn: 'SJOKKERENDE ELEKTRIKER',
                },
            ],
            ytelseInntekter: [],
            totalInntektArbeidOgFrilans: 20000,
            totalInntektYtelse: 0,
            totalInntekt: 20000,
        },
        gjelderDelerAvMåned: false,
    },
    frist: getDatoer().oppgaveMåned.add(28, 'days').add(7, 'hours').toISOString(),
    opprettetDato: getDatoer().oppgaveMåned.add(3, 'hours').toISOString(),
    status: OppgaveStatus.ULØST,
});

const getBekreftAvvikOppgaveDelerAvMånedDto = (): BrukerdialogOppgaveDto => ({
    oppgaveReferanse: 'be06ce74-9cb5-4000-bbae-5ab0940b04f7',
    oppgavetype: OppgaveType.BEKREFT_AVVIK_REGISTERINNTEKT,
    ytelsetype: OppgaveYtelsetype.UNGDOMSYTELSE,
    oppgavetypeData: {
        type: 'KONTROLLER_REGISTERINNTEKT',
        fraOgMed: dateToISODate(getDatoer().oppgaveMåned.subtract(1, 'month').startOf('month').toDate()),
        tilOgMed: dateToISODate(getDatoer().oppgaveMåned.subtract(1, 'month').add(15, 'days').startOf('week').toDate()),

        registerinntekt: {
            arbeidOgFrilansInntekter: [
                {
                    inntekt: 20000,
                    arbeidsgiverIdentifikator: '947064649',
                    arbeidsgiverNavn: 'SJOKKERENDE ELEKTRIKER',
                },
            ],
            ytelseInntekter: [],
            totalInntektArbeidOgFrilans: 20000,
            totalInntektYtelse: 0,
            totalInntekt: 20000,
        },
        gjelderDelerAvMåned: true,
    },
    frist: getDatoer().oppgaveMåned.add(28, 'days').add(7, 'hours').toISOString(),
    opprettetDato: getDatoer().oppgaveMåned.add(3, 'hours').toISOString(),
    status: OppgaveStatus.ULØST,
});

const getBekreftAvvikOppgaveDtoLøst = (): BrukerdialogOppgaveDto => ({
    ...getBekreftAvvikOppgaveDto(),
    oppgavetypeData: {
        type: 'KONTROLLER_REGISTERINNTEKT',
        fraOgMed: dateToISODate(getDatoer().oppgaveMåned.startOf('month').toDate()),
        tilOgMed: dateToISODate(getDatoer().oppgaveMåned.endOf('month').toDate()),
        registerinntekt: {
            arbeidOgFrilansInntekter: [
                {
                    arbeidsgiverIdentifikator: '947064649',
                    inntekt: 20000,
                    // arbeidsgiver: '947064649',
                    arbeidsgiverNavn: 'SJOKKERENDE ELEKTRIKER',
                },
            ],
            ytelseInntekter: [],
            totalInntektArbeidOgFrilans: 20000,
            totalInntektYtelse: 0,
            totalInntekt: 20000,
        },
        gjelderDelerAvMåned: false,
    },
    respons: {
        type: 'VARSEL_SVAR',
        harUttalelse: false,
    },
    status: OppgaveStatus.LØST,
    løstDato: getDatoer().oppgaveMåned.add(28, 'days').add(54, 'hours').toISOString(),
});

const getFjernetPeriodeOppgaveDto = (): BrukerdialogOppgaveDto => ({
    oppgaveReferanse: 'de06ce74-9cb5-4000-bbae-5ab0940b04f7',
    oppgavetype: OppgaveType.BEKREFT_ENDRET_PERIODE,
    ytelsetype: OppgaveYtelsetype.UNGDOMSYTELSE,
    oppgavetypeData: {
        type: 'ENDRET_PERIODE',
        endringer: [PeriodeEndringType.FJERNET_PERIODE],
        forrigePeriode: {
            fomDato: dateToISODate(getDatoer().oppgaveMåned.startOf('month').toDate()),
            tomDato: dateToISODate(getDatoer().oppgaveMåned.endOf('month').toDate()),
        },
    },
    status: OppgaveStatus.ULØST,
    opprettetDato: getDatoer().oppgaveMåned.add(3, 'hours').toISOString(),
    frist: getDatoer().oppgaveMåned.add(14, 'days').add(7, 'hours').toISOString(),
});

const getFjernetPeriodeOppgaveDtoLøst = (): BrukerdialogOppgaveDto => ({
    oppgaveReferanse: 'de06ce74-9cb5-4000-bbae-5ab0940b04f2',
    oppgavetype: OppgaveType.BEKREFT_ENDRET_PERIODE,
    ytelsetype: OppgaveYtelsetype.UNGDOMSYTELSE,
    oppgavetypeData: {
        type: 'ENDRET_PERIODE',
        endringer: [PeriodeEndringType.FJERNET_PERIODE],
        forrigePeriode: {
            fomDato: dateToISODate(getDatoer().oppgaveMåned.startOf('month').toDate()),
            tomDato: dateToISODate(getDatoer().oppgaveMåned.endOf('month').toDate()),
        },
    },
    status: OppgaveStatus.LØST,
    opprettetDato: getDatoer().oppgaveMåned.add(3, 'hours').toISOString(),
    frist: getDatoer().oppgaveMåned.add(14, 'days').add(7, 'hours').toISOString(),
    løstDato: getDatoer().oppgaveMåned.add(28, 'days').add(54, 'hours').toISOString(),
});

const getEndretStartOgSluttdatoOppgaveDto = (): BrukerdialogOppgaveDto => ({
    oppgaveReferanse: 'de06ce74-9cb5-4000-bbae-5ab0940b04f6',
    oppgavetype: OppgaveType.BEKREFT_ENDRET_PERIODE,
    ytelsetype: OppgaveYtelsetype.UNGDOMSYTELSE,
    oppgavetypeData: {
        type: 'ENDRET_PERIODE',
        endringer: [PeriodeEndringType.ENDRET_SLUTTDATO, PeriodeEndringType.ENDRET_STARTDATO],
        forrigePeriode: {
            fomDato: dateToISODate(getDatoer().oppgaveMåned.startOf('month').toDate()),
        },
        nyPeriode: {
            fomDato: dateToISODate(getDatoer().oppgaveMåned.add(1, 'month').startOf('month').toDate()),
            tomDato: dateToISODate(getDatoer().oppgaveMåned.add(1, 'month').endOf('month').toDate()),
        },
    },
    status: OppgaveStatus.ULØST,
    opprettetDato: getDatoer().oppgaveMåned.add(3, 'hours').toISOString(),
    frist: getDatoer().oppgaveMåned.add(14, 'days').add(7, 'hours').toISOString(),
});

export const getMockOppgaver = () => ({
    rapporterInntektOppgave: getRapporterInntektOppgaveDto(),
    rapporterInntektOppgaveLøst: getRapporterInntektOppgaveDtoLøst(),
    rapporterInntektDelerAvMånedOppgave: getRapporterInntektDelerAvMånedOppgaveDto(),
    rapporterInntektDelerAvMånedOppgaveLøst: getRapporterInntektDelerAvMånedOppgaveDtoLøst(),
    endretStartdatoOppgave: getEndretStartdatoOppgaveDto(),
    endretStartdatoOppgaveLøst: getEndretStartdatoOppgaveDtoLøst(),
    endretSluttdatoOppgave: getEndretSluttdatoOppgaveDto(),
    endretSluttdatoOppgaveLøst: getEndretSluttdatoOppgaveDtoLøst(),
    endretStartOgSluttdatoOppgave: getEndretStartOgSluttdatoOppgaveDto(),
    bekreftAvvikOppgave: getBekreftAvvikOppgaveDto(),
    bekreftAvvikOppgaveDelerAvMÅned: getBekreftAvvikOppgaveDelerAvMånedDto(),
    bekreftAvvikOppgaveLøst: getBekreftAvvikOppgaveDtoLøst(),
    søkYtelseOppgave: getSøkYtelseOppgaveDto(),
    søkYtelseOppgaveLøst: getSøkYtelseOppgaveDtoLøst(),
    meldtUtOppgaveLøst: getMeldtUtOppgaveDtoLøst(),
    meldtUtOppgave: getMeldtUtOppgaveDto(),
    fjernetPeriode: getFjernetPeriodeOppgaveDto(),
    fjernetPeriodeLøst: getFjernetPeriodeOppgaveDtoLøst(),
});

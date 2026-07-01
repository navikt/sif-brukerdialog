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
    const mockToday = getMockToday();
    // Bruk UTC-delene fra mockToday for å unngå at startOf('month') gir feil måned
    // i tidssoner vest for UTC (f.eks. America/Los_Angeles).
    const startOfUtcMonth = new Date(mockToday.getUTCFullYear(), mockToday.getUTCMonth(), 1);
    return {
        deltakelseFraOgMed: dayjs(startOfUtcMonth).subtract(46, 'days').startOf('week'),
        oppgaveMåned: dayjs(startOfUtcMonth),
    };
};

const createDateTimeString = (date: dayjs.Dayjs): string => date.format('YYYY-MM-DDTHH:mm:ss.SSSZ');

const getSøkYtelseOppgaveDto = (): BrukerdialogOppgaveDto => {
    const søkYtelseDay = dayjs(getMockToday()).subtract(2, 'months');
    return {
        oppgaveReferanse: 'e632b20a-b0c9-4953-97ec-851ebd1a0e92',
        oppgavetype: OppgaveType.SØK_YTELSE,
        ytelsetype: OppgaveYtelsetype.UNGDOMSYTELSE,
        status: OppgaveStatus.ULØST,
        frist: createDateTimeString(getDatoer().oppgaveMåned.add(14, 'days').add(7, 'hours')),
        oppgavetypeData: {
            type: 'SØK_YTELSE',
            fomDato: dateToISODate(søkYtelseDay),
        },
        opprettetDato: createDateTimeString(søkYtelseDay),
    };
};

const getSøkYtelseOppgaveDtoLøst = (): BrukerdialogOppgaveDto => {
    const oppgave = getSøkYtelseOppgaveDto();
    return {
        ...oppgave,
        status: OppgaveStatus.LØST,
        løstDato: createDateTimeString(
            dayjs(oppgave.opprettetDato).add(12, 'days').endOf('day').subtract(2.3, 'hours'),
        ),
    };
};

const getEndretStartdatoOppgaveDto = (): BrukerdialogOppgaveDto => ({
    oppgaveReferanse: '3d3e98b5-48e7-42c6-9fc1-e0f78022307f',
    oppgavetype: OppgaveType.BEKREFT_ENDRET_STARTDATO,
    ytelsetype: OppgaveYtelsetype.UNGDOMSYTELSE,
    oppgavetypeData: {
        type: 'ENDRET_STARTDATO',
        nyStartdato: dateToISODate(dayjs(getDatoer().deltakelseFraOgMed).add(1, 'week').startOf('week')),
        forrigeStartdato: dateToISODate(getDatoer().deltakelseFraOgMed),
    },
    respons: {
        type: 'VARSEL_SVAR',
        harUttalelse: false,
    },
    status: OppgaveStatus.ULØST,
    opprettetDato: createDateTimeString(getDatoer().oppgaveMåned.add(3, 'hours')),
    frist: createDateTimeString(getDatoer().oppgaveMåned.add(14, 'days').add(7, 'hours')),
});

const getEndretStartdatoOppgaveDtoLøst = (): BrukerdialogOppgaveDto => ({
    oppgaveReferanse: '3d3e98b5-48e7-42c6-9fc1-e0f780223077',
    oppgavetype: OppgaveType.BEKREFT_ENDRET_STARTDATO,
    ytelsetype: OppgaveYtelsetype.UNGDOMSYTELSE,
    oppgavetypeData: {
        type: 'ENDRET_STARTDATO',
        nyStartdato: dateToISODate(dayjs(getDatoer().deltakelseFraOgMed).add(1, 'week').startOf('week')),
        forrigeStartdato: dateToISODate(getDatoer().deltakelseFraOgMed),
    },
    respons: {
        type: 'VARSEL_SVAR',
        harUttalelse: false,
    },
    status: OppgaveStatus.LØST,
    opprettetDato: createDateTimeString(getDatoer().oppgaveMåned.add(3, 'hours')),
    frist: createDateTimeString(getDatoer().oppgaveMåned.add(7, 'days').add(7, 'hours')),
    løstDato: createDateTimeString(getDatoer().oppgaveMåned.add(3, 'days').startOf('day').add(12, 'hours')),
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
    opprettetDato: '2025-09-22T07:39:32.420+02:00',
    frist: '2025-09-23T09:39:32.310+02:00',
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
    opprettetDato: '2025-09-22T07:39:32.420+02:00',
    løstDato: '2025-09-22T07:40:05.767+02:00',
    frist: '2025-09-23T09:39:32.310+02:00',
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
    opprettetDato: '2025-09-22T07:39:32.420+02:00',
    frist: '2025-09-23T09:39:32.310+02:00',
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
    opprettetDato: '2025-09-22T07:39:32.420+02:00',
    løstDato: '2025-09-22T07:40:05.767+02:00',
    frist: '2025-09-23T09:39:32.310+02:00',
});

const getRapporterInntektOppgaveDto = (): BrukerdialogOppgaveDto => ({
    oppgaveReferanse: 'f3e1b0e2-3f3c-4e2d-8f7a-5c3e5e6b7a8c',
    oppgavetype: OppgaveType.RAPPORTER_INNTEKT,
    ytelsetype: OppgaveYtelsetype.UNGDOMSYTELSE,
    status: OppgaveStatus.ULØST,
    opprettetDato: getDatoer().oppgaveMåned.add(3, 'hours').format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
    frist: getDatoer().oppgaveMåned.add(7, 'days').add(7, 'hours').format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
    oppgavetypeData: {
        type: 'INNTEKTSRAPPORTERING',
        fraOgMed: dateToISODate(getDatoer().oppgaveMåned.startOf('month')),
        tilOgMed: dateToISODate(getDatoer().oppgaveMåned.endOf('month')),
        gjelderDelerAvMåned: false,
    },
});

const getRapporterInntektOppgaveDtoLøst = (): BrukerdialogOppgaveDto => ({
    oppgaveReferanse: 'f4e1b0e2-3f3c-4e2d-8f7a-5c3e5e6b7a89',
    oppgavetype: OppgaveType.RAPPORTER_INNTEKT,
    ytelsetype: OppgaveYtelsetype.UNGDOMSYTELSE,
    status: OppgaveStatus.LØST,
    opprettetDato: getDatoer().oppgaveMåned.add(3, 'hours').format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
    frist: getDatoer().oppgaveMåned.add(7, 'days').add(7, 'hours').format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
    løstDato: getDatoer().oppgaveMåned.add(4, 'days').add(12, 'hours').format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
    oppgavetypeData: {
        type: 'INNTEKTSRAPPORTERING',
        fraOgMed: dateToISODate(getDatoer().oppgaveMåned.startOf('month')),
        tilOgMed: dateToISODate(getDatoer().oppgaveMåned.endOf('month')),
        gjelderDelerAvMåned: false,
    },
    respons: {
        type: 'RAPPORTERT_INNTEKT',
        fraOgMed: dateToISODate(getDatoer().oppgaveMåned.startOf('month')),
        tilOgMed: dateToISODate(getDatoer().oppgaveMåned.endOf('month')),
        arbeidstakerOgFrilansInntekt: 23000,
    } as any,
});

const getRapporterInntektDelerAvMånedOppgaveDto = (): BrukerdialogOppgaveDto => ({
    oppgaveReferanse: 'f3e1b0e2-3f3c-4e2d-8f7a-5c3e5e6b7a82',
    oppgavetype: OppgaveType.RAPPORTER_INNTEKT,
    ytelsetype: OppgaveYtelsetype.UNGDOMSYTELSE,
    status: OppgaveStatus.ULØST,
    opprettetDato: getDatoer().oppgaveMåned.add(3, 'hours').format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
    frist: getDatoer().oppgaveMåned.add(7, 'days').add(7, 'hours').format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
    oppgavetypeData: {
        type: 'INNTEKTSRAPPORTERING',
        fraOgMed: dateToISODate(getDatoer().oppgaveMåned.startOf('month')),
        tilOgMed: dateToISODate(getDatoer().oppgaveMåned.endOf('month').subtract(4, 'days')),
        gjelderDelerAvMåned: true,
    },
});

const getRapporterInntektDelerAvMånedOppgaveDtoLøst = (): BrukerdialogOppgaveDto => ({
    oppgaveReferanse: 'f4e1b0e2-3f3c-4e2d-8f7a-5c3e5e6b7a8c',
    oppgavetype: OppgaveType.RAPPORTER_INNTEKT,
    ytelsetype: OppgaveYtelsetype.UNGDOMSYTELSE,
    status: OppgaveStatus.LØST,
    opprettetDato: getDatoer().oppgaveMåned.add(3, 'hours').format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
    frist: getDatoer().oppgaveMåned.add(7, 'days').add(7, 'hours').format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
    løstDato: getDatoer().oppgaveMåned.add(4, 'days').add(12, 'hours').format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
    oppgavetypeData: {
        type: 'INNTEKTSRAPPORTERING',
        fraOgMed: dateToISODate(getDatoer().oppgaveMåned.startOf('month')),
        tilOgMed: dateToISODate(getDatoer().oppgaveMåned.endOf('month').subtract(4, 'days')),
        gjelderDelerAvMåned: true,
    },
    respons: {
        type: 'RAPPORTERT_INNTEKT',
        fraOgMed: dateToISODate(getDatoer().oppgaveMåned.startOf('month')),
        tilOgMed: dateToISODate(getDatoer().oppgaveMåned.endOf('month')),
        arbeidstakerOgFrilansInntekt: 23000,
    },
});

const getBekreftAvvikOppgaveDto = (): BrukerdialogOppgaveDto => ({
    oppgaveReferanse: 'be07ce74-9cb5-4012-bbae-5ab0940b04f7',
    oppgavetype: OppgaveType.BEKREFT_AVVIK_REGISTERINNTEKT,
    ytelsetype: OppgaveYtelsetype.UNGDOMSYTELSE,
    oppgavetypeData: {
        type: 'KONTROLLER_REGISTERINNTEKT',
        fraOgMed: dateToISODate(getDatoer().oppgaveMåned.subtract(1, 'month').startOf('month')),
        tilOgMed: dateToISODate(getDatoer().oppgaveMåned.subtract(1, 'month').endOf('month')),
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
    frist: getDatoer().oppgaveMåned.add(28, 'days').add(7, 'hours').format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
    opprettetDato: getDatoer().oppgaveMåned.add(3, 'hours').format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
    status: OppgaveStatus.ULØST,
});

const getBekreftAvvikOppgaveDelerAvMånedDto = (): BrukerdialogOppgaveDto => ({
    oppgaveReferanse: 'be06ce74-9cb5-4000-bbae-5ab0940b04f7',
    oppgavetype: OppgaveType.BEKREFT_AVVIK_REGISTERINNTEKT,
    ytelsetype: OppgaveYtelsetype.UNGDOMSYTELSE,
    oppgavetypeData: {
        type: 'KONTROLLER_REGISTERINNTEKT',
        fraOgMed: dateToISODate(getDatoer().oppgaveMåned.subtract(1, 'month').startOf('month')),
        tilOgMed: dateToISODate(getDatoer().oppgaveMåned.subtract(1, 'month').add(15, 'days').startOf('week')),

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
    frist: getDatoer().oppgaveMåned.add(28, 'days').add(7, 'hours').format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
    opprettetDato: getDatoer().oppgaveMåned.add(3, 'hours').format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
    status: OppgaveStatus.ULØST,
});

const getBekreftAvvikOppgaveDtoLøst = (): BrukerdialogOppgaveDto => ({
    ...getBekreftAvvikOppgaveDto(),
    oppgavetypeData: {
        type: 'KONTROLLER_REGISTERINNTEKT',
        fraOgMed: dateToISODate(getDatoer().oppgaveMåned.startOf('month')),
        tilOgMed: dateToISODate(getDatoer().oppgaveMåned.endOf('month')),
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
    løstDato: getDatoer().oppgaveMåned.add(28, 'days').add(54, 'hours').format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
});

const getFjernetPeriodeOppgaveDto = (): BrukerdialogOppgaveDto => ({
    oppgaveReferanse: 'de06ce74-9cb5-4000-bbae-5ab0940b04f7',
    oppgavetype: OppgaveType.BEKREFT_ENDRET_PERIODE,
    ytelsetype: OppgaveYtelsetype.UNGDOMSYTELSE,
    oppgavetypeData: {
        type: 'ENDRET_PERIODE',
        endringer: [PeriodeEndringType.FJERNET_PERIODE],
        forrigePeriode: {
            fomDato: dateToISODate(getDatoer().oppgaveMåned.startOf('month')),
            tomDato: dateToISODate(getDatoer().oppgaveMåned.endOf('month')),
        },
    },
    status: OppgaveStatus.ULØST,
    opprettetDato: getDatoer().oppgaveMåned.add(3, 'hours').format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
    frist: getDatoer().oppgaveMåned.add(14, 'days').add(7, 'hours').format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
});

const getFjernetPeriodeOppgaveDtoLøst = (): BrukerdialogOppgaveDto => ({
    oppgaveReferanse: 'de06ce74-9cb5-4000-bbae-5ab0940b04f2',
    oppgavetype: OppgaveType.BEKREFT_ENDRET_PERIODE,
    ytelsetype: OppgaveYtelsetype.UNGDOMSYTELSE,
    oppgavetypeData: {
        type: 'ENDRET_PERIODE',
        endringer: [PeriodeEndringType.FJERNET_PERIODE],
        forrigePeriode: {
            fomDato: dateToISODate(getDatoer().oppgaveMåned.startOf('month')),
            tomDato: dateToISODate(getDatoer().oppgaveMåned.endOf('month')),
        },
    },
    status: OppgaveStatus.LØST,
    opprettetDato: getDatoer().oppgaveMåned.add(3, 'hours').format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
    frist: getDatoer().oppgaveMåned.add(14, 'days').add(7, 'hours').format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
    løstDato: getDatoer().oppgaveMåned.add(28, 'days').add(54, 'hours').format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
});

const getBekreftOpphørVedMaksdatoOppgaveDto = (): BrukerdialogOppgaveDto => ({
    oppgaveReferanse: 'ae12cd84-1bc5-4f3a-9d2e-7b4a8c3f1e90',
    oppgavetype: OppgaveType.BEKREFT_OPPHOR_VED_MAKSDATO,
    ytelsetype: OppgaveYtelsetype.UNGDOMSYTELSE,
    oppgavetypeData: {
        type: 'OPPHOR_VED_MAKSDATO',
        maxDato: dateToISODate(getDatoer().oppgaveMåned.add(30, 'days')),
        sluttdato: dateToISODate(getDatoer().oppgaveMåned.add(30, 'days')),
    },
    status: OppgaveStatus.ULØST,
    opprettetDato: getDatoer().oppgaveMåned.add(3, 'hours').format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
    frist: getDatoer().oppgaveMåned.add(14, 'days').add(7, 'hours').format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
});

const getBekreftOpphørVedMaksdatoOppgaveDtoLøst = (): BrukerdialogOppgaveDto => ({
    ...getBekreftOpphørVedMaksdatoOppgaveDto(),
    oppgaveReferanse: 'ae12cd84-1bc5-4f3a-9d2e-7b4a8c3f1e91',
    respons: {
        type: 'VARSEL_SVAR',
        harUttalelse: false,
    },
    status: OppgaveStatus.LØST,
    løstDato: getDatoer().oppgaveMåned.add(5, 'days').add(10, 'hours').format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
});

const getEndretStartOgSluttdatoOppgaveDto = (): BrukerdialogOppgaveDto => ({
    oppgaveReferanse: 'de06ce74-9cb5-4000-bbae-5ab0940b04f6',
    oppgavetype: OppgaveType.BEKREFT_ENDRET_PERIODE,
    ytelsetype: OppgaveYtelsetype.UNGDOMSYTELSE,
    oppgavetypeData: {
        type: 'ENDRET_PERIODE',
        endringer: [PeriodeEndringType.ENDRET_SLUTTDATO, PeriodeEndringType.ENDRET_STARTDATO],
        forrigePeriode: {
            fomDato: dateToISODate(getDatoer().oppgaveMåned.startOf('month')),
        },
        nyPeriode: {
            fomDato: dateToISODate(getDatoer().oppgaveMåned.add(1, 'month').startOf('month')),
            tomDato: dateToISODate(getDatoer().oppgaveMåned.add(1, 'month').endOf('month')),
        },
    },
    status: OppgaveStatus.ULØST,
    opprettetDato: getDatoer().oppgaveMåned.add(3, 'hours').format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
    frist: getDatoer().oppgaveMåned.add(14, 'days').add(7, 'hours').format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
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
    bekreftOpphørVedMaksdatoOppgave: getBekreftOpphørVedMaksdatoOppgaveDto(),
    bekreftOpphørVedMaksdatoOppgaveLøst: getBekreftOpphørVedMaksdatoOppgaveDtoLøst(),
});

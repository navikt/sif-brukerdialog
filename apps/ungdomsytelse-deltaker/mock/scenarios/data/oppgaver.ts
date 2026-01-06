import {
    OppgaveDto,
    OppgaveStatus,
    Oppgavetype,
    PeriodeEndringType,
} from '@navikt/ung-deltakelse-opplyser-api-deltaker';
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

const getSøkYtelseOppgaveDto = (): OppgaveDto => {
    const søkYtelseDay = dayjs(getMockToday()).subtract(2, 'months');
    return {
        oppgaveReferanse: 'e632b20a-b0c9-4953-97ec-851ebd1a0e91',
        oppgavetype: Oppgavetype.SØK_YTELSE,
        status: OppgaveStatus.ULØST,
        frist: getDatoer().oppgaveMåned.add(14, 'days').add(7, 'hours').toISOString(),
        oppgavetypeData: {
            fomDato: dateToISODate(søkYtelseDay.toDate()),
        },
        opprettetDato: søkYtelseDay.toISOString(),
    };
};

const getSøkYtelseOppgaveDtoLøst = (): OppgaveDto => {
    const oppgave = getSøkYtelseOppgaveDto();
    return {
        ...oppgave,
        status: OppgaveStatus.LØST,
        løstDato: dayjs(oppgave.opprettetDato).add(12, 'days').endOf('day').subtract(2.3, 'hours').toISOString(),
    };
};

const getEndretStartdatoOppgaveDto = (): OppgaveDto => ({
    oppgaveReferanse: '3d3e98b5-48e7-42c6-9fc1-e0f78022307f',
    oppgavetype: Oppgavetype.BEKREFT_ENDRET_STARTDATO,
    oppgavetypeData: {
        nyStartdato: dateToISODate(dayjs(getDatoer().deltakelseFraOgMed).add(1, 'week').startOf('week').toDate()),
        forrigeStartdato: dateToISODate(getDatoer().deltakelseFraOgMed.toDate()),
    },
    bekreftelse: {
        harUttalelse: false,
    },
    status: OppgaveStatus.ULØST,
    opprettetDato: getDatoer().oppgaveMåned.add(3, 'hours').toISOString(),
    frist: getDatoer().oppgaveMåned.add(14, 'days').add(7, 'hours').toISOString(),
});

const getEndretStartdatoOppgaveDtoLøst = (): OppgaveDto => ({
    oppgaveReferanse: '3d3e98b5-48e7-42c6-9fc1-e0f780223077',
    oppgavetype: Oppgavetype.BEKREFT_ENDRET_STARTDATO,
    oppgavetypeData: {
        nyStartdato: dateToISODate(dayjs(getDatoer().deltakelseFraOgMed).add(1, 'week').startOf('week').toDate()),
        forrigeStartdato: dateToISODate(getDatoer().deltakelseFraOgMed.toDate()),
    },
    bekreftelse: {
        harUttalelse: false,
    },
    status: OppgaveStatus.LØST,
    opprettetDato: getDatoer().oppgaveMåned.add(3, 'hours').toISOString(),
    frist: getDatoer().oppgaveMåned.add(7, 'days').add(7, 'hours').toISOString(),
    løstDato: getDatoer().oppgaveMåned.add(3, 'days').startOf('day').add(12, 'hours').toISOString(),
});

const getMeldtUtOppgaveDto = (): OppgaveDto => ({
    oppgaveReferanse: 'd6d6d462-66cd-4d87-a015-4709637a7927',
    oppgavetype: Oppgavetype.BEKREFT_ENDRET_SLUTTDATO,
    oppgavetypeData: {
        nySluttdato: '2026-01-29',
    },
    status: OppgaveStatus.ULØST,
    opprettetDato: '2025-09-22T05:39:32.420085Z',
    frist: '2025-09-23T07:39:32.310154Z',
});

const getMeldtUtOppgaveDtoLøst = (): OppgaveDto => ({
    oppgaveReferanse: 'd6d6d462-66cd-4d87-a015-4709637a7921',
    oppgavetype: Oppgavetype.BEKREFT_ENDRET_SLUTTDATO,
    oppgavetypeData: {
        nySluttdato: '2026-01-29',
        forrigeSluttdato: '2026-01-30',
    },
    bekreftelse: {
        harUttalelse: false,
    },
    status: OppgaveStatus.LØST,
    opprettetDato: '2025-09-22T05:39:32.420085Z',
    løstDato: '2025-09-22T05:40:05.767753Z',
    frist: '2025-09-23T07:39:32.310154Z',
});

const getEndretSluttdatoOppgaveDto = (): OppgaveDto => ({
    oppgaveReferanse: 'd6d6d462-66cd-4d87-a015-4709637a7928',
    oppgavetype: Oppgavetype.BEKREFT_ENDRET_SLUTTDATO,
    oppgavetypeData: {
        nySluttdato: '2026-01-24',
        forrigeSluttdato: '2026-01-25',
    },
    status: OppgaveStatus.ULØST,
    opprettetDato: '2025-09-22T05:39:32.420085Z',
    åpnetDato: '2025-09-22T05:39:34.793877Z',
    frist: '2025-09-23T07:39:32.310154Z',
});

const getEndretSluttdatoOppgaveDtoLøst = (): OppgaveDto => ({
    oppgaveReferanse: 'd6d6d462-66cd-4d87-a015-4709637a7929',
    oppgavetype: Oppgavetype.BEKREFT_ENDRET_SLUTTDATO,
    oppgavetypeData: {
        nySluttdato: '2026-01-29',
        forrigeSluttdato: '2026-01-30',
    },
    bekreftelse: {
        harUttalelse: true,
        uttalelseFraBruker: 'teste',
    },
    status: OppgaveStatus.LØST,
    opprettetDato: '2025-09-22T05:39:32.420085Z',
    løstDato: '2025-09-22T05:40:05.767753Z',
    åpnetDato: '2025-09-22T05:39:34.793877Z',
    frist: '2025-09-23T07:39:32.310154Z',
});

const getRapporterInntektOppgaveDto = (): OppgaveDto => ({
    oppgaveReferanse: 'f3e1b0e2-3f3c-4e2d-8f7a-5c3e5e6b7a8c',
    oppgavetype: Oppgavetype.RAPPORTER_INNTEKT,
    status: OppgaveStatus.ULØST,
    opprettetDato: getDatoer().oppgaveMåned.add(3, 'hours').toISOString(),
    frist: getDatoer().oppgaveMåned.add(7, 'days').add(7, 'hours').toISOString(),
    oppgavetypeData: {
        fraOgMed: dateToISODate(getDatoer().oppgaveMåned.startOf('month').toDate()),
        tilOgMed: dateToISODate(getDatoer().oppgaveMåned.endOf('month').toDate()),
        gjelderDelerAvMåned: false,
    },
});

const getRapporterInntektOppgaveDtoLøst = (): OppgaveDto => ({
    oppgaveReferanse: 'f4e1b0e2-3f3c-4e2d-8f7a-5c3e5e6b7a89',
    oppgavetype: Oppgavetype.RAPPORTER_INNTEKT,
    status: OppgaveStatus.LØST,
    opprettetDato: getDatoer().oppgaveMåned.add(3, 'hours').toISOString(),
    frist: getDatoer().oppgaveMåned.add(7, 'days').add(7, 'hours').toISOString(),
    løstDato: getDatoer().oppgaveMåned.add(4, 'days').add(12, 'hours').toISOString(),
    oppgavetypeData: {
        fraOgMed: dateToISODate(getDatoer().oppgaveMåned.startOf('month').toDate()),
        tilOgMed: dateToISODate(getDatoer().oppgaveMåned.endOf('month').toDate()),
        rapportertInntekt: {
            fraOgMed: dateToISODate(getDatoer().oppgaveMåned.startOf('month').toDate()),
            tilOgMed: dateToISODate(getDatoer().oppgaveMåned.endOf('month').toDate()),
            arbeidstakerOgFrilansInntekt: 23000,
        },
        gjelderDelerAvMåned: false,
    },
});

const getRapporterInntektDelerAvMånedOppgaveDto = (): OppgaveDto => ({
    oppgaveReferanse: 'f3e1b0e2-3f3c-4e2d-8f7a-5c3e5e6b7a82',
    oppgavetype: Oppgavetype.RAPPORTER_INNTEKT,
    status: OppgaveStatus.ULØST,
    opprettetDato: getDatoer().oppgaveMåned.add(3, 'hours').toISOString(),
    frist: getDatoer().oppgaveMåned.add(7, 'days').add(7, 'hours').toISOString(),
    oppgavetypeData: {
        fraOgMed: dateToISODate(getDatoer().oppgaveMåned.startOf('month').toDate()),
        tilOgMed: dateToISODate(getDatoer().oppgaveMåned.endOf('month').subtract(4, 'days').toDate()),
        gjelderDelerAvMåned: true,
    },
});

const getRapporterInntektDelerAvMånedOppgaveDtoLøst = (): OppgaveDto => ({
    oppgaveReferanse: 'f4e1b0e2-3f3c-4e2d-8f7a-5c3e5e6b7a8c',
    oppgavetype: Oppgavetype.RAPPORTER_INNTEKT,
    status: OppgaveStatus.LØST,
    opprettetDato: getDatoer().oppgaveMåned.add(3, 'hours').toISOString(),
    frist: getDatoer().oppgaveMåned.add(7, 'days').add(7, 'hours').toISOString(),
    løstDato: getDatoer().oppgaveMåned.add(4, 'days').add(12, 'hours').toISOString(),
    oppgavetypeData: {
        fraOgMed: dateToISODate(getDatoer().oppgaveMåned.startOf('month').toDate()),
        tilOgMed: dateToISODate(getDatoer().oppgaveMåned.endOf('month').subtract(4, 'days').toDate()),
        rapportertInntekt: {
            fraOgMed: dateToISODate(getDatoer().oppgaveMåned.startOf('month').toDate()),
            tilOgMed: dateToISODate(getDatoer().oppgaveMåned.endOf('month').toDate()),
            arbeidstakerOgFrilansInntekt: 23000,
        },
        gjelderDelerAvMåned: true,
    },
});

const getBekreftAvvikOppgaveDto = (): OppgaveDto => ({
    oppgaveReferanse: 'be07ce74-9cb5-4012-bbae-5ab0940b04f7',
    oppgavetype: Oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT,
    oppgavetypeData: {
        fraOgMed: dateToISODate(getDatoer().oppgaveMåned.subtract(1, 'month').startOf('month').toDate()),
        tilOgMed: dateToISODate(getDatoer().oppgaveMåned.subtract(1, 'month').endOf('month').toDate()),
        registerinntekt: {
            arbeidOgFrilansInntekter: [
                {
                    inntekt: 20000,
                    arbeidsgiver: '947064649',
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

const getBekreftAvvikOppgaveDelerAvMånedDto = (): OppgaveDto => ({
    oppgaveReferanse: 'be06ce74-9cb5-4000-bbae-5ab0940b04f7',
    oppgavetype: Oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT,
    oppgavetypeData: {
        fraOgMed: dateToISODate(getDatoer().oppgaveMåned.subtract(1, 'month').startOf('month').toDate()),
        tilOgMed: dateToISODate(getDatoer().oppgaveMåned.subtract(1, 'month').add(15, 'days').startOf('week').toDate()),

        registerinntekt: {
            arbeidOgFrilansInntekter: [
                {
                    inntekt: 20000,
                    arbeidsgiver: '947064649',
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

const getBekreftAvvikOppgaveDtoLøst = (): OppgaveDto => ({
    ...getBekreftAvvikOppgaveDto(),
    oppgavetypeData: {
        fraOgMed: dateToISODate(getDatoer().oppgaveMåned.startOf('month').toDate()),
        tilOgMed: dateToISODate(getDatoer().oppgaveMåned.endOf('month').toDate()),
        registerinntekt: {
            arbeidOgFrilansInntekter: [
                {
                    inntekt: 20000,
                    arbeidsgiver: '947064649',
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
    bekreftelse: {
        harUttalelse: false,
    },
    status: OppgaveStatus.LØST,
    løstDato: getDatoer().oppgaveMåned.add(28, 'days').add(54, 'hours').toISOString(),
});

const getFjernetPeriodeOppgaveDto = (): OppgaveDto => ({
    oppgaveReferanse: 'de06ce74-9cb5-4000-bbae-5ab0940b04f7',
    oppgavetype: Oppgavetype.BEKREFT_ENDRET_PERIODE,
    oppgavetypeData: {
        endringer: [PeriodeEndringType.FJERNET_PERIODE],
        forrigePeriode: {
            fom: dateToISODate(getDatoer().oppgaveMåned.startOf('month').toDate()),
            tom: dateToISODate(getDatoer().oppgaveMåned.endOf('month').toDate()),
        },
    },
    status: OppgaveStatus.ULØST,
    opprettetDato: getDatoer().oppgaveMåned.add(3, 'hours').toISOString(),
    frist: getDatoer().oppgaveMåned.add(14, 'days').add(7, 'hours').toISOString(),
});

const getEndretStartOgSluttdatoOppgaveDto = (): OppgaveDto => ({
    oppgaveReferanse: 'de06ce74-9cb5-4000-bbae-5ab0940b04f6',
    oppgavetype: Oppgavetype.BEKREFT_ENDRET_PERIODE,
    oppgavetypeData: {
        endringer: [PeriodeEndringType.ENDRET_SLUTTDATO, PeriodeEndringType.ENDRET_STARTDATO],
        forrigePeriode: {
            fom: dateToISODate(getDatoer().oppgaveMåned.startOf('month').toDate()),
        },
        nyPeriode: {
            fom: dateToISODate(getDatoer().oppgaveMåned.add(1, 'month').startOf('month').toDate()),
            tom: dateToISODate(getDatoer().oppgaveMåned.add(1, 'month').endOf('month').toDate()),
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
});

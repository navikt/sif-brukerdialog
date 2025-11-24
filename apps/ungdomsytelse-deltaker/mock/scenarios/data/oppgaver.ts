import { OppgaveDto, OppgaveStatus, Oppgavetype } from '@navikt/ung-deltakelse-opplyser-api-deltaker';
import dayjs from 'dayjs';

import { dateToISODate } from '../../utils/dateUtils';
import { getMockToday } from '../../utils/mockDate';

const getDatoer = () => {
    const datoer = {
        deltakelseFraOgMed: dayjs(getMockToday()).subtract(46, 'days').startOf('week'),
        oppgaveMåned: dayjs(getMockToday()).startOf('month'),
        løstOppgaveMåned: dayjs(getMockToday()).startOf('month'),
    };
    return datoer;
};

const getSøkYtelseOppgave = (): OppgaveDto => {
    const søkYtelseDay = dayjs(getMockToday()).subtract(2, 'months');
    return {
        oppgaveReferanse: 'e632b20a-b0c9-4953-97ec-851ebd1a0e91',
        oppgavetype: Oppgavetype.SØK_YTELSE,
        status: OppgaveStatus.ULØST,
        frist: getDatoer().løstOppgaveMåned.subtract(1, 'month').add(14, 'days').add(7, 'hours').toISOString(),
        oppgavetypeData: {
            fomDato: dateToISODate(søkYtelseDay.subtract(1, 'month').toDate()),
        },
        opprettetDato: søkYtelseDay.toISOString(),
    };
};

const getSøkYtelseOppgaveLøst = (): OppgaveDto => {
    const oppgave = getSøkYtelseOppgave();
    return {
        ...oppgave,
        status: OppgaveStatus.LØST,
        løstDato: dayjs(oppgave.opprettetDato).add(12, 'days').endOf('day').subtract(2.3, 'hours').toISOString(),
    };
};

const getEndretStartdatoOppgave = (): OppgaveDto => ({
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
    frist: getDatoer().oppgaveMåned.add(7, 'days').add(7, 'hours').toISOString(),
});

const getEndretStartdatoOppgaveLøst = (): OppgaveDto => ({
    oppgaveReferanse: '3d3e98b5-48e7-42c6-9fc1-e0f78022307f',
    oppgavetype: Oppgavetype.BEKREFT_ENDRET_STARTDATO,
    oppgavetypeData: {
        nyStartdato: dateToISODate(dayjs(getDatoer().deltakelseFraOgMed).add(1, 'week').startOf('week').toDate()),
        forrigeStartdato: dateToISODate(getDatoer().deltakelseFraOgMed.toDate()),
    },
    bekreftelse: {
        harUttalelse: false,
    },
    status: OppgaveStatus.LØST,
    opprettetDato: getDatoer().løstOppgaveMåned.add(3, 'hours').toISOString(),
    frist: getDatoer().løstOppgaveMåned.add(7, 'days').add(7, 'hours').toISOString(),
    løstDato: getDatoer().løstOppgaveMåned.add(3, 'days').startOf('day').add(12, 'hours').toISOString(),
});

const getMeldtUtOppgave = (): OppgaveDto => ({
    oppgaveReferanse: 'd6d6d462-66cd-4d87-a015-4709637a7927',
    oppgavetype: Oppgavetype.BEKREFT_ENDRET_SLUTTDATO,
    oppgavetypeData: {
        nySluttdato: '2026-01-29',
    },
    status: OppgaveStatus.ULØST,
    opprettetDato: '2025-09-22T05:39:32.420085Z',
    frist: '2025-09-23T07:39:32.310154Z',
});

const getMeldtUtOppgaveLøst = (): OppgaveDto => ({
    oppgaveReferanse: 'd6d6d462-66cd-4d87-a015-4709637a7927',
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

const getEndretSluttdatoOppgave = (): OppgaveDto => ({
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

const getEndretSluttdatoOppgaveLøst = (): OppgaveDto => ({
    oppgaveReferanse: 'd6d6d462-66cd-4d87-a015-4709637a7928',
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

const getRapporterInntektOppgave = (): OppgaveDto => ({
    oppgaveReferanse: 'f3e1b0e2-3f3c-4e2d-8f7a-5c3e5e6b7a8c',
    oppgavetype: Oppgavetype.RAPPORTER_INNTEKT,
    status: OppgaveStatus.ULØST,
    opprettetDato: getDatoer().oppgaveMåned.add(3, 'hours').toISOString(),
    frist: getDatoer().oppgaveMåned.add(7, 'days').add(7, 'hours').toISOString(),
    oppgavetypeData: {
        fraOgMed: dateToISODate(getDatoer().oppgaveMåned.subtract(1, 'month').startOf('month').toDate()),
        tilOgMed: dateToISODate(getDatoer().oppgaveMåned.endOf('month').toDate()),
    },
});

const getRapporterInntektOppgaveLøst = (): OppgaveDto => ({
    oppgaveReferanse: 'f4e1b0e2-3f3c-4e2d-8f7a-5c3e5e6b7a8c',
    oppgavetype: Oppgavetype.RAPPORTER_INNTEKT,
    status: OppgaveStatus.LØST,
    opprettetDato: getDatoer().løstOppgaveMåned.add(3, 'hours').toISOString(),
    frist: getDatoer().løstOppgaveMåned.add(7, 'days').add(7, 'hours').toISOString(),
    løstDato: getDatoer().løstOppgaveMåned.add(4, 'days').add(12, 'hours').toISOString(),
    oppgavetypeData: {
        fraOgMed: dateToISODate(getDatoer().løstOppgaveMåned.startOf('month').toDate()),
        tilOgMed: dateToISODate(getDatoer().løstOppgaveMåned.endOf('month').toDate()),
        rapportertInntekt: {
            fraOgMed: dateToISODate(getDatoer().løstOppgaveMåned.startOf('month').toDate()),
            tilOgMed: dateToISODate(getDatoer().løstOppgaveMåned.endOf('month').toDate()),
            arbeidstakerOgFrilansInntekt: 23000,
        },
    },
});

const getBekreftAvvikOppgave = (): OppgaveDto => ({
    oppgaveReferanse: 'be07ce74-9cb5-4012-bbae-5ab0940b04f7',
    oppgavetype: Oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT,
    oppgavetypeData: {
        fraOgMed: dateToISODate(getDatoer().løstOppgaveMåned.subtract(1, 'month').startOf('month').toDate()),
        tilOgMed: dateToISODate(getDatoer().løstOppgaveMåned.endOf('month').toDate()),
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
    },
    frist: getDatoer().løstOppgaveMåned.add(28, 'days').add(7, 'hours').toISOString(),
    opprettetDato: getDatoer().løstOppgaveMåned.add(3, 'hours').toISOString(),
    status: OppgaveStatus.ULØST,
});

const getBekreftAvvikOppgaveLøst = (): OppgaveDto => ({
    ...getBekreftAvvikOppgave(),
    oppgavetypeData: {
        fraOgMed: dateToISODate(getDatoer().løstOppgaveMåned.subtract(1, 'month').startOf('month').toDate()),
        tilOgMed: dateToISODate(getDatoer().løstOppgaveMåned.endOf('month').toDate()),
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
    },
    bekreftelse: {
        harUttalelse: false,
    },
    frist: getDatoer().løstOppgaveMåned.add(28, 'days').add(7, 'hours').toISOString(),
    opprettetDato: getDatoer().løstOppgaveMåned.add(3, 'hours').toISOString(),
    status: OppgaveStatus.LØST,
    løstDato: getDatoer().løstOppgaveMåned.add(28, 'days').add(54, 'hours').toISOString(),
});

export const getMockOppgaver = () => ({
    rapporterInntektOppgave: getRapporterInntektOppgave(),
    rapporterInntektOppgaveLøst: getRapporterInntektOppgaveLøst(),
    endretStartdatoOppgave: getEndretStartdatoOppgave(),
    endretStartdatoOppgaveLøst: getEndretStartdatoOppgaveLøst(),
    endretSluttdatoOppgave: getEndretSluttdatoOppgave(),
    endretSluttdatoOppgaveLøst: getEndretSluttdatoOppgaveLøst(),
    bekreftAvvikOppgave: getBekreftAvvikOppgave(),
    bekreftAvvikOppgaveLøst: getBekreftAvvikOppgaveLøst(),
    søkYtelseOppgave: getSøkYtelseOppgave(),
    søkYtelseOppgaveLøst: getSøkYtelseOppgaveLøst(),
    meldtUtOppgaveLøst: getMeldtUtOppgaveLøst(),
    meldtUtOppgave: getMeldtUtOppgave(),
});

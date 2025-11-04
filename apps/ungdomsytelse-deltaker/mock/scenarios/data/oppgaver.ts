import { dateToISODate } from '@navikt/sif-common-utils';
import { OppgaveDto, OppgaveStatus, Oppgavetype } from '@navikt/ung-deltakelse-opplyser-api-deltaker';
import dayjs from 'dayjs';

const deltakelseFraOgMed = dayjs().subtract(46, 'days').startOf('week').toDate();
const oppgaveMåned = dayjs().startOf('month');
const løstOppgaveMåned = dayjs().startOf('month');

const søkYtelseDay = dayjs().subtract(2, 'months');
const getSøkYtelseOppgave = (): OppgaveDto => {
    return {
        oppgaveReferanse: 'e632b20a-b0c9-4953-97ec-851ebd1a0e91',
        oppgavetype: Oppgavetype.SØK_YTELSE,
        status: OppgaveStatus.ULØST,
        frist: løstOppgaveMåned.subtract(1, 'month').add(14, 'days').add(7, 'hours').toISOString(),
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

const endretStartdatoOppgave: OppgaveDto = {
    oppgaveReferanse: '3d3e98b5-48e7-42c6-9fc1-e0f78022307f',
    oppgavetype: Oppgavetype.BEKREFT_ENDRET_STARTDATO,
    oppgavetypeData: {
        nyStartdato: dateToISODate(dayjs(deltakelseFraOgMed).add(1, 'week').startOf('week').toDate()),
        forrigeStartdato: dateToISODate(deltakelseFraOgMed),
    },
    bekreftelse: {
        harUttalelse: false,
    },
    status: OppgaveStatus.ULØST,
    opprettetDato: oppgaveMåned.add(3, 'hours').toISOString(),
    frist: oppgaveMåned.add(8, 'days').subtract(7, 'hours').toISOString(),
};

const endretStartdatoOppgaveLøst: OppgaveDto = {
    oppgaveReferanse: '3d3e98b5-48e7-42c6-9fc1-e0f78022307f',
    oppgavetype: Oppgavetype.BEKREFT_ENDRET_STARTDATO,
    oppgavetypeData: {
        nyStartdato: dateToISODate(dayjs(deltakelseFraOgMed).add(1, 'week').startOf('week').toDate()),
        forrigeStartdato: dateToISODate(deltakelseFraOgMed),
    },
    bekreftelse: {
        harUttalelse: false,
    },
    status: OppgaveStatus.LØST,
    opprettetDato: løstOppgaveMåned.add(3, 'hours').toISOString(),
    frist: løstOppgaveMåned.add(8, 'days').subtract(7, 'hours').toISOString(),
    løstDato: løstOppgaveMåned.add(3, 'days').startOf('day').add(12, 'hours').toISOString(),
};

const meldtUtOppgave: OppgaveDto = {
    oppgaveReferanse: 'd6d6d462-66cd-4d87-a015-4709637a7927',
    oppgavetype: Oppgavetype.BEKREFT_ENDRET_SLUTTDATO,
    oppgavetypeData: {
        nySluttdato: '2026-01-29',
    },
    status: OppgaveStatus.ULØST,
    opprettetDato: '2025-09-22T05:39:32.420085Z',
    frist: '2025-09-23T07:39:32.310154Z',
};

const meldtUtOppgaveLøst: OppgaveDto = {
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
};

const endretSluttdatoOppgave: OppgaveDto = {
    oppgaveReferanse: 'd6d6d462-66cd-4d87-a015-4709637a7927',
    oppgavetype: Oppgavetype.BEKREFT_ENDRET_SLUTTDATO,
    oppgavetypeData: {
        nySluttdato: '2026-01-29',
        forrigeSluttdato: '2026-01-30',
    },
    status: OppgaveStatus.ULØST,
    opprettetDato: '2025-09-22T05:39:32.420085Z',
    åpnetDato: '2025-09-22T05:39:34.793877Z',
    frist: '2025-09-23T07:39:32.310154Z',
};

const endretSluttdatoOppgaveLøst: OppgaveDto = {
    oppgaveReferanse: 'd6d6d462-66cd-4d87-a015-4709637a7927',
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
};

const rapporterInntektOppgave: OppgaveDto = {
    oppgaveReferanse: 'f3e1b0e2-3f3c-4e2d-8f7a-5c3e5e6b7a8c',
    oppgavetype: Oppgavetype.RAPPORTER_INNTEKT,
    status: OppgaveStatus.ULØST,
    opprettetDato: oppgaveMåned.add(3, 'hours').toISOString(),
    frist: oppgaveMåned.add(8, 'days').subtract(7, 'hours').toISOString(),
    oppgavetypeData: {
        fraOgMed: dateToISODate(oppgaveMåned.subtract(1, 'month').startOf('month').toDate()),
        tilOgMed: dateToISODate(oppgaveMåned.endOf('month').toDate()),
    },
};

const rapporterInntektOppgaveLøst: OppgaveDto = {
    oppgaveReferanse: 'f4e1b0e2-3f3c-4e2d-8f7a-5c3e5e6b7a8c',
    oppgavetype: Oppgavetype.RAPPORTER_INNTEKT,
    status: OppgaveStatus.LØST,
    opprettetDato: løstOppgaveMåned.add(3, 'hours').toISOString(),
    frist: løstOppgaveMåned.add(8, 'days').subtract(7, 'hours').toISOString(),
    løstDato: løstOppgaveMåned.add(4, 'days').add(12, 'hours').toISOString(),
    oppgavetypeData: {
        fraOgMed: dateToISODate(løstOppgaveMåned.subtract(1, 'month').startOf('month').toDate()),
        tilOgMed: dateToISODate(løstOppgaveMåned.endOf('month').toDate()),
        rapportertInntekt: {
            fraOgMed: dateToISODate(løstOppgaveMåned.startOf('month').toDate()),
            tilOgMed: dateToISODate(løstOppgaveMåned.endOf('month').toDate()),
            arbeidstakerOgFrilansInntekt: 23000,
        },
    },
};

const bekreftAvvikOppgave: OppgaveDto = {
    oppgaveReferanse: 'be07ce74-9cb5-4012-bbae-5ab0940b04f7',
    oppgavetype: Oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT,
    oppgavetypeData: {
        fraOgMed: dateToISODate(løstOppgaveMåned.subtract(1, 'month').startOf('month').toDate()),
        tilOgMed: dateToISODate(løstOppgaveMåned.endOf('month').toDate()),
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
    frist: løstOppgaveMåned.add(8, 'days').subtract(7, 'hours').toISOString(),
    opprettetDato: løstOppgaveMåned.add(3, 'hours').toISOString(),
    status: OppgaveStatus.ULØST,
};

const bekreftAvvikOppgaveLøst: OppgaveDto = {
    ...bekreftAvvikOppgave,
    oppgaveReferanse: 'be07ce74-9cb5-4012-bbae-5ab0940b04f7',
    oppgavetype: Oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT,
    oppgavetypeData: {
        fraOgMed: dateToISODate(løstOppgaveMåned.subtract(1, 'month').startOf('month').toDate()),
        tilOgMed: dateToISODate(løstOppgaveMåned.endOf('month').toDate()),
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
    frist: løstOppgaveMåned.add(8, 'days').subtract(7, 'hours').toISOString(),
    opprettetDato: løstOppgaveMåned.add(3, 'hours').toISOString(),
    status: OppgaveStatus.LØST,
    løstDato: løstOppgaveMåned.add(8, 'days').add(54, 'hours').toISOString(),
};

export const mockOppgaver = {
    rapporterInntektOppgave,
    rapporterInntektOppgaveLøst,
    endretStartdatoOppgave,
    endretStartdatoOppgaveLøst,
    endretSluttdatoOppgave,
    endretSluttdatoOppgaveLøst,
    bekreftAvvikOppgave,
    bekreftAvvikOppgaveLøst,
    søkYtelseOppgave: getSøkYtelseOppgave(),
    søkYtelseOppgaveLøst: getSøkYtelseOppgaveLøst(),
    meldtUtOppgaveLøst,
    meldtUtOppgave,
};

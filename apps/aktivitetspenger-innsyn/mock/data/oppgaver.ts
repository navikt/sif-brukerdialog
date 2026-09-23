import {
    AndreLivsoppholdsytelserAvklaringKildeType,
    AndreLivsoppholdsytelserIkkeOppfyltÅrsak,
    BostedsavklaringKildeType,
    BostedsvilkårIkkeOppfyltÅrsak,
    BrukerdialogOppgaveDto,
    OppgaveStatus,
    OppgaveType,
    OppgaveYtelsetype,
} from '@navikt/ung-brukerdialog-api';
import { dateToISODate } from '@sif/utils';
import dayjs from 'dayjs';

import { getMockToday } from '../utils/mockDate';
import { mockVarseltekster } from './varseltekster';

const getDatoer = () => {
    const datoer = {
        deltakelseFraOgMed: dayjs(getMockToday()).subtract(46, 'days').startOf('week'),
        oppgaveMåned: dayjs(getMockToday()).startOf('month'),
    };
    return datoer;
};

const getRapporterInntektOppgaveDto = (): BrukerdialogOppgaveDto => ({
    oppgaveReferanse: 'f3e1b0e2-3f3c-4e2d-8f7a-5c3e5e6b7a8c',
    oppgavetype: OppgaveType.RAPPORTER_INNTEKT,
    status: OppgaveStatus.ULØST,
    opprettetDato: getDatoer().oppgaveMåned.add(3, 'hours').toISOString(),
    frist: getDatoer().oppgaveMåned.add(7, 'days').add(7, 'hours').toISOString(),
    oppgavetypeData: {
        type: 'INNTEKTSRAPPORTERING',
        fraOgMed: dateToISODate(getDatoer().oppgaveMåned.startOf('month')),
        tilOgMed: dateToISODate(getDatoer().oppgaveMåned.endOf('month')),
        gjelderDelerAvMåned: false,
    },
    ytelsetype: OppgaveYtelsetype.AKTIVITETSPENGER,
});

const getRapporterInntektOppgaveDtoLøst = (): BrukerdialogOppgaveDto => ({
    oppgaveReferanse: 'f4e1b0e2-3f3c-4e2d-8f7a-5c3e5e6b7a89',
    oppgavetype: OppgaveType.RAPPORTER_INNTEKT,
    status: OppgaveStatus.LØST,
    opprettetDato: getDatoer().oppgaveMåned.add(3, 'hours').toISOString(),
    frist: getDatoer().oppgaveMåned.add(7, 'days').add(7, 'hours').toISOString(),
    løstDato: getDatoer().oppgaveMåned.add(4, 'days').add(12, 'hours').toISOString(),

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
    ytelsetype: OppgaveYtelsetype.AKTIVITETSPENGER,
});

const getRapporterInntektDelerAvMånedOppgaveDto = (): BrukerdialogOppgaveDto => ({
    oppgaveReferanse: 'f3e1b0e2-3f3c-4e2d-8f7a-5c3e5e6b7a82',
    oppgavetype: OppgaveType.RAPPORTER_INNTEKT,
    status: OppgaveStatus.ULØST,
    opprettetDato: getDatoer().oppgaveMåned.add(3, 'hours').toISOString(),
    frist: getDatoer().oppgaveMåned.add(7, 'days').add(7, 'hours').toISOString(),
    oppgavetypeData: {
        type: 'INNTEKTSRAPPORTERING',
        fraOgMed: dateToISODate(getDatoer().oppgaveMåned.startOf('month')),
        tilOgMed: dateToISODate(getDatoer().oppgaveMåned.endOf('month').subtract(4, 'days')),
        gjelderDelerAvMåned: true,
    },
    ytelsetype: OppgaveYtelsetype.AKTIVITETSPENGER,
});

const getRapporterInntektDelerAvMånedOppgaveDtoLøst = (): BrukerdialogOppgaveDto => ({
    oppgaveReferanse: 'f4e1b0e2-3f3c-4e2d-8f7a-5c3e5e6b7a8c',
    oppgavetype: OppgaveType.RAPPORTER_INNTEKT,
    status: OppgaveStatus.LØST,
    opprettetDato: getDatoer().oppgaveMåned.add(3, 'hours').toISOString(),
    frist: getDatoer().oppgaveMåned.add(7, 'days').add(7, 'hours').toISOString(),
    løstDato: getDatoer().oppgaveMåned.add(4, 'days').add(12, 'hours').toISOString(),
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
    ytelsetype: OppgaveYtelsetype.AKTIVITETSPENGER,
});

const getBekreftAvvikOppgaveDto = (): BrukerdialogOppgaveDto => ({
    oppgaveReferanse: 'be07ce74-9cb5-4012-bbae-5ab0940b04f7',
    oppgavetype: OppgaveType.BEKREFT_AVVIK_REGISTERINNTEKT,
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
    frist: getDatoer().oppgaveMåned.add(28, 'days').add(7, 'hours').toISOString(),
    opprettetDato: getDatoer().oppgaveMåned.add(3, 'hours').toISOString(),
    status: OppgaveStatus.ULØST,
    ytelsetype: OppgaveYtelsetype.AKTIVITETSPENGER,
});

const getBekreftAvvikOppgaveDelerAvMånedDto = (): BrukerdialogOppgaveDto => ({
    oppgaveReferanse: 'be06ce74-9cb5-4000-bbae-5ab0940b04f7',
    oppgavetype: OppgaveType.BEKREFT_AVVIK_REGISTERINNTEKT,
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
    frist: getDatoer().oppgaveMåned.add(28, 'days').add(7, 'hours').toISOString(),
    opprettetDato: getDatoer().oppgaveMåned.add(3, 'hours').toISOString(),
    status: OppgaveStatus.ULØST,
    ytelsetype: OppgaveYtelsetype.AKTIVITETSPENGER,
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
    løstDato: getDatoer().oppgaveMåned.add(28, 'days').add(54, 'hours').toISOString(),
});

const getBekreftBostedOppgaveDto = (): BrukerdialogOppgaveDto => ({
    oppgaveReferanse: 'aa01ce74-9cb5-4000-bbae-5ab0940b04a1',
    oppgavetype: OppgaveType.BEKREFT_BOSTED,
    oppgavetypeData: {
        type: 'BOSTED',
        ikkeOppfyltÅrsak: BostedsvilkårIkkeOppfyltÅrsak.IKKE_BOSATTADRESSE_I_TRONDHEIM,
        fom: dateToISODate(getDatoer().oppgaveMåned.subtract(1, 'month').startOf('month')),
        tom: dateToISODate(getDatoer().oppgaveMåned.subtract(1, 'month').endOf('month')),
        erBosattITrondheim: false,
        varseltekst: mockVarseltekster.getBostedVilkårPeriodeOppgaveVarseltekst(
            {
                from: dateToISODate(getDatoer().oppgaveMåned.subtract(1, 'month').startOf('month')),
                to: dateToISODate(getDatoer().oppgaveMåned.subtract(1, 'month').endOf('month')),
            },
            BostedsvilkårIkkeOppfyltÅrsak.IKKE_BOSATTADRESSE_I_TRONDHEIM,
        ),
        kilde: BostedsavklaringKildeType.FOLKEREGISTER,
    },
    status: OppgaveStatus.ULØST,
    opprettetDato: getDatoer().oppgaveMåned.add(3, 'hours').toISOString(),
    frist: getDatoer().oppgaveMåned.add(14, 'days').add(7, 'hours').toISOString(),
    ytelsetype: OppgaveYtelsetype.AKTIVITETSPENGER,
});

const getBekreftBostedOppgaveDtoLøst = (): BrukerdialogOppgaveDto => ({
    oppgaveReferanse: 'aa01ce74-9cb5-4000-bbae-5ab0940b04a2',
    oppgavetype: OppgaveType.BEKREFT_BOSTED,
    oppgavetypeData: {
        type: 'BOSTED',
        ikkeOppfyltÅrsak: BostedsvilkårIkkeOppfyltÅrsak.IKKE_BOSATTADRESSE_I_TRONDHEIM,
        fom: dateToISODate(getDatoer().oppgaveMåned.subtract(1, 'month').startOf('month')),
        tom: dateToISODate(getDatoer().oppgaveMåned.subtract(1, 'month').endOf('month')),
        varseltekst: mockVarseltekster.getBostedVilkårPeriodeOppgaveVarseltekst(
            {
                from: dateToISODate(getDatoer().oppgaveMåned.subtract(1, 'month').startOf('month')),
                to: dateToISODate(getDatoer().oppgaveMåned.subtract(1, 'month').endOf('month')),
            },
            BostedsvilkårIkkeOppfyltÅrsak.IKKE_BOSATTADRESSE_I_TRONDHEIM,
        ),
        kilde: BostedsavklaringKildeType.FOLKEREGISTER,
        kildeFritekst: 'Folkeregisteret',
        erBosattITrondheim: false,
    },
    respons: {
        type: 'VARSEL_SVAR',
        harUttalelse: false,
    },
    status: OppgaveStatus.LØST,
    opprettetDato: getDatoer().oppgaveMåned.add(3, 'hours').toISOString(),
    frist: getDatoer().oppgaveMåned.add(14, 'days').add(7, 'hours').toISOString(),
    løstDato: getDatoer().oppgaveMåned.add(3, 'days').startOf('day').add(12, 'hours').toISOString(),
    ytelsetype: OppgaveYtelsetype.AKTIVITETSPENGER,
});

const getBekreftBostedOpphørOppgaveDto = (): BrukerdialogOppgaveDto => ({
    oppgaveReferanse: 'aa01ce74-9cb5-4000-bbae-5ab0940b04a3',
    oppgavetype: OppgaveType.BEKREFT_BOSTED,
    oppgavetypeData: {
        type: 'BOSTED_OPPHØR',
        ikkeOppfyltÅrsak: BostedsvilkårIkkeOppfyltÅrsak.IKKE_BOSATTADRESSE_I_TRONDHEIM,
        erBosattITrondheim: false,
        kilde: BostedsavklaringKildeType.FOLKEREGISTER,
        fom: dateToISODate(getDatoer().oppgaveMåned.subtract(1, 'month').startOf('month')),
        varseltekst: mockVarseltekster.getBostedVilkårOpphørOppgaveVarseltekst(
            dateToISODate(getDatoer().oppgaveMåned.subtract(1, 'month').startOf('month')),
            BostedsvilkårIkkeOppfyltÅrsak.IKKE_BOSATTADRESSE_I_TRONDHEIM,
        ),
    },
    status: OppgaveStatus.ULØST,
    opprettetDato: getDatoer().oppgaveMåned.add(3, 'hours').toISOString(),
    frist: getDatoer().oppgaveMåned.add(14, 'days').add(7, 'hours').toISOString(),
    ytelsetype: OppgaveYtelsetype.AKTIVITETSPENGER,
});

const getBekreftAndreLivsoppholdsytelserOppgaveDto = (): BrukerdialogOppgaveDto => ({
    oppgaveReferanse: '5deff1eb-6b64-4e7f-a0aa-3f741b2b8d8d',
    oppgavetype: OppgaveType.BEKREFT_ANDRE_LIVSOPPHOLDSYTELSER,
    oppgavetypeData: {
        type: 'ANDRE_LIVSOPPHOLDSYTELSER',
        ikkeOppfyltÅrsak: AndreLivsoppholdsytelserIkkeOppfyltÅrsak.MOTTAR_ARBEIDSAVKLARINGSPENGER,
        kilde: AndreLivsoppholdsytelserAvklaringKildeType.NAV,
        fom: dateToISODate(getDatoer().oppgaveMåned.subtract(1, 'month').startOf('month')),
        tom: dateToISODate(getDatoer().oppgaveMåned.subtract(1, 'month').endOf('month')),
        varseltekst: mockVarseltekster.getAndreLivsoppholdsytelserOppgaveVarseltekst(
            {
                from: dateToISODate(getDatoer().oppgaveMåned.subtract(1, 'month').startOf('month')),
                to: dateToISODate(getDatoer().oppgaveMåned.subtract(1, 'month').endOf('month')),
            },
        ),
    },
    status: OppgaveStatus.ULØST,
    opprettetDato: getDatoer().oppgaveMåned.add(3, 'hours').toISOString(),
    frist: getDatoer().oppgaveMåned.add(14, 'days').add(7, 'hours').toISOString(),
    ytelsetype: OppgaveYtelsetype.AKTIVITETSPENGER,
});

const getBekreftAndreLivsoppholdsytelserOpphørOppgaveDto = (): BrukerdialogOppgaveDto => ({
    oppgaveReferanse: '0eac3b70-d1c7-4a3f-a5de-6b3d5b2b42a0',
    oppgavetype: OppgaveType.BEKREFT_ANDRE_LIVSOPPHOLDSYTELSER,
    oppgavetypeData: {
        type: 'ANDRE_LIVSOPPHOLDSYTELSER_OPPHØR',
        ikkeOppfyltÅrsak: AndreLivsoppholdsytelserIkkeOppfyltÅrsak.MOTTAR_ARBEIDSAVKLARINGSPENGER,
        kilde: AndreLivsoppholdsytelserAvklaringKildeType.NAV,
        fom: dateToISODate(getDatoer().oppgaveMåned.subtract(1, 'month').startOf('month')),
        varseltekst: mockVarseltekster.getAndreLivsoppholdsytelserOpphørOppgaveVarseltekst(
            dateToISODate(getDatoer().oppgaveMåned.subtract(1, 'month').startOf('month')),
        ),
    },
    status: OppgaveStatus.ULØST,
    opprettetDato: getDatoer().oppgaveMåned.add(3, 'hours').toISOString(),
    frist: getDatoer().oppgaveMåned.add(14, 'days').add(7, 'hours').toISOString(),
    ytelsetype: OppgaveYtelsetype.AKTIVITETSPENGER,
});

export const getMockOppgaver = () => ({
    rapporterInntektOppgave: getRapporterInntektOppgaveDto(),
    rapporterInntektOppgaveLøst: getRapporterInntektOppgaveDtoLøst(),
    rapporterInntektDelerAvMånedOppgave: getRapporterInntektDelerAvMånedOppgaveDto(),
    rapporterInntektDelerAvMånedOppgaveLøst: getRapporterInntektDelerAvMånedOppgaveDtoLøst(),
    bekreftAvvikOppgave: getBekreftAvvikOppgaveDto(),
    bekreftAvvikOppgaveDelerAvMÅned: getBekreftAvvikOppgaveDelerAvMånedDto(),
    bekreftAvvikOppgaveLøst: getBekreftAvvikOppgaveDtoLøst(),
    bekreftBostedOppgave: getBekreftBostedOppgaveDto(),
    bekreftBostedOppgaveLøst: getBekreftBostedOppgaveDtoLøst(),
    bekreftBostedOpphørOppgave: getBekreftBostedOpphørOppgaveDto(),
    bekreftAndreLivsoppholdsytelserOppgave: getBekreftAndreLivsoppholdsytelserOppgaveDto(),
    bekreftAndreLivsoppholdsytelserOpphørOppgave: getBekreftAndreLivsoppholdsytelserOpphørOppgaveDto(),
});

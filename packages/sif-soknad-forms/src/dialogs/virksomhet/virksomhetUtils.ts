import { dateUtils, getDate4YearsAgo } from '@navikt/sif-common-utils';
import { YesOrNo } from '@sif/rhf';
import dayjs from 'dayjs';

import { Næringstype, Virksomhet } from './types';

export const erFiskerNæringstype = (næringstype?: Næringstype): boolean =>
    næringstype ? næringstype === Næringstype.FISKE : false;

export const erVirksomhetRegnetSomNyoppstartet = (oppstartsdato: Date): boolean =>
    dayjs(oppstartsdato).startOf('day').isAfter(getDate4YearsAgo());

export type VirksomhetFormValues = {
    næringstype: string;
    fiskerErPåBladB: string;
    navnPåVirksomheten: string;
    registrertINorge: string;
    registrertILand: string;
    organisasjonsnummer: string;
    fom: string;
    tom: string;
    erPågående: boolean;
    næringsinntekt: string;
    harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene: string;
    blittYrkesaktivDato: string;
    hattVarigEndringAvNæringsinntektSiste4Kalenderår: string;
    varigEndringINæringsinntekt_dato: string;
    varigEndringINæringsinntekt_inntektEtterEndring: string;
    varigEndringINæringsinntekt_forklaring: string;
    harRegnskapsfører: string;
    regnskapsfører_navn: string;
    regnskapsfører_telefon: string;
};

export const virksomhetToFormValues = (v: Virksomhet): VirksomhetFormValues => ({
    næringstype: v.næringstype,
    fiskerErPåBladB: v.fiskerErPåBladB ?? YesOrNo.UNANSWERED,
    navnPåVirksomheten: v.navnPåVirksomheten,
    registrertINorge: v.registrertINorge,
    registrertILand: v.registrertILand ?? '',
    organisasjonsnummer: v.organisasjonsnummer ?? '',
    fom: dateUtils.dateToISODate(v.fom),
    tom: v.tom ? dateUtils.dateToISODate(v.tom) : '',
    erPågående: v.erPågående ?? false,
    næringsinntekt: v.næringsinntekt !== undefined ? String(v.næringsinntekt) : '',
    harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene:
        v.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene ?? YesOrNo.UNANSWERED,
    blittYrkesaktivDato: v.blittYrkesaktivDato ? dateUtils.dateToISODate(v.blittYrkesaktivDato) : '',
    hattVarigEndringAvNæringsinntektSiste4Kalenderår:
        v.hattVarigEndringAvNæringsinntektSiste4Kalenderår ?? YesOrNo.UNANSWERED,
    varigEndringINæringsinntekt_dato: v.varigEndringINæringsinntekt_dato
        ? dateUtils.dateToISODate(v.varigEndringINæringsinntekt_dato)
        : '',
    varigEndringINæringsinntekt_inntektEtterEndring:
        v.varigEndringINæringsinntekt_inntektEtterEndring !== undefined
            ? String(v.varigEndringINæringsinntekt_inntektEtterEndring)
            : '',
    varigEndringINæringsinntekt_forklaring: v.varigEndringINæringsinntekt_forklaring ?? '',
    harRegnskapsfører: v.harRegnskapsfører,
    regnskapsfører_navn: v.regnskapsfører_navn ?? '',
    regnskapsfører_telefon: v.regnskapsfører_telefon ?? '',
});

const getNumberFromString = (value: string): number | undefined => {
    const num = parseInt(value, 10);
    return isNaN(num) ? undefined : num;
};

export const formValuesToVirksomhet = (values: VirksomhetFormValues, id?: string): Virksomhet => {
    const fom = values.fom ? dateUtils.ISODateToDate(values.fom) : undefined;
    const næringstype = values.næringstype as Næringstype;
    const registrertINorge = values.registrertINorge as YesOrNo;
    const harRegnskapsfører =
        registrertINorge === YesOrNo.YES ? (values.harRegnskapsfører as YesOrNo) : YesOrNo.UNANSWERED;
    const erPågående = values.erPågående;

    if (!fom) {
        throw new Error('Invalid virksomhet values');
    }

    const erNyoppstartet = erVirksomhetRegnetSomNyoppstartet(fom);

    return {
        id: id ?? crypto.randomUUID(),
        næringstype,
        fiskerErPåBladB: erFiskerNæringstype(næringstype) ? (values.fiskerErPåBladB as YesOrNo) : undefined,
        navnPåVirksomheten: values.navnPåVirksomheten,
        registrertINorge,
        registrertILand: registrertINorge === YesOrNo.NO ? values.registrertILand || undefined : undefined,
        organisasjonsnummer: registrertINorge === YesOrNo.YES ? values.organisasjonsnummer || undefined : undefined,
        fom,
        tom: erPågående ? undefined : values.tom ? dateUtils.ISODateToDate(values.tom) : undefined,
        erPågående: erPågående || undefined,
        næringsinntekt: erNyoppstartet ? getNumberFromString(values.næringsinntekt) : undefined,
        harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene: erNyoppstartet
            ? (values.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene as YesOrNo)
            : undefined,
        blittYrkesaktivDato:
            erNyoppstartet &&
            values.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene === YesOrNo.YES &&
            values.blittYrkesaktivDato
                ? dateUtils.ISODateToDate(values.blittYrkesaktivDato)
                : undefined,
        hattVarigEndringAvNæringsinntektSiste4Kalenderår: !erNyoppstartet
            ? (values.hattVarigEndringAvNæringsinntektSiste4Kalenderår as YesOrNo)
            : undefined,
        varigEndringINæringsinntekt_dato:
            !erNyoppstartet &&
            values.hattVarigEndringAvNæringsinntektSiste4Kalenderår === YesOrNo.YES &&
            values.varigEndringINæringsinntekt_dato
                ? dateUtils.ISODateToDate(values.varigEndringINæringsinntekt_dato)
                : undefined,
        varigEndringINæringsinntekt_inntektEtterEndring:
            !erNyoppstartet && values.hattVarigEndringAvNæringsinntektSiste4Kalenderår === YesOrNo.YES
                ? getNumberFromString(values.varigEndringINæringsinntekt_inntektEtterEndring)
                : undefined,
        varigEndringINæringsinntekt_forklaring:
            !erNyoppstartet && values.hattVarigEndringAvNæringsinntektSiste4Kalenderår === YesOrNo.YES
                ? values.varigEndringINæringsinntekt_forklaring || undefined
                : undefined,
        harRegnskapsfører,
        regnskapsfører_navn:
            registrertINorge === YesOrNo.YES && harRegnskapsfører === YesOrNo.YES
                ? values.regnskapsfører_navn || undefined
                : undefined,
        regnskapsfører_telefon:
            registrertINorge === YesOrNo.YES && harRegnskapsfører === YesOrNo.YES
                ? values.regnskapsfører_telefon || undefined
                : undefined,
    };
};

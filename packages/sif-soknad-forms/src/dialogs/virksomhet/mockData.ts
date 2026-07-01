import { YesOrNo } from '@sif/rhf';
import dayjs from 'dayjs';

import { Næringstype, Virksomhet } from './index';
import { dateToISODate } from '@sif/utils';

const today = dayjs();

export const exampleVirksomhet: Virksomhet = {
    id: '1',
    næringstype: Næringstype.ANNEN,
    navnPåVirksomheten: 'Krokete Paradis',
    registrertINorge: YesOrNo.YES,
    organisasjonsnummer: '991012133',
    fom: dateToISODate(today.subtract(5, 'year')),
    erPågående: true,
    hattVarigEndringAvNæringsinntektSiste4Kalenderår: YesOrNo.NO,
    harRegnskapsfører: YesOrNo.NO,
};

export const pågåendeVirksomhet: Virksomhet = {
    id: 'virksomhet-pagaende',
    næringstype: Næringstype.FISKE,
    fiskerErPåBladB: YesOrNo.YES,
    navnPåVirksomheten: 'Havbris Fiske',
    registrertINorge: YesOrNo.YES,
    organisasjonsnummer: '991012133',
    fom: dateToISODate(today.subtract(6, 'year')),
    erPågående: true,
    hattVarigEndringAvNæringsinntektSiste4Kalenderår: YesOrNo.NO,
    harRegnskapsfører: YesOrNo.YES,
    regnskapsfører_navn: 'Regnskapspartner AS',
    regnskapsfører_telefon: '93000000',
};

export const nyoppstartetVirksomhet: Virksomhet = {
    id: 'virksomhet-nyoppstartet',
    næringstype: Næringstype.ANNEN,
    navnPåVirksomheten: 'Nordlys Design',
    registrertINorge: YesOrNo.NO,
    registrertILand: 'SE',
    fom: dateToISODate(today.subtract(10, 'month')),
    erPågående: true,
    næringsinntekt: 420000,
    harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene: YesOrNo.NO,
    harRegnskapsfører: YesOrNo.NO,
};

export const virksomhetMedVarigEndring: Virksomhet = {
    id: 'virksomhet-varig-endring',
    næringstype: Næringstype.JORDBRUK_SKOGBRUK,
    navnPåVirksomheten: 'Fjellgård Drift',
    registrertINorge: YesOrNo.YES,
    organisasjonsnummer: '991012133',
    fom: dateToISODate(today.subtract(8, 'year')),
    tom: dateToISODate(today.subtract(2, 'month')),
    hattVarigEndringAvNæringsinntektSiste4Kalenderår: YesOrNo.YES,
    varigEndringINæringsinntekt_dato: dateToISODate(today.subtract(14, 'month')),
    varigEndringINæringsinntekt_inntektEtterEndring: 360000,
    varigEndringINæringsinntekt_forklaring: 'Mindre drift etter omlegging av virksomheten.',
    harRegnskapsfører: YesOrNo.NO,
};

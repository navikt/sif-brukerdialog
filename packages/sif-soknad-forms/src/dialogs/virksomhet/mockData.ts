import { YesOrNo } from '@sif/rhf';
import dayjs from 'dayjs';

import { Næringstype, Virksomhet } from './index';

const today = dayjs();

export const exampleVirksomhet: Virksomhet = {
    id: '1',
    næringstype: Næringstype.ANNEN,
    navnPåVirksomheten: 'Krokete Paradis',
    registrertINorge: YesOrNo.YES,
    organisasjonsnummer: '991012133',
    fom: today.subtract(5, 'year').toDate(),
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
    fom: today.subtract(6, 'year').toDate(),
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
    fom: today.subtract(10, 'month').toDate(),
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
    fom: today.subtract(8, 'year').toDate(),
    tom: today.subtract(2, 'month').toDate(),
    hattVarigEndringAvNæringsinntektSiste4Kalenderår: YesOrNo.YES,
    varigEndringINæringsinntekt_dato: today.subtract(14, 'month').toDate(),
    varigEndringINæringsinntekt_inntektEtterEndring: 360000,
    varigEndringINæringsinntekt_forklaring: 'Mindre drift etter omlegging av virksomheten.',
    harRegnskapsfører: YesOrNo.NO,
};

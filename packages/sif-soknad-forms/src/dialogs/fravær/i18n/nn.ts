import { fraværMessages_nb } from './nb';

export const fraværMessages_nn: Record<keyof typeof fraværMessages_nb, string> = {
    '@sifSoknadForms.fraværPeriode.dialog.tittel': 'Periode med fråvær frå jobb',
    '@sifSoknadForms.fraværPeriode.dialog.avbrytKnapp': 'Avbryt',
    '@sifSoknadForms.fraværPeriode.dialog.leggTilKnapp': 'Legg til',
    '@sifSoknadForms.fraværPeriode.dialog.oppdaterKnapp': 'Oppdater',
    '@sifSoknadForms.fraværPeriode.form.tidsperiode.legend': 'Vel tidsrom',
    '@sifSoknadForms.fraværPeriode.form.fraOgMed.label': 'Frå og med',
    '@sifSoknadForms.fraværPeriode.form.tilOgMed.label': 'Til og med',
    '@sifSoknadForms.fraværDag.dialog.tittel': 'Dag med delvis fråvær frå jobb',
    '@sifSoknadForms.fraværDag.dialog.avbrytKnapp': 'Avbryt',
    '@sifSoknadForms.fraværDag.dialog.leggTilKnapp': 'Legg til',
    '@sifSoknadForms.fraværDag.dialog.oppdaterKnapp': 'Oppdater',
    '@sifSoknadForms.fraværDag.form.dato.label': 'Dato',
    '@sifSoknadForms.fraværDag.form.timerArbeidsdag.label': 'Talet på timar du skulle ha jobba denne dagen',
    '@sifSoknadForms.fraværDag.form.timerFravær.label': 'Talet på timar du var borte frå jobb denne dagen',
    '@sifSoknadForms.fraværDag.form.timerOption': '{tid} {flertall, select, true {timer} other {time}}',
};

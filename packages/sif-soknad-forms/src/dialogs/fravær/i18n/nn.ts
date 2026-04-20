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
    '@sifSoknadForms.fraværPeriodeForm.validation.fraOgMed.dateHasNoValue':
        'Du må oppgje når perioden starta. Skriv inn eller vel dato frå datoveljaren.',
    '@sifSoknadForms.fraværPeriodeForm.validation.fraOgMed.dateHasInvalidFormat':
        'Du må oppgje dato for når perioden starta i eit gyldig format. Gyldig format er dd.mm.åååå.',
    '@sifSoknadForms.fraværPeriodeForm.validation.fraOgMed.dateIsBeforeMin':
        'Datoen for når perioden starta kan ikkje vera før {dato}. Skriv inn eller vel dato frå datoveljaren.',
    '@sifSoknadForms.fraværPeriodeForm.validation.fraOgMed.dateIsAfterMax':
        'Datoen for når perioden starta kan ikkje vera etter {dato}. Skriv inn eller vel dato frå datoveljaren.',
    '@sifSoknadForms.fraværPeriodeForm.validation.fraOgMed.fromDateIsAfterToDate':
        'Startdatoen for perioden må vera før sluttdatoen, eller på same dag som sluttdatoen. Skriv inn eller vel dato frå datoveljaren.',
    '@sifSoknadForms.fraværPeriodeForm.validation.fraOgMed.er_helg':
        'Dato for når perioden starta kan ikkje vera laurdag eller sundag.',
    '@sifSoknadForms.fraværPeriodeForm.validation.fraOgMed.fra_og_til_er_ulike_år':
        'Frå-dato og til-dato må vera i same år.',
    '@sifSoknadForms.fraværPeriodeForm.validation.tilOgMed.dateHasNoValue':
        'Du må oppgje når perioden slutta. Skriv inn eller vel dato frå datoveljaren.',
    '@sifSoknadForms.fraværPeriodeForm.validation.tilOgMed.dateHasInvalidFormat':
        'Du må oppgje dato for når perioden slutta i eit gyldig format. Gyldig format er dd.mm.åååå.',
    '@sifSoknadForms.fraværPeriodeForm.validation.tilOgMed.dateIsBeforeMin':
        'Datoen for når perioden slutta kan ikkje vera før {dato}. Skriv inn eller vel dato frå datoveljaren.',
    '@sifSoknadForms.fraværPeriodeForm.validation.tilOgMed.dateIsAfterMax':
        'Datoen for når perioden slutta kan ikkje vera etter {dato}. Skriv inn eller vel dato frå datoveljaren.',
    '@sifSoknadForms.fraværPeriodeForm.validation.tilOgMed.toDateIsBeforeFromDate':
        'Sluttdatoen for perioden kan ikkje vera før startdatoen. Skriv inn eller vel dato frå datoveljaren.',
    '@sifSoknadForms.fraværPeriodeForm.validation.tilOgMed.er_helg':
        'Dato for når perioden slutta kan ikkje vera laurdag eller sundag.',
    '@sifSoknadForms.fraværPeriodeForm.validation.tilOgMed.fra_og_til_er_ulike_år':
        'Frå-dato og til-dato må vera i same år.',
    '@sifSoknadForms.fraværPeriodeForm.validation.fraværPeriode.dager_overlapper_med_andre_dager':
        'Perioden overlappar med allereie registrert fråvær.',
    '@sifSoknadForms.fraværDagForm.validation.dato.dateHasNoValue':
        'Du må oppgje dato for når du hadde delvis fråvær. Skriv inn eller vel dato frå datoveljaren.',
    '@sifSoknadForms.fraværDagForm.validation.dato.dateHasInvalidFormat':
        'Du må oppgje dato for når du hadde delvis fråvær i eit gyldig format. Gyldig format er dd.mm.åååå.',
    '@sifSoknadForms.fraværDagForm.validation.dato.dateIsBeforeMin':
        'Datoen for når du hadde delvis fråvær kan ikkje vera før {dato}. Skriv inn eller vel dato frå datoveljaren.',
    '@sifSoknadForms.fraværDagForm.validation.dato.dateIsAfterMax':
        'Datoen for når du hadde delvis fråvær kan ikkje vera etter {dato}. Skriv inn eller vel dato frå datoveljaren.',
    '@sifSoknadForms.fraværDagForm.validation.dato.er_helg':
        'Dato for når du hadde delvis fråvær kan ikkje vera laurdag eller sundag.',
    '@sifSoknadForms.fraværDagForm.validation.dato.dato_kolliderer_med_annet_fravær':
        'Datoen overlappar med allereie registrert fråværsdag.',
    '@sifSoknadForms.fraværDagForm.validation.timerArbeidsdag.noValue':
        'Du må velja talet på timar du skulle ha jobba denne dagen.',
    '@sifSoknadForms.fraværDagForm.validation.timerFravær.noValue':
        'Du må velja talet på timar du var borte frå jobb denne dagen.',
    '@sifSoknadForms.fraværDagForm.validation.timerFravær.fravær_timer_mer_enn_arbeidstimer':
        'Fråvær kan ikkje vera høgare enn arbeidstimar.',
};

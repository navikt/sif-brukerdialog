import { FraværMessageKeys } from '.';

export const fraværMessages_nn: Record<FraværMessageKeys, string> = {
    '@forms.fravær.form.validation.dateOutsideRange': 'Fyrste gyldige dato er {fom}, og siste gyldige dato er {tom}',
    '@forms.fravær.form.validation.fromDateAfterToDate': 'Frå-dato må vera lik eller før til-dato',
    '@forms.fravær.form.validation.toDateBeforeFromDate': 'Til-dato må vera lik eller etter frå-dato',
    '@forms.fravær.form.validation.fra_og_til_er_ulike_år': 'Frå og til dato må vera i same år',
    '@forms.fravær.form.validation.timer_mer_enn_arbeidstimer':
        'Talet på timar med fråvær kan ikkje vera meir enn talet på timar du skulle ha jobba denne dagen',
    '@forms.fravær.form.validation.er_helg': 'Laurdag og sundag er ikkje gyldig.',
    '@forms.fravær.form.felles.ok': 'Ok',
    '@forms.fravær.form.felles.avbryt': 'Avbryt',
    '@forms.fravær.form.periode.tittel': 'Periode med fråvær frå jobb',
    '@forms.fravær.form.periode.tidsrom': 'Vel tidsrom',
    '@forms.fravær.form.periode.fom': 'Frå og med',
    '@forms.fravær.form.periode.tom': 'Til og med',
    '@forms.fravær.form.dag.tittel': 'Dag med delvis fråvær frå jobb',
    '@forms.fravær.form.dag.dato': 'Dato',
    '@forms.fravær.form.dag.antallArbeidstimer': 'Talet på timar du skulle ha jobba denne dagen',
    '@forms.fravær.form.dag.timerFravær': 'Talet på timar du var borte frå jobb denne dagen',
    '@forms.fraværDagerList.itemTitle':
        '{dato}: Skulle jobba {timerArbeid} {arbeidFlertall, select, true {timer} other {timer}}. Borte frå jobb {timerFravær} {fraværFlertall, select, true {timer} other {time}}.',
    '@forms.fraværDagForm.dato.dateHasNoValue': 'Du må oppgje dato for når du hadde delvis fråvær.',
    '@forms.fraværDagForm.dato.dateHasInvalidFormat':
        'Du må oppgje dato for når du hadde delvis fråvær i eit gyldig format. Gyldig format er dd.mm.åååå.',
    '@forms.fraværDagForm.dato.dateIsAfterMax':
        'Dato for når du hadde delvis fråvær kan ikkje vera etter dagens dato. Skriv inn eller vel dato frå datoveljaren.',
    '@forms.fraværDagForm.dato.dateIsBeforeMin':
        'Datoen for når du hadde delvis fråvær kan ikkje vera før {dato}. Skriv inn eller vel dato frå datoveljaren.',
    '@forms.fraværDagForm.dato.er_helg':
        'Dato for når du hadde delvis fråvær må vera ein vekedag, det kan ikkje vera laurdag eller sundag.',
    '@forms.fraværDagForm.dato.dato_kolliderer_med_annet_fravær':
        'Datoen overlappar med allereie registrert fråværsdag',
    '@forms.fraværDagForm.timerArbeidsdag.noValue': 'Du må velja talet på timar du skulle ha jobba denne dagen.',
    '@forms.fraværDagForm.timerFravær.noValue': 'Du må velja talet på timar du var borte frå jobb denne dagen',
    '@forms.fraværDagForm.timerFravær.fravær_timer_mer_enn_arbeidstimer':
        'Fråvær kan ikkje vera høgare enn arbeidstimar',
    '@forms.fraværDagForm.timerOption': '{tid} {flertall, select, true {timer} other {time}}',
    '@forms.fraværPeriodeForm.fraOgMed.dateHasNoValue':
        'Du må oppgje når perioden starta. Skriv inn eller vel dato frå datoveljaren.',
    '@forms.fraværPeriodeForm.fraOgMed.dateIsAfterMax':
        'Datoen for når perioden starta kan ikkje vera etter dagens dato. Skriv inn eller vel dato frå datoveljaren.',
    '@forms.fraværPeriodeForm.fraOgMed.dateIsBeforeMin':
        'Datoen for når perioden starta kan ikkje vera før {dato}. Skriv inn eller vel sluttdato frå datoveljaren.',
    '@forms.fraværPeriodeForm.fraOgMed.dateHasInvalidFormat':
        'Du må oppgje dato for når perioden starta i eit gyldig format. Gyldig format er dd.mm.åååå.',
    '@forms.fraværPeriodeForm.fraOgMed.fromDateIsAfterToDate':
        'Startdatoen for perioden må vera før sluttdatoen, eller på same dag som sluttdatoen. Skriv inn eller vel dato frå datoveljaren.',
    '@forms.fraværPeriodeForm.tilOgMed.dateHasNoValue':
        'Du må oppgje når perioden slutta. Skriv inn eller vel dato frå datoveljaren.',
    '@forms.fraværPeriodeForm.tilOgMed.dateIsAfterMax':
        'Datoen for når perioden slutta kan ikkje vera etter dagens dato. Skriv inn eller vel dato frå datoveljaren.',
    '@forms.fraværPeriodeForm.tilOgMed.dateIsBeforeMin':
        'Datoen for når perioden slutta kan ikkje vera før {dato}. Skriv inn eller vel dato frå datoveljaren.',
    '@forms.fraværPeriodeForm.tilOgMed.dateHasInvalidFormat':
        'Du må oppgje dato for når perioden slutta i eit gyldig format. Gyldig format er dd.mm.åååå.',
    '@forms.fraværPeriodeForm.tilOgMed.toDateIsBeforeFromDate':
        'Sluttdatoen for perioden kan ikkje vera før startdatoen. Skriv inn eller vel dato frå datoveljaren.',
    '@forms.fraværPeriodeForm.fraOgMed.er_helg':
        'Periodens frå-dato må vera ein vekedag, det kan ikkje vera laurdag eller sundag. Viss perioden starta ein laurdag eller sundag må du velja måndagen etter som startdato.',
    '@forms.fraværPeriodeForm.fraOgMed.fra_og_til_er_ulike_år': 'Frå og til dato må vera i same år',
    '@forms.fraværPeriodeForm.fraOgMed.fra_dato_kolliderer_med_annet_fravær':
        'Frå og med datoen overlappar med allereie registrert fråværsdag.',
    '@forms.fraværPeriodeForm.tilOgMed.er_helg':
        'Periodens til-dato må vera ein vekedag, det kan ikkje vera laurdag eller sundag. Viss perioden slutta ein laurdag eller sundag må du velja fredagen før som sluttdato.',
    '@forms.fraværPeriodeForm.tilOgMed.fra_og_til_er_ulike_år': 'Frå og til dato må vera i same år',
    '@forms.fraværPeriodeForm.tilOgMed.til_dato_kolliderer_med_annet_fravær':
        'Til og med datoen overlappar med allereie registrert fråværsdag',
    '@forms.fraværPeriodeForm.periode.dager_overlapper_med_andre_dager':
        'Éin eller fleire dagar med fråvær overlappar med andre dagar med fråvær.',
};

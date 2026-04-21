import { utenlandskNæringMessages_nb } from './nb';

export const utenlandskNæringMessages_nn: Record<keyof typeof utenlandskNæringMessages_nb, string> = {
    '@sifSoknadForms.utenlandskNæring.dialog.tittel': 'Opplysningar om verksemda',
    '@sifSoknadForms.utenlandskNæring.dialog.avbrytKnapp': 'Avbryt',
    '@sifSoknadForms.utenlandskNæring.dialog.leggTilKnapp': 'Legg til',
    '@sifSoknadForms.utenlandskNæring.dialog.oppdaterKnapp': 'Oppdater',
    '@sifSoknadForms.utenlandskNæring.form.næringstype.legend': 'Kva type verksemd hadde du?',
    '@sifSoknadForms.utenlandskNæring.form.næringstype.FISKE': 'Fiskar',
    '@sifSoknadForms.utenlandskNæring.form.næringstype.JORDBRUK_SKOGBRUK': 'Jordbrukar',
    '@sifSoknadForms.utenlandskNæring.form.næringstype.DAGMAMMA': 'Dagmamma eller familiebarnehage i eigen heim',
    '@sifSoknadForms.utenlandskNæring.form.næringstype.ANNEN': 'Anna',
    '@sifSoknadForms.utenlandskNæring.form.navnPåVirksomheten.label': 'Skriv inn namnet på verksemda',
    '@sifSoknadForms.utenlandskNæring.form.land.label': 'I kva for eit land var {navn} registrert?',
    '@sifSoknadForms.utenlandskNæring.form.identifikasjonsnummer.label':
        'Skriv inn organisasjonsnummeret/identifikasjonsnummeret for verksemda',
    '@sifSoknadForms.utenlandskNæring.form.tidsperiode.legend': 'Når starta du {navn}?',
    '@sifSoknadForms.utenlandskNæring.form.fraOgMed.label': 'Startdato',
    '@sifSoknadForms.utenlandskNæring.form.tilOgMed.label': 'Sluttdato',
    '@sifSoknadForms.utenlandskNæring.form.erPågående.label': 'Er pågåande',
    '@sifSoknadForms.utenlandskNæring.list.label': '{namn} i {land} ({fraOgMed} - {tilOgMed})',
    '@sifSoknadForms.utenlandskNæring.list.pågående': 'pågåande',
    '@sifSoknadFormsUtenlandskNæringForm.validation.næringstype.noValue':
        'Vel kva type verksemd du har frå lista.',
    '@sifSoknadFormsUtenlandskNæringForm.validation.navnPåVirksomheten.stringHasNoValue':
        'Skriv inn namnet på verksemda di.',
    '@sifSoknadFormsUtenlandskNæringForm.validation.land.noValue':
        'Du må velja kva for eit land verksemda di er registrert i. Vel land frå lista.',
    '@sifSoknadFormsUtenlandskNæringForm.validation.fraOgMed.dateHasNoValue':
        'Du må oppgje kva dato du starta verksemda. Skriv inn eller vel startdato frå datoveljaren.',
    '@sifSoknadFormsUtenlandskNæringForm.validation.fraOgMed.dateIsAfterMax':
        'Startdatoen for når du starta verksemda må vera før dags dato. Skriv inn eller vel startdato frå datoveljaren.',
    '@sifSoknadFormsUtenlandskNæringForm.validation.fraOgMed.dateHasInvalidFormat':
        'Du må oppgje startdato for verksemda i eit gyldig format. Gyldig format er dd.mm.åååå.',
    '@sifSoknadFormsUtenlandskNæringForm.validation.fraOgMed.fromDateIsAfterToDate':
        'Startdatoen for når du starta verksemda må vera før sluttdatoen, eller på same dag som sluttdatoen. Skriv inn eller vel dato frå datoveljaren.',
    '@sifSoknadFormsUtenlandskNæringForm.validation.tilOgMed.dateHasNoValue':
        'Du må oppgje kva dato du avslutta verksemda. Skriv inn eller vel dato frå datoveljaren.',
    '@sifSoknadFormsUtenlandskNæringForm.validation.tilOgMed.dateIsBeforeMin':
        'Sluttdatoen for når du avslutta verksemda kan ikkje vera før startdatoen. Skriv inn eller vel sluttdato frå datoveljaren.',
    '@sifSoknadFormsUtenlandskNæringForm.validation.tilOgMed.dateIsAfterMax':
        'Sluttdatoen for når du avslutta verksemda kan ikkje vera etter dags dato. Skriv inn eller vel sluttdato frå datoveljaren.',
    '@sifSoknadFormsUtenlandskNæringForm.validation.tilOgMed.dateHasInvalidFormat':
        'Du må oppgje dato for når du avslutta verksemda i eit gyldig format. Gyldig format er dd.mm.åååå.',
    '@sifSoknadFormsUtenlandskNæringForm.validation.tilOgMed.toDateIsBeforeFromDate':
        'Sluttdatoen for når du avslutta verksemda kan ikkje vera før startdatoen. Skriv inn eller vel sluttdato frå datoveljaren.',
};

import { arbeidUtlandMessages_nb } from './nb';

export const arbeidUtlandMessages_nn: Record<keyof typeof arbeidUtlandMessages_nb, string> = {
    '@sifSoknadForms.arbeidUtland.dialog.tittel.generell': 'Utenlandsopphald',
    '@sifSoknadForms.arbeidUtland.dialog.tittel.periodeMedJobb': 'Periode med jobb utanfor Norge',
    '@sifSoknadForms.arbeidUtland.dialog.avbrytKnapp': 'Avbryt',
    '@sifSoknadForms.arbeidUtland.dialog.leggTilKnapp': 'Legg til',
    '@sifSoknadForms.arbeidUtland.dialog.oppdaterKnapp': 'Oppdater',
    '@sifSoknadForms.arbeidUtland.form.tidsperiode.legend': 'Velg periode',
    '@sifSoknadForms.arbeidUtland.form.fom.label': 'Frå og med',
    '@sifSoknadForms.arbeidUtland.form.tom.label': 'Til og med',
    '@sifSoknadForms.arbeidUtland.form.land.label': 'Velg land',
    '@sifSoknadForms.arbeidUtland.form.jobbetIPerioden.label': 'Jobba du i dette landet i denne perioden?',
    '@sifSoknadForms.arbeidUtland.form.idnummer.label': 'ID-nummer/personnummer for det landet (valfritt)',
    '@sifSoknadForms.arbeidUtlandForm.validation.fom.dateHasNoValue':
        'Du må oppgje kva dato perioden med jobb starta. Skriv inn eller vel dato.',
    '@sifSoknadForms.arbeidUtlandForm.validation.fom.dateIsAfterMax':
        'Datoen perioden med jobb starta kan ikkje vere etter {dato}. Skriv inn eller vel dato frå datoveljaren.',
    '@sifSoknadForms.arbeidUtlandForm.validation.fom.dateIsBeforeMin':
        'Datoen perioden med jobb starta kan ikkje vere før {dato}. Skriv inn eller vel startdato frå datoveljaren.',
    '@sifSoknadForms.arbeidUtlandForm.validation.fom.dateHasInvalidFormat':
        'Du må oppgje når perioden med jobb starta i eit gyldig format. Gyldig format er dd.mm.åååå.',
    '@sifSoknadForms.arbeidUtlandForm.validation.arbeidssted.fromDateIsAfterToDate':
        'Datoen perioden med jobb starta kan ikkje vere etter datoen det vart avslutta. Skriv inn eller vel startdato frå datoveljaren.',
    '@sifSoknadForms.arbeidUtlandForm.validation.tom.dateHasNoValue':
        'Du må oppgje kva dato perioden med jobb vart avslutta. Skriv inn eller vel dato frå datoveljaren.',
    '@sifSoknadForms.arbeidUtlandForm.validation.tom.dateIsAfterMax':
        'Datoen perioden med jobb vart avslutta kan ikkje vere etter {dato}. Skriv inn eller vel dato frå datoveljaren.',
    '@sifSoknadForms.arbeidUtlandForm.validation.tom.dateIsBeforeMin':
        'Datoen perioden med jobb vart avslutta kan ikkje vere før {dato}. Skriv inn eller vel dato frå datoveljaren.',
    '@sifSoknadForms.arbeidUtlandForm.validation.tom.dateHasInvalidFormat':
        'Du må oppgje når perioden med jobb vart avslutta i eit gyldig format. Gyldig format er dd.mm.åååå.',
    '@sifSoknadForms.arbeidUtlandForm.validation.tom.toDateIsBeforeFromDate':
        'Datoen perioden med jobb vart avslutta kan ikkje vere før datoen det starta. Skriv inn eller vel sluttdato frå datoveljaren.',
    '@sifSoknadForms.arbeidUtlandForm.validation.landkode.noValue': 'Du må velja land',
};

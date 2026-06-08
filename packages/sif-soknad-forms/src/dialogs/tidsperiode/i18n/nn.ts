import { tidsperiodeMessages_nb } from './nb';

export const tidsperiodeMessages_nn: Record<keyof typeof tidsperiodeMessages_nb, string> = {
    '@sifSoknadForms.tidsperiode.dialog.tittel': 'Tidsperiode',
    '@sifSoknadForms.tidsperiode.dialog.avbrytKnapp': 'Avbryt',
    '@sifSoknadForms.tidsperiode.dialog.leggTilKnapp': 'Legg til',
    '@sifSoknadForms.tidsperiode.dialog.oppdaterKnapp': 'Oppdater',
    '@sifSoknadForms.tidsperiode.form.tidsperiode.legend': 'Vel tidsperiode',
    '@sifSoknadForms.tidsperiode.form.fom.label': 'Frå og med',
    '@sifSoknadForms.tidsperiode.form.tom.label': 'Til og med',
    '@sifSoknadForms.tidsperiodeForm.validation.fom.dateHasNoValue':
        'Du må oppgje når perioden starta. Skriv inn eller vel dato frå datoveljaren.',
    '@sifSoknadForms.tidsperiodeForm.validation.fom.dateHasInvalidFormat':
        'Du må oppgje dato for når perioden starta i eit gyldig format. Gyldig format er dd.mm.åååå.',
    '@sifSoknadForms.tidsperiodeForm.validation.fom.dateIsBeforeMin':
        'Datoen for når perioden starta kan ikkje vera før {dato}. Skriv inn eller vel dato frå datoveljaren.',
    '@sifSoknadForms.tidsperiodeForm.validation.fom.dateIsAfterMax':
        'Datoen for når perioden starta kan ikkje vera etter {dato}. Skriv inn eller vel dato frå datoveljaren.',
    '@sifSoknadForms.tidsperiodeForm.validation.fom.fromDateIsAfterToDate':
        'Startdatoen for perioden må vera før sluttdatoen, eller på same dag som sluttdatoen. Skriv inn eller vel dato frå datoveljaren.',
    '@sifSoknadForms.tidsperiodeForm.validation.tom.dateHasNoValue':
        'Du må oppgje når perioden slutta. Skriv inn eller vel dato frå datoveljaren.',
    '@sifSoknadForms.tidsperiodeForm.validation.tom.dateHasInvalidFormat':
        'Du må oppgje dato for når perioden slutta i eit gyldig format. Gyldig format er dd.mm.åååå.',
    '@sifSoknadForms.tidsperiodeForm.validation.tom.dateIsBeforeMin':
        'Datoen for når perioden slutta kan ikkje vera før {dato}. Skriv inn eller vel dato frå datoveljaren.',
    '@sifSoknadForms.tidsperiodeForm.validation.tom.dateIsAfterMax':
        'Datoen for når perioden slutta kan ikkje vera etter {dato}. Skriv inn eller vel dato frå datoveljaren.',
    '@sifSoknadForms.tidsperiodeForm.validation.tom.toDateIsBeforeFromDate':
        'Sluttdatoen for perioden kan ikkje vera før startdatoen. Skriv inn eller vel dato frå datoveljaren.',
};

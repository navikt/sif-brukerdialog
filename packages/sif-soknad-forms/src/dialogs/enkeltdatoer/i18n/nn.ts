import { enkeltdatoMessages_nb } from './nb';

export const enkeltdatoMessages_nn: Record<keyof typeof enkeltdatoMessages_nb, string> = {
    '@sifSoknadForms.enkeltdato.dialog.tittel': 'Dato',
    '@sifSoknadForms.enkeltdato.dialog.avbrytKnapp': 'Avbryt',
    '@sifSoknadForms.enkeltdato.dialog.leggTilKnapp': 'Legg til',
    '@sifSoknadForms.enkeltdato.dialog.oppdaterKnapp': 'Oppdater',
    '@sifSoknadForms.enkeltdato.form.dato.label': 'Vel dato',
    '@sifSoknadForms.enkeltdatoForm.validation.dato.dateHasNoValue':
        'Du må oppgje ein dato. Skriv inn eller vel dato frå datoveljaren.',
    '@sifSoknadForms.enkeltdatoForm.validation.dato.dateHasInvalidFormat':
        'Du må oppgje dato i eit gyldig format. Gyldig format er dd.mm.åååå.',
    '@sifSoknadForms.enkeltdatoForm.validation.dato.dateIsBeforeMin':
        'Datoen kan ikkje vera før {dato}. Skriv inn eller vel dato frå datoveljaren.',
    '@sifSoknadForms.enkeltdatoForm.validation.dato.dateIsAfterMax':
        'Datoen kan ikkje vera etter {dato}. Skriv inn eller vel dato frå datoveljaren.',
};

import { fosterbarnMessages_nb } from './nb';

export const fosterbarnMessages_nn: Record<keyof typeof fosterbarnMessages_nb, string> = {
    '@sifSoknadForms.fosterbarn.dialog.tittel': 'Fosterbarn',
    '@sifSoknadForms.fosterbarn.dialog.avbrytKnapp': 'Avbryt',
    '@sifSoknadForms.fosterbarn.dialog.leggTilKnapp': 'Legg til',
    '@sifSoknadForms.fosterbarn.dialog.oppdaterKnapp': 'Oppdater',
    '@sifSoknadForms.fosterbarn.form.navn.label': 'Namn',
    '@sifSoknadForms.fosterbarn.form.fødselsnummer.label': 'Fødselsnummer/D-nummer',
    '@sifSoknadForms.fosterbarnForm.validation.navn.stringHasNoValue': 'Skriv inn namnet til barnet.',
    '@sifSoknadForms.fosterbarnForm.validation.fødselsnummer.fødselsnummerHasNoValue':
        'Skriv inn fødselsnummeret til barnet.',
    '@sifSoknadForms.fosterbarnForm.validation.fødselsnummer.fødselsnummerIsInvalid':
        'Du har oppgjeve eit ugyldig fødselsnummer. Kontroller at du har tasta inn rett.',
    '@sifSoknadForms.fosterbarnForm.validation.fødselsnummer.fødselsnummerIsNot11Chars':
        'Du har oppgjeve eit ugyldig fødselsnummer. Eit gyldig fødselsnummer består av 11 siffer.',
    '@sifSoknadForms.fosterbarnForm.validation.fødselsnummer.fødselsnummerIsNotAllowed':
        'Du har oppgjeve ditt eige fødselsnummer, eller eit fødselsnummer for eit fosterbarn du allereie har lagt til. Skriv inn fødselsnummeret til barnet.',
    '@sifSoknadForms.fosterbarnForm.validation.fødselsnummer.fødselsnummerAsHnrIsNotAllowed':
        'Du har oppgjeve eit fødselsnummer som du ikkje kan bruka. Kontroller at du har tasta inn fødselsnummeret til barnet.',
};

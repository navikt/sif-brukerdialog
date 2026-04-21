import { annetBarnMessages_nb } from './nb';

export const annetBarnMessages_nn: Record<keyof typeof annetBarnMessages_nb, string> = {
    '@sifSoknadForms.annetBarn.list.leggTil': 'Legg til barn',
    '@sifSoknadForms.annetBarn.list.detaljer': 'Fnr/dnr: {fnr}. Fødd: {fødselsdato}. Årsak: {årsak}',
    '@sifSoknadForms.annetBarn.dialog.tittel': 'Legg til barn',
    '@sifSoknadForms.annetBarn.dialog.avbrytKnapp': 'Avbryt',
    '@sifSoknadForms.annetBarn.dialog.okKnapp': 'Ok',
    '@sifSoknadForms.annetBarn.form.fnr': 'Barnet sitt fødselsnummer/D-nummer',
    '@sifSoknadForms.annetBarn.form.fødselsdato': 'Barnet sin fødselsdato',
    '@sifSoknadForms.annetBarn.form.navn': 'Barnet sitt namn',
    '@sifSoknadForms.annetBarn.form.årsak.spm': 'Kryss av for årsaka til at du la til dette barnet sjølv:',
    '@sifSoknadForms.annetBarn.form.årsak.FOSTERBARN': 'Barnet er fosterbarnet mitt',
    '@sifSoknadForms.annetBarn.form.årsak.ANNET': 'Anna',
    '@sifSoknadForms.annetBarnForm.validation.navn.stringHasNoValue': 'Skriv inn namnet til barnet',
    '@sifSoknadForms.annetBarnForm.validation.fødselsdato.dateHasNoValue':
        'Du må oppgje fødselsdatoen til barnet. Skriv inn eller vel dato frå datoveljaren.',
    '@sifSoknadForms.annetBarnForm.validation.fødselsdato.dateIsBeforeMin':
        'Barnet sin fødselsdato kan ikkje vera før {dato}. Skriv inn eller vel startdato frå datoveljaren.',
    '@sifSoknadForms.annetBarnForm.validation.fødselsdato.dateIsAfterMax':
        'Barnet sin fødselsdato kan ikkje vera etter {dato}.',
    '@sifSoknadForms.annetBarnForm.validation.fødselsdato.dateHasInvalidFormat':
        'Du må oppgje fødselsdatoen til barnet i eit gyldig format. Gyldig format er dd.mm.åååå.',
    '@sifSoknadForms.annetBarnForm.validation.fnr.fødselsnummerHasNoValue': 'Skriv inn fødselsnummeret til barnet',
    '@sifSoknadForms.annetBarnForm.validation.fnr.fødselsnummerIsInvalid':
        'Du har oppgjeve eit ugyldig fødselsnummer. Kontroller at du har tasta inn rett.',
    '@sifSoknadForms.annetBarnForm.validation.fnr.fødselsnummerAsHnrIsNotAllowed':
        'Du har oppgjeve eit fødselsnummer som du ikkje kan bruka. Kontroller at du har tasta inn fødselsnummeret til barnet.',
    '@sifSoknadForms.annetBarnForm.validation.fnr.fødselsnummerIsNot11Chars':
        'Du har oppgjeve eit ugyldig fødselsnummer. Eit gyldig fødselsnummer består av 11 siffer.',
    '@sifSoknadForms.annetBarnForm.validation.fnr.fødselsnummerIsNotAllowed':
        'Du har oppgjeve eit fødselsnummer som du ikkje kan bruka. Kontroller at du har tasta inn fødselsnummeret til barnet.',
    '@sifSoknadForms.annetBarnForm.validation.type.noValue':
        'Du må kryssa av for årsaka til at du la til dette barnet sjølv.',
};

import { annetBarnMessages_nb } from './annetBarnMessages_nb';

export const annetBarnMessages_nn: Record<keyof typeof annetBarnMessages_nb, string> = {
    '@forms.annetBarn.list.leggTil': 'Legg til barn',
    '@forms.annetBarn.list.ingenLagtTil': 'Ingen barn er lagt til',
    '@forms.annetBarn.list.title': 'Registrerte barn',
    '@forms.annetBarn.list.født': 'Fødd',
    '@forms.annetBarn.dialog.title': 'Legg til barn',
    '@forms.annetBarn.form.title': 'Legg til barn',
    '@forms.annetBarn.form.fnr': 'Barnet sitt fødselsnummer/D-nummer',
    '@forms.annetBarn.form.fødselsdato': 'Barnet sin fødselsdato',
    '@forms.annetBarn.form.navn': 'Barnet sitt namn',
    '@forms.annetBarn.form.okButton': 'Ok',
    '@forms.annetBarn.form.cancelButton': 'Avbryt',
    '@forms.annetBarn.form.årsak.spm': 'Kryss av for årsaka til at du la til dette barnet sjølv:',
    '@forms.annetBarn.form.årsak.FOSTERBARN': 'Barnet er fosterbarnet mitt',
    '@forms.annetBarn.form.årsak.ANNET': 'Anna',
    '@forms.annetBarnForm.navn.stringHasNoValue': 'Skriv inn namnet til barnet',
    '@forms.annetBarnForm.fødselsdato.dateHasNoValue':
        'Du må oppgje fødselsdatoen til barnet. Skriv inn eller vel dato frå datoveljaren.',
    '@forms.annetBarnForm.fødselsdato.dateIsBeforeMin':
        'Barnet sin fødselsdato kan ikkje vera før {dato}. Skriv inn eller vel startdato frå datoveljaren.',
    '@forms.annetBarnForm.fødselsdato.dateIsAfterMax': 'Barnet sin fødselsdato kan ikkje vera etter dagens dato',
    '@forms.annetBarnForm.fødselsdato.dateHasInvalidFormat':
        'Du må oppgje fødselsdatoen til barnet i eit gyldig format. Gyldig format er dd.mm.åååå.',
    '@forms.annetBarnForm.fnr.fødselsnummerHasNoValue': 'Skriv inn fødselsnummeret til barnet',
    '@forms.annetBarnForm.fnr.fødselsnummerIsInvalid':
        'Du har oppgjeve eit ugyldig fødselsnummer. Kontroller at du har tasta inn rett.',
    '@forms.annetBarnForm.fnr.fødselsnummerAsHnrIsNotAllowed':
        'Du har oppgjeve eit fødselsnummer som du ikkje kan bruka. Kontroller at du har tasta inn fødselsnummeret til barnet.',
    '@forms.annetBarnForm.fnr.fødselsnummerIsNot11Chars':
        'Du har oppgjeve eit ugyldig fødselsnummer. Eit gyldig fødselsnummer består av 11 siffer.',
    '@forms.annetBarnForm.fnr.fødselsnummerIsNotAllowed':
        'Du har oppgjeve eit fødselsnummer som du ikkje kan bruka. Kontroller at du har tasta inn fødselsnummeret til barnet.',
    '@forms.annetBarnForm.type.noValue': 'Du må kryssa av for årsaka til at du la til dette barnet sjølv.',
};

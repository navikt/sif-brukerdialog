const nb = {
    'barn.form.title': 'Legg til barn',
    'barn.form.fnr': 'Barnets fødselsnummer/D-nummer',
    'barn.form.navn': 'Barnets navn',
    'barn.form.okButton': 'Ok',
    'barn.form.cancelButton': 'Avbryt',
    'barn.form.validation.required': 'Feltet er påkrevd',
    'barn.list.fnr': ' (fnr. {fnr})',
    'annetBarnForm.navn.stringHasNoValue': 'Skriv inn barnets navn',
    'annetBarnForm.navn.stringIsTooShort': 'Navnet på barnet må inneholde minst {min} tegn.',
    'annetBarnForm.navn.stringIsTooLong': 'Navnet på barnet kan ikke inneholde flere enn {maks} tegn.',
    'annetBarnForm.fnr.fødselsnummerHasNoValue': 'Skriv inn barnets fødselsnummer',
    'annetBarnForm.fnr.fødselsnummerIsInvalid':
        'Du har oppgitt et ugyldig fødselsnummer. Kontroller at du har tastet inn riktig.',
    'annetBarnForm.fnr.fødselsnummerIsNot11Chars':
        ' Du har oppgitt et ugyldig fødselsnummer. Et gyldig fødselsnummer består av 11 siffer.',
    'annetBarnForm.fnr.fødselsnummerIsNotAllowed':
        'Du har oppgitt et fødselsnummer som du ikke kan bruke. Kontroller at du har tastet inn barnets fødselsnummer.',
};
const nn: Record<keyof typeof nb, string> = {
    ...nb,
};
export const barnMessages = { nb, nn };

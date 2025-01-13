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
    'barn.form.title': 'Legg til barn',
    'barn.form.fnr': 'Barnet sitt fødselsnummer/D-nummer',
    'barn.form.navn': 'Barnet sitt namn',
    'barn.form.okButton': 'Ok',
    'barn.form.cancelButton': 'Avbryt',
    'barn.form.validation.required': 'Feltet er påkrevd',
    'barn.list.fnr': ' (fnr. {fnr})',
    'annetBarnForm.navn.stringHasNoValue': 'Skriv inn barnet sitt namn',
    'annetBarnForm.navn.stringIsTooShort': 'Namnet på barnet må innehalde minst {min} teikn.',
    'annetBarnForm.navn.stringIsTooLong': 'Namnet på barnet kan ikkje innehalde fleire enn {maks} teikn.',
    'annetBarnForm.fnr.fødselsnummerHasNoValue': 'Skriv inn barnet sitt fødselsnummer',
    'annetBarnForm.fnr.fødselsnummerIsInvalid':
        'Du har oppgitt eit ugyldig fødselsnummer. Kontroller at du har skrive inn riktig.',
    'annetBarnForm.fnr.fødselsnummerIsNot11Chars':
        'Du har oppgitt eit ugyldig fødselsnummer. Eit gyldig fødselsnummer består av 11 siffer.',
    'annetBarnForm.fnr.fødselsnummerIsNotAllowed':
        'Du har oppgitt eit fødselsnummer som du ikkje kan bruke. Kontroller at du har skrive inn barnet sitt fødselsnummer.',
};

export const barnMessages = { nb, nn };

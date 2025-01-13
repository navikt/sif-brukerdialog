const nb = {
    'step.omAnnenForelder.sifGuidePanel': 'Her legger du inn informasjon om den andre forelderen som ',
    'step.omAnnenForelder.sifGuidePanel.list.1': 'du bor sammen med, og',
    'step.omAnnenForelder.sifGuidePanel.list.2': 'som ikke kan ha tilsyn med barn i en periode på minst 6 måneder',

    'step.omAnnenForelder.fnr.spm': 'Skriv inn fødselsnummeret til den andre forelderen, 11 siffer',
    'step.omAnnenForelder.navn.spm': 'Skriv inn navnet til den andre forelderen',

    'step.omAnnenForelder.nextButtonLabel': 'Fortsett',

    'fieldvalidation.mottakersFnrErSøkersFnr': 'Du har tastet inn ditt eget fødselsnummer',

    'validation.harForståttRettigheterOgPlikter.notChecked': 'Du må bekrefte at du har lest og forstått dine plikter.',
    'validation.annenForelderNavn.stringHasNoValue': 'Skriv inn navnet til den andre forelderen.',
    'validation.annenForelderNavn.stringIsTooLong':
        'Navnet på den andre forelderen kan ikke inneholde flere enn {maks} tegn.',
    'validation.annenForelderNavn.stringIsTooShort': 'Navnet på den andre forelderen må inneholde minst {min} tegn.',

    'validation.annenForelderFnr.fødselsnummerHasNoValue': 'Skriv inn fødselsnummeret til den andre forelderen.',
    'validation.annenForelderFnr.fødselsnummerIsInvalid':
        'Du har oppgitt et ugyldig fødselsnummer. Kontroller at du har tastet inn riktig.',
    'validation.annenForelderFnr.fødselsnummerIsNot11Chars':
        'Du har oppgitt et ugyldig fødselsnummer. Et gyldig fødselsnummer består av 11 siffer.',
    'validation.annenForelderFnr.fødselsnummerIsNotAllowed':
        'Fødselsnummeret kan ikke være ditt eget. Legg inn andre forelderen sin fødselsnummer.',
    'validation.annenForelderSituasjon.noValue':
        'Du må velge én av disse grunnene til at den andre forelderen ikke kan ha tilsyn med barn i en periode på 6 måneder.',
};

const nn: Record<keyof typeof nb, string> = {
    'step.omAnnenForelder.sifGuidePanel': 'Her legg du inn informasjon om den andre forelderen som ',
    'step.omAnnenForelder.sifGuidePanel.list.1': 'du bur saman med, og',
    'step.omAnnenForelder.sifGuidePanel.list.2': 'som ikkje kan ha tilsyn med barn i ein periode på minst 6 månader',

    'step.omAnnenForelder.fnr.spm': 'Skriv inn fødselsnummeret til den andre forelderen, 11 siffer',
    'step.omAnnenForelder.navn.spm': 'Skriv inn namnet til den andre forelderen',

    'step.omAnnenForelder.nextButtonLabel': 'Hald fram',

    'fieldvalidation.mottakersFnrErSøkersFnr': 'Du har skrive inn ditt eige fødselsnummer',

    'validation.harForståttRettigheterOgPlikter.notChecked':
        'Du må stadfeste at du har lese og forstått pliktene dine.',
    'validation.annenForelderNavn.stringHasNoValue': 'Skriv inn namnet til den andre forelderen.',
    'validation.annenForelderNavn.stringIsTooLong':
        'Namnet på den andre forelderen kan ikkje innehalde fleire enn {maks} teikn.',
    'validation.annenForelderNavn.stringIsTooShort': 'Namnet på den andre forelderen må innehalde minst {min} teikn.',

    'validation.annenForelderFnr.fødselsnummerHasNoValue': 'Skriv inn fødselsnummeret til den andre forelderen.',
    'validation.annenForelderFnr.fødselsnummerIsInvalid':
        'Du har oppgitt eit ugyldig fødselsnummer. Kontroller at du har skrive inn riktig.',
    'validation.annenForelderFnr.fødselsnummerIsNot11Chars':
        'Du har oppgitt eit ugyldig fødselsnummer. Eit gyldig fødselsnummer består av 11 siffer.',
    'validation.annenForelderFnr.fødselsnummerIsNotAllowed':
        'Fødselsnummeret kan ikkje vere ditt eige. Legg inn fødselsnummeret til den andre forelderen.',
    'validation.annenForelderSituasjon.noValue':
        'Du må velje éin av desse grunnane til at den andre forelderen ikkje kan ha tilsyn med barn i ein periode på 6 månader.',
};
export const omAnnenForelderMessages = { nb, nn };

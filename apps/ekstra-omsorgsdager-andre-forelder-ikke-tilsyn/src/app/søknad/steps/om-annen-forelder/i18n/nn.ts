import { omAnnenForelderMessages_nb } from './nb';

export const omAnnenForelderMessages_nn: Record<keyof typeof omAnnenForelderMessages_nb, string> = {
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

/* eslint-disable max-len */
export const omBarnetStegMessages_nb = {
    'omBarnetSteg.tittel': 'Barn',

    'omBarnetSteg.spørsmål.barnetSøknadenGjelder': 'Hvilket barn gjelder søknaden?',
    'omBarnetSteg.valgAnnetBarn': 'Søknaden gjelder et annet barn',

    'omBarnetSteg.annetBarn.tittel': 'Annet barn',
    'omBarnetSteg.spørsmål.barnetsFødselsdato': 'Barnets fødselsdato',
    'omBarnetSteg.spørsmål.barnetsFødselsdato.info': 'Barnet må være født etter {minFødselsdato}',
    'omBarnetSteg.spørsmål.barnetsFødselsnummer': 'Barnets fødselsnummer/D-nummer',
    'omBarnetSteg.spørsmål.barnetsNavn': 'Barnets navn',
    'omBarnetSteg.spørsmål.søkersRelasjonTilBarnet': 'Min relasjon til barnet',
    'omBarnetSteg.relasjon.mor': 'Mor',
    'omBarnetSteg.relasjon.far': 'Far',
    'omBarnetSteg.relasjon.adoptivforelder': 'Adoptivforelder',
    'omBarnetSteg.relasjon.fosterforelder': 'Fosterforelder',

    'omBarnetSteg.spørsmål.sammeAdresse': 'Bor du sammen med barnet?',
    'omBarnetSteg.sammeAdresse.JA': 'Ja',
    'omBarnetSteg.sammeAdresse.JA_DELT_BOSTED': 'Ja, barnet har delt fast bosted',
    'omBarnetSteg.sammeAdresse.NEI': 'Nei',
    'omBarnetSteg.sammeAdresse.hvaBetyrDette': 'Hva er delt fast bosted?',
    'omBarnetSteg.sammeAdresse.hvaBetyrDette.info':
        'Hvis foreldrene til barnet ikke bor sammen, kan de inngå en avtale om delt fast bosted etter barneloven §36. Barnet bor da fast med begge sine foreldre.',
    'omBarnetSteg.alert.trengerIkkeSøke.tittel': 'Du trenger ikke søke for {barnetsFornavn}',
    'omBarnetSteg.alert.trengerIkkeSøke.tekst':
        '{barnetsFornavn} har allerede et vedtak om ekstra omsorgsdager, og du trenger ikke søke på nytt.',
    'omBarnetSteg.alert.trengerIkkeSøke.minsideLenke': 'Se vedtaket på din side',

    'omBarnetSteg.alert.ikkeSammeAdresse':
        'Det er kun foreldre som bor sammen med barnet som kan få ekstra omsorgsdager fra Nav. Forelderen som bor sammen med barnet kan i noen tilfeller dele sine omsorgsdager.',

    'omBarnetSteg.spørsmål.kroniskEllerFunksjonshemming': 'Har barnet kronisk/langvarig sykdom eller funksjonshemning?',
    'omBarnetSteg.alert.ikkeKronisk':
        'Denne søknaden om ekstra omsorgsdager gjelder kun for de som har barn med kronisk/langvarig sykdom eller funksjonshemning.',

    'omBarnetSteg.spørsmål.høyereRisikoForFravær':
        'Har du høyere risiko for fravær på jobb på grunn av barnets sykdom eller funksjonshemning? ',
    'omBarnetSteg.alert.ikkeHøyereRisiko':
        'For å ha rett til ekstra omsorgsdager på grunn av sykdom eller funksjonshemning, må det være en sammenheng mellom barnets sykdom/funksjonshemning og risikoen for høyere fravær fra jobb.',
    'omBarnetSteg.spørsmål.høyereRisikoForFraværBeskrivelse':
        'Nå trenger vi en beskrivelse fra deg på hvordan barnets sykdom eller funksjonshemning gir markert høyere risiko for fravær fra jobb:',

    'omBarnetForm.validation.barnetSøknadenGjelder.noValue':
        'Du må velge hvilket barn søknaden gjelder, eller velge at søknaden gjelder et annet barn.',
    'omBarnetForm.validation.barnetsFødselsdato.dateHasNoValue': 'Skriv inn barnets fødselsdato.',
    'omBarnetForm.validation.barnetsFødselsdato.barnOver18år': 'Det gis ikke omsorgsdager til barn over 18 år.',
    'omBarnetForm.validation.barnetsFødselsdato.dateHasInvalidFormat':
        'Barnets fødselsdato er ugyldig. Gyldig format er dd.mm.åååå.',
    'omBarnetForm.validation.barnetsFødselsdato.dateIsAfterMax':
        'Fødselsdato kan ikke være etter dagens dato. Skriv inn eller velg dato fra datovelgeren.',
    'omBarnetForm.validation.barnetsFødselsnummer.fødselsnummerHasNoValue': 'Skriv inn barnets fødselsnummer.',
    'omBarnetForm.validation.barnetsFødselsnummer.fødselsnummerIsNot11Chars':
        'Du har oppgitt et ugyldig fødselsnummer. Et gyldig fødselsnummer består av 11 siffer.',
    'omBarnetForm.validation.barnetsFødselsnummer.fødselsnummerIsInvalid':
        'Du har oppgitt et ugyldig fødselsnummer. Kontroller at du har tastet inn riktig.',
    'omBarnetForm.validation.barnetsFødselsnummer.fødselsnummerIsNotAllowed':
        'Du har oppgitt ditt eget fødselsnummer som barnets fødselsnummer. Skriv inn barnets fødselsnummer.',
    'omBarnetForm.validation.barnetsFødselsnummer.fødselsnummerAsHnrIsNotAllowed':
        'Du har oppgitt et fødselsnummer som ikke er tillatt.',
    'omBarnetForm.validation.barnetsNavn.stringHasNoValue': 'Skriv inn barnets navn.',
    'omBarnetForm.validation.barnetsNavn.stringIsTooLong': 'Navnet på barnet kan ikke inneholde flere enn {maks} tegn.',
    'omBarnetForm.validation.søkersRelasjonTilBarnet.noValue': 'Du må velge din relasjon til barnet.',
    'omBarnetForm.validation.sammeAdresse.noValue': 'Du må svare ja eller nei på om du bor sammen med barnet.',
    'omBarnetForm.validation.kroniskEllerFunksjonshemming.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om barnet har en kronisk/langvarig sykdom eller funksjonshemning.',
    'omBarnetForm.validation.høyereRisikoForFravær.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om du har høyere risiko for fravær på jobb på grunn av barnets sykdom eller funksjonshemning.',
    'omBarnetForm.validation.høyereRisikoForFraværBeskrivelse.stringHasNoValue':
        'Skriv inn en beskrivelse på hvordan barnets sykdom eller funksjonshemning gir høyere risiko for fravær fra jobb.',
    'omBarnetForm.validation.høyereRisikoForFraværBeskrivelse.stringIsTooLong':
        'Beskrivelse på hvordan barnets sykdom eller funksjonshemning gir høyere risiko for fravær fra jobb kan ikke inneholde flere enn 1000 tegn.',
    'omBarnetForm.validation.høyereRisikoForFraværBeskrivelse.stringIsTooShort':
        'Beskrivelse på hvordan barnets sykdom eller funksjonshemning gir høyere risiko for fravær fra jobb må være på minst 5 tegn.',
    'omBarnetForm.validation.høyereRisikoForFraværBeskrivelse.stringHasInvalidCharacters':
        'Beskrivelsen inneholder ugyldige tegn. Ugyldige tegn kan for eksempel være emojier, spesialtegn som « », §, @, eller skjulte formateringstegn som innrykk, tabulatorer og listeformatering. Dette kan blant annet oppstå dersom tekst kopieres fra andre steder. Du kan prøve å skrive inn teksten på nytt direkte i feltet.',
};

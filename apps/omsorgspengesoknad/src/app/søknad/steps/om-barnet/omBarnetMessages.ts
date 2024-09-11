const nb = {
    'steg.omBarnet.hvilketBarn.spm': 'Hvilket barn gjelder søknaden?',
    'steg.omBarnet.hvilketBarn.registrerteBarn': 'Barn registrert på deg:',
    'steg.omBarnet.hvilketBarn.info': 'Hvis du skal søke for flere barn, må du sende én søknad for hvert barn.',
    'steg.omBarnet.hvilketBarn.født': 'Født {dato}',
    'steg.omBarnet.gjelderAnnetBarn': 'Søknaden gjelder et annet barn',
    'steg.omBarnet.annetBarn.tittel': 'Annet barn',
    'steg.omBarnet.barnetsFødselsnummer.spm': 'Barnets fødselsnummer/D-nummer',
    'steg.omBarnet.fødselsdato.spm': 'Barnets fødselsdato',
    'steg.omBarnet.fødselsdato.info': 'Barnet må være født etter {minFødselsdato}',
    'steg.omBarnet.barnetsNavn.spm': 'Barnets navn',
    'steg.omBarnet.relasjon.spm': 'Min relasjon til barnet',
    'steg.omBarnet.spm.sammeAdresse': 'Bor du sammen med barnet?',
    'steg.omBarnet.spm.sammeAdresse.ja': 'Ja',
    'steg.omBarnet.spm.sammeAdresse.jaDeltBosted': 'Ja, barnet har delt fast bosted',
    'steg.omBarnet.spm.sammeAdresse.nei': 'Nei',
    'steg.omBarnet.spm.sammeAdresse.hvaBetyrDette': 'Hva er delt fast bosted?',
    'steg.omBarnet.spm.sammeAdresse.hvaBetyrDette.info':
        'Hvis foreldrene til barnet ikke bor sammen, kan de inngå en avtale om delt fast bosted etter barneloven §36. Barnet bor da fast med begge sine foreldre.',
    'steg.omBarnet.spm.sammeAdresse.neiAlert':
        'Det er kun foreldre som bor sammen med barnet som kan få ekstra omsorgsdager fra NAV. Forelderen som bor sammen med barnet kan i noen tilfeller dele sine omsorgsdager.',
    'steg.omBarnet.spm.kroniskEllerFunksjonshemmende': 'Har barnet kronisk/langvarig sykdom eller funksjonshemning?',
    'steg.omBarnet.spm.høyereRisikoForFravær':
        'Har du høyere risiko for fravær på jobb på grunn av barnets sykdom eller funksjonshemning? ',
    'steg.omBarnet.spm.høyereRisikoForFraværBeskrivelse.tittel':
        'Nå trenger vi en beskrivelse fra deg på hvordan barnets sykdom eller funksjonshemning gir markert høyere risiko for fravær fra jobb:',
    'steg.omBarnet.spm.høyereRisikoForFravær.alert':
        'For å ha rett til ekstra omsorgsdager på grunn av sykdom eller funksjonshemning, må det være en sammenheng mellom barnets sykdom/funksjonshemning og risikoen for høyere fravær fra jobb.',
    'steg.omBarnet.alert.ikkeKroniskSykdom':
        'Denne søknaden om ekstra omsorgsdager gjelder kun for de som har barn med kronisk/langvarig sykdom eller funksjonshemning.',
    'steg.omBarnet.relasjonTilBarnet.mor': 'Mor',
    'steg.omBarnet.relasjonTilBarnet.far': 'Far',
    'steg.omBarnet.relasjonTilBarnet.adoptivforelder': 'Adoptivforelder',
    'steg.omBarnet.relasjonTilBarnet.fosterforelder': 'Fosterforelder',

    'steg.omBarnet.validation.barnetSøknadenGjelder.noValue':
        'Du må velge hvilket barn søknaden gjelder, eller velge at søknaden gjelder et annet barn.',
    'steg.omBarnet.validation.barnetsFødselsnummer.fødselsnummerHasNoValue': 'Skriv inn barnets fødselsnummer.',
    'steg.omBarnet.validation.barnetsFødselsnummer.fødselsnummerIsInvalid':
        'Du har oppgitt et ugyldig fødselsnummer. Kontroller at du har tastet inn riktig.',
    'steg.omBarnet.validation.barnetsFødselsnummer.fødselsnummerIsNot11Chars':
        'Du har oppgitt et ugyldig fødselsnummer. Et gyldig fødselsnummer består av 11 siffer.',
    'steg.omBarnet.validation.barnetsFødselsnummer.fødselsnummerIsNotAllowed':
        'Du har oppgitt ditt eget fødselsnummer som barnets fødselsnummer. Skriv inn barnets fødselsnummer.',
    'steg.omBarnet.validation.barnetsFødselsnummer.fødselsnummerAsHnrIsNotAllowed':
        'Du har oppgitt et fødselsnummer som ikke er tillatt.',
    'steg.omBarnet.validation.barnetsFødselsdato.dateHasNoValue': 'Skriv inn barnets fødselsdato.',
    'steg.omBarnet.validation.barnetsFødselsdato.dateHasInvalidFormat':
        'Barnets fødselsdato er ugyldig. Gyldig format er dd.mm.åååå.',
    'steg.omBarnet.validation.barnetsFødselsdato.dateIsAfterMax':
        'Fødselsdato kan ikke være etter dagens dato. Skriv inn eller velg dato fra datovelgeren.',
    'steg.omBarnet.validation.barnetsFødselsdato.barnOver18år': 'Det gis ikke omsorgsdager til barn over 18 år.',
    'steg.omBarnet.validation.barnetsNavn.stringHasNoValue': 'Skriv inn barnets navn.',
    'steg.omBarnet.validation.barnetsNavn.stringIsTooLong':
        'Navnet på barnet kan ikke inneholde flere enn {maks} tegn.',
    'steg.omBarnet.validation.søkersRelasjonTilBarnet.noValue': 'Du må velge din relasjon til barnet.',
    'steg.omBarnet.validation.sammeAdresse.noValue': 'Du må svare ja eller nei på om du bor sammen med barnet.',
    'steg.omBarnet.validation.kroniskEllerFunksjonshemming.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om barnet har en kronisk/langvarig sykdom eller funksjonshemning.',
    'steg.omBarnet.validation.høyereRisikoForFravær.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om du har høyere risiko for fravær på jobb på grunn av barnets sykdom eller funksjonshemning.',
    'steg.omBarnet.validation.høyereRisikoForFraværBeskrivelse.stringHasNoValue':
        'Skriv inn en beskrivelse på hvordan barnets sykdom eller funksjonshemning gir høyere risiko for fravær fra jobb.',
    'steg.omBarnet.validation.høyereRisikoForFraværBeskrivelse.stringIsTooLong':
        'Beskrivelse på hvordan barnets sykdom eller funksjonshemning gir høyere risiko for fravær fra jobb kan ikke inneholde flere enn 2000 tegn.',
    'steg.omBarnet.validation.høyereRisikoForFraværBeskrivelse.stringIsTooShort':
        'Beskrivelse på hvordan barnets sykdom eller funksjonshemning gir høyere risiko for fravær fra jobb må være på minst 5 tegn.',

    'steg.omBarnet.trengerIkkeSøke.tittel': 'Du trenger ikke søke for {barnetsFornavn}',
    'steg.omBarnet.trengerIkkeSøke.tekst':
        'Du har allerede et gyldig vedtak som gjelder til og med det kalenderåret {barnetsFornavn} fyller 18 år. Du trenger derfor ikke å søke på nytt. Du kan finne melding og dokumentasjon om vedtaket på <Lenke>Min side</Lenke>.',
};

const nn: Record<keyof typeof nb, string> = {
    ...nb,
};

export type OmBarnetMessageKeys = keyof typeof nb;

export const omBarnetMessages = {
    nb,
    nn,
};

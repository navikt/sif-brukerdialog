const nb = {
    'steg.omBarnet.hvilketBarn.spm': 'Hvilket barn gjelder søknaden?',
    'steg.omBarnet.hvilketBarn.registrerteBarn': 'Barn registrert på deg:',
    'steg.omBarnet.hvilketBarn.info': 'Hvis du skal søke for flere barn, må du sende én søknad for hvert barn.',
    'steg.omBarnet.hvilketBarn.født': 'Født {dato}',
    'steg.omBarnet.gjelderAnnetBarn': 'Søknaden gjelder et annet barn',
    'steg.omBarnet.annetBarn.tittel': 'Annet barn',
    'steg.omBarnet.fnr.spm': 'Barnets fødselsnummer/D-nummer',
    'steg.omBarnet.fødselsdato': 'Barnets fødselsdato',
    'steg.omBarnet.fødselsdato.info': 'Barnet må være født etter {minFødselsdato}',
    'steg.omBarnet.navn': 'Barnets navn',
    'steg.omBarnet.relasjon': 'Min relasjon til barnet',
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
    'steg.omBarnet.relasjonTilBarnet.MOR': 'Mor',
    'steg.omBarnet.relasjonTilBarnet.FAR': 'Far',
    'steg.omBarnet.relasjonTilBarnet.ANNET': 'Annet',
    'steg.omBarnet.relasjonTilBarnet.MEDMOR': 'Medmor',
    'steg.omBarnet.relasjonTilBarnet.FOSTERFORELDER': 'Fosterforelder',

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
    'steg.omBarnet.validation.relasjonTilBarnet.noValue': 'Du må velge din relasjon til barnet.',
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
    'steg.omBarnet.validation.årsakManglerIdentitetsnummer.noValue':
        'Du må svare på spørsmålet om hvorfor barnet ikke har fødselsnummer eller D-nummer.',

    'steg.omBarnet.hvilketBarn.description.tittel': 'Hva gjør jeg når jeg pleier flere barn samtidig?',
    'steg.omBarnet.hvilketBarn.description.info.1':
        'Når du pleier flere barn samtidig, skal du sende én søknad som gjelder samlet for barna du pleier. Vi registrerer og behandler søknaden din basert kun på ett av barna, selv om du pleier flere. Derfor kan du kun krysse av for ett av barna her.',
    'steg.omBarnet.hvilketBarn.description.info.2':
        'Hvis barna har forskjellig pleiebehov krysser du av for det barnet som har lengst pleiebehov. Hvis barna har samme pleiebehov, eller du ikke vet, krysser du bare av for ett av barna.',
    'steg.omBarnet.hvilketBarn.description.info.3':
        'Hvis du senere skal søke om forlengelse, eller det er andre som skal søke pleiepenger i samme sak, er det viktig at det krysses av for det samme barnet som i denne søknaden.',
    'steg.omBarnet.fnr.barnHarIkkeFnr': 'Barnet har ikke fødselsnummer/D-nummer',
    'steg.omBarnet.årsakManglerIdentitetsnummer.spm': 'Hvorfor har ikke barnet fødselsnummer eller D-nummer?',
    'steg.omBarnet.årsakManglerIdentitetsnummer.NYFØDT': 'Barnet er nyfødt, og har ikke fått fødselsnummer enda',
    'steg.omBarnet.årsakManglerIdentitetsnummer.BARNET_BOR_I_UTLANDET': 'Barnet bor i utlandet',
    'steg.omBarnet.årsakManglerIdentitetsnummer.ANNET': 'Annet',
    'steg.omBarnet.fødselsattest.tittel': 'Fødselsattest',
    'steg.omBarnet.fødselsattest.info':
        'Når barnet bor i utlandet og ikke har fødselsnummer eller D-nummer, må du legge ved en kopi av fødselsattest for barnet.',
    'steg.omBarnet.fødselsattest.vedlegg': 'Last opp fødselsattest',
    'steg.omBarnet.fødselsattest.vedlegg.legend': 'Dokumenter',
    'steg.omBarnet.relasjon.spm': 'Hvilken relasjon har du til barnet?',
    'steg.omBarnet.relasjonAnnet.spm':
        'Beskriv hvem du er i forhold til barnet, og hvilken tilsynsrolle du har i perioden du søker for',
    'steg.omBarnet.relasjonAnnet.info.tittel': 'Hva betyr dette?',
    'steg.omBarnet.relasjonAnnet.info.hjelpetekst.1':
        'I noen tilfeller kan ikke den eller de som har den daglige omsorgen for barnet ha tilsyn med barn som trenger tilsyn og pleie hele tiden. Da kan andre personer hjelpe til med dette. Andre personer kan for eksempel være en besteforelder, venn, nabo, tante eller onkel.',
    'steg.omBarnet.relasjonAnnet.info.hjelpetekst.2':
        'Eksempel 1: Mor/far kan ikke selv følge barnet til sykehuset for utredning eller behandling. Da kan andre personer følge barnet til sykehuset, og ha tilsyn med barnet så lenge oppholdet på sykehuset varer.',
    'steg.omBarnet.relasjonAnnet.info.hjelpetekst.3':
        'Eksempel 2: Hverken mor eller far har mulighet til å pleie barnet hjemme, da kan andre personer gjøre dette og ha tilsyn med barnet i perioden det gjelder. ',

    'infoForFarVedNyttBarn.tittel': 'Er du registrert som far i folkeregisteret?',
    'infoForFarVedNyttBarn.info.1':
        'Hvis du og moren til barnet er gift blir du automatisk registrert som far til barnet. Hvis dere ikke er gift må du erklære farskap for at du skal bli registrert som far til barnet i folkeregisteret. <Lenke>Her kan du erklære farskap digitalt</Lenke>.',

    'infoForFarVedNyttBarn.info.2':
        'Uavhengig av hva som er situasjonen din, kan du fortsette å fylle ut søknaden og sende den inn.',
};

const nn: Record<keyof typeof nb, string> = {
    ...nb,
};
export const omBarnetMessages = {
    nb,
    nn,
};

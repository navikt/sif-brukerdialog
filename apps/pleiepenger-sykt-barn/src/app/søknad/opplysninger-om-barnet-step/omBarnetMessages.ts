const nb = {
    'step.opplysninger-om-barnet.pageTitle': 'Pleiepengesøknad - opplysninger om barnet',
    'step.opplysninger-om-barnet.stepTitle': 'Barn',
    'step.opplysninger-om-barnet.stepIndicatorLabel': 'Om barnet',

    'steg.omBarnet.hvilketBarn.spm': 'Velg hvilket barn søknaden gjelder',
    'steg.omBarnet.hvilketBarn.description.tittel': 'Hva gjør jeg når jeg pleier flere barn samtidig?',
    'steg.omBarnet.hvilketBarn.description.info.1':
        'Når du pleier flere barn samtidig, skal du sende én søknad som gjelder samlet for barna du pleier. Vi registrerer og behandler søknaden din basert kun på ett av barna, selv om du pleier flere. Derfor kan du kun krysse av for ett av barna her.',
    'steg.omBarnet.hvilketBarn.description.info.2':
        'Hvis barna har forskjellig pleiebehov krysser du av for det barnet som har lengst pleiebehov. Hvis barna har samme pleiebehov, eller du ikke vet, krysser du bare av for ett av barna.',
    'steg.omBarnet.hvilketBarn.description.info.3':
        'Hvis du senere skal søke om forlengelse, eller det er andre som skal søke pleiepenger i samme sak, er det viktig at det krysses av for det samme barnet som i denne søknaden.',
    'steg.omBarnet.hvilketBarn.født': 'Født {dato}',
    'steg.omBarnet.gjelderAnnetBarn': 'Søknaden gjelder et annet barn',
    'steg.omBarnet.annetBarn.tittel': 'Annet barn',
    'steg.omBarnet.fnr.spm': 'Barnets fødselsnummer/D-nummer',
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
    'steg.omBarnet.fødselsdato': 'Barnets fødselsdato',
    'steg.omBarnet.navn': 'Barnets navn',
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

    'validation.barnetSøknadenGjelder.noValue': 'Du må velge hvilket barn søknaden gjelder.',
    'validation.barnetsNavn.stringHasNoValue': 'Du må skrive inn navnet på barnet.',
    'validation.barnetsNavn.stringIsTooLong': 'Navnet på barnet kan ikke inneholde flere enn {maks} tegn.',
    'validation.barnetsNavn.stringIsTooShort': 'Navnet på barnet må inneholde minst {min} tegn.',
    'validation.barnetsFødselsdato.dateHasInvalidFormat':
        'Du må oppgi barnets fødselsdato i et gyldig format. Gyldig format er dd.mm.ååå.',
    'validation.barnetsFødselsdato.dateHasNoValue':
        'Du må oppgi barnets fødselsdato. Skriv inn eller velg dato fra datovelgeren.',
    'validation.barnetsFødselsdato.dateIsBeforeMin': 'Du kan ikke legge til et barn over 18 år.',
    'validation.barnetsFødselsdato.dateIsAfterMax': 'Barnets fødselsdato kan ikke være etter dagens dato.',
    'validation.årsakManglerIdentitetsnummer.noValue':
        'Du må svare på spørsmålet om hvorfor barnet ikke har fødselsnummer eller D-nummer.',
    'validation.relasjonTilBarnet.noValue': 'Du må svare på spørsmålet om hvilken relasjon du har til barnet.',
    'validation.barnetsFødselsnummer.fødselsnummerHasNoValue': 'Du må oppgi barnets fødselsnummer/D-nummer.',
    'validation.barnetsFødselsnummer.fødselsnummerNot11Chars': 'Fødselsnummeret/D-nummeret må bestå av 11 siffer.',
    'validation.barnetsFødselsnummer.fødselsnummerIsNot11Chars':
        'Fødselsnummeret/D-nummeret du har tastet inn er ikke et gyldig norsk fødselsnummer. Kontroller at du har tastet inn riktig.',
    'validation.barnetsFødselsnummer.fødselsnummerIsInvalid':
        'Fødselsnummeret/D-nummeret du har tastet inn er ikke et gyldig norsk fødselsnummer. Kontroller at du har tastet inn riktig.',
    'validation.barnetsFødselsnummer.fødselsnummerIsNotAllowed':
        'Fødselsnummeret kan ikke være ditt eget. Legg inn barnets fødselsnummer.',
    'validation.barnetsFødselsnummer.fødselsnummerAsHnrIsNotAllowed':
        'Fødselsnummeret/D-nummeret du har tastet inn er ikke et gyldig norsk fødselsnummer. Kontroller at du har tastet inn riktig.',
    'validation.relasjonTilBarnetBeskrivelse.stringHasNoValue':
        'Du må beskrive hvem du er i forhold til barnet, og hvilken tilsynsrolle du har i perioden du søker om.',
    'validation.relasjonTilBarnetBeskrivelse.stringIsTooLong':
        'Du har brukt for mange tegn i beskrivelsen din. Teksten kan ikke inneholde flere enn {maks} tegn.',
};

const nn: Record<keyof typeof nb, string> = {
    'step.opplysninger-om-barnet.pageTitle': 'Pleiepengesøknad - opplysningar om barnet',
    'step.opplysninger-om-barnet.stepTitle': 'Barn',
    'step.opplysninger-om-barnet.stepIndicatorLabel': 'Om barnet',

    'steg.omBarnet.hvilketBarn.spm': 'Vel kva for eit barn søknaden gjeld',
    'steg.omBarnet.hvilketBarn.description.tittel': 'Kva gjer eg når eg pleier fleire barn samtidig?',
    'steg.omBarnet.hvilketBarn.description.info.1':
        'Når du pleier fleire barn samtidig, skal du sende éin søknad som gjeld samla for barna du pleier. Me registrerer og behandlar søknaden din basert kun på eitt av barna, sjølv om du pleier fleire. Difor kan du berre krysse av for eitt av barna her.',
    'steg.omBarnet.hvilketBarn.description.info.2':
        'Viss barna har forskjellig pleiebehov, kryssar du av for det barnet som har lengst pleiebehov. Viss barna har same pleiebehov, eller du ikkje veit, kryssar du berre av for eitt av barna.',
    'steg.omBarnet.hvilketBarn.description.info.3':
        'Viss du seinare skal søkje om forlenging, eller det er andre som skal søkje pleiepengar i same sak, er det viktig at det blir kryssa av for det same barnet som i denne søknaden.',
    'steg.omBarnet.hvilketBarn.født': 'Fødd {dato}',
    'steg.omBarnet.gjelderAnnetBarn': 'Søknaden gjeld eit anna barn',
    'steg.omBarnet.annetBarn.tittel': 'Anna barn',
    'steg.omBarnet.fnr.spm': 'Barnet sitt fødselsnummer/D-nummer',
    'steg.omBarnet.fnr.barnHarIkkeFnr': 'Barnet har ikkje fødselsnummer/D-nummer',
    'steg.omBarnet.årsakManglerIdentitetsnummer.spm': 'Kvifor har ikkje barnet fødselsnummer eller D-nummer?',
    'steg.omBarnet.årsakManglerIdentitetsnummer.NYFØDT': 'Barnet er nyfødd og har ikkje fått fødselsnummer enno',
    'steg.omBarnet.årsakManglerIdentitetsnummer.BARNET_BOR_I_UTLANDET': 'Barnet bur i utlandet',
    'steg.omBarnet.årsakManglerIdentitetsnummer.ANNET': 'Anna',
    'steg.omBarnet.fødselsattest.tittel': 'Fødselsattest',
    'steg.omBarnet.fødselsattest.info':
        'Når barnet bur i utlandet og ikkje har fødselsnummer eller D-nummer, må du legge ved ei kopi av fødselsattesten til barnet.',
    'steg.omBarnet.fødselsattest.vedlegg': 'Last opp fødselsattest',
    'steg.omBarnet.fødselsattest.vedlegg.legend': 'Dokument',
    'steg.omBarnet.fødselsdato': 'Barnet sin fødselsdato',
    'steg.omBarnet.navn': 'Barnet sitt namn',
    'steg.omBarnet.relasjon.spm': 'Kva for ein relasjon har du til barnet?',
    'steg.omBarnet.relasjonAnnet.spm':
        'Beskriv kven du er i forhold til barnet, og kva tilsynsrolle du har i perioden du søkjer for',
    'steg.omBarnet.relasjonAnnet.info.tittel': 'Kva betyr dette?',
    'steg.omBarnet.relasjonAnnet.info.hjelpetekst.1':
        'I nokre tilfelle kan ikkje den eller dei som har den daglege omsorga for barnet ha tilsyn med barn som treng tilsyn og pleie heile tida. Då kan andre personar hjelpe til med dette. Andre personar kan for eksempel vere ein besteforelder, venn, nabo, tante eller onkel.',
    'steg.omBarnet.relasjonAnnet.info.hjelpetekst.2':
        'Eksempel 1: Mor/far kan ikkje sjølv følgje barnet til sjukehuset for utgreiing eller behandling. Då kan andre personar følgje barnet til sjukehuset og ha tilsyn med barnet så lenge opphaldet på sjukehuset varer.',
    'steg.omBarnet.relasjonAnnet.info.hjelpetekst.3':
        'Eksempel 2: Kvarken mor eller far har moglegheit til å pleie barnet heime, då kan andre personar gjere dette og ha tilsyn med barnet i perioden det gjeld.',

    'infoForFarVedNyttBarn.tittel': 'Er du registrert som far i folkeregisteret?',
    'infoForFarVedNyttBarn.info.1':
        'Viss du og mora til barnet er gifte, blir du automatisk registrert som far til barnet. Viss de ikkje er gifte, må du erklære farskap for at du skal bli registrert som far til barnet i folkeregisteret. <Lenke>Her kan du erklære farskap digitalt</Lenke>.',

    'infoForFarVedNyttBarn.info.2':
        'Uavhengig av kva situasjonen din er, kan du fortsette å fylle ut søknaden og sende han inn.',

    'validation.barnetSøknadenGjelder.noValue': 'Du må velje kva for eit barn søknaden gjeld.',
    'validation.barnetsNavn.stringHasNoValue': 'Du må skrive inn namnet på barnet.',
    'validation.barnetsNavn.stringIsTooLong': 'Namnet på barnet kan ikkje innehalde fleire enn {maks} teikn.',
    'validation.barnetsNavn.stringIsTooShort': 'Namnet på barnet må innehalde minst {min} teikn.',
    'validation.barnetsFødselsdato.dateHasInvalidFormat':
        'Du må oppgi barnet sin fødselsdato i eit gyldig format. Gyldig format er dd.mm.ååå.',
    'validation.barnetsFødselsdato.dateHasNoValue':
        'Du må oppgi barnet sin fødselsdato. Skriv inn eller vel dato frå datoveljaren.',
    'validation.barnetsFødselsdato.dateIsBeforeMin': 'Du kan ikkje legge til eit barn over 18 år.',
    'validation.barnetsFødselsdato.dateIsAfterMax': 'Barnet sin fødselsdato kan ikkje vere etter dagens dato.',
    'validation.årsakManglerIdentitetsnummer.noValue':
        'Du må svare på spørsmålet om kvifor barnet ikkje har fødselsnummer eller D-nummer.',
    'validation.relasjonTilBarnet.noValue': 'Du må svare på spørsmålet om kva for ein relasjon du har til barnet.',
    'validation.barnetsFødselsnummer.fødselsnummerHasNoValue': 'Du må oppgi barnet sitt fødselsnummer/D-nummer.',
    'validation.barnetsFødselsnummer.fødselsnummerNot11Chars': 'Fødselsnummeret/D-nummeret må bestå av 11 siffer.',
    'validation.barnetsFødselsnummer.fødselsnummerIsNot11Chars':
        'Fødselsnummeret/D-nummeret du har skrive inn er ikkje eit gyldig norsk fødselsnummer. Kontroller at du har skrive inn riktig.',
    'validation.barnetsFødselsnummer.fødselsnummerIsInvalid':
        'Fødselsnummeret/D-nummeret du har skrive inn er ikkje eit gyldig norsk fødselsnummer. Kontroller at du har skrive inn riktig.',
    'validation.barnetsFødselsnummer.fødselsnummerIsNotAllowed':
        'Fødselsnummeret kan ikkje vere ditt eige. Legg inn barnet sitt fødselsnummer.',
    'validation.barnetsFødselsnummer.fødselsnummerAsHnrIsNotAllowed':
        'Fødselsnummeret/D-nummeret du har skrive inn er ikkje eit gyldig norsk fødselsnummer. Kontroller at du har skrive inn riktig.',
    'validation.relasjonTilBarnetBeskrivelse.stringHasNoValue':
        'Du må beskrive kven du er i forhold til barnet, og kva tilsynsrolle du har i perioden du søkjer om.',
    'validation.relasjonTilBarnetBeskrivelse.stringIsTooLong':
        'Du har brukt for mange teikn i skildringa di. Teksten kan ikkje innehalde fleire enn {maks} teikn.',
};

export const omBarnetMessages = {
    nb,
    nn,
};

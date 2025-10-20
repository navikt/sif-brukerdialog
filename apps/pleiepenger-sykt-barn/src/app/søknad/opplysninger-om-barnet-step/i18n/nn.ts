import { omBarnetMessages_nb } from './nb';

export const omBarnetMessages_nn: Record<keyof typeof omBarnetMessages_nb, string> = {
    'step.opplysninger-om-barnet.pageTitle': 'Pleiepengesøknad - opplysningar om barnet',
    'step.opplysninger-om-barnet.stepTitle': 'Barn',
    'step.opplysninger-om-barnet.stepIndicatorLabel': 'Om barnet',

    'steg.omBarnet.hvilketBarn.spm': 'Vel kva for eit barn søknaden gjeld',
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
        'Når barnet bur i utlandet og ikkje har fødselsnummer eller D-nummer, må du leggje ved ei kopi av fødselsattesten til barnet.',
    'steg.omBarnet.fødselsattest.vedlegg': 'Last opp fødselsattest',
    'steg.omBarnet.fødselsattest.vedlegg.legend': 'Dokument',
    'steg.omBarnet.fødselsdato': 'Barnet sin fødselsdato',
    'steg.omBarnet.navn': 'Barnet sitt namn',
    'steg.omBarnet.relasjon.spm': 'Kva for ein relasjon har du til barnet?',
    'steg.omBarnet.relasjonAnnet.spm':
        'Skildr kven du er i forhold til barnet, og kva tilsynsrolle du har i perioden du søkjer for',
    'steg.omBarnet.relasjonAnnet.info.tittel': 'Kva tyder dette?',
    'steg.omBarnet.relasjonAnnet.info.hjelpetekst.1':
        'I nokre tilfelle kan ikkje den eller dei som har den daglege omsorga for barnet ha tilsyn med barn som treng tilsyn og pleie heile tida. Då kan andre personar hjelpe til med dette. Andre personar kan til dømes vere ein besteforelder, venn, nabo, tante eller onkel.',
    'steg.omBarnet.relasjonAnnet.info.hjelpetekst.2':
        'Døme 1: Mor/far kan ikkje sjølv følgje barnet til sjukehuset for utgreiing eller behandling. Då kan andre personar følgje barnet til sjukehuset og ha tilsyn med barnet så lenge opphaldet på sjukehuset varer.',
    'steg.omBarnet.relasjonAnnet.info.hjelpetekst.3':
        'Døme 2: Korkje mor eller far har moglegheit til å pleie barnet heime, då kan andre personar gjere dette og ha tilsyn med barnet i perioden det gjeld.',

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
        'Du må oppgje barnet sin fødselsdato i eit gyldig format. Gyldig format er dd.mm.ååå.',
    'validation.barnetsFødselsdato.dateHasNoValue':
        'Du må oppgje barnet sin fødselsdato. Skriv inn eller vel dato frå datoveljaren.',
    'validation.barnetsFødselsdato.dateIsBeforeMin': 'Du kan ikkje leggje til eit barn over 18 år.',
    'validation.barnetsFødselsdato.dateIsAfterMax': 'Barnet sin fødselsdato kan ikkje vere etter dags dato.',
    'validation.årsakManglerIdentitetsnummer.noValue':
        'Du må svare på spørsmålet om kvifor barnet ikkje har fødselsnummer eller D-nummer.',
    'validation.relasjonTilBarnet.noValue': 'Du må svare på spørsmålet om kva for ein relasjon du har til barnet.',
    'validation.barnetsFødselsnummer.fødselsnummerHasNoValue': 'Du må oppgje barnet sitt fødselsnummer/D-nummer.',
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
        'Du må skildre kven du er i forhold til barnet, og kva tilsynsrolle du har i perioden du søkjer om.',
    'validation.relasjonTilBarnetBeskrivelse.stringIsTooLong':
        'Du har brukt for mange teikn i skildringa di. Teksten kan ikkje innehalde fleire enn {maks} teikn.',
};

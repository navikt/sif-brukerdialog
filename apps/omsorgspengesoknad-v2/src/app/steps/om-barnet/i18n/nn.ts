/* eslint-disable max-len */
import { omBarnetStegMessages_nb } from './nb';

export const omBarnetStegMessages_nn: Record<keyof typeof omBarnetStegMessages_nb, string> = {
    'omBarnetSteg.tittel': 'Barn',

    'omBarnetSteg.spørsmål.barnetSøknadenGjelder': 'Kva barn gjeld søknaden?',
    'omBarnetSteg.valgAnnetBarn': 'Søknaden gjeld eit anna barn',

    'omBarnetSteg.annetBarn.tittel': 'Anna barn',
    'omBarnetSteg.spørsmål.barnetsFødselsdato': 'Barnet sin fødselsdato',
    'omBarnetSteg.spørsmål.barnetsFødselsdato.info': 'Barnet må vera fødd etter {minFødselsdato}',
    'omBarnetSteg.spørsmål.barnetsFødselsnummer': 'Barnet sitt fødselsnummer/D-nummer',
    'omBarnetSteg.spørsmål.barnetsNavn': 'Barnets namn',
    'omBarnetSteg.spørsmål.søkersRelasjonTilBarnet': 'Relasjonen min til barnet',
    'omBarnetSteg.relasjon.mor': 'Mor',
    'omBarnetSteg.relasjon.far': 'Far',
    'omBarnetSteg.relasjon.adoptivforelder': 'Adoptivforelder',
    'omBarnetSteg.relasjon.fosterforelder': 'Fosterforelder',

    'omBarnetSteg.spørsmål.sammeAdresse': 'Bor du saman med barnet?',
    'omBarnetSteg.sammeAdresse.JA': 'Ja',
    'omBarnetSteg.sammeAdresse.JA_DELT_BOSTED': 'Ja, barnet har delt fast bustad',
    'omBarnetSteg.sammeAdresse.NEI': 'Nei',
    'omBarnetSteg.sammeAdresse.hvaBetyrDette': 'Kva er delt fast bustad?',
    'omBarnetSteg.sammeAdresse.hvaBetyrDette.info':
        'Viss foreldra til barnet ikkje bur saman, kan dei inngå ein avtale om delt fast bustad etter barnelova §36. Barnet bur då fast med begge foreldra sine.',
    'omBarnetSteg.alert.ikkeSammeAdresse':
        'Det er berre foreldre som bur saman med barnet som kan få ekstra omsorgsdagar frå Nav. Forelderen som bur saman med barnet kan i nokre tilfelle dela sine omsorgsdagar.',

    'omBarnetSteg.spørsmål.kroniskEllerFunksjonshemming':
        'Har barnet kronisk/langvarig sjukdom eller funksjonshemming?',
    'omBarnetSteg.alert.ikkeKronisk':
        'Denne søknaden om ekstra omsorgsdagar gjeld berre for dei som har barn med kronisk/langvarig sjukdom eller funksjonshemming.',

    'omBarnetSteg.spørsmål.høyereRisikoForFravær':
        'Har du auka risiko for å vera borte frå jobb på grunn av barnet sin sjukdom eller funksjonshemming?',
    'omBarnetSteg.alert.ikkeHøyereRisiko':
        'For å ha rett til ekstra omsorgsdagar på grunn av sjukdom eller funksjonshemming, må det vera ein samanheng mellom sjukdommen til barnet/funksjonshemming og risikoen for høgare fråvær frå jobb.',
    'omBarnetSteg.spørsmål.høyereRisikoForFraværBeskrivelse':
        'No treng me ei skildring frå deg på korleis sjukdommen eller funksjonshemminga til barnet gjer at du har markert høgare risiko for å vera borte frå jobb:',

    'omBarnetForm.validation.barnetSøknadenGjelder.noValue':
        'Du må velja kva for eit barn søknaden gjeld, eller velja at søknaden gjeld eit anna barn.',
    'omBarnetForm.validation.barnetsFødselsdato.dateHasNoValue': 'Skriv inn fødselsdatoen til barnet.',
    'omBarnetForm.validation.barnetsFødselsdato.barnOver18år': 'Det blir ikkje gitt omsorgsdagar til barn over 18 år.',
    'omBarnetForm.validation.barnetsFødselsdato.dateHasInvalidFormat':
        'Barnet sin fødselsdato er ugyldig. Gyldig format er',
    'omBarnetForm.validation.barnetsFødselsdato.dateIsAfterMax':
        'Fødselsdato kan ikkje vera etter dagens dato. Skriv inn eller vel dato frå datoveljaren.',
    'omBarnetForm.validation.barnetsFødselsnummer.fødselsnummerHasNoValue': 'Skriv inn fødselsnummeret til barnet.',
    'omBarnetForm.validation.barnetsFødselsnummer.fødselsnummerIsNot11Chars':
        'Du har oppgitt eit ugyldig fødselsnummer. Eit gyldig fødselsnummer består av 11 siffer.',
    'omBarnetForm.validation.barnetsFødselsnummer.fødselsnummerIsInvalid':
        'Du har oppgitt eit ugyldig fødselsnummer. Kontroller at du har tasta inn rett.',
    'omBarnetForm.validation.barnetsFødselsnummer.fødselsnummerIsNotAllowed':
        'Du har oppgitt ditt eige fødselsnummer som fødselsnummeret til barnet. Skriv inn fødselsnummeret til barnet.',
    'omBarnetForm.validation.barnetsFødselsnummer.fødselsnummerAsHnrIsNotAllowed':
        'Du har oppgitt eit fødselsnummer som ikkje er tillate.',
    'omBarnetForm.validation.barnetsNavn.stringHasNoValue': 'Skriv inn namnet til barnet.',
    'omBarnetForm.validation.barnetsNavn.stringIsTooLong':
        'Namnet på barnet kan ikkje innehalda fleire enn {maks} teikn.',
    'omBarnetForm.validation.søkersRelasjonTilBarnet.noValue': 'Du må velja relasjonen din til barnet.',
    'omBarnetForm.validation.sammeAdresse.noValue': 'Du må svara ja eller nei på om du bur saman med barnet.',
    'omBarnetForm.validation.kroniskEllerFunksjonshemming.yesOrNoIsUnanswered':
        'Du må svara ja eller nei på om barnet har ein kronisk/langvarig sjukdom eller funksjonshemming.',
    'omBarnetForm.validation.høyereRisikoForFravær.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om du har auka risiko for å vere borte frå jobb på grunn av barnet sin sjukdom eller funksjonshemming.',
    'omBarnetForm.validation.høyereRisikoForFraværBeskrivelse.stringHasNoValue':
        'Skriv inn ei skildring av korleis barnet sin sjukdom eller funksjonshemming gjer det meir sannsynleg at du må vera borte frå jobb.',
    'omBarnetForm.validation.høyereRisikoForFraværBeskrivelse.stringIsTooLong':
        'Skildringa av korleis barnet sin sjukdom eller funksjonshemming gjer at du har høgare risiko for å vera borte frå jobb, kan ikkje vera lengre enn 1000 teikn.',
    'omBarnetForm.validation.høyereRisikoForFraværBeskrivelse.stringIsTooShort':
        'Skildringa på korleis barnet sin sjukdom eller funksjonshemming gjer at du har høgare risiko for å vera borte frå jobb, må vera minst 5 teikn lang.',
    'omBarnetForm.validation.høyereRisikoForFraværBeskrivelse.stringHasInvalidCharacters':
        'Skildringa inneheld ugyldige teikn. Ugyldige teikn kan til dømes vere emojar, spesialteikn som « », §, @, eller skjulte formateringsteikn som innrykk, tabulatorar og listeformatering. Dette kan mellom anna oppstå dersom tekst vert kopiert frå andre stader. Du kan prøve å skrive inn teksten på nytt direkte i feltet.',
};

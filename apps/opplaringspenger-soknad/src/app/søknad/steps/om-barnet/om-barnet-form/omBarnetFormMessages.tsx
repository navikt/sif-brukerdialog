import { FormattedMessage, useIntl } from 'react-intl';
import { typedIntlHelper } from '@navikt/sif-common-core-ds/src/utils/intlUtils';

const nb = {
    'omBarnetForm.hvilketBarn.spm': 'Hvilket barn gjelder søknaden?',
    'omBarnetForm.hvilketBarn.registrerteBarn': 'Barn registrert på deg',
    'omBarnetForm.hvilketBarn.info': 'Hvis du skal søke for flere barn, må du sende én søknad for hvert barn.',
    'omBarnetForm.gjelderAnnetBarn': 'Søknaden gjelder et annet barn',
    'omBarnetForm.hvilketBarn.født': 'Født {dato}',
    'omBarnetForm.annetBarn.tittel': 'Annet barn',
    'omBarnetForm.fnr.spm': 'Barnets fødselsnummer/D-nummer',
    'omBarnetForm.fnr.barnHarIkkeFnr': 'Barnet har ikke fødselsnummer/D-nummer',
    'omBarnetForm.årsakManglerIdentitetsnummer.spm': 'Hvorfor har ikke barnet fødselsnummer eller D-nummer?',
    'omBarnetForm.årsakManglerIdentitetsnummer.NYFØDT': 'Barnet er nyfødt, og har ikke fått fødselsnummer enda',
    'omBarnetForm.årsakManglerIdentitetsnummer.BARNET_BOR_I_UTLANDET': 'Barnet bor i utlandet',
    'omBarnetForm.årsakManglerIdentitetsnummer.ANNET': 'Annet',
    'omBarnetForm.navn': 'Barnets navn',
    'omBarnetForm.fødselsdato': 'Barnets fødselsdato',
    'omBarnetForm.relasjon.spm': 'Hvilken relasjon har du til barnet?',
    'omBarnetForm.relasjonAnnet.spm':
        'Beskriv hvem du er i forhold til barnet, og i hvilke situasjoner du tar deg av og pleier barnet',
    'omBarnetForm.relasjonAnnet.info.tittel': 'Hva betyr dette?',
    'omBarnetForm.relasjonAnnet.info.hjelpetekst.1':
        'For å få opplæringspenger må det være nødvendig med opplæring for at du skal kunne ta deg av og pleie barnet. Dette kan være andre omsorgspersoner enn barnets foreldre, så lenge du i perioder tar deg av barnet.',
    'omBarnetForm.relasjonAnnet.info.hjelpetekst.2':
        'Vi må derfor vite mer om hvilken rolle du har overfor barnet, for å vurdere om det er nødvendig at du får denne opplæringen.',
    'omBarnetForm.relasjonTilBarnet.MOR': 'Mor',
    'omBarnetForm.relasjonTilBarnet.FAR': 'Far',
    'omBarnetForm.relasjonTilBarnet.ANNET': 'Annet',
    'omBarnetForm.relasjonTilBarnet.MEDMOR': 'Medmor',
    'omBarnetForm.relasjonTilBarnet.FOSTERFORELDER': 'Fosterforelder',
    'omBarnetForm.fødselsattest.ingenVedlegg': 'Ingen fødselsattest',
    'omBarnetForm.fødselsattest.tittel': 'Fødselsattest',
    'omBarnetForm.fødselsattest.info':
        'Når barnet bor i utlandet og ikke har fødselsnummer eller D-nummer, må du legge ved en kopi av fødselsattest for barnet.',
    'omBarnetForm.fødselsattest.vedlegg': 'Last opp fødselsattest',
    'omBarnetForm.fødselsattest.vedlegg.legend': 'Dokumenter',
    'omBarnetForm.validation.barnetSøknadenGjelder.noValue':
        'Du må velge hvilket barn søknaden gjelder, eller velge at søknaden gjelder et annet barn.',
    'omBarnetForm.validation.barnetsFødselsnummer.fødselsnummerHasNoValue': 'Skriv inn barnets fødselsnummer.',
    'omBarnetForm.validation.barnetsFødselsnummer.fødselsnummerIsInvalid':
        'Du har oppgitt et ugyldig fødselsnummer. Kontroller at du har tastet inn riktig.',
    'omBarnetForm.validation.barnetsFødselsnummer.fødselsnummerIsNot11Chars':
        'Du har oppgitt et ugyldig fødselsnummer. Et gyldig fødselsnummer består av 11 siffer.',
    'omBarnetForm.validation.barnetsFødselsnummer.fødselsnummerIsNotAllowed':
        'Du har oppgitt ditt eget fødselsnummer som barnets fødselsnummer. Skriv inn barnets fødselsnummer.',
    'omBarnetForm.validation.barnetsFødselsnummer.fødselsnummerAsHnrIsNotAllowed':
        'Du har oppgitt et fødselsnummer som ikke er tillatt.',
    'omBarnetForm.validation.barnetsFødselsdato.dateHasNoValue': 'Skriv inn barnets fødselsdato.',
    'omBarnetForm.validation.barnetsFødselsdato.dateHasInvalidFormat':
        'Barnets fødselsdato er ugyldig. Gyldig format er dd.mm.åååå.',
    'omBarnetForm.validation.barnetsFødselsdato.dateIsAfterMax':
        'Fødselsdato kan ikke være etter dagens dato. Skriv inn eller velg dato fra datovelgeren.',
    'omBarnetForm.validation.barnetsFødselsdato.barnOver18år': 'Det gis ikke omsorgsdager til barn over 18 år.',
    'omBarnetForm.validation.barnetsNavn.stringHasNoValue': 'Skriv inn barnets navn.',
    'omBarnetForm.validation.barnetsNavn.stringIsTooLong': 'Navnet på barnet kan ikke inneholde flere enn {maks} tegn.',
    'omBarnetForm.validation.relasjonTilBarnet.noValue': 'Du må velge din relasjon til barnet.',
    'omBarnetForm.validation.relasjonTilBarnetBeskrivelse.stringHasNoValue':
        'Du må beskrive hvem du er i forhold til barnet, og hvilken tilsynsrolle du har i perioden du søker for.',
    'omBarnetForm.validation.sammeAdresse.noValue': 'Du må svare ja eller nei på om du bor sammen med barnet.',
    'omBarnetForm.validation.kroniskEllerFunksjonshemming.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om barnet har en kronisk/langvarig sykdom eller funksjonshemning.',
    'omBarnetForm.validation.høyereRisikoForFravær.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om du har høyere risiko for fravær på jobb på grunn av barnets sykdom eller funksjonshemning.',
    'omBarnetForm.validation.høyereRisikoForFraværBeskrivelse.stringHasNoValue':
        'Skriv inn en beskrivelse på hvordan barnets sykdom eller funksjonshemning gir høyere risiko for fravær fra jobb.',
    'omBarnetForm.validation.høyereRisikoForFraværBeskrivelse.stringIsTooLong':
        'Beskrivelse på hvordan barnets sykdom eller funksjonshemning gir høyere risiko for fravær fra jobb kan ikke inneholde flere enn 2000 tegn.',
    'omBarnetForm.validation.høyereRisikoForFraværBeskrivelse.stringIsTooShort':
        'Beskrivelse på hvordan barnets sykdom eller funksjonshemning gir høyere risiko for fravær fra jobb må være på minst 5 tegn.',
    'omBarnetForm.validation.årsakManglerIdentitetsnummer.noValue':
        'Du må svare på spørsmålet om hvorfor barnet ikke har fødselsnummer eller D-nummer.',
    'omBarnetForm.infoForFarVedNyttBarn.tittel': 'Er du registrert som far i folkeregisteret?',
    'omBarnetForm.infoForFarVedNyttBarn.info.1':
        'Hvis du og moren til barnet er gift blir du automatisk registrert som far til barnet. Hvis dere ikke er gift må du erklære farskap for at du skal bli registrert som far til barnet i folkeregisteret. <Lenke>Her kan du erklære farskap digitalt</Lenke>.',
    'omBarnetForm.infoForFarVedNyttBarn.info.2':
        'Uavhengig av hva som er situasjonen din, kan du fortsette å fylle ut søknaden og sende den inn.',
};

const nn: Record<keyof typeof nb, string> = {
    'omBarnetForm.hvilketBarn.spm': 'Kva barn gjeld søknaden?',
    'omBarnetForm.hvilketBarn.registrerteBarn': 'Barn registrert på deg',
    'omBarnetForm.hvilketBarn.info': 'Dersom du skal søkje for fleire barn, må du sende ein søknad for kvart barn.',
    'omBarnetForm.gjelderAnnetBarn': 'Søknaden gjeld eit anna barn',
    'omBarnetForm.hvilketBarn.født': 'Fødd {dato}',
    'omBarnetForm.annetBarn.tittel': 'Anna barn',
    'omBarnetForm.fnr.spm': 'Barnets fødselsnummer/D-nummer',
    'omBarnetForm.fnr.barnHarIkkeFnr': 'Barnet har ikkje fødselsnummer/D-nummer',
    'omBarnetForm.årsakManglerIdentitetsnummer.spm': 'Kvifor har ikkje barnet fødselsnummer eller D-nummer?',
    'omBarnetForm.årsakManglerIdentitetsnummer.NYFØDT': 'Barnet er nyfødd og har ikkje fått fødselsnummer enno',
    'omBarnetForm.årsakManglerIdentitetsnummer.BARNET_BOR_I_UTLANDET': 'Barnet bur i utlandet',
    'omBarnetForm.årsakManglerIdentitetsnummer.ANNET': 'Anna',
    'omBarnetForm.navn': 'Barnets namn',
    'omBarnetForm.fødselsdato': 'Barnets fødselsdato',
    'omBarnetForm.relasjon.spm': 'Kva relasjon har du til barnet?',
    'omBarnetForm.relasjonAnnet.spm':
        'Skildr kven du er i forhold til barnet, og i kva situasjonar du tek deg av og pleier barnet.',
    'omBarnetForm.relasjonAnnet.info.tittel': 'Kva betyr dette?',
    'omBarnetForm.relasjonAnnet.info.hjelpetekst.1':
        'For å få opplæringspengar må det vere naudsynt med opplæring for at du skal kunne ta deg av og pleie barnet. Dette kan vere andre omsorgspersonar enn barnets foreldre, så lenge du i periodar tek deg av barnet.',
    'omBarnetForm.relasjonAnnet.info.hjelpetekst.2':
        'Vi må difor vite meir om kva rolle du har overfor barnet for å vurdere om det er naudsynt at du får denne opplæringa.',
    'omBarnetForm.relasjonTilBarnet.MOR': 'Mor',
    'omBarnetForm.relasjonTilBarnet.FAR': 'Far',
    'omBarnetForm.relasjonTilBarnet.ANNET': 'Anna',
    'omBarnetForm.relasjonTilBarnet.MEDMOR': 'Medmor',
    'omBarnetForm.relasjonTilBarnet.FOSTERFORELDER': 'Fosterforelder',
    'omBarnetForm.fødselsattest.ingenVedlegg': 'Ingen fødselsattest',
    'omBarnetForm.fødselsattest.tittel': 'Fødselsattest',
    'omBarnetForm.fødselsattest.info':
        'Når barnet bur i utlandet og ikkje har fødselsnummer eller D-nummer, må du leggje ved ein kopi av fødselsattesten til barnet.',
    'omBarnetForm.fødselsattest.vedlegg': 'Last opp fødselsattest',
    'omBarnetForm.fødselsattest.vedlegg.legend': 'Dokument',
    'omBarnetForm.validation.barnetSøknadenGjelder.noValue':
        'Du må velje kva barn søknaden gjeld, eller velje at søknaden gjeld eit anna barn.',
    'omBarnetForm.validation.barnetsFødselsnummer.fødselsnummerHasNoValue': 'Skriv inn barnets fødselsnummer.',
    'omBarnetForm.validation.barnetsFødselsnummer.fødselsnummerIsInvalid':
        'Du har oppgitt eit ugyldig fødselsnummer. Kontroller at du har skrive inn rett.',
    'omBarnetForm.validation.barnetsFødselsnummer.fødselsnummerIsNot11Chars':
        'Du har oppgitt eit ugyldig fødselsnummer. Eit gyldig fødselsnummer består av 11 siffer.',
    'omBarnetForm.validation.barnetsFødselsnummer.fødselsnummerIsNotAllowed':
        'Du har oppgitt ditt eige fødselsnummer som barnets fødselsnummer. Skriv inn barnets fødselsnummer.',
    'omBarnetForm.validation.barnetsFødselsnummer.fødselsnummerAsHnrIsNotAllowed':
        'Du har oppgitt eit fødselsnummer som ikkje er tillate.',
    'omBarnetForm.validation.barnetsFødselsdato.dateHasNoValue': 'Skriv inn barnets fødselsdato.',
    'omBarnetForm.validation.barnetsFødselsdato.dateHasInvalidFormat':
        'Barnets fødselsdato er ugyldig. Gyldig format er dd.mm.åååå.',
    'omBarnetForm.validation.barnetsFødselsdato.dateIsAfterMax':
        'Fødselsdato kan ikkje vere etter dagens dato. Skriv inn eller vel dato frå datoveljar.',
    'omBarnetForm.validation.barnetsFødselsdato.barnOver18år': 'Det blir ikkje gitt omsorgsdagar til barn over 18 år.',
    'omBarnetForm.validation.barnetsNavn.stringHasNoValue': 'Skriv inn barnets namn.',
    'omBarnetForm.validation.barnetsNavn.stringIsTooLong':
        'Namnet på barnet kan ikkje innehalde meir enn {maks} teikn.',
    'omBarnetForm.validation.relasjonTilBarnet.noValue': 'Du må velje din relasjon til barnet.',
    'omBarnetForm.validation.relasjonTilBarnetBeskrivelse.stringHasNoValue':
        'Du må skildre kven du er i forhold til barnet, og kva tilsynsrolle du har i perioden du søkjer for.',
    'omBarnetForm.validation.sammeAdresse.noValue': 'Du må svare ja eller nei på om du bur saman med barnet.',
    'omBarnetForm.validation.kroniskEllerFunksjonshemming.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om barnet har ei kronisk/langvarig sjukdom eller funksjonshemming.',
    'omBarnetForm.validation.høyereRisikoForFravær.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om du har høgare risiko for fråvær på jobb på grunn av barnets sjukdom eller funksjonshemming.',
    'omBarnetForm.validation.høyereRisikoForFraværBeskrivelse.stringHasNoValue':
        'Skriv inn ei skildring av korleis barnets sjukdom eller funksjonshemming gir høgare risiko for fråvær frå jobb.',
    'omBarnetForm.validation.høyereRisikoForFraværBeskrivelse.stringIsTooLong':
        'Skildringa av korleis barnets sjukdom eller funksjonshemming gir høgare risiko for fråvær frå jobb kan ikkje innehalde meir enn 2000 teikn.',
    'omBarnetForm.validation.høyereRisikoForFraværBeskrivelse.stringIsTooShort':
        'Skildringa av korleis barnets sjukdom eller funksjonshemming gir høgare risiko for fråvær frå jobb må vere minst 5 teikn.',
    'omBarnetForm.validation.årsakManglerIdentitetsnummer.noValue':
        'Du må svare på spørsmålet om kvifor barnet ikkje har fødselsnummer eller D-nummer.',
    'omBarnetForm.infoForFarVedNyttBarn.tittel': 'Er du registrert som far i folkeregisteret?',
    'omBarnetForm.infoForFarVedNyttBarn.info.1':
        'Dersom du og mora til barnet er gift, blir du automatisk registrert som far til barnet. Dersom de ikkje er gift, må du erklære farskap for å bli registrert som far til barnet i folkeregisteret. <Lenke>Her kan du erklære farskap digitalt</Lenke>.',
    'omBarnetForm.infoForFarVedNyttBarn.info.2':
        'Uavhengig av kva situasjon du er i, kan du halde fram med å fylle ut søknaden og sende den inn.',
};

export type OmBarnetFormMessageKeys = keyof typeof nb;

export const useOmBarnetFormIntl = () => {
    const intl = useIntl();
    return typedIntlHelper<OmBarnetFormMessageKeys>(intl);
};

export type OmBarnetFormIntlShape = ReturnType<typeof useOmBarnetFormIntl>;

export const OmBarnetFormText = (props: { id: OmBarnetFormMessageKeys; values?: any }) => {
    return <FormattedMessage {...props} />;
};

export const omBarnetFormIntlMessages = {
    nb,
    nn,
};

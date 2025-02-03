import { calendarGridMessages } from '../components/calendar-grid/calendarGridMessages';
import { dagerMedTidMessages } from '../components/dager-med-tid-liste/dagerMedTidMessages';
import { kvitteringMessages } from '../pages/kvittering/kvitteringMesssages';
import { velkommenPageMessages } from '../pages/velkommen/velkommenPageMessages';
import { arbeidssituasjonMessages } from '../søknad/steps/arbeidssituasjon/arbeidssituasjonMessages';
import { legeerklæringMessages } from '../søknad/steps/legeerklæring/legeerklæringMessages';
import { oppsummeringMessages } from '../søknad/steps/oppsummering/oppsummeringMessages';
import { kursMessages } from '../søknad/steps/kurs/kursMessages';
import { validateApiDataMessages } from '../utils/søknadsdataToApiData/validateApiData';
import { arbeidstidMessages } from '../søknad/steps/arbeidstid/arbeidstidMessages';
import { omBarnetFormIntlMessages } from '../søknad/steps/om-barnet/om-barnet-form/omBarnetFormMessages';
import { kursperiodeMessages } from '../søknad/steps/kurs/kursperioder-form-part/kursperiodeMessages';
import { arbeidstidPeriodeMessages } from '../søknad/steps/arbeidstid/arbeidstidPeriodeMessages';

const nb = {
    ...velkommenPageMessages.nb,
    ...legeerklæringMessages.nb,
    ...kursMessages.nb,
    ...arbeidssituasjonMessages.nb,
    ...arbeidstidPeriodeMessages.nb,
    ...oppsummeringMessages.nb,
    ...kvitteringMessages.nb,
    ...validateApiDataMessages.nb,
    ...calendarGridMessages.nb,
    ...dagerMedTidMessages.nb,
    ...kursperiodeMessages.nb,
    ...arbeidstidMessages.nb,
    ...omBarnetFormIntlMessages.nb,

    'application.title': 'Søknad om opplæringspenger',

    'initialLoadError.pageTitle': 'Det oppstod en feil',
    'initialLoadError.text.1': 'Det oppstod en feil under oppstarten av søknaden. Vennligst prøv igjen senere.',

    'resetMellomlagring.text.1': 'Hvis feilen vedvarer, kan du prøve å starte på nytt med et tom skjema.',
    'resetMellomlagring.startPåNytt': 'Start på nytt',

    hvaBetyrDette: 'Hva betyr dette?',
    fødselsnummer: 'Fødselsnummer:',

    'dagerMedTid.uke': 'Uke {uke}',
    'dagerMedTid.ingenDagerRegistrert': 'Ingen dager registrert',

    'frilanser.harDuHattInntekt.spm': 'Er du frilanser i perioden du søker for?',
    'frilanser.nårStartet.spm': 'Når startet du å jobbe som frilanser?',
    'frilanser.jobberFortsatt.spm': 'Jobber du fortsatt som frilanser?',
    'frilanser.nårSluttet.spm': 'Når sluttet du som frilanser?',
    'frilanser.jobberNormaltTimer.spm':
        'Hvor mange timer jobber du normalt per uke som frilanser når du ikke har fravær?',
    'frilanser.jobberNormaltTimer.avsluttet.spm':
        'Hvor mange timer jobbet du normalt per uke som frilanser da du ikke hadde fravær?',

    'frilanser.hjelpetekst.spm': 'Hva betyr det å være frilanser?',
    'frilanser.hjelpetekst':
        'Du er frilanser når du mottar lønn for enkeltstående oppdrag uten å være fast eller midlertidig ansatt hos den du utfører oppdraget for. Hvis du er usikker på om du er frilanser må du sjekke om oppdragene dine er registrert som frilansoppdrag på',
    'frilanser.hjelpetekst.skatteetatenLenke': 'skatteetaten sine nettsider.',
    'frilanser.hjelpetekst.2.heading': 'Omsorgsstønad og fosterhjemsgodtgjørelse',
    'frilanser.hjelpetekst.2':
        'Du trenger ikke å oppgi omsorgsstønad eller fosterhjemsgodtgjørelse, hvis du fortsetter å motta det under opplæringen.',

    'selvstendig.harDuHattInntekt.spm': 'Er du selvstendig næringsdrivende i perioden du søker for?',
    'selvstendig.harDuHattInntekt.hjelpetekst.tittel': 'Hva betyr det å være selvstendig næringsdrivende?',
    'selvstendig.harDuHattInntekt.hjelpetekst':
        'Du er selvstendig næringsdrivende når du enten har et enkeltpersonforetak (ENK), et ansvarlig selskap (ANS), eller et ansvarlig selskap med delt ansvar (DA).',
    'selvstendig.harDuHattInntekt.hjelpetekst.snSkatteetatenLenke':
        'I tillegg kan du lese på skatteetatens side om andre situasjoner hvor du kan regnes som selvstendig næringsdrivende.',
    'selvstendig.harFlereVirksomheter.spm': 'Har du flere enn én næringsvirksomhet som er aktiv?',
    'selvstendig.veileder.flereAktiveVirksomheter':
        'Når du har flere aktive næringsvirksomheter skal du kun legge inn den virksomheten som er eldst av dem. Har du for eksempel en virksomhet du startet i 2012 og en annen som du startet i 2020, skal du kun legge inn virksomheten du startet i 2012.',

    'selvstendig.infoDialog.infoTittel': 'Næringsvirksomhet som du har lagt inn:',
    'selvstendig.infoDialog.registrerKnapp': 'Registrer virksomhet',
    'selvstendig.infoDialog.endreKnapp': 'Endre opplysninger',
    'selvstendig.infoDialog.fjernKnapp': 'Fjern virksomhet',
    'selvstendig.infoDialog.tittel': 'Virksomhet',

    'sn.arbeidsforhold.spm':
        'Hvor mange timer jobber du normalt per uke som selvstendig næringsdrivende når du ikke har fravær?',

    'step.omBarnet.pageTitle': 'Om barnet',
    'step.omBarnet.stepTitle': 'Om barnet',
    'step.omBarnet.stepIndicatorLabel': 'Om barnet',

    'step.kurs.pageTitle': 'Om opplæringen',
    'step.kurs.stepTitle': 'Om opplæringen',
    'step.kurs.stepIndicatorLabel': 'Om opplæringen',

    'step.arbeidssituasjon.stepTitle': 'Din arbeidssituasjon',
    'step.arbeidssituasjon.pageTitle': 'Din arbeidssituasjon',
    'step.arbeidssituasjon.stepIndicatorLabel': 'Din arbeidssituasjon',

    'step.arbeidstid.stepTitle': 'Jobb i søknadsperioden',
    'step.arbeidstid.pageTitle': 'Jobb i søknadsperioden',
    'step.arbeidstid.stepIndicatorLabel': 'Jobb i søknadsperioden',

    'step.medlemskap.pageTitle': 'Medlemskap i folketrygden',
    'step.medlemskap.stepTitle': 'Medlemskap i folketrygden',
    'step.medlemskap.stepIndicatorLabel': 'Om medlemskap i folketrygden',

    'step.legeerklæring.stepTitle': 'Dokumentasjon på nødvendig opplæring',
    'step.legeerklæring.pageTitle': 'Dokumentasjon på nødvendig opplæring',
    'step.legeerklæring.stepIndicatorLabel': 'Dokumentasjon på nødvendig opplæring',

    'step.oppsummering.pageTitle': 'Oppsummering',
    'step.oppsummering.stepTitle': 'Oppsummering',
    'step.oppsummering.stepIndicatorLabel': 'Oppsummering',
    'step.oppsummering.nextButtonLabel': 'Send inn søknad',

    'validation.harForståttRettigheterOgPlikter.notChecked': 'Du må bekrefte at du har lest og forstått dine plikter.',

    'validation.skalOppholdeSegIUtlandetIPerioden.yesOrNoIsUnanswered':
        'Du må svare på på om du oppholder deg i utlandet i noen av dagene du søker for.',
    'validation.utenlandsoppholdIPerioden.utenlandsopphold_ikke_registrert':
        'Du har svart ja til at du oppholder deg i utlandet i noen av dagene du søker for. Legg til minst ett utenlandsopphold.',
    'validation.utenlandsoppholdIPerioden.utenlandsopphold_overlapper':
        'Du har lagt inn utenlandsopphold med datoer som overlapper hverandre.',
    'validation.utenlandsoppholdIPerioden.utenlandsopphold_utenfor_periode':
        'Du har lagt inn utenlandsopphold som er utenfor søknadsperioden.',
    'validation.utenlandsoppholdIPerioden.utenlandsopphold_overlapper_samme_start_slutt':
        'Et utenlandsopphold kan ikke starte samme dag som et annet avsluttes.',

    'validation.arbeidsforhold.erAnsatt.yesOrNoIsUnanswered':
        'Du må svare på på om du er ansatt hos {navn} i perioden du søker opplæringspenger.',

    'validation.frilans.harHattInntektSomFrilanser.yesOrNoIsUnanswered':
        'Du må svare på på om du er frilanser i perioden du søker for.',
    'validation.frilans.startdato.dateHasNoValue':
        'Du må oppgi hvilken dato du startet som frilanser. Skriv inn eller velg dato fra kalenderen.',
    'validation.frilans.startdato.dateHasInvalidFormat':
        'Du må oppgi datoen for når du startet som frilanser i et gyldig format. Gyldig format er dd.mm.åååå.',
    'validation.frilans.startdato.dateIsAfterMax':
        'Datoen for når du startet som frilanser kan ikke være etter dagens dato.',
    'validation.frilans.startdato.startetEtterSøknadsperiode':
        'Du har oppgitt at du startet som frilanser etter perioden du søker for. Hvis dette stemmer, kan du svare "Nei" på spørsmålet om du var frilanser i perioden du søker for.',
    'validation.frilans.sluttdato.sluttetFørSøknadsperiode':
        'Du har oppgitt at du sluttet som frilanser før perioden du søker for. Hvis dette stemmer, kan du svare "Nei" på spørsmålet om du var frilanser i perioden du søker for.',
    'validation.frilans.sluttdato.dateHasNoValue':
        'Du må oppgi når du sluttet som frilanser. Skriv inn eller velg dato fra kalenderen.',
    'validation.frilans.sluttdato.dateHasInvalidFormat':
        'Du må oppgi datoen for når du sluttet som frilanser i et gyldig format. Gyldig format er dd.mm.åååå.',
    'validation.frilans.sluttdato.dateIsAfterMax':
        'Datoen for når du sluttet som frilanser kan ikke være etter dagens dato.',
    'validation.frilans.sluttdato.dateIsBeforeMin':
        'Datoen for når du sluttet som frilanser kan ikke være før datoen du startet.',
    'validation.frilans.jobberFortsattSomFrilans.yesOrNoIsUnanswered':
        'Du må svare på på om du fortsatt jobber som frilanser.',

    'validation.selvstendig.harHattInntektSomSN.yesOrNoIsUnanswered':
        'Du må svare på på om du er selvstendig næringsdrivende i perioden du søker for.',
    'validation.selvstendig.harFlereVirksomheter.yesOrNoIsUnanswered':
        'Du må svare på på om du har flere enn én virksomhet som er aktiv.',
    'validation.selvstendig.virksomhet.noValue':
        'Du må oppgi informasjon om virksomheten din som selvstendig næringsdrivende.',
    'validation.selvstendig.virksomhet.startetEtterSøknadsperiode':
        'Du har oppgitt at du startet som selvstendig næringsdrivende etter perioden du søker for. Hvis dette stemmer,  svarer du "Nei" på spørsmålet om du var selvstendig næringsdrivende i perioden du søker for.',
    'validation.selvstendig.virksomhet.sluttetFørSøknadsperiode':
        'Du har oppgitt at du sluttet som selvstendig næringsdrivende før perioden du søker for. Hvis dette stemmer,  svarer du "Nei" på spørsmålet om du var selvstendig næringsdrivende i perioden du søker for.',

    'validation.harVærtEllerErVernepliktig.yesOrNoIsUnanswered':
        'Du må svare på på om du utøvde verneplikt på tidspunktet du søker opplæringspenger fra.',
    'virksomhetForm.næringstype.noValue': 'Du må velge hvilken type virksomhet du har.',

    'validation.arbeidIPeriode.jobber': 'Du må svare på om du jobber noe {hvor} i søknadsperioden.',

    'validation.opptjeningUtland.listIsEmpty': 'Du må legge til jobb i et annet EØS-land.',
    'validation.harOpptjeningUtland.yesOrNoIsUnanswered':
        'Du må svare på på om du har jobbet som arbeidstaker eller frilanser i et annet EØS-land i løpet av de 3 siste månedene før første dag med opplæringspenger.',

    'validation.harUtenlandskNæring.yesOrNoIsUnanswered':
        'Du må svare på på om du har jobbet som selvstendig næringsdrivende i et annet EØS-land i løpet av de 3 siste årene før perioden du søker om.',
    'validation.utenlandskNæring.listIsEmpty': 'Du må legge til næringsvirksomhet i et annet EØS-land.',

    'validation.arbeidsforhold.sluttetFørSøknadsperiode.yesOrNoIsUnanswered':
        'Du må svare på om du sluttet hos {navn} før {fraDato}.',
    'validation.arbeidsforhold.jobberNormaltTimer.numberHasNoValue':
        'Du må oppgi hvor mange timer du {jobber} {hvor} i perioden, når du ikke har fravær.',
    'validation.arbeidsforhold.jobberNormaltTimer.numberHasInvalidFormat':
        'Antall timer du {jobber} per uke {hvor} har ikke gyldig format. Et gyldig tall inneholder kun siffer og komma som desimaltegn.',

    'validation.arbeidsforhold.jobberNormaltTimer.numberIsTooSmall':
        'Antall timer du {jobber} per uke {hvor} kan ikke være mindre enn {min}.',
    'validation.arbeidsforhold.jobberNormaltTimer.numberIsTooLarge':
        'Antall timer du {jobber} per uke {hvor} kan ikke være mer enn {max}.',

    'validation.harBoddUtenforNorgeSiste12Mnd.yesOrNoIsUnanswered':
        'Du må svare på på om du har bodd i utlandet i hele eller deler av de siste 12 månedene.',
    'validation.utenlandsoppholdSiste12Mnd.utenlandsopphold_ikke_registrert':
        'Du har oppgitt at du har vært i utlandet de siste 12 månedene. Du må registrere dette utenlandsoppholdet.',
    'validation.utenlandsoppholdSiste12Mnd.utenlandsopphold_overlapper':
        'Ett eller flere av utenlandsoppholdene du har lagt inn for de siste 12 månedene, har datoer som overlapper hverandre.',
    'validation.skalBoUtenforNorgeNeste12Mnd.yesOrNoIsUnanswered':
        'Du må svare på på om du planlegger å bo i utlandet i hele eller deler av de neste 12 månedene.',
    'validation.utenlandsoppholdNeste12Mnd.utenlandsopphold_ikke_registrert':
        'Du har oppgitt at du skal oppholde deg i utlandet de neste 12 månedene. Du må registrere dette utenlandsoppholdet.',
    'validation.utenlandsoppholdNeste12Mnd.utenlandsopphold_overlapper':
        'Ett eller flere av utenlandsoppholdene du har lagt inn for de neste 12 månedene, har datoer som overlapper hverandre.',

    'validation.harBekreftetOpplysninger.notChecked': 'Du må bekrefte at opplysningene du har gitt er riktige.',

    'arbeidssituasjonFrilanser.frilanserPart.tittel': 'Om deg som frilanser',
    'frilansoppdragListe.oppdrag': 'Periode: {kurs}',
    'frilansoppdragListe.kurs.avsluttet': 'fra {fra} til {til}',
    'frilansoppdragListe.kurs.pågående': 'fra {fra} - pågående',
    'frilansoppdragInfo.tittel': 'Registrerte frilansoppdrag i perioden:',
    'frilansoppdragInfo.tekst':
        'Dette er frilansoppdrag registrert i AA-registeret i perioden du søker om opplæringspenger. Hvis informasjonen ikke stemmer, må du ta kontakt med oppdragsgiver og be de oppdatere informasjonen i AA-registeret.',
    'ingenFraværConfirmation.title': 'Ingen fravær registrert',
    'ingenFraværConfirmation.okLabel': 'Ja, det stemmer',
    'ingenFraværConfirmation.cancelLabel': 'Nei, det stemmer ikke',
    'ingenFraværConfirmation.content':
        'Du har oppgitt at du jobber som normalt og ikke har fravær i dagene du søker for. For å ha rett til opplæringspenger må du ha fravær fra jobb fordi du skal delta på opplæring, eller er borte fra jobb på grunn av reise til opplæringsstedet. Stemmer det at du ikke har fravær fra jobb i dagene du søker for?',
    'ingenFraværConfirmation.heading': 'Fravær fra jobb',
};

const nn: Record<keyof typeof nb, string> = {
    ...arbeidssituasjonMessages.nn,
    ...arbeidstidMessages.nn,
    ...arbeidstidPeriodeMessages.nn,
    ...calendarGridMessages.nn,
    ...dagerMedTidMessages.nn,
    ...kursMessages.nn,
    ...kursperiodeMessages.nn,
    ...kvitteringMessages.nn,
    ...legeerklæringMessages.nn,
    ...omBarnetFormIntlMessages.nn,
    ...oppsummeringMessages.nn,
    ...validateApiDataMessages.nn,
    ...velkommenPageMessages.nn,

    'application.title': 'Søknad om opplæringspengar',

    'initialLoadError.pageTitle': 'Det oppstod ein feil',
    'initialLoadError.text.1': 'Det oppstod ein feil under oppstarten av søknaden. Ver venleg å prøve igjen seinare.',

    'resetMellomlagring.text.1': 'Dersom feilen held fram, kan du prøve å starte på nytt med eit tomt skjema.',
    'resetMellomlagring.startPåNytt': 'Start på nytt',

    hvaBetyrDette: 'Kva betyr dette?',
    fødselsnummer: 'Fødselsnummer:',

    'dagerMedTid.uke': 'Veke {uke}',
    'dagerMedTid.ingenDagerRegistrert': 'Ingen dagar registrert.',

    'frilanser.harDuHattInntekt.spm': 'Er du frilanser i perioden du søkjer for?',
    'frilanser.nårStartet.spm': 'Når starta du å jobbe som frilanser?',
    'frilanser.jobberFortsatt.spm': 'Jobbar du framleis som frilanser?',
    'frilanser.nårSluttet.spm': 'Når slutta du som frilanser?',
    'frilanser.jobberNormaltTimer.spm':
        'Kor mange timar jobbar du normalt per veke som frilanser når du ikkje har fråvær?',
    'frilanser.jobberNormaltTimer.avsluttet.spm':
        'Kor mange timar jobba du normalt per veke som frilanser då du ikkje hadde fråvær?',

    'frilanser.hjelpetekst.spm': 'Kva betyr det å vere frilanser?',
    'frilanser.hjelpetekst':
        'Du er frilanser når du får løn for enkeltståande oppdrag utan å vere fast eller mellombels tilsett hos den du utfører oppdraget for. Dersom du er usikker på om du er frilanser, kan du sjekke om oppdraga dine er registrerte som frilansoppdrag på',
    'frilanser.hjelpetekst.skatteetatenLenke': 'skatteetaten sine nettsider.',
    'frilanser.hjelpetekst.2.heading': 'Omsorgsstønad og fosterheimsgodtgjersle',
    'frilanser.hjelpetekst.2':
        'Du treng ikkje å oppgi omsorgsstønad eller fosterheimsgodtgjersle dersom du held fram med å få det under opplæringa.',

    'selvstendig.harDuHattInntekt.spm': 'Er du sjølvstendig næringsdrivande i perioden du søkjer for?',
    'selvstendig.harDuHattInntekt.hjelpetekst.tittel': 'Kva betyr det å vere sjølvstendig næringsdrivande?',
    'selvstendig.harDuHattInntekt.hjelpetekst':
        'Du er sjølvstendig næringsdrivande dersom du har eit enkeltpersonføretak (ENK), eit ansvarleg selskap (ANS), eller eit ansvarleg selskap med delt ansvar (DA).',
    'selvstendig.harDuHattInntekt.hjelpetekst.snSkatteetatenLenke':
        'Du kan også lese på skatteetaten sine nettsider om andre situasjonar der du kan reknast som sjølvstendig næringsdrivande.',
    'selvstendig.harFlereVirksomheter.spm': 'Har du fleire enn éi næringsverksemd som er aktiv?',
    'selvstendig.veileder.flereAktiveVirksomheter':
        'Dersom du har fleire aktive næringsverksemder, skal du berre legge inn den eldste verksemda. Har du til dømes ei verksemd du starta i 2012 og ei anna du starta i 2020, skal du berre legge inn verksemda du starta i 2012.',

    'selvstendig.infoDialog.infoTittel': 'Næringsverksemd som du har lagt inn:',
    'selvstendig.infoDialog.registrerKnapp': 'Registrer verksemd',
    'selvstendig.infoDialog.endreKnapp': 'Endre opplysningar',
    'selvstendig.infoDialog.fjernKnapp': 'Fjern verksemd',
    'selvstendig.infoDialog.tittel': 'Verksemd',

    'sn.arbeidsforhold.spm':
        'Kor mange timar jobbar du normalt per veke som sjølvstendig næringsdrivande når du ikkje har fråvær?',

    'step.omBarnet.pageTitle': 'Om barnet',
    'step.omBarnet.stepTitle': 'Om barnet',
    'step.omBarnet.stepIndicatorLabel': 'Om barnet',

    'step.kurs.pageTitle': 'Om opplæringa',
    'step.kurs.stepTitle': 'Om opplæringa',
    'step.kurs.stepIndicatorLabel': 'Om opplæringa',

    'step.arbeidssituasjon.stepTitle': 'Arbeidssituasjonen din',
    'step.arbeidssituasjon.pageTitle': 'Arbeidssituasjonen din',
    'step.arbeidssituasjon.stepIndicatorLabel': 'Arbeidssituasjonen din',

    'step.arbeidstid.stepTitle': 'Jobb i søknadsperioden',
    'step.arbeidstid.pageTitle': 'Jobb i søknadsperioden',
    'step.arbeidstid.stepIndicatorLabel': 'Jobb i søknadsperioden',

    'step.medlemskap.pageTitle': 'Medlemskap i folketrygda',
    'step.medlemskap.stepTitle': 'Medlemskap i folketrygda',
    'step.medlemskap.stepIndicatorLabel': 'Om medlemskap i folketrygda',

    'step.legeerklæring.stepTitle': 'Dokumentasjon på naudsynt opplæring',
    'step.legeerklæring.pageTitle': 'Dokumentasjon på naudsynt opplæring',
    'step.legeerklæring.stepIndicatorLabel': 'Dokumentasjon på naudsynt opplæring',

    'step.oppsummering.pageTitle': 'Oppsummering',
    'step.oppsummering.stepTitle': 'Oppsummering',
    'step.oppsummering.stepIndicatorLabel': 'Oppsummering',
    'step.oppsummering.nextButtonLabel': 'Send inn søknad',

    'validation.harForståttRettigheterOgPlikter.notChecked':
        'Du må stadfeste at du har lese og forstått pliktene dine.',

    'validation.skalOppholdeSegIUtlandetIPerioden.yesOrNoIsUnanswered':
        'Du må svare på om du oppheld deg i utlandet i nokre av dagane du søkjer for.',
    'validation.utenlandsoppholdIPerioden.utenlandsopphold_ikke_registrert':
        'Du har svart ja til at du oppheld deg i utlandet i nokre av dagane du søkjer for. Legg til minst eitt utanlandsopphald.',
    'validation.utenlandsoppholdIPerioden.utenlandsopphold_overlapper':
        'Du har lagt inn utanlandsopphald med datoar som overlappar kvarandre.',
    'validation.utenlandsoppholdIPerioden.utenlandsopphold_utenfor_periode':
        'Du har lagt inn utanlandsopphald som er utanfor søknadsperioden.',
    'validation.utenlandsoppholdIPerioden.utenlandsopphold_overlapper_samme_start_slutt':
        'Eit utanlandsopphald kan ikkje starte same dag som eit anna avsluttast.',

    'validation.arbeidsforhold.erAnsatt.yesOrNoIsUnanswered':
        'Du må svare på om du er tilsett hos {navn} i perioden du søkjer opplæringspengar.',

    'validation.frilans.harHattInntektSomFrilanser.yesOrNoIsUnanswered':
        'Du må svare på om du er frilanser i perioden du søkjer for.',
    'validation.frilans.startdato.dateHasNoValue':
        'Du må oppgi kva dato du starta som frilanser. Skriv inn eller vel dato frå kalenderen.',
    'validation.frilans.startdato.dateHasInvalidFormat':
        'Du må oppgi datoen for når du starta som frilanser i eit gyldig format. Gyldig format er dd.mm.åååå.',
    'validation.frilans.startdato.dateIsAfterMax':
        'Datoen for når du starta som frilanser kan ikkje vere etter dagens dato.',
    'validation.frilans.startdato.startetEtterSøknadsperiode':
        "Du har oppgitt at du starta som frilanser etter perioden du søkjer for. Dersom dette stemmer, kan du svare 'Nei' på spørsmålet om du var frilanser i perioden du søkjer for.",
    'validation.frilans.sluttdato.sluttetFørSøknadsperiode':
        "Du har oppgitt at du slutta som frilanser før perioden du søkjer for. Dersom dette stemmer, kan du svare 'Nei' på spørsmålet om du var frilanser i perioden du søkjer for.",
    'validation.frilans.sluttdato.dateHasNoValue':
        'Du må oppgi når du slutta som frilanser. Skriv inn eller vel dato frå kalenderen.',
    'validation.frilans.sluttdato.dateHasInvalidFormat':
        'Du må oppgi datoen for når du slutta som frilanser i eit gyldig format. Gyldig format er dd.mm.åååå.',
    'validation.frilans.sluttdato.dateIsAfterMax':
        'Datoen for når du slutta som frilanser kan ikkje vere etter dagens dato.',
    'validation.frilans.sluttdato.dateIsBeforeMin':
        'Datoen for når du slutta som frilanser kan ikkje vere før datoen du starta.',
    'validation.frilans.jobberFortsattSomFrilans.yesOrNoIsUnanswered':
        'Du må svare på om du framleis jobbar som frilanser.',

    'validation.selvstendig.harHattInntektSomSN.yesOrNoIsUnanswered':
        'Du må svare på om du er sjølvstendig næringsdrivande i perioden du søkjer for.',
    'validation.selvstendig.harFlereVirksomheter.yesOrNoIsUnanswered':
        'Du må svare på om du har fleire enn éi aktiv verksemd.',
    'validation.selvstendig.virksomhet.noValue':
        'Du må oppgi informasjon om verksemda di som sjølvstendig næringsdrivande.',
    'validation.selvstendig.virksomhet.startetEtterSøknadsperiode':
        "Du har oppgitt at du starta som sjølvstendig næringsdrivande etter perioden du søkjer for. Dersom dette stemmer, kan du svare 'Nei' på spørsmålet om du var sjølvstendig næringsdrivande i perioden du søkjer for.",
    'validation.selvstendig.virksomhet.sluttetFørSøknadsperiode':
        "Du har oppgitt at du slutta som sjølvstendig næringsdrivande før perioden du søkjer for. Dersom dette stemmer, kan du svare 'Nei' på spørsmålet om du var sjølvstendig næringsdrivande i perioden du søkjer for.",

    'validation.harVærtEllerErVernepliktig.yesOrNoIsUnanswered':
        'Du må svare på om du utførte verneplikt på tidspunktet du søkjer opplæringspengar frå.',
    'virksomhetForm.næringstype.noValue': 'Du må velje kva type verksemd du har.',

    'validation.arbeidIPeriode.jobber': 'Du må svare på om du jobbar noko {hvor} i søknadsperioden.',

    'validation.opptjeningUtland.listIsEmpty': 'Du må leggje til jobb i eit anna EØS-land.',
    'validation.harOpptjeningUtland.yesOrNoIsUnanswered':
        'Du må svare på om du har jobba som arbeidstakar eller frilanser i eit anna EØS-land i løpet av dei siste tre månadene før første dag med opplæringspengar.',

    'validation.harUtenlandskNæring.yesOrNoIsUnanswered':
        'Du må svare på om du har jobba som sjølvstendig næringsdrivande i eit anna EØS-land i løpet av dei siste tre åra før perioden du søkjer om.',
    'validation.utenlandskNæring.listIsEmpty': 'Du må leggje til næringsverksemd i eit anna EØS-land.',

    'validation.arbeidsforhold.sluttetFørSøknadsperiode.yesOrNoIsUnanswered':
        'Du må svare på om du slutta hos {navn} før {fraDato}.',
    'validation.arbeidsforhold.jobberNormaltTimer.numberHasNoValue':
        'Du må oppgi kor mange timar du {jobber} {hvor} i perioden, når du ikkje har fråvær.',
    'validation.arbeidsforhold.jobberNormaltTimer.numberHasInvalidFormat':
        'Talet på timar du {jobber} per veke {hvor} har ikkje gyldig format. Eit gyldig tal inneheld berre siffer og komma som desimalteikn.',

    'validation.arbeidsforhold.jobberNormaltTimer.numberIsTooSmall':
        'Talet på timar du {jobber} per veke {hvor} kan ikkje vere mindre enn {min}.',
    'validation.arbeidsforhold.jobberNormaltTimer.numberIsTooLarge':
        'Talet på timar du {jobber} per veke {hvor} kan ikkje vere meir enn {max}.',

    'validation.harBoddUtenforNorgeSiste12Mnd.yesOrNoIsUnanswered':
        'Du må svare på om du har budd i utlandet i heile eller delar av dei siste tolv månadene.',

    'validation.utenlandsoppholdSiste12Mnd.utenlandsopphold_ikke_registrert':
        'Du har oppgitt at du har vore i utlandet dei siste 12 månadene. Du må registrere dette utanlandsopphaldet.',
    'validation.utenlandsoppholdSiste12Mnd.utenlandsopphold_overlapper':
        'Eitt eller fleire av utanlandsopphalda du har lagt inn for dei siste 12 månadene, har datoar som overlappar kvarandre.',
    'validation.skalBoUtenforNorgeNeste12Mnd.yesOrNoIsUnanswered':
        'Du må svare på om du planlegg å bu i utlandet i heile eller delar av dei neste 12 månadene.',
    'validation.utenlandsoppholdNeste12Mnd.utenlandsopphold_ikke_registrert':
        'Du har oppgitt at du skal opphalde deg i utlandet dei neste 12 månadene. Du må registrere dette utanlandsopphaldet.',
    'validation.utenlandsoppholdNeste12Mnd.utenlandsopphold_overlapper':
        'Eitt eller fleire av utanlandsopphalda du har lagt inn for dei neste 12 månadene, har datoar som overlappar kvarandre.',

    'validation.harBekreftetOpplysninger.notChecked': 'Du må stadfeste at opplysningane du har gitt, er riktige.',

    'arbeidssituasjonFrilanser.frilanserPart.tittel': 'Om deg som frilanser',
    'frilansoppdragListe.oppdrag': 'Periode: {kurs}',
    'frilansoppdragListe.kurs.avsluttet': 'frå {fra} til {til}',
    'frilansoppdragListe.kurs.pågående': 'frå {fra} - pågåande',
    'frilansoppdragInfo.tittel': 'Registrerte frilansoppdrag i perioden:',
    'frilansoppdragInfo.tekst':
        'Dette er frilansoppdrag registrerte i AA-registeret i perioden du søkjer om opplæringspengar. Dersom informasjonen ikkje stemmer, må du ta kontakt med oppdragsgivar og be dei oppdatere informasjonen i AA-registeret.',
    'ingenFraværConfirmation.title': 'Ingen fråvær registrert',
    'ingenFraværConfirmation.okLabel': 'Ja, det stemmer',
    'ingenFraværConfirmation.cancelLabel': 'Nei, det stemmer ikkje',
    'ingenFraværConfirmation.content':
        'Du har oppgitt at du jobbar som normalt og ikkje har fråvær dei dagane du søkjer for. For å ha rett til opplæringspengar må du ha fråvær frå jobb fordi du skal delta på opplæring, eller vere borte frå jobb på grunn av reise til opplæringsstaden. Stemmer det at du ikkje har fråvær frå jobb dei dagane du søkjer for?',
    'ingenFraværConfirmation.heading': 'Fråvær frå jobb',
};

export const appMessages = { nb, nn };

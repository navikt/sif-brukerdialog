import { velkommenPageMessages_nn } from '../pages/velkommen/i18n/nn';
import { opplysningerOmPleietrengendeMessages_nn } from '../søknad/steps/opplysninger-om-pleietrengende/i18n/nn';
import { dagerMedTidMessages_nn } from '../components/dager-med-tid-liste/i18n/nn';
import { kvitteringMessages_nn } from '../pages/kvittering/i18n/nn';
import { arbeidssituasjonMessages_nn } from '../søknad/steps/arbeidssituasjon/i18n/nn';
import { arbeidstidMessages_nn } from '../søknad/steps/arbeidstid/i18n/nn';
import { arbeidstidPeriodeMessages_nn } from '../søknad/steps/arbeidstid/i18n/nn';
import { legeerklæringMessages_nn } from '../søknad/steps/legeerklæring/i18n/nn';
import { oppsummeringMessages_nn } from '../søknad/steps/oppsummering/i18n/nn';
import { tidsromMessages_nn } from '../søknad/steps/tidsrom/i18n/nn';
import { appMessages_nb } from './nb';

export const appMessages_nn: Record<keyof typeof appMessages_nb, string> = {
    ...arbeidssituasjonMessages_nn,
    ...arbeidstidMessages_nn,
    ...arbeidstidPeriodeMessages_nn,
    ...dagerMedTidMessages_nn,
    ...kvitteringMessages_nn,
    ...legeerklæringMessages_nn,
    ...opplysningerOmPleietrengendeMessages_nn,
    ...oppsummeringMessages_nn,
    ...tidsromMessages_nn,
    ...velkommenPageMessages_nn,

    'application.title': 'Søknad om pleiepengar i livets sluttfase',

    'initialLoadError.pageTitle': 'Det oppstod ein feil',
    'initialLoadError.text.1': 'Det oppstod ein feil under oppstarten av søknaden. Venlegst prøv igjen seinare.',

    'resetMellomlagring.text.1': 'Om feilen vedvarer, kan du prøve å starte på nytt med eit tomt skjema.',
    'resetMellomlagring.startPåNytt': 'Start på nytt',

    hvaBetyrDette: 'Kva betyr dette?',
    fødselsnummer: 'Fødselsnummer:',

    'dagerMedTid.uke': 'Veke {uke}',
    'dagerMedTid.ingenDagerRegistrert': 'Ingen dagar registrerte',

    'frilanser.harDuHattInntekt.spm': 'Er du frilansar i perioden du søker for?',
    'frilanser.nårStartet.spm': 'Når starta du å jobbe som frilansar?',
    'frilanser.jobberFortsatt.spm': 'Jobbar du framleis som frilansar?',
    'frilanser.nårSluttet.spm': 'Når slutta du som frilansar?',
    'frilanser.jobberNormaltTimer.spm':
        'Kor mange timar jobbar du normalt per veke som frilansar når du ikkje har fråvær?',
    'frilanser.jobberNormaltTimer.avsluttet.spm':
        'Kor mange timar jobba du normalt per veke som frilansar då du ikkje hadde fråvær?',

    'frilanser.hjelpetekst.spm': 'Kva betyr det å vere frilansar?',
    'frilanser.hjelpetekst':
        'Du er frilansar når du mottek løn for enkeltståande oppdrag utan å vere fast eller mellombels tilsett hos den du utfører oppdraget for. Om du er usikker på om du er frilansar må du sjekke om oppdraga dine er registrerte som frilansoppdrag på',
    'frilanser.hjelpetekst.skatteetatenLenke': 'skatteetaten sine nettsider.',

    'selvstendig.harDuHattInntekt.spm': 'Er du sjølvstendig næringsdrivande i perioden du søker for?',
    'selvstendig.harDuHattInntekt.hjelpetekst.tittel': 'Kva betyr det å vere sjølvstendig næringsdrivande?',
    'selvstendig.harDuHattInntekt.hjelpetekst':
        'Du er sjølvstendig næringsdrivande når du enten har eit enkeltpersonføretak (ENK), eit ansvarleg selskap (ANS), eller eit ansvarleg selskap med delt ansvar (DA).',
    'selvstendig.harDuHattInntekt.hjelpetekst.snSkatteetatenLenke':
        'Du kan lese meir om andre situasjonar på skatteetaten sine nettsider.',
    'selvstendig.harFlereVirksomheter.spm': 'Har du fleire enn éi næringsverksemd som er aktiv?',
    'selvstendig.veileder.flereAktiveVirksomheter':
        'Når du har fleire aktive næringsverksemder skal du berre legge inn den eldste av dei. Har du til dømes ei verksemd du starta i 2012 og ei anna som du starta i 2020, skal du berre legge inn verksemda frå 2012.',

    'selvstendig.infoDialog.infoTittel': 'Næringsverksemd som du har lagt inn:',
    'selvstendig.infoDialog.registrerKnapp': 'Registrer verksemd',
    'selvstendig.infoDialog.endreKnapp': 'Endre opplysningar',
    'selvstendig.infoDialog.fjernKnapp': 'Fjern verksemd',
    'selvstendig.infoDialog.tittel': 'Verksemd',

    'sn.arbeidsforhold.spm':
        'Kor mange timar jobbar du normalt per veke som sjølvstendig næringsdrivande når du ikkje har fråvær?',

    'step.arbeidstid.pageTitle': 'Opplysningar om arbeidstid',
    'step.arbeidstid.stepTitle': 'Jobb i søknadsperioden',
    'step.arbeidstid.stepIndicatorLabel': 'Jobb i søknadsperioden',
    'step.arbeidstid.nextButtonLabel': 'Hald fram',

    'step.medlemskap.pageTitle': 'Medlemskap i folketrygda',
    'step.medlemskap.stepTitle': 'Medlemskap i folketrygda',
    'step.medlemskap.stepIndicatorLabel': 'Om medlemskap i folketrygda',
    'step.medlemskap.nextButtonLabel': 'Hald fram',

    'validation.harForståttRettigheterOgPlikter.notChecked': 'Du må stadfeste at du har lese og forstått dine plikter.',

    'validation.pleierDuDenSykeHjemme.yesOrNoIsUnanswered': 'Du må svare på om du pleier personen heime.',

    'validation.flereSokere.noValue':
        'Du må svare ja, nei eller usikker på om de er fleire som skal dele på pleiepengane.',

    'validation.skalJobbeIPerioden.yesOrNoIsUnanswered':
        'Du må svare på om du skal gi pleie og jobbe på same dag, nokre av dagane du skal gi pleie.',

    'validation.dagerMedPleie.ingenDagerValgt': 'Du må velje minst éin dag med pleiepengar.',
    'validation.skalJobbeOgPleieSammeDag.yesOrNoIsUnanswered':
        'Du må svare på om du skal gi pleie og jobbe på same dag.',
    'validation.skalOppholdeSegIUtlandetIPerioden.yesOrNoIsUnanswered':
        'Du må svare på om du oppheld deg i utlandet i nokre av dagane du søker for.',
    'validation.utenlandsoppholdIPerioden.utenlandsopphold_ikke_registrert':
        'Du har svart ja til at du oppheld deg i utlandet i nokre av dagane du søker for. Legg til minst eitt utanlandsopphald.',
    'validation.utenlandsoppholdIPerioden.utenlandsopphold_overlapper':
        'Du har lagt inn utanlandsopphald med datoar som overlappar kvarandre.',
    'validation.utenlandsoppholdIPerioden.utenlandsopphold_utenfor_periode':
        'Du har lagt inn utanlandsopphald som er utanfor søknadsperioden.',
    'validation.utenlandsoppholdIPerioden.utenlandsopphold_overlapper_samme_start_slutt':
        'Eit utanlandsopphald kan ikkje starte same dag som eit anna avsluttast.',

    'validation.arbeidsforhold.erAnsatt.yesOrNoIsUnanswered':
        'Du må svare på om du er tilsett hos {navn} i perioden du søker pleiepengar.',

    'validation.frilans.harHattInntektSomFrilanser.yesOrNoIsUnanswered':
        'Du må svare på om du er frilansar i perioden du søker for.',
    'validation.frilans.startdato.dateHasNoValue':
        'Du må oppgje kva dato du starta som frilansar. Skriv inn eller vel dato frå kalenderen.',
    'validation.frilans.startdato.dateHasInvalidFormat':
        'Du må oppgje datoen for når du starta som frilansar i eit gyldig format. Gyldig format er dd.mm.åååå.',
    'validation.frilans.startdato.dateIsAfterMax':
        'Datoen for når du starta som frilansar kan ikkje vere etter dagens dato.',
    'validation.frilans.startdato.startetEtterSøknadsperiode':
        'Du har oppgitt at du starta som frilansar etter perioden du søker for. Om dette stemmer, kan du svare "Nei" på spørsmålet om du var frilansar i perioden du søker for.',
    'validation.frilans.sluttdato.sluttetFørSøknadsperiode':
        'Du har oppgitt at du slutta som frilansar før perioden du søker for. Om dette stemmer, kan du svare "Nei" på spørsmålet om du var frilansar i perioden du søker for.',
    'validation.frilans.sluttdato.dateHasNoValue':
        'Du må oppgje når du slutta som frilansar. Skriv inn eller vel dato frå kalenderen.',
    'validation.frilans.sluttdato.dateHasInvalidFormat':
        'Du må oppgje datoen for når du slutta som frilansar i eit gyldig format. Gyldig format er dd.mm.åååå.',
    'validation.frilans.sluttdato.dateIsAfterMax':
        'Datoen for når du slutta som frilansar kan ikkje vere etter dagens dato.',
    'validation.frilans.sluttdato.dateIsBeforeMin':
        'Datoen for når du slutta som frilansar kan ikkje vere før datoen du starta.',
    'validation.frilans.jobberFortsattSomFrilans.yesOrNoIsUnanswered':
        'Du må svare på om du framleis jobbar som frilansar.',

    'validation.selvstendig.harHattInntektSomSN.yesOrNoIsUnanswered':
        'Du må svare på om du er sjølvstendig næringsdrivande i perioden du søker for.',
    'validation.selvstendig.harFlereVirksomheter.yesOrNoIsUnanswered':
        'Du må svare på om du har fleire enn éi verksemd som er aktiv.',
    'validation.selvstendig.virksomhet.noValue':
        'Du må oppgje informasjon om verksemda di som sjølvstendig næringsdrivande.',
    'validation.selvstendig.virksomhet.startetEtterSøknadsperiode':
        'Du har oppgitt at du starta som sjølvstendig næringsdrivande etter perioden du søker for. Om dette stemmer, svarer du "Nei" på spørsmålet om du var sjølvstendig næringsdrivande i perioden du søker for.',
    'validation.selvstendig.virksomhet.sluttetFørSøknadsperiode':
        'Du har oppgitt at du slutta som sjølvstendig næringsdrivande før perioden du søker for. Om dette stemmer, svarer du "Nei" på spørsmålet om du var sjølvstendig næringsdrivande i perioden du søker for.',

    'validation.harVærtEllerErVernepliktig.yesOrNoIsUnanswered':
        'Du må svare på om du utførte verneplikt på tidspunktet du søker pleiepengar frå.',
    'virksomhetForm.næringstype.noValue': 'Du må velje kva type verksemd du har.',

    'validation.opptjeningUtland.listIsEmpty': 'Du må legge til jobb i eit anna EØS-land.',
    'validation.harOpptjeningUtland.yesOrNoIsUnanswered':
        'Du må svare på om du har jobba som arbeidstakar eller frilansar i eit anna EØS-land i løpet av dei siste 3 månadene før første dag med pleiepengar.',

    'validation.harUtenlandskNæring.yesOrNoIsUnanswered':
        'Du må svare på om du har jobba som sjølvstendig næringsdrivande i eit anna EØS-land i løpet av dei siste 3 åra før perioden du søker om.',
    'validation.utenlandskNæring.listIsEmpty': 'Du må legge til næringsverksemd i eit anna EØS-land.',

    'validation.arbeidsforhold.sluttetFørSøknadsperiode.yesOrNoIsUnanswered':
        'Du må svare på om du slutta hos {navn} før {fraDato}.',
    'validation.arbeidsforhold.jobberNormaltTimer.numberHasNoValue':
        'Du må oppgje kor mange timar per veke du {jobber} {hvor} i perioden.',
    'validation.arbeidsforhold.jobberNormaltTimer.numberHasInvalidFormat':
        'Tal timar du {jobber} per veke {hvor} har ikkje gyldig format. Eit gyldig tal inneheld berre siffer og komma som desimalteikn.',
    'validation.arbeidIPeriode.jobber': 'Du må svare kva situasjon som gjeld for deg hos {hvor} i perioden.',

    'validation.arbeidsforhold.jobberNormaltTimer.numberIsTooSmall':
        'Tal timar du {jobber} per veke {hvor} kan ikkje vere mindre enn {min}.',
    'validation.arbeidsforhold.jobberNormaltTimer.numberIsTooLarge':
        'Tal timar du {jobber} per veke {hvor} kan ikkje vere meir enn {max}.',

    'validation.harBoddUtenforNorgeSiste12Mnd.yesOrNoIsUnanswered':
        'Du må svare på om du har budd i utlandet i heile eller delar av dei siste 12 månadene.',
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

    'validation.harBekreftetOpplysninger.notChecked': 'Du må stadfeste at opplysningane du har gitt er riktige.',

    'arbeidssituasjonFrilanser.frilanserPart.tittel': 'Om deg som frilansar',
    'frilansoppdragListe.oppdrag': 'Periode: {tidsrom}',
    'frilansoppdragListe.tidsrom.avsluttet': 'frå {fra} til {til}',
    'frilansoppdragListe.tidsrom.pågående': 'frå {fra} - pågåande',
    'frilansoppdragInfo.tittel': 'Registrerte frilansoppdrag i perioden:',
    'frilansoppdragInfo.tekst':
        'Dette er frilansoppdrag registrert i AA-registeret i perioden du søker om pleiepengar. Om informasjonen ikkje stemmer, må du kontakte oppdragsgivar og be dei oppdatere informasjonen i AA-registeret.',
    'ingenFraværConfirmation.title': 'Ingen fråvær registrert',
    'ingenFraværConfirmation.okLabel': 'Ja, det stemmer',
    'ingenFraværConfirmation.cancelLabel': 'Nei, det stemmer ikkje',
    'ingenFraværConfirmation.content':
        'Du har oppgitt at du jobbar som normalt og ikkje har fråvær i dagane du søker for. For å ha rett til pleiepengar må du ha fråvær frå jobb fordi du pleier nokon. Stemmer det at du ikkje har fråvær frå jobb i dagane du søker for?',
    'ingenFraværConfirmation.heading': 'Fråvær frå jobb',

    'apiDataValidation.undefined': 'Det oppstod ein feil ved visninga av sida.',
    'apiDataValidation.omsorgsavtaleMangler': 'Det manglar avtale om delt bustad.',
};

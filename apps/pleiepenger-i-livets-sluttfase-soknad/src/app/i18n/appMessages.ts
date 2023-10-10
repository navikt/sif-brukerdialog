import { MessageFileFormat } from '@navikt/sif-common-core-ds/lib/types/MessageFileFormat';

export const appMessages: MessageFileFormat = {
    nb: {
        'application.bannerTitle': 'Søknad om pleiepenger i livets sluttfase',
        'application.title': 'Søknad om pleiepenger i livets sluttfase',
        'page.form.ubesvarteSpørsmålInfo': 'For å komme videre, må du svare på alle spørsmålene ovenfor.',

        'fileUploadErrors.part1': 'Det har dessverre skjedd en feil under opplasting av følgende vedlegg:',
        'vedleggsliste.fjernKnapp': 'Fjern vedlegg',

        'initialLoadError.pageTitle': 'Det oppstod en feil',
        'initialLoadError.text.1': 'Det oppstod en feil under oppstarten av søknaden. Vennligst prøv igjen senere.',

        'resetMellomlagring.text.1': 'Hvis feilen vedvarer, kan du prøve å starte på nytt med et tom skjema.',
        'resetMellomlagring.startPåNytt': 'Start på nytt',

        hvaBetyrDette: 'Hva betyr dette?',
        fødselsnummer: 'Fødselsnummer:',
        apiVerdierMangler: 'Api verdier mangler',
        'page.loadingPage.tekst': 'Laster ...',

        ukeÅr: 'Uke {ukenummer}, {år}',
        'dagerMedTid.uke': 'Uke {uke}',
        'dagerMedTid.ingenDagerRegistrert': 'Ingen dager registrert',

        'page.generalErrorPage.sidetittel': 'Feil',
        'page.generalErrorPage.tittel': 'Noe gikk galt...',
        'page.generalErrorPage.tekst': 'Beklager, her har det dessverre skjedd en feil.',

        'page.invalidStepPage.sidetittel': 'Oops, nå skjedde det en feil...',
        'page.invalidStepPage.tittel': 'Oops, nå skjedde det en feil...',
        'page.invalidStepPage.tekst':
            'Du er kommet til en side du ikke trenger å fylle ut. Dette kan skje hvis du går frem og tilbake i søknaden gjennom pilene i nettleseren (pilene helt øverst til venstre på siden). Du unngår dette problemet hvis du heller bruker knapper og lenker som ligger inne i selve søknaden for å gå frem eller tilbake.:',
        'page.invalidStepPage.tilbakeLenke': 'Gå tilbake til forrige side',

        'page.ikkeTilgang.sidetittel': 'Søknad om pleiepenger i livets sluttfase',
        'page.ikkeTilgang.tekst':
            'Du har ikke tilgang til denne siden. Hvis du er under 18 år, må en av foreldrene dine eller en foresatt skrive under på søknaden sammen med deg. Du må derfor fylle ut søknaden på papir og sende den i posten.',
        'page.ikkeTilgang.lastNed': 'Søknad om pleiepenger i livets sluttfase',

        'avbrytSøknadDialog.avbrytSøknadLabel': 'Ja, avbryt søknad',
        'avbrytSøknadDialog.fortsettSøknadLabel': 'Nei',
        'avbrytSøknadDialog.intro':
            'Det du har fylt ut i søknaden blir slettet, og du kommer tilbake til velkomstsiden.',
        'avbrytSøknadDialog.spørsmål': 'Ønsker du å slette søknaden?',
        'avbrytSøknadDialog.tittel': 'Avbryt og slett søknad',

        'fortsettSøknadSenereDialog.avbrytSøknadLabel': 'Ja, fortsett senere',
        'fortsettSøknadSenereDialog.fortsettSøknadLabel': 'Nei',
        'fortsettSøknadSenereDialog.intro':
            'Vi lagrer det du har fylt ut i 72 timer. Når du vil fortsette, starter du bare søknaden på nytt.',
        'fortsettSøknadSenereDialog.spørsmål': 'Vil du avslutte nå og fortsette senere?',
        'fortsettSøknadSenereDialog.tittel': 'Avslutt og fortsett senere',

        'steg.footer.avbryt': 'Avbryt og slett søknad',
        'steg.footer.fortsettSenere': 'Avslutt og fortsett senere',

        'step.nextButtonLabel': 'Fortsett',
        'step.nextButtonAriaLabel': 'Gå til neste steg',
        'step.sendButtonLabel': 'Send inn søknaden',
        'step.sendButtonAriaLabel': 'Send inn søknaden',

        'arbeidstidPeriodeForm.tidFasteDagerEllerProsent.label': 'Hvordan vil du oppgi hvor mye du jobbet i perioden?',
        'arbeidstidPeriodeForm.tidFasteDager.label': 'Fyll ut hvor mye du jobbet i uken i perioden:',
        'arbeidstidPeriodeForm.prosent.label': 'Hvor mange prosent av din normale arbeidstid jobbet du i perioden?',
        'arbeidstidPeriodeForm.validation.tidFasteDagerEllerProsent.noValue':
            'Du må velge hvordan du ønsker å oppgi hvor mye du jobbet.',
        'arbeidstidPeriodeForm.validation.prosent.numberHasNoValue':
            'Du må oppgi hvor mange prosent du jobbet i perioden.',
        'arbeidstidPeriodeForm.validation.prosent.numberHasInvalidFormat':
            'Antall prosent du jobbet kan kun bestå av tall.',
        'arbeidstidPeriodeForm.validation.prosent.numberIsTooSmall':
            'Antall prosent du jobbet kan ikke være mindre enn {min}.',
        'arbeidstidPeriodeForm.validation.prosent.numberIsTooLarge':
            'Antall prosent du jobbet kan ikke være mer enn {max}.',
        'arbeidstidPeriodeForm.validation.fasteDager.gruppe.ingenTidRegistrert':
            'Du må oppgi hvor mange timer du jobbet i uken.',

        'arbeidsforhold.turnus.info.tittel': 'Hvordan regner jeg ut et snitt av turnusen min?',
        'arbeidsforhold.turnus.info.tekst.1':
            'Du regner ut snittet ved å legge sammen antall timer du jobber totalt i hele turnusperioden din, og deler det med antall uker som turnusperioden din består av.',
        'arbeidsforhold.turnus.info.tekst.2':
            'Du har en turnus som går over 3 uker. Den første uka jobber du 20 timer, den andre 40 timer og den tredje uka jobber du 15 timer. Da legger du sammen antall timer du har jobbet og deler med antall uker i turnusperioden din.',
        'arbeidsforhold.turnus.info.tekst.3': 'Da blir regnestykket slik i dette eksempelet:',
        'arbeidsforhold.turnus.info.tekst.4': '20 timer + 40 timer + 15 timer = 75 timer',
        'arbeidsforhold.turnus.info.tekst.5':
            'Så deler du antall timer med antall uker i turnusperioden din: 75 / 3 = 25',
        'arbeidsforhold.turnus.info.tekst.6':
            'Du jobber altså i snitt 25 timer per uke, og det er dette tallet du oppgir.',
        'arbeidsforhold.turnus.info.tekst.eksempel': 'Eksempel:',
        'arbeidsforhold.varierende': 'Deltid/varierende/tilkalling',
        'arbeidsforhold.varierende.1': 'Deltid',
        'arbeidsforhold.varierende.2': 'varierende',
        'arbeidsforhold.varierende.3': 'tilkalling',
        'arbeidsforhold.varierende.info.tittel': 'Hvordan regner jeg ut et snitt i min situasjon?',
        'arbeidsforhold.varierende.info.tekst.1':
            'Du regner ut et snitt ved å legge sammen antall timer du totalt har jobbet de siste 12 ukene og deler det med 12. Hvis du ikke har jobbet i 12 uker, regner du ut snittet på samme måte ved å bruke de ukene du har jobbet.',

        'frilanser.harDuHattInntekt.spm': 'Er du frilanser i perioden du søker for?',
        'frilanser.harDuAndreFrilansoppdrag.spm':
            'Har du andre frilansoppdrag du har fravær fra i perioden du søker for?',
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

        'selvstendig.harDuHattInntekt.spm': 'Er du selvstendig næringsdrivende i perioden du søker for?',
        'selvstendig.harDuHattInntekt.hjelpetekst.tittel': 'Hva betyr det å være selvstendig næringsdrivende?',
        'selvstendig.harDuHattInntekt.hjelpetekst':
            'Du er selvstendig næringsdrivende når du enten har et enkeltpersonforetak (ENK), et ansvarlig selskap (ANS), eller et ansvarlig selskap med delt ansvar (DA).',
        'selvstendig.harDuHattInntekt.hjelpetekst.snSkatteetatenLenke':
            'I tillegg kan du lese på skatteetatens side om andre situasjoner hvor du kan regnes som selvstendig næringsdrivende.',
        'selvstendig.harFlereVirksomheter.spm': 'Har du flere enn én næringsvirksomhet som er aktiv?',
        'selvstendig.veileder.flereAktiveVirksomheter':
            'Når du har flere aktive næringsvirksomheter skal du kun legge inn den virksomheten som er eldst av dem. Har du for eksempel en virksomhet du startet i 2012 og en annen som du startet i 2020, skal du kun legge inn virksomheten du startet i 2012.',
        'selvstendig.list.tittel': 'Dine registrerte næringsvirksomheter',
        'selvstendig.list.leggTilLabel': 'Legg til næringsvirksomhet',
        'selvstendig.dialog.tittel': 'Næringsvirksomhet',

        'selvstendig.infoDialog.infoTittel': 'Næringsvirksomhet som du har lagt inn:',
        'selvstendig.infoDialog.registrerKnapp': 'Registrer virksomhet',
        'selvstendig.infoDialog.endreKnapp': 'Endre opplysninger',
        'selvstendig.infoDialog.fjernKnapp': 'Fjern virksomhet',
        'selvstendig.infoDialog.tittel.en': 'Opplysninger om virksomheten din',
        'selvstendig.infoDialog.tittel.flere': 'Opplysninger om den eldste virksomheten din',

        'sn.arbeidsforhold.spm':
            'Hvor mange timer jobber du normalt per uke som selvstendig næringsdrivende når du ikke har fravær?',
        'sn.arbeidsforhold.avsluttet.spm':
            'Hvor mange timer jobbet du normalt per uke som selvstendig næringsdrivende når du ikke hadde fravær?',
        'sn.arbeidsforhold.utledet': 'timer i uka',

        'snF.ArbeidsforholdDetaljer.hvaBetyr.spm': 'Hva betyr dette?',
        'snF.ArbeidsforholdDetaljer.hvaBetyr.frilanser.info':
            'Hvis du jobber som frilanser flere steder skal du her svare samlet for alle oppdragene. Hvis du f.eks. skal jobbe i en av to frilansforhold skal du her svare "Ja, men jeg skal jobbe mindre enn normalt".',
        'snF.ArbeidsforholdDetaljer.hvaBetyr.SN.info':
            'Hvis du jobber som selvstendig i flere virksomheter skal du her svare samlet for alle virksomhetene dine. Hvis du f.eks. skal jobbe i en av to virksomheter skal du her svare "Ja, men jeg skal jobbe mindre enn normalt".',

        'step.arbeidstid.pageTitle': 'Opplysninger om arbeidstid',
        'step.arbeidstid.stepTitle': 'Fravær fra jobb i dagene med pleie',
        'step.arbeidstid.stepIndicatorLabel': 'Fravær fra jobb i dagene med pleie',
        'step.arbeidstid.nextButtonLabel': 'Fortsett',

        'arbeidIPeriode.søkerKunHelgedager.alert.avsnitt.1':
            'Du kan kun få utbetalt pleiepenger for hverdager. Det utbetales ikke pleiepenger for lørdag eller søndag selv om du har hatt fravær fra jobb for å pleie personen.',
        'arbeidIPeriode.søkerKunHelgedager.alert.avsnitt.2':
            'Du kan derfor ikke registrere arbeid kun for lørdag og/eller søndag.',
        'arbeidIPeriode.søkerKunHelgedager.alert.avsnitt.3':
            'Vennligst gå tilbake til steg "Perioden med pleiepenger" og sjekk informasjonen du har fylt ut. Når du har gjort det, trykker du på "Fortsett"-knappen for å gå videre.',

        'arbeidIPeriode.StepInfo.1':
            'Nå trenger vi å vite hvor mye du skal vært borte fra jobb på grunn av at du skal pleie.',
        'arbeidIPeriode.StepInfo.2':
            'Hvis du for eksempel pleier den som er syk en halv dag og jobber resten av dagen, bruker du også bare en halv dag med pleiepenger. De dagene du jobber fullt bruker du ikke av pleiepengedagene.',
        'arbeidIPeriode.FrilansLabel': 'Frilans',
        'arbeidIPeriode.SNLabel': 'Selvstendig næringsdrivende',
        'arbeidIPeriode.jobberIPerioden.spm': 'I perioden du søker for, hvilken situasjon gjelder for deg {hvor}?',
        'arbeidIPeriode.enkeltdager_gruppe.legend':
            'Oppgi hvor mange timer du skal være bort fra jobb {hvor} for å pleie.',
        'arbeidIPeriode.ukedager.tittel': 'Fyll ut hvor mye du jobbet i uken {hvor} i perioden:',
        'arbeidIPeriode.jobberIPerioden.jobberIkke': 'Jeg jobber ikke',
        'arbeidIPeriode.jobberIPerioden.jobberVanlig': 'Jeg jobber som normalt, og har ikke fravær',
        'arbeidIPeriode.jobberIPerioden.jobberRedusert': 'Jeg kombinerer delvis jobb med pleiepenger',
        'arbeidIPeriode.iDag.utledet': 'timer i uka',
        'arbeidIPeriode.prosent.utledet.medTimer': 'prosent av {timerNormalt} ({timerRedusert} per dag)',

        'step.medlemskap.pageTitle': 'Medlemskap i folketrygden',
        'step.medlemskap.stepTitle': 'Medlemskap i folketrygden',
        'step.medlemskap.stepIndicatorLabel': 'Om medlemskap i folketrygden',
        'step.medlemskap.nextButtonLabel': 'Fortsett',

        'fieldvalidation.mottakersFnrErSøkersFnr': 'Du har tastet inn ditt eget fødselsnummer',

        'validation.harForståttRettigheterOgPlikter.notChecked':
            'Du må bekrefte at du har lest og forstått dine plikter.',

        'validation.pleierDuDenSykeHjemme.yesOrNoIsUnanswered':
            'Du må svare ja eller nei på om du pleier personen i et privat hjem i perioden du søker for.',

        'validation.flereSokere.noValue':
            'Du må svare ja, nei eller usikker på om dere er flere som skal dele på pleiepengene.',

        'validation.skalJobbeIPerioden.yesOrNoIsUnanswered':
            'Du må svare ja eller nei på om du skal jobbe på noen av dagene du skal pleie.',

        'validation.dagerMedPleie.ingenDagerValgt': 'Du må velge minst én dag med pleiepenger.',

        'validation.skalOppholdeSegIUtlandetIPerioden.yesOrNoIsUnanswered':
            'Du må svare ja eller nei på om du oppholder deg i utlandet i perioden du søker for',
        'validation.utenlandsoppholdIPerioden.utenlandsopphold_ikke_registrert':
            'Du har svart ja til at du oppholder deg i utlandet i perioden du søker for. Legg til minst ett utenlandsopphold.',
        'validation.utenlandsoppholdIPerioden.utenlandsopphold_overlapper':
            'Du har lagt inn utenlandsopphold med datoer som overlapper hverandre.',
        'validation.utenlandsoppholdIPerioden.utenlandsopphold_utenfor_periode':
            'Du har lagt inn utenlandsopphold som er utenfor søknadsperioden.',
        'validation.utenlandsoppholdIPerioden.utenlandsopphold_overlapper_samme_start_slutt':
            'Et utenlandsopphold kan ikke starte samme dag som et annet avsluttes.',

        'validation.arbeidsforhold.erAnsatt.yesOrNoIsUnanswered':
            'Du må svare ja eller nei på om du er ansatt hos {navn} i perioden du søker pleiepenger.',

        'validation.frilans.harHattInntektSomFrilanser.yesOrNoIsUnanswered':
            'Du må svare ja eller nei på om du er frilanser i perioden du søker for.',
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
            'Oppgi når du sluttet som frilanser. Skriv inn eller velg dato fra kalenderen.',
        'validation.frilans.sluttdato.dateHasInvalidFormat':
            'Du må oppgi datoen for når du sluttet som frilanser i et gyldig format. Gyldig format er dd.mm.åååå.',
        'validation.frilans.sluttdato.dateIsAfterMax':
            'Datoen for når du sluttet som frilanser kan ikke være etter dagens dato.',
        'validation.frilans.sluttdato.dateIsBeforeMin':
            'Datoen for når du sluttet som frilanser kan ikke være før datoen du startet.',
        'validation.frilans.jobberFortsattSomFrilans.yesOrNoIsUnanswered':
            'Du må svare ja eller nei på om du fortsatt jobber som frilanser.',

        'validation.selvstendig.harHattInntektSomSN.yesOrNoIsUnanswered':
            'Du må svare ja eller nei på om du er selvstendig næringsdrivende i perioden du søker for.',
        'validation.selvstendig.harFlereVirksomheter.yesOrNoIsUnanswered':
            'Du må svare ja eller nei på om du har flere enn én virksomhet som er aktiv.',
        'validation.selvstendig.virksomhet.noValue':
            'Du må oppgi informasjon om virksomheten din som selvstendig næringsdrivende.',
        'validation.selvstendig.virksomhet.startetEtterSøknadsperiode':
            'Du har oppgitt at du startet som selvstendig næringsdrivende etter perioden du søker for. Hvis dette stemmer,  svarer du "Nei" på spørsmålet om du var selvstendig næringsdrivende i perioden du søker for.',
        'validation.selvstendig.virksomhet.sluttetFørSøknadsperiode':
            'Du har oppgitt at du sluttet som selvstendig næringsdrivende før perioden du søker for. Hvis dette stemmer,  svarer du "Nei" på spørsmålet om du var selvstendig næringsdrivende i perioden du søker for.',

        'validation.harVærtEllerErVernepliktig.yesOrNoIsUnanswered':
            'Du må svare ja eller nei på om du utøvde verneplikt på tidspunktet du søker pleiepenger fra.',
        'virksomhetForm.næringstype.noValue': 'Du må velge hvilken type virksomhet du har.',

        'validation.opptjeningUtland.listIsEmpty': 'Du må legge til jobb i et annet EØS-land.',
        'validation.harOpptjeningUtland.yesOrNoIsUnanswered':
            'Du må svare ja eller nei på om du har jobbet som arbeidstaker eller frilanser i et annet EØS-land i løpet av de 3 siste månedene før første dag med pleiepenger.',

        'validation.harUtenlandskNæring.yesOrNoIsUnanswered':
            'Du må svare ja eller nei på om du har jobbet som selvstendig næringsdrivende i et annet EØS-land i løpet av de 3 siste årene før perioden du søker om.',
        'validation.utenlandskNæring.listIsEmpty':
            'Du må legge til jobb som selvstendig næringsdrivende i et annet EØS-land.',

        'validation.arbeidsforhold.sluttetFørSøknadsperiode.yesOrNoIsUnanswered':
            'Du må svare på om du sluttet hos {navn} før {fraDato}.',
        'validation.arbeidsforhold.jobberNormaltTimer.numberHasNoValue':
            'Du må oppgi hvor mange timer per uke du {jobber} {hvor} i perioden.',
        'validation.arbeidsforhold.jobberNormaltTimer.numberHasInvalidFormat':
            'Antall timer du {jobber} per uke {hvor} kan kun bestå av tall.',

        'validation.arbeidsforhold.jobberNormaltTimer.numberIsTooSmall':
            'Antall timer du {jobber} per uke {hvor} kan ikke være mindre enn {min}.',
        'validation.arbeidsforhold.jobberNormaltTimer.numberIsTooLarge':
            'Antall timer du {jobber} per uke {hvor} kan ikke være mer enn {max}.',

        'validation.arbeidIPeriode.fast.prosent.måSvareNeiPåJobbIPerioden':
            'Hvis du ikke skal jobbe {hvor}, må du svare Nei på spørsmålet ovenfor om jobb i perioden.',
        'validation.arbeidIPeriode.fast.prosent.numberHasNoValue':
            'Du må oppgi hvor mange prosent av din normale arbeidstid du jobber {hvor}.',
        'validation.arbeidIPeriode.fast.prosent.numberHasInvalidFormat':
            'Antall prosent du jobber {hvor} kan kun bestå av tall.',
        'validation.arbeidIPeriode.fast.prosent.numberIsTooSmall':
            'Antall prosent du jobber {hvor} kan ikke være mindre enn {min}.',
        'validation.arbeidIPeriode.fast.prosent.numberIsTooLarge':
            'Antall prosent du jobber {hvor} kan ikke være mer enn {max}.',
        'validation.arbeidIPeriode.fast.prosent.ingenTidRegistrert':
            'Du må oppgi hvor mange timer du jobber i uken {hvor} i perioden.',
        'validation.arbeidIPeriode.fast.tid.timeHasNoValue': 'Du må fylle ut timer og minutter for {dag} {hvor}.',
        'validation.arbeidIPeriode.fast.tid.hoursAreInvalid': 'Antall timer {dag} {hvor} er ikke et gyldig tall.',
        'validation.arbeidIPeriode.fast.tid.minutesAreInvalid':
            'Antall minutter på {dag} {hvor} er ikke et gyldig tall.',
        'validation.arbeidIPeriode.fast.tid.tooManyHours': 'Antall timer {dag}  {hvor} kan ikke overstige 24 timer.',
        'validation.arbeidIPeriode.fast.tid.tooManyMinutes':
            'Antall minutter på {dag}  {hvor} kan ikke overstige 59 minutter.',
        'validation.arbeidIPeriode.fast.tid.durationIsTooLong':
            'Antall timer og minutter registrert {dag} {hvor} er for høyt. Tiden kan ikke overstige 24 timer hver ukedag.',
        'validation.arbeidIPeriode.fast.tid.durationIsTooShort':
            'Antall timer og minutter {dag} {hvor} kan ikke være mindre enn 0 timer og 0 minutter.',
        'validation.arbeidIPeriode.fast.tid.hoursAreNegative':
            'Antall timer og minutter {dag} {hvor} kan ikke være mindre enn 0 timer og 0 minutter.',
        'validation.arbeidIPeriode.fast.tid.minutesAreNegative':
            'Antall timer og minutter {dag} {hvor} kan ikke være mindre enn 0 timer og 0 minutter.',
        'validation.arbeidIPeriode.timer.ingenTidRegistrert':
            'Du må fylle ut hvor mye du jobber i uken {hvor} i perioden.',
        'validation.arbeidIPeriode.timer.forMangeTimer':
            'Du har oppgitt for mange timer du jobber i uken {hvor} i perioden.',
        'validation.arbeidIPeriode.jobber':
            'Du må svare på om hvilken situasjon gjelder for deg {hvor} i perioden du søker for.',
        'validation.arbeidIPeriode.timerEllerProsent.noValue':
            'Du må svare på hvordan du ønsker å oppgi hvor mye du jobber {hvor} i perioden.',
        'validation.arbeidIPeriode_prosentUgyldig':
            'Prosenten du kan oppgi er fra 1 til 100 prosent for hvor mye du jobber {hvor} i perioden.',
        'validation.arbeidIPeriode.fasteDager.ingenTidRegistrert':
            'Du må fylle ut hvor mye du jobber i uken {hvor} i perioden.',
        'validation.arbeidIPeriode.fasteDager.forMangeTimer':
            'Du har oppgitt for mange timer du jobber i uken {hvor} i perioden.',
        'validation.arbeidIPeriode.enkeltdager.ingenTidRegistrert': 'Du må oppgi hvor mye du jobber {hvor} i perioden.',
        'validation.arbeidIPeriode.ingenTidRegistrert':
            'Du har ikke oppgitt noe tid med jobb {hvor} på dagene du har søkt om. Hvis dette stemmer, skal du velge "Jeg jobber ikke " på spørsmålet ovenfor.',

        'validation.harBoddUtenforNorgeSiste12Mnd.yesOrNoIsUnanswered':
            'Du må svare ja eller nei på om du har bodd i utlandet i hele eller deler av de siste 12 månedene.',
        'validation.utenlandsoppholdSiste12Mnd.utenlandsopphold_ikke_registrert':
            'Du har oppgitt at du har vært i utlandet de siste 12 månedene. Du må registrere dette utenlandsoppholdet.',
        'validation.utenlandsoppholdSiste12Mnd.utenlandsopphold_overlapper':
            'Ett eller flere av utenlandsoppholdene du har lagt inn for de siste 12 månedene, har datoer som overlapper hverandre.',
        'validation.skalBoUtenforNorgeNeste12Mnd.yesOrNoIsUnanswered':
            'Du må svare ja eller nei på om du planlegger å bo i utlandet i hele eller deler av de neste 12 månedene.',
        'validation.utenlandsoppholdNeste12Mnd.utenlandsopphold_ikke_registrert':
            'Du har oppgitt at du skal oppholde deg i utlandet de neste 12 månedene. Du må registrere dette utenlandsoppholdet.',
        'validation.utenlandsoppholdNeste12Mnd.utenlandsopphold_overlapper':
            'Ett eller flere av utenlandsoppholdene du har lagt inn for de neste 12 månedene, har datoer som overlapper hverandre.',

        'validation.harBekreftetOpplysninger.notChecked': 'Du må bekrefte at opplysningene du har gitt er riktige.',

        'page.unavailable.1':
            'Den digitale pleiepengesøknaden er dessverre ikke tilgjengelig akkurat nå. Vi jobber med saken, slik at du kan søke digitalt. Frem til vi får fikset dette, kan du fylle ut vårt',
        'page.unavailable.2': 'papirskjema for pleiepenger i livets sluttfase',
        'page.unavailable.3': 'Vi beklager.',

        'arbeidssituasjonFrilanser.frilanserPart.tittel': 'Om deg som frilanser',
        'frilansoppdragListe.oppdrag': 'Periode: {tidsrom}',
        'frilansoppdragListe.tidsrom.avsluttet': 'fra {fra} til {til}',
        'frilansoppdragListe.tidsrom.pågående': 'fra {fra} - pågående',
        'frilansoppdragInfo.tittel': 'Registrerte frilansoppdrag i perioden:',
        'frilansoppdragInfo.tekst':
            'Dette er frilansoppdrag registrert i AA-registeret i perioden du søker om pleiepenger. Hvis informasjonen ikke stemmer, må du ta kontakt med oppdragsgiver og be de oppdatere informasjonen i AA-registeret.',
    },
};

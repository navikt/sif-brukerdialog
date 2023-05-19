import { MessageFileFormat } from '@navikt/sif-common-core-ds/lib/types/MessageFileFormat';

export const appMessages: MessageFileFormat = {
    nb: {
        Ja: 'Ja',
        Nei: 'Nei',
        VetIkke: 'Jeg er usikker',

        'locale.nb': 'Bokmål - norsk',
        'locale.nn': 'Nynorsk - norsk',

        mandag: 'mandag',
        tirsdag: 'tirsdag',
        onsdag: 'onsdag',
        torsdag: 'torsdag',
        fredag: 'fredag',

        'mandag.caps': 'Mandag',
        'tirsdag.caps': 'Tirsdag',
        'onsdag.caps': 'Onsdag',
        'torsdag.caps': 'Torsdag',
        'fredag.caps': 'Fredag',

        Mandag: 'Mandag',
        Tirsdag: 'Tirsdag',
        Onsdag: 'Onsdag',
        Torsdag: 'Torsdag',
        Fredag: 'Fredag',

        'banner.title': 'Søknad om utbetaling av omsorgspenger til selvstendig næringsdrivende eller frilansere',
        'application.title': 'Søknad om utbetaling av omsorgspenger til selvstendig næringsdrivende eller frilansere',

        'page.loadingPage.tekst': 'Laster ...',
        'page.form.ubesvarteSpørsmålInfo': 'For å komme videre, må du svare på alle spørsmålene ovenfor',

        'gotoApplicationLink.lenketekst': 'Gå til den digitale søknaden',
        'backlink.label': 'Tilbake',

        'hjelpetekst.skjul': 'Lukk hjelpetekst',
        'hjelpetekst.vis': 'Vis hjelpetekst',

        timer: '{timer, plural, one {# time} other {# timer}}',
        minutter: '{minutter, plural, one {# minutt} other {# minutter}}',
        timerOgMinutter:
            '{timer, plural, one {# time} other {# timer}} og {minutter, plural, one {# minutt} other {# minutter}}',
        dager: '{dager, plural, one {# dag} other {# dager}}',

        'timeInput.hours': 'Timer',
        'timeInput.minutes': 'Minutter',

        'fileUploadErrors.part1': 'Det har dessverre skjedd en feil under opplasting av følgende vedlegg:',
        'formikValidationErrorSummary.tittel': 'Du må rette opp i følgende feil:',

        'welcomingPage.sidetittel': 'Søknad om utbetaling av omsorgspenger',
        'welcomingPage.begynnsøknad': 'Gå til søknaden',

        'page.generalErrorPage.sidetittel': 'Feil',
        'page.generalErrorPage.tittel': 'Noe gikk galt...',
        'page.generalErrorPage.tekst': 'Beklager, her har det dessverre skjedd en feil.',
        'page.error.pageTitle': 'Noe gikk galt ...',

        'page.ikkeTilgang.sidetittel':
            'Søknad om utbetaling av omsorgspenger til selvstendig næringsdrivende eller frilansere',
        'page.ikkeTilgang.tekst':
            'Du har ikke tilgang til denne siden. Dersom du er under 18 år, må en av foreldrene dine eller en foresatt skrive under på søknaden sammen med deg. Du må derfor fylle ut søknaden på papir og sende den i posten.',

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

        'step.dine-barn.pageTitle': 'Om barn',
        'step.dine-barn.stepTitle': 'Om barn',
        'step.dine-barn.stepIndicatorLabel': 'Om barn',
        'step.dine-barn.nextButtonLabel': 'Fortsett',
        'step.dine-barn.counsellorPanel.avsnitt.1':
            'Når du er selvstendig næringsdrivende eller frilanser, må du som hovedregel selv dekke de 10 første omsorgsdagene du bruker hvert kalenderår. Du kan altså ha rett til utbetaling av omsorgspenger fra den 11. dagen per kalenderår. De 10 første dagene som du skal dekke selv, trenger ikke å tas ut sammenhengende.',
        'step.dine-barn.counsellorPanel.avsnitt.2':
            'Du kan ha rett til utbetaling fra den første dagen når du kun har barn som fyller 13 år i år eller er eldre, og som har kronisk sykdom eller funksjonshemning. Dette gjelder bare når du har søkt og fått ekstra omsorgsdager for barn i denne situasjonen.',

        'step.dine-barn.seksjonsTittel': 'Dine barn',
        'step.dine-barn.født': 'Født',

        'step.dine-barn.annetBarnListAndDialog.addLabel': 'Legg til barn',
        'step.dine-barn.annetBarnListAndDialog.listTitle': 'Barn du har lagt til',
        'step.dine-barn.annetBarnListAndDialog.modalTitle': 'Legg til barn',

        'step.dine-barn.harFåttEkstraOmsorgsdager.label': 'Ekstra omsorgsdager',
        'step.dine-barn.harFåttEkstraOmsorgsdager.spm':
            'Har du fått ekstra omsorgsdager for barn som har kronisk sykdom eller funksjonshemning?',
        'step.dine-barn.harFåttEkstraOmsorgsdager.spm.ettBarn':
            'Har du fått ekstra omsorgsdager for barnet på grunn av kronisk sykdom eller funksjonshemning?',

        'step.dine-barn.harFåttEkstraOmsorgsdager.nei.alertStripe':
            'Du har ikke rett til å bruke omsorgsdager. Når du kun har barn som er 13 år i år eller eldre, må du ha søkt om og fått ekstra omsorgsdager for å kunne bruke omsorgsdager.',
        'step.dine-barn.utvidetRettFor.spm': 'Kryss av for barn du har fått ekstra omsorgsdager for:',
        'step.dine-barn.utvidetRettFor.info':
            'Du kan ha rett til utbetaling fra NAV fra den første omsorgsdagen du brukte. Dette er fordi du kun har barn som er 13 år i år eller eldre, og som du har fått ekstra omsorgsdager for. Gå videre til neste steg og legg inn dagene du vil søke utbetaling for.',
        'step.dine-barn.utvidetRettFor.info.ettBarn':
            'Du kan ha rett til utbetaling fra NAV fra den første omsorgsdagen du brukte. Dette er fordi du kun har barn som er 13 år i år eller eldre, og som du har fått ekstra omsorgsdager for. Gå videre til neste steg og legg inn dagene du vil søke utbetaling for.',

        'step.dine-barn.bekrefterDektTiDagerSelv.info.titel': 'Omsorgsdager du må dekke selv',
        'step.dine-barn.bekrefterDektTiDagerSelv.info':
            'Når du har barn som har fylt 12 år i år, eller er yngre, må du dekke de 10 første omsorgsdagene du bruker hvert kalenderår. Du kan søke om utbetaling fra NAV fra den 11. dagen.',
        'step.dine-barn.bekrefterDektTiDagerSelv.label':
            'For å gå videre må du bekrefte at du har dekket 10 omsorgsdager i år:',
        'step.dine-barn.bekrefterDektTiDagerSelv': 'Ja, jeg bekrefter at jeg har dekket 10 omsorgsdager i år.',

        'step.dine-barn.info.ingenbarn.1':
            'Vi fant ingen barn registrert på deg. Har du  barn som ikke er registrert her, kan du selv legge inn disse. Dette kan være fosterbarn, eller om du har barn som er fylt 18 år og som har ekstra omsorgsdager på grunn av kronisk sykdom eller funksjonshemning.',
        'step.dine-barn.info.ingenbarn.2': 'Du må registrere minst ett barn for å kunne gå videre i søknaden.',
        'step.dine-barn.info.spm.andreBarn': 'Har du barn som ikke er registrert her?',
        'step.dine-barn.info.spm.flereBarn': 'Har du flere barn som ikke er registrert her?',
        'step.dine-barn.info.spm.text':
            'Hvis du har barn som ikke er registrert her, kan du legge inn disse selv. Det kan for eksempel være fosterbarn.',
        'step.dine-barn.formLeggTilBarn.aldersGrenseInfo': '(Du kan ikke legge til barn som er 19 år eller eldre)',

        'relasjonTilBarnet.mor': 'Mor',
        'relasjonTilBarnet.far': 'Far',
        'relasjonTilBarnet.adoptivforelder': 'Adoptivforelder',
        'relasjonTilBarnet.fosterforelder': 'Fosterforelder',

        'step.fravaer.pageTitle': 'Dager du søker om utbetaling for - Søknad om utbetaling av omsorgspenger',
        'step.fravaer.stepTitle': 'Dager du søker om utbetaling for',
        'step.fravaer.stepIndicatorLabel': 'Dager du søker om utbetaling for',
        'step.fravaer.nextButtonLabel': 'Fortsett',
        'step.fravaer.counsellorpanel.content':
            'I de fleste tilfeller må man som selvstendig næringsdrivende og frilanser betale de 10 første dager med omsorgspenger i året selv.',
        'step.fravaer.dager_med_fullt_fravært.label': 'Dager med fullt fravær',
        'step.fravaer.dager_med_fullt_fravært.info': 'TODO',
        'step.fravaer.dager_med_delvis_fravært.label': 'Dager med delvis fravær',
        'step.fravaer.dager_med_delvis_fravært.info': 'TODO',
        'step.fravaer.har_du_oppholdt_deg_i_utlandet_for_dager_du_soker_ok.spm':
            'Har du vært i utlandet noen av dagene du søker omsorgspenger for?',

        'step.fravaer.info.1':
            'Du kan få utbetalt omsorgspenger for bruk av omsorgsdager i opptil tre måneder tilbake i tid, regnet fra måneden før NAV mottok søknad fra deg.',
        'step.fravaer.info.2':
            'Du kan kun søke om utbetaling fra ett og samme år. Det betyr at hvis du skal søke om utbetaling for {forrigeÅr} i tillegg til {inneværendeÅr}, må du sende to søknader.',

        'step.fravaer.spm.harPerioderMedFravær': 'Har du hatt hele dager med fravær fra jobb?',
        'step.fravaer.dager.tittel': 'Omsorgsdager du søker utbetaling for',
        'step.fravaer.dager.info':
            'Her skal du legge inn dagene du søker utbetaling for. Basert på svarene du har gitt i søknaden, kan du søke utbetaling fra den 11. omsorgsdagen du brukte.',
        'step.fravaer.dager.info.harBarnMedUtvidetRett':
            'Her skal du legge inn dagene du søker utbetaling for. Basert på svarene du har gitt i søknaden, kan du søke utbetaling fra den første omsorgsdagen du brukte.',
        'step.fravaer.harPerioderMedFravær.listTitle': 'Dager med fullt fravær fra jobb',
        'step.fravaer.harPerioderMedFravær.addLabel': 'Legg til dager med fullt fravær fra jobb',
        'step.fravaer.harPerioderMedFravær.modalTitle': 'Dager med fullt fravær fra jobb',
        'fravær.form.periode.tittel': 'Dager du søker utbetaling for',
        'step.fravaer.info.ikkeHelg.tittel': 'Hvorfor kan jeg ikke velge lørdag eller søndag?',
        'step.fravaer.info.ikkeHelg.tekst':
            'Du kan kun få utbetalt omsorgspenger for hverdager, selv om du jobber lørdag eller søndag. Derfor kan du ikke velge lørdag eller søndag som start- eller sluttdato i perioden du legger inn.',
        'step.fravaer.spm.harDagerMedDelvisFravær': 'Har du hatt dager med delvis fravær fra jobb?',
        'step.fravaer.spm.hjemmePgaStengtBhgSkole.2021':
            'Har du vært hjemme fra jobb fordi barnehagen eller skolen har vært stengt på grunn av koronaviruset?',
        'step.fravaer.harDagerMedDelvisFravær.listTitle': 'Dager med delvis fravær fra jobb',
        'step.fravaer.harDagerMedDelvisFravær.addLabel': 'Legg til dag med delvis fravær fra jobb',
        'step.fravaer.harDagerMedDelvisFravær.modalTitle': 'Dag med delvis fravær fra jobb',
        'step.fravaer.måVelgeSituasjon': 'Du må velge én av situasjonene over.',
        'step.fravaer.utenlandsopphold.tittel': 'Utenlandsopphold i dagene med fravær',
        'step.fravaer.utenlandsopphold.addLabel': 'Legg til utenlandsopphold',
        'step.fravaer.utenlandsopphold.modalTitle': 'Utenlandsopphold siste 12 måneder',

        'fravær.antallTimer': 'Antall timer',
        'fravær.time': 'time',
        'fravær.timer': 'timer',
        'fravær.timer.label': 'Timer',
        'fravær.delvis.fjern.fjernDag': 'Fjern dag med delvis fravær ({dato}, {timer})',
        'fravær.delvis.fjern.fjernDagUtenTimer': 'Fjern dag med delvis fravær ({dato}, antall timer ikke valgt)',
        'fravær.delvis.fjern.fjernTimer': 'Fjern dag med delvis fravær (dato ikke valgt, {timer} valgt)',
        'fravær.delvis.fjern.fjernUtenDagOgTimer': 'Fjern dag med delvis fravær (dato og antall timer ikke valgt)',
        'list.fjernKnapp': 'Fjern',

        'step.vedlegg_stengtSkoleBhg.stepTitle': 'Last opp bekreftelse fra barnehagen eller skolen',
        'step.vedlegg_stengtSkoleBhg.pageTitle': 'Last opp dokumenter',
        'step.vedlegg_stengtSkoleBhg.nextButtonLabel': 'Fortsett',
        'step.vedlegg_stengtSkoleBhg.stepIndicatorLabel': 'Last opp dokumenter',
        'steg.vedlegg_stengtSkoleBhg.vedlegg': 'Last opp bekreftelse fra barnehagen eller skolen',
        'steg.vedlegg_stengtSkoleBhg.info.1':
            'Her skal du laste opp bekreftelse fra barnehagen eller skolen på at de har vært stengt på grunn av koronaviruset. Det gjør du enten ved å ta bilde av bekreftelsen, eller ved å skanne den.',
        'steg.vedlegg_stengtSkoleBhg.info.2':
            'Vi kan ikke behandle søknaden din før vi mottar bekreftelsen. Hvis du ikke har bekreftelsen tilgjengelig nå, anbefaler vi at du venter med å søke til du har den tilgjengelig. Hvis du ikke kan vente med å sende søknaden, kan du fortsette uten bekreftelsen, men da må du ettersende den så snart som mulig.',
        'steg.vedlegg_stengtSkoleBhg.info.3': 'Her får du veiledning til hvordan du ettersender dokumentasjon',
        'steg.vedlegg_stengtSkoleBhg.info.4': '.',

        'step.vedlegg_smittevernhensyn.stepTitle': 'Last opp bekreftelse fra lege',
        'step.vedlegg_smittevernhensyn.pageTitle': 'Last opp dokumenter',
        'step.vedlegg_smittevernhensyn.stepIndicatorLabel': 'Last opp dokumenter',
        'step.vedlegg_smittevernhensyn.nextButtonLabel': 'Fortsett',
        'steg.vedlegg_smittevernhensyn.vedlegg': 'Last opp bekreftelse fra lege',
        'steg.vedlegg_smittevernhensyn.info.1':
            'Her skal du laste opp bekreftelse fra lege på at det er særlige smittevernhensyn som gjør at barnet ikke kan gå i barnehage eller skole. Det gjør du enten ved å ta bilde av bekreftelsen, eller ved å skanne den.',
        'steg.vedlegg_smittevernhensyn.info.2':
            'Vi kan ikke behandle søknaden din før vi mottar bekreftelsen. Hvis du ikke har bekreftelsen tilgjengelig nå, anbefaler vi at du venter med å søke til du har den tilgjengelig. Hvis du ikke kan vente med å sende søknaden, kan du fortsette uten bekreftelsen, men da må du ettersende den så snart som mulig.',
        'steg.vedlegg_smittevernhensyn.info.3': 'Her får du veiledning til hvordan du ettersender dokumentasjon',
        'steg.vedlegg_smittevernhensyn.info.4': '.',

        'step.vedlegg_legeerklæring.pageTitle': 'Legeerklæring',
        'step.vedlegg_legeerklæring.stepTitle': 'Last opp legeerklæring',
        'step.vedlegg_legeerklæring.stepIndicatorLabel': 'Last opp din legeerklæring',
        'step.vedlegg_legeerklæring.counsellorpanel.1':
            'Hvis du søker om utbetaling for mer enn 3 sammenhengende dager, må du laste opp en legeerklæring som gjelder fra og med den 4. dagen.',
        'step.vedlegg_legeerklæring.counsellorpanel.2':
            'Hvis du søker for kortere periode eller for enkeltdager trenger du ikke legeerklæring. Du kan da fortsette søknaden uten å laste opp noe.',
        'step.vedlegg_legeerklæring.counsellorpanel.3':
            'Hvis du søker for mer enn 3 sammenhengende dager, men ikke har legeerklæring tilgjengelig nå,',
        'step.vedlegg_legeerklæring.counsellorpanel.3.lenkeEttersending': 'kan du ettersende den her.',

        'step.vedlegg_legeerklæring.uploadBtn': 'Last opp legeerklæring',
        'step.vedlegg_legeerklæring.nextButtonLabel': 'Fortsett',

        'vedleggsliste.fjernKnapp': 'Fjern vedlegg',
        'vedleggsliste.ingenLegeerklæringLastetOpp': 'Ingen vedlegg er lastet opp',
        'vedleggsliste.ingenSamværsavtaleLastetOpp': 'Ingen vedlegg er lastet opp',

        'dokumenter.advarsel.totalstørrelse.1':
            'Du har totalt lastet opp mer enn grensen på 24 Mb. Det betyr at du må fjerne noe av det du har lastet opp. Hvis det betyr at du ikke får plass til alt du ønsker å sende nå, kan du ',
        'dokumenter.advarsel.totalstørrelse.2': 'ettersende flere dokumenter.',

        'step.arbeidssituasjon.pageTitle': 'Arbeidssituasjon - Søknad om utbetaling av omsorgspenger',
        'step.arbeidssituasjon.stepTitle': 'Arbeidssituasjon',
        'step.arbeidssituasjon.stepIndicatorLabel': 'Arbeidssituasjon',
        'step.arbeidssituasjon.nextButtonLabel': 'Fortsett',
        'step.arbeidssituasjon.info.1':
            'Nå trenger vi å vite hva som var arbeidssituasjonen din i dagene du søker utbetaling for.',
        'step.arbeidssituasjon.advarsel.ingenSituasjonValgt': 'Du må velge minst én av situasjonene over.',

        'step.arbeidssituasjon.frilanser.hjelpetekst.tittel': 'Hva betyr det å være frilanser?',
        'step.arbeidssituasjon.frilanser.hjelpetekst':
            'Du er frilanser når du mottar lønn for enkeltstående oppdrag uten å være fast eller midlertidig ansatt hos den du utfører oppdraget for. Hvis du er usikker på om du er frilanser må du sjekke om oppdragene dine er registrert som frilansoppdrag på',
        'step.arbeidssituasjon.frilanser.hjelpetekst.skatteetatenLenke': 'skatteetaten sine nettsider.',

        'step.arbeidssituasjon.selvstendig.hjelpetekst.tittel': 'Hva betyr det å være selvstendig næringsdrivende?',
        'step.arbeidssituasjon.selvstendig.hjelpetekst':
            'Du er selvstendig næringsdrivende når du enten har et enkeltpersonforetak (ENK), et ansvarlig selskap (ANS), eller et ansvarlig selskap med delt ansvar (DA).',
        'step.arbeidssituasjon.selvstendig.hjelpetekst.snSkatteetatenLenke':
            'I tillegg kan du lese på skatteetatens side om andre situasjoner hvor du kan regnes som selvstendig næringsdrivende.',

        'frilanser.erFrilanser.spm': 'Var du frilanser i dagene du søker utbetaling for?',
        'frilanser.nårStartet.spm': 'Når startet du som frilanser?',
        'frilanser.jobberFortsatt.spm': 'Jobber du fortsatt som frilanser?',
        'frilanser.nårSluttet.spm': 'Når sluttet du som frilanser?',

        'selvstendig.erDuSelvstendigNæringsdrivende.spm':
            'Var du selvstendig næringsdrivende i dagene du søker utbetaling for?',
        'selvstendig.harFlereVirksomheter.spm': 'Har du flere enn én næringsvirksomhet som er aktiv?',
        'selvstendig.veileder.flereAktiveVirksomheter':
            'Når du har flere aktive næringsvirksomheter skal du kun legge inn den virksomheten som er eldst av dem. Har du for eksempel en virksomhet du startet i 2012 og en annen som du startet i 2020, skal du kun legge inn virksomheten du startet i 2012.',
        'selvstendig.infoDialog.infoTittel': 'Næringsvirksomhet som du har lagt inn:',
        'selvstendig.infoDialog.registrerKnapp': 'Registrer virksomhet',
        'selvstendig.infoDialog.endreKnapp': 'Endre opplysninger',
        'selvstendig.infoDialog.fjernKnapp': 'Fjern virksomhet',
        'selvstendig.infoDialog.tittel.en': 'Opplysninger om virksomheten din',
        'selvstendig.infoDialog.tittel.flere': 'Opplysninger om den eldste virksomheten din',

        'næringstype.FISKE': 'Fiske',
        'næringstype.JORDBRUK_SKOGBRUK': 'Jordbruk',
        'næringstype.DAGMAMMA': 'Dagmamma i eget hjem',
        'næringstype.ANNEN': 'Annen virksomhet',

        'fiskerinfo.LOTT': 'Lott',
        'fiskerinfo.HYRE': 'Hyre',
        'fiskerinfo.BLAD_A': 'Blad A',
        'fiskerinfo.BLAD_B': 'Blad B',

        'step.fravaerFra.pageTitle': 'Fravær fra arbeid som selvstendig næringsdrivende og/eller frilanser',
        'step.fravaerFra.stepTitle': 'Fravær fra arbeid som selvstendig næringsdrivende og/eller frilanser',
        'step.fravaerFra.stepIndicatorLabel': 'Fravær fra arbeid som selvstendig næringsdrivende og/eller frilanser',
        'step.fravaerFra.nextButtonLabel': 'Fortsett',
        'step.fravaerFra.info':
            'Du har opplyst at du er både selvstendig næringsdrivende og frilanser. Nå trenger vi å vite hvilket arbeid du hadde fravær fra i dagene du brukte omsorgsdager.',
        'step.fravaerFra.dag.spm': 'Hvilket arbeid hadde du fravær fra {dato}?',

        'step.medlemskap.pageTitle': 'Medlemskap i folketrygden - Søknad om utbetaling av omsorgspenger',
        'step.medlemskap.stepTitle': 'Medlemskap i folketrygden',
        'step.medlemskap.stepIndicatorLabel': 'Om medlemskap i folketrygden',
        'step.medlemskap.nextButtonLabel': 'Fortsett',
        'steg.medlemsskap.annetLandSiste12.spm': 'Har du bodd i utlandet i hele eller deler av de siste 12 månedene?',
        'steg.medlemsskap.annetLandNeste12.spm':
            'Planlegger du å bo i utlandet i hele eller deler av de neste 12 månedene?',
        'steg.medlemsskap.annetLandSiste12.hjelp':
            'Du svarer ja bare hvis du har oppholdt deg fast i et annet land enn Norge. Korte utlandsturer i forbindelse med for eksempel ferie regnes ikke med.',
        'steg.medlemsskap.annetLandSiste12.listeTittel': 'Utenlandsopphold siste 12 måneder',
        'steg.medlemsskap.annetLandNeste12.hjelp':
            'Du svarer ja bare hvis du planlegger å oppholde deg fast i et annet land enn Norge. Korte utlandsturer i forbindelse med for eksempel ferie regnes ikke med.',
        'steg.medlemsskap.annetLandNeste12.listeTittel': 'Utenlandsopphold neste 12 måneder',
        'steg.medlemsskap.annetLandSisteOgNeste12.listeTittel': 'Utenlandsopphold siste 12 måneder og neste 12 måneder',
        'steg.medlemsskap.info.1':
            'Medlemskap i folketrygden er nøkkelen til rettigheter fra NAV. Hvis du bor eller jobber i Norge er du vanligvis medlem. Du kan lese mer om medlemskap på ',
        'steg.medlemsskap.info.2': 'nav.no',
        'steg.medlemsskap.hvaBetyrDette': 'Hva betyr dette?',
        'steg.medlemsskap.utenlandsopphold.leggTilLabel': 'Legg til nytt utenlandsopphold',

        'step.oppsummering.pageTitle': 'Oppsummering - Søknad om utbetaling av omsorgspenger',
        'step.oppsummering.stepTitle': 'Oppsummering',
        'step.oppsummering.stepIndicatorLabel': 'Oppsummering',
        'step.oppsummering.nextButtonLabel': 'Send søknad',

        'steg.oppsummering.info':
            'Les gjennom oppsummeringen før du sender inn søknaden. Hvis du vil gjøre endringer, kan du gå tilbake.',
        'steg.oppsummering.søker.omDeg': 'Om deg',
        'steg.oppsummering.søker.fnr': 'Fødselsnummer: {fødselsnummer}',

        'steg.oppsummering.dineBarn': 'Dine Barn',
        'steg.oppsummering.dineBarn.bekrefterDektTiDagerSelv': 'Har du dekket de 10 første omsorgsdagene selv?',
        'step.oppsummering.dineBarn.listItem': ' (fnr. {identitetsnummer})',
        'step.oppsummering.dineBarn.listItem.utvidetRett': 'Ekstra omsorgsdager.',
        'step.oppsummering.dineBarn.listItem.årsak.FOSTERBARN': '(Barnet er mitt fosterbarn).',

        'steg.oppsummering.arbeidssituasjon.header': 'Din arbeidssituasjon',
        'steg.oppsummering.utbetalinger.header': 'Omsorgsdager du søker utbetaling for',

        'steg.oppsummering.medlemskap.header': 'Medlemskap i folketrygden',

        'steg.oppsummering.utlandetSiste12.header': 'Har du bodd i utlandet i de siste 12 månedene?',
        'steg.oppsummering.utlandetNeste12.header': 'Skal du bo i utlandet i de neste 12 månedene?',
        'steg.oppsummering.utlandetSiste12.liste.header': 'Utenlandsopphold siste 12 måneder',
        'steg.oppsummering.utlandetNeste12.liste.header': 'Utenlandsopphold neste 12 måneder',
        'steg.oppsummering.samværsavtale.header': 'Avtale om delt bosted',
        'steg.oppsummering.bekrefterOpplysninger':
            'Jeg bekrefter at opplysningene jeg har gitt er riktige, og at jeg ikke har holdt tilbake opplysninger som har betydning for min rett til omsorgspenger.',
        'steg.oppsummering.bekrefterOpplysninger.ikkeBekreftet': 'Du må bekrefte opplysningene',

        'steg.oppsummering.utenlandsoppholdIPerioden.listetittel': 'Utenlandsopphold i perioden',

        'steg.oppsummering.apiValideringFeil.tittel': 'Noe av informasjonen mangler',

        'steg.oppsummering.dokumenter.header': 'Vedlegg',
        'steg.oppsummering.dokumenter.ingenVedlegg': 'Ingen vedlegg er lastet opp',
        'steg.oppsummering.dokumenterLegeerklæring.header': 'Legeerklæring',
        'steg.oppsummering.dokumenterSmittevern.header': 'Bekreftelse fra lege',
        'steg.oppsummering.dokumenterStengtBhgSkole.header': 'Bekreftelse fra barnehage eller skole',

        'steg.oppsummering.fravær.årsak': 'Årsak: {årsak}.',
        'steg.oppsummering.fravær.aktivitet.1': 'Fravær som {aktivitet}.',
        'steg.oppsummering.fravær.aktivitet.2': 'Fravær som {aktivitet1} og {aktivitet2}.',
        'aktivitetFravær.SELVSTENDIG_VIRKSOMHET': 'selvstendig næringsdrivende',
        'aktivitetFravær.FRILANSER': 'frilanser',

        'steg.oppsummering.dokumenter.ikkelastetopp': 'Ikke lastet opp, må ettersendes',

        'summary.virksomhet.header': 'Selvstendig næringsdrivende',
        'summary.virksomhet.næringstype': 'Næringstype',
        'summary.virksomhet.regnskapsfører': 'Regnskapsfører er {navn}, telefon: {telefon}.',
        'summary.virksomhet.ikkeRegnskapsfører': 'Har ikke regnskapsfører.',
        'summary.virksomhet.tidsinfo.avsluttet': 'Startet {fraOgMed}, avsluttet {tilOgMed}.',
        'summary.virksomhet.tidsinfo.pågående': 'Startet {fraOgMed} (pågående).',
        'summary.virksomhet.fisker.påBladB': 'Fisker er på Blad B.',
        'summary.virksomhet.fisker.ikkePåBladB': 'Fisker er ikke på Blad B.',
        'summary.virksomhet.registrertILand': 'Registrert i {land}',
        'summary.virksomhet.registrertILand.orgnr': ' (organisasjonsnummer {orgnr})',
        'summary.virksomhet.næringsinntekt': 'Næringsinntekt: {næringsinntekt}',
        'summary.virksomhet.varigEndring.html':
            'Har hatt varig endring i arbeidsforholdet, virksomheten eller arbeidssituasjonen de siste fire årene. Dato for endring var {dato}, og næringsinntekt etter endringen er <strong>{inntekt}</strong>. Beskrivelse av endringen:',
        'summary.virksomhet.yrkesaktivSisteTreFerdigliknedeÅrene': 'Ble yrkesaktiv {dato}',
        'summary.virksomhet.harDuHattInntekt.header':
            'Var du selvstendig næringsdrivende i dagene du søker utbetaling for?',
        'summary.virksomhet.harFlereVirksomheter.header': 'Har du flere enn én næringsvirksomhet som er aktiv?',
        'summary.virksomhet.virksomhetInfo.tittel': 'Næringsvirksomhet som du har lagt inn:',

        'frilanser.summary.header': 'Frilanser',
        'frilanser.summary.harDuHattInntekt.header': 'Var du frilanser i dagene du søker utbetaling for?',
        'frilanser.summary.nårStartet.header': 'Når startet du som frilanser?',
        'frilanser.summary.jobberFortsatt.header': 'Jobber du fortsatt som frilanser?',
        'frilanser.summary.nårSluttet.header': 'Når sluttet du som frilanser?',

        'page.confirmation.sidetittel': 'Vi har mottatt søknaden din',
        'page.confirmation.tittel': 'Vi har mottatt søknad om utbetaling av omsorgspenger',
        'page.confirmation.undertittel': 'Hva skjer videre nå?',
        'page.confirmation.checklist.1.a':
            'Vi starter behandlingen av søknaden din når vi har mottatt all nødvendig dokumentasjon. Vi kontakter deg hvis vi trenger flere opplysninger.',
        'page.confirmation.checklist.2.a': 'Når søknaden er ferdigbehandlet, får du et svar fra oss på «Min side».',
        'page.confirmation.checklist.2.b': 'Du kan sjekke saksbehandlingstiden her.',

        'validation.harUtvidetRett.yesOrNoIsUnanswered':
            'Du må svare at du har fått ekstra omsorgsdager for barn fordi barnet har kronisk sykdom eller funksjonshemming eller ikke.',
        'validation.harUtvidetRettFor.listIsEmpty': 'Du må krysse av for det eller de barna som har utvidet rett.',
        'validation.harDekketTiFørsteDagerSelv.notChecked':
            'Du må bekrefte at du allerede har dekt 10 dager selv i år.',
        'validation.ingen_dokumenter': 'Ingen vedlegg er lastet opp.',
        'validation.for_mange_dokumenter': 'For mange dokumenter er lastet opp.',
        'validation.samlet_storrelse_for_hoy':
            'Total samlet størrelse for dokumentene du har lastet opp overstiger grensen på 24Mb.',
        'validation.harDekketTiFørsteDagerSelv.yesOrNoIsUnanswered':
            'Du må svare ja eller nei på om du har dekket de 10 første dagene selv.',
        'validation.harPerioderMedFravær.yesOrNoIsUnanswered':
            'Du må svare ja eller nei på om du har hatt hele dager med fravær fra jobb.',
        'validation.fraværPerioder.listIsEmpty': 'Du har ikke lagt til dager med fullt fravær.',
        'validation.fraværPerioder.ulikeÅrstall':
            'Du har lagt til fravær som er i flere år. En søknad kan kun inneholde fravær i ett år.',
        'validation.fraværDager.listIsEmpty': 'Du har ikke lagt til dager med delvis fravær.',
        'validation.harDagerMedDelvisFravær.yesOrNoIsUnanswered':
            'Du må svare ja eller nei på om du har hatt dager med delvis fravær fra jobb.',
        'validation.perioder_harVærtIUtlandet.yesOrNoIsUnanswered':
            'Du må svare ja eller nei på om du har vært i utlandet noen av dagene du søker omsorgspenger for.',
        'validation.perioder_utenlandsopphold.listIsEmpty':
            'Du har svart du har vært i utlandet i perioden du søker for, du må derfor legge til utenlandsopphold.',

        'validation.frilans_erFrilanser.yesOrNoIsUnanswered': 'Du må svare ja eller nei på om du var frilanser.',
        'validation.frilans_startdato.dateHasNoValue': 'Du må fylle ut når du startet som frilanser.',
        'validation.frilans_startdato.dateHasInvalidFormat':
            'Datoen for når du startet som frilanser er ugyldig. Gyldig format er dd.mm.åååå.',
        'validation.frilans_startdato.dateIsAfterMax':
            'Datoen for når du startet som frilanser kan ikke være etter dagens dato.',
        'validation.frilans_sluttdato.dateHasNoValue': 'Du må fylle ut når du sluttet som frilanser.',
        'validation.frilans_sluttdato.dateHasInvalidFormat':
            'Datoen for når du sluttet som frilanser er ugyldig. Gyldig format er dd.mm.åååå.',
        'validation.frilans_sluttdato.dateIsAfterMax':
            'Datoen for når du sluttet som frilanser kan ikke være etter dagens dato.',
        'validation.frilans_sluttdato.dateIsBeforeMin':
            'Datoen for når du sluttet som frilanser kan ikke være før datoen du startet.',
        'validation.frilans_jobberFortsattSomFrilans.yesOrNoIsUnanswered':
            'Du må svare på om du fortsatt jobber som frilanser.',

        'validation.selvstendig_erSelvstendigNæringsdrivende.yesOrNoIsUnanswered':
            'Du må svare ja eller nei på om du var selvstendig næringsdrivende.',
        'validation.selvstendig_harFlereVirksomheter.yesOrNoIsUnanswered':
            'Du må svare ja eller nei på om du har flere enn én virksomhet som er aktiv.',
        'validation.selvstendig_virksomhet.noValue': 'Du har ikke registrert informasjon om virksomheten din.',
        'validation.aktivitetFravær.noValue': 'Du må velge hvilket arbeid du hadde fravær fra {dato}.',
        'validation.harBoddUtenforNorgeSiste12Mnd.yesOrNoIsUnanswered':
            'Du må svare på om du har bodd i utlandet i hele eller deler av de siste 12 månedene.',
        'validation.utenlandsoppholdSiste12Mnd.utenlandsopphold_ikke_registrert':
            'Du har ikke registrert noen utenlandsopphold for de siste 12 månedene.',
        'validation.utenlandsoppholdSiste12Mnd.utenlandsopphold_overlapper':
            'Ett eller flere av utenlandsoppholdene de siste 12 månedene har datoer som overlapper.',
        'validation.utenlandsoppholdSiste12Mnd.utenlandsopphold_utenfor_periode':
            'Ett eller flere av utenlandsoppholdene de siste 12 månedene er utenfor tillatt tidsrom.',
        'validation.skalBoUtenforNorgeNeste12Mnd.yesOrNoIsUnanswered':
            'Du må svare på om du planlegger å bo i utlandet i hele eller deler av de neste 12 månedene.',
        'validation.utenlandsoppholdNeste12Mnd.utenlandsopphold_ikke_registrert':
            'Du har ikke registrert noen utenlandsopphold for de neste 12 månedene.',
        'validation.utenlandsoppholdNeste12Mnd.utenlandsopphold_overlapper':
            'Ett eller flere av utenlandsoppholdene de neste 12 månedene har datoer som overlapper.',
        'validation.utenlandsoppholdNeste12Mnd.utenlandsopphold_utenfor_periode':
            'Ett eller flere av utenlandsoppholdene de neste 12 månedene er utenfor tillatt tidsrom.',
        'validation.harBekreftetOpplysninger.notChecked': 'Du må bekrefte at opplysningene er riktige.',
        'validation.harForståttRettigheterOgPlikter.notChecked':
            'Du må bekrefte at du har lest og forstått dine plikter.',
    },
};

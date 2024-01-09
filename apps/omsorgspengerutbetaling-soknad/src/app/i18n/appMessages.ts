import { MessageFileFormat } from '@navikt/sif-common-core-ds/src/types/MessageFileFormat';

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

        'page.ikkeTilgang.sidetittel':
            'Søknad om utbetaling av omsorgspenger til selvstendig næringsdrivende eller frilansere',
        'page.ikkeTilgang.tekst':
            'Du har ikke tilgang til denne siden. Dersom du er under 18 år, må en av foreldrene dine eller en foresatt skrive under på søknaden sammen med deg. Du må derfor fylle ut søknaden på papir og sende den i posten.',

        'steg.footer.avbryt': 'Avbryt og slett søknad',
        'steg.footer.fortsettSenere': 'Avslutt og fortsett senere',

        'step.dineBarn.stepTitle': 'Om barn og dager du må dekke selv',
        'step.dineBarn.stepIndicatorLabel': 'Om barn og dager du må dekke selv',

        'step.fravaer.stepTitle': 'Dager du søker om utbetaling for',

        'step.legeerklæring.stepTitle': 'Last opp legeerklæring',

        'step.legeerklæring.counsellorpanel.1':
            'Hvis du søker om utbetaling for mer enn 3 sammenhengende dager, må du laste opp en legeerklæring som gjelder fra og med den 4. dagen.',
        'step.legeerklæring.counsellorpanel.2':
            'Hvis du søker for kortere periode eller for enkeltdager trenger du ikke legeerklæring. Du kan da fortsette søknaden uten å laste opp noe.',
        'step.legeerklæring.counsellorpanel.3':
            'Hvis du søker for mer enn 3 sammenhengende dager, men ikke har legeerklæring tilgjengelig nå,',
        'step.legeerklæring.counsellorpanel.3.lenkeEttersending': 'kan du ettersende den her.',

        'step.legeerklæring.uploadBtn': 'Last opp legeerklæring',
        'step.legeerklæring.nextButtonLabel': 'Fortsett',

        'vedleggsliste.fjernKnapp': 'Fjern vedlegg',
        'vedleggsliste.ingenLegeerklæringLastetOpp': 'Ingen vedlegg er lastet opp',
        'vedleggsliste.ingenSamværsavtaleLastetOpp': 'Ingen vedlegg er lastet opp',

        'dokumenter.advarsel.totalstørrelse.1':
            'Du har totalt lastet opp mer enn grensen på 24 Mb. Det betyr at du må fjerne noe av det du har lastet opp. Hvis det betyr at du ikke får plass til alt du ønsker å sende nå, kan du ',
        'dokumenter.advarsel.totalstørrelse.2': 'ettersende flere dokumenter.',

        'step.arbeidssituasjon.stepTitle': 'Arbeidssituasjon',

        'step.fravaerFra.stepTitle': 'Fravær fra arbeid som selvstendig næringsdrivende og/eller frilanser',

        'step.medlemskap.stepTitle': 'Medlemskap i folketrygden',

        'step.oppsummering.stepTitle': 'Oppsummering',

        'initialLoadError.pageTitle': 'Det oppstod en feil',
        'initialLoadError.text.1': 'Det oppstod en feil under oppstarten av søknaden. Vennligst prøv igjen senere.',

        'resetMellomlagring.text.1': 'Dersom feilen vedvarer, kan du prøve å starte på nytt med et tom skjema.',
        'resetMellomlagring.startPåNytt': 'Start på nytt',

        'validation.barn.ingenBarn': 'Du må legge til minst ett barn for å kunne gå videre i søknaden.',
        'validation.harUtvidetRett.yesOrNoIsUnanswered':
            'Du må svare at du har fått ekstra omsorgsdager for barn fordi barnet har kronisk sykdom eller funksjonshemning eller ikke.',
        'validation.harDekketTiFørsteDagerSelv.notAnswered': 'Du må svare på om du har dekt  10 dager selv i år.',
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
            'Datoen for når du startet som frilanser kan ikke være etter dagens dato eller siste dag du søker for.',
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

        'validation.arbeidssituasjon.arbeidsperiodeStarterEtterFraværsperiode':
            'Du har registrert fraværsdager utenfor perioden du har registrert arbeid.',
        'validation.arbeidssituasjon.arbeidsperiodeSlutterFørEllerIFraværsperiode':
            'Du har registrert fraværsdager utenfor perioden du har registrert arbeid.',
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

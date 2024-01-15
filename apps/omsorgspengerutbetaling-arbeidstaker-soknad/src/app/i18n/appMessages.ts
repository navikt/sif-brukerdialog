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

        'banner.title': 'Søknad om utbetaling av omsorgspenger når arbeidsgiver ikke utbetaler',
        'application.bannerTitle': 'Søknad om utbetaling av omsorgspenger når arbeidsgiver ikke utbetaler',
        'application.title': 'Søknad om utbetaling av omsorgspenger når arbeidsgiver ikke utbetaler',

        timer: '{timer, plural, one {# time} other {# timer}}',
        minutter: '{minutter, plural, one {# minutt} other {# minutter}}',
        timerOgMinutter:
            '{timer, plural, one {# time} other {# timer}} og {minutter, plural, one {# minutt} other {# minutter}}',
        dager: '{dager, plural, one {# dag} other {# dager}}',

        'timeInput.hours': 'Timer',
        'timeInput.minutes': 'Minutter',

        'initialLoadError.pageTitle': 'Det oppstod en feil',
        'initialLoadError.text.1': 'Det oppstod en feil under oppstarten av søknaden. Vennligst prøv igjen senere.',

        'resetMellomlagring.text.1': 'Dersom feilen vedvarer, kan du prøve å starte på nytt med et tom skjema.',
        'resetMellomlagring.startPåNytt': 'Start på nytt',

        'page.form.ubesvarteSpørsmålInfo': 'For å komme videre, må du svare på alle spørsmålene ovenfor',

        'fileUploadErrors.part1': 'Det har dessverre skjedd en feil under opplasting av følgende vedlegg:',
        'formikValidationErrorSummary.tittel': 'Du må rette opp i følgende feil:',

        'step.nextButtonLabel': 'Fortsett',
        'step.sendButtonLabel': 'Send inn søknaden',
        'step.sendButtonAriaLabel': 'Send inn søknaden',

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

        'vedleggsliste.fjernKnapp': 'Fjern vedlegg',

        'formikVedleggsKomponent.advarsel.totalstørrelse.1':
            'Du har totalt lastet opp mer enn grensen på 24 Mb. Det betyr at du må fjerne noe av det du har lastet opp. Hvis det betyr at du ikke får plass til alt du ønsker å sende nå, kan du ',
        'formikVedleggsKomponent.advarsel.totalstørrelse.2': 'ettersende flere dokumenter.',

        'page.generalErrorPage.sidetittel': 'Feil',
        'page.generalErrorPage.tittel': 'Noe gikk galt...',
        'page.generalErrorPage.tekst': 'Beklager, her har det dessverre skjedd en feil.',

        'step.fosterbarn.stepTitle': 'Fosterbarn',
        'step.fosterbarn.stepIndicatorLabel': 'Fosterbarn',

        'step.situasjon.pageTitle': 'Din arbeidssituasjon',
        'step.situasjon.stepTitle': 'Din arbeidssituasjon',

        'step.fravær.pageTitle': 'Hvilke dager søker du utbetaling for?',
        'step.fravær.stepTitle': 'Hvilke dager søker du utbetaling for?',

        'step.legeerklæring.pageTitle': 'Legeerklæring',
        'step.legeerklæring.stepTitle': 'Last opp legeerklæring',

        'step.medlemskap.pageTitle': 'Omsorgspengesøknad - medlemskap',
        'step.medlemskap.stepTitle': 'Medlemskap',

        'step.oppsummering.pageTitle': 'Omsorgspengesøknad - oppsummering',
        'step.oppsummering.stepTitle': 'Oppsummering',

        'page.confirmation.sidetittel': 'Vi har mottatt søknaden din',
        'page.confirmation.tittel': 'Vi har mottatt søknad om utbetaling av omsorgspenger',

        'validation.for_mange_dokumenter': 'Du har lastet opp for mange dokumenter.',
        'validation.samlet_storrelse_for_hoy':
            'Total samlet størrelse for dokumentene du har lastet opp overstiger grensen på 24Mb.',
        'validation.periode_ingenDagerEllerPerioder': 'Du må spesifisere minst én periode for arbeidsforholdet.',
        'validation.fraværDagIkkeSammeÅrstall':
            'Du har lagt inn fravær som går over flere år. Du kan kun legge inn fravær for ett år.',
        'validation.fraværPeriodeIkkeSammeÅrstall':
            'Du har lagt inn fravær som går over flere år. Du kan kun legge inn fravær for ett år.',
        'validation.perioderEllerDagerOverlapper': 'En eller flere av fraværsdagene overlapper.',
        'validation.harHattFraværHosArbeidsgiver.yesOrNoIsUnanswered':
            'Du må svare på om du har hatt fravær hos {arbeidsgivernavn} fordi du har brukt omsorgsdager.',
        'validation.arbeidsgiverHarUtbetaltLønn.yesOrNoIsUnanswered':
            'Du må svare på om {arbeidsgivernavn} har utbetalt deg lønn for de dagene du har brukt omsorgsdager.',
        'validation.arbeidsforhold.ansettelseslengde.begrunnelse.noValue':
            'Du må svare på hva som var din situasjon før du startet å jobbe hos {arbeidsgivernavn}.',
        'validation.arbeidsforhold.hvorLengeJobbet.noValue':
            'Du må svare på hvor lenge du vært i jobb hos {arbeidsgivernavn}.',
        'validation.arbeidsforhold.harPerioderMedFravær.yesOrNoIsUnanswered':
            'Du må svare på om du har hatt hele dager med fravær fra jobb.',
        'validation.arbeidsforhold.harDagerMedDelvisFravær.yesOrNoIsUnanswered':
            'Du må svare på om du har hatt dager med delvis fravær fra jobb.',
        'validation.arbeidsforhold.fraværPerioder.listIsEmpty':
            'Du har svart at du har hele dager med fravær, så du må legge inn hvilke dager det gjelder.',
        'validation.arbeidsforhold.fraværDager.listIsEmpty':
            'Du har svart du har dager med delvis fravær, så du må legge inn hvilke dager det gjelder.',
        'validation.perioderHarVærtIUtlandet.yesOrNoIsUnanswered':
            'Du må svare på om du har vært i utlandet noen av dagene du søker omsorgspenger for.',
        'validation.perioderUtenlandsopphold.listIsEmpty':
            'Du har svart du har vært i utlandet i perioden du søker for. Du må derfor legge til utenlandsopphold.',
        'validation.harBoddUtenforNorgeSiste12Mnd.yesOrNoIsUnanswered':
            'Du må svare på om du har bodd i utlandet i hele eller deler av de siste 12 månedene.',
        'validation.utenlandsoppholdSiste12Mnd.utenlandsopphold_ikke_registrert':
            'Du har ikke registrert noen utenlandsopphold for de siste 12 månedene.',
        'validation.utenlandsoppholdSiste12Mnd.utenlandsopphold_overlapper':
            'Ett eller flere av utenlandsoppholdene de siste 12 månedene har datoer som overlapper.',
        'validation.utenlandsoppholdSiste12Mnd.utenlandsopphold_utenfor_periode':
            'Ett eller flere av utenlandsoppholdene du har lagt inn er utenfor søknadsperioden.',
        'validation.skalBoUtenforNorgeNeste12Mnd.yesOrNoIsUnanswered':
            'Du må svare på om du planlegger å bo i utlandet i hele eller deler av de neste 12 månedene.',
        'validation.utenlandsoppholdNeste12Mnd.utenlandsopphold_ikke_registrert':
            'Du har ikke registrert noen utenlandsopphold for de neste 12 månedene.',
        'validation.utenlandsoppholdNeste12Mnd.utenlandsopphold_overlapper':
            'Ett eller flere av utenlandsoppholdene de neste 12 månedene har datoer som overlapper.',
        'validation.utenlandsoppholdNeste12Mnd.utenlandsopphold_utenfor_periode':
            'Ett eller flere av utenlandsoppholdene du har lagt inn er utenfor søknadsperioden.',
        'validation.harForståttRettigheterOgPlikter.notChecked':
            'Du må bekrefte at du har lest og forstått dine plikter.',
        'validation.harBekreftetOpplysninger.notChecked': 'Du må bekrefte at opplysningene du har gitt er riktige.',
        'validation.situasjon.arbeidsforhold.utbetalingsårsak.noValue':
            'Du må svare på hva som er grunnen til at du søker om utbetaling av omsorgspenger fra NAV.',
        'validation.situasjon.arbeidsforhold.ÅrsakMindre4Uker.noValue':
            'Du må svare på hva som var situasjonen din rett før du startet hos {arbeidsgivernavn}.',
        'validation.arbeidsforhold.utbetalingsårsak.konfliktForklaring.stringHasNoValue':
            'Du må forklare situasjonen med arbeidsgiveren din.',
        'validation.arbeidsforhold.utbetalingsårsak.konfliktForklaring.stringIsTooShort':
            'Forklaringen må være på minst {min} tegn.',
        'validation.arbeidsforhold.utbetalingsårsak.konfliktForklaring.stringIsTooLong':
            'Forklaringn kan være på maks {maks} tegn.',
    },
};

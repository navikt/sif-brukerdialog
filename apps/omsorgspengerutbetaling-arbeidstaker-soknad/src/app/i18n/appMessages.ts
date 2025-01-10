import { kvitteringMessages } from '../pages/kvittering/kvitteringMesssages';
import { velkommenPageMessages } from '../pages/velkommen/velkommenPageMessages';
import { deltBostedMessages } from '../søknad/steps/delt-bosted/deltBostedMessages';
import { dineBarnMessages } from '../søknad/steps/dine-barn/dineBarnMessages';
import { fraværStepMessages } from '../søknad/steps/fravær/fraværStepMessages';
import { legeerklæringMessages } from '../søknad/steps/legeerklæring/legeerklæringMessages';
import { oppsummeringMessages } from '../søknad/steps/oppsummering/oppsummeringMessages';
import { situasjonMessages } from '../søknad/steps/situasjon/situasjonStepMessages';
import { validateApiDataMessages } from '../utils/søknadsdataToApiData/validateApiData';

const nb = {
    ...situasjonMessages.nb,
    ...dineBarnMessages.nb,
    ...deltBostedMessages.nb,
    ...velkommenPageMessages.nb,
    ...fraværStepMessages.nb,
    ...legeerklæringMessages.nb,
    ...oppsummeringMessages.nb,
    ...kvitteringMessages.nb,
    ...validateApiDataMessages.nb,

    Ja: 'Ja',
    Nei: 'Nei',

    'application.title': 'Søknad om utbetaling av omsorgspenger når arbeidsgiver ikke utbetaler',
    dager: '{dager, plural, one {# dag} other {# dager}}',

    'initialLoadError.pageTitle': 'Det oppstod en feil',
    'initialLoadError.text.1': 'Det oppstod en feil under oppstarten av søknaden. Vennligst prøv igjen senere.',

    'resetMellomlagring.text.1': 'Dersom feilen vedvarer, kan du prøve å starte på nytt med et tom skjema.',
    'resetMellomlagring.startPåNytt': 'Start på nytt',

    'step.nextButtonLabel': 'Fortsett',
    'step.sendButtonLabel': 'Send inn søknaden',
    'step.sendButtonAriaLabel': 'Send inn søknaden',

    'step.dineBarn.stepTitle': 'Dine barn',
    'step.dineBarn.stepIndicatorLabel': 'Dine barn',

    'step.deltBosted.stepTitle': 'Avtale om delt fast bosted',
    'step.deltBosted.stepIndicatorLabel': 'Avtale om delt fast bosted',

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
        'Du må svare på om du har hatt hele dager med fravær fra jobb hos {arbeidsgivernavn}.',
    'validation.arbeidsforhold.harDagerMedDelvisFravær.yesOrNoIsUnanswered':
        'Du må svare på om du har hatt dager med delvis fravær fra jobb hos {arbeidsgivernavn}.',
    'validation.arbeidsforhold.fraværPerioder.listIsEmpty':
        'Du har svart at du har hele dager med fravær hos {arbeidsgivernavn}, så du må legge inn hvilke dager det gjelder.',
    'validation.arbeidsforhold.fraværDager.listIsEmpty':
        'Du har svart du har dager med delvis fravær hos {arbeidsgivernavn}, så du må legge inn hvilke dager det gjelder.',
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
    'validation.harForståttRettigheterOgPlikter.notChecked': 'Du må bekrefte at du har lest og forstått dine plikter.',
    'validation.harBekreftetOpplysninger.notChecked': 'Du må bekrefte at opplysningene du har gitt er riktige.',
    'validation.situasjon.arbeidsforhold.utbetalingsårsak.noValue':
        'Du må svare på hva som er grunnen til at du søker om utbetaling av omsorgspenger fra Nav.',
    'validation.situasjon.arbeidsforhold.ÅrsakMindre4Uker.noValue':
        'Du må svare på hva som var situasjonen din rett før du startet hos {arbeidsgivernavn}.',
    'validation.arbeidsforhold.utbetalingsårsak.konfliktForklaring.stringHasNoValue':
        'Du må forklare situasjonen med arbeidsgiveren din.',
    'validation.arbeidsforhold.utbetalingsårsak.konfliktForklaring.stringIsTooShort':
        'Forklaringen må være på minst {min} tegn.',
    'validation.arbeidsforhold.utbetalingsårsak.konfliktForklaring.stringIsTooLong':
        'Forklaringn kan være på maks {maks} tegn.',
    'validation.arbeidsforhold.utbetalingsårsak.vedlegg.noVedleggUploaded':
        'Ingen dokumenter med forklaring fra {arbeidsgivernavn} er lastet opp.',
    'validation.barn.ingenBarn': 'Du må legge til minst ett barn du har omsorg for',
};

const nn: Record<keyof typeof nb, string> = {
    ...situasjonMessages.nn,
    ...dineBarnMessages.nn,
    ...deltBostedMessages.nn,
    ...velkommenPageMessages.nn,
    ...fraværStepMessages.nn,
    ...legeerklæringMessages.nn,
    ...oppsummeringMessages.nn,
    ...kvitteringMessages.nn,
    ...validateApiDataMessages.nn,

    Ja: 'Ja',
    Nei: 'Nei',

    'application.title': 'Søknad om utbetaling av omsorgspengar når arbeidsgivar ikkje utbetalar',
    dager: '{dager, plural, one {# dag} other {# dagar}}',

    'initialLoadError.pageTitle': 'Det oppstod ein feil',
    'initialLoadError.text.1': 'Det oppstod ein feil under oppstarten av søknaden. Ver venleg og prøv igjen seinare.',

    'resetMellomlagring.text.1': 'Dersom feilen vedvarer, kan du prøve å starte på nytt med eit tomt skjema.',
    'resetMellomlagring.startPåNytt': 'Start på nytt',

    'step.nextButtonLabel': 'Fortset',
    'step.sendButtonLabel': 'Send inn søknaden',
    'step.sendButtonAriaLabel': 'Send inn søknaden',

    'step.dineBarn.stepTitle': 'Dine barn',
    'step.dineBarn.stepIndicatorLabel': 'Dine barn',

    'step.deltBosted.stepTitle': 'Avtale om delt fast bustad',
    'step.deltBosted.stepIndicatorLabel': 'Avtale om delt fast bustad',

    'step.situasjon.pageTitle': 'Din arbeidssituasjon',
    'step.situasjon.stepTitle': 'Din arbeidssituasjon',

    'step.fravær.pageTitle': 'Kva dagar søkjer du utbetaling for?',
    'step.fravær.stepTitle': 'Kva dagar søkjer du utbetaling for?',

    'step.legeerklæring.pageTitle': 'Legeerklæring',
    'step.legeerklæring.stepTitle': 'Last opp legeerklæring',

    'step.medlemskap.pageTitle': 'Omsorgspengesøknad - medlemskap',
    'step.medlemskap.stepTitle': 'Medlemskap',

    'step.oppsummering.pageTitle': 'Omsorgspengesøknad - oppsummering',
    'step.oppsummering.stepTitle': 'Oppsummering',

    'page.confirmation.sidetittel': 'Me har mottatt søknaden din',
    'page.confirmation.tittel': 'Me har mottatt søknad om utbetaling av omsorgspengar',

    'validation.periode_ingenDagerEllerPerioder': 'Du må spesifisere minst éin periode for arbeidsforholdet.',
    'validation.fraværDagIkkeSammeÅrstall':
        'Du har lagt inn fråvær som går over fleire år. Du kan berre leggje inn fråvær for eitt år.',
    'validation.fraværPeriodeIkkeSammeÅrstall':
        'Du har lagt inn fråvær som går over fleire år. Du kan berre leggje inn fråvær for eitt år.',
    'validation.perioderEllerDagerOverlapper': 'Éin eller fleire av fråværsdagane overlappar.',
    'validation.harHattFraværHosArbeidsgiver.yesOrNoIsUnanswered':
        'Du må svare på om du har hatt fråvær hos {arbeidsgivernavn} fordi du har brukt omsorgsdagar.',
    'validation.arbeidsgiverHarUtbetaltLønn.yesOrNoIsUnanswered':
        'Du må svare på om {arbeidsgivernavn} har utbetalt deg lønn for dei dagane du har brukt omsorgsdagar.',
    'validation.arbeidsforhold.ansettelseslengde.begrunnelse.noValue':
        'Du må svare på kva som var din situasjon før du starta å jobbe hos {arbeidsgivernavn}.',
    'validation.arbeidsforhold.hvorLengeJobbet.noValue':
        'Du må svare på kor lenge du har vore i jobb hos {arbeidsgivernavn}.',
    'validation.arbeidsforhold.harPerioderMedFravær.yesOrNoIsUnanswered':
        'Du må svare på om du har hatt heile dagar med fråvær frå jobb hos {arbeidsgivernavn}.',
    'validation.arbeidsforhold.harDagerMedDelvisFravær.yesOrNoIsUnanswered':
        'Du må svare på om du har hatt dagar med delvis fråvær frå jobb hos {arbeidsgivernavn}.',
    'validation.arbeidsforhold.fraværPerioder.listIsEmpty':
        'Du har svart at du har heile dagar med fråvær hos {arbeidsgivernavn}, så du må leggje inn kva dagar det gjeld.',
    'validation.arbeidsforhold.fraværDager.listIsEmpty':
        'Du har svart at du har dagar med delvis fråvær hos {arbeidsgivernavn}, så du må leggje inn kva dagar det gjeld.',
    'validation.perioderHarVærtIUtlandet.yesOrNoIsUnanswered':
        'Du må svare på om du har vore i utlandet nokre av dagane du søkjer omsorgspengar for.',
    'validation.perioderUtenlandsopphold.listIsEmpty':
        'Du har svart at du har vore i utlandet i perioden du søkjer for. Du må derfor leggje til utanlandsopphald.',
    'validation.harBoddUtenforNorgeSiste12Mnd.yesOrNoIsUnanswered':
        'Du må svare på om du har budd i utlandet i heile eller delar av dei siste 12 månadene.',
    'validation.utenlandsoppholdSiste12Mnd.utenlandsopphold_ikke_registrert':
        'Du har ikkje registrert nokre utanlandsopphald for dei siste 12 månadene.',
    'validation.utenlandsoppholdSiste12Mnd.utenlandsopphold_overlapper':
        'Eitt eller fleire av utanlandsopphalda dei siste 12 månadene har datoar som overlappar.',
    'validation.utenlandsoppholdSiste12Mnd.utenlandsopphold_utenfor_periode':
        'Eitt eller fleire av utanlandsopphalda du har lagt inn er utanfor søknadsperioden.',
    'validation.skalBoUtenforNorgeNeste12Mnd.yesOrNoIsUnanswered':
        'Du må svare på om du planlegg å bu i utlandet i heile eller delar av dei neste 12 månadene.',
    'validation.utenlandsoppholdNeste12Mnd.utenlandsopphold_ikke_registrert':
        'Du har ikkje registrert nokre utanlandsopphald for dei neste 12 månadene.',
    'validation.utenlandsoppholdNeste12Mnd.utenlandsopphold_overlapper':
        'Eitt eller fleire av utanlandsopphalda dei neste 12 månadene har datoar som overlappar.',
    'validation.utenlandsoppholdNeste12Mnd.utenlandsopphold_utenfor_periode':
        'Eitt eller fleire av utanlandsopphalda du har lagt inn er utanfor søknadsperioden.',
    'validation.harForståttRettigheterOgPlikter.notChecked': 'Du må stadfeste at du har lese og forstått dine plikter.',
    'validation.harBekreftetOpplysninger.notChecked': 'Du må stadfeste at opplysningane du har gitt er riktige.',
    'validation.situasjon.arbeidsforhold.utbetalingsårsak.noValue':
        'Du må svare på kva som er grunnen til at du søkjer om utbetaling av omsorgspengar frå Nav.',
    'validation.situasjon.arbeidsforhold.ÅrsakMindre4Uker.noValue':
        'Du må svare på kva som var situasjonen din rett før du starta hos {arbeidsgivernavn}.',
    'validation.arbeidsforhold.utbetalingsårsak.konfliktForklaring.stringHasNoValue':
        'Du må forklare situasjonen med arbeidsgivaren din.',
    'validation.arbeidsforhold.utbetalingsårsak.konfliktForklaring.stringIsTooShort':
        'Forklaringa må vere på minst {min} teikn.',
    'validation.arbeidsforhold.utbetalingsårsak.konfliktForklaring.stringIsTooLong':
        'Forklaringa kan vere på maks {maks} teikn.',
    'validation.arbeidsforhold.utbetalingsårsak.vedlegg.noVedleggUploaded':
        'Ingen dokument med forklaring frå {arbeidsgivernavn} er lasta opp.',
    'validation.barn.ingenBarn': 'Du må leggje til minst eitt barn du har omsorg for',
};
export const appMessages = { nb, nn };

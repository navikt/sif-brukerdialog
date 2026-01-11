/* eslint-disable max-len */
import { kvitteringMessages_nb } from '../pages/kvittering/i18n/nb';
import { velkommenPageMessages_nb } from '../pages/velkommen/i18n/nb';
import { deltBostedMessages_nb } from '../søknad/steps/delt-bosted/i18n/nb';
import { dineBarnMessages_nb } from '../søknad/steps/dine-barn/i18n/nb';
import { fraværStepMessages_nb } from '../søknad/steps/fravær/i18n/nb';
import { legeerklæringMessages_nb } from '../søknad/steps/legeerklæring/i18n/nb';
import { oppsummeringMessages_nb } from '../søknad/steps/oppsummering/i18n/nb';
import { situasjonMessages_nb } from '../søknad/steps/situasjon/i18n/nb';

export const appMessages_nb = {
    ...situasjonMessages_nb,
    ...dineBarnMessages_nb,
    ...deltBostedMessages_nb,
    ...velkommenPageMessages_nb,
    ...fraværStepMessages_nb,
    ...legeerklæringMessages_nb,
    ...oppsummeringMessages_nb,
    ...kvitteringMessages_nb,

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
        'Forklaringen kan være på maks {maks} tegn.',
    'validation.arbeidsforhold.utbetalingsårsak.konfliktForklaring.stringHasInvalidCharacters':
        'Forklaringen inneholder ugyldige tegn. Ugyldige tegn kan for eksempel være emojier, spesialtegn som « », §, @, eller skjulte formateringstegn som innrykk, tabulatorer og listeformatering. Dette kan blant annet oppstå dersom tekst kopieres fra andre steder. Du kan prøve å skrive inn teksten på nytt direkte i feltet.',

    'validation.arbeidsforhold.utbetalingsårsak.vedlegg.noVedleggUploaded':
        'Ingen dokumenter med forklaring fra {arbeidsgivernavn} er lastet opp.',
    'validation.barn.ingenBarn': 'Du må legge til minst ett barn du har omsorg for',

    'apiDataValidation.undefined': 'Det oppstod en feil ved visningen av siden.',
    'apiDataValidation.omsorgsavtaleMangler': 'Det mangler avtale om delt bosted. ',
};

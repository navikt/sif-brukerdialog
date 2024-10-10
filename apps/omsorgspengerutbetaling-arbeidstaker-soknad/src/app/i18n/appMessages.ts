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

    'validation.vedlegg.noAttachmentsUploaded': 'Ingen vedlegg er lastet opp.',
    'validation.vedlegg.tooManyAttachments': 'For mange dokumenter er lastet opp.',
    'validation.vedlegg.maxTotalSizeExceeded':
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
        'Du må svare på hva som er grunnen til at du søker om utbetaling av omsorgspenger fra NAV.',
    'validation.situasjon.arbeidsforhold.ÅrsakMindre4Uker.noValue':
        'Du må svare på hva som var situasjonen din rett før du startet hos {arbeidsgivernavn}.',
    'validation.arbeidsforhold.utbetalingsårsak.konfliktForklaring.stringHasNoValue':
        'Du må forklare situasjonen med arbeidsgiveren din.',
    'validation.arbeidsforhold.utbetalingsårsak.konfliktForklaring.stringIsTooShort':
        'Forklaringen må være på minst {min} tegn.',
    'validation.arbeidsforhold.utbetalingsårsak.konfliktForklaring.stringIsTooLong':
        'Forklaringn kan være på maks {maks} tegn.',
    'validation.arbeidsforhold.utbetalingsårsak.vedlegg.noAttachmentsUploaded':
        'Ingen dokumenter lastet opp for {arbeidsgivernavn}.',
    'validation.barn.ingenBarn': 'Du må legge til minst ett barn du har omsorg for',
};

const nn: Record<keyof typeof nb, string> = {
    ...nb,
};

export const appMessages = { nb, nn };

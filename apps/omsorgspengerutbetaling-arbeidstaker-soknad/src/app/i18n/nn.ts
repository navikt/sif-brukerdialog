import { kvitteringMessages } from '../pages/kvittering/i18n';
import { velkommenPageMessages } from '../pages/velkommen/i18n';
import { deltBostedMessages } from '../søknad/steps/delt-bosted/i18n';
import { dineBarnMessages } from '../søknad/steps/dine-barn/i18n';
import { fraværStepMessages } from '../søknad/steps/fravær/i18n';
import { legeerklæringMessages } from '../søknad/steps/legeerklæring/i18n';
import { oppsummeringMessages } from '../søknad/steps/oppsummering/i18n';
import { situasjonMessages } from '../søknad/steps/situasjon/i18n';
import { appMessages_nb } from './nb';

export const appMessages_nn: Record<keyof typeof appMessages_nb, string> = {
    ...situasjonMessages.nn,
    ...dineBarnMessages.nn,
    ...deltBostedMessages.nn,
    ...velkommenPageMessages.nn,
    ...fraværStepMessages.nn,
    ...legeerklæringMessages.nn,
    ...oppsummeringMessages.nn,
    ...kvitteringMessages.nn,

    Ja: 'Ja',
    Nei: 'Nei',

    'application.title': 'Søknad om utbetaling av omsorgspengar når arbeidsgjevar ikkje utbetalar',
    dager: '{dager, plural, one {# dag} other {# dagar}}',

    'initialLoadError.pageTitle': 'Det oppstod ein feil',
    'initialLoadError.text.1': 'Det oppstod ein feil under oppstarten av søknaden. Ver venleg og prøv igjen seinare.',

    'resetMellomlagring.text.1': 'Dersom feilen vare ved, kan du prøve å starte på nytt med eit tomt skjema.',
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

    'validation.periode_ingenDagerEllerPerioder': 'Du må spesifisere minst éin periode for arbeidsforholdet.',
    'validation.fraværDagIkkeSammeÅrstall':
        'Du har lagt inn fråvær som går over fleire år. Du kan berre leggje inn fråvær for eitt år.',
    'validation.fraværPeriodeIkkeSammeÅrstall':
        'Du har lagt inn fråvær som går over fleire år. Du kan berre leggje inn fråvær for eitt år.',
    'validation.perioderEllerDagerOverlapper': 'Éin eller fleire av fråværsdagane overlappar.',
    'validation.harHattFraværHosArbeidsgiver.yesOrNoIsUnanswered':
        'Du må svare på om du har hatt fråvær hos {arbeidsgivernavn} fordi du har brukt omsorgsdagar.',
    'validation.arbeidsgiverHarUtbetaltLønn.yesOrNoIsUnanswered':
        'Du må svare på om {arbeidsgivernavn} har utbetalt deg løn for dei dagane du har brukt omsorgsdagar.',
    'validation.arbeidsforhold.ansettelseslengde.begrunnelse.noValue':
        'Du må svare på kva som var situasjon din før du starta å jobbe hos {arbeidsgivernavn}.',
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
        'Du må svare på om du har budd i utlandet i heile eller delar av dei siste 12 månadane.',
    'validation.utenlandsoppholdSiste12Mnd.utenlandsopphold_ikke_registrert':
        'Du har ikkje registrert nokre utanlandsopphald for dei siste 12 månadane.',
    'validation.utenlandsoppholdSiste12Mnd.utenlandsopphold_overlapper':
        'Eitt eller fleire av utanlandsopphalda dei siste 12 månadane har datoar som overlappar.',
    'validation.utenlandsoppholdSiste12Mnd.utenlandsopphold_utenfor_periode':
        'Eitt eller fleire av utanlandsopphalda du har lagt inn er utanfor søknadsperioden.',
    'validation.skalBoUtenforNorgeNeste12Mnd.yesOrNoIsUnanswered':
        'Du må svare på om du planlegg å bu i utlandet i heile eller delar av dei neste 12 månadane.',
    'validation.utenlandsoppholdNeste12Mnd.utenlandsopphold_ikke_registrert':
        'Du har ikkje registrert nokre utanlandsopphald for dei neste 12 månadane.',
    'validation.utenlandsoppholdNeste12Mnd.utenlandsopphold_overlapper':
        'Eitt eller fleire av utanlandsopphalda dei neste 12 månadane har datoar som overlappar.',
    'validation.utenlandsoppholdNeste12Mnd.utenlandsopphold_utenfor_periode':
        'Eitt eller fleire av utanlandsopphalda du har lagt inn er utanfor søknadsperioden.',
    'validation.harForståttRettigheterOgPlikter.notChecked':
        'Du må stadfeste at du har lese og forstått pliktene dine.',
    'validation.harBekreftetOpplysninger.notChecked': 'Du må stadfeste at opplysningane du har gjeve er riktige.',
    'validation.situasjon.arbeidsforhold.utbetalingsårsak.noValue':
        'Du må svare på kva som er grunnen til at du søkjer om utbetaling av omsorgspengar frå Nav.',
    'validation.situasjon.arbeidsforhold.ÅrsakMindre4Uker.noValue':
        'Du må svare på kva som var situasjonen din rett før du starta hos {arbeidsgivernavn}.',
    'validation.arbeidsforhold.utbetalingsårsak.konfliktForklaring.stringHasNoValue':
        'Du må forklare situasjonen med arbeidsgjevaren din.',
    'validation.arbeidsforhold.utbetalingsårsak.konfliktForklaring.stringIsTooShort':
        'Forklaringa må vere på minst {min} teikn.',
    'validation.arbeidsforhold.utbetalingsårsak.konfliktForklaring.stringIsTooLong':
        'Forklaringa kan vere på maks {maks} teikn.',
    'validation.arbeidsforhold.utbetalingsårsak.vedlegg.noVedleggUploaded':
        'Ingen dokument med forklaring frå {arbeidsgivernavn} er lasta opp.',
    'validation.barn.ingenBarn': 'Du må leggje til minst eitt barn du har omsorg for',

    'apiDataValidation.undefined': 'Det oppstod ein feil ved visinga av sida.',
    'apiDataValidation.omsorgsavtaleMangler': 'Det mangler avtale om delt bustad.',
};

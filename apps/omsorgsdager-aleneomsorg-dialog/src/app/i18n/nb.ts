import { kvitteringMessages_nb } from '../pages/kvittering/i18n/nb';
import { velkommenPageMessages_nb } from '../pages/velkommen/i18n/nb';
import { omOmsorgenForBarnMessages_nb } from '../søknad/steps/om-omsorgen-for-barn/i18n/nb';
import { oppsummeringMessages_nb } from '../søknad/steps/oppsummering/i18n/nb';
import { tidspunktForAleneomsorgMessages_nb } from '../søknad/steps/tidspunkt-for-aleneomsorg/i18n/nb';

export const appMessages_nb = {
    ...velkommenPageMessages_nb,
    ...omOmsorgenForBarnMessages_nb,
    ...tidspunktForAleneomsorgMessages_nb,
    ...oppsummeringMessages_nb,
    ...kvitteringMessages_nb,

    'application.title': 'Søknad om ekstra omsorgsdager ved aleneomsorg',
    'step.omOmsorgenForBarn.stepTitle': 'Om aleneomsorg for barn',
    'step.tidspunktForAleneomsorg.stepTitle': 'Tidspunkt for aleneomsorg',
    'step.oppsummering.stepTitle': 'Oppsummering',
    'initialLoadError.pageTitle': 'Det oppstod en feil',
    'initialLoadError.text.1': 'Det oppstod en feil under oppstarten av søknaden. Vennligst prøv igjen senere.',
    'resetMellomlagring.text.1': 'Dersom feilen vedvarer, kan du prøve å starte på nytt med et tom skjema.',
    'resetMellomlagring.startPåNytt': 'Start på nytt',
    'validation.harForståttRettigheterOgPlikter.notChecked': 'Du må bekrefte at du har lest og forstått dine plikter.',
    'apiDataValidation.undefined': 'Det oppstod en feil ved visningen av siden.',
};

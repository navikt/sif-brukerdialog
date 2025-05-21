import { kvitteringMessages_nn } from '../pages/kvittering/i18n/nn';
import { velkommenPageMessages_nn } from '../pages/velkommen/i18n/nn';
import { omOmsorgenForBarnMessages_nn } from '../søknad/steps/om-omsorgen-for-barn/i18n/nn';
import { oppsummeringMessages_nn } from '../søknad/steps/oppsummering/i18n/nn';
import { tidspunktForAleneomsorgMessages_nn } from '../søknad/steps/tidspunkt-for-aleneomsorg/i18n/nn';
import { appMessages_nb } from './nb';

export const appMessages_nn: Record<keyof typeof appMessages_nb, string> = {
    ...velkommenPageMessages_nn,
    ...omOmsorgenForBarnMessages_nn,
    ...tidspunktForAleneomsorgMessages_nn,
    ...oppsummeringMessages_nn,
    ...kvitteringMessages_nn,

    'application.title': 'Søknad om ekstra omsorgsdagar ved åleineomsorg',
    'step.omOmsorgenForBarn.stepTitle': 'Om åleineomsorg for barn',
    'step.tidspunktForAleneomsorg.stepTitle': 'Tidspunkt for åleineomsorg',
    'step.oppsummering.stepTitle': 'Oppsummering',
    'initialLoadError.pageTitle': 'Det oppstod ein feil',
    'initialLoadError.text.1': 'Det oppstod ein feil under oppstarten av søknaden. Ver venleg og prøv igjen seinare.',
    'resetMellomlagring.text.1': 'Dersom feilen varer ved, kan du prøve å starte på nytt med eit tomt skjema.',
    'resetMellomlagring.startPåNytt': 'Start på nytt',
    'validation.harForståttRettigheterOgPlikter.notChecked':
        'Du må stadfeste at du har lese og forstått pliktene dine.',
    'apiDataValidation.undefined': 'Det oppstod ein feil ved visinga av sida.',
};

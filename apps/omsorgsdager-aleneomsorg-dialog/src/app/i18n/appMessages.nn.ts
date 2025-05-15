import { annetBarnMessages } from '@navikt/sif-common-forms-ds';
import { kvitteringMessages } from '../pages/kvittering/i18n';
import { velkommenPageMessages } from '../pages/velkommen/i18n';
import { omOmsorgenForBarnMessages } from '../søknad/steps/om-omsorgen-for-barn/i18n';
import { oppsummeringMessages } from '../søknad/steps/oppsummering/i18n';
import { tidspunktForAleneomsorgMessages } from '../søknad/steps/tidspunkt-for-aleneomsorg/i18n';
import { validateApiDataMessages } from '../utils/søknadsdataToApiData/validateApiData';
import { appMessages_nb } from './appMessages.nb';

export const appMessages_nn: Record<keyof typeof appMessages_nb, string> = {
    ...velkommenPageMessages.nn,
    ...omOmsorgenForBarnMessages.nn,
    ...annetBarnMessages.nn,
    ...tidspunktForAleneomsorgMessages.nn,
    ...oppsummeringMessages.nn,
    ...kvitteringMessages.nn,
    ...validateApiDataMessages.nn,
    'application.title': 'Søknad om ekstra omsorgsdagar ved åleineomsorg',
    'step.omOmsorgenForBarn.stepTitle': 'Om åleineomsorg for barn',
    'step.tidspunktForAleneomsorg.stepTitle': 'Tidspunkt for åleineomsorg',
    'step.oppsummering.stepTitle': 'Oppsummering',
    'initialLoadError.pageTitle': 'Det oppstod ein feil',
    'initialLoadError.text.1': 'Det oppstod ein feil under oppstarten av søknaden. Ver venleg og prøv igjen seinare.',
    'resetMellomlagring.text.1': 'Dersom feilen varer ved, kan du prøve å starte på nytt med eit tomt skjema.',
    'resetMellomlagring.startPåNytt': 'Start på nytt',
    'validation.harForståttRettigheterOgPlikter.notChecked': 'Du må stadfeste at du har lese og forstått dine plikter.',
};

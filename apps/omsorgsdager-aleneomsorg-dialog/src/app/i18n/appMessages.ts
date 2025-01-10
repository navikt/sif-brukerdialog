import { annetBarnMessages } from '@navikt/sif-common-forms-ds';
import { kvitteringMessages } from '../pages/kvittering/kvitteringMesssages';
import { velkommenPageMessages } from '../pages/velkommen/velkommenPageMessages';
import { omOmsorgenForBarnMessages } from '../søknad/steps/om-omsorgen-for-barn/omOmsorgenForBarnMessages';
import { oppsummeringMessages } from '../søknad/steps/oppsummering/oppsummeringMessages';
import { tidspunktForAleneomsorgMessages } from '../søknad/steps/tidspunkt-for-aleneomsorg/tidspunktForAleneomsorgMessages';
import { validateApiDataMessages } from '../utils/søknadsdataToApiData/validateApiData';

const nb = {
    ...velkommenPageMessages.nb,
    ...omOmsorgenForBarnMessages.nb,
    ...annetBarnMessages.nb,
    ...tidspunktForAleneomsorgMessages.nb,
    ...oppsummeringMessages.nb,
    ...kvitteringMessages.nb,
    ...validateApiDataMessages.nb,

    'application.title': 'Søknad om ekstra omsorgsdager ved aleneomsorg',
    'step.omOmsorgenForBarn.stepTitle': 'Om aleneomsorg for barn',
    'step.tidspunktForAleneomsorg.stepTitle': 'Tidspunkt for aleneomsorg',
    'step.oppsummering.stepTitle': 'Oppsummering',
    'initialLoadError.pageTitle': 'Det oppstod en feil',
    'initialLoadError.text.1': 'Det oppstod en feil under oppstarten av søknaden. Vennligst prøv igjen senere.',
    'resetMellomlagring.text.1': 'Dersom feilen vedvarer, kan du prøve å starte på nytt med et tom skjema.',
    'resetMellomlagring.startPåNytt': 'Start på nytt',
    'validation.harForståttRettigheterOgPlikter.notChecked': 'Du må bekrefte at du har lest og forstått dine plikter.',
};

const nn: Record<keyof typeof nb, string> = {
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

export const appMessages = { nb, nn };

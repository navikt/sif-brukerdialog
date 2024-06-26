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
    ...nb,
};

export const appMessages = { nb, nn };

import { barnMessages } from '../pre-common/forms/barn/barnMessages';
import { kvitteringMessages } from '../pages/kvittering/kvitteringMesssages';
import { velkommenPageMessages } from '../pages/velkommen/velkommenPageMessages';
import { annenForelderenSituasjonMessages } from '../søknad/steps/annen-forelderens-situasjon/annenForelderenSituasjonMessages';
import { omAnnenForelderMessages } from '../søknad/steps/om-annen-forelder/omAnnenForelderMessages';
import { omBarnaMessages } from '../søknad/steps/om-barna/omBarnaMessages';
import { oppsummeringMessages } from '../søknad/steps/oppsummering/oppsummeringMessages';
import { validateApiDataMessages } from '../utils/søknadsdataToApiData/validateApiData';

const nb = {
    ...velkommenPageMessages.nb,
    ...omAnnenForelderMessages.nb,
    ...annenForelderenSituasjonMessages.nb,
    ...omBarnaMessages.nb,
    ...barnMessages.nb,
    ...oppsummeringMessages.nb,
    ...kvitteringMessages.nb,
    ...validateApiDataMessages.nb,

    'application.title': 'Søknad om ekstra omsorgsdager når den andre forelderen ikke kan ha tilsyn med barn',

    'step.omAnnenForelder.stepTitle': 'Om den andre forelderen',
    'step.annenForelderSituasjon.stepTitle': 'Den andre forelderens situasjon',
    'step.omBarna.stepTitle': 'Om barn',
    'step.oppsummering.stepTitle': 'Oppsummering',

    'initialLoadError.pageTitle': 'Det oppstod en feil',
    'initialLoadError.text.1': 'Det oppstod en feil under oppstarten av søknaden. Vennligst prøv igjen senere.',

    'resetMellomlagring.text.1': 'Dersom feilen vedvarer, kan du prøve å starte på nytt med et tom skjema.',
    'resetMellomlagring.startPåNytt': 'Start på nytt',
};

const nn: Record<keyof typeof nb, string> = { ...nb };

export const appMessages = {
    nb,
    nn,
};

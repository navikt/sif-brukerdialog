import { barnMessages } from '../pre-common/forms/barn/i18n';
import { kvitteringMessages } from '../pages/kvittering/i18n';
import { velkommenPageMessages } from '../pages/velkommen/i18n';
import { annenForelderenSituasjonMessages } from '../søknad/steps/annen-forelderens-situasjon/i18n';
import { omAnnenForelderMessages } from '../søknad/steps/om-annen-forelder/i18n';
import { omBarnaMessages } from '../søknad/steps/om-barna/i18n';
import { oppsummeringMessages } from '../søknad/steps/oppsummering/i18n';
import { validateApiDataMessages } from '../utils/søknadsdataToApiData/validateApiData';

export const appMessages_nb = {
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

    'resetMellomlagring.text.1': 'Dersom feilen vedvarer, kan du prøve å starte på nytt med et tomt skjema.',
    'resetMellomlagring.startPåNytt': 'Start på nytt',
};

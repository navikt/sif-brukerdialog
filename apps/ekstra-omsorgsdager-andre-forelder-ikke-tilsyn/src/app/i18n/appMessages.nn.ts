import { barnMessages } from '../pre-common/forms/barn/i18n';
import { kvitteringMessages } from '../pages/kvittering/i18n';
import { velkommenPageMessages } from '../pages/velkommen/i18n';
import { annenForelderenSituasjonMessages } from '../søknad/steps/annen-forelderens-situasjon/i18n';
import { omAnnenForelderMessages } from '../søknad/steps/om-annen-forelder/i18n';
import { omBarnaMessages } from '../søknad/steps/om-barna/i18n';
import { oppsummeringMessages } from '../søknad/steps/oppsummering/i18n';
import { validateApiDataMessages } from '../utils/søknadsdataToApiData/validateApiData';
import { appMessages_nb } from './appMessages.nb';

export const appMessages_nn: Record<keyof typeof appMessages_nb, string> = {
    ...velkommenPageMessages.nn,
    ...omAnnenForelderMessages.nn,
    ...annenForelderenSituasjonMessages.nn,
    ...omBarnaMessages.nn,
    ...barnMessages.nn,
    ...oppsummeringMessages.nn,
    ...kvitteringMessages.nn,
    ...validateApiDataMessages.nn,

    'application.title': 'Søknad om ekstra omsorgsdager når den andre forelderen ikke kan ha tilsyn med barn',

    'step.omAnnenForelder.stepTitle': 'Om den andre forelderen',
    'step.annenForelderSituasjon.stepTitle': 'Den andre forelderens situasjon',
    'step.omBarna.stepTitle': 'Om barn',
    'step.oppsummering.stepTitle': 'Oppsummering',

    'initialLoadError.pageTitle': 'Det oppstod ein feil',
    'initialLoadError.text.1': 'Det oppstod ein feil under oppstarten av søknaden. Ver venleg og prøv igjen senere.',

    'resetMellomlagring.text.1': 'Dersom feilen vedvarar, kan du prøve å starte på nytt med eit tomt skjema.',
    'resetMellomlagring.startPåNytt': 'Start på nytt',
};

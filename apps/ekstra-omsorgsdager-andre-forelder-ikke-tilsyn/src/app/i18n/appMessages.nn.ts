import { barnMessages_nn } from '../pre-common/forms/barn/i18n/nn';
import { kvitteringMessages_nn } from '../pages/kvittering/i18n/nn';
import { velkommenPageMessages_nn } from '../pages/velkommen/i18n/nn';
import { annenForelderenSituasjonMessages_nn } from '../søknad/steps/annen-forelderens-situasjon/i18n/nn';
import { omAnnenForelderMessages_nn } from '../søknad/steps/om-annen-forelder/i18n/nn';
import { omBarnaMessages_nn } from '../søknad/steps/om-barna/i18n/nn';
import { oppsummeringMessages_nn } from '../søknad/steps/oppsummering/i18n/nn';
import { appMessages_nb } from './appMessages.nb';

export const appMessages_nn: Record<keyof typeof appMessages_nb, string> = {
    ...velkommenPageMessages_nn,
    ...omAnnenForelderMessages_nn,
    ...annenForelderenSituasjonMessages_nn,
    ...omBarnaMessages_nn,
    ...barnMessages_nn,
    ...oppsummeringMessages_nn,
    ...kvitteringMessages_nn,

    'application.title': 'Søknad om ekstra omsorgsdager når den andre forelderen ikke kan ha tilsyn med barn',

    'step.omAnnenForelder.stepTitle': 'Om den andre forelderen',
    'step.annenForelderSituasjon.stepTitle': 'Den andre forelderens situasjon',
    'step.omBarna.stepTitle': 'Om barn',
    'step.oppsummering.stepTitle': 'Oppsummering',

    'initialLoadError.pageTitle': 'Det oppstod ein feil',
    'initialLoadError.text.1': 'Det oppstod ein feil under oppstarten av søknaden. Ver venleg og prøv igjen senere.',

    'resetMellomlagring.text.1': 'Dersom feilen vedvarar, kan du prøve å starte på nytt med eit tomt skjema.',
    'resetMellomlagring.startPåNytt': 'Start på nytt',

    'apiDataValidation.undefined': 'Det oppstod ein feil ved visning av sida.',
};

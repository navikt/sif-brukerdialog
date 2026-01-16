import { kvitteringMessages_nb } from '../pages/kvittering/i18n/nb';
import { velkommenPageMessages_nb } from '../pages/velkommen/i18n/nb';
import { barnMessages_nb } from '../pre-common/forms/barn/i18n/nb';
import { annenForelderenSituasjonMessages_nb } from '../søknad/steps/annen-forelderens-situasjon/i18n/nb';
import { omAnnenForelderMessages_nb } from '../søknad/steps/om-annen-forelder/i18n/nb';
import { omBarnaMessages_nb } from '../søknad/steps/om-barna/i18n/nb';
import { oppsummeringMessages_nb } from '../søknad/steps/oppsummering/i18n/nb';

export const appMessages_nb = {
    ...velkommenPageMessages_nb,
    ...omAnnenForelderMessages_nb,
    ...annenForelderenSituasjonMessages_nb,
    ...omBarnaMessages_nb,
    ...barnMessages_nb,
    ...oppsummeringMessages_nb,
    ...kvitteringMessages_nb,

    'application.title': 'Søknad om ekstra omsorgsdager når den andre forelderen ikke kan ha tilsyn med barn',

    'step.omAnnenForelder.stepTitle': 'Om den andre forelderen',
    'step.annenForelderSituasjon.stepTitle': 'Den andre forelderens situasjon',
    'step.omBarna.stepTitle': 'Om barn',
    'step.oppsummering.stepTitle': 'Oppsummering',

    'initialLoadError.pageTitle': 'Det oppstod en feil',
    'initialLoadError.text.1': 'Det oppstod en feil under oppstarten av søknaden. Vennligst prøv igjen senere.',

    'resetMellomlagring.text.1': 'Dersom feilen vedvarer, kan du prøve å starte på nytt med et tomt skjema.',
    'resetMellomlagring.startPåNytt': 'Start på nytt',

    'apiDataValidation.undefined': 'Det oppstod en feil ved visningen av siden.',

    'page.ikkeTilgang.tekst':
        'Du har ikke tilgang til denne siden. Dersom du er under 18 år, må en av foreldrene dine eller en foresatt skrive under på søknaden sammen med deg. Du må derfor fylle ut søknaden på papir og sende den i posten.',
    'page.ikkeTilgang.lastNed': 'Her kan du laste ned papirsøknaden',
};

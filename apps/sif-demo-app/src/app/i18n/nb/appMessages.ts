import { barnStepMessages_nb } from '../../steps/barn/i18n/nb';
import { oppsummeringStepMessages_nb } from '../../steps/oppsummering/i18n/nb';
import { vedleggStepMessages_nb } from '../../steps/vedlegg/i18n/nb';

export const appMessages_nb = {
    ...barnStepMessages_nb,
    ...vedleggStepMessages_nb,
    ...oppsummeringStepMessages_nb,
    'application.title': 'Søknad om ekstra omsorgsdager',
    '@soknad.loadingPage.henterInformasjon': 'Henter informasjon ...',
};

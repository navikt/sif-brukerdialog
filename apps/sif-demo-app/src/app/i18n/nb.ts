import { velkommenPageMessages_nb } from '../content/velkommen/i18n/nb';
import { barnStepMessages_nb } from '../steps/barn/i18n/nb';
import { bostedStegMessages_nb } from '../steps/bosted/i18n/nb';
import { oppsummeringStepMessages_nb } from '../steps/oppsummering/i18n/nb';
import { vedleggStepMessages_nb } from '../steps/vedlegg/i18n/nb';

export const appMessages_nb = {
    ...barnStepMessages_nb,
    ...bostedStegMessages_nb,
    ...vedleggStepMessages_nb,
    ...oppsummeringStepMessages_nb,
    ...velkommenPageMessages_nb,
    'application.title': 'Søknad om YTELSE',
    'kvittering.documentTitle': 'Søknad om YTELSE mottatt',
    'kvittering.title': 'Søknaden er sendt',
    'kvittering.message': 'Vi har fått søknaden din om penger gjennom [YTELSE].',
    'step.barn.title': 'Om barnet',
    'step.bosted.title': 'Bosted',
    'step.vedlegg.title': 'Vedlegg',
    'step.oppsummering.title': 'Oppsummering',
};

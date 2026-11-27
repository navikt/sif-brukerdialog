import { kvitteringMessages_nn } from '../pages/kvittering/i18n/nn';
import { velkommenPageMessages_nn } from '../pages/velkommen/i18n/nn';
import { appMessages_nb } from './nb';

export const appMessages_nn: Record<keyof typeof appMessages_nb, string> = {
    ...velkommenPageMessages_nn,
    ...kvitteringMessages_nn,
    'application.title': 'Søknad om ekstra omsorgsdagar ved åleineomsorg',
    'step.om-omsorgen-for-barn.title': 'Om åleineomsorg for barn',
    'step.tidspunkt-for-aleneomsorg.title': 'Tidspunkt for åleineomsorg',
    'step.oppsummering.title': 'Oppsummering',
    'kvittering.documentTitle': 'Søknad mottatt',
    'oppsummering.innsendingFeilet': 'Det oppstod ein feil under innsending. Ver venleg og prøv på nytt.',
};

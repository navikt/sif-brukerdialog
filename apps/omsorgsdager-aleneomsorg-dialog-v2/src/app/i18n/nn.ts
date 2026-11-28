import { kvitteringMessages_nn } from '../pages/kvittering/i18n/nn';
import { velkommenPageMessages_nn } from '../pages/velkommen/i18n/nn';
import { omOmsorgenForBarnMessages_nn } from '../steps/om-omsorgen-for-barn/i18n/nn';
import { oppsummeringStegMessages_nn } from '../steps/oppsummering/i18n/nn';
import { tidspunktForAleneomsorgMessages_nn } from '../steps/tidspunkt-for-aleneomsorg/i18n/nn';
import { appMessages_nb } from './nb';

export const appMessages_nn: Record<keyof typeof appMessages_nb, string> = {
    ...velkommenPageMessages_nn,
    ...kvitteringMessages_nn,
    ...omOmsorgenForBarnMessages_nn,
    ...tidspunktForAleneomsorgMessages_nn,
    ...oppsummeringStegMessages_nn,
    'application.title': 'Søknad om ekstra omsorgsdagar ved åleineomsorg',
    'step.om-omsorgen-for-barn.title': 'Om åleineomsorg for barn',
    'step.tidspunkt-for-aleneomsorg.title': 'Tidspunkt for åleineomsorg',
    'step.oppsummering.title': 'Oppsummering',
    'kvittering.documentTitle': 'Søknad mottatt',
};

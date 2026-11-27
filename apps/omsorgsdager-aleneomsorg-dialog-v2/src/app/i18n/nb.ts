import { kvitteringMessages_nb } from '../pages/kvittering/i18n/nb';
import { velkommenPageMessages_nb } from '../pages/velkommen/i18n/nb';
import { omOmsorgenForBarnMessages_nb } from '../steps/om-omsorgen-for-barn/i18n/nb';

export const appMessages_nb = {
    ...velkommenPageMessages_nb,
    ...kvitteringMessages_nb,
    ...omOmsorgenForBarnMessages_nb,
    'application.title': 'Søknad om ekstra omsorgsdager ved aleneomsorg',
    'step.om-omsorgen-for-barn.title': 'Om aleneomsorg for barn',
    'step.tidspunkt-for-aleneomsorg.title': 'Tidspunkt for aleneomsorg',
    'step.oppsummering.title': 'Oppsummering',
    'kvittering.documentTitle': 'Søknad mottatt',
    'oppsummering.innsendingFeilet': 'Det oppstod en feil under innsending. Vennligst prøv på nytt.',
};

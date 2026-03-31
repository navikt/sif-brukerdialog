import { deltBostedStegMessages_nb } from '../../steps/delt-bosted/i18n/nb';
import { legeerklæringStegMessages_nb } from '../../steps/legeerklæring/i18n/nb';
import { omBarnetStegMessages_nb } from '../../steps/om-barnet/i18n/nb';
import { oppsummeringStegMessages_nb } from '../../steps/oppsummering/i18n/nb';

export const appMessages_nb = {
    'application.title': 'Søknad om ekstra omsorgsdager ved kronisk sykt eller funksjonshemmet barn',
    'step.omBarnet.title': 'Om barnet',
    'step.legeerklaering.title': 'Legeerklæring',
    'step.deltBosted.title': 'Delt bosted',
    'step.oppsummering.title': 'Oppsummering',
    ...omBarnetStegMessages_nb,
    ...legeerklæringStegMessages_nb,
    ...deltBostedStegMessages_nb,
    ...oppsummeringStegMessages_nb,
};

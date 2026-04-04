import { kvitteringPageMessages_nb } from '../../pages/kvittering/i18n/nb';
import { velkommenPageMessages_nb } from '../../pages/velkommen/i18n/nb';
import { deltBostedStegMessages_nb } from '../../steps/delt-bosted/i18n/nb';
import { legeerklæringStegMessages_nb } from '../../steps/legeerklæring/i18n/nb';
import { omBarnetStegMessages_nb } from '../../steps/om-barnet/i18n/nb';
import { oppsummeringStegMessages_nb } from '../../steps/oppsummering/i18n/nb';

export const appMessages_nb = {
    'appForm.submitFeil.tittel': 'Noe gikk galt',
    'appForm.submitFeil.innhold': 'Sjekk at alle feltene er fylt ut og prøv igjen.',
    'application.title':
        'Søknad om ekstra omsorgsdager for barn som har kronisk/langvarig sykdom eller funksjonshemning',
    'step.omBarnet.title': 'Barn',
    'step.legeerklaering.title': 'Legeerklæring',
    'step.deltBosted.title': 'Delt fast bosted',
    'step.oppsummering.title': 'Oppsummering',
    ...omBarnetStegMessages_nb,
    ...legeerklæringStegMessages_nb,
    ...deltBostedStegMessages_nb,
    ...oppsummeringStegMessages_nb,
    ...kvitteringPageMessages_nb,
    ...velkommenPageMessages_nb,
};

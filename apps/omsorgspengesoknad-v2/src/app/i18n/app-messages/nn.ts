import { kvitteringPageMessages_nn } from '../../pages/kvittering/i18n/nn';
import { velkommenPageMessages_nn } from '../../pages/velkommen/i18n/nn';
import { deltBostedStegMessages_nn } from '../../steps/delt-bosted/i18n/nn';
import { legeerklæringStegMessages_nn } from '../../steps/legeerklæring/i18n/nn';
import { omBarnetStegMessages_nn } from '../../steps/om-barnet/i18n/nn';
import { oppsummeringStegMessages_nn } from '../../steps/oppsummering/i18n/nn';
import { appMessages_nb } from './nb';

export const appMessages_nn: Record<keyof typeof appMessages_nb, string> = {
    'appForm.submitFeil.tittel': 'Noe gikk galt',
    'appForm.submitFeil.innhold': 'Sjekk at alle feltene er fylt ut og prøv igjen.',
    'application.title':
        'Søknad om ekstra omsorgsdagar for barn som har kronisk/langvarig sjukdom eller funksjonshemming',
    'step.omBarnet.title': 'Barn',
    'step.legeerklaering.title': 'Legeerklæring',
    'step.deltBosted.title': 'Delt fast bustad',
    'step.oppsummering.title': 'Samandrag',
    ...omBarnetStegMessages_nn,
    ...legeerklæringStegMessages_nn,
    ...deltBostedStegMessages_nn,
    ...oppsummeringStegMessages_nn,
    ...kvitteringPageMessages_nn,
    ...velkommenPageMessages_nn,
};

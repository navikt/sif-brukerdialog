import { kvitteringMessages } from '../pages/kvittering/kvitteringMesssages';
import { velkommenPageMessages } from '../pages/velkommen/velkommenPageMessages';
import { deltBostedMessages } from '../søknad/steps/delt-bosted/deltBostedMessages';
import { legeerklæringMessages } from '../søknad/steps/legeerklæring/legeerklæringMessages';
import { omBarnetMessages } from '../søknad/steps/om-barnet/omBarnetMessages';
import { oppsummeringMessages } from '../søknad/steps/oppsummering/oppsummeringMessages';

const nb = {
    ...kvitteringMessages.nb,
    ...velkommenPageMessages.nb,
    ...deltBostedMessages.nb,
    ...legeerklæringMessages.nb,
    ...omBarnetMessages.nb,
    ...oppsummeringMessages.nb,
};

const nn: Record<keyof typeof nb, string> = {
    ...kvitteringMessages.nn,
    ...velkommenPageMessages.nn,
    ...deltBostedMessages.nn,
    ...legeerklæringMessages.nn,
    ...omBarnetMessages.nn,
    ...oppsummeringMessages.nn,
};

export const componentMessages = {
    nb,
    nn,
};

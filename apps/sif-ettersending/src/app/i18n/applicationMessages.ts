import { MessageFileFormat } from '@navikt/sif-common-core-ds/lib/types/MessageFileFormat';
import { allCommonMessages } from '@navikt/sif-common-core-ds/lib/i18n/allCommonMessages';

const appBokmålstekster = require('./nb.json');
const appNynorsktekster = require('./nn.json');

export const appMessages = {
    nb: appBokmålstekster,
    nn: appNynorsktekster,
};

const bokmålstekster = { ...appBokmålstekster, ...allCommonMessages.nb };
// const nynorsktekster = { ...appNynorsktekster, ...allCommonMessages.nn };

export const applicationIntlMessages: MessageFileFormat = {
    nb: bokmålstekster,
    // nn: nynorsktekster,
};

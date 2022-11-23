import { MessageFileFormat } from '@navikt/sif-common-core-ds/lib/types/MessageFileFormat';
import { allCommonMessages } from '@navikt/sif-common-core-ds/lib/i18n/allCommonMessages';
import soknadErrorIntlMessages from '@navikt/sif-common-soknad-ds/lib/soknad-error-messages/soknadErrorIntlMessages';
import soknadIntlMessages from '@navikt/sif-common-soknad-ds/lib/soknad-intl-messages/soknadIntlMessages';

const appBokmålstekster = require('./nb.json');
// const appNynorsktekster = require('./nn.json');

const bokmålstekster = {
    ...appBokmålstekster,
    ...allCommonMessages.nb,
    ...soknadErrorIntlMessages.nb,
    ...soknadIntlMessages.nb,
};
// const nynorsktekster = { ...appNynorsktekster, ...allCommonMessages.nn, ...soknadErrorIntlMessages.nn, ...soknadIntlMessages.nn, };

export const applicationIntlMessages: MessageFileFormat = {
    nb: bokmålstekster,
    // nn: nynorsktekster,
};

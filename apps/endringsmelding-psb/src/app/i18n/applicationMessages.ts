import { MessageFileFormat } from '@navikt/sif-common-core-ds/lib/types/MessageFileFormat';
import { allCommonMessages } from '@navikt/sif-common-core-ds/lib/i18n/allCommonMessages';
import soknadIntlMessages from '@navikt/sif-common-soknad-ds/lib/soknad-intl-messages/soknadIntlMessages';

const appMessagesNB = require('./nb.json');

const bokmålstekster = {
    ...allCommonMessages.nb,
    ...soknadIntlMessages.nb,
    ...appMessagesNB,
};

export const applicationIntlMessages: MessageFileFormat = {
    nb: bokmålstekster,
};

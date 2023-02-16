import { MessageFileFormat } from '@navikt/sif-common-core-ds/lib/types/MessageFileFormat';
import { allCommonMessages } from '@navikt/sif-common-core-ds/lib/i18n/allCommonMessages';
import soknadIntlMessages from '@navikt/sif-common-soknad-ds/lib/soknad-intl-messages/soknadIntlMessages';
import { velkommenPageMessages } from '../pages/velkommen-page/velkommenPageMessages';
import barnMessages from '../pre-common/forms/barn/barnMessages';
const appMessagesNB = require('./nb.json');

const bokmålstekster = {
    ...allCommonMessages.nb,
    ...appMessagesNB,
    ...barnMessages.nb,
    ...soknadIntlMessages.nb,
    ...velkommenPageMessages.nb,
};
export const applicationIntlMessages: MessageFileFormat = {
    nb: bokmålstekster,
};

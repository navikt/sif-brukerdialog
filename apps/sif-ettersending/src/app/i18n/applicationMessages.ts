import { allCommonMessages } from '@navikt/sif-common-core-ds/lib/i18n/allCommonMessages';
import { MessageFileFormat } from '@navikt/sif-common-core-ds/lib/types/MessageFileFormat';
import { soknadErrorIntlMessages, soknadIntlMessages } from '@navikt/sif-common-soknad-ds';
import { velkommenPageMessages } from '../pages/velkommen-page/velkommenPageMessages';
import { appMessagesNb } from './nb';

const bokmålstekster = {
    ...appMessagesNb,
    ...allCommonMessages.nb,
    ...velkommenPageMessages.nb,
    ...soknadErrorIntlMessages.nb,
    ...soknadIntlMessages.nb,
};

export const applicationIntlMessages: MessageFileFormat = {
    nb: bokmålstekster,
};

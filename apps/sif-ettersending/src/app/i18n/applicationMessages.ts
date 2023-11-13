import { allCommonMessages } from '@navikt/sif-common-core-ds/lib/i18n/allCommonMessages';
import { MessageFileFormat } from '@navikt/sif-common-core-ds/lib/types/MessageFileFormat';
import { soknadErrorIntlMessages, soknadIntlMessages } from '@navikt/sif-common-soknad-ds';
import { velkommenPageMessages } from '../pages/velkommen-page/velkommenPageMessages';
import { applicationMessagesNb } from './nb';

const bokmålstekster = {
    ...applicationMessagesNb,
    ...allCommonMessages.nb,
    ...velkommenPageMessages.nb,
    ...soknadErrorIntlMessages.nb,
    ...soknadIntlMessages.nb,
};

export const applicationIntlMessages: MessageFileFormat = {
    nb: bokmålstekster,
};

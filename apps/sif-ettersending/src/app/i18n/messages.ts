import { allCommonMessages } from '@navikt/sif-common-core-ds/src/i18n/allCommonMessages';
import { MessageFileFormat } from '@navikt/sif-common-core-ds/src/types/MessageFileFormat';
import { soknadIntlMessages } from '@navikt/sif-common-soknad-ds';
import { velkommenPageMessages } from '../pages/velkommen-page/velkommenPageMessages';
import { applicationMessages } from './nb';

const bokmålstekster = {
    ...allCommonMessages.nb,
    ...velkommenPageMessages.nb,
    ...soknadIntlMessages.nb,
    ...velkommenPageMessages.nb,
    ...applicationMessages.nb,
};

export const applicationIntlMessages: MessageFileFormat = {
    nb: bokmålstekster,
};

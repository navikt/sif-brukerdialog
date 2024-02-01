import { commonMessages } from '@navikt/sif-common-core-ds/src/i18n/common.messages';
import { MessageFileFormat } from '@navikt/sif-common-core-ds/src/types/MessageFileFormat';
import { soknadMessages } from '@navikt/sif-common-soknad-ds';
import { velkommenPageMessages } from '../pages/velkommen-page/velkommenPageMessages';
import { applicationMessages } from './nb';
import { uiMessages } from '@navikt/sif-common-ui';

const bokmålstekster = {
    ...commonMessages.nb,
    ...uiMessages.nb,
    ...velkommenPageMessages.nb,
    ...soknadMessages.nb,
    ...velkommenPageMessages.nb,
    ...applicationMessages.nb,
};

export const applicationIntlMessages: MessageFileFormat = {
    nb: bokmålstekster,
};

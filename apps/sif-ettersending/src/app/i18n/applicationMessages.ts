import { allCommonMessages } from '@navikt/sif-common-core-ds/lib/i18n/allCommonMessages';
import { MessageFileFormat } from '@navikt/sif-common-core-ds/lib/types/MessageFileFormat';
import soknadErrorIntlMessages from '@navikt/sif-common-soknad-ds/lib/soknad-error-messages/soknadErrorIntlMessages';
import soknadIntlMessages from '@navikt/sif-common-soknad-ds/lib/soknad-intl-messages/soknadIntlMessages';
import { velkommenPageMessages } from '../pages/velkommen-page/velkommenPageMessages';

const appBokmålstekster = require('./nb.json');

const bokmålstekster = {
    ...appBokmålstekster,
    ...allCommonMessages.nb,
    ...velkommenPageMessages.nb,
    ...soknadErrorIntlMessages.nb,
    ...soknadIntlMessages.nb,
};

export const applicationIntlMessages: MessageFileFormat = {
    nb: bokmålstekster,
};

import { MessageFileFormat } from '@navikt/sif-common-core-ds/lib/types/MessageFileFormat';
import { allCommonMessages } from '@navikt/sif-common-core-ds/lib/i18n/allCommonMessages';
import soknadIntlMessages from '@navikt/sif-common-soknad-ds/lib/soknad-intl-messages/soknadIntlMessages';
import { medlemskapStepMessages } from '../søknad/steps/medlemskap/medlemskapStepMessages';
import { velkommenPageMessages } from '../pages/velkommen/velkommenPageMessages';

const appMessagesNB = require('./nb.json');

const bokmålstekster = {
    ...allCommonMessages.nb,
    ...soknadIntlMessages.nb,
    ...medlemskapStepMessages.nb,
    ...velkommenPageMessages.nb,
    ...appMessagesNB,
};

export const applicationIntlMessages: MessageFileFormat = {
    nb: bokmålstekster,
};

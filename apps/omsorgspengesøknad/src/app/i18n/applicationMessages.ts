import { MessageFileFormat } from '@navikt/sif-common-core-ds/lib/types/MessageFileFormat';
import { allCommonMessages } from '@navikt/sif-common-core-ds/lib/i18n/allCommonMessages';
import soknadIntlMessages from '@navikt/sif-common-soknad-ds/lib/soknad-intl-messages/soknadIntlMessages';
import { omBarnetStegMessages } from '../søknad/steps/om-barnet/i18n/stegOmBarnetMessages';
import { personalOpplysningerMessages } from '../pages/velkommen/personalopplysninger/personalopplysninger.messages';

const appMessagesNB = require('./nb.json');

const bokmålstekster = {
    ...allCommonMessages.nb,
    ...soknadIntlMessages.nb,
    ...omBarnetStegMessages.nb,
    ...personalOpplysningerMessages.nb,
    ...appMessagesNB,
};

export const applicationIntlMessages: MessageFileFormat = {
    nb: bokmålstekster,
};

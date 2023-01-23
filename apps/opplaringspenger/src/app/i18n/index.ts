import { MessageFileFormat } from '@navikt/sif-common-core-ds/lib/types/MessageFileFormat';
import { allCommonMessages } from '@navikt/sif-common-core-ds/lib/i18n/allCommonMessages';
import soknadIntlMessages from '@navikt/sif-common-soknad-ds/lib/soknad-intl-messages/soknadIntlMessages';
import { omBarnetMessages } from '../søknad/steps/om-barnet/stegOmBarnetMessages';
import { personalOpplysningerMessages } from '../pages/velkommen/personalopplysninger/personalopplysninger.messages';
import { velkommenPageMessages } from '../pages/velkommen/velkommenPageMessages';
import { oppsummeringMessages } from '../søknad/steps/oppsummering/oppsummeringMessages';
import { appMessages } from './appMessages';

const bokmålstekster = {
    ...allCommonMessages.nb,
    ...soknadIntlMessages.nb,
    ...personalOpplysningerMessages.nb,
    ...velkommenPageMessages.nb,
    ...omBarnetMessages.nb,
    ...oppsummeringMessages.nb,
    ...appMessages.nb,
};

export const applicationIntlMessages: MessageFileFormat = {
    nb: bokmålstekster,
};

import { MessageFileFormat } from '@navikt/sif-common-core-ds/src/types/MessageFileFormat';
import { soknadIntlMessages } from '@navikt/sif-common-soknad-ds';
import { velkommenPageMessages } from '../pages/velkommen-page/velkommenPageMessages';
import { applicationMessages } from './nb';
import { pictureScanningGuideMessages } from '@navikt/sif-common-core-ds/src/components/picture-scanning-guide/i18n/pictureScanningGuideMessages';

const bokmålstekster = {
    ...velkommenPageMessages.nb,
    ...soknadIntlMessages.nb,
    ...velkommenPageMessages.nb,
    ...applicationMessages.nb,
    ...pictureScanningGuideMessages.nb,
};

export const applicationIntlMessages: MessageFileFormat = {
    nb: bokmålstekster,
};

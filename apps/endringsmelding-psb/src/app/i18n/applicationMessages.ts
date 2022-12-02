import { allCommonMessages } from '@navikt/sif-common-core-ds/lib/i18n/allCommonMessages';
import { MessageFileFormat } from '@navikt/sif-common-core-ds/lib/types/MessageFileFormat';
import soknadIntlMessages from '@navikt/sif-common-soknad-ds/lib/soknad-intl-messages/soknadIntlMessages';
import { arbeidstidPeriodeMessages } from '../søknad/steps/arbeidstid/arbeid-i-periode/arbeidIPeriodeMessages';
import { defaultMessages } from './defaultMessages';

const bokmålstekster = {
    ...allCommonMessages.nb,
    ...soknadIntlMessages.nb,
    ...arbeidstidPeriodeMessages.nb,
    ...defaultMessages.nb,
};

export const applicationIntlMessages: MessageFileFormat = {
    nb: bokmålstekster,
};

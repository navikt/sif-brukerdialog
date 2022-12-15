import { allCommonMessages } from '@navikt/sif-common-core-ds/lib/i18n/allCommonMessages';
import { MessageFileFormat } from '@navikt/sif-common-core-ds/lib/types/MessageFileFormat';
import soknadIntlMessages from '@navikt/sif-common-soknad-ds/lib/soknad-intl-messages/soknadIntlMessages';
import { arbeidstidPeriodeMessages } from '../søknad/steps/arbeidstid/arbeid-i-periode-form/arbeidIPeriodeMessages';
import { arbeidstidStepMessages } from '../søknad/steps/arbeidstid/arbeidstidStepMessages';
import { defaultMessages } from './messages';

const bokmålstekster = {
    ...allCommonMessages.nb,
    ...soknadIntlMessages.nb,
    ...arbeidstidPeriodeMessages.nb,
    ...arbeidstidStepMessages.nb,
    ...defaultMessages.nb,
};

export const applicationIntlMessages: MessageFileFormat = {
    nb: bokmålstekster,
};

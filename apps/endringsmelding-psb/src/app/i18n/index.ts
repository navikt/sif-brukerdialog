import { allCommonMessages } from '@navikt/sif-common-core-ds/lib/i18n/allCommonMessages';
import { MessageFileFormat } from '@navikt/sif-common-core-ds/lib/types/MessageFileFormat';
import soknadIntlMessages from '@navikt/sif-common-soknad-ds/lib/soknad-intl-messages/soknadIntlMessages';
import { arbeidstidEnkeltukeMessages } from '../components/arbeidstid-enkeltuke-form/arbeidstidEnkeltukeMessages';
import { arbeidstidStepMessages } from '../søknad/steps/arbeidstid/arbeidstidStepMessages';
import { defaultMessages } from './messages';

const bokmålstekster = {
    ...allCommonMessages.nb,
    ...soknadIntlMessages.nb,
    ...arbeidstidEnkeltukeMessages.nb,
    ...arbeidstidStepMessages.nb,
    ...defaultMessages.nb,
};

export const applicationIntlMessages: MessageFileFormat = {
    nb: bokmålstekster,
};

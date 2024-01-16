import { MessageFileFormat } from '@navikt/sif-common-core-ds/src/types/MessageFileFormat';
import { SoknadIntlMessagesType } from '@navikt/sif-common-soknad-ds/src/i18n/soknadIntlMessages';

const nb: Partial<SoknadIntlMessagesType> = {
    'scs.soknadErrorMessages.applicationUnavailable.title': 'Endringsmeldingen er dessverre ikke tilgjengelig',
    'scs.soknadErrorMessages.applicationUnavailable.content':
        'Vi jobber så raskt vi kan med å få den tilgjengelig. Vennligst kom tilbake litt senere.',
};

export const sifCommonSoknadOverrideMessages: MessageFileFormat = {
    nb,
};

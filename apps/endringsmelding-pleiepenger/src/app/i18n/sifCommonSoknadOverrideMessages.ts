import { MessageFileFormat } from '@navikt/sif-common-core-ds/src/types/MessageFileFormat';
import { SoknadMessagesType } from '@navikt/sif-common-soknad-ds';

const nb: Partial<SoknadMessagesType> = {
    'scs.soknadErrorMessages.applicationUnavailable.title': 'Endringsmeldingen er dessverre ikke tilgjengelig',
    'scs.soknadErrorMessages.applicationUnavailable.content':
        'Vi jobber så raskt vi kan med å få den tilgjengelig. Vennligst kom tilbake litt senere.',
};

export const sifCommonSoknadOverrideMessages: MessageFileFormat = {
    nb,
};

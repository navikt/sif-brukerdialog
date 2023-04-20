import { MessageFileFormat } from '@navikt/sif-common-core-ds/lib/types/MessageFileFormat';
import { samtykkeFormMessages } from '../modules/samtykke-form/samtykkeFormMessages';
import soknadErrorIntlMessages from './error-messages/soknadErrorIntlMessages';

const soknadIntlMessages: MessageFileFormat = {
    nb: {
        'sif-common-soknad.tilbakeLenke': 'Tilbake til {title}',
        ...samtykkeFormMessages.nb,
        ...soknadErrorIntlMessages.nb,
    },
    nn: {
        'sif-common-soknad.tilbakeLenke': 'Tilbake til {title}',
        ...soknadErrorIntlMessages.nn,
    },
};

export default soknadIntlMessages;

import { MessageFileFormat } from '@navikt/sif-common-core/lib/dev-utils/intl/devIntlUtils';
import soknadErrorIntlMessages from '../soknad-error-messages/soknadErrorIntlMessages';

const soknadIntlMessages: MessageFileFormat = {
    nb: {
        'sif-common-soknad.tilbakeLenke': 'Tilbake til {title}',
        ...soknadErrorIntlMessages.nb,
    },
    nn: {
        'sif-common-soknad.tilbakeLenke': 'Tilbake til {title}',
        ...soknadErrorIntlMessages.nn,
    },
};

export default soknadIntlMessages;

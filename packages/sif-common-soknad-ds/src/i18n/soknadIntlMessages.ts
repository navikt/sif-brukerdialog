import { MessageFileFormat } from '@navikt/sif-common-core-ds/src/types/MessageFileFormat';
import { samtykkeFormMessages } from '../modules/samtykke-form/samtykkeFormMessages';
import soknadErrorIntlMessages from './error-messages/soknadErrorIntlMessages';
import { avbrytSøknadDialogMessages } from '../components/avbrytSøknadDialog/avbrytSøknadDialogMessages';
import { fortsettSøknadSenereDialogMessages } from '../components/fortsettSøknadSenereDialog/fortsettSøknadSenereDialogMessages';

const soknadIntlMessages: MessageFileFormat = {
    nb: {
        'sif-common-soknad.tilbakeLenke': 'Tilbake til {title}',
        ...samtykkeFormMessages.nb,
        ...soknadErrorIntlMessages.nb,
        ...avbrytSøknadDialogMessages.nb,
        ...fortsettSøknadSenereDialogMessages.nb,
    },
    nn: {
        'sif-common-soknad.tilbakeLenke': 'Tilbake til {title}',
        ...soknadErrorIntlMessages.nn,
    },
};

export default soknadIntlMessages;

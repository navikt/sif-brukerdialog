import { MessageFileFormat } from '@navikt/sif-common-core-ds/src/types/MessageFileFormat';
import { soknadIntlMessages } from '@navikt/sif-common-soknad-ds';
import { velkommenPageMessages } from '../pages/velkommen-page/velkommenPageMessages';
import { applicationMessages } from './nb';
import { pictureScanningGuideMessages } from '@navikt/sif-common-core-ds/src/components/picture-scanning-guide/i18n/pictureScanningGuideMessages';

type Messages = { [key: string]: string };

const joinMessages = (messages: Messages[]): Messages => {
    const cleanedMessages = {};
    messages.forEach((message) => {
        Object.keys(message).forEach((key) => {
            if (cleanedMessages[key]) {
                // eslint-disable-next-line no-console
                console.log('Duplicate key: ' + key);
            } else {
                cleanedMessages[key] = message[key];
            }
        });
    });
    return cleanedMessages;
};

const messages = joinMessages([
    velkommenPageMessages.nb,
    soknadIntlMessages.nb,
    applicationMessages.nb,
    pictureScanningGuideMessages.nb,
]);

// declare global {
//     // eslint-disable-next-line @typescript-eslint/no-namespace
//     namespace FormatjsIntl {
//         interface Message {
//             ids: keyof typeof bokmålstekster;
//         }
//     }
// }

export const applicationIntlMessages: MessageFileFormat = {
    nb: messages,
};

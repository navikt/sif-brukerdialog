import { appMessages } from '../../app/i18n/appMessages';
import { MessageFileFormat } from '@navikt/sif-common-core-ds/src/types';

const getIntlMessagesFromKeys = (keys: string[]): MessageFileFormat => {
    const messages: MessageFileFormat = {
        nb: {},
        nn: {},
    };
    keys.map((k) => {
        messages.nb[k] = appMessages.nb[k];
        messages.nn[k] = appMessages.nn[k];
    });

    return messages;
};

const getValidationIntlKeys = (keys: string[], intlKeyPath: string) => {
    return keys.map((key) => `${intlKeyPath}.${key}`);
};

const getScopedIntlKeys = (scope: string): string[] => {
    return Object.keys(appMessages.nb).filter((key) => key.includes(scope));
};

const getScopedMessages = (scope: string): MessageFileFormat => {
    return getIntlMessagesFromKeys(getScopedIntlKeys(scope));
};

export const storybookIntlUtils = {
    getIntlMessagesFromKeys,
    getScopedIntlKeys,
    getScopedMessages,
    getValidationIntlKeys,
};

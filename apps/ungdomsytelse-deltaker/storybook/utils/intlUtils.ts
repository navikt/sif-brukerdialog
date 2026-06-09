import { applicationIntlMessages } from '../../src/i18n';

type MessageFileFormat = { nb: Record<string, string>; nn: Record<string, string> };

const getIntlMessagesFromKeys = (keys: string[]): MessageFileFormat => {
    const messages: MessageFileFormat = {
        nb: {},
        nn: {},
    };
    keys.map((k) => {
        messages.nb[k] = applicationIntlMessages.nb[k];
        messages.nn[k] = applicationIntlMessages.nn[k];
    });

    return messages;
};

const getValidationIntlKeys = (keys: string[], intlKeyPath: string) => {
    return keys.map((key) => `${intlKeyPath}.${key}`);
};

const getScopedIntlKeys = (scope: string): string[] => {
    return Object.keys(applicationIntlMessages.nb).filter((key) => key.includes(scope));
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

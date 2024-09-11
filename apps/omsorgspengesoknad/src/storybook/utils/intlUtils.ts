import { appMessages } from '../../app/i18n/appMessages';
import { MessageFileFormat } from '@navikt/sif-common-core-ds/src/types';

export const getIntlMessagesFromKeys = (keys: string[]): MessageFileFormat => {
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

export const getValidationIntlKeys = (keys: string[], intlKeyPath: string) => {
    return keys.map((key) => `${intlKeyPath}.${key}`);
};

export const getScopedIntlKeys = (scope: string): string[] => {
    return Object.keys(appMessages.nb).filter((key) => key.includes(scope));
};

export const includesString = (str: string, searchFor: string | string[]): boolean => {
    return Array.isArray(searchFor) ? searchFor.some((subStr) => str.includes(subStr)) : str.includes(searchFor);
};

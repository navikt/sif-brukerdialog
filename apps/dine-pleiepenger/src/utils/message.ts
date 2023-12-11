import { DecoratorLocale } from '@navikt/nav-dekoratoren-moduler';

import messagesNb from '../translations/nb.json';

export type Messages = {
    [K in DecoratorLocale]?: { [name: string]: string };
};

export function flattenMessages(nestedMessages: object, prefix = '') {
    return Object.keys(nestedMessages).reduce((messages, key) => {
        // @ts-ignore
        const value = nestedMessages[key];
        const prefixedKey = prefix ? `${prefix}.${key}` : key;

        if (typeof value === 'string') {
            // @ts-ignore
            messages[prefixedKey] = value;
        } else {
            Object.assign(messages, flattenMessages(value, prefixedKey));
        }

        return messages;
    }, {});
}

export const messages: Messages = {
    nb: flattenMessages(messagesNb),
};

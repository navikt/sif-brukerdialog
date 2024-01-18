interface KeyValue {
    [key: string]: string;
}

export interface MessageFileFormat {
    [locale: string]: {
        [key: string]: string;
    };
}
export interface MultilocaleMessages {
    [key: string]: KeyValue;
}

export const createMultiLocaleObject = (messages: MessageFileFormat): MultilocaleMessages => {
    const locales = Object.keys(messages);
    let allKeys = {};
    locales.forEach((locale) => {
        allKeys = { ...allKeys, ...messages[locale] };
    });

    const multiKeyLocale: MultilocaleMessages = {};
    Object.keys(allKeys).forEach((stringKey) => {
        if (!multiKeyLocale[stringKey]) {
            multiKeyLocale[stringKey] = {};
        }
        locales.forEach((locale) => (multiKeyLocale[stringKey][locale] = messages[locale][stringKey]));
    });
    return multiKeyLocale;
};

export const getMissingMessageKeys = (messages: MultilocaleMessages): KeyValue | undefined => {
    const missingKeys: KeyValue = {};
    const keys = Object.keys(messages);
    keys.forEach((key) => {
        const missingLocaleForKey = Object.keys(messages[key]).find((locale) => {
            return messages[key][locale] === undefined;
        });
        if (missingLocaleForKey) {
            missingKeys[key] = missingLocaleForKey;
        }
    });

    if (Object.keys(missingKeys).length > 0) {
        return missingKeys;
    }

    return undefined;
};

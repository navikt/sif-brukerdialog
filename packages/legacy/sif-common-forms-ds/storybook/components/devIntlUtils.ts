import { ValidationError } from '@navikt/sif-common-formik-ds';
import { ValidationErrorMessagesDocType } from './validation-error-messages/ValidationErrorMessages';

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

export const createFieldErrorIntlKey = (error: ValidationError, fieldName: string, errorPrefix?: string): string =>
    `${errorPrefix ? `${errorPrefix}.` : ''}${fieldName}.${error}`;

export const getValidationErrorMessages = ({
    intlMessages,
    formName,
    validationErrorIntlKeys,
    validationErrors,
}: {
    intlMessages: MessageFileFormat;
    formName?: string;
    validationErrors?: ValidationErrorMessagesDocType;
    validationErrorIntlKeys?: { [key: string]: string };
}) => {
    const validationMessages: MessageFileFormat = {
        nb: {},
        nn: {},
    };

    if (validationErrors) {
        const fields = validationErrors.fields;

        Object.keys(fields).forEach((field) =>
            Object.keys(fields[field]).forEach((errorKey) => {
                const error = fields[field][errorKey];
                const intlKey = createFieldErrorIntlKey(error, field, formName);
                validationMessages['nb'][intlKey] = intlMessages['nb'][intlKey];
                validationMessages['nn'][intlKey] = intlMessages['nn'][intlKey];
            }),
        );
    }

    if (validationErrorIntlKeys) {
        Object.keys(validationErrorIntlKeys).forEach((key) => {
            const intlKey = validationErrorIntlKeys[key];
            validationMessages['nb'][intlKey] = intlMessages['nb'][intlKey];
            validationMessages['nn'][intlKey] = intlMessages['nn'][intlKey];
        });
    }

    return validationMessages;
};

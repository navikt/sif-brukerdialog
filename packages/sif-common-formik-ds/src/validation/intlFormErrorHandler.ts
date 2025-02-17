import { IntlShape } from 'react-intl';
import { CustomFormErrorHandler, FieldErrorHandler } from '../types';
import { isIntlErrorObject, ValidationError } from './types';

const createFieldErrorIntlKey = (
    error: string,
    fieldName: string,
    keySeparator: string,
    errorPrefix?: string,
): string => `${errorPrefix ? `${errorPrefix}${keySeparator}` : ''}${fieldName}${keySeparator}${error}`;

const getFieldErrorHandler =
    (intl: IntlShape, keySeparator: string, errorPrefix?: string): FieldErrorHandler<ValidationError> =>
    (error: ValidationError, fieldName: string) => {
        return isIntlErrorObject(error)
            ? intl.formatMessage(
                  {
                      id: error.keepKeyUnaltered
                          ? error.key
                          : createFieldErrorIntlKey(error.key, fieldName, keySeparator, errorPrefix),
                  },
                  error.values,
              )
            : intl.formatMessage({ id: createFieldErrorIntlKey(error, fieldName, keySeparator, errorPrefix) });
    };

export const getIntlFormErrorHandler = (
    intl: IntlShape,
    errorPrefix?: string,
): CustomFormErrorHandler<ValidationError> => ({
    fieldErrorHandler: getFieldErrorHandler(intl, '.', errorPrefix),
    isHandledErrorTypeFunc: (error) => isIntlErrorObject(error) || typeof error === 'string',
});

export const getIntlFormErrorHandler_underscoreKeys = (
    intl: IntlShape,
    errorPrefix?: string,
): CustomFormErrorHandler<ValidationError> => ({
    fieldErrorHandler: getFieldErrorHandler(intl, '_', errorPrefix),
    isHandledErrorTypeFunc: isIntlErrorObject,
});

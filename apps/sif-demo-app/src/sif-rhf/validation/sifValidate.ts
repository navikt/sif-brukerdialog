import { IntlShape, useIntl } from 'react-intl';

type SifValidator = (value: any) => string | undefined;

export const sifValidate = (
    validator: SifValidator,
    fieldName: string,
    intl: IntlShape,
    errorPrefix = 'validation',
): ((value: any) => string | undefined) => {
    return (value) => {
        const errorCode = validator(value);
        if (errorCode) {
            return intl.formatMessage({ id: `${errorPrefix}.${fieldName}.${errorCode}` });
        }
        return undefined;
    };
};

export const useSifValidate = (errorPrefix = 'validation') => {
    const intl = useIntl();
    return {
        validateField: (fieldName: string, validator: SifValidator) =>
            sifValidate(validator, fieldName, intl, errorPrefix),
    };
};

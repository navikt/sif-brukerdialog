import { IntlShape, useIntl } from 'react-intl';

type SifValidator = (value: any) => string | undefined;
type SifValidationMessageValues = Record<string, string | number | boolean | null | undefined | Date>;
type SifValidationValues = SifValidationMessageValues | ((errorCode: string) => SifValidationMessageValues | undefined);

export const sifValidate = (
    validator: SifValidator,
    fieldName: string,
    intl: IntlShape,
    scope: string,
    values?: SifValidationValues,
): ((value: any) => string | undefined) => {
    return (value) => {
        const errorCode = validator(value);
        if (errorCode) {
            const messageValues = typeof values === 'function' ? values(errorCode) : values;
            return intl.formatMessage({ id: `${scope}.validation.${fieldName}.${errorCode}` }, messageValues);
        }
        return undefined;
    };
};

export const useSifValidate = (scope: string) => {
    const intl = useIntl();
    return {
        validateField: (fieldName: string, validator: SifValidator, values?: SifValidationValues) =>
            sifValidate(validator, fieldName, intl, scope, values),
    };
};

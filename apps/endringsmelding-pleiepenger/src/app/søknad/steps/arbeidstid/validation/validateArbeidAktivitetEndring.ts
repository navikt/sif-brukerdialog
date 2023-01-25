import { ValidationFunction } from '@navikt/sif-common-formik-ds/lib';
import { hasValue } from '@navikt/sif-common-formik-ds/lib/validation/validationUtils';
import { ArbeidAktivitet } from '../../../../types/Sak';

export enum ValidateRequiredFieldError {
    'noValue' = 'noValue',
}

type RequiredFieldValidationResult = ValidateRequiredFieldError.noValue | undefined;

const getValidateArbeidAktivitetEndring =
    (arbeidAktivitet: ArbeidAktivitet): ValidationFunction<RequiredFieldValidationResult> =>
    (value: any) => {
        if (hasValue(value) === false) {
            return ValidateRequiredFieldError.noValue;
        }
        /** ToDo - validere opp mot normaltid */
        return undefined;
    };

export default getValidateArbeidAktivitetEndring;

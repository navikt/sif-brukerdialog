import { useEffect, useRef } from 'react';
import { FieldErrors, FieldValues, useFormContext } from 'react-hook-form';
import { ErrorSummaryFp } from '../fp/ErrorSummaryFp';

const findAllErrors = (errors: FieldErrors<FieldValues>): FieldErrors<FieldValues> => {
    return Object.keys(errors).reduce<FieldErrors<FieldValues>>((acc, fieldKey) => {
        const fieldValue = errors[fieldKey];

        if (fieldValue?.message && !acc[fieldKey]) {
            const shouldNotAdd = Object.keys(acc).some((key) => acc[key]?.message === fieldValue?.message);
            if (shouldNotAdd) {
                return acc;
            }
            return {
                ...acc,
                [fieldKey]: errors[fieldKey],
            };
        }

        if (Array.isArray(fieldValue)) {
            const alle = fieldValue.reduce((a, f) => {
                return {
                    ...(f ? findAllErrors(f) : {}),
                    ...a,
                };
            }, {});
            return {
                ...acc,
                ...alle,
            };
        }
        return acc;
    }, {});
};

export const ErrorSummaryHookForm = () => {
    const errorRef = useRef<HTMLDivElement>(null);

    const {
        formState: { errors },
    } = useFormContext();

    useEffect(() => {
        if (errorRef?.current) {
            errorRef.current.focus();
        }
    }, [errors]);

    const flattenAndUniqueErrors = findAllErrors(errors);

    // TODO Denne er ikkje optimal
    const mappedErrors = Object.values(flattenAndUniqueErrors).map((error) => ({
        message: error?.message?.toString(),
        //@ts-ignore TODO Burde nok heller bruka setFocus her
        focus: error?.ref?.focus,
    }));

    return (
        Object.keys(flattenAndUniqueErrors).length > 0 && <ErrorSummaryFp errorRef={errorRef} errors={mappedErrors} />
    );
};

import { RefObject, useEffect, useRef } from 'react';
import { FormState } from 'react-hook-form';

export const useFocusOnValidationError = (
    ref: RefObject<HTMLElement | null>,
    formState: Pick<FormState<any>, 'submitCount' | 'errors'>,
) => {
    const { submitCount, errors } = formState;
    const prevSubmitCount = useRef(submitCount);

    useEffect(() => {
        if (submitCount > prevSubmitCount.current && Object.keys(errors).length > 0) {
            setTimeout(() => ref.current?.focus(), 100);
        }
        prevSubmitCount.current = submitCount;
    }, [submitCount, errors, ref]);
};

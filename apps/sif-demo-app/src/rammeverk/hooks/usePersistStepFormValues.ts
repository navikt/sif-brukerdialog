import { useEffect, useRef } from 'react';

import { useStepsFormValues } from '../state/StepFormValuesContext';

/**
 * Hook som lagrer skjemaverdier til StepFormValuesContext ved unmount.
 * Dette fanger endringer når bruker navigerer bort fra steget uten å submitte.
 *
 * @param stepId - Identifikator for steget
 * @param getValues - Funksjon fra react-hook-form som returnerer nåværende skjemaverdier
 *
 * @example
 * ```tsx
 * const { getValues } = useForm();
 * usePersistStepFormValues(stepId, getValues);
 * ```
 */
export const usePersistStepFormValues = <T extends object>(stepId: string, getValues: () => T) => {
    const { setStepFormValues } = useStepsFormValues();
    const getValuesRef = useRef(getValues);

    // Hold referansen oppdatert uten å trigge effect
    useEffect(() => {
        getValuesRef.current = getValues;
    });

    useEffect(() => {
        return () => {
            // Ved unmount: lagre nåværende verdier
            const values = getValuesRef.current();
            setStepFormValues(stepId, values as Record<string, unknown>);
        };
    }, [stepId, setStepFormValues]);
};

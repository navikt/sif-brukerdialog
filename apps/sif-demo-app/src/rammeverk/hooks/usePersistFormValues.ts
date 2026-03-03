import { useEffect, useRef } from 'react';
import { useStepFormValues } from '../state/StepFormValuesContext';

/**
 * Hook som lagrer skjemaverdier til StepFormValuesContext ved unmount.
 * Dette fanger endringer når bruker navigerer bort fra steget uten å submitte.
 *
 * @param stegId - Identifikator for steget
 * @param getValues - Funksjon fra react-hook-form som returnerer nåværende skjemaverdier
 *
 * @example
 * ```tsx
 * const { getValues } = useForm();
 * usePersistFormValues(stegId, getValues);
 * ```
 */
export const usePersistFormValues = <T extends object>(stegId: string, getValues: () => T) => {
    const { setStepFormValues } = useStepFormValues();
    const getValuesRef = useRef(getValues);

    // Hold referansen oppdatert uten å trigge effect
    useEffect(() => {
        getValuesRef.current = getValues;
    });

    useEffect(() => {
        return () => {
            // Ved unmount: lagre nåværende verdier
            const values = getValuesRef.current();
            setStepFormValues(stegId, values as Record<string, unknown>);
        };
    }, [stegId, setStepFormValues]);
};

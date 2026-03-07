import { useEffect, useRef } from 'react';

import { StepFormValues, useSøknadFormValues } from '../state/SøknadFormValuesContext';

/**
 * Hook som lagrer skjemaverdier til SøknadFormValuesContext ved unmount.
 * Dette fanger endringer når bruker navigerer bort fra steget uten å submitte.
 *
 * @param stepId - Identifikator for steget
 * @param getValues - Funksjon fra f.eks. react-hook-form som returnerer nåværende skjemaverdier
 *
 * @example ved bruk av react-hook-form:
 * ```tsx
 * const { getValues } = useForm();
 * useSaveFormValuesForSøknadStep(stepId, getValues);
 * ```
 */
export const useSaveFormValuesForSøknadStep = (stepId: string, getValues: () => StepFormValues) => {
    const { setFormValuesForStep } = useSøknadFormValues();
    const getValuesRef = useRef(getValues);

    // Hold referansen oppdatert uten å trigge effect
    useEffect(() => {
        getValuesRef.current = getValues;
    });

    useEffect(() => {
        return () => {
            // Ved unmount: lagre nåværende verdier
            const values = getValuesRef.current();
            setFormValuesForStep(stepId, values as StepFormValues);
        };
    }, [stepId, setFormValuesForStep]);
};

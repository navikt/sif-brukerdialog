import { useEffect, useRef } from 'react';

import { StepFormValues } from '../types';
import { useSøknadFormValues } from '.';

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
export const useSaveSøknadFormValues = <TStepId extends string>(stepId: TStepId, getValues: () => StepFormValues) => {
    const { setFormValuesForStep, shouldSaveOnUnmountForStep } = useSøknadFormValues();
    const getValuesRef = useRef(getValues);

    useEffect(() => {
        getValuesRef.current = getValues;
    });

    useEffect(() => {
        return () => {
            if (!shouldSaveOnUnmountForStep(stepId)) {
                return;
            }
            const values = getValuesRef.current();
            setFormValuesForStep(stepId, values);
        };
    }, [stepId, setFormValuesForStep, shouldSaveOnUnmountForStep]);
};

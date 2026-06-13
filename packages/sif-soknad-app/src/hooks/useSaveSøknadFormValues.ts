import { useEffect, useRef } from 'react';

import { StepFormValues, useSøknadFormValues } from '../consistency/SøknadFormValuesContext';

/**
 * Lagrer skjemaverdier til SøknadFormValuesContext ved unmount.
 * Fanger opp endringer når bruker navigerer bort fra steget uten å submitte
 * (f.eks. via browser back/forward).
 *
 * Hopper over lagring hvis steget er markert med `markSkipNextUnmountSaveForStep`
 * (settes automatisk av useStepData.commit).
 *
 * @example
 * ```tsx
 * const methods = useForm<MyFormValues>(...);
 * useSaveSøknadFormValues(stepId, methods.getValues as () => Record<string, unknown>);
 * ```
 */
export const useSaveSøknadFormValues = (stepId: string, getValues: () => unknown) => {
    const { setFormValuesForStep, shouldSaveOnUnmountForStep, registerGetValuesForStep, unregisterGetValuesForStep } =
        useSøknadFormValues();
    const getValuesRef = useRef(getValues);

    useEffect(() => {
        getValuesRef.current = getValues;
    });

    // Registrer live getter slik at useMellomlagring kan hente verdier mens komponenten er montert
    useEffect(() => {
        registerGetValuesForStep(stepId, () => getValuesRef.current() as StepFormValues);
        return () => {
            unregisterGetValuesForStep(stepId);
        };
    }, [stepId, registerGetValuesForStep, unregisterGetValuesForStep]);

    useEffect(() => {
        return () => {
            if (!shouldSaveOnUnmountForStep(stepId)) {
                return;
            }
            setFormValuesForStep(stepId, getValuesRef.current() as StepFormValues);
        };
    }, [stepId, setFormValuesForStep, shouldSaveOnUnmountForStep]);
};

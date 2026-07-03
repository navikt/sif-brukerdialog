import { useMemo } from 'react';

import { checkConsistencyForSteps } from '../consistency/checkConsistencyForSteps';
import { useSøknadStepFormContext } from '../consistency/SøknadStepFormContext';
import { useSøknadAppContext } from '../context/SøknadAppContext';

/**
 * Sjekker om noen av de foregående stegene har ulagrede endringer.
 * Returnerer stepId for første inkonsistente steg, eller undefined.
 *
 * Returnerer alltid undefined hvis appen ikke har satt `formValuesToSøknadsdata`
 * på SøknadRouter (consistency-sjekk er opt-in).
 */
export function useCheckConsistency(currentStepId: string): string | undefined {
    const { store, stepOrder, formValuesToSøknadsdata } = useSøknadAppContext();
    const { draftFormValues } = useSøknadStepFormContext();
    const søknadsdata = store((s) => s.søknadsdata);

    return useMemo(() => {
        if (!formValuesToSøknadsdata) return undefined;

        return checkConsistencyForSteps({
            currentStepId,
            stepOrder,
            formValues: draftFormValues,
            getSøknadsdataForStep: (stepId) => søknadsdata[stepId] as Record<string, unknown> | undefined,
            formValuesToSøknadsdata,
        });
    }, [currentStepId, stepOrder, draftFormValues, søknadsdata, formValuesToSøknadsdata]);
}

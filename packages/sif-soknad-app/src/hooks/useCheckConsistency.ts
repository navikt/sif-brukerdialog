import { useMemo } from 'react';

import { checkConsistencyForSteps } from '../consistency/checkConsistencyForSteps';
import { useSøknadFormValues } from '../consistency/SøknadFormValuesContext';
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
    const { søknadFormValues } = useSøknadFormValues();
    const søknadsdata = store((s) => s.søknadsdata);

    return useMemo(() => {
        if (!formValuesToSøknadsdata) return undefined;

        return checkConsistencyForSteps({
            currentStepId,
            stepOrder,
            formValues: søknadFormValues,
            getSøknadsdataForStep: (stepId) => søknadsdata[stepId] as Record<string, unknown> | undefined,
            formValuesToSøknadsdata,
        });
    }, [currentStepId, stepOrder, søknadFormValues, søknadsdata, formValuesToSøknadsdata]);
}

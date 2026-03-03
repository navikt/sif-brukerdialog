import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { InvalidStepInfo } from '@rammeverk/components';
import { usePersistFormValues } from '@rammeverk/hooks';
import { useStepFormValues } from '@rammeverk/state';
import { StegId, stegConfig, stegTitler } from '../config/stegConfig';
import { useSøknadsdataStatus } from '../hooks/useSøknadsdataStatus';

interface UseStegValideringOptions<T extends object> {
    stegId: StegId;
    getValues: () => T;
}

interface UseStegValideringResult {
    StegValideringInfo: () => React.ReactNode;
    clearFormValues: () => void;
}

/**
 * Hook som håndterer:
 * 1. Persistering av skjemaverdier ved unmount (usePersistFormValues)
 * 2. Validering av at tidligere steg har blitt submittet (useSøknadsdataStatus)
 * 3. Visning av advarsel hvis bruker har brukt nettleserens forward-knapp
 *
 * Returnerer:
 * - StegValideringInfo: Komponent som viser advarsel ved ugyldige steg
 * - clearFormValues: Funksjon å kalle FØR navigasjon ved submit for å unngå timing-issues
 */
export const useStegValidering = <T extends object>({
    stegId,
    getValues,
}: UseStegValideringOptions<T>): UseStegValideringResult => {
    const navigate = useNavigate();
    const { invalidSteps } = useSøknadsdataStatus(stegId);
    const { clearStepFormValues } = useStepFormValues();

    usePersistFormValues(stegId, getValues);

    const clearFormValues = useCallback(() => {
        clearStepFormValues(stegId);
    }, [stegId, clearStepFormValues]);

    const StegValideringInfo = useCallback(
        () => (
            <InvalidStepInfo
                invalidSteps={invalidSteps}
                getStepTitle={(id) => stegTitler[id as StegId]}
                onNavigateToStep={(id) => navigate(`/soknad/${stegConfig[id as StegId].route}`)}
            />
        ),
        [invalidSteps, navigate],
    );

    return { StegValideringInfo, clearFormValues };
};

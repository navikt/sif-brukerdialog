import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { InvalidStepInfo } from '@rammeverk/components';
import { usePersistFormValues } from '@rammeverk/hooks';
import { useStepFormValues } from '@rammeverk/state';
import { StegId, stegConfig, stegTitler } from '../config/stegConfig';
import { useSøknadsdataStatus } from '../hooks/useSøknadsdataStatus';

interface UseFormSubmitGuardOptions<T extends object> {
    stegId: StegId;
    getValues: () => T;
}

interface UseFormSubmitGuardResult {
    FormSubmitGuardInfo: () => React.ReactNode;
    clearFormValues: () => void;
}

/**
 * Hook som beskytter mot at bruker navigerer med nettleserens forward-knapp
 * uten å submitte skjemadata.
 *
 * Håndterer:
 * 1. Persistering av skjemaverdier ved unmount (usePersistFormValues)
 * 2. Sammenligning av formValues med søknadsdata for tidligere steg
 * 3. Visning av advarsel hvis mismatch oppdages
 *
 * Returnerer:
 * - FormSubmitGuardInfo: Komponent som viser advarsel ved ugyldige steg
 * - clearFormValues: Funksjon å kalle FØR navigasjon ved submit for å unngå timing-issues
 */
export const useFormSubmitGuard = <T extends object>({
    stegId,
    getValues,
}: UseFormSubmitGuardOptions<T>): UseFormSubmitGuardResult => {
    const navigate = useNavigate();
    const { invalidSteps } = useSøknadsdataStatus(stegId);
    const { clearStepFormValues } = useStepFormValues();

    usePersistFormValues(stegId, getValues);

    const clearFormValues = useCallback(() => {
        clearStepFormValues(stegId);
    }, [stegId, clearStepFormValues]);

    const FormSubmitGuardInfo = useCallback(
        () => (
            <InvalidStepInfo
                invalidSteps={invalidSteps}
                getStepTitle={(id) => stegTitler[id as StegId]}
                onNavigateToStep={(id) => navigate(`/soknad/${stegConfig[id as StegId].route}`)}
            />
        ),
        [invalidSteps, navigate],
    );

    return { FormSubmitGuardInfo, clearFormValues };
};

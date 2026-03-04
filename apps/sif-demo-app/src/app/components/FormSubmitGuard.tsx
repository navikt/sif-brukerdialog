import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { InvalidStepInfo } from '@rammeverk/components';
import { useStepPersistFormValues } from '@rammeverk/hooks';
import { useStepFormValues } from '@rammeverk/state';
import { SøknadStepId, søknadStepConfig, stepTitles } from '../config/søknadStepConfig';
import { useSøknadsdataStatus } from '../hooks/useSøknadsdataStatus';

interface UseFormSubmitGuardOptions<T extends object> {
    stepId: SøknadStepId;
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
    stepId,
    getValues,
}: UseFormSubmitGuardOptions<T>): UseFormSubmitGuardResult => {
    const navigate = useNavigate();
    const { invalidSteps } = useSøknadsdataStatus(stepId);
    const { clearAllSteps } = useStepFormValues();

    useStepPersistFormValues(stepId, getValues);

    const clearFormValues = useCallback(() => {
        clearAllSteps();
    }, [clearAllSteps]);

    const FormSubmitGuardInfo = useCallback(
        () => (
            <InvalidStepInfo
                invalidSteps={invalidSteps}
                getStepTitle={(id) => stepTitles[id as SøknadStepId]}
                onNavigateToStep={(id) => navigate(`/soknad/${søknadStepConfig[id as SøknadStepId].route}`)}
            />
        ),
        [invalidSteps, navigate],
    );

    return { FormSubmitGuardInfo, clearFormValues };
};

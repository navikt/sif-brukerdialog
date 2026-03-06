import { InconsistentStepMessage } from '@rammeverk/components';
import { useStepConsistencyChecker } from '@rammeverk/hooks';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { søknadStepConfig, SøknadStepId, søknadStepOrder, stepTitles } from '../../config/søknadStepConfig';
import { useSøknadStore } from '../../hooks/useSøknadStore';
import { Søknadsdata } from '../../types/Søknadsdata';
import { formValuesToSøknadsdata } from '../../utils/formValuesToSøknadsdata';

interface Props {
    stepId: SøknadStepId;
}

export const AppStepConsistencyChecker = ({ stepId }: Props) => {
    const navigate = useNavigate();
    const søknadsdata = useSøknadStore((s) => s.søknadState?.søknadsdata);

    const getSøknadsdataForStep = useCallback(
        (id: string): Record<string, unknown> | undefined => søknadsdata?.[id as keyof Søknadsdata],
        [søknadsdata],
    );

    const inconsistentStepId = useStepConsistencyChecker({
        currentStepId: stepId,
        stepOrder: søknadStepOrder,
        getSøknadsdataForStep,
        formValuesToSøknadsdata,
    });

    if (!inconsistentStepId) return null;

    return (
        <InconsistentStepMessage
            stepId={inconsistentStepId}
            stepTitle={stepTitles[inconsistentStepId as SøknadStepId]}
            onNavigateToStep={() => navigate(`/soknad/${søknadStepConfig[inconsistentStepId as SøknadStepId].route}`)}
        />
    );
};

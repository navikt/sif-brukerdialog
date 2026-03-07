import { Box } from '@navikt/ds-react';
import { InconsistentSøknadsdataMessage, useSøknadsdataConsistencyChecker } from '@rammeverk/consistency';
import { StepSøknadsdata } from '@rammeverk/types';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { søknadStepConfig, SøknadStepId, søknadStepOrder, stepTitles } from '../../config/søknadStepConfig';
import { useSøknadStore } from '../../hooks/useSøknadStore';
import { formValuesToSøknadsdata } from '../../utils/formValuesToSøknadsdata';

interface Props {
    stepId: SøknadStepId;
}

export const AppStepConsistencyChecker = ({ stepId }: Props) => {
    const navigate = useNavigate();
    const søknadsdata = useSøknadStore((s) => s.søknadState?.søknadsdata);

    const getSøknadsdataForStep = useCallback(
        (id: SøknadStepId): StepSøknadsdata | undefined => søknadsdata?.[id],
        [søknadsdata],
    );

    const inconsistentStepId = useSøknadsdataConsistencyChecker({
        currentStepId: stepId,
        stepOrder: søknadStepOrder,
        getSøknadsdataForStep,
        formValuesToSøknadsdata,
    });

    if (!inconsistentStepId) return null;

    return (
        <Box marginBlock="space-0 space-32">
            <InconsistentSøknadsdataMessage
                stepId={inconsistentStepId}
                stepTitle={stepTitles[inconsistentStepId as SøknadStepId]}
                onNavigateToStep={() =>
                    navigate(`/soknad/${søknadStepConfig[inconsistentStepId as SøknadStepId].route}`)
                }
            />
        </Box>
    );
};

import { StepConsistencyChecker, StepInconsistencyMessage } from '@rammeverk/components';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { søknadStepConfig, SøknadStepId, søknadStepOrder, stepTitles } from '../../config/søknadStepConfig';
import { useSøknadStore } from '../../hooks/useSøknadStore';
import { Søknadsdata } from '../../types/Søknadsdata';
import { formValuesToSøknadsdata } from '../../utils/formValuesToSøknadsdata';

interface Props {
    stepId: SøknadStepId;
}

/**
 * App-spesifikk wrapper rundt StepConsistencyChecker.
 * Injiserer søknadsdata og viser ugyldig steg-informasjon hvis skjemdata
 * og søknadsdata ikke stemmer overens.
 */
export const AppStepConsistencyChecker = ({ stepId }: Props) => {
    const navigate = useNavigate();
    const søknadsdata = useSøknadStore((s) => s.søknadState?.søknadsdata);

    const getSøknadsdataForStep = useCallback(
        (id: string): Record<string, unknown> | undefined => søknadsdata?.[id as keyof Søknadsdata],
        [søknadsdata],
    );

    return (
        <StepConsistencyChecker
            currentStepId={stepId}
            stepOrder={søknadStepOrder}
            getSøknadsdataForStep={getSøknadsdataForStep}
            formValuesToSøknadsdata={formValuesToSøknadsdata}>
            {(invalidStepId) =>
                invalidStepId && (
                    <StepInconsistencyMessage
                        invalidStep={invalidStepId}
                        stepTitle={stepTitles[invalidStepId as SøknadStepId]}
                        onNavigateToStep={() =>
                            navigate(`/soknad/${søknadStepConfig[invalidStepId as SøknadStepId].route}`)
                        }
                    />
                )
            }
        </StepConsistencyChecker>
    );
};

import { InvalidStepInfo, StepFormValuesGuard } from '@rammeverk/components';
import { stepTitles, søknadStepConfig, SøknadStepId, søknadStepOrder } from '../config/søknadStepConfig';
import { useSøknadStore } from '../hooks/useSøknadStore';
import { Søknadsdata } from '../types/Søknadsdata';
import { useNavigate } from 'react-router-dom';
import { formValuesToSøknadsdata } from '../utils/formValuesToSøknadsdata';

interface SøknadStepGuardProps {
    stepId: SøknadStepId;
}

/**
 * App-spesifikk wrapper rundt StepFormValuesGuard.
 * Injiserer søknadsdata og viser ugyldig steg-informasjon.
 */
export const SøknadStepGuard = ({ stepId }: SøknadStepGuardProps) => {
    const navigate = useNavigate();
    const søknadsdata = useSøknadStore((s) => s.søknadState?.søknadsdata);

    const getSøknadsdataForStep = (id: string): Record<string, unknown> | undefined => {
        return søknadsdata?.[id as keyof Søknadsdata];
    };

    return (
        <StepFormValuesGuard
            currentStepId={stepId}
            stepOrder={søknadStepOrder}
            getSøknadsdataForStep={getSøknadsdataForStep}
            formValuesToSøknadsdata={formValuesToSøknadsdata}>
            {(invalidStepId) =>
                invalidStepId && (
                    <InvalidStepInfo
                        invalidStep={invalidStepId}
                        stepTitle={stepTitles[invalidStepId as SøknadStepId]}
                        onNavigateToStep={() =>
                            navigate(`/soknad/${søknadStepConfig[invalidStepId as SøknadStepId].route}`)
                        }
                    />
                )
            }
        </StepFormValuesGuard>
    );
};

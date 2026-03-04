import { ReactNode } from 'react';
import { StepFormValuesGuard } from '@rammeverk/components';
import { SøknadStepId, søknadStepOrder } from '../config/søknadStepConfig';
import { useSøknadStore } from '../hooks/useSøknadStore';
import { Søknadsdata } from '../types/Søknadsdata';

type FormValues = Record<string, unknown>;

const formValuesToSøknadsdata = (stepId: string, formValues: FormValues): Record<string, unknown> | undefined => {
    switch (stepId) {
        case SøknadStepId.PERSONALIA:
            return {
                navn: formValues.navn,
                harHobby: formValues.harHobby,
            };
        case SøknadStepId.HOBBY:
            return {
                navn: formValues.navn,
            };
        case SøknadStepId.KONTAKT:
            return {
                epost: formValues.epost,
            };
        default:
            return undefined;
    }
};

interface SøknadStepGuardProps {
    stepId: SøknadStepId;
    children: (invalidStepId: string | null) => ReactNode;
}

/**
 * App-spesifikk wrapper rundt StepFormValuesGuard.
 * Injiserer søknadsdata og konverteringsfunksjon.
 */
export const SøknadStepGuard = ({ stepId, children }: SøknadStepGuardProps) => {
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
            {children}
        </StepFormValuesGuard>
    );
};

import { SøknadFooter } from '@rammeverk/components';
import { useStepFormValues, useStepNavigation } from '@rammeverk/state';

import {
    søknadStepOrder as stepOrder,
    søknadStepConfig as stepConfig,
    SøknadStepId,
    stepTitles,
} from '../../config/søknadStepConfig';
import { useAvbrytSøknad } from '../../hooks/useAvbrytSøknad';
import { useSøknadStepStatus } from '../../hooks/useSøknadStepStatus';
import { useSøknadStore } from '../../hooks/useSøknadStore';
import { HobbySøknadsdata } from '../../types/Søknadsdata';
import { useSøknadMellomlagring } from '../../hooks';
import SøknadStep from '../../../rammeverk/components/SøknadStep';
import HobbyForm, { HobbySkjemadata } from './HobbyForm';
import { SøknadStepGuard } from '../../components/SøknadStepGuard';

const getDefaultValues = (
    stepFormValues: Partial<HobbySkjemadata> | undefined,
    søknadsdata?: HobbySøknadsdata,
): Partial<HobbySkjemadata> => {
    if (stepFormValues) {
        return stepFormValues;
    }
    if (søknadsdata) {
        return {
            navn: søknadsdata.navn,
        };
    }
    return {};
};

export const HobbySteg = () => {
    const stepId = SøknadStepId.HOBBY;

    const søknadState = useSøknadStore((s) => s.søknadState);
    const setSøknadsdata = useSøknadStore((s) => s.setSøknadsdata);
    const setCurrentStep = useSøknadStore((s) => s.setCurrentStep);
    const avbrytSøknad = useAvbrytSøknad();
    const { lagreSøknad, isPending } = useSøknadMellomlagring();
    const { clearAllSteps } = useStepFormValues();

    const stepFormValues = useStepFormValues().getStepFormValues(stepId) as Partial<HobbySkjemadata> | undefined;

    const stepStatus = useSøknadStepStatus();

    const { navigateToNextStep, navigateToPreviousStep, canGoPrevious } = useStepNavigation({
        stepConfig,
        stepOrder,
        stepStatus,
        setCurrentStep,
    });

    const defaultValues = getDefaultValues(stepFormValues, søknadState?.søknadsdata[stepId]);

    const onSubmit = async (data: HobbySkjemadata) => {
        if (!data.navn) {
            alert('Vennligst fyll ut alle feltene før du går videre.');
            return;
        }
        setSøknadsdata({ [stepId]: { navn: data.navn } });
        await lagreSøknad();
        clearAllSteps();
        navigateToNextStep(stepId);
    };

    return (
        <SøknadStep title={stepTitles[stepId]}>
            <SøknadStepGuard stepId={stepId} />
            <HobbyForm
                defaultValues={defaultValues}
                isPending={isPending}
                onSubmit={onSubmit}
                canGoPrevious={canGoPrevious(stepId)}
                onPrevious={() => navigateToPreviousStep(stepId)}
            />
            <SøknadFooter onAvbryt={avbrytSøknad} />
        </SøknadStep>
    );
};

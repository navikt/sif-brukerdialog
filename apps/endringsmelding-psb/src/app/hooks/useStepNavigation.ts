import { useNavigate } from 'react-router-dom';
import { StepConfig } from '@navikt/sif-common-soknad-ds/lib/soknad-step/soknadStepTypes';
import actionsCreator from '../søknad/context/action/actionCreator';
import { useSøknadContext } from '../søknad/context/hooks/useSøknadContext';
import { StepId } from '../søknad/config/StepId';
import { getSøknadStepRoute } from '../søknad/config/SøknadRoutes';

export const useStepNavigation = (step: StepConfig<StepId>) => {
    const { dispatch } = useSøknadContext();
    const navigate = useNavigate();

    const hasPreviousStep = step.previousStep !== undefined;
    const hasNextStep = step.nextStep !== undefined;

    const goToPreviousStep = () => {
        const { previousStep } = step;
        if (previousStep) {
            dispatch(actionsCreator.setSøknadRoute(getSøknadStepRoute(previousStep)));
            dispatch(actionsCreator.requestLagreSøknad());
            setTimeout(() => {
                navigate(getSøknadStepRoute(previousStep));
            });
        }
    };
    /** Bør nok brukes med måte, i og med en denne ikke vil submitte skjema og oppdatere søknadsdata */
    const goToNextStep = () => {
        const { nextStep } = step;
        if (nextStep) {
            dispatch(actionsCreator.setSøknadRoute(getSøknadStepRoute(nextStep)));
            dispatch(actionsCreator.requestLagreSøknad());
            setTimeout(() => {
                navigate(getSøknadStepRoute(nextStep));
            });
        }
    };

    return {
        goBack: hasPreviousStep ? goToPreviousStep : undefined,
        goNext: hasNextStep ? goToNextStep : undefined,
    };
};

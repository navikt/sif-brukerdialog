import { useNavigate } from 'react-router-dom';
import { StepConfig } from '@navikt/sif-common-soknad-ds/lib/soknad-step/soknadStepTypes';
import actionsCreator from '../søknad/context/action/actionCreator';
import { useSøknadContext } from '../søknad/context/hooks/useSøknadContext';
import { StepId } from '../types/StepId';
import { SøknadRoutes } from '../types/SøknadRoutes';

export const useStepNavigation = (step: StepConfig<StepId, SøknadRoutes>) => {
    const { dispatch } = useSøknadContext();
    const navigate = useNavigate();

    const hasPreviousStep = step.previousStepRoute !== undefined;
    const hasNextStep = step.nextStepRoute !== undefined;

    const goToPreviousStep = () => {
        const { previousStepRoute } = step;
        if (previousStepRoute) {
            dispatch(actionsCreator.setSøknadRoute(previousStepRoute));
            dispatch(actionsCreator.requestLagreSøknad());
            setTimeout(() => {
                navigate(previousStepRoute);
            });
        }
    };
    /** Bør nok brukes med måte, i og med en denne ikke vil submitte skjema og oppdatere søknadsdata */
    const goToNextStep = () => {
        const { nextStepRoute } = step;
        if (nextStepRoute) {
            dispatch(actionsCreator.setSøknadRoute(nextStepRoute));
            dispatch(actionsCreator.requestLagreSøknad());
            setTimeout(() => {
                navigate(nextStepRoute);
            });
        }
    };

    return {
        goBack: hasPreviousStep ? goToPreviousStep : undefined,
        goNext: hasNextStep ? goToNextStep : undefined,
    };
};

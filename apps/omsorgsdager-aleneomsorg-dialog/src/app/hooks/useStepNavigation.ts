import { useNavigate } from 'react-router-dom';
import { StepConfig } from '@navikt/sif-common-soknad-ds/src/modules/soknad-step/soknadStepTypes';
import actionsCreator from '../søknad/context/action/actionCreator';
import { useSøknadContext } from '../søknad/context/hooks/useSøknadContext';
import { StepId } from '../types/StepId';
import { getSøknadStepRoute } from '../utils/søknadRoutesUtils';

/** Bør nok brukes med måte, i og med en denne ikke vil submitte skjema og oppdatere søknadsdata */

export const useStepNavigation = (step?: StepConfig<StepId>) => {
    const { dispatch } = useSøknadContext();
    const navigate = useNavigate();

    const gotoStep = (stepId: StepId) => {
        const route = getSøknadStepRoute(stepId);
        dispatch(actionsCreator.setSøknadRoute(route));
        dispatch(actionsCreator.requestLagreSøknad());
        setTimeout(() => {
            navigate(route);
        });
    };

    const goToPreviousStep = () => {
        if (step?.previousStep) {
            gotoStep(step?.previousStep);
        }
    };

    const goToNextStep = () => {
        if (step?.nextStep) {
            if (step?.previousStep) {
                gotoStep(step?.nextStep);
            }
        }
    };

    return {
        goBack: step?.previousStep ? goToPreviousStep : undefined,
        goNext: step?.nextStep ? goToNextStep : undefined,
    };
};

import { useSøknadContext } from '@app/hooks';
import { StepConfig } from '@navikt/sif-common-soknad-ds';
import { useNavigate } from 'react-router-dom';

import { getSøknadStepRoute } from '../søknad/config/SøknadRoutes';
import { StepId } from '../søknad/config/StepId';
import actionsCreator from '../søknad/context/action/actionCreator';

type emptyFunction = () => void;

type StepNavigation = {
    goBack: emptyFunction | undefined;
    goNext: emptyFunction | undefined;
};

export const useStepNavigation = (step: StepConfig<StepId>): StepNavigation => {
    const { dispatch } = useSøknadContext();
    const navigate = useNavigate();

    if (!step) {
        return { goBack: undefined, goNext: undefined };
    }

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

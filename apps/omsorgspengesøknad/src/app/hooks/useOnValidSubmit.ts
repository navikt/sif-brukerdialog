import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SøknadContextState } from '../types/SøknadContextState';
import actionsCreator, { SøknadContextAction } from '../søknad/context/action/actionCreator';
import { useSøknadContext } from '../søknad/context/hooks/useSøknadContext';
import { StepId } from '../types/StepId';
import { getSøknadStepConfig } from '../søknad/søknadStepConfig';
import { getSøknadStepRoute } from '../utils/søknadRoutesUtils';

export const useOnValidSubmit = <T>(
    submitHandler: (values: T) => SøknadContextAction[],
    stepId: StepId,
    postSubmit?: (state: SøknadContextState) => Promise<any>
) => {
    const { dispatch, state } = useSøknadContext();
    const navigate = useNavigate();
    const [hasSubmitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(undefined);

    const { nextStep } = getSøknadStepConfig(state.søknadsdata)[stepId];

    useEffect(() => {
        if (hasSubmitted && postSubmit) {
            postSubmit(state)
                .then(() => {
                    if (nextStep) {
                        navigate(getSøknadStepRoute(nextStep));
                    }
                    // if (nextStepRoute === SøknadRoutes.SØKNAD_SENDT) {
                    //     navigate(nextStepRoute);
                    // } else {
                    //     if (nextRoute) {
                    //         navigate(nextRoute);
                    //     }
                    // }
                })
                .catch((error) => {
                    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                        // TODO
                        // redirectToLogin();
                    } else {
                        setSubmitError(error);
                    }
                });
        }
    }, [hasSubmitted, navigate, nextStep, state, postSubmit]);

    useEffect(() => {
        if (submitError) {
            throw new Error(submitError);
        }
    }, [submitError]);

    const dispatchAction = (action: SøknadContextAction | undefined): void => {
        if (action) {
            dispatch(action);
        }
    };

    const handleSubmit = (values: T) => {
        setIsSubmitting(true);
        const actions = [
            nextStep === undefined || nextStep === StepId.SØKNAD_SENDT
                ? undefined
                : dispatch(actionsCreator.setSøknadRoute(getSøknadStepRoute(nextStep))),
            ...submitHandler(values),
        ];
        Promise.all([...actions.map(dispatchAction)]).then(() => setSubmitted(true));
    };

    return { handleSubmit, isSubmitting };
};

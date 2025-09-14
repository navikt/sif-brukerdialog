import { useSøknadContext } from '@hooks';
import { SøknadContextState } from '@types';
import { relocateToLoginPage } from '@utils';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getSøknadStepRoute } from '../søknad/config/SøknadRoutes';
import { getSøknadStepConfig } from '../søknad/config/søknadStepConfig';
import { StepId } from '../søknad/config/StepId';
import actionsCreator, { SøknadContextAction } from '../søknad/context/action/actionCreator';

export const useOnValidSubmit = <T>(
    submitHandler: (values: T) => SøknadContextAction[],
    stepId: StepId,
    postSubmit?: (state: SøknadContextState) => Promise<any>,
) => {
    const { dispatch, state } = useSøknadContext();
    const navigate = useNavigate();
    const [hasSubmitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(undefined);

    const { nextStep } = getSøknadStepConfig(state.søknadSteps)[stepId];

    useEffect(() => {
        if (hasSubmitted && postSubmit) {
            postSubmit(state)
                .then(() => {
                    if (nextStep) {
                        navigate(getSøknadStepRoute(nextStep));
                    }
                })
                .catch((error) => {
                    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                        relocateToLoginPage();
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
            nextStep === undefined || nextStep === StepId.MELDING_SENDT
                ? undefined
                : dispatch(actionsCreator.setSøknadRoute(getSøknadStepRoute(nextStep))),
            ...submitHandler(values),
        ];
        Promise.all([...actions.map(dispatchAction)]).then(() => setSubmitted(true));
    };

    return { handleSubmit, isSubmitting };
};

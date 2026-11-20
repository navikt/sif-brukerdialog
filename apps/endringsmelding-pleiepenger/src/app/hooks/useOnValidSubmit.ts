import { useSøknadContext } from '@app/hooks';
import { useAppIntl } from '@app/i18n';
import { SøknadContextState } from '@app/types';
import { relocateToLoginPage } from '@app/utils';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getSøknadStepRoute } from '../søknad/config/SøknadRoutes';
import { getNesteSteg, getStegMedManglendeSvar } from '../søknad/config/søknadStepConfig';
import { StepId } from '../søknad/config/StepId';
import actionsCreator, { SøknadContextAction } from '../søknad/context/action/actionCreator';
import { søknadReducer } from '../søknad/context/reducer/søknadReducer';

/** Neste steg må beregnes fra state etter submit, siden svarene kan legge til eller kreve nye steg */
export const getSubmitResult = (
    state: SøknadContextState,
    submitActions: SøknadContextAction[],
    stepId: StepId,
) => {
    const stateAfterSubmit = submitActions.reduce(søknadReducer, state);
    const nextStep = getNesteSteg(
        stepId,
        stateAfterSubmit.søknadSteps,
        stateAfterSubmit.søknadStepsVedOppsummering,
        getStegMedManglendeSvar(stateAfterSubmit.søknadsdata),
    );

    if (nextStep === undefined || nextStep === StepId.MELDING_SENDT) {
        return { actions: submitActions, state: stateAfterSubmit, nextStep };
    }

    const routeAction = actionsCreator.setSøknadRoute(getSøknadStepRoute(nextStep));
    return {
        actions: [...submitActions, routeAction],
        state: søknadReducer(stateAfterSubmit, routeAction),
        nextStep,
    };
};

export const useOnValidSubmit = <T>(
    submitHandler: (values: T) => SøknadContextAction[],
    stepId: StepId,
    postSubmit?: (state: SøknadContextState) => Promise<any>,
) => {
    const { dispatch, state } = useSøknadContext();
    const navigate = useNavigate();
    const { text } = useAppIntl();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(undefined);

    const nextStep = getNesteSteg(
        stepId,
        state.søknadSteps,
        state.søknadStepsVedOppsummering,
        getStegMedManglendeSvar(state.søknadsdata),
    );
    const submitButtonLabel =
        state.søknadStepsVedOppsummering && nextStep === StepId.OPPSUMMERING ? text('step.oppdater') : undefined;

    useEffect(() => {
        if (submitError) {
            throw new Error(submitError);
        }
    }, [submitError]);

    const handleSubmit = (values: T) => {
        setIsSubmitting(true);
        const submitResult = getSubmitResult(state, submitHandler(values), stepId);
        submitResult.actions.forEach((action) => dispatch(action));

        if (postSubmit) {
            postSubmit(submitResult.state)
                .then(() => {
                    if (submitResult.nextStep) {
                        navigate(getSøknadStepRoute(submitResult.nextStep));
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
    };

    return { handleSubmit, isSubmitting, submitButtonLabel };
};

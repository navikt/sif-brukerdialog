import { useSøknadContext } from '@app/hooks';
import { useAppIntl } from '@app/i18n';
import { SøknadContextState } from '@app/types';
import { relocateToLoginPage } from '@app/utils';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getSøknadStepRoute } from '../søknad/config/SøknadRoutes';
import { getNesteSteg } from '../søknad/config/søknadStepConfig';
import { StepId } from '../søknad/config/StepId';
import actionsCreator, { SøknadContextAction } from '../søknad/context/action/actionCreator';

export const useOnValidSubmit = <T>(
    submitHandler: (values: T) => SøknadContextAction[],
    stepId: StepId,
    postSubmit?: (state: SøknadContextState) => Promise<any>,
) => {
    const { dispatch, state } = useSøknadContext();
    const navigate = useNavigate();
    const { text } = useAppIntl();
    const [hasSubmitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(undefined);

    const nextStep = getNesteSteg(stepId, state.søknadSteps, state.søknadStepsVedOppsummering);
    const submitButtonLabel =
        state.søknadStepsVedOppsummering && nextStep === StepId.OPPSUMMERING ? text('step.oppdater') : undefined;

    useEffect(() => {
        if (hasSubmitted && postSubmit) {
            postSubmit(state)
                .then(() => {
                    if (nextStep) {
                        /** Oppsummeringen bruker endretSteg til å åpne og fokusere seksjonen som ble endret */
                        const tilbakeTilOppsummering =
                            nextStep === StepId.OPPSUMMERING && state.søknadStepsVedOppsummering !== undefined;
                        navigate(
                            getSøknadStepRoute(nextStep),
                            tilbakeTilOppsummering ? { state: { endretSteg: stepId } } : undefined,
                        );
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
    }, [hasSubmitted, navigate, nextStep, state, postSubmit, stepId]);

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

    return { handleSubmit, isSubmitting, submitButtonLabel };
};

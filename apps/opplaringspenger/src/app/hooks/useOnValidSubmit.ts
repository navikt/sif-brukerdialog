import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SøknadContextState } from '../types/SøknadContextState';
import { SøknadRoutes } from '../types/SøknadRoutes';
import actionsCreator, { SøknadContextAction } from '../søknad/context/action/actionCreator';
import { useSøknadContext } from '../søknad/context/hooks/useSøknadContext';

export const useOnValidSubmit = <T>(
    submitHandler: (values: T) => SøknadContextAction[],
    nextRoute: SøknadRoutes,
    postSubmit?: (state: SøknadContextState) => Promise<any>
) => {
    const { dispatch, state } = useSøknadContext();
    const navigate = useNavigate();
    const [hasSubmitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(undefined);

    useEffect(() => {
        if (hasSubmitted && postSubmit) {
            postSubmit(state)
                .then(() => {
                    if (nextRoute === SøknadRoutes.SØKNAD_SENDT) {
                        navigate(nextRoute);
                    } else {
                        if (nextRoute) {
                            navigate(nextRoute);
                        }
                    }
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
    }, [hasSubmitted, navigate, nextRoute, state, postSubmit]);

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
            nextRoute === SøknadRoutes.SØKNAD_SENDT ? undefined : dispatch(actionsCreator.setSøknadRoute(nextRoute)),
            ...submitHandler(values),
        ];
        Promise.all([...actions.map(dispatchAction)]).then(() => setSubmitted(true));
    };

    return { handleSubmit, isSubmitting };
};

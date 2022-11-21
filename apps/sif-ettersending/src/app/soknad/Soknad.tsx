import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { failure, pending, success } from '@devexperts/remote-data-ts';
import { ApplikasjonHendelse, useAmplitudeInstance } from '@navikt/sif-common-amplitude';
import LoadWrapper from '@navikt/sif-common-core-ds/lib/components/load-wrapper/LoadWrapper';
import useEffectOnce from '@navikt/sif-common-core-ds/lib/hooks/useEffectOnce';
import { isUserLoggedOut } from '@navikt/sif-common-core-ds/lib/utils/apiUtils';
import { SoknadApplicationType, StepConfig } from '@navikt/sif-common-soknad-ds/lib/soknad-step/soknadStepTypes';
import soknadStepUtils from '@navikt/sif-common-soknad-ds/lib/soknad-step/soknadStepUtils';
import { FormikState } from 'formik';
import { ulid } from 'ulid';
import { sendSoknad } from '../api/sendSoknad';
import { SKJEMANAVN } from '../App';
import AppRoutes, { getKvitteringRoute, getRouteUrl } from '../config/routeConfig';
import { Person } from '../types/Person';
import { SoknadApiData } from '../types/SoknadApiData';
import { Barn, SoknadFormData } from '../types/SoknadFormData';
import { SoknadTempStorageData } from '../types/SoknadTempStorageData';
import appSentryLogger from '../utils/appSentryLogger';
import {
    navigateToErrorPage,
    navigateToKvitteringPage,
    relocateToLoginPage,
    relocateToNavFrontpage,
    relocateToSoknad,
} from '../utils/navigationUtils';
import { verifySoknadApiData } from '../validation/verifySoknadApiData';
import { initialSoknadFormData } from './initialSoknadValues';
import { initialSendSoknadState, SendSoknadStatus, SoknadContextProvider } from './SoknadContext';
import SoknadFormComponents from './SoknadFormComponents';
import SoknadRoutes from './SoknadRoutes';
import { getSoknadStepsConfig, StepID } from './soknadStepsConfig';
import soknadTempStorage, { isStorageDataValid } from './soknadTempStorage';

interface Props {
    søker: Person;
    soknadTempStorage: SoknadTempStorageData;
    route?: string;
}

type resetFormFunc = (nextState?: Partial<FormikState<Partial<SoknadFormData>>>) => void;

const Soknad: React.FunctionComponent<Props> = ({ søker, soknadTempStorage: tempStorage }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [initializing, setInitializing] = useState(true);
    const [initialFormData, setInitialFormData] = useState<Partial<SoknadFormData>>({ ...initialSoknadFormData });
    const [sendSoknadStatus, setSendSoknadStatus] = useState<SendSoknadStatus>(initialSendSoknadState);
    const [soknadId, setSoknadId] = useState<string | undefined>();
    const [soknadSent, setSoknadSent] = useState<boolean>(false);

    const { logSoknadSent, logSoknadStartet, logSoknadFailed, logHendelse, logUserLoggedOut } = useAmplitudeInstance();

    useEffectOnce(() => {
        if (isStorageDataValid(tempStorage, { søker })) {
            setInitialFormData(tempStorage.formData);
            setSoknadId(tempStorage.metadata.soknadId);
            const currentRoute = location.pathname;
            const lastStepRoute = soknadStepUtils.getStepRoute(
                tempStorage.metadata.lastStepID,
                SoknadApplicationType.MELDING
            );
            if (currentRoute !== lastStepRoute) {
                navigate(soknadStepUtils.getStepRoute(tempStorage.metadata.lastStepID, SoknadApplicationType.MELDING));
                setInitializing(false);
            } else {
                setInitializing(false);
            }
        } else {
            resetSoknad(location.pathname !== AppRoutes.SOKNAD);
        }
    });

    /** Forhindre at bruker kommer til søknad med verdier etter at søknad er sendt inn  */
    if (soknadSent && getKvitteringRoute() !== location.pathname) {
        setInitializing(true);
        relocateToSoknad();
    }

    const resetSoknad = async (redirectToFrontpage = true): Promise<void> => {
        await soknadTempStorage.purge();
        setInitialFormData({ ...initialSoknadFormData });
        setSoknadId(undefined);
        if (redirectToFrontpage) {
            if (location.pathname !== getRouteUrl(AppRoutes.SOKNAD)) {
                relocateToSoknad();
                setInitializing(false);
            } else {
                setInitializing(false);
            }
        } else {
            setInitializing(false);
        }
    };

    const abortSoknad = async (): Promise<void> => {
        try {
            await soknadTempStorage.purge();
            await logHendelse(ApplikasjonHendelse.avbryt);
            relocateToSoknad();
        } catch (error) {
            if (isUserLoggedOut(error)) {
                logUserLoggedOut('Ved abort av søknad');
                relocateToLoginPage();
            } else {
                navigateToErrorPage(navigate);
            }
        }
    };

    const startSoknad = async (): Promise<void> => {
        try {
            await resetSoknad(false);
            setSoknadId(ulid());
            await soknadTempStorage.create();
            await logSoknadStartet(SKJEMANAVN);
            navigate(soknadStepUtils.getStepRoute(StepID, SoknadApplicationType.MELDING));
        } catch (error) {
            if (isUserLoggedOut(error)) {
                logUserLoggedOut('Ved start av søknad');
                relocateToLoginPage();
            } else {
                navigateToErrorPage(navigate);
            }
        }
    };

    const continueSoknadLater = async (sId: string, stepID: StepID, values: Partial<SoknadFormData>): Promise<void> => {
        try {
            await soknadTempStorage.update(sId, values, stepID, { søker });
            await logHendelse(ApplikasjonHendelse.fortsettSenere);
            relocateToNavFrontpage();
        } catch (error) {
            if (isUserLoggedOut(error)) {
                logUserLoggedOut('Ved continueSoknadLater');
                relocateToLoginPage();
            } else {
                navigateToErrorPage(navigate);
            }
        }
    };

    const doSendSoknad = async (apiValues: SoknadApiData, resetFormikForm: resetFormFunc): Promise<void> => {
        try {
            await sendSoknad(apiValues);
            await soknadTempStorage.purge();
            await logSoknadSent(apiValues.type);
            setSendSoknadStatus({ failures: 0, status: success(apiValues) });
            navigateToKvitteringPage(navigate);
            setSoknadId(undefined);
            setInitialFormData({ ...initialSoknadFormData });
            resetFormikForm({ values: initialSoknadFormData });
            setSoknadSent(true);
        } catch (error) {
            if (isUserLoggedOut(error)) {
                logUserLoggedOut('Ved innsending av søknad');
                relocateToLoginPage();
            } else {
                await logSoknadFailed(apiValues.type);
                if (sendSoknadStatus.failures >= 2) {
                    navigateToErrorPage(navigate);
                } else {
                    setSendSoknadStatus({
                        failures: sendSoknadStatus.failures + 1,
                        status: failure(error),
                    });
                }
            }
        }
    };

    const triggerSend = async (apiValues: SoknadApiData, resetForm: resetFormFunc): Promise<void> => {
        const apiDataIsValid = verifySoknadApiData(apiValues);
        if (apiDataIsValid) {
            setTimeout(() => {
                setSendSoknadStatus({ ...sendSoknadStatus, status: pending });
                doSendSoknad(apiValues, resetForm);
            });
        } else {
            await appSentryLogger.logError('ApiVerificationFailed');
            navigateToErrorPage(navigate);
        }
    };

    const persistAndNavigate = async (
        values: Partial<SoknadFormData>,
        step: StepConfig<StepID>,
        nextStep?: StepID
    ): Promise<void> => {
        if (nextStep && soknadId) {
            try {
                await soknadTempStorage.update(soknadId, values, nextStep, { søker, barn });
            } catch (error) {
                if (isUserLoggedOut(error)) {
                    await logUserLoggedOut('ved mellomlagring');
                    relocateToLoginPage();
                }
            }
        }
        if (step.nextStepRoute) {
            navigate(step.nextStepRoute);
        }
    };

    return (
        <LoadWrapper
            isLoading={initializing}
            contentRenderer={(): React.ReactNode => {
                return (
                    <SoknadFormComponents.FormikWrapper
                        initialValues={initialFormData}
                        onSubmit={() => null}
                        renderForm={({ values, resetForm }) => {
                            const soknadStepsConfig = getSoknadStepsConfig(values);
                            return (
                                <SoknadContextProvider
                                    value={{
                                        soknadId,
                                        soknadStepsConfig,
                                        sendSoknadStatus,
                                        resetSoknad: abortSoknad,
                                        continueSoknadLater: soknadId
                                            ? (stepId) => continueSoknadLater(soknadId, stepId, values)
                                            : undefined,
                                        startSoknad,
                                        sendSoknad: (values) => triggerSend(values, resetForm),
                                        gotoNextStepFromStep: (stepId: StepID) => {
                                            persistAndNavigate(
                                                values,
                                                soknadStepsConfig[stepId],
                                                soknadStepsConfig[stepId].nextStep
                                            );
                                        },
                                    }}>
                                    <SoknadRoutes soknadId={soknadId} søker={søker} />
                                </SoknadContextProvider>
                            );
                        }}
                    />
                );
            }}
        />
    );
};

export default Soknad;

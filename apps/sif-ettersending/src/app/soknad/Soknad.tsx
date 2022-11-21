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
import { getAbsoluteUrlForRoute, getRouteConfig } from '../config/routeConfig';
import { Person } from '../types/Person';
import { SoknadApiData } from '../types/SoknadApiData';
import { SoknadFormData, initialSoknadFormData } from '../types/SoknadFormData';
import { SoknadTempStorageData } from '../types/SoknadTempStorageData';
import {
    navigateToErrorPage,
    navigateToKvitteringPage,
    navigateToLoginPage,
    relocateToNavFrontpage,
    relocateToApplication,
} from '../utils/navigationUtils';
import { initialSendSoknadState, SendSoknadStatus, SoknadContextProvider } from './SoknadContext';
import SoknadFormComponents from './SoknadFormComponents';
import soknadTempStorage, { isStorageDataValid } from './soknadTempStorage';
import { ApplicationType } from '../types/ApplicationType';
import { getSkjemanavn } from '../types/skjemanavn';
import { getFirstStep, StepID } from '../config/stepConfig';
import { getApplicationPageRoute } from 'app/utils/routeUtils';
import { getSoknadStepsConfig } from './soknadStepsConfig';
import SoknadRoutes from './SoknadRoutes';

interface Props {
    søker: Person;
    søknadstype: ApplicationType;
    soknadTempStorage: SoknadTempStorageData;
    route?: string;
}

type resetFormFunc = (nextState?: Partial<FormikState<Partial<SoknadFormData>>>) => void;

const Soknad: React.FunctionComponent<Props> = ({ søker, søknadstype, soknadTempStorage: tempStorage }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [initializing, setInitializing] = useState(true);
    const [initialFormData, setInitialFormData] = useState<Partial<SoknadFormData>>({ ...initialSoknadFormData });
    const [sendSoknadStatus, setSendSoknadStatus] = useState<SendSoknadStatus>(initialSendSoknadState);
    const [soknadId, setSoknadId] = useState<string | undefined>();
    const [soknadSent, setSoknadSent] = useState<boolean>(false);
    const skjemanavn = getSkjemanavn(søknadstype);
    const { logSoknadSent, logSoknadStartet, logSoknadFailed, logHendelse, logUserLoggedOut, logInfo } =
        useAmplitudeInstance();

    useEffectOnce(() => {
        if (isStorageDataValid(tempStorage, { søker })) {
            setInitialFormData(tempStorage.formData);
            setSoknadId(tempStorage.metadata.soknadId);
            const currentRoute = location.pathname;
            const lastStepRoute = getApplicationPageRoute(søknadstype, tempStorage.metadata.lastStepID);

            if (currentRoute !== lastStepRoute) {
                navigate(soknadStepUtils.getStepRoute(tempStorage.metadata.lastStepID, SoknadApplicationType.MELDING));
                setInitializing(false);
            } else {
                setInitializing(false);
            }
        } else {
            resetSoknad(location.pathname !== getRouteConfig(søknadstype).APPLICATION_ROUTE_PREFIX);
        }
    });

    /** Forhindre at bruker kommer til søknad med verdier etter at søknad er sendt inn  */
    if (soknadSent && getRouteConfig(søknadstype).APPLICATION_SENDT_ROUTE !== location.pathname) {
        setInitializing(true);
        relocateToApplication(søknadstype);
    }

    const resetSoknad = async (redirectToFrontpage = true): Promise<void> => {
        await soknadTempStorage.purge();
        setInitialFormData({ ...initialSoknadFormData });
        setSoknadId(undefined);
        if (redirectToFrontpage) {
            if (location.pathname !== getAbsoluteUrlForRoute(getRouteConfig(søknadstype).APPLICATION_ROUTE_PREFIX)) {
                relocateToApplication(søknadstype);
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
            relocateToApplication(søknadstype);
        } catch (error) {
            if (isUserLoggedOut(error)) {
                logUserLoggedOut('Ved abort av søknad');
                navigateToLoginPage(søknadstype);
            } else {
                navigateToErrorPage(søknadstype, navigate);
            }
        }
    };

    const startSoknad = async (): Promise<void> => {
        try {
            await resetSoknad(false);
            setSoknadId(ulid());
            await soknadTempStorage.create();
            await logSoknadStartet(skjemanavn);
            const firstStepID = getFirstStep(søknadstype);
            navigate(soknadStepUtils.getStepRoute(firstStepID, SoknadApplicationType.MELDING));
        } catch (error) {
            if (isUserLoggedOut(error)) {
                logUserLoggedOut('Ved start av søknad');
                navigateToLoginPage(søknadstype);
            } else {
                navigateToErrorPage(søknadstype, navigate);
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
                navigateToLoginPage(søknadstype);
            } else {
                navigateToErrorPage(søknadstype, navigate);
            }
        }
    };

    const doSendSoknad = async (apiValues: SoknadApiData, resetFormikForm: resetFormFunc): Promise<void> => {
        try {
            await sendSoknad(apiValues);
            await soknadTempStorage.purge();
            await logSoknadSent(skjemanavn);
            await logInfo({ 'Antall vedlegg sendt': apiValues.vedlegg.length });
            setSendSoknadStatus({ failures: 0, status: success(apiValues) });
            navigateToKvitteringPage(søknadstype, navigate);

            setSoknadId(undefined);
            setInitialFormData({ ...initialSoknadFormData });
            resetFormikForm({ values: initialSoknadFormData });
            setSoknadSent(true);
        } catch (error) {
            if (isUserLoggedOut(error)) {
                logUserLoggedOut('Logget ut ved innsending');
                navigateToLoginPage(søknadstype);
            } else {
                await logSoknadFailed(skjemanavn);
                if (sendSoknadStatus.failures >= 2) {
                    navigateToErrorPage(søknadstype, navigate);
                } else {
                    setSendSoknadStatus({
                        failures: sendSoknadStatus.failures + 1,
                        status: failure(error),
                    });
                }
            }
        }
    };

    const triggerSend = (apiValues: SoknadApiData, resetForm: resetFormFunc) => {
        setTimeout(() => {
            setSendSoknadStatus({ ...sendSoknadStatus, status: pending });
            setTimeout(() => {
                doSendSoknad(apiValues, resetForm);
            });
        });
    };

    /* const triggerSend = async (apiValues: SoknadApiData, resetForm: resetFormFunc): Promise<void> => {
        const apiDataIsValid = validateApiValues(apiValues) === undefined;
        if (apiDataIsValid) {
            setTimeout(() => {
                setSendSoknadStatus({ ...sendSoknadStatus, status: pending });
                doSendSoknad(apiValues, resetForm);
            });
        } else {
            await appSentryLogger.logError('ApiVerificationFailed');
            navigateToErrorPage(søknadstype, navigate);
        }
    };*/

    const persistAndNavigate = async (
        values: Partial<SoknadFormData>,
        step: StepConfig<StepID>,
        nextStep?: StepID
    ): Promise<void> => {
        if (nextStep && soknadId) {
            try {
                await soknadTempStorage.update(soknadId, values, nextStep, { søker });
            } catch (error) {
                if (isUserLoggedOut(error)) {
                    await logUserLoggedOut('ved mellomlagring');
                    navigateToLoginPage(søknadstype);
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
                            const soknadStepsConfig = getSoknadStepsConfig(søknadstype);
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
                                    <SoknadRoutes søker={søker} søknadstype={søknadstype} soknadId={soknadId} />
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

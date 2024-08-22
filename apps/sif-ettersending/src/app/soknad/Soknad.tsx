import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { failure, pending, success } from '@devexperts/remote-data-ts';
import { ApplikasjonHendelse, useAmplitudeInstance } from '@navikt/sif-common-amplitude';
import { YtelseKey } from '@navikt/sif-common-core-ds/src/types/Ytelser';
import { isUserLoggedOut } from '@navikt/sif-common-core-ds/src/utils/apiUtils';
import { useEffectOnce } from '@navikt/sif-common-hooks';
import { LoadingPage } from '@navikt/sif-common-soknad-ds';
import { v4 as uuid } from 'uuid';
import { sendSoknad } from '../api/sendSoknad';
import { getRouteConfig } from '../config/routeConfig';
import { Person } from '../types/Person';
import { RegistrertBarn } from '../types/RegistrertBarn';
import { SoknadApiData } from '../types/SoknadApiData';
import { initialSoknadFormData, SoknadFormData } from '../types/SoknadFormData';
import { SoknadTempStorageData } from '../types/SoknadTempStorageData';
import { Søknadstype } from '../types/Søknadstype';
import {
    navigateToErrorPage,
    navigateToKvitteringPage,
    navigateToLoginPage,
    navigateToWelcomePage,
    relocateToMinSide,
} from '../utils/navigationUtils';
import { getApplicationPageRoute } from '../utils/routeUtils';
import { initialSendSoknadState, SendSoknadStatus, SoknadContextProvider } from './SoknadContext';
import SoknadFormComponents from './SoknadFormComponents';
import SoknadRouter from './SoknadRouter';
import { getFirstStep, getSoknadStepsConfig, StepID } from './soknadStepsConfig';
import soknadTempStorage, { isStorageDataValid } from './soknadTempStorage';

interface Props {
    søker: Person;
    barn?: RegistrertBarn[];
    søknadstype: Søknadstype;
    soknadTempStorage?: SoknadTempStorageData;
    route?: string;
}

const isOnWelcomingPage = (path: string, søknadstype: Søknadstype) => {
    const config = getRouteConfig(søknadstype);
    return path === config.WELCOMING_PAGE_ROUTE || path === config.APPLICATION_ROUTE_PREFIX;
};

const getInitialYtelse = (søknadstype: Søknadstype): YtelseKey | undefined => {
    switch (søknadstype) {
        case Søknadstype.pleiepengerSyktBarn:
            return YtelseKey.pleiepengerSyktBarn;
        case Søknadstype.pleiepengerLivetsSluttfase:
            return YtelseKey.pleiepengerLivetsSlutt;
        case Søknadstype.omsorgspenger:
            return undefined;
        case Søknadstype.ekstraomsorgsdager:
            return YtelseKey.omsorgsdagerKroniskSyk;
        case Søknadstype.regnetsomalene:
            return YtelseKey.omsorgsdagerAnnenForelderIkkeTilsyn;
        case Søknadstype.utbetaling:
            return YtelseKey.omsorgspengerutbetalingSNFri;
        case Søknadstype.utbetalingarbeidstaker:
            return YtelseKey.omsorgspengerutbetalingArbeidstaker;
    }
};

const Soknad = ({ søker, barn, søknadstype, soknadTempStorage: tempStorage }: Props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [initializing, setInitializing] = useState(true);
    const [initialFormData, setInitialFormData] = useState<Partial<SoknadFormData>>({
        ...initialSoknadFormData,
    });
    const [sendSoknadStatus, setSendSoknadStatus] = useState<SendSoknadStatus>(initialSendSoknadState);
    const [soknadId, setSoknadId] = useState<string | undefined>();
    const { logSoknadSent, logSoknadStartet, logSoknadFailed, logHendelse, logUserLoggedOut, logInfo } =
        useAmplitudeInstance();

    useEffectOnce(() => {
        if (tempStorage && isStorageDataValid(tempStorage, { søker })) {
            setInitialFormData(tempStorage.formData);
            setSoknadId(tempStorage.metadata.soknadId);
            const currentRoute = location.pathname;
            const lastStepRoute = getApplicationPageRoute(søknadstype, tempStorage.metadata.lastStepID);

            if (currentRoute !== lastStepRoute) {
                navigate(lastStepRoute);
                setInitializing(false);
            } else {
                setInitializing(false);
            }
        } else {
            resetSoknad(true);
        }
    });

    const resetSoknad = async (checkIfRedirectToFrontpage = true): Promise<void> => {
        await soknadTempStorage.purge(søknadstype);
        setInitialFormData({ ...initialSoknadFormData, ytelse: getInitialYtelse(søknadstype) });
        setSoknadId(undefined);
        if (checkIfRedirectToFrontpage) {
            if (isOnWelcomingPage(location.pathname, søknadstype) === false) {
                navigateToWelcomePage(søknadstype);
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
            await soknadTempStorage.purge(søknadstype);
            await logHendelse(ApplikasjonHendelse.avbryt);
            navigateToWelcomePage(søknadstype);
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
            setSoknadId(uuid());
            await soknadTempStorage.create(søknadstype);
            await logSoknadStartet(søknadstype);
            const firstStepID = getFirstStep(søknadstype);
            const route = getApplicationPageRoute(søknadstype, firstStepID);
            navigate(route);
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
            await soknadTempStorage.update(sId, values, stepID, { søker }, søknadstype);
            await logHendelse(ApplikasjonHendelse.fortsettSenere);
            relocateToMinSide();
        } catch (error) {
            if (isUserLoggedOut(error)) {
                logUserLoggedOut('Ved continueSoknadLater');
                navigateToLoginPage(søknadstype);
            } else {
                navigateToErrorPage(søknadstype, navigate);
            }
        }
    };

    const doSendSoknad = async (apiValues: SoknadApiData): Promise<void> => {
        try {
            await sendSoknad(apiValues);
            await soknadTempStorage.purge(søknadstype);
            await logSoknadSent(søknadstype);
            await logInfo({
                type: 'Søknad sendt',
                'Antall vedlegg sendt': apiValues.vedlegg.length,
                søknadstype: søknadstype,
                ettersendelsesType: apiValues.ettersendelsesType,
            });
            setSendSoknadStatus({ failures: 0, status: success(apiValues) });
            setTimeout(() => {
                navigateToKvitteringPage(søknadstype, navigate);
            });
        } catch (error) {
            if (isUserLoggedOut(error)) {
                logUserLoggedOut('Logget ut ved innsending');
                navigateToLoginPage(søknadstype);
            } else {
                await logSoknadFailed(søknadstype);
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

    const triggerSend = (apiValues: SoknadApiData) => {
        setTimeout(() => {
            setSendSoknadStatus({ ...sendSoknadStatus, status: pending });
            setTimeout(() => {
                doSendSoknad(apiValues);
            });
        });
    };

    const handleOnKvitteringUnmount = async () => {
        setInitializing(true);
        setSoknadId(undefined);
        navigateToWelcomePage(søknadstype);
    };

    if (initializing) {
        return <LoadingPage />;
    }

    return (
        <SoknadFormComponents.FormikWrapper
            initialValues={initialFormData}
            onSubmit={() => null}
            renderForm={({ values, setValues }) => {
                const navigateToNextStepFromStep = async (stepID: StepID) => {
                    const soknadStepsConfig = getSoknadStepsConfig(søknadstype);
                    const stepToPersist = soknadStepsConfig[stepID].nextStep;
                    if (stepToPersist && soknadId) {
                        try {
                            await soknadTempStorage.update(
                                soknadId,
                                values,
                                stepToPersist,
                                {
                                    søker,
                                },
                                søknadstype,
                            );
                        } catch (error) {
                            if (isUserLoggedOut(error)) {
                                await logUserLoggedOut('ved mellomlagring');
                                navigateToLoginPage(søknadstype);
                            }
                        }
                    }
                    const step = soknadStepsConfig[stepID];
                    setTimeout(() => {
                        if (step.nextStep) {
                            navigate(step.nextStepRoute || step.nextStep);
                        }
                    });
                };
                return (
                    <SoknadContextProvider
                        value={{
                            soknadId,
                            soknadStepsConfig: getSoknadStepsConfig(søknadstype),
                            sendSoknadStatus,
                            resetSendSøknadStatus: () => setSendSoknadStatus(initialSendSoknadState),
                            resetSoknad: abortSoknad,
                            continueSoknadLater: soknadId
                                ? (stepId) => continueSoknadLater(soknadId, stepId, values)
                                : undefined,
                            startSoknad: () => {
                                setValues({ ...values, harForståttRettigheterOgPlikter: true });
                                startSoknad();
                            },
                            sendSoknad: (v) => triggerSend(v),
                            gotoNextStepFromStep: (stepID: StepID) => {
                                navigateToNextStepFromStep(stepID);
                            },
                        }}>
                        <SoknadRouter
                            søker={søker}
                            barn={barn}
                            søknadstype={søknadstype}
                            soknadId={soknadId}
                            onKvitteringUnmount={() => {
                                handleOnKvitteringUnmount();
                            }}
                        />
                    </SoknadContextProvider>
                );
            }}
        />
    );
};

export default Soknad;

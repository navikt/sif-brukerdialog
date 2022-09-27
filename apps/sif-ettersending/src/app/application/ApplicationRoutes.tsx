import * as React from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { useAmplitudeInstance } from '@navikt/sif-common-amplitude/lib';
import { useFormikContext } from 'formik';
import ConfirmationPage from '../components/pages/confirmation-page/ConfirmationPage';
import GeneralErrorPage from '../components/pages/general-error-page/GeneralErrorPage';
import WelcomingPage from '../components/pages/welcoming-page/WelcomingPage';
import { getRouteConfig, getRouteUrl } from '../config/routeConfig';
import { getFirstStep, StepID } from '../config/stepConfig';
import { ApplicationTypeContext } from '../context/ApplicationTypeContext';
import { ApplicationFormData } from '../types/ApplicationFormData';
import { ApplicationType } from '../types/ApplicationType';
import { getSkjemanavn } from '../types/skjemanavn';
import { getApplicationRoute, getNextStepRoute, isAvailable } from '../utils/routeUtils';
import BeskrivelseStep from './beskrivelse-step/BeskrivelseStep';
import DokumenterStep from './dokumenter-step/DokumenterStep';
import OppsummeringStep from './oppsummering-step/OppsummeringStep';
import ValgOmsTypeStep from './valgOmsType-step/ValgOmsTypeStep';

export interface KvitteringInfo {
    søkernavn: string;
}

const ApplicationRoutes = () => {
    const { values } = useFormikContext<ApplicationFormData>();
    const { søknadstype } = React.useContext(ApplicationTypeContext);

    const navigate = useNavigate();
    const { logSoknadStartet } = useAmplitudeInstance();

    if (!søknadstype) {
        return <Route path={getRouteConfig(ApplicationType.ukjent).ERROR_PAGE_ROUTE} element={<GeneralErrorPage />} />;
    }
    const routeConfig = getRouteConfig(søknadstype);

    const navigateToNextStep = (stepId: StepID) => {
        setTimeout(() => {
            const nextStepRoute = getNextStepRoute(søknadstype, stepId);
            if (nextStepRoute) {
                navigate(nextStepRoute);
            }
        });
    };

    const startSoknad = async () => {
        await logSoknadStartet(getSkjemanavn(søknadstype));
        setTimeout(() => {
            navigate(`${routeConfig.APPLICATION_ROUTE_PREFIX}/${getFirstStep(søknadstype)}`);
        });
    };

    return (
        <Routes>
            <Route
                path={routeConfig.WELCOMING_PAGE_ROUTE}
                element={<WelcomingPage søknadstype={søknadstype} onValidSubmit={startSoknad} />}
            />

            {(søknadstype === ApplicationType.pleiepengerBarn ||
                søknadstype === ApplicationType.pleiepengerLivetsSluttfase) &&
                isAvailable(søknadstype, StepID.BESKRIVELSE, values) && (
                    <Route
                        path={getApplicationRoute(søknadstype, StepID.BESKRIVELSE)}
                        element={
                            <BeskrivelseStep
                                søknadstype={søknadstype}
                                onValidSubmit={() => navigateToNextStep(StepID.BESKRIVELSE)}
                            />
                        }
                    />
                )}
            {søknadstype === ApplicationType.omsorgspenger && isAvailable(søknadstype, StepID.OMS_TYPE, values) && (
                <Route
                    path={getApplicationRoute(søknadstype, StepID.OMS_TYPE)}
                    element={
                        <ValgOmsTypeStep
                            søknadstype={søknadstype}
                            onValidSubmit={() => navigateToNextStep(StepID.OMS_TYPE)}
                        />
                    }
                />
            )}

            {isAvailable(søknadstype, StepID.DOKUMENTER, values) && (
                <Route
                    path={getApplicationRoute(søknadstype, StepID.DOKUMENTER)}
                    element={
                        <DokumenterStep
                            søknadstype={søknadstype}
                            onValidSubmit={() => navigateToNextStep(StepID.DOKUMENTER)}
                        />
                    }
                />
            )}

            {isAvailable(søknadstype, StepID.OPPSUMMERING, values) && (
                <Route
                    path={getApplicationRoute(søknadstype, StepID.OPPSUMMERING)}
                    element={
                        <OppsummeringStep
                            søknadstype={søknadstype}
                            onApplicationSent={() => {
                                window.location.href = getRouteUrl(getRouteConfig(søknadstype).APPLICATION_SENDT_ROUTE); // Ensures history is lost
                            }}
                        />
                    }
                />
            )}

            <Route
                path={routeConfig.APPLICATION_SENDT_ROUTE}
                element={<ConfirmationPage søknadstype={søknadstype} />}
            />

            <Route path={routeConfig.ERROR_PAGE_ROUTE} element={<GeneralErrorPage />} />

            <Route path="*" element={<Navigate to={routeConfig.WELCOMING_PAGE_ROUTE} />} />
        </Routes>
    );
};

export default ApplicationRoutes;

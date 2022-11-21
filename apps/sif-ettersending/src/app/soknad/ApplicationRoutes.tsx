import * as React from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { useAmplitudeInstance } from '@navikt/sif-common-amplitude/lib';
import { useFormikContext } from 'formik';
import ConfirmationPage from '../components/pages/confirmation-page/ConfirmationPage';
import GeneralErrorPage from '../components/pages/general-error-page/GeneralErrorPage';
import WelcomingPage from '../components/pages/welcoming-page/WelcomingPage';
import { getRouteConfig, APPLICATION_SENDT_PAGE, ERROR_PAGE } from '../config/routeConfig';
import { getFirstStep, StepID } from '../config/stepConfig';
import { ApplicationTypeContext } from '../context/ApplicationTypeContext';
import { SoknadFormData } from '../types/SoknadFormData';
import { ApplicationType } from '../types/ApplicationType';
import { getSkjemanavn } from '../types/skjemanavn';
import { getNextStepRoute, isStepAvailable } from '../utils/routeUtils';
import BeskrivelseStep from './beskrivelse-step/BeskrivelseStep';
import DokumenterStep from './dokumenter-step/DokumenterStep';
import OppsummeringStep from './oppsummering-step/OppsummeringStep';
import ValgOmsTypeStep from './valgOmsType-step/ValgOmsTypeStep';
import { relocatoToKvitteringPage } from '../utils/navigationUtils';

export interface KvitteringInfo {
    søkernavn: string;
}

const ApplicationRoutes = () => {
    const { values } = useFormikContext<SoknadFormData>();
    const { søknadstype } = React.useContext(ApplicationTypeContext);

    const navigate = useNavigate();
    const { logSoknadStartet } = useAmplitudeInstance();

    if (!søknadstype) {
        return <Route path={getRouteConfig(ApplicationType.ukjent).ERROR_PAGE_ROUTE} element={<GeneralErrorPage />} />;
    }

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
        const firstStep = getFirstStep(søknadstype);
        setTimeout(() => {
            navigate(firstStep);
        });
    };

    return (
        <Routes>
            <Route index={true} element={<Navigate to="velkommen" replace={false} />} />
            <Route path="velkommen" element={<WelcomingPage søknadstype={søknadstype} onValidSubmit={startSoknad} />} />

            {isStepAvailable(søknadstype, StepID.BESKRIVELSE, values) && (
                <Route
                    path={StepID.BESKRIVELSE}
                    element={
                        <BeskrivelseStep
                            søknadstype={søknadstype}
                            onValidSubmit={() => navigateToNextStep(StepID.BESKRIVELSE)}
                        />
                    }
                />
            )}
            {isStepAvailable(søknadstype, StepID.OMS_TYPE, values) && (
                <Route
                    path={StepID.OMS_TYPE}
                    element={
                        <ValgOmsTypeStep
                            søknadstype={søknadstype}
                            onValidSubmit={() => navigateToNextStep(StepID.OMS_TYPE)}
                        />
                    }
                />
            )}

            {isStepAvailable(søknadstype, StepID.DOKUMENTER, values) && (
                <Route
                    path={StepID.DOKUMENTER}
                    element={
                        <DokumenterStep
                            søknadstype={søknadstype}
                            onValidSubmit={() => navigateToNextStep(StepID.DOKUMENTER)}
                        />
                    }
                />
            )}

            {isStepAvailable(søknadstype, StepID.OPPSUMMERING, values) && (
                <Route
                    path={StepID.OPPSUMMERING}
                    element={
                        <OppsummeringStep
                            søknadstype={søknadstype}
                            onApplicationSent={() => relocatoToKvitteringPage(søknadstype)}
                        />
                    }
                />
            )}
            <Route path={APPLICATION_SENDT_PAGE} element={<ConfirmationPage søknadstype={søknadstype} />} />
            <Route path={ERROR_PAGE} element={<GeneralErrorPage />} />
            <Route path="*" element={<Navigate to="" />} />
        </Routes>
    );
};

export default ApplicationRoutes;

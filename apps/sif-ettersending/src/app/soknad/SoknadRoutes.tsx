import * as React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useFormikContext } from 'formik';
import ConfirmationPage from '../components/pages/confirmation-page/ConfirmationPage';
import WelcomingPage from '../components/pages/welcoming-page/WelcomingPage';
import { APPLICATION_SENDT_PAGE } from '../config/routeConfig';
import { SoknadFormData } from '../types/SoknadFormData';
import { ApplicationType } from '../types/ApplicationType';
import BeskrivelseStep from './beskrivelse-step/BeskrivelseStep';
import DokumenterStep from './dokumenter-step/DokumenterStep';
import OppsummeringStep from './oppsummering-step/OppsummeringStep';
import ValgOmsTypeStep from './valgOmsType-step/ValgOmsTypeStep';
import { Person } from '../types/Person';
import { useSoknadContext } from './SoknadContext';
import { useIntl } from 'react-intl';
import LoadWrapper from '@navikt/sif-common-core-ds/lib/components/load-wrapper/LoadWrapper';
import { isFailure, isInitial, isPending, isSuccess } from '@devexperts/remote-data-ts';
import ErrorPage from '@navikt/sif-common-soknad-ds/lib/soknad-common-pages/ErrorPage';
import SoknadErrorMessages, {
    LastAvailableStepInfo,
} from '@navikt/sif-common-soknad-ds/lib/soknad-error-messages/SoknadErrorMessages';
import soknadStepUtils from '@navikt/sif-common-soknad-ds/lib/soknad-step/soknadStepUtils';
import { getAvailableSteps } from '../utils/routeUtils';
import { StepID } from './soknadStepsConfig';

interface Props {
    søker: Person;
    søknadstype: ApplicationType;
    soknadId?: string;
}

const SoknadRoutes = ({ søker, søknadstype, soknadId = '123' }: Props) => {
    const intl = useIntl();
    const { values } = useFormikContext<SoknadFormData>();
    const { soknadStepsConfig, sendSoknadStatus } = useSoknadContext();

    if (location.pathname === APPLICATION_SENDT_PAGE && soknadId === undefined) {
        return <Navigate replace={true} to="velkommen" />;
    }

    return (
        <Routes>
            <Route index={true} element={<Navigate to="velkommen" replace={false} />} />
            <Route path="velkommen" element={<WelcomingPage søknadstype={søknadstype} />} />
            {soknadId && (
                <>
                    <Route path={StepID.BESKRIVELSE} element={<BeskrivelseStep søknadstype={søknadstype} />} />
                    <Route path={StepID.OMS_TYPE} element={<ValgOmsTypeStep søknadstype={søknadstype} />} />
                    <Route
                        path={StepID.DOKUMENTER}
                        element={<DokumenterStep søknadstype={søknadstype} soknadId={soknadId} søker={søker} />}
                    />
                    <Route
                        path={StepID.OPPSUMMERING}
                        element={<OppsummeringStep soknadId={soknadId} søknadstype={søknadstype} søker={søker} />}
                    />
                </>
            )}

            <Route
                path={APPLICATION_SENDT_PAGE}
                element={
                    <LoadWrapper
                        isLoading={isPending(sendSoknadStatus.status) || isInitial(sendSoknadStatus.status)}
                        contentRenderer={(): React.ReactNode => {
                            if (isSuccess(sendSoknadStatus.status)) {
                                return <ConfirmationPage søknadstype={søknadstype} />;
                            }
                            if (isFailure(sendSoknadStatus.status)) {
                                return <ErrorPage />;
                            }
                            return <div>Det oppstod en feil</div>;
                        }}
                    />
                }
            />
            <Route element={soknadId === undefined ? <Navigate replace={true} to="velkommen" /> : undefined} />
            <Route
                path="*"
                element={
                    <ErrorPage
                        contentRenderer={(): JSX.Element => {
                            const availableSteps = getAvailableSteps(values, søknadstype);
                            const lastAvailableStep = availableSteps.slice(-1)[0];
                            const lastAvailableStepInfo: LastAvailableStepInfo | undefined = lastAvailableStep
                                ? {
                                      route: soknadStepsConfig[lastAvailableStep].route,
                                      title: soknadStepUtils.getStepTexts(intl, soknadStepsConfig[lastAvailableStep])
                                          .stepTitle,
                                  }
                                : undefined;

                            return (
                                <SoknadErrorMessages.MissingSoknadDataError lastAvailableStep={lastAvailableStepInfo} />
                            );
                        }}
                    />
                }
            />
        </Routes>
    );
};

export default SoknadRoutes;

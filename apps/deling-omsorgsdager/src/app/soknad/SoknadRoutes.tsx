import React from 'react';
import { useIntl } from 'react-intl';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { isFailure, isInitial, isPending, isSuccess } from '@devexperts/remote-data-ts';
import ErrorPage from '@navikt/sif-common-soknad-ds/lib/soknad-common-pages/ErrorPage';
import SoknadErrorMessages, {
    LastAvailableStepInfo,
} from '@navikt/sif-common-soknad-ds/lib/soknad-error-messages/SoknadErrorMessages';
import soknadStepUtils from '@navikt/sif-common-soknad-ds/lib/soknad-step/soknadStepUtils';
import { useFormikContext } from 'formik';
import AppRoutes from '../config/routeConfig';
import KvitteringPage from '../pages/kvittering-page/KvitteringPage';
import { Person } from '../types/Person';
import { Barn, SoknadFormData } from '../types/SoknadFormData';
import { getAvailableSteps } from '../utils/getAvailableSteps';
import DinSituasjonStep from './din-situasjon-step/DinSituasjonStep';
import DineBarnStep from './dine-barn-step/DineBarnStep';
import MottakerStep from './mottaker-step/MottakerStep';
import OmBarnaStep from './om-barna-step/OmBarnaStep';
import OppsummeringStep from './oppsummering-step/OppsummeringStep';
import SamværsavtaleStep from './samværsavtale-step/SamværsavtaleStep';
import { useSoknadContext } from './SoknadContext';
import { StepID } from './soknadStepsConfig';
import VelkommenPage from './velkommen-page/VelkommenPage';
import LoadWrapper from '@navikt/sif-common-core-ds/lib/components/load-wrapper/LoadWrapper';

interface Props {
    soknadId?: string;
    barn?: Barn[];
    søker: Person;
}

const SoknadRoutes: React.FunctionComponent<Props> = ({ soknadId, søker, barn = [] }) => {
    const intl = useIntl();
    const { values } = useFormikContext<SoknadFormData>();
    const { soknadStepsConfig, sendSoknadStatus } = useSoknadContext();
    const location = useLocation();

    if (location.pathname === AppRoutes.SOKNAD_SENT && soknadId === undefined) {
        return <Navigate replace={true} to={AppRoutes.SOKNAD} />;
    }

    return (
        <Routes>
            <Route path="/" element={<VelkommenPage />} />
            {soknadId && (
                <>
                    <Route path={StepID.MOTTAKER} element={<MottakerStep søker={søker} />} />
                    <Route path={StepID.DINE_BARN} element={<DineBarnStep barn={barn} søker={søker} />} />
                    <Route path={StepID.OM_BARNA} element={<OmBarnaStep barn={barn} />} />
                    <Route path={StepID.DIN_SITUASJON} element={<DinSituasjonStep />} />
                    <Route path={StepID.SAMVÆRSAVTALE} element={<SamværsavtaleStep />} />
                    <Route
                        path={StepID.OPPSUMMERING}
                        element={<OppsummeringStep soknadId={soknadId} søker={søker} barn={barn} />}
                    />
                </>
            )}
            <Route
                path={AppRoutes.SOKNAD_SENT}
                element={
                    <LoadWrapper
                        isLoading={isPending(sendSoknadStatus.status) || isInitial(sendSoknadStatus.status)}
                        contentRenderer={(): React.ReactNode => {
                            if (isSuccess(sendSoknadStatus.status)) {
                                return <KvitteringPage />;
                            }
                            if (isFailure(sendSoknadStatus.status)) {
                                return <ErrorPage />;
                            }
                            return <div>Det oppstod en feil</div>;
                        }}
                    />
                }
            />
            <Route element={soknadId === undefined ? <Navigate replace={true} to={AppRoutes.SOKNAD} /> : undefined} />
            <Route
                path="*"
                element={
                    <ErrorPage
                        contentRenderer={(): JSX.Element => {
                            const availableSteps = getAvailableSteps(values, søker, barn);
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

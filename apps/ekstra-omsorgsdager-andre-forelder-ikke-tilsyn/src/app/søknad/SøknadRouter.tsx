import { useCallback, useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { fetchSøkerId } from '@navikt/sif-common-api';
import LoadingSpinner from '@navikt/sif-common-core-ds/src/atoms/loading-spinner/LoadingSpinner';
import { useVerifyUserOnWindowFocus } from '@navikt/sif-common-soknad-ds/src';
import { useMellomlagring } from '../hooks/useMellomlagring';
import { usePersistSøknadState } from '../hooks/usePersistSøknadState';
import { useResetSøknad } from '../hooks/useResetSøknad';
import KvitteringPage from '../pages/kvittering/KvitteringPage';
import UnknownRoutePage from '../pages/unknown-route/UnknownRoutePage';
import VelkommenPage from '../pages/velkommen/VelkommenPage';
import { StepId } from '../types/StepId';
import { SøknadRoutes, SøknadStepRoutePath } from '../types/SøknadRoutes';
import { relocateToWelcomePage } from '../utils/navigationUtils';
import actionsCreator from './context/action/actionCreator';
import { useSøknadContext } from './context/hooks/useSøknadContext';
import AnnenForelderenSituasjonStep from './steps/annen-forelderens-situasjon/AnnenForelderenSituasjonStep';
import OmAnnenForelderStep from './steps/om-annen-forelder/OmAnnenForelderStep';
import OmBarnaStep from './steps/om-barna/OmBarnaStep';
import OppsummeringStep from './steps/oppsummering/OppsummeringStep';

const SøknadRouter = () => {
    const { pathname } = useLocation();
    const {
        dispatch,
        state: { søknadsdata, søker, søknadRoute: stateSøknadRoute, søknadSendt, isReloadingApp },
    } = useSøknadContext();
    const navigateTo = useNavigate();
    const [isFirstTimeLoadingApp, setIsFirstTimeLoadingApp] = useState(true);
    const { slettMellomlagring } = useMellomlagring();
    const { setShouldResetSøknad, shouldResetSøknad } = useResetSøknad();

    useVerifyUserOnWindowFocus(søker.fødselsnummer, fetchSøkerId);
    usePersistSøknadState();

    useEffect(() => {
        if (stateSøknadRoute && isFirstTimeLoadingApp) {
            setIsFirstTimeLoadingApp(false);
            navigateTo(stateSøknadRoute);
        }
        if (pathname === SøknadRoutes.VELKOMMEN && stateSøknadRoute) {
            navigateTo(stateSøknadRoute); // Send til sider dersom bruker kommer til velkommen via annen navigasjon
        }
    }, [navigateTo, pathname, stateSøknadRoute, isFirstTimeLoadingApp]);

    const restartSøknad = useCallback(async () => {
        await slettMellomlagring();
        relocateToWelcomePage();
    }, []);

    useEffect(() => {
        if (shouldResetSøknad) {
            dispatch(actionsCreator.resetSøknad());
            dispatch(actionsCreator.setIsReloadingApp());
            setTimeout(restartSøknad);
        }
    }, [shouldResetSøknad, dispatch, restartSøknad]);

    if (isReloadingApp) {
        return <LoadingSpinner size="3xlarge" style="block" />;
    }

    if (søknadSendt && pathname !== SøknadRoutes.SØKNAD_SENDT && !shouldResetSøknad) {
        setShouldResetSøknad(true);
    }

    if (søknadsdata.velkommen?.harForståttRettigheterOgPlikter === false) {
        return (
            <Routes>
                <Route index element={<VelkommenPage />} />
                <Route path="*" element={<Navigate to={StepId.VELKOMMEN} />} />
            </Routes>
        );
    }

    return (
        <Routes>
            <Route index element={<VelkommenPage />} />
            <Route path={SøknadStepRoutePath[StepId.VELKOMMEN]} element={<VelkommenPage />} />
            <Route path={SøknadStepRoutePath[StepId.OM_ANNEN_FORELDER]} element={<OmAnnenForelderStep />} />
            <Route
                path={SøknadStepRoutePath[StepId.ANNEN_FORELDER_SITUASJON]}
                element={<AnnenForelderenSituasjonStep />}
            />
            <Route path={SøknadStepRoutePath[StepId.OM_BARNA]} element={<OmBarnaStep />} />
            <Route path={SøknadStepRoutePath[StepId.OPPSUMMERING]} element={<OppsummeringStep />} />
            <Route path={SøknadStepRoutePath[StepId.KVITTERING]} element={<KvitteringPage />} />
            <Route
                path="*"
                element={
                    <UnknownRoutePage
                        pathName={pathname}
                        onReset={() => {
                            slettMellomlagring().then(() => {
                                dispatch(actionsCreator.resetSøknad());
                                navigateTo(SøknadRoutes.VELKOMMEN);
                            });
                        }}
                    />
                }
            />
        </Routes>
    );
};

export default SøknadRouter;

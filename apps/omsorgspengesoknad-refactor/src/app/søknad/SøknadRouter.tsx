import { useCallback, useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import LoadingSpinner from '@navikt/sif-common-core-ds/src/atoms/loading-spinner/LoadingSpinner';
import { useVerifyUserOnWindowFocus } from '@navikt/sif-common-soknad-ds/src';
import { useStateMellomlagring } from '../hooks/useStateMellomlagring';
import { useLagreState } from '../hooks/useLagreState';
import { useResetSøknad } from '../hooks/useResetSøknad';
import KvitteringPage from '../pages/kvittering/KvitteringPage';
import UnknownRoutePage from '../pages/unknown-route/UnknownRoutePage';
import VelkommenPage from '../pages/velkommen/VelkommenPage';
import { StepId } from '../types/StepId';
import { SøknadRoutes, SøknadStepRoutePath } from '../types/SøknadRoutes';
import actionsCreator from './context/action/actionCreator';
import { useSøknadContext } from './context/hooks/useSøknadContext';
import DeltBostedStep from './steps/delt-bosted/DeltBostedStep';
import LegeerklæringStep from './steps/legeerklæring/LegeerklæringStep';
import OmBarnetStep from './steps/om-barnet/OmBarnetStep';
import OppsummeringStep from './steps/oppsummering/OppsummeringStep';
import { relocateToWelcomePage } from '../utils/navigationUtils';
import { hentSøkerId } from '@navikt/sif-common-query';

const SøknadRouter = () => {
    const { pathname } = useLocation();
    const {
        dispatch,
        state: { søknadsdata, søknadRoute: stateSøknadRoute, søker, søknadSendt, isReloadingApp },
    } = useSøknadContext();
    const navigateTo = useNavigate();
    const [isFirstTimeLoadingApp, setIsFirstTimeLoadingApp] = useState(true);
    const { slettMellomlagring } = useStateMellomlagring();
    const { setShouldResetSøknad, shouldResetSøknad } = useResetSøknad();

    useLagreState();
    useVerifyUserOnWindowFocus(søker.fødselsnummer, hentSøkerId);

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
        await slettMellomlagring;
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

    if (søknadsdata.velkommen !== undefined && søknadsdata.velkommen.harForståttRettigheterOgPlikter !== true) {
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
            <Route path={SøknadStepRoutePath[StepId.OM_BARNET]} element={<OmBarnetStep />} />
            <Route path={SøknadStepRoutePath[StepId.DELT_BOSTED]} element={<DeltBostedStep />} />
            <Route path={SøknadStepRoutePath[StepId.LEGEERKLÆRING]} element={<LegeerklæringStep />} />
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

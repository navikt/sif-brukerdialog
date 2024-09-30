import { useCallback, useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { fetchSøkerId } from '@navikt/sif-common';
import { useVerifyUserOnWindowFocus } from '@navikt/sif-common-soknad-ds';
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
import DeltBostedStep from './steps/delt-bosted/DeltBostedStep';
import DineBarnStep from './steps/dine-barn/DineBarnStep';
import FraværStep from './steps/fravær/FraværStep';
import LegeerklæringStep from './steps/legeerklæring/LegeerklæringStep';
import MedlemskapStep from './steps/medlemskap/MedlemskapStep';
import OppsummeringStep from './steps/oppsummering/OppsummeringStep';
import SituasjonStep from './steps/situasjon/SituasjonStep';
import { mellomlagringService } from '../api/mellomlagringService';

const SøknadRouter = () => {
    const { pathname } = useLocation();
    const {
        dispatch,
        state: { søknadSendt, søknadsdata, søker, kvitteringInfo, søknadRoute: stateSøknadRoute },
    } = useSøknadContext();
    const navigateTo = useNavigate();
    const [isFirstTimeLoadingApp, setIsFirstTimeLoadingApp] = useState(true);
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
        await mellomlagringService.purge();
        relocateToWelcomePage();
    }, []);

    useEffect(() => {
        if (shouldResetSøknad) {
            dispatch(actionsCreator.resetSøknad());
            setTimeout(restartSøknad);
        }
    }, [shouldResetSøknad, dispatch, restartSøknad]);

    if (søknadSendt && pathname !== SøknadRoutes.SØKNAD_SENDT && !shouldResetSøknad) {
        setShouldResetSøknad(true);
    }

    if (søknadsdata.velkommen !== undefined && søknadsdata.velkommen.harForståttRettigheterOgPlikter !== true) {
        setShouldResetSøknad(true);
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
            <Route path={SøknadStepRoutePath[StepId.DINE_BARN]} element={<DineBarnStep />} />
            <Route path={SøknadStepRoutePath[StepId.DELT_BOSTED]} element={<DeltBostedStep />} />
            <Route path={SøknadStepRoutePath[StepId.SITUASJON]} element={<SituasjonStep />} />
            <Route path={SøknadStepRoutePath[StepId.FRAVÆR]} element={<FraværStep />} />
            <Route path={SøknadStepRoutePath[StepId.LEGEERKLÆRING]} element={<LegeerklæringStep />} />
            <Route path={SøknadStepRoutePath[StepId.MEDLEMSKAP]} element={<MedlemskapStep />} />
            <Route path={SøknadStepRoutePath[StepId.OPPSUMMERING]} element={<OppsummeringStep />} />
            <Route
                path={SøknadStepRoutePath[StepId.KVITTERING]}
                element={
                    <KvitteringPage
                        søker={søker}
                        kvitteringInfo={kvitteringInfo}
                        onUnmount={() => setShouldResetSøknad(true)}
                    />
                }
            />
            <Route
                path="*"
                element={
                    <UnknownRoutePage
                        pathName={pathname}
                        onReset={() => {
                            mellomlagringService.purge().then(() => {
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

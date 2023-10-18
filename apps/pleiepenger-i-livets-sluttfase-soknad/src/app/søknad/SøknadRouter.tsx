import { useCallback, useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useMellomlagring } from '../hooks/useMellomlagring';
import { usePersistSøknadState } from '../hooks/usePersistSøknadState';
import { StepId } from '../types/StepId';
import { SøknadRoutes, SøknadStepRoutePath } from '../types/SøknadRoutes';
import { relocateToWelcomePage } from '../utils/navigationUtils';
import actionsCreator from './context/action/actionCreator';
import { useSøknadContext } from './context/hooks/useSøknadContext';
import UnknownRoutePage from '../pages/unknown-route/UnknownRoutePage';
import VelkommenPage from '../pages/velkommen/VelkommenPage';
import OpplysningerOmPleietrengendeStep from './steps/opplysninger-om-pleietrengende/OpplysningerOmPleietrengendeStep';
import LegeerklæringStep from './steps/legeerklæring/LegeerklæringStep';
import TidsromStep from './steps/tidsrom/TidsromStep';
import ArbeidssituasjonStep from './steps/arbeidssituasjon/ArbeidssituasjonStep';
import ArbeidstidStep from './steps/arbeidstid/ArbeidstidStep';
import MedlemskapStep from './steps/medlemskap/MedlemskapStep';
import OppsummeringStep from './steps/oppsummering/OppsummeringStep';
import KvitteringPage from '../pages/kvittering/KvitteringPage';
import { useResetSøknad } from '../hooks/useResetSøknad';

const SøknadRouter = () => {
    const { pathname } = useLocation();
    const {
        dispatch,
        state: { søknadSendt, søknadsdata, kvitteringInfo, søknadRoute: stateSøknadRoute },
    } = useSøknadContext();
    const navigateTo = useNavigate();
    const [isFirstTimeLoadingApp, setIsFirstTimeLoadingApp] = useState(true);
    const { slettMellomlagring } = useMellomlagring();
    const { setShouldResetSøknad, shouldResetSøknad } = useResetSøknad();

    usePersistSøknadState();

    useEffect(() => {
        if (stateSøknadRoute && isFirstTimeLoadingApp) {
            setIsFirstTimeLoadingApp(false);
            navigateTo(stateSøknadRoute);
        }
        if (pathname === SøknadRoutes.VELKOMMEN && stateSøknadRoute) {
            navigateTo(stateSøknadRoute); // Send til sider hvis bruker kommer til velkommen via annen navigasjon
        }
    }, [navigateTo, pathname, stateSøknadRoute, isFirstTimeLoadingApp]);

    const restartSøknad = useCallback(async () => {
        await slettMellomlagring();
        relocateToWelcomePage();
    }, [slettMellomlagring]);

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
            <Route
                path={SøknadStepRoutePath[StepId.OPPLYSNINGER_OM_PLEIETRENGENDE]}
                element={<OpplysningerOmPleietrengendeStep />}
            />
            <Route path={SøknadStepRoutePath[StepId.LEGEERKLÆRING]} element={<LegeerklæringStep />} />
            <Route path={SøknadStepRoutePath[StepId.TIDSROM]} element={<TidsromStep />} />
            <Route path={SøknadStepRoutePath[StepId.ARBEIDSSITUASJON]} element={<ArbeidssituasjonStep />} />
            <Route path={SøknadStepRoutePath[StepId.ARBEIDSTID]} element={<ArbeidstidStep />} />
            <Route path={SøknadStepRoutePath[StepId.MEDLEMSKAP]} element={<MedlemskapStep />} />
            <Route path={SøknadStepRoutePath[StepId.OPPSUMMERING]} element={<OppsummeringStep />} />
            <Route
                path={SøknadStepRoutePath[StepId.KVITTERING]}
                element={
                    <KvitteringPage kvitteringInfo={kvitteringInfo} onUnmount={() => setShouldResetSøknad(true)} />
                }
            />
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

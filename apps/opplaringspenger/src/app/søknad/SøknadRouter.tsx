import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import VelkommenPage from '../pages/velkommen/VelkommenPage';
import { SøknadRoutes } from '../types/SøknadRoutes';
import { usePersistSøknadState } from '../hooks/usePersistSøknadState';
import { useSøknadContext } from './context/hooks/useSøknadContext';
import ArbeidStep from './steps/arbeid/ArbeidStep';
import PleietrengendeStep from './steps/pleietrengende/PleietrengendeStep';
import OpplæringStep from './steps/opplæring/OpplæringStep';
import OppsummeringStep from './steps/oppsummering/OppsummeringStep';
import SøknadSendtPage from '../pages/søknad-sendt/SøknadSendtPage';
import actionsCreator from './context/action/actionCreator';
import InstitusjonStep from './steps/institusjon/InstitusjonStep';
import { StepId } from '../types/StepId';

const SøknadRouter = () => {
    const { pathname } = useLocation();
    const {
        dispatch,
        state: { søknadSendt, søknadsdata, søknadRoute },
    } = useSøknadContext();
    const navigateTo = useNavigate();
    const [isFirstTimeLoadingApp, setIsFirstTimeLoadingApp] = useState(true);
    const [shouldResetSøknad, setShouldResetSøknad] = useState(false);

    usePersistSøknadState();

    useEffect(() => {
        if (søknadRoute && isFirstTimeLoadingApp) {
            setIsFirstTimeLoadingApp(false);
            navigateTo(søknadRoute);
        }
        if (pathname === SøknadRoutes.VELKOMMEN && søknadRoute) {
            navigateTo(søknadRoute); // Send til sider dersom bruker kommer til velkommen via annen navigasjon
        }
    }, [navigateTo, pathname, søknadRoute, isFirstTimeLoadingApp]);

    useEffect(() => {
        if (shouldResetSøknad) {
            dispatch(actionsCreator.resetSøknad());
            navigateTo(SøknadRoutes.VELKOMMEN);
        }
    }, [shouldResetSøknad, navigateTo, dispatch]);

    if (søknadSendt && pathname !== SøknadRoutes.SØKNAD_SENDT && !shouldResetSøknad) {
        setShouldResetSøknad(true);
    }

    if (søknadsdata.harForståttRettigheterOgPlikter === false) {
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
            <Route path={StepId.VELKOMMEN} element={<VelkommenPage />} />
            <Route path={StepId.PLEIETRENGENDE} element={<PleietrengendeStep />} />
            <Route path={StepId.INSTITUSJON} element={<InstitusjonStep />} />
            <Route path={StepId.ARBEID} element={<ArbeidStep />} />
            <Route path={StepId.OPPLÆRING} element={<OpplæringStep />} />
            <Route path={StepId.OPPSUMMERING} element={<OppsummeringStep />} />
            <Route path={StepId.SØKNAD_SENDT} element={<SøknadSendtPage />} />
            <Route path="*" element={<Navigate to={StepId.VELKOMMEN} />} />
        </Routes>
    );
};

export default SøknadRouter;
